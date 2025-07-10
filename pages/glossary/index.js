import React from 'react';
import Glossary from '../../views/Glossary/Glossary.jsx';
import logger from '../../lib/logger';

const GlossaryPage = (props) => <Glossary {...props} />;

export async function getServerSideProps() {
    logger.defaultMeta.service = 'Glossary';

    return {
        props: {
            pageTitle: 'Glossary',
        },
    };
}

export default GlossaryPage;
