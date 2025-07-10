import figure1PublicData from '../../images/PublicData/figure1PublicData.png';
import figure2PublicData from '../../images/PublicData/figure2PublicData.png';
import figure3PublicData from '../../images/PublicData/figure3PublicData.png';
import figure4PublicData from '../../images/PublicData/figure4PublicData.png';
import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';

export const publicData = {
    mainTitle: 'Public Data',
    state: 'publicData',
    sections: [
        {
            title: 'General',
            id: 'general-pd',
            state: 'publicData',
            content: (
                <>
                    <p>
                        The Public Data page contains synthetic data files. Prepared using mock data, these files allow you to test
                        analytics workbench offerings and capabilities before using real research data.
                    </p>
                    <p>
                        You must log into the Data Hub to access the Public Data page. After logging in, you will see a “Data Access” dropdown in the
                        navigation bar. You can click “Public Data” to go to the Public Data page.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure1PublicData} alt="Figure 1: Public Data Link in the Navigation Bar" />
                    </div>
                    <figcaption className={classes.figureCaption}>
                        Figure 1: "Public Data" Link in the Navigation Bar
                    </figcaption>
                    <p>Once on the “Public Data” tab, you can:</p>
                    <ul>
                        <li className={classes.tutorialListItem}><a href="#download-files-pd">Download public data files</a></li>
                        <li className={classes.tutorialListItem}><a href="#create-launch-workbench">Create or launch a workbench</a></li>
                        <li className={classes.tutorialListItem}><a href="#transition-files-workbench">Transfer files to your workbench</a></li>
                    </ul>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Download Files',
            id: 'download-files-pd',
            state: 'publicData',
            content: (
                <>
                    <p>
                        To download files, select one or multiple files using one of following techniques:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>Option 1 – Select an Individual File:</i> To select a single file, click the checkbox icon next to the file
                            name.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Option 2 – Select Multiple Files:</i> To select multiple files, click the checkbox next to the files.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Option 3 – Select All Files:</i> Click “Select All” to select all files within the table.
                        </li>
                    </ul>
                    <p>
                        After selecting files, click “Zip & Download,” and the files will appear in your browser’s download center as a zip
                        file to save or open. The “Zip & Download” button will be greyed out until you select a file.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure2PublicData} alt="Figure 2: Selection Functionality and Zip & Download Link" />
                    </div>
                    <figcaption className={classes.figureCaption}>
                        Figure 2: Selection Functionality and "Zip & Download" Link
                    </figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Create and Launch Workbench',
            id: 'create-launch-workbench',
            state: 'publicData',
            content: (
                <>
                    <p>
                        To launch the workbench, you can press the “Create Workbench” button on the Public Data page, which will automatically route
                        you to the workbench application. After creating a workbench, you can go back to your workbench instance by pressing
                        the “Launch Workbench” button (Figure 3).
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure3PublicData} alt="Figure 3: Launch Workbench Button" />
                    </div>
                    <figcaption className={classes.figureCaption}>
                        Figure 3: Launch Workbench Button
                    </figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Transition Files to Workbench',
            id: 'transition-files-workbench',
            state: 'publicData',
            content: (
                <>
                    <p>
                        After creating a workbench instance, you can transfer files to the workbench. To add files to a
                        workbench, you can first select the file or files you want to transfer. Then, press the “Add to Workbench” button
                        to transfer them to your workbench instance (Figure 4).
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure4PublicData} alt="Figure 4: Add to Workbench Button" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 4: "Add to Workbench" Button</figcaption>
                </>
            ),
            subSections: [],
        },
    ],
};
