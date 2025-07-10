/* eslint-disable multiline-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './Breadcrumbs.module.scss';
import Link from 'next/link';
import { ChevronCompactRight } from 'react-bootstrap-icons';

/**
 * A react component denoting the crumb path for the current page
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array[Object]} [manualCrumbs] - Defined array of objects that contain page label and page link for the breadcrumbs
 * @property {String} [path] - path from router to be parsed to create breadcrumbs
 * @property {String} [ariaLabel] - Aria Label for the whole breadcrumb component
 * @returns {JSX} A Breadcrumb React Component
 */
const Breadcrumbs = (props) => {
    const { disabled, ariaLabel, manualCrumbs, path } = props;

    let crumbs;

    if (manualCrumbs) {
        crumbs = manualCrumbs;
    } else {
        // Remove search parameters and anchors, parse path, and format page labels from camel case to spaced, capital words
        let pathPages = path.split('?')[0].split('#')[0];
        pathPages = pathPages.split('/');

        crumbs = pathPages.map((p) => {
            const spacedLabel = p.replace(/([A-Z])/g, ' $1');
            const cappedLabel = spacedLabel.charAt(0).toUpperCase() + spacedLabel.slice(1);
            return { page: cappedLabel || 'Home', pageLink: `/${p}` };
        });
    }

    const breadcrumbText = `${classes.breadcrumbsText}`;
    const items = [];

    const addCrumb = (crumb, disabled) => {
        items.push(
            <span key={crumb.page}>
                {disabled ? (
                    <span> {crumb.page} </span>
                ) : (
                    <Link href={crumb.pageLink} aria-label={crumb.ariaLabel} legacyBehavior>
                        {crumb.page}
                    </Link>
                )}
                <span>
                    <ChevronCompactRight />
                </span>
            </span>
        );
    };

    // let active = 2;
    if (crumbs) {
        for (let i = 0; i <= crumbs.length - 2; i++) {
            addCrumb(crumbs[i]);
        }
        items.push(
            <span key={crumbs[crumbs.length - 1].page} className={breadcrumbText}>
                {crumbs[crumbs.length - 1].page}
            </span>
        );
    }

    return (
        <div aria-label={ariaLabel} disabled={disabled} className={breadcrumbText}>
            {items}
        </div>
    );
};

Breadcrumbs.propTypes = {
    ariaLabel: PropTypes.string,
    disabled: PropTypes.bool,
    manualCrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            page: PropTypes.string,
            pageLink: PropTypes.string,
            ariaLabel: PropTypes.string,
        })
    ),
    path: PropTypes.string,
};

export default Breadcrumbs;
