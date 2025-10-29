import classes from '../StudyOverview.module.scss';

// Concatenate values of duplicate properties to form new list
export const combineDuplicates = (data) => {
    const newDataList = [];

    data.forEach((item) => {
        let temp = JSON.parse(JSON.stringify(item));
        const duplicate = newDataList.find((e) => e.label === item.label);
        if (duplicate) {
            duplicate.propertyValue.push(item.propertyValue[0]);
        } else {
            newDataList.push(temp);
        }
    });

    return newDataList;
};

// List of properties that may contain a URL
const mayContainURL = ['RAPIDS Link', 'Study Website URL', 'ClinicalTrials.gov URL', 'Publication URL'];

// Check if string is a valid URL
const isValidUrl = (string) => {
    if (string) {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    } else {
        return true;
    }
};

// Render all the strings/URLs in the list provided. Add semicolon separators as needed
const renderURLList = (urls) => {
    const list = urls.map((url, index) => {
        var listSeparator = '';
        if (index >= 1) {
            listSeparator = '; ';
        }

        if (isValidUrl(url)) {
            return (
                <>
                    {listSeparator}
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                    </a>
                </>
            );
        } else {
            return `${listSeparator}${url}`;
        }
    });
    return list;
};

// Render each property
// If dbGap property, turn phsID into link to dbGap
// If the property is part of the mayContainURL list, render the strings/urls
// Else, join the values normally
export const renderList = (data) => {
    const list = data.map(({ propertyValue, label }) => {
        if (label === 'dbGaP Study Accession') {
            return (
                <p key={label}>
                    <b>{label}:</b>{' '}
                    <a
                        href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${propertyValue[0]}.v1.p1`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {propertyValue[0]}
                    </a>
                </p>
            );
        } else if (mayContainURL.includes(label)) {
            return (
                <p key={label}>
                    <b>{label}:</b> {renderURLList(propertyValue[0].split(';'))}
                </p>
            );
        } else {
            let valStr = propertyValue.join(', ');

            return (
                <p key={label}>
                    <b>{label}:</b> {valStr}
                </p>
            );
        }
    });

    return list;
};
