/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import classes from './Homepage.module.scss';
import Button from '../../components/Button/Button';
import SearchBar from '../../components/SearchComponents/SearchBar/SearchBar';
import Link from 'next/link';
import ChevronRightIcon from '../../components/Images/svg/ChevronRightIcon';
import ExternalLinkIcon from '../../components/ExternalLinkIcon/ExternalLinkIcon';
import NewStudiesIcon from '../../components/Images/svg/NewStudiesIcon';
import NewFilesIcon from '../../components/Images/svg/NewFilesIcon';
import UpdatedFilesIcon from '../../components/Images/svg/UpdatedFilesIcon';
import UpStatIcon from '../../components/Images/svg/UpStatIcon';
import RadStatIcon from '../../components/Images/svg/RadStatIcon';
import TechStatIcon from '../../components/Images/svg/TechStatIcon';
import DHTStatIcon from '../../components/Images/svg/DHTStatIcon';
import { getTypeIcon } from '../../lib/componentHelpers/EventsFunctions/getTypeIcon';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { regexReplace } from '../../lib/componentHelpers/ResourcePages/regexReplace';
import { getStudyLabel } from '../../lib/utils/getStudyLabel';
import { buildSearchQuery } from '../../lib/utils/searchQueryBuilder';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notifications/notificationsSlice';
import { BaseNotification, NotificationType, ErrorMessage } from '../../store/notifications/notificationConstants';
import { useSearchParams } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * View for the Homepage
 * @property {Array<Object>} funding - List of upcoming funding opportunities
 * @property {Array<Object>} news - List of latest news
 * @property {Array<Object>} events - List of upcoming events
 * @property {Object} stats - Statistics to show for hub and each DCC
 * @property {Object} contentUpdates - Lists of content updates for new studies, files, and updated files
 * @returns {Node} object rendering the Homepage
 */

