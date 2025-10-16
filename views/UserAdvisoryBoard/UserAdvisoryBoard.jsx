import React from 'react';
import Banner from '../../components/Banner/Banner';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import ExternalIcon from '../../components/Images/svg/ExternalIcon';
import CalloutBox from '../../components/CalloutBox/CalloutBox';
import classes from './UserAdvisoryBoardStyles.module.scss';

const UserAdvisoryBoard = (props) => {
    const router = useRouter();
    return (
        <>
            <Banner title="User Advisory Board" path={router.asPath} variant="virus6" ariaLabel="User Advisory Board Breadcrumb" />
            <Container>
                <Row className="mb-4 mt-5">
                    <CalloutBox
                        className={classes.introText}
                        body={
                            <div>
                                The <b>User Advisory Board (UAB)</b> serves as the voice of the user community and the Champions of the Data
                                Hub. The UAB contributes valuable perspectives to help shape and improve the Data Hub and ensure the
                                platform meets user needs.
                            </div>
                        }
                    />
                </Row>
                <Row className="mb-4">
                    <Col className={classes.wrappedImg}>
                        <Image src="" height={350} width={300} alt="" />
                    </Col>
                    <Col className={classes.wrappedText}>
                        <span>
                            <b>John Doe</b>
                        </span>
                        <div>Associate Professor</div>
                        <span>
                            <a href={'/'}>
                                LinkedIn <ExternalIcon />
                            </a>
                        </span>
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col className={classes.wrappedImg}>
                        <Image src="" height={350} width={300} alt="" />
                    </Col>
                    <Col className={classes.wrappedText}>
                        <span>
                            <b>Jane Doe</b>
                        </span>
                        <div>Principal Investigator</div>
                        <span>
                            <a href={'/'}>
                                LinkedIn <ExternalIcon />
                            </a>
                        </span>
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UserAdvisoryBoard;
