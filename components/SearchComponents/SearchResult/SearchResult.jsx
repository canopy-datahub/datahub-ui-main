import React from 'react';
import PropTypes from 'prop-types';
import classes from './SearchResult.module.scss';
import Card from '../../Card/Card';
import Button from '../../Button/Button';
import CrossEntityModalIcon from '../../Images/svg/CrossEntityModalIcon';
import { formatValue } from './utilityFunctions';
import Link from 'next/link';
import { GET_STUDY_VARIABLES } from '../../../constants/apiRoutes';
import Tooltip from '../../Tooltip/Tooltip';
import { QuestionCircle } from 'react-bootstrap-icons';
import { Form } from 'react-bootstrap';

/**
 * Interactable SearchResult component
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} propertyList - a list of metadata properties along with their string representation for their names
 * @property {Object} resultData - an Object with all of the values of the metadata for a result
 * @property {Object} highlight - an Object with the matching prop and value from elastic search to highlight in results
 * @property {Object} matchingVariable - Because DUG API has different metadata for variables, must use matching variable from our system to get correct/full metadata
 * @property {Array} list - variable's list of studies for list modal
 * @property {String} listLabel - Label for list modal
 * @property {Func} setCrossEntityListModalVisible - Function to control visibility of list modal
 * @property {Func} setCrossEntityList - Function to set list content for list modal
 * @property {Func} setSelectedVariable - Function to set the selected variable for search button in list modal
 * @property {Func} setSelectedStudy - Function to set the selected study for search button in list modal
 * @property {Function} restGet - REST api to grab study's data for list modal
 * @property {String} tab - String to flag which tab is active
 * @property {Array} selectedStudies - list of selected studies for modal
 * @property {Function} handleCheckboxChange - function for selected studies checkbox
 * @returns {JSX} SearchResult Component
 */

const SearchResult = (props) => {
    const {
        propertyList,
        resultData,
        highlight,
        matchingVariable,
        list,
        listLabel,
        setCrossEntityListModalVisible,
        setCrossEntityList,
        setSelectedVariable,
        setSelectedStudy,
        restGet,
        tab,
        selectedStudies,
        handleCheckboxChange,
    } = props;
    const items = [];

    /**
     * Interactable SearchResult component
     * @property {String} name - name of the metadata property
     * @property {String} [value] - value of the metadata property
     * pushes a row of metadata in the card
     */
    const addMetaData = (name, value, highlight, propertyName) => {
        // Treat inputs as readonly. Check if the value is too long.
        let valueCopy = value;
        valueCopy = formatValue(propertyName, valueCopy, highlight, 512);
        items.push(
            <>
                <div className={classes.break} />
                <span className={classes.name}>{name}: </span>
                <span className={classes.value}>{valueCopy}</span>
            </>
        );
    };

    // if propertyList exists, we have the names for the metadata
    if (propertyList) {
        // for each property in this list, see if that property is populated and add it in the card.
        for (const property of propertyList) {
            if (resultData[property.entityPropertyName]) {
                addMetaData(property.displayLabel, resultData[property.entityPropertyName], highlight, property.entityPropertyName);
            }
        }
    }

    // Split metadata into 2 columns.
    let halfSize;
    if (tab === 'studies') {
        //Because the metadata tends to be longer for the first few props, we want the second column to contain more props in the case of an odd number for a more visually balanced card. Hence Math.floor() instead of Math.ceil()
        halfSize = Math.floor(items.length / 2);
    } else {
        halfSize = Math.ceil(items.length / 2);
    }

    const firstHalf = items.slice(0, halfSize);
    const secondHalf = items.slice(halfSize, items.length);

    const getFooter = (count, getStudyVariables) => {
        if (count && count > 0) {
            if (tab === 'studies') {
                return (
                    <Button
                        className={classes.crossEntityModalButton}
                        label={`View List of ${listLabel} (${count})`}
                        ariaLabel={`View List of ${listLabel} (${count})`}
                        variant="primary"
                        iconLeft={<CrossEntityModalIcon width="25" height="22" />}
                        handleClick={() => {
                            getStudyVariables();
                        }}
                    ></Button>
                );
            } else {
                return (
                    <Button
                        className={classes.crossEntityModalButton}
                        label={`View List of ${listLabel} (${count})`}
                        ariaLabel={`View List of ${listLabel} (${count})`}
                        variant="primary"
                        iconLeft={<CrossEntityModalIcon width="25" height="22" />}
                        handleClick={() => {
                            setCrossEntityListModalVisible(true);
                            setCrossEntityList(list);
                            setSelectedVariable(matchingVariable.variableName);
                        }}
                    ></Button>
                );
            }
        } else {
            return <div className={`${classes.crossEntityModalButton} ${classes.teal}`}></div>;
        }
    };

    if (tab === 'studies') {
        let varList;

        const getStudyVariables = async () => {
            const response = await restGet(`${GET_STUDY_VARIABLES}${resultData.study_id}`, {
                showLoading: true,
                errorMessage: 'Error with viewing variables',
            });
            if (response.status === 200) {
                varList = response.data.data;
                setCrossEntityListModalVisible(true);
                setCrossEntityList(varList);
                setSelectedStudy(resultData.title);
            }
        };

        return (
            <Card
                variant="result"
                footer={getFooter(resultData.study_variable_count, getStudyVariables)}
                cardClassOverride={classes.sectionedCard}
            >
                <div className={classes.leftSection}>
                    <Form.Check
                        className={classes.selectCheckbox}
                        type="checkbox"
                        id={`selectStudies-list-${resultData.phs}`}
                        checked={selectedStudies.find((item) => item.title === resultData.title && item.phs === resultData.phs) || false}
                        onChange={(e) => handleCheckboxChange(e, resultData)}
                    />
                </div>
                <div>
                    <Link href={`/study/${resultData.study_id}`} className={classes.header}>
                        {formatValue('title', resultData.title, highlight)}
                    </Link>
                    <div className={classes.break} />
                    <div className={classes.metadataContainer}>
                        <div className={classes.metadataList}>{firstHalf}</div>
                        <div className={classes.metadataList}>{secondHalf}</div>
                    </div>
                </div>
            </Card>
        );
    } else {
        let cardTitle;
        if (matchingVariable?.hasOverview) {
            cardTitle = (
                <a href={`/variable/${matchingVariable.variableId}`} className={classes.header}>
                    {formatValue('id', resultData.id, highlight)}
                </a>
            );
        } else {
            cardTitle = <div className={`${classes.header} ${classes.noLink}`}>{formatValue('id', resultData.id, highlight)} </div>;
        }
        return (
            <Card variant="result" footer={getFooter(list.length)}>
                {cardTitle}
                <div className={classes.break} />
                <div className={classes.metadataContainer}>
                    <div className={classes.metadataList}>{firstHalf}</div>
                    <div className={classes.metadataList}>{secondHalf}</div>
                </div>
            </Card>
        );
    }
};

SearchResult.propTypes = {
    handleCheckboxChange: PropTypes.func,
    highlight: PropTypes.array,
    list: PropTypes.array,
    listLabel: PropTypes.string,
    matchingVariable: PropTypes.object,
    propertyList: PropTypes.array,
    restGet: PropTypes.func,
    resultData: PropTypes.object,
    selectedStudies: PropTypes.array,
    setCrossEntityList: PropTypes.func,
    setCrossEntityListModalVisible: PropTypes.func,
    setSelectedStudy: PropTypes.func,
    setSelectedVariable: PropTypes.func,
    tab: PropTypes.string,
};

export default SearchResult;
