import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import Modal from '../../../components/GeneralModal/GeneralModal';
import { DataDictionaryViewer } from '@cyouh95/data-dictionary-viewer';
import '@cyouh95/data-dictionary-viewer/style.css';

/**
 * Modal for Data Dictionaty Visualizer on Study Overview page
 *
 * Maintained by Stanford, POCs: Luna Baalbaki & Crystal Han
 * The method of importing and instantiation came from troubleshooting with Stanford. Please be cautious when making changes.
 *
 * Repo: https://github.com/bmir-radx/data-dictionary-viewer-component
 *
 * @property {Boolean} visible - Flag to show/hide modal
 * @property {Function} closeModal - Function to close/hide modal
 * @property {String} dict - Data dictionary file to be visualized
 * @returns {Node} object rendering the Data Dictionary Visualizer Modal
 */

const DictionaryVisualizerModal = (props) => {
    const { visible, closeModal, dictFile } = props;

    const bodyComp = (
        <div className={classes.modalBody}>
            <DataDictionaryViewer data={dictFile} />
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
                title="Visualize Data Dictionary"
                bodyChildren={bodyComp}
                dialogClassName={classes.bigModal}
            />
        </>
    );
};

DictionaryVisualizerModal.propTypes = {
    closeModal: PropTypes.func,
    dictFile: PropTypes.string,
    visible: PropTypes.bool,
};

export default DictionaryVisualizerModal;
