import React, { useState } from 'react';
import { Accordion as BSAccordion } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import classes from './Accordion.module.scss';
import ChevronDownIcon from '../Images/svg/ChevronDownIcon';

//TODO: Make a sass class passthrough so you can size these correctly

/**
 * Interactable Bootstrap Accordion Component
 * * See https://react-bootstrap.github.io/components/accordion/ for examples and documentation
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} [title] - Title in the header of the Accordion
 * @property {Node} children - Contains any element being rendered within the Accordion's body
 * @property {String} [eventKey='0'] - ID that controls the click event for opening the Accordion.  Needs to be unique.
 * @property {String} [key] - String that identifies a key that will toggle the show state of the accordion.
 * @property {String | Array <String>} [defaultActiveKey] - ID that controls opening and closing without a click event key.
 * @property {String} className - Manually change the styling of the accordion by passing in a className.  Allows the use of custom CSS.
 * @returns {JSX} - Accordion Component
 */

const Accordion = (props) => {
    const { variant, defaultActiveKey, eventKey, title, children, key, className, onSelect } = props;
    let bodyClass, headerClass, itemClass, accordionClass;
    accordionClass = className ? ` ${className}` : '';
    const [show, setShow] = useState('');

    function onKeyPressed(e) {
        if (e.key === 'ArrowDown' && show === '') {
            setShow(show === '' ? 'show' : '');
        }
        if (e.key === 'ArrowUp' && show === 'show') {
            setShow(show === '' ? 'show' : '');
        }
        if (e.key === key) {
            setShow(show === '' ? 'show' : '');
        }
    }

    switch (variant) {
        case 'data':
            bodyClass += ` ${classes.dataBody}`;
            headerClass += ` ${classes.dataHeader}`;
            itemClass += ` ${classes.dataItem}`;
            accordionClass += ` ${classes.dataAccordion}`;
            break;
        case 'advSearch':
            break;
        case 'filter':
            bodyClass += ` ${classes.filterBody}`;
            headerClass += ` ${classes.filterHeader}`;
            itemClass += ` ${classes.filterItem}`;
            accordionClass += ` ${classes.filterAccordion}`;
            break;
        case 'about':
            bodyClass += ` ${classes.aboutBody}`;
            headerClass += ` ${classes.aboutHeader}`;
            itemClass += ` ${classes.aboutItem}`;
            accordionClass += ` ${classes.aboutAccordion}`;
            break;
        case 'faq':
            bodyClass += ` ${classes.faqBody}`;
            headerClass += ` ${classes.faqHeader}`;
            itemClass += ` ${classes.faqItem}`;
            accordionClass += ` ${classes.faqAccordion}`;
            break;
        default:
            bodyClass += ` ${classes.dataBody}`;
            headerClass += ` ${classes.dataHeader}`;
            itemClass += ` ${classes.dataItem}`;
            accordionClass += ` ${classes.dataAccordion}`;
            break;
    }

    return (
        <BSAccordion
            tabIndex="0"
            key={eventKey}
            id={defaultActiveKey}
            defaultActiveKey={defaultActiveKey}
            onKeyDown={onKeyPressed}
            aria-label={title + ' collapsable section'}
            className={accordionClass}
            onSelect={onSelect}
        >
            <BSAccordion.Item eventKey={eventKey} className={itemClass + ' ' + show}>
                <BSAccordion.Header className={headerClass}>{title}</BSAccordion.Header>
                <BSAccordion.Body className={bodyClass}>{children}</BSAccordion.Body>
            </BSAccordion.Item>
        </BSAccordion>
    );
};

Accordion.defaultProps = {
    eventKey: '0',
};

Accordion.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    eventKey: PropTypes.string,
    title: PropTypes.string,
    variant: PropTypes.oneOf(['data', 'filter']),
    onSelect: PropTypes.func,
};
export default Accordion;
