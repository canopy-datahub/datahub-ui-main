import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';
import figure1RequestAccess from '../../images/RequestDataAccess/figure1RequestAccess.png';
import figure2RequestAccess from '../../images/RequestDataAccess/figure2RequestAccess.png';
import figure3RequestAccess from '../../images/RequestDataAccess/figure3RequestAccess.png';
import figure4RequestAccess from '../../images/RequestDataAccess/figure4RequestAccess.png';
import figure5RequestAccess from '../../images/RequestDataAccess/figure5RequestAccess.png';
import figure6RequestAccess from '../../images/RequestDataAccess/figure6RequestAccess.png';
import figure7RequestAccess from '../../images/RequestDataAccess/figure7RequestAccess.png';

export const requestingDataAccess = {
    mainTitle: 'Request Data Access',
    state: 'requestingDataAccess',
    sections: [
        {
            title: 'Requirements',
            id: 'requirements-ra',
            state: 'requestingDataAccess',
            content: (
                <>
                    <div className={classes.tutorialImg}>
                        <Image src={figure1RequestAccess} alt="Figure 1: Request Data Access Flow Chart" />
                    </div>
                    <p className={classes.tutorialListItem}>
                        The RADx Data Hub requires eRA Commons authentication and dbGaP authorization to access controlled data. Data
                        requestors must have an eRA Commons (or NIH login) account with PI status to submit a request. Non-PIs must have a
                        PI submit a request in dbGaP on their behalf. Once the PI is granted data access, the PI can grant team members
                        access by logging into dbGaP and adding them as a downloader.
                    </p>
                    <p className={classes.tutorialListItem}>Important Notes:</p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            Your eRA* or NIH Login used for dbGaP <b>must match</b> your RADx Data Hub login
                            <ul>
                                <li>
                                    <i>Users should use an eRA account, if possible</i>
                                </li>
                            </ul>
                        </li>
                        <li>
                            Non-PIs must have an{' '}
                            <a target="_blank" rel="noopener noreferrer" href="">
                                eRA account
                            </a>{' '}
                            to be added as a data downloader
                        </li>
                    </ul>
                    <p className={classes.tutorialListItem}>Resources:</p>
                    <ul>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="">
                                eRA Commonds Frequently Asked Questions (FAQs)
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="">
                                eRA Help and Tutorials
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="">
                                NIH / eRA Helpdesk / Ticketing System
                            </a>
                        </li>
                    </ul>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Requesting Access to Studies',
            id: 'requesting-ra',
            state: 'requestingDataAccess',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        To gain study data access, including harmonized and non-harmonized data files, PIs must request{' '}
                        <a target="_blank" rel="noopener noreferrer" href="">
                            dbGaP
                        </a>{' '}
                        access. To do so:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Log into the RADx Data Hub using your <b>dbGaP eRA or NIH Login.</b>
                        </li>
                        <li className={classes.tutorialListItem}>
                            Locate a study through the <b>Study Explorer</b>, and click on the <b>Study Name</b> to view the Study Overview
                            page.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure2RequestAccess} alt="Figure 2: Study Name in Study Explorer" />
                        </div>
                        <i>
                            Note: To request access to more than one study, record the <b>dbGaP Study Accession</b> of each study. Later,
                            you will search for and add the <b>dbGaP Study Accession IDs</b> of interest in dbGaP.
                        </i>
                        <br />
                        <li className={classes.tutorialListItem}>
                            Click on the <b>dbGaP Study Accession</b> link in the Study Info box on the Study Overview page. This will bring
                            you to the dbGaP Study Overview page.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure3RequestAccess} alt="Figure 3: dbGaP Study Accession in Study Overview" />
                        </div>
                        <br />
                        <li className={classes.tutorialListItem}>
                            In dbGaP, submit a <b>data access request</b> for the study(ies). Use the Important Links and Information
                            section in dbGaP for guidance to request study access.
                        </li>
                        <i>
                            Note: To request access to more than one study, add datasets by navigating to the “Choose Datasets” tab of the
                            Project Request, and type in the <b>dbGaP Study Accession IDs</b> for each study individually.
                        </i>
                        <div className={classes.tutorialImg}>
                            <Image src={figure4RequestAccess} alt="Figure 4: dbGaP Request Page" />
                        </div>
                        <br />
                        <li className={classes.tutorialListItem}>
                            Once you receive a study access confirmation email from dbGaP, return to the RADx Data Hub. Login using the{' '}
                            <b>same eRA or NIH Login as for dbGaP</b>, and navigate to the <b>My Approved Data</b> tab.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure5RequestAccess} alt="Figure 5: My Approved Data Tab" />
                        </div>
                        <br />
                    </ol>
                    <p className={classes.tutorialListItem}>Resources:</p>
                    <ul>
                        <li>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href=""
                            >
                                Apply for Controlled Access Data Video
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="">
                                Frequently Asked Questions (FAQs)
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href=""
                            >
                                Helpdesk
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href=""
                            >
                                Tips
                            </a>
                        </li>
                    </ul>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Adding Downloaders',
            id: 'downloaders-ra',
            state: 'requestingDataAccess',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        Downloaders must meet the following requirements{' '}
                        <b>
                            <i>prior</i>
                        </b>{' '}
                        to the PI adding them as a downloader.
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>Have an eRA Commons account</li>
                        <li className={classes.tutorialListItem}>Have logged into dbGaP at least once</li>
                    </ul>
                    <p className={classes.tutorialListItem}>
                        <b>After you are granted data access</b>, the PI (data request submitter) must log back into dbGaP and:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Navigate to the <b>Downloaders</b> tab under Authorized Access
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure6RequestAccess} alt="Figure 6: dbGaP Downloaders Page" />
                        </div>
                        <br />
                        <li className={classes.tutorialListItem}>Use the First and Last name boxes to search for the downloader</li>
                        <li className={classes.tutorialListItem}>
                            Select a team member's name, and add them to the project using <b>Set Downloader</b>
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure7RequestAccess} alt="Figure 7: Set Downloader in dbGaP" />
                        </div>
                        <br />
                    </ol>
                    <p className={classes.tutorialListItem}>
                        After the PI adds a team member as a downloader, the team member will receive a welcome email from dbGaP. Then, the
                        team member can login into the RADx Data Hub <b>using the same dbGaP eRA account as in dbGaP</b>, and navigate to
                        the <b>My Approved Data</b> tab.
                    </p>
                    <p className={classes.tutorialListItem}>Resources:</p>
                    <ul>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="">
                                Assign Downloaders for dbGaP Data Video
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="https://radxdatahub.nih.gov/support">
                                RADx Data Hub Support Request
                            </a>
                        </li>
                    </ul>
                </>
            ),
            subSections: [],
        },
    ],
};
