/* eslint-disable max-len */
import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classes from './VariableOverview.module.scss';
import Banner from '../../components/Banner/Banner';
import { renderTable, renderStudiesList } from './Misc/HelperFunctions';

/**
 * View for the Variable Overview
 *
 * @property {Object} variableData - Variables's metadata
 * @property {Array<Object>} permissibleValues - List of permissible labels and values
 * @property {Array<Object>} linkedStudies - List of study using variable
 * @returns {Node} object rendering the Variable Overview
 */

const VariableOverview = (props) => {
    const { variableData, permissibleValues, linkedStudies } = props;
    const { Title, Representative } = variableData;

    const variableName = Title?.find((x) => x.label === 'Name')?.propertyValue[0];

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'Link to Homepage',
        },
        {
            page: variableName,
            ariaLabel: variableName,
        },
    ];

    return (
        <>
            <Banner
                title={variableName}
                manualCrumbs={crumbs}
                variant="lab4"
                ariaLabel="Variable Overview Breadcrumb"
                topic="Variables"
            />
            <div className={classes.variableOverview}>
                <div className={`${classes.divider} ${classes.firstDivider}`}>
                    <Container>Variable Information</Container>
                </div>
                <div className={classes.section}>
                    <Container className={classes.Container}>
                        <div className={classes.overflow}>
                            <table className={classes.leftHandTable}>
                                <tbody>{renderTable(variableName, Representative, permissibleValues)}</tbody>
                            </table>
                        </div>
                    </Container>
                </div>

                <div className={classes.divider}>
                    <Container>List of Studies Using Variable</Container>
                </div>
                <div className={classes.section}>
                    <Container className={classes.Container}>
                        <div className={classes.studyListContainer}>
                            <ul>{renderStudiesList(linkedStudies)}</ul>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

VariableOverview.propTypes = {
    linkedStudies: PropTypes.array,
    permissibleValues: PropTypes.array,
    variableData: PropTypes.object,
};

export default VariableOverview;
