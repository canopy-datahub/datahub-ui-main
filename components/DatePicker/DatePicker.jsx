/* eslint-disable multiline-ternary */
import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './DatePicker.module.scss';
import { DayPicker } from 'react-day-picker';
import { usePopper } from 'react-popper';
// import { getWeekDays, getWeekRange } from '../../lib/componentHelpers/DatePickerFunctions/WeekPickerFunctions';
import Input from '../Input/Input';
import { Calendar } from 'react-bootstrap-icons';
import Button from '../Button/Button';
import { handleDatePickerSync, syncFrom, syncTo } from '../../lib/componentHelpers/DatePickerFunctions/RangePickerFunctions';
import { format, parse } from 'date-fns';
import { monthAgo } from '../../views/Metrics/Constants/MetricsConstants';

/**
 * DatePicker Component that holds the title of the page along with the Breadcrumb
 * WARN: Documentation in the Day Picker Library sucks and is inconsistently done in both TS/JS and generally deprecated uses of react functions
 * WARN: It works but creating this was not fun
 * WARN: This component WILL rerender a LOT and redeclare useState for no reason, even though other components do not do this.  I blame the library.
 * TODO: Make a document explaining how this works in detail after completing this
 * TODO: Needs proper integration with react hook form without just redefining input component
 * Has the ability for input fields - Documentation https://react-day-picker.js.org/guides/input-fields
 * Has the ability for a week picker variant - Old Documentation https://react-day-picker-v7.netlify.app/examples/selected-week/ with the commented out functions
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} type - type of datepicker you want ['week', 'range', 'single']
 * @property {Function} setSelectedDays - function to change the days selected by the datepicker
 * @property {Object} selectedDays - Object containing your selected days
 * @property {Date} fromMonth - Date containing the first day available to the user on the calendar and disables everything before. eg: new Date(2022, 11)
 * @property {Object} errors - Applies a error message for the user to see
 * @property {Object} readOnly - disables input
 * @returns {JSX} - DatePicker Component
 */

// Note: This is a pretty complex component with a lot of moving parts and states.  Make sure you read the documentation before you change things up.

