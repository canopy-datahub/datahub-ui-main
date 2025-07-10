import figure1ApprovedData from '../../images/ApprovedData/figure1ApprovedData.png';
import figure2ApprovedData from '../../images/ApprovedData/figure2ApprovedData.png';
import figure3ApprovedData from '../../images/ApprovedData/figure3ApprovedData.png';
import figure4ApprovedData from '../../images/ApprovedData/figure4ApprovedData.png';
import figure5ApprovedData from '../../images/ApprovedData/figure5ApprovedData.png';
import figure6ApprovedData from '../../images/ApprovedData/figure6ApprovedData.png';
import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';

export const approvedData = {
    mainTitle: 'Approved Data',
    state: 'approvedData',
    sections: [
        {
            title: 'General',
            id: 'my-approved-data',
            state: 'approvedData',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        My Approved Data allows you to access data files based on your Database of Genotypes and Phenotypes (dbGaP) approvals. This
                        page will group files into one table per study. Within each study table, the files are organized by bundles, which is a set of files
                        including a data file, metadata file, and data dictionary (along with any SAS file equivalents if available).
                    </p>
                    <p className={classes.tutorialListItem}>After accessing My Approved Data, you can:</p>
                    <ul>
                        <li className={classes.tutorialListItem}><a href="#download-files-ad">Download approved data files</a></li>
                        <li className={classes.tutorialListItem}><a href="#apply-for-add-ons">Apply for Workbench add-ons</a></li>
                        <li className={classes.tutorialListItem}>
                            <a href="#create-workbench">
                                Create a workbench instance with one of the available tools (JupyterLab, Data Wrangler, or SAS)
                            </a>
                        </li>
                        <li className={classes.tutorialListItem}><a href="#add-files-workbench">Add files to your workbench</a></li>
                    </ul>
                    <p>
                        <i className={classes.tutorialListItem}>
                            Note: My Approved Data will be empty until you are approved to access to at least one RADx Data Hub study in dbGaP.
                        </i>
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure1ApprovedData} alt="Figure 1: My Approved Data Link in Navigation Bar" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 1: My Approved Data Link in Navigation Bar</figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Download Files',
            id: 'download-files-ad',
            state: 'approvedData',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        To download files, select them using one of three techniques:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>Option 1 - Select a Bundle</i>: To select a bundle, check the box next to a harmonized or non-harmonized data
                            file. This will select the high-level data file and its supporting files (i.e., metadata and data dictionary files).
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Option 2 - Select an Individual File</i>: This process varies for supporting files (e.g., metadata and data dictionary files) and
                            data files. To select a metadata or data dictionary file, check the box next to the file name. To select an individual harmonized or
                            non-harmonized file, first check the box next to the file name. This will select the entire
                            bundle. Then, deselect the metadata and data dictionary files.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Option 2 - Select All Files</i>: Click the “Select All” button. This will select all study table files.
                        </li>
                    </ul>
                    <p className={classes.tutorialListItem}>
                        After selecting the desired files, you can click “Zip & Download,” and the files will
                        appear in your browser’s download center as a zip file, which you can save or open.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure2ApprovedData} alt="Figure 2: Selection Functionality and Zip & Download Button" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 2: Selection Functionality and "Zip &Download" Button</figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Apply for Add-ons',
            id: 'apply-for-add-ons',
            state: 'approvedData',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        After registering, you will automatically have the default Workbench access, which includes JupyterLab and RStudio but
                        does not include Data Wrangler or SAS Viya. To access those tools, you must apply for a Workbench Add-on. To apply:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Press “Apply for Add-on” (Figure 3). The system will direct you to a separate page displaying the request form.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure3ApprovedData} alt="Figure 3: Apply for Add-on Button" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 3: "Apply for Add-on" Button</figcaption>
                        <li className={classes.tutorialListItem}>
                            Fill out the required fields.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure4ApprovedData} alt="Figure 4: Add-on Application Form" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 4: Add-on Application Form</figcaption>
                        <li className={classes.tutorialListItem}>
                            Download and read the Terms of Service. You should type your name in the “Agree to the Terms of Service” field if you agree.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Press “Submit.” The RADx Data Hub team will review the request and email you if you are approved for a Workbench Add-on.
                        </li>
                    </ol>
                    <i>
                        Note: There are a limited number of licenses available for SAS and Data Wrangler. The licenses are distributed on a
                        first-come, first-serve basis. You may only hold one license at a time.
                    </i>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Create a Workbench',
            id: 'create-workbench',
            state: 'approvedData',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        To create a workbench, press “Create Workbench.” In the future, press “Launch Workbench” to access an existing workbench.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure5ApprovedData} alt="Figure 5: Create Workbench Button" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 5: "Create Workbench" Button</figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Add Files to Workbench',
            id: 'add-files-workbench',
            state: 'approvedData',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        To add approved files to a workbench, select the file or files to transfer. Then, click “Add to Workbench” in the top right of the study table (Figure 6).
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure6ApprovedData} alt="Figure 6: Add to Workbench Button" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 6: Add to Workbench Button</figcaption>
                </>
            ),
            subSections: [],
        },
    ],
};
