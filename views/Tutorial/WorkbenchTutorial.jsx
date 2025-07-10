import React, { useState } from 'react';
import classes from './Tutorial.module.scss';
import { Row, Col } from 'react-bootstrap';
import Banner from '../../components/Banner/Banner';
import Accordion from '../../components/Accordion/Accordion';
import sidebarOptions from './Constants/workbenchTutorialSidebar';
import { contentArray } from './Constants/workbenchTutorialContent';
import { useRouter } from 'next/router';

const Tutorial = (props) => {
    const { tutorialPage } = props;
    const [tutorial, setTutorial] = useState(tutorialPage);
    const router = useRouter();

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'RADx Data Hub Workbench Tutorial',
        },
    ];

    const contentLayout = (obj) => {
        return (
            <div>
                <span id={obj.mainTitle} className={classes.title}>
                    {obj.mainTitle}
                </span>
                {obj.sections.map((section) => (
                    <div className={classes.content} key={section.id} id={section.id}>
                        <span className={classes.header}>{section.title}</span>
                        <span className={classes.underline}></span>
                        <div className={classes.body}>{section.content}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Banner title="RADx Data Hub Workbench Tutorial" manualCrumbs={crumbs} variant="virus3" ariaLabel="Workbench Tutorial Breadcrumb" />
            <Row className={classes.container}>
                <Col lg="3" className={`ps-3 ${classes.sidebarContainer}`}>
                    {sidebarOptions.map((option, key) => {
                        return (
                            <Accordion
                                variant="faq"
                                title={option.mainTitle}
                                id={option.main}
                                key={option.main}
                                className={classes.accordion}
                                onSelect={(e) => {
                                    setTutorial(option.main);
                                    router.push(`?tutorial=${option.main}`);
                                }}
                            >
                                <ul className={classes.menuItemContainer}>
                                    {option.dropdown.map((item) => {
                                        return (
                                            <li key={item.id} className={classes.menuItem} onClick={() => setTutorial(option.main)}>
                                                <a href={item.id}>{item.name}</a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Accordion>
                        );
                    })}
                </Col>
                <Col lg="9" className={`px-5 py-5 ${classes.contentContainer}`}>
                    {contentArray.map((obj) => {
                        return contentLayout(obj[tutorial]);
                    })}
                </Col>
            </Row>
        </>
    );
};

export default Tutorial;
