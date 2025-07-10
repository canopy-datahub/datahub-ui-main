import figure1StudyExplorer from '../../images/StudyExplorer/figure1StudyExplorer.png';
import figure2StudyExplorer from '../../images/StudyExplorer/figure2StudyExplorer.png';
import figure3StudyExplorer from '../../images/StudyExplorer/figure3StudyExplorer.png';
import figure4StudyExplorer from '../../images/StudyExplorer/figure4StudyExplorer.png';
import figure5StudyExplorer from '../../images/StudyExplorer/figure5StudyExplorer.png';
import figure6StudyExplorer from '../../images/StudyExplorer/figure6StudyExplorer.png';
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
                        The publicly available Study Explorer lets you search RADx study metadata to find studies for
                        your research. In the Study Explorer, you can:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <a href="#view-studies-se">View available RADx Data Hub studies</a>
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
                    </ul>
                </>
            ),
            subSections: [],
        },
        {
            title: 'View Available RADx Data Hub Studies',
            id: 'view-studies-se',
            state: 'studyExplorer',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        To view available RADx Data Hub studies, click “Study Explorer” in the upper navigation bar. You will be taken to
                        the Study Explorer, where all findable RADx Data Hub studies present, by default, in Table View.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure1StudyExplorer} alt="Figure 1: Study Explorer, Table view" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 1: Study Explorer, Table View</figcaption>
                    <p className={classes.tutorialListItem}>
                        In the top right you will find several controls (Figure 2) including:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>List/Table View toggle</i> that allows you to switch between List View
                            (which presents results in a vertically arranged list) and Table View (which presents results in a tabular format)
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
                        You can perform free-text searches by entering custom queries in the search bar. To perform a free-text
                        search in the Study Explorer:
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
                        After performing a search, use the page navigator in the top right of the Study Explorer to
                        move through search result pages (Figure 4). To navigate through pages of the results, you can:
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
                        In addition to changing the search results view, you can also change the number of results per page. To do this, click the “Show” dropdown at
                        the top or bottom right (Figure 5). Then, select the number of results to show per page, and the page will automatically update.
                    </p>
                    <p>To export search results to a csv file, click the "Download" button to the right of the sorting dropdowns.</p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure5StudyExplorer} alt="Figure 5: Number of results per page and Sorting controls" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 5: "Number of Results per Page" and Sorting Controls</figcaption>
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
                        Filtering is more complex than sorting but can help further refine a search. The filter pane is made up of two primary
                        components: filter categories and filter values. Filter categories (e.g. “Has Data Files” or “RADx Data Program”) are high-level
                        buckets that include multiple filter values. Filter values are the specific criteria by which you can filter search results. For
                        example, the filter values in the “Has Data Files” category are “Yes” or “No.”
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
                                    <td>
                                        If you click "RADx-UP" and "RADx-rad" within "RADx Data Program", you will see studies that
                                        align to either program
                                    </td>
                                </tr>
                                <tr>
                                    <td>Select Multiple Filter Values Across Filter Categories</td>
                                    <td>
                                        Selecting two or more values across two or more filter categories will narrow your search and
                                        function as a Boolean ‘AND.’
                                    </td>
                                    <td>
                                        If you click "RADx-UP" from "RADx Data Program" and "Yes" under "Has Data Files", you will see
                                        studies that are aligned with RADx-UP AND have data files.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <figcaption className={classes.figureCaption}>Table 1: Different Search Techniques</figcaption>
                    <p className={classes.tutorialListItem}>
                        After deciding a filtering technique, select values by expanding the accordion for the desired filter category (Figure 7). Next, click the checkbox next
                        to the filter value, and results will dynamically update.
                    </p>
                    <p>
                        To remove a single filter value, click the checkbox a second time or click the “X” button on the filter badge above
                        the filter pane. To remove all filters, press “Reset Search” above the filter pane.
                    </p>
                    <i>Note: The numbers to the right of the filter values represent the number of results a selected value will return.</i>
                    <br />
                    <br />
                    <div className={classes.tutorialImg}>
                        <Image src={figure6StudyExplorer} alt="Figure 6: Filter Box" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 6: Filter Box</figcaption>
                </>
            ),
            subSections: [],
        },
    ],
};
