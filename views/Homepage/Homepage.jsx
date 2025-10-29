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
import { ParallaxBanner } from 'react-scroll-parallax';
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
            <ParallaxBanner layers={[{ image: '/images/Homepage_Hero_Img.jpeg', speed: -30 }]} className={`${classes.heroParallax}`}>
                <div className={classes.heroContent}>
                    <div className={classes.heroText}>
                        <h1>
                            Data Hub
                        </h1>
                        <div>
                            The Data Hub is a secure, cloud-based platform accelerating
                            innovation in public health by enabling data sharing, exploration, and analysis. By providing analytic tools and
                            access to de-identified data from{' '}
                            <a
                                href="https://www.nih.gov/research-training/medical-research-initiatives/radx/programs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Initiative programs
                            </a>
                            , the Data Hub supports data-driven insights and cross-sector collaboration. Researchers can discover studies,
                            access curated and harmonized data, and use integrated tools to analyze data in new ways, informing public
                            health strategies and strengthening health system preparedness.
                        </div>
                    </div>
                    <div className={classes.searchBarContainer}>
                        <div className={classes.searchBar}>
                            <SearchBar topic="Studies" query={query} setQuery={setQuery} handleClick={handleSearch} homePage={true} />
                        </div>
                    </div>
                </div>
            </ParallaxBanner>

            <Container className={classes.Container}>
                <Row className={classes.blogCards}>
                    <Col lg={4} md={12} className={classes.blogCardContainer}>
                        <Link href="/about">
                            <Card
                                cardClassOverride={classes.blogCard}
                                title="About the Data Hub"
                                subtitle="Learn more about the Data Hub"
                                footer={
                                    <div>
                                        Read More <ChevronRightIcon />
                                    </div>
                                }
                                variant="blog"
                                image={{
                                    src: '/images/about_collage.png',
                                    alt: '',
                                    width: '320px',
                                    height: '170px',
                                }}
                            />
                        </Link>
                    </Col>
                    <Col lg={4} md={12} className={classes.blogCardContainer}>
                        <Link href="/tutorial">
                            <Card
                                cardClassOverride={classes.blogCard}
                                title="User Tutorial"
                                subtitle="For those who are new to the Data Hub, we highly recommend taking a moment to explore the comprehensive Data Hub Tutorial"
                                footer={
                                    <div>
                                        Read More <ChevronRightIcon />
                                    </div>
                                }
                                variant="blog"
                                image={{
                                    src: '/images/New_Img.jpeg',
                                    alt: '',
                                    width: '320px',
                                    height: '170px',
                                }}
                            />
                        </Link>
                    </Col>
                    <Col lg={4} md={12} className={classes.blogCardContainer}>
                        <Link href="/faq">
                            <Card
                                cardClassOverride={classes.blogCard}
                                title="Frequently Asked Questions (FAQ)"
                                subtitle="Browse the collection of answers to frequently asked questions about the Data Hub"
                                footer={
                                    <div>
                                        Read More <ChevronRightIcon />
                                    </div>
                                }
                                variant="blog"
                                image={{
                                    src: '/images/FAQ_Img.jpeg',
                                    alt: '',
                                    width: '320px',
                                    height: '170px',
                                }}
                            />
                        </Link>
                    </Col>
                </Row>
                <Row className={classes.Row}>
                    <Col md={12} lg={5}>
                        <Card
                            cardClassOverride={classes.infoCard}
                            title="Funding Opportunities"
                            footer={
                                <Link href="/fundingOpportunities">
                                    <Button label="View All" variant="homepage" size="auto" iconRight={<ChevronRightIcon />} />
                                </Link>
                            }
                            headerImg="/images/med2.png"
                            variant="info"
                            bodyHeight="170px"
                            scroll={true}
                        >
                            {funding.length === 0 && (
                                <div className={classes.noContentContainer}>
                                    <div className={`${classes.noContent} ${classes.lightBox}`}>
                                        There are currently no available funding opportunities.
                                    </div>
                                </div>
                            )}
                            {renderedFunding}
                        </Card>
                    </Col>
                    <Col md={12} lg={7}>
                        <Card
                            cardClassOverride={classes.infoCard}
                            title="Save the Date"
                            footer={
                                <Link href="/events">
                                    <Button
                                        label="View All"
                                        variant="homepage"
                                        modification="whiteText"
                                        size="auto"
                                        iconRight={<ChevronRightIcon />}
                                    />
                                </Link>
                            }
                            headerImg="/images/sml1.png"
                            modification="colored"
                            bkgdColor="#003E70"
                            variant="info"
                            bodyHeight="170px"
                            scroll={true}
                        >
                            {events.length === 0 && (
                                <div className={classes.noContentContainer}>
                                    <div className={`${classes.noContent} ${classes.darkBox}`}>
                                        There are currently no upcoming events. View our <Link href="/events">Events</Link> page to review
                                        past events and access event materials.
                                    </div>
                                </div>
                            )}
                            {renderedEvents}
                        </Card>
                    </Col>
                </Row>
                <Row className={classes.Row}>
                    <Col md={12} lg={12}>
                        <Card
                            cardClassOverride={classes.infoCard}
                            title="Latest News &amp; Updates"
                            footer={
                                <Link href="/news">
                                    <Button label="View All" variant="homepage" size="auto" iconRight={<ChevronRightIcon />} />
                                </Link>
                            }
                            headerImg="/images/large2.png"
                            variant="info"
                            bodyHeight="200px"
                            scroll={true}
                        >
                            {renderedNews}
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Row className={classes.customRow}>
                <Col className={classes.section}>
                    <div className={classes.statsBanner}>
                        <Container className={classes.Container}>
                            <h2>Data Hub Content</h2>
                            <div className={classes.statsSummary}>
                                <p>{stats.totalFiles} Total Files</p>
                                <p>{stats.totalStudies} Total Studies</p>
                            </div>
                        </Container>
                    </div>
                    <div className={classes.roundSummaries}>
                        <span className={classes.roundSummary}>
                            <div className={classes.number}>{stats.totalFiles}</div>
                            <div>Total Files</div>
                        </span>
                        <span className={classes.roundSummary}>
                            <div className={classes.number}>{stats.totalStudies}</div>
                            <div>Total Studies</div>
                        </span>
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
                </Col>
            </Row>
            <Container>
                <Col lg={12}>
                    <Card title="Study Updates" headerImg="/images/large1.png" variant="info" bkgdColor="#E6E6E6">
                        <Row className={classes.contentUpdates}>
                            {newStudies?.length > 0 && (
                                <Col md={12} lg={12 / numOfContentCategories}>
                                    <Card
                                        cardClassOverride={classes.contentCard}
                                        title={
                                            <span className={classes.contentIcon}>
                                                <NewStudiesIcon /> Newly Registered Studies
                                            </span>
                                        }
                                        headerColor="#14617A"
                                        variant="info"
                                        bodyHeight="250px"
                                        scroll={true}
                                    >
                                        <ul className={classes.contentList}>{renderedRegisteredStudies(newStudies)}</ul>
                                    </Card>
                                </Col>
                            )}
                            {newFiles?.length > 0 && (
                                <Col md={12} lg={12 / numOfContentCategories}>
                                    <Card
                                        cardClassOverride={classes.contentCard}
                                        title={
                                            <span className={classes.contentIcon}>
                                                <NewFilesIcon />
                                                Studies with New Files
                                            </span>
                                        }
                                        headerColor="#1e8198"
                                        variant="info"
                                        bodyHeight="250px"
                                        scroll={true}
                                    >
                                        <ul className={classes.contentList}>{renderedNewOrUpdatedFiles(newFiles)}</ul>
                                    </Card>
                                </Col>
                            )}
                            {updatedFiles?.length > 0 && (
                                <Col md={12} lg={12 / numOfContentCategories}>
                                    <Card
                                        cardClassOverride={classes.contentCard}
                                        title={
                                            <span className={classes.contentIcon}>
                                                <UpdatedFilesIcon />
                                                Studies with Updated Files
                                            </span>
                                        }
                                        headerColor="#004A70"
                                        variant="info"
                                        bodyHeight="250px"
                                        scroll={true}
                                    >
                                        <ul className={classes.contentList}>{renderedNewOrUpdatedFiles(updatedFiles)}</ul>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Card>
                </Col>
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
