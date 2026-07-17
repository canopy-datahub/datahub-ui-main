import yaml from 'js-yaml';

/**
 * Client-side import of a CEDAR template instance into the Study Registration form.
 *
 * Supports the two "proper" CEDAR instance serializations produced by the CEDAR
 * tooling / repository:
 *   1. CEDAR JSON-LD instance (.json) — field values live at the top level as
 *      { "@value": ... } / { "@id": ... }, multi-valued fields as arrays of those.
 *   2. CEDAR compact YAML instance (.yaml/.yml) — field values live under a
 *      `children:` map as { value: ... } or { id: ..., label: ... }, multi-valued
 *      fields as lists.
 *
 * Instance field keys can be EITHER the template's machine keys (e.g. `pi_name`) or
 * its human-readable field labels (e.g. `"PI Name"`) — the CEDAR templates in use
 * emit the latter. We accept both via an alias table, matched on a normalized form
 * (lower-case, punctuation/whitespace stripped) so minor label drift (`Clinical
 * Trials.gov URL` vs `Clinical Trials gov URL`) still matches. Multiplicity is taken
 * from the instance structure itself (array vs. scalar), not a hard-coded list.
 */

// Canonical Canopy study-form field name -> the human-readable label(s) the CEDAR
// template uses for it. The canonical key itself is always an accepted alias too.
const FIELD_ALIASES = {
    title: ['Study Name'],
    description: ['Study Description'],
    center: ['Center'],
    access_level: ['Access Level'],
    has_ic: ['Institutional Certification'],
    data_sharing_info: ['Data Sharing & Submission Information'],
    pi_name: ['PI Name'],
    pi_email: ['PI Email'],
    pi_institution: ['PI Institution'],
    pi_assistant_name: ['Data Submitter Name'],
    pi_assistant_email: ['Data Submitter Email'],
    po_name: ['NIH Program Officer'],
    grant_number: ['Grant or Contract Number(s)', 'Grant Number'],
    foa_number: ['FOA Number'],
    institutes_supporting_study: ['NIH Institute / Center'],
    study_start_date: ['Study Start Date'],
    study_end_date: ['Study End Date'],
    data_submission_date: ['Submission Date'],
    data_submission_timeline_details: ['Data submission timeline details'],
    data_target_delivery_date: ['Target Data Delivery Date'],
    estimated_participants: ['Estimated Number of Study Participants'],
    data_storage_size: ['Estimated Study Data Size (GB)'],
    is_multi_center: ['Is it a Multi-Center Study?', 'Multi-Center Study'],
    multi_center_sites: ['If multi-center study, list study sites', 'Study Sites'],
    data_access_points: ['Data Availability'],
    data_access_points_other: ['Other Data Availability'],
    topics: ['Study Domain'],
    topics_other_specify: ['Other Domain, Specify', 'Other Domain'],
    source: ['Data Collection Methods'],
    source_other_specify: ['Other Data Collection Methods'],
    study_population_focus: ['Study Population Focus'],
    subject: ['Keywords'],
    types: ['Study Design'],
    types_other_specify: ['Other Study Design'],
    ct_url: ['Clinical Trials.gov URL', 'Clinical Trials gov URL'],
    study_website_url: ['Study Website URL'],
    publication_url: ['Primary Publication URL'],
    data_species: ['Species'],
    data_sample_collection: ['Sample Collection'],
    data_general_types: ['Data Types'],
    data_general_types_other_specify: ['Other Data Types'],
    data_genomic: ['Genomic Data Types'],
    data_genomic_other_specify: ['Other Genomic Data Types'],
    data_phenotype: ['Phenotypes'],
    data_phenotype_other_specify: ['Other Phenotypes'],
    data_sample_types: ['Sample Types'],
    data_sample_types_other_specify: ['Other Sample Types'],
    data_genotype: ['Genotypes'],
    data_genotype_other_specify: ['Other Genotypes'],
    data_sequencing: ['Sequencing Data Types'],
    data_sequencing_other_specify: ['Other Sequencing Data Types'],
    data_analyses: ['Genomic Analyses Types'],
    data_analyses_other_specify: ['Other Genomic Analyses Types'],
    data_array_data: ['Genomic Array Data Types'],
    data_array_data_other_specify: ['Other Genomic Array Data Types'],
    acknowledgment_statement: ['Acknowledgment Statement'],
    general_research_group: ['General Research Use'],
    health_biomed_group: ['Health/Medical/Biomedical'],
    disease_specific_group: ['Conditions/Diseases'],
    disease_specific_related_conditions: ['Related Conditions'],
    other_group_description: ['Other Data Use Limitations'],
};

// Fields the form treats as a Yes/No radio or toggle. CEDAR may express these as a
// literal "Yes"/"No", or as a checkbox whose checked value is a label (e.g. the
// "Is it a Multi-Center Study?" checkbox yields "Multi-Center Study" when checked).
const YES_NO_FIELDS = new Set(['has_ic', 'data_sharing_info', 'is_multi_center']);

