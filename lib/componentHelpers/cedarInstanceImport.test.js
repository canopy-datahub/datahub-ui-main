import fs from 'fs';
import path from 'path';
import { importCedarInstance, mapCedarInstanceToFormData } from './cedarInstanceImport';

// Real CEDAR instance fixtures produced by the CEDAR tooling (arch/ samples).
const ARCH = path.resolve(__dirname, '../../../arch');
const readFixture = (name) => fs.readFileSync(path.join(ARCH, name), 'utf8');

describe('importCedarInstance', () => {
    const expectCommon = (result) => {
        const { formData, accessLevel } = result;
        // single text
        expect(formData.title).toBe('Longitudinal Cohort Study of Post-Acute COVID-19 Outcomes in Adults');
        expect(formData.pi_email).toBe('jane.martinez@example.edu');
        // multi-valued -> array of strings
        expect(formData.subject).toEqual(['Long COVID', 'SARS-CoV-2', 'Post-acute sequelae']);
        expect(formData.foa_number).toEqual(['RFA-OD-21-013']);
        expect(formData.source).toEqual(['Surveys', 'Electronic Health Records']);
        // typed literals surface as their string value
        expect(formData.study_start_date).toBe('2022-01-15');
        expect(formData.estimated_participants).toBe('1500');
        // Yes/No pass through untouched (form consumes these strings directly)
        expect(formData.has_ic).toBe('Yes');
        expect(formData.is_multi_center).toBe('Yes');
        // access_level lifted out + upper-cased
        expect(accessLevel).toBe('PUBLIC');
        expect(formData.access_level).toBeUndefined();
    };

    it('maps a CEDAR JSON-LD instance', () => {
        const result = importCedarInstance(readFixture('canopy-study-instance-sample.json'), 'sample.json');
        expect(result.format).toBe('json-ld');
        expect(result.fieldsFilled).toBeGreaterThan(10);
        expectCommon(result);
    });

    it('maps a CEDAR compact YAML instance', () => {
        const result = importCedarInstance(readFixture('canopy-study-instance-sample.yaml'), 'sample.yaml');
        expect(result.format).toBe('compact-yaml');
        expect(result.fieldsFilled).toBeGreaterThan(10);
        expectCommon(result);
    });

    it('drops empty values ({} / [])', () => {
        const result = importCedarInstance(readFixture('canopy-study-instance-sample.json'), 'sample.json');
        // ct_url is {} and publication_url is [] in the JSON fixture
        expect(result.formData.ct_url).toBeUndefined();
        expect(result.formData.publication_url).toBeUndefined();
    });

    it('prefers the human label over the ontology IRI for controlled terms', () => {
        const parsed = {
            children: {
                topics: [{ id: 'http://purl.obolibrary.org/obo/MONDO_0005015', label: 'diabetes' }],
            },
        };
        const { formData } = mapCedarInstanceToFormData(parsed);
        expect(formData.topics).toEqual(['diabetes']);
    });

    it('throws a readable error on unparseable input', () => {
        expect(() => importCedarInstance('not json or yaml: [', 'x.json')).toThrow(/parse/i);
    });

    it('throws when the object is not a Canopy study instance', () => {
        expect(() => importCedarInstance(JSON.stringify({ foo: 'bar' }), 'x.json')).toThrow(/CEDAR instance|recognized/i);
    });

    // Real cofest instances (template aff00b59) use human-readable LABELS as keys
    // ("Study Name", "PI Name", ...) rather than machine keys. Both must map.
    const FIX = path.resolve(__dirname, '__fixtures__');
    const readLabelFixture = (name) => fs.readFileSync(path.join(FIX, name), 'utf8');

    const expectSpbe = (result) => {
        const { formData, accessLevel } = result;
        expect(formData.title).toBe('Effect of 12-Week Time-Restricted Eating on Glycemic Control in Prediabetic Adults: A Synthetic Pilot Study');
        expect(formData.pi_name).toBe('Not provided (synthetic study)');
        expect(formData.description).toContain('fully synthetic, multi-center');
        expect(formData.topics).toEqual(['Health Behaviors']);
        expect(formData.topics_other_specify).toEqual(['Metabolic health and prediabetes']);
        expect(formData.source).toEqual(['Survey']);
        expect(formData.types).toEqual(['Interventional or Clinical Trial']);
        expect(formData.data_general_types).toEqual([
            'Behavioral', 'Biologic Specimens', 'Clinical', 'Individual Phenotype', 'Supporting Documents', 'Temporal',
        ]);
        expect(formData.study_start_date).toBe('2026-01-07');
        expect(formData.estimated_participants).toBe('40');
        // multi-center checkbox ("Multi-Center Study") -> Yes
        expect(formData.is_multi_center).toBe('Yes');
        expect(formData.multi_center_sites).toBe('United States; Germany; Spain; Canada');
        // link field via @id / id+label
        expect(formData.study_website_url).toBe('https://github.com/canopy-datahub/canopy-metadata-cofest-2026/tree/main/data/synthetic-study');
        expect(accessLevel).toBe('PUBLIC');
        expect(fieldsFilledSanity(result)).toBe(true);
    };
    const fieldsFilledSanity = (r) => r.fieldsFilled > 20 && r.matchedFields.length === r.fieldsFilled;

    it('maps a label-keyed CEDAR JSON-LD instance (real cofest file)', () => {
        const result = importCedarInstance(readLabelFixture('spbe-instance-labels.json'), 'SPbE-2026.json');
        expect(result.format).toBe('json-ld');
        expectSpbe(result);
    });

    it('maps a label-keyed CEDAR compact YAML instance (real cofest file)', () => {
        const result = importCedarInstance(readLabelFixture('spbe-instance-labels.yaml'), 'SPbE-2026.yaml');
        expect(result.format).toBe('compact-yaml');
        expectSpbe(result);
    });

    it('maps "Required Documents" checkbox values onto the has_ic / data_sharing_info toggles', () => {
        const parsed = {
            children: {
                'Study Name': { value: 'X' },
                'Required Documents': [
                    { value: 'Institutional Certification' },
                    { value: 'Data Sharing & Submission Information' },
                ],
            },
        };
        const { formData, unrecognizedKeys } = mapCedarInstanceToFormData(parsed);
        expect(formData.has_ic).toBe('Yes');
        expect(formData.data_sharing_info).toBe('Yes');
        expect(unrecognizedKeys).not.toContain('Required Documents');
    });

    it('leaves the toggles unset and does not flag "Required Documents" as unrecognized when empty (SPbE file)', () => {
        const result = importCedarInstance(readLabelFixture('spbe-instance-labels.json'), 'SPbE-2026.json');
        expect(result.formData.has_ic).toBeUndefined();
        expect(result.formData.data_sharing_info).toBeUndefined();
        expect(result.unrecognizedKeys).not.toContain('Required Documents');
    });

    it('error message lists the fields it saw when nothing matches', () => {
        expect(() => importCedarInstance(JSON.stringify({ 'Totally Unknown': { '@value': 'x' } }), 'x.json'))
            .toThrow(/Totally Unknown/);
    });
});
