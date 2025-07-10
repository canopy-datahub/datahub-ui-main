import React from 'react';
import PropTypes from 'prop-types';
import classes from '../ResourceCenter.module.scss';

/**
 * For Submitters Resource Cards
 * @property {Object} router - Next router to be used for button handleClick functions
 * @returns {Array} Array of Objects for Card data
 */

const moreButtonClasses = `${classes.moreButton} ${classes.darkBlue}`;
const downloadButtonClasses = `${classes.downloadButton} ${classes.darkBlue}`;

export const forSubmittersCards = (router, baseUrl, restGet) => {
    return [
        {
            title: 'File Upload SOP',
            type: 'forSubmitters',
            children: (
                <>
                    <p>Read our guidelines for preparing datasets and associated documentation to deposit in the RADx Data Hub.</p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                    </div>
                </span>
            ),
        },
        {
            title: 'Study Registration SOP',
            type: 'forSubmitters',
            children: (
                <>
                    <p>
                        Learn how to register your study in the RADx Data Hub and make your research available to the COVID-19 research
                        community.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                    </div>
                </span>
            ),
        },
        {
            title: 'Global Codebook',
            type: 'forSubmitters',
            children: (
                <>
                    <p>
                        Ensure your data files comply with NIH data standards by viewing the Global Codebook, a data dictionary that oulines
                        the standards for the Tier 1 Common Data Elements (CDEs).
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                    </div>
                </span>
            ),
        },
        {
            title: 'De-Identification Guidance',
            type: 'forSubmitters',
            children: (
                <>
                    <p>
                        Follow our De-Identification Guidance to correctly de-identify your data and ensure your data files pass the
                        system&apos;s validation checks during the file submission process.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                    </div>
                </span>
            ),
        },
        {
            title: 'De-Identification Webinar',
            type: 'forSubmitters',
            children: (
                <>
                    <p>Listen to our experts talk about best practices for data de-identification.</p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                </span>
            ),
        },
        {
            title: 'Webinar - Making Datasets Findable and Accessible',
            type: 'forSubmitters',
            children: (
                <>
                    <p>
                        Listen to our experts discuss how to make datasets more findable and accessible by using things like Digitable
                        Object Identifiers (DOI), Compact URIs (CURIEs), and other identifiers.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                </span>
            ),
        },
        {
            title: 'Data File Naming Convention Guidance',
            type: 'forSubmitters',
            children: (
                <>
                    <p>
                        Learn about the types of data files, their naming conventions, and content rules when preparing data files to be
                        submitted to the RADx Data Hub
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                    </div>
                </span>
            ),
        },
    ];
};

forSubmittersCards.PropTypes = {
    router: PropTypes.object,
};
