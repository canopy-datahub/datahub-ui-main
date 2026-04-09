import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './BadgeSection.module.scss';
import Button from '../../../../../components/Button/Button';
import DeleteCircleIcon from '../../../../../components/Images/svg/DeleteCircleIcon';

/**
 *
 * @property {String} badge - Text detailing what the badge is
 * @property {Array} badgeList - READ ONLY - Array of all of the badges, used to manage deleting the badges.
 * @property {Function} setBadges - useState function to change badgeList.  Used here for deleting badges.
 * @property {String} fieldName - Form field that this badge corresponds to
 * @property {Function} setValue - react hook forms function to set the value of a field. See https://react-hook-form.com/docs/useform/setvalue for documentation.
 * @returns {Node} an individual badge.
 */

const Badge = (props) => {
    const { badge, badgeList, setBadges, fieldName, setValue } = props;
    const [circleColor, setCircleColor] = useState('local');
    const [circleBorder, setCircleBorder] = useState('local');

    return (
        <div aria-label="Filter Badge" className={classes.badge}>
            <div className={classes.column}>
                <div className={classes.textContainer}>
                    <span className={classes.badgeText}>{badge}</span>
                </div>
                <div className={classes.delete}>
                    <Button
                        size="none"
                        ariaLabel={`Remove ${badge} from your filters`}
                        onMouseOver={() => {
                            setCircleColor('#FFFFFF');
                            setCircleBorder('#000000');
                        }}
                        onMouseLeave={() => {
                            setCircleColor('local');
                            setCircleBorder('local');
                        }}
                        iconCenter={
                            <DeleteCircleIcon
                                circleBorder={circleBorder}
                                circleFill={circleColor}
                                xColor={'#000000'}
                                dimensions={{ x: '30', y: '20' }}
                            />
                        }
                        className={classes.closeButton}
                        handleClick={() => {
                            const found = badgeList.findIndex((badgeFromList) => badgeFromList === badge);
                            const tempBadges = badgeList;
                            tempBadges.splice(found, 1);
                            setBadges([...tempBadges]);
                            setValue(fieldName, '', { shouldDirty: true });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

Badge.propTypes = {
    badge: PropTypes.string,
    badgeList: PropTypes.array,
    fieldName: PropTypes.string,
    setBadges: PropTypes.func,
    setValue: PropTypes.func,
};

export default Badge;