const Homepage = (props) => {
    const { funding, news, events, stats, contentUpdates } = props;
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    // Show toast for error redirect
    const errorRedirect = searchParams.get('e');

    if (errorRedirect) {
        const tempNotification = { ...BaseNotification };
        tempNotification.autoHide = false;
        tempNotification.type = NotificationType.ERROR;
        tempNotification.delay = 8000;
        tempNotification.message = ErrorMessage[errorRedirect];
        dispatch(addNotification(tempNotification));
    }

    // Search Bar
    const [query, setQuery] = useState('');
    const [sorting, setSorting] = useState({
        sort: 'desc',
        field: 'relevance',
    });

    const handleSearch = (query) => {
        sendGAEvent('event', 'homePage', { value: 'Home Page Search Made', query: JSON.stringify(query) });
        const searchQuery = buildSearchQuery({ query, pagination: { size: 50, page: 1 }, sorting, setSorting, view: 'table' });
        router.push(`/studyExplorer/studies?${searchQuery}`);
    };

    // STATS

    const getStat = (dcc) => {
        return stats.dtos.find((obj) => {
            return obj.name === dcc;
        });
    };

    const up = getStat('UP') || { name: 'UP', studyCount: 0, totalFileSize: 0, dataFileCount: 0, documentCount: 0 };
    const rad = getStat('rad') || { name: 'rad', studyCount: 0, totalFileSize: 0, dataFileCount: 0, documentCount: 0 };
    const tech = getStat('Tech') || { name: 'Tech', studyCount: 0, totalFileSize: 0, dataFileCount: 0, documentCount: 0 };
    const dht = getStat('DHT') || { name: 'DHT', studyCount: 0, totalFileSize: 0, dataFileCount: 0, documentCount: 0 };

    // FUNDING, NEWS, EVENTS

    const renderedFunding = funding.map((item) => {
        return (
            <div key={item.title}>
                <h6>
                    <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
                        {item.title}
                    </a>
                </h6>
                <div>{item.description}</div>
            </div>
        );
    });

    const renderedNews = news.map((item) => {
        return (
            <div key={item.title}>
                <h6>
                    <Link href={`news/${item.slug}`} legacyBehavior>
                        {item.title}
                    </Link>{' '}
                    | {format(new Date(item.startDate), 'P')}
                </h6>
                <div>{parse(regexReplace(item.description, item.links))}</div>
            </div>
        );
    });

    const renderedEvents = events.map((item) => {
        const date = format(new Date(item.eventDate), 'Pp');

        return (
            <div key={item.title} className={classes.event}>
                <h6>
                    <Link href={`events#${item.slug}`} legacyBehavior>
                        <a>
                            {getTypeIcon(item.type, '23', '20', '#a8e7ff')}
                            {item.title}
                        </a>
                    </Link>{' '}
                    | {date} ET
                </h6>
                <div>{parse(regexReplace(item.description, item.links))}</div>
            </div>
        );
    });

    // CONTENT UPDATES

    const newStudies = contentUpdates.newStudies;
    const newFiles = contentUpdates.newFiles;
    const updatedFiles = contentUpdates.updatedFiles;

    // get number of categories that have a non-empty list
    const numOfContentCategories = Object.values(contentUpdates).filter((v) => v.length > 0).length;

    const renderedRegisteredStudies = (list) => {
        return list.map((study) => {
            return (
                <li key={`${study.studyName}-${study.studyId}`}>
                    <div>
                        {study.dcc} | {study.date}
                    </div>
                    <Link href={`/study/${study.studyId}`} legacyBehavior>
                        {study.studyName}
                    </Link>
                </li>
            );
        });
    };

    const renderedNewOrUpdatedFiles = (list) => {
        return list.map((study) => {
            let fileStr = 'files';
            if (study.files === 1) {
                fileStr = 'file';
            }
            return (
                <li key={`${study.studyName}${study.date}`}>
                    <div>
                        {study.dcc} | {study.date} |{' '}
                        <span className={classes.lightTeal}>
                            {study.files} New {fileStr}
                        </span>
                    </div>
                    <Link href={`/study/${study.studyId}`} legacyBehavior>
                        {study.studyName}
                    </Link>
                </li>
            );
        });
    };

    return (
        <>
            <div className={classes.heroSection}>
                <Container className={classes.heroContainer}>
                    <div className={classes.heroContentWrapper}>
                        <div className={classes.heroTextSection}>
                            <div className={classes.badge}>Research Data Platform</div>
                            <h1 className={classes.heroTitle}>
                                Redwood
                            </h1>
                            <p className={classes.heroSubtitle}>
                                Access curated, de-identified datasets to accelerate innovation in diagnostics and public health. 
                                Redwood provides researchers with secure collaboration tools and standardized data to advance 
                                evidence-based solutions.
                            </p>
                            <div className={classes.heroActions}>
                                <Link href="/studyExplorer/studies">
                                    <Button 
                                        label="Explore Studies" 
                                        variant="homepage" 
                                        size="large"
                                        iconRight={<ChevronRightIcon />}
                                    />
                                </Link>
                                <Link href="/about">
                                    <Button 
                                        label="Learn More" 
                                        variant="homepage" 
                                        modification="outline"
                                        size="large"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className={classes.heroSearchSection}>
                            <div className={classes.searchCard}>
                                <h3 className={classes.searchCardTitle}>Search for Studies</h3>
                                <p className={classes.searchCardSubtitle}>
                                    Discover studies, datasets, metadata and research materials
                                </p>
                                <SearchBar 
                                    topic="Studies" 
                                    query={query} 
                                    setQuery={setQuery} 
                                    handleClick={handleSearch} 
                                    homePage={true}
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className={classes.Container}>
                <div className={classes.sectionHeader}>
                    <h2 className={classes.sectionTitle}>Getting Started</h2>
                    <p className={classes.sectionSubtitle}>
                        Everything you need to begin your research journey with Redwood
                    </p>
                </div>
                
                <Row className={classes.featureCards}>
                    <Col lg={4} md={6} sm={12} className={classes.featureCardWrapper}>
                        <Link href="/about">
                            <div className={classes.featureCard}>
                                <div className={classes.featureCardImage}>
                                    <img src="/images/about_redwood.jpg" alt="About Redwood" />
                                </div>
                                <div className={classes.featureCardContent}>
                                    <h3 className={classes.featureCardTitle}>About Redwood</h3>
                                    <p className={classes.featureCardDescription}>
                                        Discover our mission to accelerate diagnostic research through open, collaborative science
                                    </p>
                                    <div className={classes.featureCardFooter}>
                                        Learn More <ChevronRightIcon />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col lg={4} md={6} sm={12} className={classes.featureCardWrapper}>
                        <Link href="/tutorial">
                            <div className={classes.featureCard}>
                                <div className={classes.featureCardImage}>
                                    <img src="/images/user_tutorial.png" alt="User Tutorial" />
                                </div>
                                <div className={classes.featureCardContent}>
                                    <h3 className={classes.featureCardTitle}>User Tutorial</h3>
                                    <p className={classes.featureCardDescription}>
                                        Comprehensive guide to navigating the platform and accessing research data
                                    </p>
                                    <div className={classes.featureCardFooter}>
                                        Start Tutorial <ChevronRightIcon />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col lg={4} md={6} sm={12} className={classes.featureCardWrapper}>
                        <Link href="/faq">
                            <div className={classes.featureCard}>
                                <div className={classes.featureCardImage}>
                                    <img src="/images/faqs.jpg" alt="FAQ" />
                                </div>
                                <div className={classes.featureCardContent}>
                                    <h3 className={classes.featureCardTitle}>FAQs</h3>
                                    <p className={classes.featureCardDescription}>
                                        Find answers to common questions about data access, submission, and collaboration
                                    </p>
                                    <div className={classes.featureCardFooter}>
                                        Browse FAQs <ChevronRightIcon />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Container>
            
            <div className={classes.researchCommunitySection}>
                <Container>
                    <div className={classes.sectionHeader}>
                        <h2 className={classes.sectionTitle}>Research Community</h2>
                        <p className={classes.sectionSubtitle}>
                            Stay connected with the latest opportunities, events, and updates
                        </p>
                    </div>

                    <Row className={classes.Row}>
                    <Col lg={12}>
                        <Card
                            cardClassOverride={classes.primaryInfoCard}
                            title="Latest News &amp; Updates"
                            headerColor="#00693e"
                            footer={
                                <Link href="/news">
                                    <Button label="View All News" variant="homepage" size="auto" iconRight={<ChevronRightIcon />} />
                                </Link>
                            }
                            headerImg="/images/large2.png"
                            variant="info"
                            bodyHeight="220px"
                            scroll={true}
                        >
                            {news.length === 0 && (
                                <div className={classes.noContentContainer}>
                                    <div className={classes.noContent}>
                                        No news updates at this time. Check back soon for the latest developments.
                                    </div>
                                </div>
                            )}
                            {renderedNews}
                        </Card>
                    </Col>
                </Row>
                
                <Row className={classes.Row}>
                    <Col md={12} lg={6}>
                        <Card
                            cardClassOverride={classes.infoCard}
                            title="Upcoming Events"
                            headerColor="#0b7a45"
                            footer={
                                <Link href="/events">
                                    <Button
                                        label="View All Events"
                                        variant="homepage"
                                        size="auto"
                                        iconRight={<ChevronRightIcon />}
                                    />
                                </Link>
                            }
                            headerImg="/images/sml1.png"
                            variant="info"
                            bodyHeight="200px"
                            scroll={true}
                        >
                            {events.length === 0 && (
                                <div className={classes.noContentContainer}>
                                    <div className={classes.noContent}>
                                        No upcoming events scheduled. Visit our <Link href="/events">Events page</Link> to view past events.
                                    </div>
                                </div>
                            )}
                            {renderedEvents}
                        </Card>
                    </Col>
                    <Col md={12} lg={6}>
                        <Card
                            cardClassOverride={classes.fundingCard}
                            title="Funding Opportunities"
                            headerColor="#d4af37"
                            footer={
                                <Link href="/fundingOpportunities">
                                    <Button label="View All Opportunities" variant="homepage" size="auto" iconRight={<ChevronRightIcon />} />
                                </Link>
                            }
                            headerImg="/images/med2.png"
                            variant="info"
                            bodyHeight="200px"
                            scroll={true}
                        >
                            {funding.length === 0 && (
                                <div className={classes.noContentContainer}>
                                    <div className={classes.noContent}>
                                        No funding opportunities currently available. Check back regularly for new postings.
                                    </div>
                                </div>
                            )}
                            {renderedFunding}
                        </Card>
                    </Col>
                </Row>
                </Container>
            </div>
            
            {/* <Container className={classes.Container}>
                        <Row>
                            <div className={classes.stats}>
                                <Col xl={6} lg={12} className={classes.col}>
                                    <Col md={6} sm={12}>
                                        <div className={classes.stat}>
                                            <h1 className={`${classes.statTitle} ${classes.pink}`}>
                                                <a href="https://up.org/" target="_blank" rel="noopener noreferrer">
                                                    {up.name}
                                                </a>
                                                <ExternalLinkIcon width="15" height="15" />
                                            </h1>
                                            <div className={`${classes.dccDescription} ${classes.gray}`}>
                                                Studying testing patterns in a variety of populations.
                                            </div>
                                            <div className={classes.statMiddleContent}>
                                                <UpStatIcon />
                                                <div className={classes.statMiddleContentText}>
                                                    <p className={classes.gray} data-testid="UP-dataFiles">
                                                        {up.dataFileCount} Data Files{' '}
                                                    </p>
                                                    <p className={classes.gray} data-testid="UP-documents">
                                                        {up.documentCount} Documents
                                                    </p>
                                                </div>
                                            </div>
                                            <h1 className={`${classes.statBottomContent}`} data-testid="UP-studies">
                                                {up.studyCount} Studies
                                            </h1>
                                        </div>
                                    </Col>
                                    <div className={`${classes.vl} ${classes.firstVl}`}></div>
                                    <Col md={6} sm={12}>
                                        <div className={classes.stat}>
                                            <h1 className={`${classes.statTitle} ${classes.blue}`}>
                                                <a href="https://www.radxrad.org/" target="_blank" rel="noopener noreferrer">
                                                    {rad.name}
                                                </a>
                                                <ExternalLinkIcon width="15" height="15" />
                                            </h1>
                                            <div className={`${classes.dccDescription} ${classes.gray}`}>
                                                Supporting innovative, non-traditional (radical) approaches to improve disease diagnostics.
                                            </div>
                                            <div className={classes.statMiddleContent}>
                                                <RadStatIcon />
                                                <div className={classes.statMiddleContentText}>
                                                    <p className={classes.gray} data-testid="Rad-dataFiles">
                                                        {rad.dataFileCount} Data Files{' '}
                                                    </p>
                                                    <p className={classes.gray} data-testid="Rad-documents">
                                                        {rad.documentCount} Documents
                                                    </p>
                                                </div>
                                            </div>
                                            <h1 className={`${classes.statBottomContent}`} data-testid="Rad-studies">
                                                {rad.studyCount} Studies
                                            </h1>
                                        </div>
                                    </Col>
                                </Col>
                                <div className={`${classes.vl} ${classes.secondVl}`}></div>
                                <Col xl={6} lg={12} className={classes.col}>
                                    <Col md={6} sm={12}>
                                        <div className={classes.stat}>
                                            <h1 className={`${classes.statTitle} ${classes.purple}`}>
                                                <a
                                                    href="https://www.nibib.nih.gov/covid-19/tech-program"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {tech.name}
                                                </a>
                                                <ExternalLinkIcon width="15" height="15" />
                                            </h1>
                                            <div className={`${classes.dccDescription} ${classes.gray}`}>
                                                Speeding diagnostic test development, validation, and commercialization to enhance public
                                                health.
                                            </div>
                                            <div className={classes.statMiddleContent}>
                                                <TechStatIcon />
                                                <div className={classes.statMiddleContentText}>
                                                    <p className={classes.gray} data-testid="Tech-dataFiles">
                                                        {tech.dataFileCount} Data Files{' '}
                                                    </p>
                                                    <p className={classes.gray} data-testid="Tech-documents">
                                                        {tech.documentCount} Documents
                                                    </p>
                                                </div>
                                            </div>
                                            <h1 className={`${classes.statBottomContent}`} data-testid="Tech-studies">
                                                {tech.studyCount} Studies
                                            </h1>
                                        </div>
                                    </Col>
                                    <div className={`${classes.vl} ${classes.thirdVl}`}></div>
                                    <Col md={6} sm={12}>
                                        <div className={classes.stat}>
                                            <h1 className={`${classes.statTitle} ${classes.darkBlue}`}>
                                                <a href="https://rapids.ll.mit.edu/" target="_blank" rel="noopener noreferrer">
                                                    {dht.name}
                                                </a>
                                                <ExternalLinkIcon width="15" height="15" />
                                            </h1>
                                            <div className={`${classes.dccDescription} ${classes.gray}`}>
                                                Developing digital health solutions for real-time health monitoring and decision-making.
                                            </div>
                                            <div className={classes.statMiddleContent}>
                                                <DHTStatIcon />
                                                <div className={classes.statMiddleContentText}>
                                                    <p className={classes.gray} style={{ width: '155px' }}>
                                                        Stored in RAPIDS Repository
                                                    </p>
                                                </div>
                                            </div>
                                            <h1 className={`${classes.statBottomContent}`} data-testid="DHT-studies">
                                                {dht.studyCount} {getStudyLabel(dht.studyCount)}
                                            </h1>
                                        </div>
                                    </Col>
                                </Col>
                            </div>
                        </Row>
                    </Container> */}
            
            <Container>
                <div className={classes.sectionHeader}>
                    <h2 className={classes.sectionTitle}>Recent Activity</h2>
                    <p className={classes.sectionSubtitle}>
                        Track the latest study updates
                    </p>
                </div>
                
                <div className={classes.statsContainer}>
                    <div className={classes.statBox}>
                        <div className={classes.statNumber}>{stats.totalFiles}</div>
                        <div className={classes.statLabel}>Total Files</div>
                    </div>
                    <div className={classes.statBox}>
                        <div className={classes.statNumber}>{stats.totalStudies}</div>
                        <div className={classes.statLabel}>Total Studies</div>
                    </div>
                </div>
                
                <div className={classes.activityContainer}>
                    <h3 className={classes.activityContainerTitle}>Study Updates</h3>
                    <Row className={classes.contentUpdates}>
                        <Col md={12} lg={12 / numOfContentCategories}>
                            <div className={classes.activityCard}>
                                <div className={classes.activityHeader}>
                                    <NewStudiesIcon />
                                    <h3>Newly Registered Studies</h3>
                                </div>
                                <div className={classes.activityContent}>
                                    {(!newStudies || newStudies.length === 0) && (
                                        <div className={classes.noContentContainer}>
                                            <div className={classes.noContent}>
                                                No newly registered studies at this time.
                                            </div>
                                        </div>
                                    )}
                                    {newStudies && newStudies.length > 0 && (
                                        <ul className={classes.contentList}>{renderedRegisteredStudies(newStudies)}</ul>
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col md={12} lg={12 / numOfContentCategories}>
                            <div className={classes.activityCard}>
                                <div className={classes.activityHeader}>
                                    <NewFilesIcon />
                                    <h3>Studies with New Files</h3>
                                </div>
                                <div className={classes.activityContent}>
                                    {(!newFiles || newFiles.length === 0) && (
                                        <div className={classes.noContentContainer}>
                                            <div className={classes.noContent}>
                                                No studies with new files at this time.
                                            </div>
                                        </div>
                                    )}
                                    {newFiles && newFiles.length > 0 && (
                                        <ul className={classes.contentList}>{renderedNewOrUpdatedFiles(newFiles)}</ul>
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col md={12} lg={12 / numOfContentCategories}>
                            <div className={classes.activityCard}>
                                <div className={classes.activityHeader}>
                                    <UpdatedFilesIcon />
                                    <h3>Studies with Updated Files</h3>
                                </div>
                                <div className={classes.activityContent}>
                                    {(!updatedFiles || updatedFiles.length === 0) && (
                                        <div className={classes.noContentContainer}>
                                            <div className={classes.noContent}>
                                                No studies with updated files at this time.
                                            </div>
                                        </div>
                                    )}
                                    {updatedFiles && updatedFiles.length > 0 && (
                                        <ul className={classes.contentList}>{renderedNewOrUpdatedFiles(updatedFiles)}</ul>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
};

Homepage.propTypes = {
    contentUpdates: PropTypes.object,
    events: PropTypes.array,
    funding: PropTypes.array,
    news: PropTypes.array,
    stats: PropTypes.object,
};

export default Homepage;
