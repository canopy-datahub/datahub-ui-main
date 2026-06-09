const userReg = {
    main: 'userReg',
    mainTitle: 'User Registration',
    dropdown: [
        {
            name: 'Create An Account',
            id: '#create-an-account',
        },
        {
            name: 'Login to the site',
            id: '#login-to-your-account',
        },
    ],
};

const studyExplorer = {
    main: 'studyExplorer',
    mainTitle: 'Study Explorer',
    dropdown: [
        {
            name: 'General',
            id: '#general-se',
        },
        {
            name: 'View Available Studies and Variables',
            id: '#view-studies-se',
        },
        {
            name: 'Perform Free-Text Searches & View Search Results',
            id: '#perform-search-se',
        },
        {
            name: 'Navigate Through Search Results',
            id: '#navigate-search-results-se',
        },
        {
            name: 'Refine Results Through Sorting & Filtering',
            id: '#refining-results-se',
        },
        {
            name: 'Performing Cross-Entity Searches',
            id: '#perform-cross-entity-se',
        },
    ],
};

const studyOverview = {
    main: 'studyOverview',
    mainTitle: 'Study Overview',
    dropdown: [
        {
            name: 'General',
            id: '#general-so',
        },
        {
            name: 'View Study Information',
            id: '#view-study-info',
        },
        {
            name: 'View Variable Information',
            id: '#view-variable-info',
        },
        {
            name: 'Download Documents',
            id: '#download-documents-so',
        },
        {
            name: 'Learn About Data Files & Download Resources',
            id: '#learn-about-so',
        },
    ],
};

const variableOverview = {
    main: 'variableOverview',
    mainTitle: 'Variable Overview',
    dropdown: [
        {
            name: 'General',
            id: '#general-vo',
        },
        {
            name: 'View Variable Information',
            id: '#view-variable-info-vo',
        },
        {
            name: 'List of Studies Using Variable',
            id: '#list-studies-vo',
        },
    ],
};

const homePage = {
    main: 'homePage',
    mainTitle: 'Home Page',
    dropdown: [
        {
            name: 'General',
            id: '#general-hp',
        },
        {
            name: 'Search for Studies',
            id: '#search-for-studies',
        },
        {
            name: 'Access Quick Links',
            id: '#access-quick-links',
        },
        {
            name: 'Find Events, Funding Opportunities, and Recent News',
            id: '#events-opportunities-news',
        },
        {
            name: 'View Statistics',
            id: '#view-statistics',
        },
        {
            name: 'Learn About Recent Content Updates',
            id: '#learn-about-content-updates',
        },
    ],
};

const userSupport = {
    main: 'userSupport',
    mainTitle: 'User Support',
    id: '#userSupport',
    dropdown: [{ name: 'General', id: '#general-us' }],
};

const overviewIntro = {
    main: 'overviewIntro',
    mainTitle: 'Tutorial Introduction and Overview',
    id: '#intro',
    dropdown: [
        {
            name: 'Overview',
            id: '#intro-overview',
        },
        {
            name: 'Introduction',
            id: '#intro-intro',
        },
        {
            name: 'Target Audience',
            id: '#target-audience',
        },
        {
            name: 'The Features of the Site',
            id: '#site-features',
        },
    ],
};

const submissionWorkflow = {
    main: 'submissionWorkflow',
    mainTitle: 'Submission Workflow',
    dropdown: [
        {
            name: 'Overview',
            id: '#submission-overview',
        },
        {
            name: 'Roles: Who Can Do What',
            id: '#submission-roles',
        },
        {
            name: 'Requesting a Role',
            id: '#submission-roles-request',
        },
        {
            name: 'Before You Start: Register a Study',
            id: '#submission-prereq',
        },
        {
            name: 'Submitting Data: Step by Step',
            id: '#submission-steps',
        },
        {
            name: 'Curator Review and Approval',
            id: '#submission-review',
        },
        {
            name: 'Fixing Problems and Updating Data Later',
            id: '#submission-fixing',
        },
        {
            name: 'Submission Status Reference',
            id: '#submission-status',
        },
        {
            name: 'Constraints and Tips',
            id: '#submission-constraints',
        },
    ],
};

const advancedSearch = {
    main: 'advancedSearch',
    mainTitle: 'Advanced Search Tool',
    dropdown: [
        {
            name: 'General',
            id: '#general-advs',
        },
        {
            name: 'Run a Single Query',
            id: '#running-single-query',
        },
        {
            name: 'Run Additional Queries and Subqueries',
            id: '#running-additional-queries',
        },
    ],
};

const jupyterLab = {
    main: 'jupyterLab',
    mainTitle: 'JupyterLab',
    dropdown: [
        {
            name: 'General',
            id: '#general-jupyter',
        },
        {
            name: 'Create and Launch a JupyterLab Space',
            id: '#create-space',
        },
        {
            name: 'Upload and Download Files',
            id: '#upload-download',
        },
        {
            name: 'Clone a Git Repository',
            id: '#clone-git',
        },
        {
            name: 'Create a Persistent Conda Environment',
            id: '#conda-environment',
        },
        {
            name: 'Access Public Data',
            id: '#access-public-data',
        },
        {
            name: 'Change Environment',
            id: '#change-environment',
        },
        {
            name: 'File Sync',
            id: '#file-sync',
        },
    ],
};

const dataWrangler = {
    main: 'dataWrangler',
    mainTitle: 'Data Wrangler',
    dropdown: [
        {
            name: 'General',
            id: '#general-data-wrangler',
        },
    ],
};

const sasViya = {
    main: 'sasViya',
    mainTitle: 'SAS Viya',
    dropdown: [
        {
            name: 'General',
            id: '#general-sas',
        },
    ],
};


const sidebarOptions = [];
sidebarOptions.push(overviewIntro);
sidebarOptions.push(studyExplorer);
// sidebarOptions.push(advancedSearch);
sidebarOptions.push(studyOverview);
sidebarOptions.push(variableOverview);
sidebarOptions.push(submissionWorkflow);
sidebarOptions.push(userSupport);
sidebarOptions.push(userReg);

export default sidebarOptions;
