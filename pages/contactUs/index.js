import React from 'react';
import ContactUs from '../../views/ContactUs/ContactUs';
import logger from '../../lib/logger';

const ContactUsPage = (props) => <ContactUs {...props} />;

export async function getServerSideProps() {
    logger.defaultMeta.service = 'contact_us';

    return {
        props: {
            pageTitle: 'Contact Us',
        },
    };
}

export default ContactUsPage;
