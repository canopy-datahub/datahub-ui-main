import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/Button/Button';
import ExternalIcon from '../../../components/Images/svg/ExternalIcon';
import classes from '../ResourceCenter.module.scss';

/**
 * External Links Resource Cards
 * @property {Object} router - Next router to be used for button handleClick functions
 * @returns {Array} Array of Objects for Card data
 */

const moreButtonClasses = `${classes.moreButton} ${classes.green}`;

export const externalLinksCards = (router, baseUrl, restGet) => {
    return [
        {
            title: 'Lorem Ipsum',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        <Button
                            className={moreButtonClasses}
                            label="View Page"
                            variant="primary"
                            iconRight={<ExternalIcon />}
                            size="auto"
                            rounded="lite"
                        />
                    </a>
                </span>
            ),
        },
        {
            title: 'Lorem Ipsum',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        <Button
                            className={moreButtonClasses}
                            label="View Page"
                            variant="primary"
                            iconRight={<ExternalIcon />}
                            size="auto"
                            rounded="lite"
                        />
                    </a>
                </span>
            ),
        },
        {
            title: 'Lorem Ipsum',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        <Button
                            className={moreButtonClasses}
                            label="View Page"
                            variant="primary"
                            iconRight={<ExternalIcon />}
                            size="auto"
                            rounded="lite"
                        />
                    </a>
                </span>
            ),
        },
        {
            title: 'Lorem Ipsum',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        <Button
                            className={moreButtonClasses}
                            label="View Page"
                            variant="primary"
                            iconRight={<ExternalIcon />}
                            size="auto"
                            rounded="lite"
                        />
                    </a>
                </span>
            ),
        },
    ];
};

externalLinksCards.PropTypes = {
    router: PropTypes.object,
};
