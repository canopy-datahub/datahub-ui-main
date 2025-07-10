const analyticsWorkbench = {
    main: 'analyticsWorkbench',
    mainTitle: 'The Analytics Workbench',
    dropdown: [
        {
            name: 'General',
            id: '#general-workbench',
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
sidebarOptions.push(analyticsWorkbench);
sidebarOptions.push(jupyterLab);
sidebarOptions.push(dataWrangler);
sidebarOptions.push(sasViya);

export default sidebarOptions;
