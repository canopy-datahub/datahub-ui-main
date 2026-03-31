import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import classes from './Footer.module.scss';
import ExternalLinkIcon from '../../ExternalLinkIcon/ExternalLinkIcon';
import YoutubeIcon from '../../Images/svg/YoutubeIcon';
import MailIcon from '../../Images/svg/MailIcon';
import Link from 'next/link';
import { GET_RESOURCE_CENTER_BUCKET } from '../../../constants/apiRoutes';
import HHSLogo from '../../Images/svg/hhsLogo';

/**
 * Page Footer
 * Note: Footer uses some external icons that are geared with ARIA labels to indicate external links like the HHS website
 * @param {Boolean} useColorfulVariant - flag from CoreLayout to determine use of colorful version vs simple version
 *
 * @returns {JSX} Page Footer Component
 */

export default function Footer({ useColorfulVariant, baseUrl }) {
    return (
        <>
            <footer className={classes.footer}>
                <div className={classes.blackFooter}>
                    <Container className={classes.blackFooterContainer}>
                        <Row className="mb-4">
                            <Col sm={4} className={`${classes.column} ${classes.multiRow} `}>
                                <p className={`${classes.columnTitle} ${classes.gray}`}>Site</p>
                                <Link href="/support">Need Support?</Link>
                                <Link href="/about">About</Link>
                                <Link href="/faq">Frequently Asked Questions</Link>
                                <Link href="/studyExplorer/studies">Study Explorer</Link>
                                <Link href="/news">News</Link>
                                <Link href="/resourceCenter">Resource Center</Link>
                            </Col>
                            <Col sm={4} className={classes.column}>
                                <p className={`${classes.columnTitle} ${classes.teal}`}>Related Websites</p>
                                <div>
                                    <a href="https://www.stanford.edu/" target="_blank" rel="noopener noreferrer">
                                        Stanford University
                                    </a>
                                    <ExternalLinkIcon />
                                </div>
                                <div>
                                    <a href="https://bmir.stanford.edu/" target="_blank" rel="noopener noreferrer">
                                        Stanford Computational Medicine
                                    </a>
                                    <ExternalLinkIcon />
                                </div>
                                <div>
                                    <a href="https://www.nih.gov/" target="_blank" rel="noopener noreferrer">
                                        National Institutes of Health (NIH)
                                    </a>
                                    <ExternalLinkIcon />
                                </div>
                            </Col>
                            <Col sm={4} className={classes.column}>
                                <p className={`${classes.columnTitle} ${classes.blue}`}>Website Policies</p>
                                <div>
                                    <a href="https://www.stanford.edu/site/privacy/" target="_blank" rel="noopener noreferrer">
                                        Privacy Policy
                                    </a>
                                    <ExternalLinkIcon />
                                </div>
                                <div>
                                    <a href="https://www.stanford.edu/site/terms/" target="_blank" rel="noopener noreferrer">
                                        Terms of Use
                                    </a>
                                    <ExternalLinkIcon />
                                </div>
                                <div>
                                    <a href="https://www.stanford.edu/site/accessibility/" target="_blank" rel="noopener noreferrer">
                                        Accessibility
                                    </a>
                                    <ExternalLinkIcon />
                                </div>
                            </Col>
                        </Row>
                        <Row className={classes.govLinks}>
                            <Col className={classes.mobile}>
                                <a href="https://www.stanford.edu/" target="_blank" rel="noopener noreferrer" aria-label="Stanford University">
                                    Stanford University
                                </a>
                            </Col>
                        </Row>
                        <Row className={classes.socialText}>
                            <div>Connect with Us:</div>
                            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                                <YoutubeIcon />
                            </a>
                            <Link
                                href="/support"
                                className={`px-2`}
                                aria-label="Link to connect with us"
                            >
                                <MailIcon />
                            </Link>
                        </Row>
                    </Container>
                </div>
            </footer>
        </>
    );
}

Footer.propTypes = {
    useColorfulVariant: PropTypes.bool,
};
