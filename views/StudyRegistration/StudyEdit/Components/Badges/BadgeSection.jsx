import React from 'react';
import PropTypes from 'prop-types';
import classes from './BadgeSection.module.scss';
import Badge from './Badge';

/**
 *
 * @property {Array} badgeList - READ ONLY - List of all of the badges string representations
 * @property {Function} setBadges - useState Function to change badgeList
 * @property {String} fieldName - Form field this badge section corresponds with
 * @property {Function} setValue - react hook forms function to set the value of a field. See https://react-hook-form.com/docs/useform/setvalue for documentation.
 * @returns
 */

const BadgeSection = (props) => {
    const { badgeList, setBadges, fieldName, setValue } = props;

    const body = [];
    if (!Array.isArray(badgeList)) {
        setBadges([badgeList]);
    } else {
        for (const badge of badgeList) {
            body.push(
                <Badge key={badge} badge={badge} badgeList={badgeList} setBadges={setBadges} fieldName={fieldName} setValue={setValue} />
            );
        }
    }

    return <div className={classes.badgeSection}>{body}</div>;
};

BadgeSection.propTypes = {
    badgeList: PropTypes.array,
    fieldName: PropTypes.string,
    setBadges: PropTypes.func,
    setValue: PropTypes.func,
};

export default BadgeSection;
