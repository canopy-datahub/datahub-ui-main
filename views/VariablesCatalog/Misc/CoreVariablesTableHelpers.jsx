import classes from '../VariablesCatalog.module.scss';
import { Table as BTTable } from 'react-bootstrap';

const getSubVarTable = (data) => {
    return data.map((d, index) => {
        return (
            <tr key={index}>
                <td className={classes.half}>{d['Variable']}</td>
                <td className={classes.half}>{d['Label']}</td>
            </tr>
        );
    });
};

const getTableBody = (tableData) => {
    return tableData.map((d, index) => {
        return (
            <tr key={index}>
                <th>{d['RADx Program']}</th>
                <td>
                    <a target="_blank" rel="noreferrer noopener" href={`/study/${d['Study ID']}`}>
                        {d['Study Name']}
                    </a>
                </td>
                <td>
                    <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href=''
                    >
                        {d['dbGaP ID']}
                    </a>
                </td>
                <td className={classes.long}>{d['File Name']}</td>
                <td className={classes.variablesTableContainer} colSpan="2">
                    <BTTable className={classes.variablesTable}>
                        <thead>
                            <tr>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody className="variables-table-tbody">{getSubVarTable(d['Data Variable'])}</tbody>
                    </BTTable>
                </td>
            </tr>
        );
    });
};

export const createCoreVarTable = (tableData) => {
    if (tableData) {
        return (
            <div className={classes.tableContainer}>
                <BTTable striped bordered className={classes.catalogTable}>
                    <thead className={classes.stickyHeader}>
                        <tr>
                            <th scope="col">RADx Program</th>
                            <th scope="col" className={classes.studyName}>
                                Study Name
                            </th>
                            <th scope="col">dbGaP Study Accession</th>
                            <th scope="col" className={classes.long}>
                                File Name
                            </th>
                            <th className={classes.variable} scope="col">
                                Variable
                            </th>
                            <th className={classes.label} scope="col">
                                Label
                            </th>
                        </tr>
                    </thead>
                    <tbody>{getTableBody(tableData)}</tbody>
                </BTTable>
            </div>
        );
    }
};