// Link/URL fields: CEDAR stores these as { "@id": <url>, "rdfs:label": <text> }. We
// want the URL (@id), not the display label — the opposite of controlled terms.
const LINK_FIELDS = new Set(['ct_url', 'study_website_url', 'publication_url']);

export const CEDAR_STUDY_FIELD_KEYS = Object.keys(FIELD_ALIASES);

// Normalize a key for tolerant matching: lower-case, strip everything but a-z0-9.
const normalizeKey = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

// normalized alias -> canonical field name (built once).
const NORMALIZED_LOOKUP = (() => {
    const map = {};
    for (const canonical of Object.keys(FIELD_ALIASES)) {
        map[normalizeKey(canonical)] = canonical;
        for (const alias of FIELD_ALIASES[canonical]) {
            map[normalizeKey(alias)] = canonical;
        }
    }
    return map;
})();

// The template models a single multi-select checkbox field "Required Documents" whose
// selectable values map onto TWO separate Yes/No toggles in the Canopy form. Handled
// specially because it's one instance key feeding two form fields.
const REQUIRED_DOCUMENTS_KEY = normalizeKey('Required Documents');
const REQUIRED_DOCUMENTS_VALUE_FIELDS = [
    { field: 'has_ic', value: normalizeKey('Institutional Certification') },
    { field: 'data_sharing_info', value: normalizeKey('Data Sharing & Submission Information') },
];

/**
 * Pull the human-facing scalar out of one CEDAR value node. Handles both JSON-LD
 * ({@value}/{@id}) and compact-YAML ({value}/{id,label}) shapes, plus bare literals.
 * For controlled terms we prefer the human label over the ontology IRI, because the
 * Canopy code-list dropdowns match on label text.
 * @returns {string|undefined} trimmed string, or undefined if empty/absent.
 */
const extractScalar = (node, preferId = false) => {
    if (node === null || node === undefined) {
        return undefined;
    }
    if (typeof node === 'string') {
        return node.trim() || undefined;
    }
    if (typeof node === 'number' || typeof node === 'boolean') {
        return String(node);
    }
    // Defensive: a Date can appear if some upstream parser typed a bare date value.
    // Use UTC to avoid shifting the calendar day across time zones.
    if (node instanceof Date && !Number.isNaN(node.getTime())) {
        return node.toISOString().slice(0, 10);
    }
    if (typeof node === 'object') {
        // Link fields want the URL (@id); everything else wants the literal/label.
        const raw = preferId
            ? (node['@id'] ?? node.id ?? node['@value'] ?? node.value)
            : (node['@value'] ?? node.value ?? node.label ?? node['rdfs:label'] ?? node['@id'] ?? node.id);
        if (raw === null || raw === undefined) {
            return undefined;
        }
        // raw is a leaf (string / number / Date) — reuse the scalar handling above.
        if (typeof raw === 'object') {
            return extractScalar(raw, preferId);
        }
        return String(raw).trim() || undefined;
    }
    return undefined;
};

/**
 * Convert one field node to the value shape the form expects: an array of strings for
 * multi-valued fields (structurally an array in the instance), or a single string for
 * single-valued fields.
 */
const extractField = (node, preferId = false) => {
    if (Array.isArray(node)) {
        const vals = node.map((n) => extractScalar(n, preferId)).filter((v) => v !== undefined);
        return vals.length ? vals : undefined;
    }
    return extractScalar(node, preferId);
};

/**
 * Parse raw file text as a CEDAR instance. Chooses JSON vs YAML by file extension,
 * falling back to sniffing (JSON starts with '{').
 * @returns the parsed plain object.
 * @throws {Error} with a user-readable message if the text can't be parsed.
 */
export const parseCedarInstanceText = (text, fileName = '') => {
    const lower = fileName.toLowerCase();
    const looksJson = lower.endsWith('.json') || text.trim().startsWith('{');
    try {
        if (looksJson) {
            return JSON.parse(text);
        }
        // js-yaml v3: safeLoad is the non-eval loader. JSON_SCHEMA keeps bare dates as
        // strings (the default schema types them as JS Date, which loses the literal
        // and can shift the calendar day across time zones) and maps everything else to
        // plain JSON types.
        return yaml.safeLoad(text, { schema: yaml.JSON_SCHEMA });
    } catch (e) {
        // If extension-based guess failed, try the other parser before giving up.
        try {
            return looksJson ? yaml.safeLoad(text, { schema: yaml.JSON_SCHEMA }) : JSON.parse(text);
        } catch {
            throw new Error(`Could not parse the file as ${looksJson ? 'JSON' : 'YAML'}: ${e.message}`);
        }
    }
};

