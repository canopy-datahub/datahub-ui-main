import figure1HomePage from '../../images/HomePage/figure1HomePage.png';
import figure2HomePage from '../../images/HomePage/figure2HomePage.png';
import figure3HomePage from '../../images/HomePage/figure3HomePage.png';
import figure4HomePage from '../../images/HomePage/figure4HomePage.png';
import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';

export const homePage = {
    mainTitle: 'Home Page',
    state: 'homePage',
    sections: [
        {
            title: 'General',
            id: 'general-hp',
            state: 'homePage',
            content: (
                <>
                    <p>
                        The Home page is a one-stop-shop for quick links to popular features and informational resources on the RADx Data
                        Hub.
                    </p>
                    <p>From the Home Page, you can:</p>
                    <ul>
                        <li className={classes.tutorialListItem}>Search for Studies</li>
                        <li className={classes.tutorialListItem}>Access quick links to resources</li>
                        <li className={classes.tutorialListItem}>Find events, funding opportunities, and recent news</li>
                        <li className={classes.tutorialListItem}>View statistics</li>
                        <li className={classes.tutorialListItem}>Learn about recent content updates</li>
                    </ul>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Search for Studies',
            id: 'search-for-studies',
            state: 'homePage',
            content: (
                <>
                    <p>The RADx Data Hub allows you to search for studies and view study metadata without having to login.</p>
                    <p>
                        From the <b>Home page</b>, you can search for studies using through one of the following options:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>Option 1 - Enter a query in the search bar:</i> To run a query from the <b>Home</b> page directly, type a
                            query into the search bar and press Enter or click the magnifying glass icon. This will bring you to the{' '}
                            <b>Study Explorer</b> page with results based on your query.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Option 2 – Go to the Study Explorer:</i> Click on the <b>Study Explorer</b> link in the <b>Navigation Bar</b>{' '}
                            or on the <b>Home</b> page banner. Once on the <b>Study Explorer</b>, you can run your query from the search bar
                            at the top of the page.
                        </li>
                    </ul>
                    <div className={classes.tutorialImg}>
                        <Image src={figure1HomePage} alt="Figure 1: Home Page Search Options" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 1: Home Page Search Options</figcaption>
                    <p className={classes.tutorialListItem}>
                        Once you’ve ran a query, you can further refine your search using a few different features in the{' '}
                        <b>Study Explorer</b>. To learn about these features, refer to the <b>Study Explorer</b> Tutorial page.
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Access Quick Links',
            id: 'access-quick-links',
            state: 'homePage',
            content: (
                <>
                    <p>
                        Along the top banner of the <b>Home</b> page, there are three <b>Quick Links</b>, which take you to publicly
                        available resources.
                    </p>
                    <p>
                        The <b>Quick Links</b> section includes links to the RADx Tutorial (this document) as well as two other resources:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>The About Page:</i> Provides a brief overview of the RADx Data Hub’s features, the programs that support the
                            system, and the organizations involved in the system’s development.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Frequently Asked Questions:</i> Provides guidance and resources to some of the most frequently asked
                            questions about the RADx Data Hub.
                        </li>
                    </ul>
                    <p className={classes.tutorialListItem}>
                        To access any of these resources, you can click directly on the resource or the corresponding Read More link (Figure
                        2).
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure2HomePage} alt="Figure 2: Quick Links" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 2: Quick Links</figcaption>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Find Events, Funding Opportunities, and Recent News',
            id: 'events-opportunities-news',
            state: 'homePage',
            content: (
                <>
                    <p>
                        Under the <b>Quick Links</b> section, you can find three modules:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>Funding Opportunities:</i> Contains open funding and grant opportunities for COVID-19 research.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>News:</i> Provides snippets of recent news articles and press releases about the RADx Data Hub
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Save the Date:</i> Includes upcoming events (such as webinars) hosted by the team behind the RADx Data Hub.
                        </li>
                    </ul>
                    <p>
                        Each module has similar features. All contain individual posts with hyperlinked titles that you can click to find
                        more information (Figure 3). For example, clicking the title of a news post will take you to the full article.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure3HomePage} alt="Figure 3: News Module" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 3: News Module</figcaption>
                    <p className={classes.tutorialListItem}>
                        In addition, you can view all posts by clicking the More link at the bottom left of each module (Figure 3). For
                        example, clicking on the More link for Events will lead you to the Events standalone page where you can see all
                        upcoming and previous events.
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'View Statistics',
            id: 'view-statistics',
            state: 'homePage',
            content: (
                <>
                    <p>
                        The Statistics section provides some high-level information on the amount of resources stored in the RADx Data Hub.
                    </p>
                    <p>At the top, there are two general statistics:</p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>Total Files:</i> The number of files in the RADx Data Hub. All file types are included in this number.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Total Studies:</i> The number of studies that have been registered in the system. This includes ongoing and
                            finished studies
                        </li>
                    </ul>
                    <p className={classes.tutorialListItem}>
                        Under the general statistics, you can find statistics for each program. These include:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>Total Data Files:</i> The number of harmonized or non-harmonized data files.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Total Documents:</i> The number of metadata files, data dictionaries, and ReadMe files. Note: More file types
                            may be included in this number in later releases.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Total Studies:</i> The number of ongoing and complete studies.
                        </li>
                    </ul>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Learn About Recent Content Updates',
            id: 'learn-about-content-updates',
            state: 'homePage',
            content: (
                <>
                    <p>
                        The Content Updates section lists newly added resources to the hub at the study-level. This section is updated once
                        a quarter and contains three types of updates:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <i>Newly Registered Studies:</i> Studies that have been added to the RADx Data Hub recently. Note: Some of the
                            studies may not yet have data files.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Studies with New Files:</i> Completely new files, such as original or transformed data files, metadata files,
                            or data dictionaries.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <i>Studies with Updated Files:</i> New versions of existing files. Note: Older versions are not stored in the
                            RADx Data Hub but can be obtained upon request. Use the Contact Us form to enquire about data availability.
                        </li>
                    </ul>
                    <p>
                        To get more details on a single content update, click the <b>Study Name</b>, which will take you to the{' '}
                        <b>Study Overview</b> for that study.
                    </p>
                    <div className={classes.tutorialImg}>
                        <Image src={figure4HomePage} alt="Figure 4: Content Updates" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 4: Content Updates</figcaption>
                </>
            ),
            subSections: [],
        },
    ],
};
