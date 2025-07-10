import React from 'react';
import { Col, Row } from 'react-bootstrap';
import classes from './Faq.module.scss';
import Accordion from '../../components/Accordion/Accordion';
import { contentArray } from './Constants/pageContent';
import { sidebarOptions } from './Constants/sidebarContent';
import Banner from '../../components/Banner/Banner';
import { scrollToTop } from '../../lib/componentHelpers/scrollHelpers';
import ChevronUpIcon from '../../components/Images/svg/ChevronUpIcon';
import useRest from '../../lib/hooks/useRest';

const Faq = (props) => {
    const { baseUrl } = props;
    const { restGet } = useRest();

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'FAQ',
        },
    ];

    const contentLayout = (sections) => {
        return (
            <div>
                <span id={sections.id} className={classes.title}>
                    {sections.title}
                </span>
                {sections.content.map((section) => (
                    <div className={classes.content} key={section.id} id={section.id}>
                        <span className={classes.header}>{section.header}</span>
                        <span className={classes.underline}></span>
                        <div className={classes.body}>{section.body}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Banner title="FAQ" manualCrumbs={crumbs} variant="microscoped" ariaLabel="FAQ Breadcrumb" />
            <Row className={`${classes.container} `}>
                <Col lg="3" className={`ps-3 ${classes.sidebarContainer}`}>
                    {sidebarOptions.map((option, key) => {
                        return (
                            <Accordion variant="faq" title={option.name} id={option.id} key={option.id} className={classes.accordion}>
                                <ul className={classes.menuItemContainer}>
                                    {option.dropdown.map((item) => {
                                        return (
                                            <a key={item.id} href={item.id} className={classes.menuItem}>
                                                <li key={item.id}>{item.name}</li>
                                            </a>
                                        );
                                    })}
                                </ul>
                            </Accordion>
                        );
                    })}
                </Col>
                <Col lg="9" className={`px-5 py-5 ${classes.contentContainer}`}>
                    {contentArray(baseUrl, restGet).map((obj) => {
                        return contentLayout(obj);
                    })}
                </Col>
            </Row>
            <div className={classes.scrollButtonContainer}>
                <button type="button" className={classes.scrollButton} aria-label="scroll to top" onClick={() => scrollToTop()}>
                    <ChevronUpIcon width={28} height={28} />
                </button>
            </div>
        </>
    );
};

Faq.propTypes = {};

export default Faq;
