import figure1VariableOverview from '../../images/VariableOverview/figure1VariableOverview.png';
import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';

export const variableOverview = {
    mainTitle: 'Variable Overview',
    state: 'variableOverview',
    sections: [
        {
            title: 'General',
            id: 'general-vo',
            state: 'variableOverview',
            content: (
                <>
                    <p>
                        Each variable present in the study files in the system has an overview page, which contains comprehensive variable
                        information. To reach the Variable Overview page, you must locate a variable in the Variables Tab in the Study
                        Explorer, in the Variable Information section on a Study Overview page, or in the List of Studies on the Studies tab
                        in the Study Explorer, and click on the “Variable Name” hyperlink.
                    </p>
                    <p>On the Variable Overview page, you can:</p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <a href="#view-variable-info-vo">View detailed variable information </a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <a href="#list-studies-vo">View a list of studies using the variable</a>
                        </li>
                    </ul>
                </>
            ),
            subSections: [],
        },
        {
            title: 'View Variable Information',
            id: 'view-variable-info-vo',
            state: 'variableOverview',
            content: (
                <>
                    <p>
                        The Variable Information section lists several attributes to help you gain a detailed understanding of the variable.
                        At the bottom of the page you can find a scrollable list of studies using the variable.
                    </p>
                    <p>The following attributes are provided for each variable.</p>
                    <ul>
                        <li>Label: The descriptive variable name.</li>
                        <li>Section: Overarching grouping of the variable.</li>
                        <li>Data Type: The type of data stored in the variable. Either an integer, float, or string. </li>
                        <li>
                            Variable Category: The level of harmonization in relation to the programs. For a full definition, see the{' '}
                            <a href="/glossary#variableCategory">Variable Category glossary entry</a>.
                        </li>
                        <li>
                            Description: The detailed variable description. This includes more information about the variable including how
                            it was collected, it was harmonized if applicable, and relevant notes.
                        </li>
                        <li>Keywords: Synonyms or related terms.</li>
                        <li>Term: The ontological term related to the variable.</li>
                        <li>From: The program(s) the variable was used in.</li>
                        <li>Permissible Values: A table detailing the allowed values for the variable and corresponding labels. </li>
                    </ul>
                    <div className={classes.tutorialImg}>
                        <Image src={figure1VariableOverview} alt="Figure 1: Variable Overview Page" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 1: Variable Overview Page</figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'List of Studies Using Variable',
            id: 'list-studies-vo',
            state: 'variableOverview',
            content: (
                <>
                    <p>
                        The List of Studies Using Variable section lists all the studies that contain the specified variable to help you
                        identify relevant datasets. Each study is linked to its Study Overview page where you can find more study
                        information.
                    </p>
                </>
            ),
            subSections: [],
        },
    ],
};
