/* eslint-disable multiline-ternary */
import Table from '../../../components/Table/Table';
import classes from '../VariableOverview.module.scss';
import Image from 'next/legacy/image';

// Permissible Table Columns
const permissibleTableColumns = [
    {
        id: 'value',
        accessorKey: 'value',
        cell: (info) => <div className={`${classes.badge} ${classes.grayBadge}`}>{info.getValue()}</div>,
        header: 'Value',
        alignLeft: true,
        size: 80,
    },
    {
        id: 'label',
        accessorKey: 'label',
        cell: (info) => info.getValue(),
        header: 'Label',
        alignLeft: true,
        size: 500,
    },
];

// Render table
export const renderTable = (variableName, Representative, permissibleValues) => {
    const representativeData = Representative.map((data) => {
        switch (data.label) {
            case 'Variable Category': {
                return (
                    <tr key={data.label}>
                        <th>{data.label}</th>
                        <td>
                            <a href={`/glossary#variableCategory`}>{data.propertyValue[0]}</a>
                        </td>
                    </tr>
                );
            }
            case 'Description': {
                /**
                 * This prop value needs to be heavily parsed to:
                 *
                 * - remove unneccesary backticks and parantheses
                 * - add gray badge styling to permissible values
                 * - add colored badge styling to DCC programs
                 * - add black badge styling to DCC data element values
                 */

                // Split the text by the backtick segments and Programs
                const parts = data.propertyValue[0].split(/(`[^`]+`|\(Program-A\)|\(Program-B\)|\(Program-C\)|\(Program-D\))/g);

                return (
                    <tr key={data.label}>
                        <th>{data.label}</th>
                        <td>
                            <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', lineHeight: '24px' }}>
                                {parts.map((part, index) => {
                                    if (part.startsWith('`') && part.endsWith('`')) {
                                        const removedBackticks = part.slice(1, -1);
                                        if (removedBackticks === variableName) {
                                            return removedBackticks;
                                        } else if (Number(removedBackticks)) {
                                            return (
                                                <span key={index} className={`${classes.badge} ${classes.grayBadge}`}>
                                                    {removedBackticks}
                                                </span>
                                            );
                                        } else {
                                            return (
                                                <span key={index} className={`${classes.badge} ${classes.blackBadge}`}>
                                                    {removedBackticks}
                                                </span>
                                            );
                                        }
                                    } else if (
                                        part.trim() === '(Program-A)' ||
                                        part.trim() === '(Program-B)' ||
                                        part.trim() === '(Program-C)' ||
                                        part.trim() === '(Program-D)'
                                    ) {
                                        const removedParantheses = part.trim().slice(1, -1);
                                        let styleClasses = `${classes.badge} ${classes.programBadge}`;

                                        switch (removedParantheses) {
                                            case 'Program-A':
                                                styleClasses += ` ${classes.up}`;
                                                break;
                                            case 'Program-B':
                                                styleClasses += ` ${classes.rad}`;
                                                break;
                                            case 'Program-C':
                                                styleClasses += ` ${classes.tech}`;
                                                break;
                                            case 'Program-D':
                                                styleClasses += ` ${classes.dht}`;
                                                break;
                                        }
                                        return (
                                            <span key={index} className={styleClasses}>
                                                {removedParantheses}
                                            </span>
                                        );
                                    } else {
                                        return part;
                                    }
                                })}
                            </div>
                        </td>
                    </tr>
                );
            }
            case 'Term': {
                /**
                 * This prop value needs to be parsed. The elements to make up Term are split by "|||" and it is assumed there will always be 3 elements concatenated from the DB:
                 *
                 * - identitifer
                 * - lookup link
                 * - term name
                 */

                const parsedTerm = data.propertyValue[0].split('|||');
                return (
                    <tr key={data.label}>
                        <th>{data.label}</th>
                        <td>
                            <div>
                                <a href={parsedTerm[1]} target="_blank" rel="noopener noreferrer">
                                    <Image src="/images/bioportal_logo.png" alt="BioPortal Logo" width="68" height="20" /> [{parsedTerm[0]}]
                                </a>{' '}
                                {parsedTerm[2]}
                            </div>
                        </td>
                    </tr>
                );
            }
            case 'From': {
                /**
                 * This prop value needs to be heavily parsed. DCCs are split by "; ". DCC vs values are split by "|||". And values are split by "+".
                 *
                 * Example: Program-D|||dht_race; Program-C|||race_black+race_white; Program-A|||race_ethn_race; Program-B|||race
                 */

                const parsedMapping = data.propertyValue[0].split('; ');
                const styledMapping = parsedMapping.map((mapping, index) => {
                    const parsedDCCandValues = mapping.split('|||');
                    const parsedDCC = parsedDCCandValues[0];
                    const parsedValues = parsedDCCandValues[1];

                    // DCC styling
                    let styleClasses = `${classes.badge} ${classes.programBadge}`;
                    switch (parsedDCC) {
                        case 'Program-A':
                            styleClasses += ` ${classes.up}`;
                            break;
                        case 'Program-B':
                            styleClasses += ` ${classes.rad}`;
                            break;
                        case 'Program-C':
                            styleClasses += ` ${classes.tech}`;
                            break;
                        case 'Program-D':
                            styleClasses += ` ${classes.dht}`;
                            break;
                    }

                    // Data element values styling
                    const dataElements = parsedValues.split('+').map((element, index) => {
                        return (
                            <>
                                <span key={index} className={`${classes.badge} ${classes.blackBadge}`}>
                                    {element}
                                </span>{' '}
                            </>
                        );
                    });

                    // DCC + data element values
                    return (
                        <div key={index} className="py-1">
                            <span className={styleClasses}>{parsedDCC}</span> {dataElements}
                        </div>
                    );
                });

                // All DCCs and their data element values
                return (
                    <tr key={data.label}>
                        <th>{data.label}</th>
                        <td>
                            <div>{styledMapping}</div>
                        </td>
                    </tr>
                );
            }
            default:
                return (
                    <tr key={data.label}>
                        <th>{data.label}</th>
                        <td>{data.propertyValue[0]}</td>
                    </tr>
                );
        }
    });

    const permissibleTable = (
        <Table
            className={`${classes.tableContainer} ${classes.permissibleTable}`}
            tableRows={permissibleValues}
            tableHeaders={permissibleTableColumns}
            ariaCaption="Specimens Table"
            noHover
            responsive={false}
            variant="narrow"
        ></Table>
    );

    const permissibleData = permissibleValues.length ? (
        <tr key="Permissible Values">
            <th>Permissible Values</th>
            <td>{permissibleTable}</td>
        </tr>
    ) : (
        ''
    );

    return (
        <>
            {representativeData} {permissibleData}
        </>
    );
};

// Render list of studies
export const renderStudiesList = (linkedStudies) => {
    return linkedStudies.map((study, index) => {
        return (
            <li key={index}>
                <a href={`/study/${study.id}`}>{study.name}</a>
            </li>
        );
    });
};
