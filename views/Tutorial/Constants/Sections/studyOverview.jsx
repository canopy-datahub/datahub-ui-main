import figure1StudyOverview from '../../images/StudyOverview/figure1StudyOverview.png';
import figure2StudyOverview from '../../images/StudyOverview/figure2StudyOverview.png';
import figure3StudyOverview from '../../images/StudyOverview/figure3StudyOverview.png';
import figure4StudyOverview from '../../images/StudyOverview/figure4StudyOverview.png';
import figure5StudyOverview from '../../images/StudyOverview/figure5StudyOverview.png';
import figure6StudyOverview from '../../images/StudyOverview/figure6StudyOverview.png';
import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';

export const studyOverview = {
    mainTitle: 'Study Overview',
    state: 'studyOverview',
    sections: [
        {
            title: 'General',
            id: 'general-so',
            state: 'studyOverview',
            content: (
                <>
                    <p>
                        Each study in the system has an overview page, which contains key documents, metadata, and variable and file
                        information. To reach the Study Overview page, you must locate a study in the Study Explorer or Variables Catalog
                        and click on the “Study Name.”
                    </p>
                    <p>On the Study Overview page, you can:</p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <a href="#view-study-info">View study information</a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <a href="#view-variable-info">View variable information</a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <a href="#request-access-so">Learn how to request study access</a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <a href="#download-documents-so">Download publicly available documents</a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <a href="#learn-about-so">Learn about data files and download resources</a>
                        </li>
                    </ul>
                </>
            ),
            subSections: [],
        },
        {
            title: 'View Study Information',
            id: 'view-study-info',
            state: 'studyOverview',
            content: (
                <>
                    <p>
                        Study Overview contains comprehensive study information, it begins with the study name, and below that, a Study
                        Information section lists several attributes to help you gain a high-level understanding of the study.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure1StudyOverview} alt="Figure 1: Study Overview Page" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 1: Overview Page</figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'View Variable Information',
            id: 'view-variable-info',
            state: 'studyOverview',
            content: (
                <>
                    <p>
                        The Variable Information section provides the total number of unique variables across all data files for the study.
                        It also provides a list of all variable names and labels with a link to the specific Variable Overview page if
                        available so users can easily access detailed variable information.
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Learn How to Request Study Access',
            id: 'request-access-so',
            state: 'studyOverview',
            content: (
                <>
                    <p>
                        Request study data access, including harmonized and non-harmonized data file access in dbGaP. Click the{' '}
                        <i>How to Request Access</i> button in the top right of the Data Files section to view an expandable data access
                        checklist. Navigate to the{' '}
                        <a target="_blank" rel="noopener noreferrer" href="/tutorial?tutorial=requestingDataAccess">
                            Request Data Access
                        </a>{' '}
                        section of the tutorial to learn more.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure2StudyOverview} alt="Figure 2: How to Request Data Access Button" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 2: How to Request Data Access Button</figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Download Documents',
            id: 'download-documents-so',
            state: 'studyOverview',
            content: (
                <>
                    <p>
                        The Study Overview page contains downloadable, publicly available documents. There are two ways to download
                        documents (Figure 3):
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>Option 1 - Download Individual Documents:</i> To download a single document, press the download icon in the
                            download column on the documents table. The document should appear in the browser’s download center for you to
                            open or save.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Option 2 - Download All Documents:</i> To download all documents, press “Download All” in the upper right of
                            the documents section. A zip file with all study documents will appear in the browser’s download center for you
                            to open or save.
                        </li>
                    </ul>
                    <div className={classes.tutorialImg}>
                        <Image src={figure3StudyOverview} alt="Figure 3: Download Functionality in Documents Table" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 3: Download Functionality in Documents Table</figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Learn About Data Files and Download Resources',
            id: 'learn-about-so',
            state: 'studyOverview',
            content: (
                <>
                    <p>
                        The Data Files section has downloadable metadata and data dictionary files and viewable variable information to help
                        you learn more about a study and its data, before requesting access.
                    </p>
                    <p>
                        In the Data Files table, data and supporting files are organized by bundles. Specifically, each bundle contains a
                        metadata and data dictionary file, aligned to a harmonized or non-harmonized data file.
                    </p>
                    <p>
                        While you cannot download original or transformed files from the Study Overview Page, you can download associated
                        metadata and data dictionary files. To do this, click the download icon in either the Metadata or Dictionary columns
                        (Figure 4). The file will show up in the browser’s download center for you to open or to save.
                    </p>
                    <div className={classes.tipContainer}>
                        <i className={classes.tipBox}>
                            <b>Tip:</b> For studies with lots of data files, use sorting to locate a file more quickly. Click a column
                            header once to sort in ascending order and twice for descending.
                        </i>
                    </div>
                    <div className={classes.tutorialImg}>
                        <Image src={figure4StudyOverview} alt="Figure 4: Data Files Table" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 4: Data Files Table</figcaption>
                    <br />
                    <p>
                        You can view metadata files in an easy-to-read, interactive tool called the Metadata Viewer, powered by CEDAR. To
                        access the Metadata Viewer, click on the eye icon in the Data Files table. This will open a window that lists
                        several different metadata attributes in the file. To the right of each label are help tips, which contain metadata
                        attribute descriptions. Additionally, you can expand accordions to see more metadata attribute information.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure5StudyOverview} alt="Figure 5: Metadata Viewer" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 5: Metadata Viewer</figcaption>
                    <br />
                    <p>
                        You can also view information on data file-based variables contained by clicking the carrot in the “Number of
                        Variables” column (Figure 6). This will open a table, letting you find the data file variables.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure6StudyOverview} alt="Figure 6: Variables Information in the Data Files Table" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 6: Variables Information in the Data Files Table</figcaption>
                </>
            ),
            subSections: [],
        },
    ],
};
