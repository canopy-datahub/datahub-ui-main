import { format, isAfter, isBefore, isValid, parse } from 'date-fns';

/**
 * Syncs up the fields on the date picker based on the "From" input
 * @param {*} e - event trigger
 * @param {Function} setFromValue - function to change the value of the 'from' input in the datepicker
 * @param {Function} setSelectedRange - function to change the days selected by the datepicker
 * @param {Object} selectedRange - Object containing your selected days.  This uses a 'to' and 'from' key.
 * @returns changed selectedRange and From value state.  Not a real data return.
 */

export const syncFrom = (e, setFromValue, setToValue, setSelectedRange, selectedRange) => {
    setFromValue(e.target.value);
    if (e.target.value.length === 10) {
        const date = parse(e.target.value, 'MM-dd-yyyy', new Date());
        if (!isValid(date)) {
            return setSelectedRange({ from: undefined, to: undefined });
        }
        if (selectedRange?.to && isAfter(date, selectedRange.to)) {
            setFromValue(format(selectedRange.to, 'MM-dd-yyyy'));
            setToValue(format(date, 'MM-dd-yyyy'));
            return setSelectedRange({ from: selectedRange.to, to: date });
        } else {
            setSelectedRange({ from: date, to: selectedRange?.to });
        }
    }
};

/**
 * Syncs up the fields on the date picker based on the "To" input
 * @param {*} e - event trigger
 * @param {Function} setToValue - function to change the value of the 'to' input in the datepicker
 * @param {Function} setSelectedRange - function to change the days selected by the datepicker
 * @param {Object} selectedRange - Object containing your selected days.  This uses a 'to' and 'from' key.
 * @returns changed selectedRange and To value state.  Not a real data return.
 */
export const syncTo = (e, setToValue, setFromValue, setSelectedRange, selectedRange) => {
    setToValue(e.target.value);
    if (e.target.value.length === 10) {
        const date = parse(e.target.value, 'MM-dd-yyyy', new Date());
        if (!isValid(date)) {
            return setSelectedRange({ from: selectedRange?.from, to: undefined });
        }
        if (selectedRange?.from && isBefore(date, selectedRange.from)) {
            setToValue(format(selectedRange.from, 'MM-dd-yyyy'));
            setFromValue(format(date, 'MM-dd-yyyy'));
            return setSelectedRange({ from: date, to: selectedRange.from });
        } else {
            setSelectedRange({ from: selectedRange?.from, to: date });
        }
    }
};

/**
 * Syncs up the fields based on the date picker selection
 * @param {*} range - event trigger sending back your range
 * @param {Function} setSelectedRange - function to change the days selected by the datepicker
 * @param {Function} setFromValue - function to change the value of the from input in the datepicker
 * @param {Function} setToValue - function to change the value of the 'to' input in the datepicker
 * @returns changed selectedRange state and To and From value states.  Not a real data return.
 */
export const handleDatePickerSync = (range, setSelectedRange, setFromValue, setToValue) => {
    setSelectedRange({ from: range?.from, to: range?.to !== undefined ? range?.to : range?.from } || { from: undefined, to: undefined });

    if (range?.from) {
        setFromValue(format(range.from, 'MM-dd-yyyy'));
    } else {
        setFromValue('');
        setToValue('');
    }
    if (range?.to !== undefined) {
        setToValue(format(range.to, 'MM-dd-yyyy'));
    } else {
        setToValue('');
    }
};
