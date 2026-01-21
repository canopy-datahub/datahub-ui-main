import classes from '../Faq.module.scss';

export const contentArray = (baseUrl, restGet) => [
    {
        title: 'General',
        id: 'general',
        content: [
            {
                id: 'general-1',
                header: 'What is the Redwood Platform?',
                body: (
                    <>
                        <div className={classes.break}>
                       Redwood platform is a secure, cloud-based research platform for accessing curated, de-identified datasets that accelerate innovation in diagnostics and public health. 
                        </div>
                    </>
                ),
            },
            {
                id: 'general-2',
                header: 'Do I need to create a Redwood account?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                You do not need to create a Redwood account to browse study information and view public documents (e.g.,
                                metadata files and data dictionaries).
                            </span>
                        </div>
                        <div style={{ marginBottom: '35px' }}>
                            <span>
                                To gain study-level access to original and transformed data files, you will need to create an account for
                                the Redwood using your login
                            </span>
                            <span>account. </span>
                        </div>
                        <div className={classes.break}>
                            <span>For more in-depth instructions on how to create an account for the Redwood, see the tutorial.</span>
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
                id: 'general-3',
                header: 'How do I change my password or profile information (e.g., forgot password, update profile information, email preferences, etc.)?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>The Redwood does not manage passwords, but instead, use outside systems</span>
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
                id: 'general-4',
                header: 'Can my account be deactivated?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>Yes, the will deactivate your account if you violate the User Code of Conduct</span>
                        </div>
                        <div className={classes.break}>
                            <span>To deactivate your account, please contact the Redwood Administrator at example@example.com</span>
                        </div>
                    </>
                ),
            },
            {
                id: 'general-5',
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
                id: 'general-6',
                header: 'How do I ensure new individuals joining my team have access to the system?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                The Redwood does not require an account to search studies and access publicly available information.{' '}
                            </span>
                            <span>If you are onboarding a new team member, they will need an account or login</span>
                            <span>
                                to request study-level access to data files in dbGaP. Once they have an account, they will need to register
                                for the Redwood using the same account they use for dbGaP.{' '}
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
        title: 'Data Organization in the Redwood',
        id: 'data-organization',
        content: [
            {
                id: 'data-organization-1',
                header: 'What kind of data are in the Redwood?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>The Redwood is a centralized repository for in-progress and complete
                                research study data. It includes curated and harmonized demographic, diagnostic, EHR, and digital health data to
                                support analysis, diagnostic innovation, and public health preparedness.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'data-organization-2',
                header: 'What is the Global Codebook?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                The Redwood Global Codebook is the required Common Data Elements (CDEs) data dictionary. It contains
                                precise mappings that organize (C)DCC-specific Data Elements into 12 unique, required CDE categories.
                                The Global Codebook can be found{" "}
                                <a
                                    href="https://github.com/bmir-datahub/datahub-docs/blob/feature/aws/Global_Codebook.xlsx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    here
                                </a>.
                            </span>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        title: 'Requesting Access to Data within the Redwood',
        id: 'requesting-access',
        content: [
            {
                id: 'requesting-access-1',
                header: 'How do I find original data and transformed data files as well as data dictionaries and metadata files?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                All files are publicly available, so you can access them without logging in.
                                You can find these files by navigating to the <b>Data Files</b> section of the <b>Study Overview</b> page
                                for a study.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'requesting-access-2',
                header: 'I want to use a Redwood study, but the data are not yet complete. How do I find out when the rest of the data will be available?',
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
                header: `How can I access older data file versions?`,
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                The <b>Study Overview</b> page will only contain the current data file version. To receive an older
                                version, please contact example@example.com
                            </span>
                        </div>
                    </>
                ),
            }
        ],
    },
    {
        title: 'Study Registration in the Redwood',
        id: 'study-registration',
        content: [
            {
                id: 'study-registration-1',
                header: 'How do I register a new study in the Redwood?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                To register a new study in the Redwood, navigate to the <b>Data Submitter</b> dropdown in the top navigation
                                bar and select <b>Study Registration</b>. This will take you to the Study Registration page where you can
                                begin the registration process.
                            </span>
                        </div>
                        <div className={classes.break}>
                            <span>
                                Click <b>Register a New Study</b> and complete the required study metadata fields. Once you have filled in all
                                required information, submit your registration for review by the Redwood data curation team.
                            </span>
                        </div>
                        <div className={classes.break}>
                            <span>
                                After your study registration is approved, you will be able to submit data files and documents to your study
                                through the Data Submission workflow.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'study-registration-2',
                header: 'Can I edit study metadata in the Redwood?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                After registration, you cannot edit Redwood study metadata directly in the system. To edit your metadata,
                                please contact{' '}
                            </span>
                            <a href="mailto:example@example.com">{` example@example.com`}</a>.
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        title: 'Submitting Data in the Redwood',
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
                header: 'I have a study stored in the Redwood, but one of my study participants has withdrawn their consent. How do I remove the participant from the study data?',
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
