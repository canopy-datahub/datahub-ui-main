import { getRoleLabel } from '../utils/roles';

export const GetNavBar = async (user, NavParams) => {
    if (user?.roles?.includes('Data Submitter')) {
        NavParams.push({
            name: getRoleLabel('Data Submitter'),
            dropdown: [
                { name: 'Study Registration', link: '/center/studyRegistration' },
                { name: 'Data Submission', link: '/submitterDashboard' },
            ],
        });
    }
    if (user?.roles?.includes('Data Curator')) {
        NavParams.push({
            name: getRoleLabel('Data Curator'),
            dropdown: [
                { name: 'Studies', link: '/curator/studyRegistration' },
                { name: 'File Submissions', link: '/studyFileSubmissions' },
                // 'Downloads' (/curator/downloads) was the curator view of the
                // upload-portal queue. With the Uploader role disabled (see
                // UserServiceImpl.BLOCKED_ROLES) nothing ever lands in that
                // queue, so the page is hidden here and 404s on direct access.
                // The three backend endpoints it consumed
                // (upload-portal.dashboard.view / .delete and
                // upload-portal.file.download) are still defined but no role
                // is granted them, so they 403. To restore: re-add the
                // dropdown line, restore the redirect-less page (git history),
                // and re-grant the three capabilities to the Curator role in
                // 729_data_role_capability.sql.
                // { name: 'Downloads', link: '/curator/downloads' },
            ],
        });
    }
    if (user?.roles?.includes('Support Team')) {
        NavParams.push({
            name: getRoleLabel('Support Team'),
            dropdown: [
                { name: 'Support Dashboard', link: '/supportDashboard' },
            ],
        });
    }
    if (user?.roles?.includes('Application Administrator')) {
        NavParams.push({
            name: getRoleLabel('Application Administrator'),
            dropdown: [
                { name: 'Support Dashboard', link: '/supportDashboard' },
                { name: 'User Dashboard', link: '/userDashboard' },
                { name: 'System Settings', link: '/systemSettings' },
                { name: 'Keycloak Admin', link: '/admin/master/console/', external: true },
                // { name: 'Institution Dashboard', link: '' },  May have in the future
            ],
        });
    }
    if (user?.roles?.includes('Officer')) {
        NavParams.push({
            name: getRoleLabel('Officer'),
            dropdown: [
                { name: 'Support Dashboard', link: '/internal/supportDashboard' },
                { name: 'Metrics', link: '/metrics/HubContent', allowedRoot: 'metrics' },
            ],
        });
    }
    // Uploader role is currently disabled platform-wide; no admin can grant it
    // (see UserServiceImpl.BLOCKED_ROLES). Hide the navbar entry so any legacy
    // user whose JWT still claims 'Uploader' doesn't see a link to a page whose
    // backend will 403 them. Re-enable by removing 'Uploader' from BLOCKED_ROLES
    // and uncommenting the block below.
    // if (user?.roles?.includes('Uploader')) {
    //     NavParams.push({
    //         name: 'Uploader',
    //         dropdown: [
    //             { name: 'Study Portal', link: '/studyPortal' },
    //         ],
    //     });
    // }
    return NavParams;
};
