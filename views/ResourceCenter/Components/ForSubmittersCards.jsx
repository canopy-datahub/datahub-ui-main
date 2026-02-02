import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '../../../components/Button/Button';
import ExternalIcon from '../../../components/Images/svg/ExternalIcon';
import DownloadIcon from '../../../components/Images/svg/DownloadIcon';
import classes from '../ResourceCenter.module.scss';
import { GET_RESOURCE_CENTER_BUCKET } from '../../../constants/apiRoutes';
import { downloadLink } from '../../../lib/pageHelpers/downloadLink';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * For Submitters Resource Cards
 * @property {Object} router - Next router to be used for button handleClick functions
 * @returns {Array} Array of Objects for Card data
 */

const moreButtonClasses = `${classes.moreButton} ${classes.darkGreen}`;
const downloadButtonClasses = `${classes.downloadButton} ${classes.darkGreen}`;

export const forSubmittersCards = (router, baseUrl, restGet) => {
    return [
        {
            title: 'Consectetur Adipiscing',
            type: 'forSubmitters',
            children: (
                <>
                    <p>
                        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
                        commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
                        consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <Button
                            className={downloadButtonClasses}
                            label="PDF (1.5MB)"
                            iconLeft={<DownloadIcon />}
                            variant="primary"
                            size="auto"
                            rounded="lite"
                            handleClick={async () => {}}
                        />
                    </div>
                </span>
            ),
        }
    ];
};

forSubmittersCards.PropTypes = {
    router: PropTypes.object,
};
