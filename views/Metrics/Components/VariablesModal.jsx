import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import Modal from '../../../components/GeneralModal/GeneralModal';

/**
 * Modal for Variables Modal
 *
 * @property {Boolean} visible - Flag to show/hide modal
 * @property {Function} closeModal - Function to close/hide modal
 * @property {String} variablesList - List of variables
 * @returns {Node} object rendering the Variables Modal
 */
const VariablesModal = (props) => {
    const { visible, closeModal, variablesList } = props;
    const variablesArray = variablesList.split(',').sort();

    const renderVariables = variablesArray.map((variable) => {
        return <li key={variable}>{variable}</li>;
    });

    const bodyComp = (
        <div className={classes.modalBody}>
            <div>
                <ul className={classes.variablesList}>{renderVariables}</ul>
            </div>
        </div>
    );

    return (
        <>
            <Modal
                show={visible}
                onHide={() => {
                    closeModal();
                }}
                closable={true}
                title={`Variables`}
                bodyChildren={bodyComp}
                dialogClassName={classes.bigModal}
            />
        </>
    );
};

VariablesModal.propTypes = {
    closeModal: PropTypes.func,
    variablesList: PropTypes.string,
    visible: PropTypes.bool,
};

export default VariablesModal;
