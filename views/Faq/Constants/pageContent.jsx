import classes from '../Faq.module.scss';
import { GET_RESOURCE_CENTER_BUCKET } from '../../../constants/apiRoutes';
import { downloadLink } from '../../../lib/pageHelpers/downloadLink';
import { sendGAEvent } from '@next/third-parties/google';

export const contentArray = (baseUrl, restGet) => [
    {
        title: 'General',
        id: 'general',
        content: [
            {
                id: 'general-1',
                header: 'What is the RADx Data Hub?',
                body: (
                    <>
                        <span>
                            The NIH Rapid Acceleration of Diagnostics (RADx) Data Hub is a centralized, cloud-enabled data repository. It
                            provides access to analytic tools and de-identified RADx COVID-19 data for researchers to discover, access, and
                            analyze, attaining new insights (for everyone’s benefit). The RADx Data Hub supports scientific efforts to
                            better understand COVID-19 and underserved/vulnerable population morbidity and mortality disparities.
                        </span>
                    </>
                ),
            },
            {
                id: 'general-2',
                header: 'Who can submit studies and data to the RADx Data Hub?',
                body: (
                    <>
                        <span>
                            The RADx Data Hub accepts RADx programs’ (RADx-UP, RADx-rad, RADx-Tech, and RADx-DHT) data. If you are not
                            affiliated with these programs but would like to submit studies or data, please contact us.
                        </span>
                        <span>.</span>
                    </>
                ),
            },
            {
                id: 'general-3',
                header: 'Do I need to create a RADx Data Hub account?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                You do not need to create a RADx Data Hub account to browse study information and view public documents
                                (e.g., metadata files and data dictionaries).
                            </span>
                        </div>
                        <div style={{ marginBottom: '35px' }}>
                            <span>
                                To gain study-level access to original and transformed data files, you will need to create an account for
                                the RADx Data Hub using your account
                            </span>
                            <span>
                                Once you have registered, sign into dbGAP with the same account and request access to a study. After you’ve
                                been granted access, the study and its associated data files will appear in the ‘My Approved Data’ tab where
                                you can download them or transfer them to the ‘Analytics Workbench’ for further analysis.
                            </span>
                        </div>
                        <div className={classes.break}>
                            <span>For more in-depth instructions on how to create an account for the RADx Data Hub, see the tutorial.</span>
                        </div>
                        <div className={classes.break}>
                            <span>To learn how to create an account refer to the tutorial</span>
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
                            <span>The Hub does not manage passwords, but instead, uses an external system</span>
                        </div>
                        <div className={classes.break}>
                            <span>
                                The other Login requires a card as opposed to a password. If you are having trouble with your
                                card, visit the tutorial.
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
                            <span>Yes, we will deactivate your account if you violate the User Code of Conduct.</span>
                        </div>
                        <div className={classes.break}>
                            <span>To deactivate your account, please contact the Hub Administrator at </span>
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
                            <span>There are three ways to get in contact with the Support Team: </span>
                            <ul>
                                <li>Login and use the ‘Contact Us’ link in the top navigation bar </li>
                                <li>Login and use the ‘Contact’ widget on the side of the Home screen</li>
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
                                The Hub does not require an account to search studies and access publicly available information.{' '}
                            </span>
                            <span>If you are onboarding a new team member, they will need an account</span>
                            <span>
                                to request study-level access to data files in dbGaP. Once they have an account, they will need to register
                                for the RADx Data Hub using the same account they use for dbGaP.{' '}
                            </span>
                        </div>
                        <div className={classes.break}>
                            <span>If you are offboarding a team member with an account, contact the support team</span>
                        </div>
                        <div className={classes.break}>
                            <span>If you are offboarding a team member with another account, ensure they follow the rules</span>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        title: 'Data Organization in the RADx Data Hub',
        id: 'data-organization',
        content: [
            {
                id: 'data-organization-1',
                header: 'What kind of data are in the RADx Data Hub?',
                body: (
                    <>
                        <div>
                            <span>The Hub is a centralized repository for in-progress and complete studies</span>
                            <span>
                                research study data. It also hosts RADx-DHT data information and links to the RAPIDS platform. Research data
                                includes harmonized demographic and COVID-19 information (see Tier 1 CDE), as well as EHR, COVID testing,
                                and digital health data and beyond.
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
                        <div>
                            <span>
                                The Hub Global Codebook is the Common Data Elements (CDEs) data dictionary. It
                                contains precise mappings that organize (C)DCC-specific Data Elements into 12 unique, required CDE
                                categories. Download the Global Codebook{' '}
                            </span>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        title: 'Requesting Access to Data within the RADx Data Hub',
        id: 'requesting-access',
        content: [
            {
                id: 'requesting-access-1',
                header: 'How do I find original data and transformed data files as well as data dictionaries, and metadata files?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                Metadata files and data dictionary files are publicly available, so you can access them without logging in.
                                You can find these files by navigating to the Data Files section of the Study Overview page for a study.
                            </span>
                        </div>
                        <div className={classes.break}>
                            <span>
                                Harmonized and non-harmonized data files require study-level access from dbGaP. You must first request
                                access to the study in dbGaP, and then it will appear in the ‘My Approved Data’ tab.
                            </span>
                        </div>
                        <div>
                            <span>
                                For more on finding these files, please view the <a href="/tutorial">Tutorial</a> pages on these
                                topics:
                            </span>
                            <ul>
                                <li>
                                    <a href="/tutorial?tutorial=studyExplorer#view-studies-se">Searching for Studies</a>
                                </li>
                                <li>
                                    <a href="/tutorial?tutorial=studyOverview#view-study-info">Viewing the Study Overview page</a>
                                </li>
                                <li>
                                    <a href="/tutorial?tutorial=approvedData#download-files-ad">Accessing ‘My Approved Data’</a>
                                </li>
                            </ul>
                        </div>
                    </>
                ),
            },
            {
                id: 'requesting-access-2',
                header: 'I want to use a RADx Data Hub study, but the data are not yet complete. How do I find out when the rest of the data will be available?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                First, review the ‘The RADx Content Updates’ section toward the bottom of the ‘Home’ page. This section
                                contains links to studies that have recently received updates, and is updated every 90 days with information
                                on:
                            </span>
                            <ul>
                                <li>Newly registered studies</li>
                                <li>Studies with updated files</li>
                                <li>Studies with new files</li>
                            </ul>
                        </div>
                        <div>
                            <span>
                                If you can’t find the study you are looking for, use the ‘Contact Us’ button in the top navigation to ask
                                our team about data availability.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'requesting-access-3',
                header: `Why do I need to apply for access to studies through dbGaP in the RADx Data Hub?`,
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                The database of Genotypes and Phenotypes (dbGaP), archives and distributes study results and provides
                                mechanisms to control personal health-related study data access. The RADx Data Hub relies on these
                                mechanisms to protect human subjects, supporting data use agreement compliance and granting access
                                exclusively to trained researchers with Data Access Committee-approved research plans.
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
                                To request access to the data, click on the dbGaP link located under the ‘Study Name’ on the ‘Study
                                Overview’ page. For more detailed instructions, review tutorial.
                            </span>
                        </div>
                        <div className={classes.break}>
                            <span>
                                Note: After you obtain dbGaP approval to access the RADx data, use the same eRA or NIH account used in dbGaP
                                when logging into the RADx Data Hub to access the approved data.
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
                                My Approved Data will only contain the current data file version. To receive an older version, please
                                contact{' '}
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
                                First, ensure that you are logged into the RADx Data Hub using the same NIH Login or eRA account you used
                                when requesting access to the study in dbGaP and visit the ‘My Approved Data’ page. If you still don’t see
                                what you are looking for, reach out to
                            </span>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        title: 'Data Use and Compliance in the RADx Data Hub',
        id: 'data-use-and-compliance',
        content: [
            {
                id: 'data-use-and-compliance-1',
                header: 'What can I use to analyze data?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                Researchers can use the RADx Data Hub in-browser analytics tools (Jupyter Notebooks or SAS Viya) or download
                                the data into a CSV file for analysis.
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
                                Yes, you can download data from either Sagemaker, SAS Viya, or your My Approved Data page. Please see the
                                Workbench User Tutorial for more details.
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
                                Login and use the navigation bar’s ‘Contact Us’ link or the ‘Contact’ home page widget to submit ‘analytics’
                                questions, or email us at
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
                                Login and use the navigation bar’s ‘Contact Us’ link or the ‘Contact’ home page widget to submit ‘analytics’
                                questions, or email us at
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'data-use-and-compliance-5',
                header: 'How do I request a SAS or Data Wrangler license?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>Please follow these 4 steps:</span>
                            <ol>
                                <li>Go to ‘My Approved Data’ in the RADx Data Hub.</li>
                                <li>Select ‘Apply for Add-ons' in the top-right.</li>
                                <li>Fill out the required fields.</li>
                                <li>Submit your request.</li>
                            </ol>
                        </div>
                    </>
                ),
            },
            {
                id: 'data-use-and-compliance-6',
                header: 'Are there restrictions or limitations to the use of data that are available in the RADx Data Hub?',
                body: (
                    <>
                        <div className={classes.break}>
                            RADx data are subject to the Data Use Certification Agreement you signed when you requested access to a study in
                            dbGaP.
                        </div>
                    </>
                ),
            },
            {
                id: 'data-use-and-compliance-7',
                header: 'How long can I use the data I obtained from the RADx Data Hub?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                The RADx Data Hub relies on DbGaP to manage access to studies and their associated data files. Requested
                                dataset(s) access spans one (1) year with the option to renew for an additional year. You can renew your
                                access at the end of each calendar year. To learn how to renew your access, review the dbGaP Tutorial
                            </span>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        title: 'Submitting Data in the RADx Data Hub',
        id: 'submit-data',
        content: [
            {
                id: 'submit-data-1',
                header: 'I have new datasets/documents to add to my study. How can I add these new items to my study?',
                body: (
                    <>
                        <span>
                            Click “Data Submission” in the navigation bar’s Data Submitter dropdown. This will bring you to the Data
                            Submitter Dashboard. Once there, click “+New Submission,” and follow the prompts.
                        </span>
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
                                To upload a new version, go to the Data Submission dashboard and start a new submission. On the step one, be
                                sure to upload a file with the exact same name as the one you plan on replacing and continue through the
                                prompts in the workflow. In the Review and Submit step, you will be able to verify whether the upload will
                                create a new version of your files. If all is correct, press “Submit,” and the files will be sent to our
                                data curation team for review. If there are no errors, the new files will replace your previous files in the
                                system.
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'submit-data-3',
                header: 'Can I edit study metadata in the RADx Data Hub?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>
                                After registration, you cannot edit RADx Data Hub study metadata directly in the system. To edit your
                                metadata, please contact{' '}
                            </span>
                        </div>
                    </>
                ),
            },
            {
                id: 'submit-data-4',
                header: 'I have a study stored in the RADx Data Hub, but one of my study participants has withdrawn their consent. How do I remove the participant from the study data?',
                body: (
                    <>
                        <div className={classes.break}>
                            <span>If a participant withdraws their consent, contact </span>
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
