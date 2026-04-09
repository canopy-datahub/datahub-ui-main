/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import classes from './News.module.scss';
import Banner from '../../components/Banner/Banner';
import Link from 'next/link';
import parse from 'html-react-parser';
import { regexReplace } from '../../lib/componentHelpers/ResourcePages/regexReplace';
import { format } from 'date-fns';

/**
 * View for the News Page
 * @property {Array<Object>} news - List of all news
 * @returns {Node} object rendering news
 */

const News = (props) => {
    const { news } = props;

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Latest News & Updates',
        },
    ];

    const renderedNews = news.map((item) => {
        return (
            <div key={item.title} className={classes.section}>
                <h5>
                    <Link href={`news/${item.slug}`} legacyBehavior>
                        {item.title}
                    </Link> | {format(new Date(item.startDate), 'P')}
                </h5>
                <hr className={classes.separator} />
                <div>{parse(regexReplace(item.description, item.links))}</div>
            </div>
        );
    });

    return (
        <>
            <Banner
                title="Latest News &amp; Updates"
                manualCrumbs={crumbs}
                variant="lab4"
                ariaLabel="Latest News &amp; Updates Breadcrumb"
            />

            <Container className={classes.Container}>
                <Row className={`${classes.Row} whiteTextBackground`}>{renderedNews}</Row>
            </Container>
        </>
    );
};

News.propTypes = {
    news: PropTypes.array,
};

export default News;
