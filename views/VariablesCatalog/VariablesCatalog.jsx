/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Container } from 'react-bootstrap';
import classes from './VariablesCatalog.module.scss';
import Button from '../../components/Button/Button';
import DownloadIcon from '../../components/Images/svg/DownloadIcon';
import { useRouter } from 'next/router';
import Banner from '../../components/Banner/Banner';
import Form from 'react-bootstrap/Form';
import { GET_VARIABLE_REPORT, TEST_DOWNLOAD } from '../../constants/apiRoutes';
import { downloadLink } from '../../lib/pageHelpers/downloadLink';
import SearchTable from './Components/VariablesSearchTable';
import { allVarCols } from './Misc/AllVariablesTableHelpers';
import { createCoreVarTable } from './Misc/CoreVariablesTableHelpers';
import CalloutBox from '../../components/CalloutBox/CalloutBox';
import useRest from '../../lib/hooks/useRest';

/**
 * View for Variables Catalog page
 *
 * @property {Array} coreData - data for core variables from a json file in S3
 * @property {Array} allData - data for all variables from a json file in S3
 * @property {String} date - date last modified for json file in S3
 * @property {String} baseUrl - baseUrl to prepend download api call
 * @returns {Node} object rendering the Variable Catalog page
 */

const VariablesCatalog = (props) => {
    const { coreData, allData, date, baseUrl } = props;
    const { restGet } = useRest();
    const [view, setView] = useState('all');

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const lastUpdated = new Date(date).toLocaleDateString('en-US', options);

    const router = useRouter();

    const allVarTable = () => {
        return (
            <SearchTable
                className={classes.tableContainer}
                tableRows={allData}
                tableHeaders={allVarCols}
                ariaCaption="All Variables Table"
                noHover
                responsive={false}
                modification="offWhite"
            ></SearchTable>
        );
    };

    const coreVarTable = createCoreVarTable(coreData);

    return (
        <>
            <Banner title="Variables Catalog" path={router.asPath} variant="virus6" ariaLabel="Variables Catalog" />
            <Container className={`${classes.Container}`}>
                <CalloutBox
                    className={classes.instructionsContainer}
                    body={
                        <div className={classes.instructions}>
                            <div>
                                The Variables Catalog displays variables contained in study data files submitted by the programs as a
                                comma-separated list. With the Variables Catalog, you can quickly understand a study’s variables to make a
                                more informed decision when requesting study data access.
                            </div>
                        </div>
                    }
                />

                <div className={`${classes.section} whiteTextBackground`}>
                    <p className={classes.downloadText}>
                        To get a complete Data Variable Report with multiple views of the data variables, including per-variable frequency
                        counts and dbGaP (PHS) IDs:
                    </p>
                    <div className={classes.downloadContainer}>
                        <Button
                            className={classes.download}
                            label="Download Complete Report in Excel "
                            variant="primary"
                            iconRight={<DownloadIcon />}
                            size="auto"
                            rounded="lite"
                            handleClick={async () => {}}
                        />
                    </div>
                </div>

                <div className="narrowTextBackground">
                    <Form>
                        <Form.Check
                            inline
                            label="All Variables"
                            name="variableType"
                            type="radio"
                            id="all"
                            onChange={() => {
                                setView('all');
                            }}
                            defaultChecked
                            className={classes.variableToggle}
                        />
                        <Form.Check
                            inline
                            label="Core Variables"
                            name="variableType"
                            type="radio"
                            id="core"
                            onChange={() => {
                                setView('core');
                            }}
                            className={classes.variableToggle}
                        />
                    </Form>

                    <div className={classes.lastUpdated}>Last Updated: {lastUpdated}</div>
                </div>
                {view === 'all' && <Row className={classes.Row}>{allVarTable()}</Row>}
                {view === 'core' && <Row className={classes.Row}>{coreVarTable}</Row>}
            </Container>
        </>
    );
};

VariablesCatalog.propTypes = {
    allData: PropTypes.array,
    baseUrl: PropTypes.string,
    coreData: PropTypes.array,
    date: PropTypes.string,
};

export default VariablesCatalog;
