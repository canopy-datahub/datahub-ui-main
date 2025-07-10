import React from 'react';
import PropTypes from 'prop-types';
import classes from './SearchResult.module.scss';
import Card from '../../Card/Card';
import { formatValue } from './utilityFunctions';
import { useRouter } from 'next/router';
import Link from 'next/link';

/**
 * Interactable SearchResult component
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} propertyList - a list of metadata properties along with their string representation for their names
 * @property {Object} resultData - an Object with all of the values of the metadata for a result
 * @returns {JSX} SearchResult Component
 */

const SearchResult = (props) => {
    const { propertyList, resultData, highlight } = props;
    const items = [];
    const router = useRouter();

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
                if (resultData[property.entityPropertyName]) {
                    addMetaData(property.displayLabel, resultData[property.entityPropertyName], highlight, property.entityPropertyName);
                }
            }
        }
    }

    // Split metadata into 2 columns. Because the metadata tends to be longer for the first few props, we want the second column to contain more props in the case of an odd number for a more visually balanced card. Hence Math.floor() instead of Math.round()
    const halfSize = Math.floor(items.length / 2);

    const firstHalf = items.slice(0, halfSize);
    const secondHalf = items.slice(halfSize, items.length);

    return (
        <>
            <Card variant="result">
                <Link href={`study/${resultData.study_id}`} className={classes.header}>
                    {formatValue('title', resultData.title, highlight)}
                </Link>
                <div className={classes.break} />
                <div className={classes.metadataContainer}>
                    <div className={classes.metadataList}>{firstHalf}</div>
                    <div className={classes.metadataList}>{secondHalf}</div>
                </div>
            </Card>
        </>
    );
};

SearchResult.propTypes = {
    propertyList: PropTypes.array.isRequired,
    resultData: PropTypes.object.isRequired,
};

export default SearchResult;
