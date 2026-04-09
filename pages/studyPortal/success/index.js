import React from 'react';
import logger from '../../../lib/logger';
import StudyPortalSuccess from '../../../views/StudyPortal/StudyPortalSuccess';

const StudyPortalSuccessPage = (props) => <StudyPortalSuccess {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'study_portal_success';
    const { req } = context;
    return {
        props: {
            pageTitle: 'Study Portal',
        },
    };
}

export default StudyPortalSuccessPage;
