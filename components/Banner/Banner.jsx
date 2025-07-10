/* eslint-disable multiline-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './Banner.module.scss';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { Col, Container, Row } from 'react-bootstrap';
import { ParallaxBanner } from 'react-scroll-parallax';

/**
 * Banner Component that holds the title of the page along with the Breadcrumb
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} title - Title of the banner
 * @property {Array} manualCrumbs - Defined array of objects that contain page label and page link for the breadcrumb
 * @property {String} path - path from router to be parsed to create breadcrumbs
 * @property {String} [ariaLabel] - Aria Label for the whole breadcrumb component
 * @returns {JSX} - Banner Component
 */

const Banner = (props) => {
    const { title, manualCrumbs, path, variant, ariaLabel } = props;
    let bannerContainerClass = `${classes.bannerContainer}`;

    let imgSource;

    switch (variant) {
        case 'virus1':
            imgSource = '/images/banner1.jpeg';
            break;
        case 'virus2':
            imgSource = '/images/banner2.jpeg';
            break;
        case 'virus3':
            imgSource = '/images/banner3.jpeg';
            bannerContainerClass += ` ${classes.blackGradient}`;
            break;
        case 'virus4':
            imgSource = '/images/banner4.jpeg';
            bannerContainerClass += ` ${classes.blackGradient}`;
            break;
        case 'virus5':
            imgSource = '/images/banner5.png';
            bannerContainerClass += ` ${classes.blackGradient}`;
            break;
        case 'virus6':
            imgSource = '/images/banner6.png';
            bannerContainerClass += ` ${classes.blackGradient}`;
            break;
        case 'crystal':
            imgSource = '/images/crystalBanner.png';
            bannerContainerClass += ` ${classes.blackGradient}`;
            break;
        default:
            imgSource = '/images/banner1.jpeg';
            break;
    }

    return (
        <>
            <ParallaxBanner layers={[{ image: imgSource, speed: -20 }]} className={classes.parallax}>
                <div className={bannerContainerClass}>
                    <Container fluid>
                        <Row>
                            <Col>
                                <div className={classes.titleContainer}>
                                    <h1 className={classes.title}>{title}</h1>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    {manualCrumbs || path ? (
                        <div className={classes.breadcrumbBackground}>
                            <Container fluid>
                                <Breadcrumbs className={classes.breadcrumb} manualCrumbs={manualCrumbs} path={path} ariaLabel={ariaLabel} />
                            </Container>
                        </div>
                    ) : null}
                </div>
            </ParallaxBanner>
        </>
    );
};

Banner.propTypes = {
    ariaLabel: PropTypes.string,
    manualCrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            page: PropTypes.string,
            pageLink: PropTypes.string,
            ariaLabel: PropTypes.string,
        })
    ),
    path: PropTypes.string,
    title: PropTypes.string,
    variant: PropTypes.oneOf(['virus1', 'virus2', 'virus3', 'virus4', 'virus5', 'virus6', 'crystal']),
};

export default Banner;
