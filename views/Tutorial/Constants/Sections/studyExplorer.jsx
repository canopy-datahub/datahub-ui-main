import figure1StudyExplorer from '../../images/StudyExplorer/figure1StudyExplorer.png';
import figure2StudyExplorer from '../../images/StudyExplorer/figure2StudyExplorer.png';
import figure3StudyExplorer from '../../images/StudyExplorer/figure3StudyExplorer.png';
import figure4StudyExplorer from '../../images/StudyExplorer/figure4StudyExplorer.png';
import figure5StudyExplorer from '../../images/StudyExplorer/figure5StudyExplorer.png';
import figure6StudyExplorer from '../../images/StudyExplorer/figure6StudyExplorer.png';
import figure7StudyExplorer from '../../images/StudyExplorer/figure7StudyExplorer.png';
import figure8StudyExplorer from '../../images/StudyExplorer/figure8StudyExplorer.png';
import figure9StudyExplorer from '../../images/StudyExplorer/figure9StudyExplorer.png';
import figure10StudyExplorer from '../../images/StudyExplorer/figure10StudyExplorer.png';
import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';

export const studyExplorer = {
    mainTitle: 'Study Explorer',
    sections: [
        {
            title: 'General',
            id: 'general-se',
            state: 'studyExplorer',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        The publicly available Study Explorer lets you search study metadata to find studies for your research. In the Study
                        Explorer, you can:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <a href="#view-studies-se">View available studies and variables</a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <a href="#perform-search-se">Perform free-text searches</a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <a href="#navigate-search-results-se">Navigate results</a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <a href="#refining-results-se">Refine results through sorting and filtering</a>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <a href="#perform-cross-entity-se">Perform cross-entity search across studies and variables</a>
                        </li>
                    </ul>
                </>
            ),
            subSections: [],
        },
        {
            title: 'View Available Studies and Variables',
            id: 'view-studies-se',
            state: 'studyExplorer',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        To view available studies and variables, click “Study Explorer” in the upper navigation bar. You will be taken to
                        the Study Explorer. It has two tabs: Studies and Variables. By default, the Studies tab is displayed first, where
                        you can see all findable studies, presented, by default, in Table View.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image
                            src={figure1StudyExplorer}
                            alt="Figure 1: Study Explorer Link in the Navigation Bar and default Study Explorer View with Studies and Variables Tabs"
                        />
                    </div>
                    <figcaption className={classes.figureCaption}>
                        Figure 1: Study Explorer Link in the Navigation Bar and default Study Explorer View with Studies and Variables Tabs
                    </figcaption>
                    <p className={classes.tutorialListItem}>
                        In the top right of each tab you will find several controls (Figure 2) including:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>Studies and Variables tab</i> that allows you to switch between study and variable search
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>List/Table View toggle</i> that allows you to switch between List View (which presents results in a
                            vertically arranged list) and Table View (which presents results in a tabular format)
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Download Results button</i> downloads the search results as a csv file
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Manage Columns button</i> allows you to choose columns to hide or show.
                        </li>
                    </ul>
                    <div className={classes.tutorialImg}>
                        <Image src={figure2StudyExplorer} alt="Figure 2: View and Download Results Controls" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 2: View and Download Results Controls</figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Performing Free-Text Searches & Viewing Search Results',
            id: 'perform-search-se',
            state: 'studyExplorer',
            content: (
                <>
                    <p>
                        You can perform free-text searches by entering custom queries in the search bar. To perform a free-text search in
                        the Study Explorer:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>Click "Study Explorer" in the navigation bar.</li>
                        <li className={classes.tutorialListItem}>Locate the Search bar (Figure 3).</li>
                        <li className={classes.tutorialListItem}>Enter your free-text query.</li>
                        <li className={classes.tutorialListItem}>
                            Press "Enter" or click the magnifying glass icon to view results, sorted by relevance based on your query.
                        </li>
                    </ol>
                    <div className={classes.tipContainer}>
                        <i className={classes.tipBox}>Tip: You can also search directly from the Home page.</i>
                    </div>
                    <div className={classes.tutorialImg}>
                        <Image src={figure3StudyExplorer} alt="Figure 3: Study Explorer Search Bar" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 3: Study Explorer Search Bar</figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Navigate Through Search Results',
            id: 'navigate-search-results-se',
            state: 'studyExplorer',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        After performing a search, use the page navigator in the top right of the Study Explorer to move through search
                        result pages (Figure 4). To navigate through pages of the results, you can:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>Option 1: Click the Forward or Backward Arrows in the Page Navigator</i> to move one page forward or one page
                            backward in the results.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Option 2: Click Individual Page Numbers</i> (typically in the format: 1, 2, … X) to go to an individual page.
                        </li>
                    </ul>
                    <div className={classes.tutorialImg}>
                        <Image src={figure4StudyExplorer} alt="Figure 4: Page Navigator" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 4: Page Navigator</figcaption>
                    <p className={classes.tutorialListItem}>
                        In addition to changing the search results view, you can also change the number of results per page. To do this,
                        click the “Show” dropdown at the top or bottom right (Figure 5). Then, select the number of results to show per
                        page, and the page will automatically update.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure5StudyExplorer} alt="Figure 5: Number of results per page and Sorting controls" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 5: "Number of Results per Page" and Sorting Controls</figcaption>
                    <p className={classes.tutorialListItem}>
                        The same controls are available on the Variables tab, but the sorting options are going to be different (Figure 6).
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image
                            src={figure6StudyExplorer}
                            alt='Figure 6: "Number of Results per Page" and Sorting Controls on the Variables tab'
                        />
                    </div>
                    <figcaption className={classes.figureCaption}>
                        Figure 6: "Number of Results per Page" and Sorting Controls on the Variables tab
                    </figcaption>
                    <p className={classes.tutorialListItem}>
                        To export search results to a csv file, click the “Download” button above the sorting dropdowns.
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Refining Results Through Sorting and Filtering',
            id: 'refining-results-se',
            state: 'studyExplorer',
            content: (
                <>
                    <p className={classes.tutorialListItem}>Sorting and filtering search results can further refine a search.</p>
                    <p className={classes.tutorialListItem}>To sort in the Study Explorer:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>Locate the sorting options in the top right. (Figure 5)</li>
                        <li className={classes.tutorialListItem}>Pick either "Ascending" or "Descending" in the sort order dropdown</li>
                        <li className={classes.tutorialListItem}>
                            Use the sort by dropdown to select a field for sorting, and results will dynamically update.
                        </li>
                    </ol>
                    <p className={classes.tutorialListItem}>
                        Filtering is more complex than sorting but can help further refine a search. The filter pane is made up of two
                        primary components: filter categories and filter values. Filter categories (e.g. “Has Data Files” or "Data Program”)
                        are high-level buckets that include multiple filter values. Filter values are the specific criteria by which you can
                        filter search results. For example, the filter values in the “Has Data Files” category are “Yes” or “No.”
                    </p>
                    <p>The three techniques to narrow or refine a search using filters include:</p>
                    <div className={classes.tutorialListItem}>
                        <table className={classes.tableContainer}>
                            <thead>
                                <tr>
                                    <th>Technique</th>
                                    <th>Description</th>
                                    <th>Example</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Select One Filter Value</td>
                                    <td>Selecting a single value in a Filter Category will filter the results by that value.</td>
                                    <td>If you click "Yes" under "Has Data Files", you will only see studies with data files. </td>
                                </tr>
                                <tr>
                                    <td>Select Multiple Filter Values in One Filter Category</td>
                                    <td>Selecting two or more values within one filter category will function as a Boolean ‘OR.’</td>
                                    <td>If you click an option within "Data Program", you will see studies that align to the program</td>
                                </tr>
                                <tr>
                                    <td>Select Multiple Filter Values Across Filter Categories</td>
                                    <td>
                                        Selecting two or more values across two or more filter categories will narrow your search and
                                        function as a Boolean ‘AND.’
                                    </td>
                                    <td>
                                        If you click an option from "Data Program" and "Yes" under "Has Data Files", you will see studies
                                        that are aligned with the program AND have data files.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <figcaption className={classes.figureCaption}>Table 1: Different Search Techniques</figcaption>
                    <p className={classes.tutorialListItem}>
                        After deciding a filtering technique, select values by expanding the accordion for the desired filter category
                        (Figure 7). Next, click the checkbox next to the filter value, and results will dynamically update.
                    </p>
                    <p>
                        To remove a single filter value, click the checkbox a second time or click the “X” button on the filter badge above
                        the filter pane. To remove all filters, press “Reset Search” above the filter pane.
                    </p>
                    <i>Note: The numbers to the right of the filter values represent the number of results a selected value will return.</i>
                    <br />
                    <br />
                    <div className={classes.tutorialImg}>
                        <Image src={figure7StudyExplorer} alt="Figure 7: Filter Box" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 7: Filter Box</figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Performing Cross-Entity Searches',
            id: 'perform-cross-entity-se',
            state: 'studyExplorer',
            content: (
                <>
                    <p>
                        Two tabs of the Study Explorer allow users to perform cross-entity searches. That is, you can search for studies or
                        variables, and the results will display linked studies/variables.
                    </p>
                    <p>
                        For example, if you want to search for studies focused on Essential workers, you select “Essential Workers” value in
                        the “Study Population Focus” filter, and your search returns the 12 studies focused on this particular population.
                    </p>
                    <p>
                        In the Studies tab, you can see the variables for a particular study by clicking the “View list of variables” icon
                        next to that study (Figure 8).
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure8StudyExplorer} alt="Figure 8: View list of Variables icon next to the study name" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 8: View list of Variables icon next to the study name</figcaption>
                    <br />
                    <p>System will display list of variables contained in this study’s files (Figure 9).</p>
                    <div className={classes.tutorialImg}>
                        <Image
                            src={figure9StudyExplorer}
                            alt="Figure 9: List of Variables modal
"
                        />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 9: List of Variables modal</figcaption>

                    <br />
                    <p>
                        Using the Variables Tab to search will give variables related to your search term. For example, if you wanted to see
                        what variables are related to age, you would enter age, and it would generate a list of all variables related to age
                        across all studies.
                    </p>
                    <p>
                        Similarly to the Studies Tab, in the Variables Tab, you will see the same icon (Figure 8). But clicking on it will
                        expand the list of studies, where files contain that particular variable (Figure 10).
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure10StudyExplorer} alt="Figure 10: List of Studies modal" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 10: List of Studies modal</figcaption>

                    <br />
                    <p>
                        Both modals have a button “Explore studies/variables in search”. Clicking this button will bring you to a respective
                        tab of the Study Explorer populated with search results for this study/variable.
                    </p>
                </>
            ),
            subSections: [],
        },
    ],
};
