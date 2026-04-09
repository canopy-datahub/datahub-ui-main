import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './BadgeSection.module.scss';
import { Col, Row } from 'react-bootstrap';
import Button from '../../../../components/Button/Button';
import DeleteCircleIcon from '../../../../components/Images/svg/DeleteCircleIcon';
import { handleChecked } from '../../../../lib/componentHelpers/FacetFunctions/handleChecked';

/**
 * A visual container for other visual React components.
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @returns {JSX} A Badge React Component
 */

const Badge = (props) => {
    const { header, facet, activeFacets, entityName, setFacets, handleSearch } = props;
    const [facetInit, setInit] = useState(facet);
    const [facetText, setFacetText] = useState(shortenFacetText(facetInit));
    const [circleColor, setCircleColor] = useState('local');
    const [circleBorder, setCircleBorder] = useState('local');

    function shortenFacetText(facet, hover) {
        const shortenedText = facet.substring(0, 23);
        if (facet.length > 25 && !hover) {
            return shortenedText + '...';
        }
        return shortenedText;
    }
    //UseEffect for cleanup between renders
    useEffect(() => {
        setInit(facet);
    });
    //UseEffect after the cleanup to properly display the initial text as shortened.
    useEffect(() => {
        setFacetText(shortenFacetText(facetInit));
    }, [facetInit]);

    return (
        <div
            aria-label="Filter Badge"
            className={classes.badge}
            onFocus={() => {
                setFacetText(facetInit, true);
            }}
            onBlur={() => {
                setFacetText(shortenFacetText(facetInit, false));
            }}
            onMouseOver={() => {
                setFacetText(facetInit, true);
            }}
            onMouseLeave={() => {
                setFacetText(shortenFacetText(facetInit, false));
            }}
        >
            <Col>
                <Row className={classes.headerRow}>
                    <div className={classes.column}>
                        <h4 className={classes.header}>{header}</h4>
                        <div className={classes.delete}>
                            <Button
                                ariaLabel={`Remove ${facet} from your filters`}
                                onMouseOver={() => {
                                    setCircleColor('#2C819C');
                                    setCircleBorder('#FFFFFF');
                                }}
                                onMouseLeave={() => {
                                    setCircleColor('local');
                                    setCircleBorder('local');
                                }}
                                iconCenter={
                                    <DeleteCircleIcon
                                        circleBorder={circleBorder}
                                        circleFill={circleColor}
                                        xColor={'#FFFFFF'}
                                        dimensions={{ x: '30', y: '20' }}
                                    />
                                }
                                className={classes.closeButton}
                                handleClick={() => {
                                    //Check if we're looking at the search query, not the filters
                                    if (entityName === 'Search Term') {
                                        setFacets('');
                                        handleSearch(undefined, true);
                                    } else {
                                        handleChecked(true, facet, entityName, activeFacets, setFacets, handleSearch);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </Row>

                <Row>
                    <div className={classes.textContainer}>
                        <span className={classes.badgeText}>{facetText}</span>
                    </div>
                </Row>
            </Col>
        </div>
    );
};

Badge.propTypes = {};

export default Badge;
