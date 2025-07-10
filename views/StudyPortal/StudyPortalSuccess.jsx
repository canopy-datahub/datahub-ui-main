import React from 'react';
import SuccessPage from '../../components/SuccessPage/SuccessPage';
import { Col, Row, Container } from 'react-bootstrap';
import Button from '../../components/Button/Button';
import { useRouter } from 'next/router';
import { CheckCircle } from 'react-bootstrap-icons';
import Banner from '../../components/Banner/Banner';
import classes from './StudyPortal.module.scss';

const StudyPortalSuccess = (props) => {
    const router = useRouter();
    const textContent = 'Your upload has been successfully processed! Please use the buttons below to navigate "Home" or "Return to Upload Portal" for another submission.';
    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Study Portal',
            pageLink: '/studyPortal',
            ariaLabel: 'study portal'
        },
        {
            page: 'Success'
        }
    ];
    return (
        <>
            <Banner
                title="Study Portal Upload Success"
                manualCrumbs={crumbs}
                variant="virus3"
                ariaLabel="Success"
            />
            <Container style={{ marginTop: '60px', minHeight: '3.5vh' }}>
                <Row>
                    <SuccessPage
                        icon={<CheckCircle />}
                        iconClassName={classes.iconClass}
                        textContent={textContent}
                    />
                </Row>
                <Row className={classes.buttonGroup}>
                    <Col>
                        <Button
                            label="Home"
                            type="button"
                            ariaLabel="Navigate back to the home page"
                            size="medium"
                            variant="primary"
                            className={classes.homeButton}
                            handleClick={() => router.push('/')}
                        />
                    </Col>
                    <Col>
                        <Button
                            label="Return to Upload Portal"
                            type="button"
                            ariaLabel="Navigate back to the study portal page"
                            size="medium"
                            variant="secondary"
                            className={classes.returnButton}
                            handleClick={() => router.push('/studyPortal')}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
 
export default StudyPortalSuccess;
