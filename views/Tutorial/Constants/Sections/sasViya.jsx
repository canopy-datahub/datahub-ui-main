import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';
import figure1SasViya from '../../images/SasViya/figure1SasViya.jpg';

export const sasViya = {
    mainTitle: 'SAS Viya',
    state: 'sasViya',
    sections: [
        {
            title: 'General',
            id: 'general-sas',
            state: 'sasViya',
            content: (
                <>
                    <div className={classes.tutorialImg}>
                        <Image src={figure1SasViya} alt="Figure 1: SAS Interface" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 1: SAS Interface</figcaption>
                    <p className={classes.tutorialListItem}>
                        From the My Approved Data or Public Data page, a “Launch SAS” button will appear if a license has been granted. To
                        launch the SAS platform, click “Launch SAS.”
                    </p>
                    <p className={classes.tutorialListItem}>To start a new program:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            From the main menu, click “New”, and “SAS Program”. A new blank program will open in the work area.
                        </li>
                    </ol>
                    <p className={classes.tutorialListItem}>To save a SAS program:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>Click the “Save” icon on the work area toolbar.</li>
                        <li className={classes.tutorialListItem}>Select the location where files will be saved.</li>
                        <li className={classes.tutorialListItem}>Enter the name of the program.</li>
                        <li className={classes.tutorialListItem}>Click "Save".</li>
                    </ol>
                    <p className={classes.tutorialListItem}>To open a SAS program:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>Click the "Open" icon on the main menu bar.</li>
                        <li className={classes.tutorialListItem}>Find the location of the program in the left panel.</li>
                        <li className={classes.tutorialListItem}>Select the SAS program to open in the right panel.</li>
                        <li className={classes.tutorialListItem}>Click “Open” and the program will appear in the work area. </li>
                    </ol>
                    <p className={classes.tutorialListItem}>
                        To run just a portion of a SAS program, highlight the portion to run. To run the entire SAS program, no code needs
                        to be highlighted:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>Click the "Run" icon on the work area toolbar.</li>
                        <li className={classes.tutorialListItem}>Open the “Log” tab to confirm the program ran correctly.</li>
                    </ol>
                </>
            ),
            subSections: [],
        },
    ],
};
