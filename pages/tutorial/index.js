import React from 'react';
import Tutorial from '../../views/Tutorial/Tutorial';
import logger from '../../lib/logger';
import axios from 'axios';

const TutorialPage = (props) => <Tutorial {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'tutorial';
    const { req, query } = context;
    const tutorialPage = query?.tutorial || 'overviewIntro';
    return {
        props: {
            tutorialPage,
            pageTitle: 'Tutorial',
        },
    };
}

export default TutorialPage;
