/* eslint-disable max-len */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './GettingStarted.module.scss';
import Banner from '../../components/Banner/Banner';
import Card from '../../components/Card/Card';
import CalloutBox from '../../components/CalloutBox/CalloutBox';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Person, QuestionLg, CameraVideo, Envelope } from 'react-bootstrap-icons';
/**
 * View for the GettingStarted Page
 * @returns {Node} object rendering GettingStarted
 */

const GettingStarted = () => {
    const router = useRouter();

    return (
        <>
            <Banner title="Getting Started" path={router.asPath} variant="lab3" ariaLabel="Getting Started Breadcrumb" />

            <Container className={classes.Container}>
                <CalloutBox
                    className={classes.infoText}
                    body={
                        <div>
                            This page contains step-by-step information on how to explore <span className={classes.registered}>®</span>{' '}
                            studies or variables. If you are a data submitter,
                            please visit our <Link href="/resourceCenter/forSubmitters">“For Submitters”</Link> section on the{' '}
                            <Link href="/resourceCenter">Resource Center</Link> page.
                        </div>
                    }
                />
                <Row className={`${classes.Row} whiteTextBackground`}>
                    <Col lg={12}>
                        <p>
                            Secondary research consists of three general steps: Search for datasets of interest, apply for access, and
                            analyze. Below are instructions to help you get started with secondary research using the Canopy.
                        </p>
                    </Col>
                    <Col lg={12}>
                        <h2 className={classes.black}>Searching for Studies</h2>
                        <ol>
                            <li>
                                Navigate to the{' '}
                                <Link href="/studyExplorer/studies?&sort=asc&prop=title&page=1&size=50">Study Explorer</Link>. The Studies
                                Tab will be automatically selected.
                            </li>
                            <li>
                                Enter your search term in the search bar. Use the <b>Filters</b> to refine your search results.
                            </li>
                            <li>
                                Click on the <b>Study Name</b> to go to the <b>Study Overview</b> page with comprehensive study information.
                            </li>
                            <ol type="a">
                                <li>
                                    The <b>Study Information</b> section contains information to help users gain high-level study
                                    understanding.
                                </li>
                                <li>
                                    The <b>Study Documents</b> section, when available, contains study-submitted documentation, such as
                                    README files.
                                </li>
                                <li>
                                    The <b>Data Files</b> ssection lists the most recent data files and includes downloadable metadata and
                                    data dictionary files. It also includes viewable variable information corresponding to each data file,
                                    so users can learn more about a study and its data before requesting access.
                                </li>
                            </ol>
                        </ol>
                        <br />
                        <h2 className={classes.black}>Searching for Variables</h2>
                        <p>
                            Users can search for variables using the <b>Variables Tab</b> in the{' '}
                            <Link href="/studyExplorer/variables">Study Explorer</Link>, or the{' '}
                        </p>

                        <h3 className={classes.black}>Using the Variables Tab in the Study Explorer</h3>
                        <ol>
                            <li>
                                Navigate to the <Link href="/studyExplorer/variables">Study Explorer</Link>.
                            </li>
                            <li>
                                Select the <b>Variables Tab</b> above the results table to switch from Study search to Variable search.
                            </li>
                            <li>
                                Enter your search term in the search bar. Use the <b>Filters</b> to refine your search results.
                            </li>
                            <li>
                                Click on the <b>Variable Name</b> (when link is available) within the search result to go to the{' '}
                                <b>Variable Overview</b> page with comprehensive variable information.
                            </li>
                            <ol type="a">
                                <li>
                                    The <b>Variable Information</b> section contains detailed information to help users understand the data
                                    context and structure before requesting access, helping to make informed decisions.
                                </li>
                                <li>
                                    The <b>List of Studies Using Variable</b> section lists all the studies that contain the specified
                                    variable to help you identify relevant datasets. Each study is linked to its <b>Study Overview</b> page
                                    where you can find more study information.
                                </li>
                            </ol>
                        </ol>
                        <br />
                        <br />
                    </Col>
                    <Col>
                        <Card title="Resources" headerImg="/images/large1.png" variant="info" cardClassOverride={classes.resourcesCard}>
                            <Row>
                                <Col lg={6}>
                                    <ul className={classes.resourcesList}>
                                        <li>
                                            <div>
                                                <Person size={35} />
                                            </div>
                                            <div>Read the User Tutorial at: Tutorial Page</div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col lg={6}>
                                    <ul className={classes.resourcesList}>
                                        <li>
                                            <div>
                                                <QuestionLg size={35} />
                                            </div>
                                            <div>Access Canopy FAQs at: FAQ page</div>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default GettingStarted;
