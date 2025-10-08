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
            <Banner title="Getting Started" path={router.asPath} variant="virus3" ariaLabel="Getting Started Breadcrumb" />

            <Container className={classes.Container}>
                <CalloutBox
                    className={classes.infoText}
                    body={
                        <div>
                            This page contains step-by-step information on how to explore <span className={classes.registered}>®</span>{' '}
                            studies or variables and access analytic software via the Researcher Workbench. If you are a data submitter,
                            please visit our <Link href="/resourceCenter/forSubmitters">“For Submitters”</Link> section on the{' '}
                            <Link href="/resourceCenter">Resource Center</Link> page.
                        </div>
                    }
                />
                <Row className={`${classes.Row} whiteTextBackground`}>
                    <Col lg={12}>
                        <p>
                            Secondary research consists of three general steps: Search for datasets of interest, apply for access, and
                            analyze. Below are instructions to help you get started with secondary research using the Data Hub.
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
                                    understanding, and the <b>dbGaP Study Accession</b> link to the <b>dbGaP Study Overview</b> page where
                                    users can request study-level access.
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
                            <Link href="/variablesCatalog">Variables Catalog</Link>. It is recommended to start with the{' '}
                            <b>Variables Tab</b> to get detailed variable information. As the <b>Variables Tab</b> is continually being
                            updated, users can use the <Link href="/variablesCatalog">Variables Catalog</Link> to supplement.
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

                        <h3 className={classes.black}>Using the Variables Catalog</h3>
                        <ol>
                            <li>
                                Navigate to the <Link href="/variablesCatalog">Variables Catalog</Link>.
                            </li>
                            <li>You can view variables on this page, or download the Complete Data Variable Report to view it offline.</li>
                            <li>View variable information on the page in two ways:</li>
                            <ol type="a">
                                <li>
                                    <b>All Variables</b> lists all data file variables in a comma-separated list. Search specific variables
                                    in the search bar.
                                </li>
                                <li>
                                    <b> Core Variables</b> contains variables harmonized across studies. The variables are listed with
                                    labels in a tabular format.
                                </li>
                            </ol>
                            <li>
                                To download the information, download the Complete Data Variable Report, which comprehensively presents the
                                variables, allowing you to identify each variable, which variables are used by each (C)DCC, and which
                                variables are in each data file.
                            </li>
                            <li>Once you find a study you are interested in, click the following to learn more or request access.</li>
                            <ol type="a">
                                <li>
                                    <b>Study Name</b> links to the Data Hub Study Overview page, where users can learn about study metadata.
                                </li>
                                <li>
                                    <b>dbGaP Study Accession</b> links to the dbGaP Study Overview page, where users can request study-level
                                    access.
                                </li>
                            </ol>
                        </ol>

                        <br />
                        <h2 className={classes.black}>
                            Accessing Data in the NIH <span className={classes.registered}>®</span> Data Hub
                        </h2>
                        <p>
                            The Data Hub contains two types of data: Public access data (including synthetic data) and controlled-access
                            data. Users can access public data by logging in, then navigating to <Link href="/publicData">Public Data</Link>{' '}
                            in the <b>Data Access</b> tab. For more information,{' '}
                            <Link href="/tutorial?tutorial=requestingDataAccess">
                                visit the Request Data Access section of the User Tutorial
                            </Link>
                            .
                        </p>
                        <p>
                            To access controlled access data, users must submit a project request through dbGaP. To ensure the smoothest
                            request process:
                        </p>
                        <ol>
                            <li>Check the requirements.</li>
                            <ol type="a">
                                <li>
                                    Requestors must have a Commons ID (or appropriate Login). If you need an account, request one through
                                    your institution’s Office of Sponsored Research (or equivalent). to learn more about accounts.
                                </li>
                                <li>
                                    <b>
                                        Requestors must be permanent employees of their institution at a level equivalent to a tenure-track
                                        professor or senior scientist with responsibilities that most likely include laboratory
                                        administration and oversight.
                                    </b>{' '}
                                    Non-PI users such as laboratory staff and trainees such as graduate students, and postdoctoral fellows
                                    must have a PI at their institution submit a request and add them as a downloader after dbGaP approval.{' '}
                                    <a href="https://youtu.be/Yem3OH26kX4?feature=shared" target="_blank" rel="noopener noreferrer">
                                        Click here
                                    </a>{' '}
                                    for instructions to add data downloaders.
                                </li>
                            </ol>
                            <li>Prepare a list of studies for the request.</li>
                            <ol type="a">
                                <li>
                                    Record each study’s dbGaP Study Accession (phs) number – found at the top of the Study Overview page, or
                                    on the Study Explorer. Later, you will search for and add these numbers in the dbGaP controlled-access
                                    portal.
                                </li>
                                <li>
                                    If you are planning to access all studies from a program ( Digital Health Technologies ( DHT), Radical
                                    (-rad), Tech, or Underserved Populations (-UP)), use the corresponding program dbGaP collection listed
                                    below. These study collections contain all the studies in dbGaP for General Research Use (GRU). If you
                                    are only using a subset of studies from a program, follow directions in Step 2.a.
                                    <ol type="i" className={classes.list}>
                                        <li>
                                            <a
                                                href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/collection.cgi?study_id=phs003666.v1.p1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                DHT collection, phs003666.v1.p1
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/collection.cgi?study_id=phs003834.v1.p1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                -rad collection, phs003834.v1.p1
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/collection.cgi?study_id=phs003831.v1.p1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Tech collection, phs003831.v1.p1
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/collection.cgi?study_id=phs003832.v1.p1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                -UP collection, phs003832.v1.p1
                                            </a>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                            <li>Submit the request in the dbGaP controlled-access portal.</li>
                            <ol type="a">
                                <li>
                                    Navigate to the{' '}
                                    <a
                                        href="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        dbGaP controlled-access portal
                                    </a>
                                    , and login using your Commons credentials.
                                </li>
                                <li>Navigate to My Projects, and create a new project.</li>
                                <li>
                                    In the Choose Datasets or Confirm Datasets tabs, select the studies or collections you want to add to
                                    the Data Access Request by entering the dbGap Study/Collection Accession ID in the Study Lookup box. You
                                    can request up to 200 studies. Select all datasets you have decided to include using the checkbox and
                                    move to the next step by clicking on “Add Selected and Continue”.
                                </li>
                                <li>Fill out the remaining request.</li>
                            </ol>
                            <li>
                                After you obtain dbGaP approval to access data, use the same or NIH account used in dbGaP to log into the
                                Data Hub and access the approved data.{' '}
                            </li>
                        </ol>
                        <p>
                            For guidance on the development of a data access request to complete project requests, please see{' '}
                            <a
                                href="https://grants.nih.gov/sites/default/files/flmngr/Tips%20for%20Preparing%20a%20Successful%20DAR.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Tips for preparing a successful Data Access Request
                            </a>
                            .
                        </p>

                        <br />
                        <h2 className={classes.black}>Accessing Analytic Software in the Researcher Workbench</h2>
                        <ol>
                            <li>
                                After receiving a dbGaP study access confirmation email, return to the <Link href="/"> Data Hub</Link> and
                                login using the <b>same </b> or <b>NIH Login</b> as for dbGaP.
                            </li>
                            <li>
                                Navigate to <Link href="/myApprovedData">My Approved Data</Link> in the <b>Data Access</b> tab.
                            </li>
                            <li>
                                Click the <b>Create Workbench</b> button.
                            </li>
                            <li>
                                To add files to the <b>Workbench</b>, go back to the <b>My Approved Data</b>, select files for analysis, and
                                click <b>Add to Workbench</b>.
                                <div className={classes.indented}>
                                    Note: You can also add synthetic data from the <b>Public Data</b> option in the <b>Data Access</b> tab,
                                    or upload your own data files into the Workbench.
                                </div>
                            </li>
                            <li>
                                Read the <Link href={`/workbenchTutorial`}>Workbench User Tutorial</Link> and view our Getting Started
                                videos on{' '}
                                <a href="https://www.youtube.com/watch?v=Tq-8GBewoME" target="_blank" rel="noopener noreferrer">
                                    creating a workbench and adding files
                                </a>
                                , and{' '}
                                <a href="https://www.youtube.com/watch?v=wyH2mVLJ9ng" target="_blank" rel="noopener noreferrer">
                                    data analysis in the Workbench
                                </a>{' '}
                                for further guidance.
                            </li>
                        </ol>
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
                                        <li>
                                            <div>
                                                <QuestionLg size={35} />
                                            </div>
                                            <div>Access Data Hub FAQs at: FAQ page</div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col lg={6}>
                                    <ul className={classes.resourcesList}>
                                        <li>
                                            <div>
                                                <CameraVideo size={35} />
                                            </div>
                                            <div>
                                                Check out our{' '}
                                                <a href="https://www.youtube.com/@NIHRADxDataHub" target="_blank" rel="noopener noreferrer">
                                                    YouTube channel
                                                </a>{' '}
                                                for tutorials and webinars
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <Envelope size={35} />
                                            </div>
                                            <div>Email the Data Hub Partners at: example@example.com</div>
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
