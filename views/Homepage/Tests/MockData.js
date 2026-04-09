/* eslint-disable max-len */
export const statMock = {
    totalFiles: 1115,
    totalStudies: 151,
    dtos: [
        {
            name: 'RADx DHT',
            studyCount: 3,
            totalFileSize: 0.0,
            dataFileCount: 0,
            documentCount: 0,
        },
        {
            name: 'RADx-rad',
            studyCount: 39,
            totalFileSize: 11593.09,
            dataFileCount: 949,
            documentCount: 108,
        },
        {
            name: 'RADx Tech',
            studyCount: 9,
            totalFileSize: 2.71,
            dataFileCount: 14,
            documentCount: 17,
        },
        {
            name: 'RADx-UP',
            studyCount: 100,
            totalFileSize: 1771.05,
            dataFileCount: 152,
            documentCount: 170,
        },
    ],
};

export const eventsMock = [
    {
        id: 12,
        title: 'RADx Start of Summer Town Hall',
        description:
            'The RADx Summer Town Hall is used to discuss the recent progress, current objectives, and future goals for the project....',
        slug: 'event12',
        type: 'general event',
        registrationUrl: null,
        eventDate: '2024-06-15T12:00:00',
        expirationDate: null,
        createdAt: '2023-12-01T12:00:00',
        links: [],
    },
    {
        id: 11,
        title: 'RADx Year End Summary Review',
        description:
            'The purpose of this meeting is to have a review of the previous year, in order to highlight important milestones, and recognize hard working team members.',
        slug: 'event11',
        type: 'general event',
        registrationUrl: null,
        eventDate: '2024-12-26T13:14:15',
        expirationDate: null,
        createdAt: '2023-11-21T13:30:00',
        links: [],
    },
];

export const newsMock = [
    {
        id: 1,
        slug: 'news1',
        title: 'At-home COVID-19 Antigen Tests Preprint and Limited Open-source Data Set Now Available',
        type: 'general news',
        description: 'The FDA has published a safety communication regarding  <<<1>>>....',
        startDate: '2022-09-13T00:00:00.000+00:00',
        expirationDate: null,
        createdAt: '2023-11-02T20:33:42.195+00:00',
        links: [
            {
                id: 5,
                linkLabel: 'At-Home COVID-19 Antigen Tests',
                linkUrl:
                    'https://www.fda.gov/medical-devices/safety-communications/home-covid-19-antigen-tests-take-steps-reduce-your-risk-false-negative-results-fda-safety',
                displayOrder: 1,
            },
            {
                id: 6,
                linkLabel: 'preprint',
                linkUrl: 'https://www.medrxiv.org/content/10.1101/2022.08.05.22278466v1',
                displayOrder: 2,
            },
            {
                id: 7,
                linkLabel: 'limited open source dataset',
                linkUrl: 'https://github.com/soni-lab/Test_Us_At_Home',
                displayOrder: 3,
            },
        ],
    },
    {
        id: 2,
        slug: 'news2',
        title: 'RADx Data Hub opens doors to all researchers',
        type: 'general news',
        description:
            'The National Institutes of Health (NIH) Rapid Acceleration of Diagnostics Data Hub (RADx® Data Hub) announces today that its cloud-enabled platform is now open to researchers....',
        startDate: '2022-12-16T00:00:00.000+00:00',
        expirationDate: null,
        createdAt: '2023-11-02T20:40:56.193+00:00',
        links: [
            {
                id: 8,
                linkLabel: 'RADx Data Hub ',
                linkUrl: 'https://radx-hub.nih.gov/',
                displayOrder: 1,
            },
            {
                id: 9,
                linkLabel: 'NIH RADx program initiatives',
                linkUrl: 'https://www.nih.gov/research-training/medical-research-initiatives/radx/radx-programs',
                displayOrder: 2,
            },
        ],
    },
];

