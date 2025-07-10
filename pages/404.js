import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import Banner from '../components/Banner/Banner';

export default function Custom404() {
    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Page Not Found',
        },
    ];

    return <>
        <Banner
            title="Page Not Found"
            manualCrumbs={crumbs}
            variant="virus4"
            ariaLabel="Page Not Found"
        />
        <Container style={{ marginTop: '60px', minHeight: '3.5vh' }}>
            <Row >
                <div>
                    Sorry, we can’t find the page you’re looking for. Please contact the{' '}
                    <Link href={`/support`} legacyBehavior>
                        RADx Data Hub Support Team.
                    </Link>
                </div>
            </Row>
        </Container>
    </>
}
