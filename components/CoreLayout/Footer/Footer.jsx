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
                <div className={`${classes.footerBackground} ${useColorfulVariant ? classes.colorful : classes.thin} `}></div>
                {!useColorfulVariant && <div className={classes.whitebg} />}
                <div className={classes.content}>
                    <Container>
                        <Row className="mb-2">
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
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    Link
                                </a>
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    Link
                                </a>
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    Link
                                </a>
                                <div>
                                    <a href="/" target="_blank" rel="noopener noreferrer">
                                        Link
                                    </a>
                                    <ExternalLinkIcon />
                                </div>
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    Link
                                </a>
                            </Col>
                            <Col sm={4} className={classes.column}>
                                <p className={`${classes.columnTitle} ${classes.blue}`}>Website Policies</p>
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    Link
                                </a>
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    Link
                                </a>
                                <div>
                                    <a href="/" target="_blank" rel="noopener noreferrer">
                                        Link
                                    </a>
                                    <ExternalLinkIcon />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={classes.blackFooter}>
                    <Container className={classes.blackFooterContainer}>
                        <Row className={classes.govLinks}>
                            <Col className={classes.desktop}>
                                <a href="" target="_blank" rel="noopener noreferrer" aria-label="Logo1">
                                    Logo1
                                </a>
                            </Col>
                            <Col className={classes.mobile}>
                                <a href="" target="_blank" rel="noopener noreferrer" aria-label="Logo2">
                                    Logo2
                                </a>
                            </Col>
                        </Row>
                        <Row className={classes.socialText}>
                            <div>Connect with Us:</div>
                            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                                <YoutubeIcon />
                            </a>
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-2`}
                                aria-label="Link to Sign Up for Newsletter"
                            >
                                <MailIcon />
                            </a>
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
