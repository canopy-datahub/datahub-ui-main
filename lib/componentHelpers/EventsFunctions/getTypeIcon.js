import MeetingIcon from '../../../components/Images/svg/MeetingIcon';
import CalendarIcon from '../../../components/Images/svg/CalendarIcon';
import WebinarIcon from '../../../components/Images/svg/WebinarIcon';

/**
 * Function to determine appropriate event type icon on the Homepage and Events page
 * @param {String} type - event type
 * @param {String} width - icon width
 * @param {String} height - icon height
 * @param {String} fill - icon fill color
 * @returns {JSX} - Icon SVG
 */

export const getTypeIcon = (type, width, height, fill) => {
    switch (type) {
        case 'webinar':
            return <WebinarIcon width={width} height={height} fill={fill} />;
        case 'general event':
            return <CalendarIcon width={width} height={height} fill={fill} />;
        case 'dcc meeting':
            return <MeetingIcon width={width} height={height} fill={fill} />;
        default:
            return <CalendarIcon width={width} height={height} fill={fill} />;
    }
};