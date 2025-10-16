/* eslint-disable max-len */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './About.module.scss';
import Banner from '../../components/Banner/Banner';
import Card from '../../components/Card/Card';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import bahLogo from './images/Picture1 1.png';
import ExternalLinkIcon from '../../components/ExternalLinkIcon/ExternalLinkIcon';
/**
 * View for the News Page
 * @property {Array<Object>} news - List of all news
 * @returns {Node} object rendering news
 */

const About = (props) => {
    const router = useRouter();

    return (
        <>
            <Banner
                title="Learn About Data Hub"
                path={router.asPath}
                variant="virus4"
                ariaLabel="Learn About Data Hub Breadcrumb"
            />

            <Container className={classes.Container}>
                <Row className={`${classes.Row} whiteTextBackground`}>
                    <h2 className={classes.black}>About Data Hub</h2>

                    <Col lg={8}>
                        <p>
                            The NIH Rapid Acceleration of Diagnostics (RADx) Data Hub is a secure cloud-based platform, enabling researchers
                            to access curated, de-identified datasets and analytic tools to support innovation in disease diagnostics and
                            public health efforts.
                        </p>
                        <p>
                            Designed to promote researcher collaboration and accelerate scientific discovery, the RADx Data Hub seeks to
                            understand public health and disease morbidity and mortality disparities, while supporting innovations in the
                            development, commercialization, and implementation of diagnostic technologies through de-identified data and
                            algorithms.
                        </p>
                        <p>
                            In the Data Hub, researchers can collaborate with one another, explore and analyze harmonized data, apply AI and
                            machine learning tools, and share their findings to advance evidence-based diagnostic solutions, strengthening
                            overall health system resilience.
                        </p>
                    </Col>

                    <Col lg={4}>
                        <Image priority src="/images/4-collage.png" width="1500px" height="532px" alt="" />
                    </Col>
                </Row>
                <Row className={`${classes.Row} whiteTextBackground`}>
                    <h3 className={classes.black}>RADx Coordinating and Data Collection Centers</h3>

                    <p className={classes.section}>
                        Rapidly sharing RADx data and results empowers the scientific community to conduct secondary analyses, advances
                        diagnostic innovation, and addresses disease detection and prevention concerns, ultimately leading to new diagnostic
                        technologies. The RADx Data Hub partners with and supports the following RADx Coordinating and Data Collection
                        Centers (C)DCCs, which collect and share diagnostic research data and technologies:
                    </p>
                    <div className={classes.indent}>
                        <h5 className={classes.black}>RADx Tech</h5>
                        <hr className={classes.separator} />
                        <p className={classes.section}>
                            The RADx Tech accelerates development, validation, and commercialization of innovative point-of-care,
                            home-based, and clinical laboratory diagnostic technologies. RADx Tech has expanded the NIH’s National Institute
                            of Biomedical Imaging and Bioengineering (NIIBIB) Point-of-Care Technologies Research Network (POCTRN)
                            leveraging expertise from technology innovators, clinical testing, regulatory affairs, entrepreneurs, and
                            business leaders. Learn more at{' '}
                            <a href="https://www.nibib.nih.gov/programs/radx-tech-program" target="_blank" rel="noreferrer">
                                https://www.nibib.nih.gov/programs/radx-tech-program
                            </a>
                        </p>
                        <h5 className={classes.black}>RADx-UP</h5>
                        <hr className={classes.separator} />
                        <p className={classes.section}>
                            RADx-UP seeks to understand disease diagnostic morbidity and mortality disparities to reduce health concerns for
                            vulnerable populations. These researchers collaborate with community members to unite public health and
                            diagnostics, improving community-level outcomes. Learn more at{' '}
                            <a href="https://radx-up.org/" target="_blank" rel="noreferrer">
                                https://radx-up.org/
                            </a>
                        </p>
                        <h5 className={classes.black}>RADx-rad</h5>
                        <hr className={classes.separator} />
                        <p className={classes.section}>
                            RADx-rad drives the discovery of bold, new, and unconventional disease diagnostic approaches including rapid
                            detection devices and home-based testing technologies. This work may also lead to new ways of identifying
                            diseases, promoting faster diagnoses in the future. Learn more at{' '}
                            <a href="https://www.radxrad.org/" target="_blank" rel="noreferrer">
                                https://www.radxrad.org/
                            </a>
                        </p>
                        <h5 className={classes.black}>RADx DHT</h5>
                        <hr className={classes.separator} />
                        <p className={classes.section}>
                            RADx DHT develops digital health solutions, such as user-friendly smartphone apps, wearable devices, and
                            software, supporting real-time health monitoring, disease tracking, and data-sharing to support public
                            health-related decision-making. Learn more at{' '}
                            <a href="https://rapids.ll.mit.edu/" target="_blank" rel="noreferrer">
                                https://rapids.ll.mit.edu/
                            </a>
                        </p>
                    </div>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Card title="About RADx Data Hub Partners" headerImg="/images/large1.png" variant="info" bkgdColor="#EDEDED">
                            <div className="pb-3">
                                <div className={classes.list}>
                                    <ul>
                                        <li>
                                            <span className={classes.bold}>Data Hub Development:</span> Develop and enhance the Data Hub
                                            functions that store, share, and provide data analysis and utilization capabilities{' '}
                                            <span className={classes.bold}>
                                                (
                                                <a href="https://www.boozallen.com/" target="_blank" rel="noreferrer" className={classes.link}>
                                                    Booz Allen Hamilton
                                                </a>
                                                <ExternalLinkIcon />)
                                            </span>
                                        </li>
                                        <li>
                                            <span className={classes.bold}>Data Management:</span> Translate proposed standards for data and
                                            metadata into computational form, validate data quality, and enable greater use of common data
                                            elements, standardization, and harmonization{' '}
                                            <span className={classes.bold}>
                                                (
                                                <a href="https://bmir.stanford.edu/" target="_blank" rel="noreferrer" className={classes.link}>
                                                    Stanford
                                                </a>
                                                <ExternalLinkIcon />)
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className={classes.partners}>
                                    <Image src={bahLogo} alt="" />
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default About;
