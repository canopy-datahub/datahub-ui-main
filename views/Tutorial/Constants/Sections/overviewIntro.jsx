import classes from '../../Tutorial.module.scss';

export const overviewIntro = {
    mainTitle: 'Tutorial Introduction and Overview',
    state: 'overviewIntro',
    sections: [
        {
            title: 'Overview',
            id: 'intro-overview',
            state: 'overviewIntro',
            content: (
                <>
                    <p>
                            The Redwood is a secure, cloud-based platform that empowers researchers to upload and access curated, de-identified datasets, 
                            accelerating innovation in disease diagnostics and public health initiatives.
                    </p>
                    <p>
                        Designed to promote researcher collaboration and accelerate scientific discovery, the Redwood seeks to
                        understand public health and disease morbidity and mortality disparities, while supporting innovations in the
                        development, commercialization, and implementation of diagnostic technologies through de-identified data and
                        algorithms.
                    </p>
                    <p>
                        In the Redwood, researchers can collaborate with one another, explore harmonized data, and share their findings to advance evidence-based diagnostic solutions, strengthening
                        overall health system resilience.
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Introduction',
            id: 'intro-intro',
            state: 'overviewIntro',
            content: (
                <>
                    <p>
                        This tutorial provides in-depth, step-by-step instructions on how to use the features and functionality of the site
                        most effectively. If you still have questions after reading the tutorial, consult some of the other support
                        documentation (e.g. the Frequently Asked Questions page or the Glossary) or reach out directly by using the “Contact
                        Us” link in the main navigation bar or the footer.
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Target Audience',
            id: 'target-audience',
            state: 'overviewIntro',
            content: (
                <>
                    <p>
                        The primary audience for this tutorial is external researchers. Internal NIH staff should consult the appropriate
                        Standard Operating Procedures (SOPs) on the Resource Center page.
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'The Features of the Site',
            id: 'site-features',
            state: 'overviewIntro',
            content: (
                <>
                    <p>
                        The site contains several different features to help you get the most out of the system and better meet your
                        research needs. These include:
                    </p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <b>Common Page Navigation Tools:</b> The site features navigation tools (e.g. the navigation bar, the footer)
                            that will lead you to different pages and features within the Hub.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>Home Page:</b> The Home page is a one-stop shop for many of the key resources on the site. From this page,
                            you can quickly reach educational documents (e.g. the Frequently Asked Questions [FAQ], the User Tutorial), get
                            information on news, funding opportunities, events, and study updates, search for studies, and view statistics
                            on the information in the Hub.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>Study Explorer:</b> The Study Explorer contains a number of discovery features (e.g. search, sorting,
                            filtering) to help you quickly and easily search across studies to find datasets of interest and learn more
                            about variables contained therein.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>Study Overview Pages:</b> Each study in the site has its own Study Overview page, which contains study
                            metadata, variables, data files, and downloadable documents.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>Variables Overview Pages:</b> Each variable in the site has its own Variable Overview page, which contains
                            detailed variable information and a list of studies containing the variable. By viewing these pages, you can
                            understand the data’s context and structure before you request access—helping you make informed decisions with
                            confidence.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>Support Resources:</b> The system gives you multiple ways to submit a support request, so you can ask
                            questions, report bugs, and request in-depth assistance from the Support team on complex questions. You can use
                            the “Need Support?” link in the navigation bar or in the footer.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>User Registration:</b> To access certain features, such as the Approved Data tab, you will need to first
                            register with the site. After you have registered, you can login using the “Login” button in the top-right of
                            every page to access role-based features.
                        </li>
                    </ul>
                </>
            ),
            subSections: [],
        },
    ],
};