export const fundingMock = [
    {
        id: 3,
        slug: 'notice1',
        title: 'New Notice of Special Interest NOT-OD-23-040 and NOT-OD-23-041 Support Secondary Analysis Using the RADx Data Hub',
        type: 'funding opportunities',
        description: 'On December 19, 2022 NIH released two new Notice of Special Interests (NOSIs)...',
        startDate: '2022-12-20T00:00:00.000+00:00',
        expirationDate: '2024-01-05T00:00:00.000+00:00',
        createdAt: '2023-11-02T20:40:56.193+00:00',
        links: [
            {
                id: 10,
                linkLabel:
                    'NOT-OD-23-040: Notice of Special Interest (NOSI): Advance Data Science Approaches Through Secondary Data Analysis to Reveal Scientific Insights of COVID-19 Testing Technologies (R21) (nih.gov)',
                linkUrl: 'https://grants.nih.gov/grants/guide/notice-files/NOT-OD-23-040.html',
                displayOrder: 1,
            },
            {
                id: 11,
                linkLabel:
                    'NOT-OD-23-041: Notice of Special Interest (NOSI): Research Supplements to Promote Data Science Workforce Diversity to Reveal Scientific Insights of COVID-19 Testing Technologies (Admin Supp Clinical Trial Not Allowed) (nih.gov)',
                linkUrl: 'https://grants.nih.gov/grants/guide/notice-files/NOT-OD-23-041.html',
                displayOrder: 2,
            },
        ],
    },
    {
        id: 4,
        slug: 'notice2',
        title: 'NIH releases Notice of Change NOT-OD-23-130',
        type: 'funding opportunities',
        description: 'NIH has released a Notice of Change (<<<1>>>) to extend the expiration date for <<<2>>> to January 5, 2024.',
        startDate: '2023-05-21T00:00:00.000+00:00',
        expirationDate: '2024-01-05T00:00:00.000+00:00',
        createdAt: '2023-11-02T20:40:56.193+00:00',
        links: [
            {
                id: 12,
                linkLabel: 'NOT-OD-23-130',
                linkUrl: 'https://grants.nih.gov/grants/guide/notice-files/NOT-OD-23-130.html',
                displayOrder: 1,
            },
            {
                id: 13,
                linkLabel: 'NOT-OD-23-040',
                linkUrl: 'https://grants.nih.gov/grants/guide/notice-files/NOT-OD-23-040.html',
                displayOrder: 2,
            },
        ],
    },
];

