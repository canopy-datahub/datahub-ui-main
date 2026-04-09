import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BSModal } from 'react-bootstrap';
import classes from './GeneralModal.module.scss';

/**
 * General Modal Component that opens with a button
 * See https://react-bootstrap.github.io/components/modal/ for examples and documentation on Modals
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} [size='md'] - Size style passthrough.  Options are "lg", "md", and "sm"
 * @property {Boolean} show - This variable shows the moedal if true. Manage this with setShow in the parent component.
 * @property {Boolean} [backdrop=false] - Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
 * @property {Boolean} [keyboard=true] - Close the modal when escape key is pressed
 * @property {Function} [onHide] - A callback fired when the header closeButton or non-static backdrop is clicked. Required if either are specified.
 * @property {String} [ariaLabel=''] - Replaces what is read to the screenreader
 * @property {Boolean} [centered] - vertically center the Dialog in the window
 * @property {Boolean} [closable] - Specify whether the Component should contain a close button
 * @property {JSX} children - Any Component rendered within the body of the Modal
 * @property {String} [title] - A String that displays in the Header of the Modal
 * @property {JSX} bodyChildren - Content to be placed inside the Modal.Body
 * @property {JSX} footerChildren - Content to be placed inside the Modal.Footer
 * @property {string} dialogClassName - Css styling used for the Modal
 * @property {Boolean} formInstructions - Flag to display generic form instructions
 * @returns {JSX} Modal Component
 */

const Modal = ({
    size,
    show,
    backdrop,
    keyboard,
    onHide,
    ariaLabel,
    centered,
    closable,
    title,
    bodyChildren,
    footerChildren,
    dialogClassName,
    formInstructions,
}) => {
    const dialogClassStyle = `${dialogClassName}`;

    return (
        <>
            <BSModal
                size={size}
                show={show}
                backdrop={backdrop}
                keyboard={keyboard}
                onHide={onHide}
                aria-labelledby={ariaLabel}
                centered={centered}
                className={classes.modal}
                dialogClassName={dialogClassStyle}
                contentClassName={classes.content}
            >
                <div className={classes.modalContainer}>
                    <BSModal.Header closeButton={closable} closeVariant="white" className={classes.header}>
                        <span className={classes.title}>{title}</span>
                    </BSModal.Header>
                    <BSModal.Body className={classes.body}>
                        <div>
                            {formInstructions && (
                                <div className={classes.instructions}>
                                    All fields marked with asterisk (<span className={classes.red}>*</span>) are required.
                                </div>
                            )}
                            {bodyChildren}
                        </div>
                    </BSModal.Body>
                    {footerChildren && <BSModal.Footer className={classes.footer}>{footerChildren}</BSModal.Footer>}
                </div>
            </BSModal>
        </>
    );
};

Modal.defaultProps = {
    className: '',
    title: '',
    closable: true,
};

Modal.propTypes = {
    ariaLabel: PropTypes.string,
    backdrop: PropTypes.bool,
    bodyChildren: PropTypes.node,
    centered: PropTypes.bool,
    closable: PropTypes.bool,
    dialogClassName: PropTypes.string,
    footerChildren: PropTypes.node,
    formInstructions: PropTypes.bool,
    keyboard: PropTypes.bool,
    onHide: PropTypes.func,
    show: PropTypes.bool,
    size: PropTypes.string,
    title: PropTypes.string,
};

export default Modal;
