import React from 'react';
import SystemSettings from '../../views/SystemSettings/SystemSettings';

const SystemSettingsPage = (props) => <SystemSettings {...props} />;

export async function getServerSideProps() {
    return {
        props: {
            pageTitle: 'System Settings',
        },
    };
}

export default SystemSettingsPage;
