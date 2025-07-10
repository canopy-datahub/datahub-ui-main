import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '../../../components/Button/Button';
import classes from '../ResourceCenter.module.scss';

/**
 * General Resource Cards
 * @property {Object} router - Next router to be used for button handleClick functions
 * @returns {Array} Array of Objects for Card data
 */

const moreButtonClasses = `${classes.moreButton} ${classes.navyBlue}`;
const downloadButtonClasses = `${classes.downloadButton} ${classes.navyBlue}`;

export const generalCards = (router, baseUrl, restGet) => {
    return [
        {
            title: 'Learn About',
            type: 'general',
            children: (
                <>
                    <p>
                        Read a high-level overview of the RADx Data Hub as well as the programs and external partners who support the
                        development of the system.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="/about">
                        <Button className={moreButtonClasses} label="View Page" variant="primary" size="auto" rounded="lite" />
                    </Link>
                </span>
            ),
        },
        {
            title: 'Funding Opportunities',
            type: 'general',
            children: (
                <>
                    <p>
                        Learn about existing grants, contracts, and other opportunities related to COVID-19 research that open for
                        application.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="/fundingOpportunities">
                        <Button className={moreButtonClasses} label="View Page" variant="primary" size="auto" rounded="lite" />
                    </Link>
                </span>
            ),
        },
        {
            title: 'News',
            type: 'general',
            children: (
                <>
                    <p>Read our latest press releases, news articles, and updates concerning RADx Data Hub and COVID-19.</p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="/news">
                        <Button className={moreButtonClasses} label="View Page" variant="primary" size="auto" rounded="lite" />
                    </Link>
                </span>
            ),
        },
        {
            title: 'Events',
            type: 'general',
            children: (
                <>
                    <p>
                        View upcoming webinars and other events about key topics related to the RADx Data Hub, such as de-identification,
                        using the hub, and more.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="/events">
                        <Button className={moreButtonClasses} label="View Page" variant="primary" size="auto" rounded="lite" />
                    </Link>
                </span>
            ),
        },
        {
            title: 'List of Publications',
            type: 'general',
            children: (
                <>
                    <p>
                        View published research from across the NIH RADx Initiative to inspire secondary analysis and potential
                        collaborations
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
            title: 'User Code of Conduct',
            type: 'general',
            children: (
                <>
                    <p>
                        Familiarize yourself with the RADx Data Hub Code of Conduct, which outlines the rules and standards you must comply
                        with when using the RADx Data Hub.
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
            title: 'Frequently Asked Questions (FAQ)',
            type: 'general',
            children: (
                <>
                    <p>
                        Read answers to commonly asked questions about the RADx Data Hub on key topics, such as file organization,
                        requesting access to data, data use and compliance as well as general questions about the hub.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="/faq">
                        <Button className={moreButtonClasses} label="View Page" variant="primary" size="auto" rounded="lite" />
                    </Link>
                </span>
            ),
        },
        {
            title: 'Glossary',
            type: 'general',
            children: (
                <>
                    <p>
                        Take a look at our list of over 20 terms used across the RADx Data Hub. This list supplements the RADx Data Hub
                        Tutorial as well as the FAQ document to help you understand the content in the hub.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="/glossary">
                        <Button className={moreButtonClasses} label="View Page" variant="primary" size="auto" rounded="lite" />
                    </Link>
                </span>
            ),
        },
        {
            title: 'Summary of Data Hub Content',
            type: 'general',
            children: (
                <>
                    <p>Explore graphical and tabular statistics for RADx Data Hub Studies.</p>
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
            title: 'RADx Data Hub File Organization',
            type: 'general',
            children: (
                <>
                    <p>Learn about the different types of files in the RADx Data Hub and how they are related to each other.</p>
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

generalCards.PropTypes = {
    router: PropTypes.object,
};
