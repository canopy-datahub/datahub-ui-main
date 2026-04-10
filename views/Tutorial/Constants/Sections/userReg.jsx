import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';
import figure1Login from '../../images/UserReg/login/figure1Login.png';
import figure1UserReg from '../../images/UserReg/createAccount/figure1UserReg.png';
import figure2UserReg from '../../images/UserReg/createAccount/figure2UserReg.png';

export const userReg = {
    mainTitle: 'User Registration',
    state: 'userReg',
    sections: [
        {
            title: 'Create An Account',
            id: 'create-an-account',
            state: 'userReg',
            content: (
                <>
                    <p>
                        To create a Canopy account, you will register directly on the platform using your email address and a
                        password. Follow the steps below to register:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Click <strong>Login</strong> in the top right corner of any page. You will be directed to the Canopy
                            sign-in page (Figure 1).
                        </li>
                        <div className={`${classes.tutorialImg} ${classes.tutorialImgXXSmall}`}>
                            <Image src={figure1Login} alt="Figure 1: Canopy Sign-In Page" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 1: Canopy Sign-In Page</figcaption>
                        <li className={classes.tutorialListItem}>
                            If you are a new user, click the <strong>Register</strong> link at the bottom of the sign-in page
                            (shown as &ldquo;New user? Register&rdquo;). A registration form will appear (Figure 2).
                        </li>
                        <div className={`${classes.tutorialImg} ${classes.tutorialImgXXSmall}`}>
                            <Image src={figure1UserReg} alt="Figure 2: Registration Form" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 2: Registration Form</figcaption>
                        <li className={classes.tutorialListItem}>
                            Fill in all required fields marked with an asterisk (*):
                            <ul>
                                <li className={classes.tutorialListItem}><strong>Email</strong> — your institutional or personal email address</li>
                                <li className={classes.tutorialListItem}><strong>Password</strong> — choose a secure password</li>
                                <li className={classes.tutorialListItem}><strong>Confirm password</strong> — re-enter your password</li>
                                <li className={classes.tutorialListItem}><strong>First name</strong></li>
                                <li className={classes.tutorialListItem}><strong>Last name</strong></li>
                            </ul>
                        </li>
                        <li className={classes.tutorialListItem}>
                            Click <strong>Register</strong>. The system will create your account and log you in automatically.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Upon your first login, an <strong>Edit Profile</strong> window will automatically appear (Figure 3).
                            Complete your researcher profile by filling in the required fields:
                            <ul>
                                <li className={classes.tutorialListItem}><strong>Job Title / Position</strong> (required)</li>
                                <li className={classes.tutorialListItem}>
                                    <strong>ORCID ID #</strong> (optional) — a unique identifier for researchers;{' '}
                                    <a target="_blank" rel="noopener noreferrer" href="https://orcid.org/">
                                        learn more at orcid.org
                                    </a>
                                </li>
                                <li className={classes.tutorialListItem}><strong>Institution</strong> (required) — select from the dropdown</li>
                                <li className={classes.tutorialListItem}><strong>Researcher Level</strong> (required) — select from the dropdown</li>
                            </ul>
                        </li>
                        <div className={`${classes.tutorialImg} ${classes.tutorialImgXXSmall}`}>
                            <Image src={figure2UserReg} alt="Figure 3: Edit Profile Modal" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 3: Edit Profile Modal</figcaption>
                        <li className={classes.tutorialListItem}>
                            Click <strong>Submit</strong> to save your profile. You will be taken to the Canopy home page and your
                            account setup will be complete.
                        </li>
                    </ol>
                    <i className={classes.tutorialListItem}>
                        Note: You can update your profile at any time by clicking your name in the top navigation bar and
                        selecting &ldquo;Edit Profile.&rdquo;
                    </i>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Login to the Site',
            id: 'login-to-your-account',
            state: 'userReg',
            content: (
                <>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Click <strong>Login</strong> in the top right corner of any page. You will be directed to the Canopy
                            sign-in page (Figure 1).
                        </li>
                        <div className={`${classes.tutorialImg} ${classes.tutorialImgXXSmall}`}>
                            <Image src={figure1Login} alt="Figure 1: Canopy Sign-In Page" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 1: Canopy Sign-In Page</figcaption>
                        <li className={classes.tutorialListItem}>
                            Enter your registered <strong>Email</strong> address and <strong>Password</strong>, then click{' '}
                            <strong>Sign In</strong>. The system will redirect you to the home page.
                        </li>
                    </ol>
                    <i>
                        Note: If you have forgotten your password, click the <strong>Forgot Password?</strong> link on the
                        sign-in page to reset it via email.
                    </i>
                </>
            ),
            subSections: [],
        },
    ],
};
