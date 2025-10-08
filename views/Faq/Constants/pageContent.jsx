import classes from '../Faq.module.scss';

export const contentArray = (baseUrl, restGet) => [
    {
        title: 'General',
        id: 'general',
        content: [
            {
                id: 'general-1',
                header: 'What is the  Data Hub?',
                body: (
                    <>
                        <div className={classes.break}>
                            The Rapid Acceleration of Diagnostics () Data Hub is a secure, cloud-based resource, designed to accelerate
                            data-driven diagnostic innovation. It offers analytic tools and de-identified{' '}
                            <a
                                href="https://www..gov/research-training/medical-research-initiatives//-programs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Initiative
                            </a>{' '}
                            data, so researchers can find studies of interest, and analyze curated and harmonized data with built-in tools.
                        </div>
                    </>
                ),
            },
            {
                id: 'general-2',
                header: 'Who can submit studies and data to the  Data Hub?',
                body: (
                    <>
                        <div className={classes.break}>
                            The Data Hub accepts programs’ (-UP, -rad, Tech, and DHT) data. If you are not affiliated with these programs
                            but would like to submit studies or data, please contact example@example.com.
                        </div>
                    </>
                ),
            },
            {
                id: 'general-3',
                header: 'Do I need to create a  Data Hub account?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                You do not need to create a Data Hub account to browse study information and view public documents (e.g.,
                                metadata files and data dictionaries).
                            </span>
                        </div>
                        <div style={{ marginBottom: '35px' }}>
                            <span>
                                To gain study-level access to original and transformed data files, you will need to create an account for
                                the Data Hub using your login
                            </span>
                            <span>account. </span>
                            <span>
                                Once you have registered, sign into dbGaP with the same account and request access to a study. After you’ve
                                been granted access, the study and its associated data files will appear in the <b>My Approved Data</b> tab
                                where you can download them or transfer them to the <b>Analytics Workbench</b> for further analysis.
                            </span>
                        </div>
                        <div className={classes.break}>
                            <span>For more in-depth instructions on how to create an account for the Data Hub, see the tutorial.</span>
                        </div>
                        <div className={classes.break}>
                            <span>To learn how to create an account visit the help page</span>
                        </div>
                        <div className={classes.break}>
                            <span>If you have an smart card and are having trouble with it, please visit the system login hlep</span>
                            <span>page.</span>
                        </div>
                    </>
                ),
            },
            {
                id: 'general-4',
                header: 'How do I change my password or profile information (e.g., forgot password, update profile information, email preferences, etc.)?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>The Data Hub does not manage passwords, but instead, use outside systems</span>
                            <span>to authenticate researchers.</span>
                        </div>
                        <div className={classes.break}>
                            <span>If you use commons, visit the website</span>
                            <span>to request a new password.</span>
                        </div>
                        <div className={classes.break}>
                            <span>
                                The Login requires a smart card as opposed to a password. If you are having trouble with your smart card,
                                visit the login help page.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'general-5',
                header: 'Can my account be deactivated?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>Yes, the will deactivate your account if you violate the User Code of Conduct</span>
                        </div>
                        <div className={classes.break}>
                            <span>To deactivate your account, please contact the Data Hub Administrator at example@example.com</span>
                        </div>
                    </>
                ),
            },
            {
                id: 'general-6',
                header: 'How do I get in contact with the Support team to report issues (such as bugs), suggest new features, or get questions answered?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>There are two ways to get in contact with the Support Team: </span>
                            <ul>
                                <li>
                                    Login and use the <b>Need Support?</b> button in the top navigation bar{' '}
                                </li>
                                <li>Email the support team</li>
                            </ul>
                        </div>
                    </>
                ),
            },
            {
                id: 'general-7',
                header: 'How do I ensure new individuals joining my team have access to the system?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                The Data Hub does not require an account to search studies and access publicly available information.{' '}
                            </span>
                            <span>If you are onboarding a new team member, they will need an account or login</span>
                            <span>
                                to request study-level access to data files in dbGaP. Once they have an account, they will need to register
                                for the Data Hub using the same account they use for dbGaP.{' '}
                            </span>
                        </div>
                        <div className={classes.break}>
                            <span>If you are offboarding a team member with an eRA account, contact the help desk</span>
                        </div>
                        <div className={classes.break}>
                            <span>If you are offboarding a team member with an account, ensure they follow policies</span>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        title: 'Data Organization in the  Data Hub',
        id: 'data-organization',
        content: [
            {
                id: 'data-organization-1',
                header: 'What kind of data are in the  Data Hub?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>The Data Hub is a centralized repository for in-progress and complete</span>
                            <a href="https://-up.org/" target="_blank" rel="noopener noreferrer">{` -UP, `}</a>
                            <a href="https://www.radxrad.org/" target="_blank" rel="noopener noreferrer">{` -rad, `}</a>
                            <span>and</span>
                            <a
                                href="https://www.nibib..gov/covid-19/-tech-program"
                                target="_blank"
                                rel="noopener noreferrer"
                            >{`  Tech `}</a>
                            <span>
                                research study data. It also hosts DHT data information and links to the{' '}
                                <a href="https://rapids.ll.mit.edu/home" target="_blank" rel="noopener noreferrer">
                                    RAPIDS platform
                                </a>
                                . Research data includes curated and harmonized demographic, diagnostic, EHR, and digital health data to
                                support analysis, diagnostic innovation, and public health preparedness.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'data-organization-3',
                header: 'What is the Global Codebook?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                The Data Hub Global Codebook is the -required Common Data Elements (CDEs) data dictionary. It contains
                                precise mappings that organize (C)DCC-specific Data Elements into 12 unique, required CDE categories.
                                Download the Global Codebook here.
                            </span>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        title: 'Requesting Access to Data within the  Data Hub',
        id: 'requesting-access',
        content: [
            {
                id: 'requesting-access-1',
                header: 'How do I find original data and transformed data files as well as data dictionaries and metadata files?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                Metadata files and data dictionary files are publicly available, so you can access them without logging in.
                                You can find these files by navigating to the <b>Data Files</b> section of the <b>Study Overview</b> page
                                for a study.
                            </span>
                        </div>
                        <div className={classes.break}>
                            <span>
                                Harmonized and non-harmonized data files require study-level access from dbGaP. You must first request
                                access to the study in dbGaP, and then it will appear in the <b>My Approved Data</b> page.
                            </span>
                        </div>
                        <div>
                            <span>
                                For more on finding these files, please view the <a href="/tutorial"> Tutorial</a> pages on these topics:
                            </span>
                            <ul>
                                <li>Searching for Studies</li>
                                <li>Viewing the Study Overview page</li>
                                <li>Accessing "My Approved Data"</li>
                            </ul>
                        </div>
                    </>
                ),
            },
            {
                id: 'requesting-access-2',
                header: 'I want to use a  Data Hub study, but the data are not yet complete. How do I find out when the rest of the data will be available?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                First, review the <b>The Content Updates</b> section toward the bottom of the <b>Home</b> page. This section
                                contains links to studies that have recently received updates, and is updated every 90 days with information
                                on:
                            </span>
                            <ul>
                                <li>Newly registered studies</li>
                                <li>Studies with updated files</li>
                                <li>Studies with new files</li>
                            </ul>
                        </div>
                        <div className={classes.break}>
                            <span>
                                If you can’t find the study you are looking for, use the <b>Need Support?</b> button in the top navigation
                                to ask our team about data availability.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'requesting-access-3',
                header: `Why do I need to apply for access to studies through dbGaP in the  Data Hub?`,
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                The database of Genotypes and Phenotypes (dbGaP) archives and distributes study results and provides
                                mechanisms to control personal health-related study data access. The Data Hub relies on these mechanisms to
                                protect human subjects, supporting data use agreement compliance and granting access exclusively to trained
                                researchers with Data Access Committee-approved research plans.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'requesting-access-4',
                header: `How do I request access to a study in dbGaP?`,
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                To request access to the data, click on the dbGaP link located under the <b>Study Name</b> on the{' '}
                                <b>Study Overview</b> page. For more detailed instructions, review our tips and tricks
                            </span>
                        </div>
                        <div className={classes.break}>
                            <span>
                                Note: After you obtain dbGaP approval to access the data, use the same eRA or account used in dbGaP when
                                logging into the Data Hub to access the approved data.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'requesting-access-6',
                header: `How can I access older data file versions?`,
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                The <b>My Approved Data</b> page will only contain the current data file version. To receive an older
                                version, please contact example@example.com
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'requesting-access-5',
                header: `I got approved for data through dbGaP but I don’t see it in my account. What should I do?`,
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                First, ensure that you are logged into the Data Hub using the same Login or eRA account you used when
                                requesting access to the study in dbGaP and visit the <b>My Approved Data</b> page. If you still don’t see
                                what you are looking for, reach out to example@example.com
                            </span>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        title: 'Data Use and Compliance in the  Data Hub',
        id: 'data-use-and-compliance',
        content: [
            {
                id: 'data-use-and-compliance-1',
                header: 'What can I use to analyze data?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                Researchers can use the Data Hub in-browser analytics tools (Jupyter Notebooks or SAS Viya) or download the
                                data into a CSV file for analysis.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'data-use-and-compliance-2',
                header: 'Can I download data?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                Yes, you can download data from either Sagemaker, SAS Viya, or your <b>My Approved Data</b> page. Please see
                                the Workbench User Tutorial for more details.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'data-use-and-compliance-3',
                header: 'I’m having issues getting started with SageMaker and/or SAS Viya? Who can I contact?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                Login and use the navigation bar’s <b>Need Support?</b> button to submit <b>Workbench Support</b> questions
                                or email us at example@example.com
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'data-use-and-compliance-4',
                header: 'How do I request a larger compute instance?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                Login and use the navigation bar’s <b>Need Support?</b> button to submit <b>Workbench Support</b> questions
                                or email us at example@example.com
                            </span>
                        </div>
                    </>
                ),
            },
            // {
            //     id: 'data-use-and-compliance-5',
            //     header: 'How do I request a SAS or Data Wrangler license?',
            //     body: (
            //         <>
            //             <div className={classes.break}>
            //                 <span>Please follow these 4 steps:</span>
            //                 <ol>
            //                     <li>
            //                         Go to <b>My Approved Data</b> in the  Data Hub.
            //                     </li>
            //                     <li>
            //                         Select <b>Apply for Add-ons</b> in the top-right.
            //                     </li>
            //                     <li>Fill out the required fields.</li>
            //                     <li>Submit your request.</li>
            //                 </ol>
            //             </div>
            //         </>
            //     ),
            // },
            {
                id: 'data-use-and-compliance-dar',
                header: 'What should I put for the Cloud Use Statement and Cloud Service Provider Information in the Data Access Request if I plan to use the Researcher Workbench?',
                body: (
                    <>
                        <div className={classes.break}>
                            When preparing a <b>Cloud Use Statement</b> for a <b>Data Access Request (DAR)</b>, be sure to:
                        </div>
                        <div>
                            <ol>
                                <li>
                                    Indicate that you are planning to use the <b> Data Hub Workbench</b> for data storage and analysis
                                </li>
                                <li>
                                    Specify your <b>research focus area</b> and the <b>purpose</b>
                                </li>
                                <li>
                                    Provide a brief description of how the <b>Workbench</b> will be utilized in your proposed research
                                    process
                                    <ul>
                                        <li>
                                            <b>Template</b>
                                            <ul>
                                                <li>
                                                    I plan to use the Data Hub Workbench to analyze <b>[your planned analysis]</b> using{' '}
                                                    <b>[planned data for analysis (and bring your own, if applicable)]</b>. Potential users
                                                    for these cloud environments consist of the list of the ‘Internal Collaborators’ on this
                                                    application and members of the external collaborator list attached to this application.
                                                    External collaborators will submit their own dbGaP Data Access Requests.{' '}
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <b>Example</b>
                                            <ul>
                                                <li>
                                                    I plan to use the Data Hub Workbench to analyze{' '}
                                                    <b>the effectiveness of wastewater testing in predicting disease spread</b> using{' '}
                                                    <b>
                                                        wastewater data and data from a non- study (study or publication information and/or
                                                        link)
                                                    </b>
                                                    . Potential users for these cloud environments consist of the list of the ‘Internal
                                                    Collaborators’ on this application and members of the external collaborator list
                                                    attached to this application. External collaborators will submit their own dbGaP Data
                                                    Access Requests.
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </>
                ),
            },
            {
                id: 'data-use-and-compliance-6',
                header: 'Are there restrictions or limitations to the use of data that are available in the  Data Hub?',
                body: (
                    <>
                        <div className={classes.break}>
                            Data are subject to the Data Use Certification Agreement you signed when you requested access to a study in
                            dbGaP.
                        </div>
                    </>
                ),
            },
            {
                id: 'data-use-and-compliance-7',
                header: 'How long can I use the data I obtained from the  Data Hub?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                The Data Hub relies on dbGaP to manage access to studies and their associated data files. Requested
                                dataset(s) access spans one (1) year with the option to renew for an additional year. You can renew your
                                access at the end of each calendar year. To learn how to renew your access, review the dbGaP Tutorial on
                            </span>
                            <a
                                href="https://www.youtube.com/watch?v=PG9D5mUouXg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >{` renewals.`}</a>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        title: 'Submitting Data in the  Data Hub',
        id: 'submit-data',
        content: [
            {
                id: 'submit-data-1',
                header: 'I have new datasets/documents to add to my study. How can I add these new items to my study?',
                body: (
                    <>
                        <div className={classes.break}>
                            Click <b>Data Submission</b> in the navigation bar’s Data Submitter dropdown. This will bring you to the Data
                            Submitter dashboard. Once there, click <b>+ New Submission</b>, and follow the prompts.
                        </div>
                    </>
                ),
            },
            {
                id: 'submit-data-2',
                header: 'How can I replace datasets/documents?',
                body: (
                    <>
                        <i>
                            Note: The system automatically versions files. Be sure that the file you are uploading has the exact same name
                            as the one you are replacing. Otherwise, the system will fail to create a new version and replace the file. Do
                            not put “v.1” or any version information in the file name.
                        </i>
                        <br />
                        <br />
                        <div className={classes.break}>
                            <span>
                                To upload a new version, go to the Data Submission dashboard and start a new submission. On step one, be
                                sure to upload a file with the exact same name as the one you plan on replacing and continue through the
                                prompts in the workflow. In the Review and Submit step, you will be able to verify whether the upload will
                                create a new version of your files. If all is correct, press <b>Submit</b>, and the files will be sent to
                                our data curation team for review. If there are no errors, the new files will replace your previous files in
                                the system.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'submit-data-3',
                header: 'Can I edit study metadata in the  Data Hub?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                After registration, you cannot edit Data Hub study metadata directly in the system. To edit your metadata,
                                please contact{' '}
                            </span>
                            <a href="mailto:-DataHub@.gov">{` -DataHub@.gov`}</a>.
                        </div>
                    </>
                ),
            },
            {
                id: 'submit-data-4',
                header: 'I have a study stored in the Data Hub, but one of my study participants has withdrawn their consent. How do I remove the participant from the study data?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>If a participant withdraws their consent, contact us</span>
                            <span>
                                at your earliest convenience. We will remove the entire study dataset. You will need to provide revised
                                study data, with the participant redacted, to replace your original submission. We will notify any data
                                recipients of the situation when the redacted data are available.
                            </span>
                        </div>
                    </>
                ),
            },
        ],
    },
];
