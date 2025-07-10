import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';
import figure1DataWrangler from '../../images/DataWrangler/figure1DataWrangler.png';
import figure2DataWrangler from '../../images/DataWrangler/figure2DataWrangler.png';

export const dataWrangler = {
    mainTitle: 'Data Wrangler',
    state: 'dataWrangler',
    sections: [
        {
            title: 'General',
            id: 'general-data-wrangler',
            state: 'dataWrangler',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        By default, Data Wrangler uses the m5.4xlarge (16 vCPU, 64 GiB memory) instance type. To request a difference
                        compute instance, please see the Change environment section. If a Data Wrangler instance has been provisioned, a
                        Data Wrangler flow can be created using the following steps:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            From the Workbench Home page, select “Canvas” from “Applications” in the left panel.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Click “Run Canvas” to start the instance. This may take up to 8 minutes.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Once the instance status has changed to “Running”, click the “Open Canvas” button to launch Canvas in a new tab.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Select the “Data Wrangler” application in the sidebar of Canvas applications and click “Create a data flow”
                            which will open a dialog to rename the data flow for the analysis.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Click import data (Figure 1) and select the data file type (i.e., Tabular or Image). Select one of the data
                            source options from the dropdown, or upload files directly. See <a target="_blank" rel="noopener noreferrer" href="https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-import.html">Import</a> to learn
                            more about AWS data import options.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Data Wrangler can now be used to add transforms, analyze, and visualize your data. To learn more,
                            see <a target="_blank" rel="noopener noreferrer" href="https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html">Transform Data</a> and {' '}
                            <a target="_blank" rel="noopener noreferrer" href="https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-analyses.html">Analyze and Visualize.</a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            To export a data flow, click Export from the data flow page. To learn more about exporting data transformations
                            to other platforms, see <a target="_blank" rel="noopener noreferrer" href="https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-data-export.html">Export</a>.
                        </li>
                    </ol>
                    <div className={classes.tutorialImg}>
                        <Image src={figure1DataWrangler} alt="Figure 1: Import Data to Data Wrangler Flow" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 1: Import Data to Data Wrangler Flow</figcaption>
                    <p className={classes.tutorialListItem}>
                        To stop running Canvas, click “Stop Canvas” on the Canvas homepage (Figure 2). Click the checkbox and the “Stop
                        Canvas” button that appears to confirm shutdown. Be sure to save all work and data flows prior to shutdown.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure2DataWrangler} alt="Figure 2: Stop Canvas Application" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 2: Stop Canvas Application</figcaption>
                </>
            ),
            subSections: [],
        },
    ],
};
