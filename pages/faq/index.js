import React from 'react';
import Faq from '../../views/Faq/Faq';
import logger from '../../lib/logger';

const FaqPage = (props) => <Faq {...props} />;

export async function getServerSideProps() {
    logger.defaultMeta.service = 'faq';

    return {
        props: {
            pageTitle: 'Frequently Asked Questions',
        },
    };
}

export default FaqPage;
