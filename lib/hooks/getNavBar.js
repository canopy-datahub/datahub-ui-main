export const GetNavBar = async (user, NavParams) => {
    if (user?.roles?.includes('Data Submitter')) {
        NavParams.push({
            name: 'Data Submitter',
            dropdown: [
                { name: 'Study Registration', link: '/center/studyRegistration' },
                { name: 'Data Submission', link: '/submitterDashboard' },
            ],
        });
    }
    if (user?.roles?.includes('Data Curator')) {
        NavParams.push({
            name: 'Curator',
            dropdown: [
                { name: 'Study File Submissions', link: '/studyFileSubmissions' },
                { name: 'Study Registration', link: '/curator/studyRegistration' },
                { name: 'Downloads', link: '/curator/downloads' },
            ],
        });
    }
    if (user?.roles?.includes('Support Team')) {
        NavParams.push({
            name: 'Support Dashboard',
            link: '/supportDashboard',
        });
    }
    if (user?.roles?.includes('Application Administrator')) {
        NavParams.push({
            name: 'Application Administrator',
            dropdown: [
                { name: 'Support Dashboard', link: '/supportDashboard' },
                { name: 'User Dashboard', link: '/userDashboard' },
                // { name: 'Institution Dashboard', link: '' },  May have in the future
            ],
        });
    }
    if (user?.roles?.includes('Officer')) {
        NavParams.push({
            name: 'Internal',
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
