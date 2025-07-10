import classes from '../../Tutorial.module.scss';

export const analyticsWorkbench = {
    mainTitle: 'The Analytics Workbench',
    state: 'analyticsWorkbench',
    sections: [
        {
            title: 'General',
            id: 'general-workbench',
            state: 'analyticsWorkbench',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        The Analytics Workbench allows you to launch compute instances with Jupyter notebooks, using Python or R, in a
                        personal workspace environment. Workbench add-ons include 1) Data Wrangler, a no-code data transformation, analysis,
                        and visualization option and 2) SAS Viya Analytics Pro, a cloud-hosted SAS environment that allows scalable
                        computing, data storage, and usage tracking to enable data access, transform, analysis, visualization, and mapping
                        capabilities.
                    </p>
                    <i className={classes.tutorialListItem}>
                        Note: There is a limited number of licenses available for SAS and Data Wrangler. The licenses are distributed on a
                        first come first serve basis.
                    </i>
                </>
            ),
            subSections: [],
        },
    ],
};
