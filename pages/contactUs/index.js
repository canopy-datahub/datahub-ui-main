import React from 'react';
import ContactUs from '../../views/ContactUs/ContactUs';
import logger from '../../lib/logger';

const ContactUsPage = (props) => <ContactUs {...props} />;

export async function getServerSideProps() {
    logger.defaultMeta.service = 'contact_us';
    const baseUrl = process.env.DEV_URL;

    return {
        props: {
            baseUrl,
            pageTitle: 'Contact Us',
        },
    };
}

export default ContactUsPage;