// Keys we never treat as study fields when listing "unrecognized" keys for diagnostics.
const isHousekeepingKey = (key) => key.startsWith('@') || key.includes(':') || [
    'children', 'type', 'name', 'id', 'isBasedOn', 'createdOn', 'createdBy',
    'modifiedOn', 'modifiedBy',
].includes(key);

/**
 * Locate the field map inside a parsed CEDAR instance.
 *  - compact YAML instance: fields are under `children`.
 *  - JSON-LD instance: fields are top-level keys.
 * @returns {{ source: object, format: 'compact-yaml'|'json-ld' }}
 * @throws {Error} if the object doesn't look like a CEDAR instance.
 */
const locateFieldSource = (parsed) => {
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('The file does not contain a CEDAR instance object.');
    }
    if (parsed.children && typeof parsed.children === 'object') {
        return { source: parsed.children, format: 'compact-yaml' };
    }
    return { source: parsed, format: 'json-ld' };
};

/**
 * Map a parsed CEDAR study instance to the Canopy Study Registration form's `formData`
 * shape and access level.
 *
 * @param {object} parsed - a parsed CEDAR instance (JSON-LD or compact-YAML form).
 * @returns {{
 *   formData: object, accessLevel: (string|null), fieldsFilled: number, format: string,
 *   matchedFields: string[], unrecognizedKeys: string[], emptyMatchedKeys: string[]
 * }}
 * @throws {Error} if nothing in the file matched a known study field.
 */
export const mapCedarInstanceToFormData = (parsed) => {
    const { source, format } = locateFieldSource(parsed);

    const formData = {};
    const matchedFields = [];
    const emptyMatchedKeys = [];
    const unrecognizedKeys = [];

    for (const key of Object.keys(source)) {
        const nk = normalizeKey(key);

        // "Required Documents": one multi-select checkbox in the template -> the form's
        // separate has_ic / data_sharing_info toggles. Each selected value flips one on.
        if (nk === REQUIRED_DOCUMENTS_KEY) {
            const raw = extractField(source[key]);
            const selected = (Array.isArray(raw) ? raw : [raw])
                .filter((v) => v !== undefined)
                .map(normalizeKey);
            let anySet = false;
            for (const { field, value } of REQUIRED_DOCUMENTS_VALUE_FIELDS) {
                if (selected.includes(value) && !(field in formData)) {
                    formData[field] = 'Yes';
                    matchedFields.push(field);
                    anySet = true;
                }
            }
            if (!anySet) {
                emptyMatchedKeys.push(key);
            }
            continue;
        }

        const canonical = NORMALIZED_LOOKUP[nk];
        if (!canonical) {
            if (!isHousekeepingKey(key)) {
                unrecognizedKeys.push(key);
            }
            continue;
        }

        let value = extractField(source[key], LINK_FIELDS.has(canonical));

        if (YES_NO_FIELDS.has(canonical)) {
            const first = Array.isArray(value) ? value[0] : value;
            value = first === undefined
                ? undefined
                : (/^(no|false)$/i.test(String(first).trim()) ? 'No' : 'Yes');
        }

        if (value === undefined) {
            emptyMatchedKeys.push(key);
            continue;
        }
        // If two source keys map to the same field (machine + label), first non-empty wins.
        if (!(canonical in formData)) {
            formData[canonical] = value;
            matchedFields.push(canonical);
        }
    }

    if (matchedFields.length === 0) {
        const found = Object.keys(source).filter((k) => !isHousekeepingKey(k)).slice(0, 12);
        throw new Error(
            'No recognized study fields were found. The file must be a CEDAR instance based on ' +
            'the Canopy Study Metadata template. ' +
            (found.length ? `Fields seen included: ${found.join(', ')}.` : '')
        );
    }

    // Access level: CEDAR template uses "Public"/"Limited"/"Private"; the form's access
    // level control uses upper-case 'PUBLIC'/'LIMITED'/'PRIVATE'.
    let accessLevel = null;
    if (typeof formData.access_level === 'string') {
        const upper = formData.access_level.toUpperCase();
        if (['PUBLIC', 'LIMITED', 'PRIVATE'].includes(upper)) {
            accessLevel = upper;
        }
        // access_level is not a study form field, so drop it from formData.
        delete formData.access_level;
        const idx = matchedFields.indexOf('access_level');
        if (idx !== -1) {
            matchedFields.splice(idx, 1);
        }
    }

    return {
        formData,
        accessLevel,
        fieldsFilled: matchedFields.length,
        format,
        matchedFields,
        unrecognizedKeys,
        emptyMatchedKeys,
    };
};

/**
 * Convenience: parse raw file text and map it in one step.
 * @returns same shape as mapCedarInstanceToFormData.
 * @throws {Error} on parse or shape errors (message is user-readable).
 */
export const importCedarInstance = (text, fileName = '') => {
    const parsed = parseCedarInstanceText(text, fileName);
    return mapCedarInstanceToFormData(parsed);
};
