import React from 'react';
import PropTypes from 'prop-types';
import { Card as CardComponent } from 'react-bootstrap';
import classes from './Card.module.scss';
import Image from 'next/legacy/image';

/**
 * A visual container for other visual React components.
 * * See https://react-bootstrap.github.io/components/cards/ for examples and documentation
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String | Element} [title=''] - Title in the header of the Card - could be string or react element
 * @property {String} [subtitle=''] - Subtitle in the header of the Card
 * @property {Node} children - Contains any element being rendered within the Card's body
 * @property {String} [size] - (Unused) Changes the size style to one of our presets 'small', 'medium', 'large', or 'auto' if nothing is passed through
 * @property {Boolean} [selected] - (Unused) Shows the selected border around the Card
 * @property {Boolean} [image] - source path of an image to be added above the header (usually used for homepage cards)
 * @property {String} [variant] - changes the style of the card for the 4 types of card (result, facet, detail, and blog)
 * @property {String} [modification] - changes the style of the card. Currently used to denote a colored background with whiteText
 * @property {String} [bodyHeight] - defines height of the card's body. Usually used with scroll
 * @property {Boolean} [scroll] - denotes if card body should be scrollable. Usually used with bodyHeight
 * @property {String} [bkgdColor] - sets background color of card body (usually used with modification=colored)
 * @property {String} [headerImg] - sets the background image for card header
 * @property {String} [headerColor] - sets the background color for card header
 * @property {Boolean} [footer] - adds a footer to the bottom of the card
 * @property {String} [cardClassOverride] - styling override from parent component
 * @returns {JSX} A Card React Component
 */

const Card = (props) => {
    const {
        title,
        subtitle,
        children,
        size,
        selected,
        image,
        variant,
        modification,
        bodyHeight,
        scroll,
        bkgdColor,
        headerImg,
        headerColor,
        footer,
        cardClassOverride,
    } = props;
    let cardClass = cardClassOverride || classes.card;
    let cardBody;
    let cardHeader;
    let cardSubtitle;
    let cardFooter;
    let cardImage;
    cardClass += selected ? ` ${classes.selected}` : '';

    switch (variant) {
        case 'result':
            cardClass += ` ${classes.result}`;
            cardBody += ` ${classes.resultBody}`;
            break;
        case 'facet':
            cardClass += ` ${classes.facet}`;
            cardBody += ` ${classes.facetBody}`;
            cardHeader += ` ${classes.facetHeader}`;
            break;
        case 'detail':
            // Unused for now
            // cardClass += ` ${classes.detail}`;
            // cardBody += ` ${classes.detailBody}`;
            break;
        case 'blog':
            cardClass += ` ${classes.blog}`;
            cardHeader += ` ${classes.blogHeader}`;
            cardSubtitle += ` ${classes.blogSubtitle}`;
            cardImage += ` ${classes.blogImage}`;
            cardFooter += ` ${classes.blogFooter}`;
            break;
        case 'info':
            cardClass += ` ${classes.info}`;
            cardBody += ` ${classes.infoBody}`;
            cardHeader += ` ${classes.infoHeader}`;
            cardFooter += ` ${classes.infoFooter}`;
            break;
        case 'resource':
            cardClass += ` ${classes.resource}`;
            cardBody += ` ${classes.resourceBody}`;
            cardHeader += ` ${classes.resourceHeader}`;
            cardFooter += ` ${classes.resourceFooter}`;
            break;
        case 'advSearch':
            cardClass += ` ${classes.advSearch}`;
            cardBody += ` ${classes.advSearchBody}`;
            break;
        case 'noResults':
            cardClass += ` ${classes.noResults}`;
            cardBody += ` ${classes.noResultsBody}`;
            cardHeader += ` ${classes.noResultsHeader}`;
            cardFooter += ` ${classes.noResultsFooter}`;
            break;
    }

    switch (modification) {
        case 'colored':
            cardClass += ` ${classes.colored}`;
    }

    switch (scroll) {
        case true:
            cardBody += ` ${classes.scrollable}`;
    }

    // Unused at the moment.  We do not have uniform design for size.
    // Maybe this can be used instead for responsive design later on?
    switch (size) {
        case 'small':
            cardClass += ` ${classes.small}`;
            break;
        case 'medium':
            cardClass += ` ${classes.medium}`;
            break;
        case 'large':
            cardClass += ` ${classes.large}`;
            break;
    }

    return (
        <CardComponent className={cardClass}>
            {title && (
                <CardComponent.Header
                    className={cardHeader}
                    style={{ backgroundImage: headerImg ? `url(${headerImg})` : '', backgroundColor: headerColor }}
                >
                    <span>{title}</span>
                    {subtitle && <CardComponent.Subtitle className={cardSubtitle}>{subtitle}</CardComponent.Subtitle>}
                </CardComponent.Header>
            )}
            {image && <Image priority className={cardImage} src={image.src} height={image.height} width={image.width} alt={image.alt} />}
            {children && (
                <CardComponent.Body className={cardBody} style={{ backgroundColor: bkgdColor ? `${bkgdColor}` : '', height: bodyHeight }}>
                    {children}
                </CardComponent.Body>
            )}
            {footer && (
                <CardComponent.Footer className={cardFooter} style={{ backgroundColor: bkgdColor ? `${bkgdColor}` : '' }}>
                    {footer}
                </CardComponent.Footer>
            )}
        </CardComponent>
    );
};

Card.propTypes = {
    bkgdColor: PropTypes.string,
    bodyHeight: PropTypes.string,
    cardClassOverride: PropTypes.string,
    children: PropTypes.node,
    footer: PropTypes.node,
    headerColor: PropTypes.string,
    headerImg: PropTypes.string,
    image: PropTypes.object,
    modification: PropTypes.oneOf(['colored']),
    scroll: PropTypes.bool,
    selected: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    subtitle: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    variant: PropTypes.oneOf(['result', 'blog', 'detail', 'facet', 'info', 'resource', 'advSearch', 'noResults']),
};

export default Card;
