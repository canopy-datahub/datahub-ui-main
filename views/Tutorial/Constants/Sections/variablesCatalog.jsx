import figure1VariablesCatalog from '../../images/VariablesCatalog/figure1VariablesCatalog.png';
import figure2VariablesCatalog from '../../images/VariablesCatalog/figure2VariablesCatalog.png';
import figure3VariablesCatalog from '../../images/VariablesCatalog/figure3VariablesCatalog.png';
import figure4VariablesCatalog from '../../images/VariablesCatalog/figure4VariablesCatalog.png';
import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';

export const variablesCatalog = {
    mainTitle: 'Variables Catalog',
    state: 'variablesCatalog',
    sections: [
        {
            title: 'General',
            id: 'general-vc',
            state: 'variablesCatalog',
            content: (
                <>
                    <p>
                        The Variables Catalog is publicly available and displays variables for each study data file as a comma-separated
                        list. With the Variables Catalog, you can quickly understand a study’s variables to make a more informed decision
                        when requesting study data access. To reach the Variables Catalog, click the link in the top navigation bar.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure1VariablesCatalog} alt="Figure 1: Variable Catalog Link in the Navigation Bar" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 1: Variable Catalog Link in the Navigation Bar</figcaption>
                    <p>Once on the Variable Catalog you can:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            <a href="#view-variable-info">Find and view variable information</a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <a href="#navigate-to-study-overview">
                                Navigate to the RADx and Database of Genotypes and Phenotypes (dbGaP) Study Overview Pages
                            </a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <a href="#download-reports-vc">Download catalog content as a CSV file</a>
                        </li>
                    </ol>
                </>
            ),
            subSections: [],
        },
        {
            title: 'View Variable Information',
            id: 'view-variable-info',
            state: 'variablesCatalog',
            content: (
                <>
                    <p>View variable information in the Variable Catalog (Figure 2) in two ways:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            <i>All Variables</i> lists out all data file variables in a comma-separated list
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>RADx Core Variables</i> lists RADx Core variables and lables in a tabular format
                        </li>
                    </ol>
                    <div className={classes.tutorialImg}>
                        <Image src={figure2VariablesCatalog} alt="Figure 2: Variables Catalog Toggle" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 2: Variables Catalog Toggle</figcaption>
                    <p className={classes.tutorialListItem}>
                        To switch between views in the table, select the radio button next to the view you are interested in. After
                        selecting an appropriate view, search for variables, studies, and more using your browser’s “Find” feature (CTRL/CMD
                        + F).
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Navigate to RADx and dbGaP Study Overview Pages',
            id: 'navigate-to-study-overview',
            state: 'variablesCatalog',
            content: (
                <>
                    <p>
                        In the Variables Catalog, access the RADx Data Hub and dbGaP Study Overview pages by clicking the following links:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            <i>The Study Name</i> links to the RADx Data Hub Study Overview page, where you can gain a better understanding
                            of study metadata.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>The dbGaP ID (PHS ID)</i> leads to the dbGaP Study Overview page, where you can request study-level access
                        </li>
                    </ol>
                    <div className={classes.tutorialImg}>
                        <Image src={figure3VariablesCatalog} alt="Figure 3: Links to the RADx Data Hub and dbGaP Study Overview Pages" />
                    </div>
                    <figcaption className={classes.figureCaption}>
                        Figure 3: Links to the RADx Data Hub and dbGaP Study Overview Pages
                    </figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Download Report',
            id: 'download-reports-vc',
            state: 'variablesCatalog',
            content: (
                <>
                    <p>
                        In addition to viewing the Variables Catalog, you can also download variable information as a CSV file. Click
                        “Download Complete Report in Excel” button to get the Data Variable Report with multiple views of the RADx data
                        variables, including per-variable frequency counts and dbGaP (PHS) IDs
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure4VariablesCatalog} alt="Figure 4: Download Complete Report" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 4: Download Complete Report</figcaption>
                </>
            ),
            subSections: [],
        },
    ],
};
