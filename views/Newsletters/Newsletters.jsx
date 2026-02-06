/* eslint-disable max-len */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './Newsletters.module.scss';
import Banner from '../../components/Banner/Banner';
import CalloutBox from '../../components/CalloutBox/CalloutBox';
import Button from '../../components/Button/Button';
import ExternalLinkIcon from '../../components/ExternalLinkIcon/ExternalLinkIcon';
import { useRouter } from 'next/router';

/**
 * View for the Newsletters Page
 * @property {Object} events - List of all past and current events
 * @returns {Node} object rendering Newsletters
 */

const Newsletters = (props) => {
    const { newsletters } = props;
    const router = useRouter();

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        separator: '/',
    };

    const years = Object.keys(newsletters);

    const renderedNewsletters = (newslettersForYear) => {
        return newslettersForYear?.map((item, index) => {
            return (
                <li key={`${item.title}-${index}`} className={classes.section}>
                    {new Date(item.releaseDate).toLocaleDateString(undefined, options)} -{' '}
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                    </a>{' '}
                    <ExternalLinkIcon />
                </li>
            );
        });
    };

    const renderedYears = years
        ?.slice()
        .reverse()
        .map((year) => {
            return (
                <div key={year}>
                    <div className={classes.bold}>{year}</div>
                    <ul>{renderedNewsletters(newsletters[year])}</ul>
                </div>
            );
        });

    return (
        <>
            <Banner title="Newsletters" path={router.asPath} variant="lab3" ariaLabel="Newsletters Breadcrumb" />

            <Container className={classes.Container}>
                <CalloutBox
                    className={classes.infoText}
                    body={
                        <div className={classes.instructions}>
                            <div>Sign up below to receive community news and feature update announcements for the Data Hub.</div>
                            <div>
                                <Button label="Subscribe" variant="primary" size="auto"></Button>
                                <ExternalLinkIcon width="13" height="13" />
                            </div>
                        </div>
                    }
                />
                <Row className={`${classes.Row} whiteTextBackground`}>
                    <Col>{renderedYears}</Col>
                </Row>
            </Container>
        </>
    );
};

export default Newsletters;
