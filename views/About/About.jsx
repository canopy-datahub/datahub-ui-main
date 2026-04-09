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
                title="Learn About Canopy"
                path={router.asPath}
                variant="lab4"
                ariaLabel="Learn About Canopy Breadcrumb"
            />

            <Container className={classes.Container}>
                <Row className={`${classes.Row} whiteTextBackground`}>
                    <h2 className={classes.black}>About Canopy</h2>

                    <Col lg={8}>
                        <p>
                            The Canopy is a secure, cloud-based platform that empowers researchers to upload and access curated, de-identified datasets, 
                            accelerating innovation in disease diagnostics and public health initiatives.
                        </p>
                        <p>
                            Designed to promote researcher collaboration and accelerate scientific discovery, the Canopy seeks to
                            understand public health and disease morbidity and mortality disparities, while supporting innovations in the
                            development, commercialization, and implementation of diagnostic technologies through de-identified data and
                            algorithms.
                        </p>
                        <p>
                            In the Canopy, researchers can collaborate with one another, explore harmonized data, and share their findings to advance evidence-based diagnostic solutions, strengthening
                            overall health system resilience.
                        </p>
                    </Col>

                    <Col lg={4}>
                        <Image priority src="/images/4-collage.png" width="1500px" height="532px" alt="" />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default About;
