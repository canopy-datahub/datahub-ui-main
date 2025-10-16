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
 * For Researcher Resource Cards
 * @property {Object} router - Next router to be used for button handleClick functions
 * @returns {Array} Array of Objects for Card data
 */

const moreButtonClasses = `${classes.moreButton} ${classes.teal}`;
const downloadButtonClasses = `${classes.downloadButton} ${classes.teal}`;

export const forResearchersCards = (router, baseUrl, restGet) => {
    return [
        {
            title: 'Dolor Sit Amet',
            type: 'forResearchers',
            children: (
                <>
                    <p>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
                        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <Button
                            className={downloadButtonClasses}
                            label="PDF (118KB)"
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
            title: 'Dolor Sit Amet',
            type: 'forResearchers',
            children: (
                <>
                    <p>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
                        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <a href="/" target="_blank" rel="noreferrer">
                        <Button className={moreButtonClasses} label="View Page" variant="primary" size="auto" rounded="lite" />
                    </a>
                </span>
            ),
        },
        {
            title: 'User Tutorial',
            type: 'forResearchers',
            children: (
                <>
                    <p>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
                        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="/tutorial">
                        <Button className={moreButtonClasses} label="View Page" variant="primary" size="auto" rounded="lite" />
                    </Link>
                    <Button
                        className={downloadButtonClasses}
                        label="PDF (3.2MB)"
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
            title: 'Dolor Sit Amet',
            type: 'forResearchers',
            children: (
                <>
                    <p>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
                        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <Button
                            className={downloadButtonClasses}
                            label="PDF (439KB)"
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
    ];
};

forResearchersCards.PropTypes = {
    router: PropTypes.object,
};
