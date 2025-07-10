import figure1UserSupport from '../../images/UserSupport/figure1UserSupport.png';
import figure2UserSupport from '../../images/UserSupport/figure2UserSupport.png';
import figure3UserSupport from '../../images/UserSupport/figure3UserSupport.png';
import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';

export const userSupport = {
    mainTitle: 'User Support',
    state: 'userSupport',
    sections: [
        {
            title: 'General',
            id: 'general-us',
            state: 'userSupport',
            content: (
                <>
                    <p>
                        The Support Team can answer questions for various topics, such as technical issues and bugs, questions about analytics
                        tools, feature requests, and more. You can reach our support team by using the support form, which is available from any page
                        in the application. To contact our support team, follow these steps:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Create a support request clicking “Contact Us” on the navigation bar or in the footer. This will redirect you to the User Support Request Form.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure1UserSupport} alt="Figure 1: Contact Us Link in Navigation Bar" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 1: "Contact Us" Link in Navigation Bar</figcaption>
                        <li className={classes.tutorialListItem}>Complete the required fields, indicated with an asterisk</li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure2UserSupport} alt="Figure 2: Support Request Form" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 2: Support Request Form</figcaption>
                        <li className={classes.tutorialListItem}>
                            Choose the appropriate option under "Request Type" to route the request
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure3UserSupport} alt="Figure 3: Request Type Dropdown" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 3: Request Type Dropdown</figcaption>
                        <ul>
                            <li className={classes.tutorialListItem}>
                                <i>General Feedback -</i> Provide Data Hub site feedback
                            </li>
                            <li className={classes.tutorialListItem}>
                                <i>Technical -</i> Report bugs or other technical problems
                            </li>
                            <li className={classes.tutorialListItem}>
                                <i>Feature Request -</i> Provide new feature suggestions
                            </li>
                            <li className={classes.tutorialListItem}>
                                <i>Engagement -</i> Request a RADx Data Hub training, presentation, or demonstration
                            </li>
                            <li className={classes.tutorialListItem}>
                                <i>Workbench Support -</i> Request help on the Analytics Workbench
                            </li>
                        </ul>
                        <li className={classes.tutorialListItem}>Under “Request Title,” briefly describe the request</li>
                        <li className={classes.tutorialListItem}>Provide specific details about the request under “Request Details”</li>
                        <li className={classes.tutorialListItem}>
                            Click “Submit” to complete the support request. You will receive an automated email confirming
                            the Support Team received the request. This will include the ticket number and any further instructions. Soon after
                            submission, a member of the Support Team will contact you with further questions or possible resolutions.
                        </li>
                    </ol>
                </>
            ),
            subSections: [],
        },
    ],
};
