import classes from '../../Tutorial.module.scss';

// NOTE: This section is intentionally text- and table-driven. Screenshots can be
// added later following the pattern in the other tutorial sections (import a PNG
// from ../../images/SubmissionWorkflow/ and wrap it in a <div className={classes.tutorialImg}>).

export const submissionWorkflow = {
    mainTitle: 'Submission Workflow',
    state: 'submissionWorkflow',
    sections: [
        {
            title: 'Overview',
            id: 'submission-overview',
            state: 'submissionWorkflow',
            content: (
                <>
                    <p>
                        Getting data onto the platform follows a defined workflow with two participants: a <strong>Data Submitter</strong>,
                        who registers a study and uploads its data files, and a <strong>Data Curator</strong>, who reviews the submitted
                        files and approves or rejects them. A submission is only published after a Curator has reviewed it.
                    </p>
                    <p>The high-level flow is:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            <strong>Register a study</strong> — the Submitter creates the study record and sets its access level (this comes
                            before any data is uploaded).
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Create a submission and upload files</strong> — the Submitter starts a submission against the study and
                            uploads data files.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Bundle, validate, review, and submit</strong> — the Submitter organizes files into bundles, runs
                            validation, reviews the result, and submits the package for curation.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Curator review</strong> — a Curator opens the submitted package, approves or rejects files, and finalizes
                            the decision. Both participants are notified by email along the way.
                        </li>
                    </ol>
                    <p>
                        Each stage is gated by role-based permissions: a Submitter cannot reach the Curator review screens, and a Curator
                        does not edit a Submitter&apos;s in-progress work. The sections below describe who does what, where to find each
                        screen in the menu, and the constraints at each step.
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Roles: Who Can Do What',
            id: 'submission-roles',
            state: 'submissionWorkflow',
            content: (
                <>
                    <p>
                        Access to the submission workflow is determined by your role. The roles below are the ones relevant to getting data
                        onto the platform. Other roles (System Observer, Ticket Manager) are not part of the submission workflow.
                    </p>
                    <div className={classes.tableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>What they can do in the submission workflow</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Data Submitter</strong>
                                    </td>
                                    <td>
                                        Registers and edits studies for their own center, sets a study&apos;s access level, creates
                                        submissions, uploads / replaces / deletes files, builds bundles, runs validation, and submits the
                                        package for review. Can only see and act on their own submissions.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Data Curator</strong>
                                    </td>
                                    <td>
                                        Reviews studies and submitted file packages from any center, approves or rejects files (with a
                                        reason), and bulk-downloads files under review. Curators review and decide — they do not build or edit
                                        a Submitter&apos;s in-progress submission. Can also change any study&apos;s access level.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Application Administrator</strong>
                                    </td>
                                    <td>
                                        Has full visibility across the platform and can manage users and system settings. Administrators are
                                        not normally part of day-to-day submission or curation, but can act where needed.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>Who should do what:</strong> the person who owns the data registers the study and submits the data
                        (Submitter); a separate reviewer checks quality and compliance before publication (Curator). Keeping these
                        responsibilities with different people preserves the review step — a submission is meant to be checked by someone
                        other than its author.
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Requesting a Role',
            id: 'submission-roles-request',
            state: 'submissionWorkflow',
            content: (
                <>
                    <p>
                        The submission workflow only appears if your account has the right role. A new account can browse and search the
                        platform, but submitting data requires the <strong>Data Submitter</strong> role and reviewing submissions requires the{' '}
                        <strong>Data Curator</strong> role. If you don&apos;t see the <strong>Data Submitter</strong> or <strong>Curator</strong>{' '}
                        menu in the navigation bar, your account does not yet have that role.
                    </p>
                    <p>
                        There is no self-service &ldquo;request a role&rdquo; button — roles are granted by an{' '}
                        <strong>Application Administrator</strong>. To ask for one:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Click <strong>Need Support?</strong> in the navigation bar or footer to open the User Support Request Form (see the{' '}
                            <em>User Support</em> section of this tutorial for details).
                        </li>
                        <li className={classes.tutorialListItem}>
                            Describe the role you need and why — for example, &ldquo;Please grant the Data Submitter role so I can upload data
                            for my center.&rdquo; Include your center or study so an Administrator can verify the request.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Submit the request. You will receive a confirmation email with a ticket number, and an Administrator will follow up
                            to grant the role or ask for more detail.
                        </li>
                    </ol>
                    <div className={classes.tipContainer}>
                        <div className={classes.tipBox}>
                            After your role is granted, the matching menu appears in the navigation bar. If it doesn&apos;t show up right away,
                            log out and back in to refresh your account&apos;s permissions.
                        </div>
                    </div>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Before You Start: Register a Study',
            id: 'submission-prereq',
            state: 'submissionWorkflow',
            content: (
                <>
                    <p>
                        Data is always attached to a <strong>study</strong>, so a study must exist before you can submit files. As a Data
                        Submitter, open <strong>Data Submitter &rarr; Study Registration</strong> from the navigation bar to create or edit a
                        study for your center.
                    </p>
                    <p>
                        During registration you set the study&apos;s metadata and its <strong>Access Level</strong>, which controls who can
                        later see the study and download its data files:
                    </p>
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
                                    <td>Any logged-in user.</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Private</strong>
                                    </td>
                                    <td>Only you (the creator) and Curators / Administrators.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={classes.tipContainer}>
                        <div className={classes.tipBox}>
                            The access level can be changed later by the study&apos;s creator, a Curator, or an Administrator. Set it
                            deliberately before sharing — newly registered studies default to <strong>Public</strong>.
                        </div>
                    </div>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Submitting Data: Step by Step',
            id: 'submission-steps',
            state: 'submissionWorkflow',
            content: (
                <>
                    <p>
                        As a Data Submitter, open <strong>Data Submitter &rarr; Data Submission</strong> from the navigation bar to reach your
                        Submitter Dashboard. The dashboard lists your submissions grouped by status (In Progress, Submitted, Completed).
                        Click <strong>New Submission</strong> to begin, then choose the study you are submitting to.
                    </p>
                    <p>A submission moves through five steps, shown as a progress wizard:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            <strong>Upload Files</strong> — Upload your data files (and any accompanying metadata, data dictionary, or PDF
                            materials). You can add, replace, or delete files at this step.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Bundle Files</strong> — Group related files into bundles. A bundle ties a data file together with its
                            metadata and data dictionary so they are validated and published as a unit.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Validate Files</strong> — Run validation. The platform checks each bundle against the required formats
                            (metadata template, data dictionary specification, and — for harmonized files — the CDE codebook). Review the
                            validation results; fix and re-upload anything that fails, then acknowledge the results to continue.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Review and Submit</strong> — Do a final review of the package. When you are satisfied, submit it for
                            curation.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Submitted</strong> — The package is now with the Curator. You receive a confirmation email, and the
                            submission appears under <em>Submitted</em> on your dashboard. It is read-only from here until the Curator makes a
                            decision.
                        </li>
                    </ol>
                    <div className={classes.tipContainer}>
                        <div className={classes.tipBox}>
                            You can step backward in the wizard (for example, from Bundle Files back to Upload Files) to adjust your work
                            before submitting. Once you submit, editing is locked until curation completes.
                        </div>
                    </div>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Curator Review and Approval',
            id: 'submission-review',
            state: 'submissionWorkflow',
            content: (
                <>
                    <p>
                        As a Data Curator, open <strong>Curator &rarr; File Submissions</strong> from the navigation bar. This screen lists
                        submissions awaiting review. (Curators manage studies separately under <strong>Curator &rarr; Studies</strong>.)
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Open a submitted package to see its files. You can review files individually or bulk-download them for closer
                            inspection.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Approve or reject each file. When rejecting, provide a <strong>rejection reason</strong> so the Submitter knows
                            what to correct.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Finalize the decision. The submission is marked <strong>Completed</strong>, approved files are published according
                            to the study&apos;s access level, and the Submitter receives a &ldquo;submission processed&rdquo; email
                            summarizing the outcome.
                        </li>
                    </ol>
                    <div className={classes.tipContainer}>
                        <div className={classes.tipBox}>
                            Curators review and decide; they do not edit a Submitter&apos;s files. If files need changes, reject them with a
                            clear reason and the Submitter will revise and resubmit.
                        </div>
                    </div>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Fixing Problems and Updating Data Later',
            id: 'submission-fixing',
            state: 'submissionWorkflow',
            content: (
                <>
                    <p>
                        Whether a submission can be changed — and who can help — depends on where it is in the workflow.
                    </p>
                    <div className={classes.tableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Situation</th>
                                    <th>What can be done, and by whom</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Still In Progress</strong>
                                    </td>
                                    <td>
                                        The Submitter can freely add, replace, or delete files, step back through the wizard, and re-run
                                        validation until everything is correct. Nothing is final yet.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Already Submitted (awaiting curation)</strong>
                                    </td>
                                    <td>
                                        The package is locked and read-only for the Submitter while it awaits the Curator&apos;s decision. You
                                        cannot edit it in place. If something is wrong, the Curator will reject the affected files with a reason
                                        so you can correct and resubmit them.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Files rejected by the Curator</strong>
                                    </td>
                                    <td>
                                        The Curator rejects with a reason. Rejected files are removed from the platform, so the Submitter
                                        re-uploads corrected copies in a new submission. Files approved in the same review are unaffected.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Completed, but the data needs updating</strong>
                                    </td>
                                    <td>
                                        A completed submission is final and is not edited in place. To publish updated or additional data, the
                                        Submitter starts a <strong>new submission</strong> against the same study. Re-uploading a file with the
                                        same name creates a new version on approval — the previous version is kept and the newest becomes the
                                        current one, so the data&apos;s history is preserved.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Wrong visibility, or anything else</strong>
                                    </td>
                                    <td>
                                        A study&apos;s access level can be changed at any time by its creator, a Curator, or an Administrator.
                                        For anything you can&apos;t resolve yourself, use <strong>Need Support?</strong> to reach the team.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>So, can a submission be edited or appended to later?</strong> While it is In Progress, yes — edit it freely.
                        Once it is submitted, no — it is locked until curation finishes. After it is completed you don&apos;t edit the old
                        submission; instead you submit again, and the platform versions the data so nothing is lost.
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Submission Status Reference',
            id: 'submission-status',
            state: 'submissionWorkflow',
            content: (
                <>
                    <p>
                        Each submission has a status that tells you where it is in the workflow. These statuses are the column headings on the
                        Submitter Dashboard and the Curator&apos;s File Submissions screen.
                    </p>
                    <div className={classes.tableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Meaning</th>
                                    <th>Who acts next</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>In Progress</strong>
                                    </td>
                                    <td>The Submitter is still building the package (uploading, bundling, validating, reviewing).</td>
                                    <td>Data Submitter</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Submitted</strong>
                                    </td>
                                    <td>The package has been submitted and is awaiting curation. It is read-only for the Submitter.</td>
                                    <td>Data Curator</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Completed</strong>
                                    </td>
                                    <td>
                                        The Curator has finished reviewing. Approved files are published; rejected files are removed and the
                                        Submitter is emailed the rejection reason.
                                    </td>
                                    <td>&mdash;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Constraints and Tips',
            id: 'submission-constraints',
            state: 'submissionWorkflow',
            content: (
                <>
                    <ul>
                        <li className={classes.tutorialListItem}>
                            <strong>A study must exist first.</strong> You cannot upload data without a registered study to attach it to.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Submitters work within their own center.</strong> You can register and submit only for studies belonging
                            to your center.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Validation must pass.</strong> Files that fail the required format checks cannot move forward. Download the
                            validation results, correct the files, and re-upload.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Submitting locks the package.</strong> After you submit, you cannot edit until the Curator completes their
                            review. If something is wrong, wait for the decision (or contact a Curator) rather than expecting to edit in place.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Set the access level before publication.</strong> Approved files become available according to the
                            study&apos;s access level (Public / Limited / Private). Confirm it is correct before the Curator publishes.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <strong>Email keeps both sides informed.</strong> You receive a confirmation when you submit and a processed
                            notification when the Curator decides — no need to refresh the dashboard repeatedly.
                        </li>
                    </ul>
                </>
            ),
            subSections: [],
        },
    ],
};
