import _ from 'lodash';
import parse from 'html-react-parser';

// join words if needed under one tag, so spaces will be highlighted
export const parseHighlightedText = (text) => {
    const parsedText = text.replace(/<\/mark>[\s\W]<mark>/g, (match) => {
        const char = match.charAt(7);
        return char;
    });
    return parsedText;
};

// formats value text to include substring shortening and highlighting
export const formatValue = (propName, value, highlight, cutOff) => {
    let end = cutOff || 512;

    // prep the value string for highlighting
    if (highlight && highlight[propName]) {
        const highlightedText = highlight[propName][0];
        value = parseHighlightedText(highlightedText);
    }

    // shorten string if needed.
    // check for weirdness from the html string (really just < and /) and include it
    if (value.substring(end - 1, end) === '<' || '/') {
        end += 2;
    }
    // Shorten string
    value = value.substring(0, end);
    // add '...' if the string continues past the end character cutoff.
    if (value.length > end - 1) {
        value += '...';
    }
    // parse to make it turn from a string into proper html
    return parse(value);
};