const DatePicker = forwardRef((props, ref) => {
    const { type, setSelectedDays, selectedDays, fromMonth, errors, readOnly } = props;

    const [isPopperOpen, setIsPopperOpen] = useState(false);

    // Set up the popover card
    /* Note: the usePopper hook intentionally takes the DOM node, not refs,
     in order to be able to update when the nodes change.
     A callback ref is used here to permit this behaviour, and useState is an appropriate way to implement this. */
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [to, setTo] = useState(() => {
        try {
            return format(selectedDays.to, 'MM-dd-yyyy');
        } catch {
            return selectedDays.to;
        }
    });
    const [from, setFrom] = useState(() => {
        try {
            return format(selectedDays.from, 'MM-dd-yyyy');
        } catch {
            return selectedDays.from;
        }
    });
    // const [to, setTo] = useState(selectedDays.to);
    // const [from, setFrom] = useState(selectedDays.from);

    const popper = usePopper(referenceElement, popperElement, {
        placement: 'bottom',
    });

    /**
     * Function to close the popover and reset the focus to the datepicker button
     */
    const closePopper = () => {
        setIsPopperOpen(false);
    };

    const handleButtonClick = () => {
        setIsPopperOpen(!isPopperOpen);
    };

    const syncDatePicker = (e, pickerType, dateType, setInputValue, setSecondaryInput, setSelectedDays, selectedDays) => {
        if (pickerType === 'Range') {
            dateType === 'To'
                ? syncTo(e, setInputValue, setSecondaryInput, setSelectedDays, selectedDays)
                : syncFrom(e, setInputValue, setSecondaryInput, setSelectedDays, selectedDays);
        } else if (type === 'Date') {
            return 0; //syncDate(e, setInputValue, setSelectedDays, selectedDays);
        }
    };

    // const [hoverRange, setHoverRange] = useState(undefined);
    // let modifiers;
    // function handleDayChange(date) {
    //     setSelectedDays(getWeekDays(getWeekRange(date).from));
    // }

    // function handleDayEnter(date) {
    //     setHoverRange(getWeekRange(date));
    // }

    // function handleDayLeave() {
    //     setHoverRange(undefined);
    // }
    // if (type === 'Week') {
    //     const daysAreSelected = selectedDays.length > 0;
    //     modifiers = {
    //         hoverRange,
    //         selectedRange: daysAreSelected && {
    //             from: selectedDays[0],
    //             to: selectedDays[6],
    //         },
    //         hoverRangeStart: hoverRange && hoverRange.from,
    //         hoverRangeEnd: hoverRange && hoverRange.to,
    //         selectedRangeStart: daysAreSelected && selectedDays[0],
    //         selectedRangeEnd: daysAreSelected && selectedDays[6],
    //     };
    // }
    return (
        <>
            <div className={classes.row}>
                <Input
                    label="Start Date"
                    ariaLabel="End Date input with format of 2 digits for month dash 2 digits for day dash 4 digits for year"
                    required
                    containerClass={classes.input}
                    error={errors?.from}
                    controlId="from"
                    value={from}
                    type="text"
                    name="DatePicker"
                    placeholder={'MM-DD-YYYY'}
                    readOnly={readOnly}
                    onChange={(e) => {
                        syncDatePicker(e, type, 'From', setFrom, setTo, setSelectedDays, selectedDays);
                    }}
                />
                <Input
                    label="End Date"
                    ariaLabel="End Date input with format of 2 digits for month dash 2 digits for day dash 4 digits for year"
                    containerClass={classes.input}
                    required
                    error={errors?.to}
                    value={to}
                    controlId="to"
                    type="text"
                    name="DatePicker"
                    placeholder={'MM-DD-YYYY'}
                    readOnly={readOnly}
                    onChange={(e) => {
                        syncDatePicker(e, type, 'To', setTo, setFrom, setSelectedDays, selectedDays);
                    }}
                />
                <Button
                    variant="icon"
                    ref={setReferenceElement}
                    className={classes.openButton}
                    iconCenter={<Calendar />}
                    handleClick={() => {
                        handleButtonClick();
                    }}
                />
            </div>

            {isPopperOpen && (
                <div
                    style={popper.styles.popper}
                    className={classes.dialogSheet}
                    {...popper.attributes.popper}
                    ref={setPopperElement}
                    role="dialog"
                    aria-label="DayPicker calendar"
                >
                    <DayPicker
                        initialFocus={isPopperOpen}
                        mode={type === 'Range' ? 'range' : 'single'}
                        numberOfMonths={2}
                        selected={selectedDays}
                        onSelect={(e) => {
                            handleDatePickerSync(e, setSelectedDays, setFrom, setTo);
                        }}
                        captionLayout="dropdown-buttons"
                        fromMonth={fromMonth}
                        toDate={new Date()}
                        showOutsideDays
                        // modifiers={modifiers}
                        // modifiersClassNames={{
                        //     hoverRange: classes.hoverRange,
                        //     selectedRange: classes.selectedRange,
                        //     selectedRangeStart: classes.selectedRangeStart,
                        //     selectedRangeEnd: classes.selectedRangeEnd,
                        // }}
                        // onDayClick={handleDayChange}
                        // onDayMouseEnter={handleDayEnter}
                        // onDayMouseLeave={handleDayLeave}
                    />
                    <div className={classes.row}>
                        <Button
                            label="Reset"
                            variant="secondary"
                            size="none"
                            className={classes.dateReset}
                            handleClick={() => {
                                handleDatePickerSync(
                                    { from: parse(monthAgo, 'yyyy-MM-dd', new Date()), to: new Date() },
                                    setSelectedDays,
                                    setFrom,
                                    setTo
                                );
                            }}
                        />
                        <Button
                            label="Close"
                            size="none"
                            variant="primary"
                            className={classes.dateConfirm}
                            handleClick={() => {
                                closePopper();
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
});

DatePicker.displayName = 'DatePicker';

DatePicker.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.shape({
        from: PropTypes.any,
        to: PropTypes.any,
    }),
    fromMonth: PropTypes.instanceOf(Date).isRequired,
    readOnly: PropTypes.bool,
    selectedDays: PropTypes.shape({
        from: PropTypes.any,
        length: PropTypes.number,
        to: PropTypes.any,
    }).isRequired,
    setSelectedDays: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
};

export default DatePicker;
