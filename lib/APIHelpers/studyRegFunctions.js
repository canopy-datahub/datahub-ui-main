export function matchAndAddDataPoint(dirtyField, studyInfo, studyUpdate, formFields, i, entityProperties) {
    let found;
    while (i--) {
        found = false;
        // If the field is dirty and pre-existing...
        if (dirtyField === studyInfo.studyPropertyValues[i].entityProperty.name) {
            // ...and it needs removed, add it and set shouldBeRemoved to true
            if (studyInfo.studyPropertyValues[i].shouldBeRemoved === true || !formFields[dirtyField]) {
                studyUpdate.studyPropertyValues.push({
                    id: studyInfo.studyPropertyValues[i].id,
                    shouldBeRemoved: true,
                });
                found = true;
                break;
            } else {
                // ... else we redeclare and add the data value
                studyUpdate.studyPropertyValues.push({
                    id: studyInfo.studyPropertyValues[i].id,
                    value: formFields[dirtyField],
                    entityProperty: {
                        id: studyInfo.studyPropertyValues[i].entityProperty.id,
                        name: studyInfo.studyPropertyValues[i].entityProperty.name,
                    },
                    valueIndex: studyInfo.studyPropertyValues[i].entityProperty.valueIndex,
                    shouldBeRemoved: false,
                });
                found = true;
                break;
            }
        }
    }
    // ... else the field is not pre-existing and needs to be added.  Just add it without the ID.
    if (found === false) {
        for (let k = 0; k < entityProperties.length; k++) {
            if (entityProperties[k].name === dirtyField) {
                studyUpdate.studyPropertyValues.push({
                    value: formFields[dirtyField],
                    entityProperty: {
                        id: entityProperties[k].id,
                        name: dirtyField,
                    },
                    valueIndex: null,
                    shouldBeRemoved: false,
                });
                break;
            }
        }
    }
}

export function processArrayData(dirtyField, array, studyInfo, studyUpdate, formFields, i, entityProperties) {
    let found;
    // look at every study info point
    while (i--) {
        found = false;
        // If the field is dirty and pre-existing...
        if (dirtyField === studyInfo.studyPropertyValues[i].entityProperty.name) {
            // go through the array
            for (let j = 0; j < array.length; j++) {
                // and see if the value matches, remove it from the temp array.  The second condition is for multiselects
                // We need to splice this out of the array because TEMP ARRAY is for all of the dirty fields that need added, or deleted
                if (
                    studyInfo.studyPropertyValues[i].value ===
                    (typeof formFields[dirtyField][j] === 'string' ? formFields[dirtyField][j] : formFields[dirtyField][j]?.value)
                ) {
                    array.splice(j, 1);
                    found = true;
                    break;
                }
            }
            // DELETE THE VALUE if you don't match the study info with anything
            // this is the case when the original study info data point does not match what is returned on the form
            if (found === false) {
                studyUpdate.studyPropertyValues.push({
                    id: studyInfo.studyPropertyValues[i].id,
                    shouldBeRemoved: true,
                });
            }
        }
    }
    // cache the entityID, since we need to add the rest

    let entityID;
    if (array.length > 0) {
        for (let k = 0; k < entityProperties.length; k++) {
            if (entityProperties[k].name === dirtyField) {
                entityID = entityProperties[k].id;
                break;
            }
        }
    }

    // If I still have an array at the end, that means it's a new value from the user
    for (let j = 0; j < array.length; j++) {
        // so ADD THE VALUE to the updates
        studyUpdate.studyPropertyValues.push({
            value: typeof formFields[dirtyField][j] === 'string' ? formFields[dirtyField][j] : formFields[dirtyField][j]?.value,
            entityProperty: {
                id: entityID,
                name: dirtyField,
            },
            valueIndex: null,
            shouldBeRemoved: false,
        });
    }
}