export const contentUpdatesMock = {
    newStudies: [
        {
            studyName: 'COVID-19 testing and vaccination social network diffusion for diverse criminal legal involved communities',
            studyId: 194,
            dcc: 'RADx-UP',
            date: 'Mar 24, 2023',
        },
        {
            studyName: 'COVID-19 Treatment Cascade Optimization Study',
            studyId: 199,
            dcc: 'RADx-UP',
            date: 'May 16, 2023',
        },
        {
            studyName: 'Social and behavioral implications for COVID-19 testing in Delaware underserved communities',
            studyId: 200,
            dcc: 'RADx-UP',
            date: 'Jul 13, 2023',
        },
        {
            studyName: 'Social, Behavioral, and Ethical Implications of COVID-19',
            studyId: 202,
            dcc: 'RADx-UP',
            date: 'Jul 27, 2023',
        },
        {
            studyName:
                'Sin Duda: a community-driven approach to expand reach, access and uptake of COVID-19 home-based tests for at risk Latinos',
            studyId: 203,
            dcc: 'RADx-UP',
            date: 'Jul 27, 2023',
        },
        {
            studyName:
                'Supported Employment to Create a Community Culture of Rapid Testing Among People Who Inject Drugs: PeerConnect2Test',
            studyId: 204,
            dcc: 'RADx-UP',
            date: 'Jul 27, 2023',
        },
        {
            studyName: 'COVID-19 Testing and Prevention in Correctional Settings',
            studyId: 205,
            dcc: 'RADx-UP',
            date: 'Jul 27, 2023',
        },
        {
            studyName:
                'Supporting the health and well-being of children with intellectual and developmental disability during COVID-19\rpandemic',
            studyId: 207,
            dcc: 'RADx-UP',
            date: 'Jul 27, 2023',
        },
        {
            studyName:
                'ÓRALE COVID-19! Vaccination: An Initiative to Increase COVID-19Vaccination in Yolo, Madera, Fresno, Stanislaus Counties in California.',
            studyId: 209,
            dcc: 'RADx-UP',
            date: 'Aug 02, 2023',
        },
        {
            studyName: 'Rapid Optimization of COVID-19 Testing for People Affected by Diabetes',
            studyId: 210,
            dcc: 'RADx-UP',
            date: 'Aug 02, 2023',
        },
        {
            studyName:
                'Collaborative community networks to optimize implementation of low barrier COVID-19 testing efforts among diverse Latinx populations in Northern California',
            studyId: 211,
            dcc: 'RADx-UP',
            date: 'Aug 02, 2023',
        },
        {
            studyName: 'Community Collaboration to Combat Coronavirus (C-FORWARD)',
            studyId: 213,
            dcc: 'RADx-UP',
            date: 'Aug 03, 2023',
        },
        {
            studyName: 'Empowering schools as community assets to mitigate the adverse impacts of COVID-19',
            studyId: 214,
            dcc: 'RADx-UP',
            date: 'Aug 03, 2023',
        },
        {
            studyName: 'study name part 1',
            studyId: 236,
            dcc: 'RADx Tech',
            date: 'Jan 10, 2024',
        },
        {
            studyName: 'study name part 1',
            studyId: 248,
            dcc: 'RADx Tech',
            date: 'Feb 06, 2024',
        },
        {
            studyName: 'study name part 1',
            studyId: 249,
            dcc: 'RADx Tech',
            date: 'Feb 06, 2024',
        },
        {
            studyName: 'A Mountable Toilet System for Personalized Health Monitoring via the Analysis of Excreta',
            studyId: 251,
            dcc: 'RADx Tech',
            date: 'Feb 06, 2024',
        },
        {
            studyName: 'Testing Study Reg Emails',
            studyId: 258,
            dcc: 'RADx-UP',
            date: 'Feb 16, 2024',
        },
    ],
    newFiles: [
        {
            studyName: 'Eliminating COVID-19 Disparities in Arizona in Partnership with Vulnerable/Underserved Communities',
            studyId: 98,
            dcc: 'RADx-UP',
            files: 7,
            date: 'Aug 31, 2023',
        },
        {
            studyName:
                'Multiparametric Integrated Molecular Detection of SARS-CoV-2 from Biofluids by Adapting Single Extracellular Vesicle Characterization Technologies',
            studyId: 114,
            dcc: 'RADx-rad',
            files: 11,
            date: 'Dec 02, 2022',
        },
        {
            studyName: 'Validation of Smart Masks for Surveillance of COVID-19',
            studyId: 49,
            dcc: 'RADx-rad',
            files: 4,
            date: 'Dec 02, 2022',
        },
    ],
    updatedFiles: [
        {
            studyName:
                'Multiparametric Integrated Molecular Detection of SARS-CoV-2 from Biofluids by Adapting Single Extracellular Vesicle Characterization Technologies',
            studyId: 114,
            dcc: 'RADx-rad',
            files: 4,
            date: 'Dec 02, 2022',
        },
        {
            studyName: 'Portable GC detector for COVID diagnostics',
            studyId: 68,
            dcc: 'RADx-rad',
            files: 3,
            date: 'Nov 16, 2022',
        },
        {
            studyName: 'Detection and Automatic Privacy-Protected Contact Tracing System Designed for COVID-19',
            studyId: 63,
            dcc: 'RADx-rad',
            files: 1,
            date: 'Nov 10, 2022',
        },
    ],
};
