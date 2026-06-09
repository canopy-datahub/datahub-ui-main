import classes from '../../Tutorial.module.scss';

// NOTE: This section is intentionally text- and table-driven. Screenshots can be
// added later following the pattern in the other tutorial sections (import a PNG
// from ../../images/DataAccessControl/ and wrap it in a <div className={classes.tutorialImg}>).

export const dataAccessControl = {
    mainTitle: 'Data Access Control',
    state: 'dataAccessControl',
    sections: [
        {
            title: 'Overview',
            id: 'access-overview',
            state: 'dataAccessControl',
            content: (
                <>
                    <p>
                        Every study on the platform has an <strong>access level</strong> that controls who can see the study and download
                        its data files. This lets a study owner share data broadly, restrict it to logged-in users, or keep it private while
                        it is being prepared.
                    </p>
                    <p>
                        Access is controlled per study (not per file): the access level you set on a study applies to that study&apos;s
                        metadata and all of its data files. The sections below explain the three access levels, who can set them, where they
                        are enforced, and what to do if you need access to a study you cannot currently see.
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Access Levels: Public, Limited, and Private',
            id: 'access-levels',
            state: 'dataAccessControl',
            content: (
                <>
                    <p>There are three access levels. Each one determines who can view the study and download its files:</p>
                    <div className={classes.tableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Access Level</th>
                                    <th>Who can see the study and download its files</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Public</strong>
                                    </td>
                                    <td>Everyone, including visitors who are not logged in.</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Limited</strong>
                                    </td>
                                    <td>Any logged-in user. Visitors who are not signed in cannot see it.</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Private</strong>
                                    </td>
                                    <td>Only the study&apos;s creator and Curators / Administrators.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={classes.tipContainer}>
                        <div className={classes.tipBox}>
                            Newly registered studies default to <strong>Public</strong>. If a study should not be openly available, set its
                            access level deliberately before sharing it.
                        </div>
                    </div>
                </>
            ),
            subSections: [],
        },
        {
            title: "Setting a Study's Access Level",
            id: 'access-setting',
            state: 'dataAccessControl',
            content: (
                <>
                    <p>The access level is part of a study&apos;s registration. It can be set when the study is created and changed later.</p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <strong>Where:</strong> open the study in <strong>Study Registration</strong> (Data Submitter) and choose the
                            <strong> Access Level</strong> &mdash; Public, Limited, or Private.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Who can change it:</strong> the study&apos;s creator, a Curator, or an Administrator. A regular logged-in
                            user cannot change the access level of a study they do not own.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>When it takes effect:</strong> immediately. Lowering access (for example, Public &rarr; Private) hides the
                            study from users who no longer qualify; raising it makes the study visible to the wider audience right away.
                        </li>
                    </ul>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Where the Access Level Applies',
            id: 'access-enforcement',
            state: 'dataAccessControl',
            content: (
                <>
                    <p>The access level is enforced everywhere a study or its data is exposed:</p>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <strong>Study search and browse:</strong> results are filtered to what you are allowed to see. An anonymous visitor
                            sees only Public studies; a logged-in user additionally sees Limited studies and any study they created; Curators and
                            Administrators see everything.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Study Overview:</strong> the study&apos;s metadata, documents, and data file listings are only shown to users
                            who are allowed to see that study.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Downloads:</strong> every file download is checked against the parent study&apos;s access level, so a file
                            cannot be downloaded by someone who is not allowed to see its study.
                        </li>
                    </ul>
                    <div className={classes.tipContainer}>
                        <div className={classes.tipBox}>
                            <strong>One thing to be aware of:</strong> the <em>variable</em> search can surface a variable&apos;s descriptive
                            information (name, description, and the study it belongs to) even for a Limited or Private study. This exposes only
                            that variable-level description &mdash; the study&apos;s actual data files remain protected and can still only be
                            downloaded by someone with access to the study.
                        </div>
                    </div>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Requesting Access to a Study You Cannot See',
            id: 'access-request',
            state: 'dataAccessControl',
            content: (
                <>
                    <p>
                        If you cannot see or download a study you believe you should have access to, the reason is almost always the
                        study&apos;s access level. There are two things to check:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            <strong>Make sure you are logged in.</strong> Studies set to <strong>Limited</strong> are only visible to
                            signed-in users, so simply logging in may resolve it.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Ask for access.</strong> There is no self-service &ldquo;request access&rdquo; button for an individual
                            study. If a study is <strong>Private</strong>, contact the study&apos;s owner to ask them to adjust its access
                            level, or use the <strong>Need Support?</strong> form (see the <em>User Support</em> section of this tutorial) and
                            describe the study you need access to.
                        </li>
                    </ol>
                    <p>
                        Broad access to studies you did not create &mdash; the ability to see every study regardless of its access level
                        &mdash; comes with the <strong>Curator</strong> or <strong>Administrator</strong> role. If your work requires one of
                        those roles, see <em>Submission Workflow &rarr; Requesting a Role</em> for how to request it through the support form.
                    </p>
                </>
            ),
            subSections: [],
        },
    ],
};
