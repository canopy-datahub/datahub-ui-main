import React from 'react';
import StudyPortal from '../../views/StudyPortal/StudyPortal';
import { GET_RESOURCE_CENTER_BUCKET } from '../../constants/apiRoutes';

const StudyPortalPage = (props) => <StudyPortal {...props} />;

export async function getServerSideProps() {
    // Studies are fetched client-side via /api/launch/StudyPortal/GetStudies — that path
    // can attach the user's JWT (the only way to satisfy the UPLOADER role check on the
    // backend). SSR has no access to the access token, so any fetch here would 401.
    return {
        props: {
            studies: [],
            fileUploadSOP: `${process.env.NEXT_PUBLIC_BACKEND_URL}${GET_RESOURCE_CENTER_BUCKET}SOP.pdf`,
            pageTitle: 'Study Portal',
        },
    };
}

export default StudyPortalPage;
