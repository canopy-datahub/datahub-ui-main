import React from 'react';
import logger from '../../../lib/logger';
import AddonRequestForm from '../../../views/ApprovedData/WorkbenchAddonRequestForm/AddonRequestForm';
import { GET_RESOURCE_CENTER_BUCKET } from '../../../constants/apiRoutes';

const AddOnRequestPage = (props) => <AddonRequestForm {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Workbench Addon Request Form';

    const TOS_URL = `${process.env.NEXT_PUBLIC_DEV_URL}${GET_RESOURCE_CENTER_BUCKET}erm_of_Service.pdf`;

    return {
        props: {
            title: 'Workbench Add-on Request',
            TOS_URL,
            pageTitle: 'Workbench Add-on Request',
        },
    };
}

export default AddOnRequestPage;
