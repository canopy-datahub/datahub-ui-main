/* eslint-disable max-len */
import React from 'react';
import { Container } from 'react-bootstrap';
import classes from './ContactUs.module.scss';
import Banner from '../../components/Banner/Banner';
import { useRouter } from 'next/router';
import CalloutBox from '../../components/CalloutBox/CalloutBox';
import Link from 'next/link';

/**
 * View for the ContactUs Page
 * @returns {Node} object rendering events
 */

const ContactUs = (props) => {
    const router = useRouter();

    return (
        <>
            <Banner title="Contact Us" path={router.asPath} variant="virus4" ariaLabel="Contact Us Breadcrumb" />
            <Container className={`${classes.Container}`}>
                <CalloutBox
                    body={
                        <div className={classes.infoText}>
                            For technical support, please fill out a{' '}
                            <Link href={`/support`} legacyBehavior>
                                Support Request
                            </Link>
                            .
                        </div>
                    }
                />
            </Container>

            <Container className={`${classes.Container} whiteTextBackground`}>
                <h2 className={classes.blue}>Monthly Office Hours</h2>
                <div className={classes.indented}>
                    Data Hub Office Hours provide an ongoing, regular venue for researchers and others interested in learning more
                    about the RADx Data Hub to drop in and ask questions or get hands-on, expert help. View the Office Hours calendar.
                </div>
                <h2 className={classes.blue}>Contact Form</h2>
                <div className={classes.indented}>
                    Can’t make Office Hours or want to connect with the Data Hub team? Fill out this form and we will reach out to you.
                </div>
            </Container>
        </>
    );
};

ContactUs.propTypes = {};

export default ContactUs;
