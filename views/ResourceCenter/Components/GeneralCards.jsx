import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '../../../components/Button/Button';
import DownloadIcon from '../../../components/Images/svg/DownloadIcon';
import classes from '../ResourceCenter.module.scss';
import { GET_RESOURCE_CENTER_BUCKET } from '../../../constants/apiRoutes';
import { downloadLink } from '../../../lib/pageHelpers/downloadLink';
import { sendGAEvent } from '@next/third-parties/google';

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
                        The Redwood is a secure, cloud-based platform that empowers researchers to upload and access curated, de-identified datasets, 
                        accelerating innovation in disease diagnostics and public health initiatives.
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
                        Explore current funding programs, grants, and calls for proposals that support research in disease diagnostics and public health initiatives.
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
                    <p>
                        Stay up to date with the latest announcements, platform updates, and highlights from our community.
                    </p>
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
                        Discover upcoming workshops, webinars, and events.
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
            title: 'Sed Do Eiusmod',
            type: 'general',
            children: (
                <>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <Button
                            className={downloadButtonClasses}
                            label="XLSX (96KB)"
                            iconLeft={<DownloadIcon />}
                            variant="primary"
                            size="auto"
                            rounded="lite"
                            handleClick={async () => {}}
                        />
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
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="/faq">
                        <Button className={moreButtonClasses} label="View Page" variant="primary" size="auto" rounded="lite" />
                    </Link>
                    <Button
                        className={downloadButtonClasses}
                        label="PDF (522KB)"
                        iconLeft={<DownloadIcon />}
                        variant="primary"
                        size="auto"
                        rounded="lite"
                        handleClick={async () => {}}
                    />
                </span>
            ),
        },
        {
            title: 'Glossary',
            type: 'general',
            children: (
                <>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="/glossary">
                        <Button className={moreButtonClasses} label="View Page" variant="primary" size="auto" rounded="lite" />
                    </Link>
                    <Button
                        className={downloadButtonClasses}
                        label="PDF (433KB)"
                        iconLeft={<DownloadIcon />}
                        variant="primary"
                        size="auto"
                        rounded="lite"
                        handleClick={async () => {}}
                    />
                </span>
            ),
        },
    ];
};

generalCards.PropTypes = {
    router: PropTypes.object,
};
