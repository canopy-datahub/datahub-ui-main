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
                        The Data Hub is a secure, cloud-based platform accelerating innovation in public health by enabling data sharing,
                        exploration, and analysis. By providing analytic tools and access to de-identified data from{' '}
                        <a
                            href="https://www.nih.gov/research-training/medical-research-initiatives/radx/programs"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Initiative programs
                        </a>
                        , the Data Hub supports data-driven insights and cross-sector collaboration. Researchers can discover studies,
                        access curated and harmonized data, and use integrated tools to analyze data in new ways, informing public health
                        strategies and strengthening health system preparedness.
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
                            <b>Variables Catalog:</b> This tabular resource lists all variables in each data file for each study. By viewing
                            this resource, you can gain a deeper understanding of the key variables in a study to help you determine whether
                            it aligns with your research goals before requesting access to the study.
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
                        <li className={classes.tutorialListItem}>
                            <b>Approved Data:</b> After you have been approved for data, you can access the “My Approved Data” tab. From
                            here, you can apply for a workbench instance, download data, or transfer it to your workbench instance.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>Public Data:</b> The Public Data page has synthetic data files, which you can practice using our “Analytics
                            Workbench” feature.
                        </li>
                    </ul>
                </>
            ),
            subSections: [],
        },
    ],
};
