import React from 'react';
import WorkbenchTutorial from '../../views/Tutorial/WorkbenchTutorial';
import logger from '../../lib/logger';

const WorkbenchTutorialPage = (props) => <WorkbenchTutorial {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'workbench_tutorial';
    const { query } = context;
    const tutorialPage = query?.tutorial || 'analyticsWorkbench';
    return {
        props: {
            tutorialPage,
            pageTitle: 'Workbench Tutorial',
        },
    };
}

export default WorkbenchTutorialPage;
