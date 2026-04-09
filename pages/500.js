import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import Banner from '../components/Banner/Banner';

export default function Custom500() {
    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Internal Server Error',
        },
    ];

    return (
        <>
            <Banner
                title="Internal Server Error"
                manualCrumbs={crumbs}
                variant="lab4"
                ariaLabel="Internal Server Error"
            />
            <Container style={{ marginTop: '60px', minHeight: '3.5vh' }}>
                <Row >
                    <div>
                        An error has occurred and we're working to fix this problem. Please contact the{' '}
                        <Link href={`/support`} legacyBehavior>
                            Support Team.
                        </Link>
                    </div>
                </Row>
            </Container>
        </>
    );
}
