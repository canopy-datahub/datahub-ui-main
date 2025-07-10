/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './ResourceCenter.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useRouter } from 'next/router';
import useRest from '../../lib/hooks/useRest';
import ExternalIcon from '../../components/Images/svg/ExternalIcon';
import Banner from '../../components/Banner/Banner';
import Card from '../../components/Card/Card';
import CalloutBox from '../../components/CalloutBox/CalloutBox';
import { generalCards } from './Components/GeneralCards';
import { forResearchersCards } from './Components/ForResearchersCards';
import { forSubmittersCards } from './Components/ForSubmittersCards';
import { externalLinksCards } from './Components/ExternalLinksCards';
import SearchClearIcon from '../../components/Images/svg/SearchClearIcon';
import { Box, Archive, Clipboard2Pulse, CloudUpload, Link45deg } from 'react-bootstrap-icons';

/**
 * View for the Resource Center Page
 * @property {String} category - Used to determine which resource category tab to be shown on load
 * @property {String} baseUrl - String grabbing the base URL for downloads
 * @returns {Node} object rendering the Resource Center Page
 */

const ResourceCenter = (props) => {
    const { category, baseUrl } = props;
    const [keySearch, setKeySearch] = useState('');
    const router = useRouter();
    const { restGet } = useRest();

    const allCards = (router, baseUrl) => {
        return [
            ...generalCards(router, baseUrl, restGet),
            ...forResearchersCards(router, baseUrl, restGet),
            ...forSubmittersCards(router, baseUrl, restGet),
            ...externalLinksCards(router, baseUrl, restGet),
        ];
    };

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Resource Center',
        },
    ];

    const searchBar = (
        <div className={classes.searchContainer}>
            <Row className="mb-3">
                <form className={classes.clearIconContainer}>
                    <input
                        aria-label="Resource Center search bar"
                        type="text"
                        placeholder="Search Resource Center..."
                        value={keySearch}
                        onChange={(e) => setKeySearch(e.target.value)}
                    />
                    <span onClick={() => setKeySearch('')}>
                        <SearchClearIcon />
                    </span>
                </form>
            </Row>
        </div>
    );

    // Definitions for the resource categories and their colors and headers
    const categoryColors = { all: 'black', general: 'navyBlue', forResearchers: 'teal', forSubmitters: 'darkBlue', externalLinks: 'green' };
    const categoryHeaders = {
        general: '/images/navy_blue_sml_header.png',
        forResearchers: '/images/light_blue_sml_header.png',
        forSubmitters: '/images/dark_blue_sml_header.png',
        externalLinks: '/images/green_sml_header.png',
    };

    // Setting category and its respective color
    const [key, setKey] = useState(category);
    const [activeColor, setActiveColor] = useState(categoryColors[category]);
    let activeColorClass;

    // Check if url param passed in matches an existing category
    useEffect(() => {
        if (!Object.keys(categoryColors).includes(category)) {
            setKey('all');
            setActiveColor(categoryColors.all);
        } else {
            setKey(category);
            setActiveColor(categoryColors[category]);
        }
    }, [category]);

    // Set class for active category color
    switch (activeColor) {
        case 'black':
            activeColorClass += ` ${classes.black}`;
            break;
        case 'navyBlue':
            activeColorClass += ` ${classes.navyBlue}`;
            break;
        case 'teal':
            activeColorClass += ` ${classes.teal}`;
            break;
        case 'darkBlue':
            activeColorClass += ` ${classes.darkBlue}`;
            break;
        case 'green':
            activeColorClass += ` ${classes.green}`;
            break;
        default:
            activeColorClass += ` ${classes.navyBlue}`;
            break;
    }

    const renderCards = (cards, router, baseUrl, restGet) => {
        return cards(router, baseUrl, restGet)
            .filter(
                (c) =>
                    c.children.props.children.props.children.toLowerCase().includes(keySearch) ||
                    c.title.toLowerCase().includes(keySearch.toLowerCase())
            )
            .map((card) => {
                return (
                    <Col lg={6} xl={4} key={card.title}>
                        <Card
                            cardClassOverride={classes.resourceCard}
                            title={
                                <div className={classes.hiIcon}>
                                    {icons[card.type]} {card.title}
                                </div>
                            }
                            footer={card.footer}
                            headerImg={categoryHeaders[card.type]}
                            variant="resource"
                        >
                            {card.children}
                        </Card>
                    </Col>
                );
            });
    };

    const tabLabels = {
        all: (
            <span>
                <Box /> All
            </span>
        ),
        general: (
            <span>
                <Archive /> General
            </span>
        ),
        forResearchers: (
            <span>
                <Clipboard2Pulse /> For Researchers
            </span>
        ),
        forSubmitters: (
            <span>
                <CloudUpload /> For Submitters
            </span>
        ),
        externalLinks: (
            <span>
                <Link45deg /> External Links
            </span>
        ),
    };

    const icons = {
        all: <Box className={classes.titleIcon} />,
        general: <Archive className={classes.titleIcon} />,
        forResearchers: <Clipboard2Pulse className={classes.titleIcon} />,
        forSubmitters: <CloudUpload className={classes.titleIcon} />,
        externalLinks: <Link45deg className={classes.titleIcon} />,
    };

    return (
        <>
            <Banner title="Resource Center" manualCrumbs={crumbs} variant="crystal" ariaLabel="Resource Center Breadcrumb" />
            <Container className={classes.Container}>
                <CalloutBox
                    body={
                        <div className={classes.infoText}>
                            <div>
                                The resources below contain a curated collection of information, including policies, instructional
                                materials, and external links. These resources can guide you in adhering to NIH standards and provide you
                                with self-service solutions for your questions.
                            </div>
                            <div>
                                <ExternalIcon width="15" height="15" /> - Links with this icon will lead you to an external website. This
                                external link provides additional information that is consistent with the intended purpose of this site. NIH
                                cannot attest to the accuracy of a non-federal site.
                            </div>
                        </div>
                    }
                />
            </Container>
            <Container className={classes.Container}>
                <div className={`${activeColorClass} ${classes.selectResource} narrowTextBackground`}>
                    <h3>Select a Resource</h3>
                    <span className={classes.line}></span>
                </div>
                <Tabs
                    id="controlled-resources"
                    activeKey={key}
                    onSelect={(k) => {
                        setKey(k);
                        setActiveColor(categoryColors[k]);
                    }}
                    className={`mb-3 ${classes.resourceTabs} ${activeColorClass} narrowTextBackground`}
                >
                    <Tab eventKey="all" title={tabLabels.all}>
                        {searchBar}
                        <Row className={classes.Row}>{renderCards(allCards, router, baseUrl, restGet)}</Row>
                    </Tab>
                    <Tab eventKey="general" title={tabLabels.general}>
                        {searchBar}
                        <Row className={classes.Row}>{renderCards(generalCards, router, baseUrl, restGet)}</Row>
                    </Tab>
                    <Tab eventKey="forResearchers" title={tabLabels.forResearchers}>
                        {searchBar}
                        <Row className={classes.Row}>{renderCards(forResearchersCards, router, baseUrl, restGet)}</Row>
                    </Tab>
                    <Tab eventKey="forSubmitters" title={tabLabels.forSubmitters}>
                        {searchBar}
                        <Row className={classes.Row}>{renderCards(forSubmittersCards, router, baseUrl, restGet)}</Row>
                    </Tab>
                    <Tab eventKey="externalLinks" title={tabLabels.externalLinks}>
                        {searchBar}
                        <Row className={classes.Row}>{renderCards(externalLinksCards, router, baseUrl, restGet)}</Row>
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
};

ResourceCenter.propTypes = {
    baseUrl: PropTypes.string,
    category: PropTypes.string,
};

export default ResourceCenter;
