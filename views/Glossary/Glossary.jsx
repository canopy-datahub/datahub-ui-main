import React from 'react';
import { Col, Row } from 'react-bootstrap';
import classes from './Glossary.module.scss';
import { contentArray } from './Content/pageContent';
import { sidebarOptions } from './Content/sidebarContent';
import Banner from '../../components/Banner/Banner';

const Glossary = () => {
    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Glossary',
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
            <Banner title="Glossary" manualCrumbs={crumbs} variant="virus6" ariaLabel="Glossary Breadcrumb" />
            <Row className={classes.row}>
                <Col lg="2" className={`${classes.sidebarContainer}`}>
                    <h4 className="m-3">Scroll To Section</h4>
                    <ul className={classes.container}>
                        {sidebarOptions.map((item) => {
                            return (
                                <a key={item.name} href={item.id}>
                                    <li className={`${classes.menuItems}`}>{item.name}</li>
                                </a>
                            );
                        })}
                    </ul>
                </Col>
                <Col lg="10" className={`px-5 py-5 ${classes.contentContainer}`}>
                    {contentArray.map((obj) => {
                        return contentLayout(obj);
                    })}
                </Col>
            </Row>
        </>
    );
};

Glossary.propTypes = {};

export default Glossary;
