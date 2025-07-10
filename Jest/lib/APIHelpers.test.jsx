import { processArrayData } from '../../lib/APIHelpers/studyRegFunctions';
import { arrayData, dirtyField, entityProperties, formFields, i, preExistingStudyInfo } from './APIHelperMockData';

describe('Testing API Helper Functions', () => {
    it('should process array based data for preexisting Study Info', () => {
        const studyUpdate = { studyId: 29, studyPropertyValues: [] };
        processArrayData(dirtyField, arrayData, preExistingStudyInfo, studyUpdate, formFields, i, entityProperties);
        // expect(studyUpdate).toBe();
    });
});
