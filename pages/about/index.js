import React from 'react';
import About from '../../views/About/About';

const AboutPage = (props) => <About {...props} />;

export async function getServerSideProps() {
    return {
        props: {
            pageTitle: 'About',
        },
    };
}

export default AboutPage;
