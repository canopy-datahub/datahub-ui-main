import React from 'react';
import GettingStarted from '../../views/GettingStarted/GettingStarted';

const GettingStartedPage = (props) => <GettingStarted {...props} />;

export async function getServerSideProps() {
    return {
        props: {
            pageTitle: 'Getting Started',
        },
    };
}

export default GettingStartedPage;
