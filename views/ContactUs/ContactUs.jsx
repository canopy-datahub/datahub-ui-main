/* eslint-disable max-len */
import React from 'react';
import { Container } from 'react-bootstrap';
import classes from './ContactUs.module.scss';
import Banner from '../../components/Banner/Banner';
import { useRouter } from 'next/router';
import Link from 'next/link';

/**
 * View for the ContactUs Page
 * @returns {Node} object rendering events
 */

const ContactUs = (props) => {
    const router = useRouter();

    return (
        <>
            <Banner title="Contact Us" path={router.asPath} variant="lab4" ariaLabel="Contact Us Breadcrumb" />
            <section className={classes.hero}>
                <Container className={classes.heroInner}>
                    <p className={classes.kicker}>Support</p>
                    <h1 className={classes.title}>We are here to help.</h1>
                    <p className={classes.lede}>
                        Need a hand or have a question? Send us a quick support request and we will take it from there.
                    </p>
                    <div className={classes.actions}>
                        <Link href="/support" legacyBehavior>
                            <a className={classes.primaryCta}>Submit a support request</a>
                        </Link>
                        <div className={classes.secondary}>
                            Or email <a href="mailto:example@example.com">example@example.com</a>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

ContactUs.propTypes = {};

export default ContactUs;
