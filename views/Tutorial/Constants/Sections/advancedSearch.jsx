import figure1AdvSearch from '../../images/AdvancedSearch/figure1AdvSearch.png';
import figure2AdvSearch from '../../images/AdvancedSearch/figure2AdvSearch.png';
import figure3AdvSearch from '../../images/AdvancedSearch/figure3AdvSearch.png';
import figure4AdvSearch from '../../images/AdvancedSearch/figure4AdvSearch.png';
import figure5AdvSearch from '../../images/AdvancedSearch/figure5AdvSearch.png';
import figure6AdvSearch from '../../images/AdvancedSearch/figure6AdvSearch.png';
import figure7AdvSearch from '../../images/AdvancedSearch/figure7AdvSearch.png';
import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';

export const advancedSearch = {
    mainTitle: 'Advanced Search Tool',
    state: 'advancedSearch',
    sections: [
        {
            title: 'General',
            id: 'general-advs',
            state: 'advancedSearch',
            content: (
                <>
                    <p>
                        Advanced Search lets you perform searches using Boolean logic. This function requires a basic understanding of the
                        query-building principles.
                    </p>
                    <i>Note: This tool does NOT ADD to the original keyword search. It is an independent search function.</i>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Running a Single Query',
            id: 'running-single-query',
            state: 'advancedSearch',
            content: (
                <>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Click the “Advanced Search” link under the Search bar. This will disable the Search bar and open the
                            Query Builder.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure1AdvSearch} alt="Figure 1: Study Explorer Advanced Search" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 1: Study Explorer Advanced Search</figcaption>
                        <li className={classes.tutorialListItem}>
                            Click the “+ Add Query” button to add a specific search query line to base query group. Remove lines by clicking
                            the red “X.”
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure2AdvSearch} alt="Figure 2: Add Query Button" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 2: "Add Query" Button</figcaption>
                        <li className={classes.tutorialListItem}>
                            Select an option from the first dropdown menu to use the provided metadata fields and direct the search.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure3AdvSearch} alt="Figure 3: Metadata Attribute Dropdown" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 3: Metadata Attribute Dropdown</figcaption>
                        <li className={classes.tutorialListItem}>Choose which query type within the operator dropdown menu.</li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure4AdvSearch} alt="Figure 4: Query Type Dropdown" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 4: Query Type Dropdown</figcaption>
                        <li className={classes.tutorialListItem}>
                            Enter an input value and click “Apply Query” to complete the query. The system will update the search results
                            upon doing so.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure5AdvSearch} alt="Figure 5: Apply Query Button" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 5: "Apply Query" Button</figcaption>
                    </ol>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Running Additional Queries and Subqueries',
            id: 'running-additional-queries',
            state: 'advancedSearch',
            content: (
                <>
                    <p>
                        After building an initial query, add another query or a subquery to further refine a search using one of two
                        methods:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            Add a query to the initial query to refine the search by selecting an option from the Boolean Combinator (“AND”
                            or “OR”).
                        </li>
                        <li className={classes.tutorialListItem}>
                            Add a subquery to perform an additional logical function within the initial query.
                        </li>
                    </ul>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Select either “AND” or “OR” from the Boolean Combinator dropdown. “AND” narrows a search based on the selected
                            queries. “OR” broadens a search.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Click “+Add Query” to add another query to your initial query. Then, repeat the previous steps to build your
                            additional query.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure6AdvSearch} alt="Figure 6: Add Query Button" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 6: "Add Query" Button</figcaption>
                        <li className={classes.tutorialListItem}>
                            Click “+Add Subquery” to add a subquery to an initial or subsequent queries. Since the options for building
                            subqueries are the same as those for building queries, follow the initial query-building steps to build a
                            subquery.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure7AdvSearch} alt="Figure 7: Add Subquery Button" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 7: "Add Subquery" Button</figcaption>
                    </ol>
                    <p>
                        <i>
                            Note: To clear a query, press “Clear Query”. Then, click “Apply Query” to reset the search results.
                        </i>
                    </p>
                </>
            ),
            subSections: [],
        },
    ],
};
