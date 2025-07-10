import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import Modal from '../../../components/GeneralModal/GeneralModal';
import Template from '../Misc/template.json';

/**
 * Modal for Metadata Visualizer on Study Overview page
 *
 * cedar-embeddable-editor is maintained by Stanford, POC: Mete Akdogan
 * The method of importing and instantiation came from troubleshooting with Stanford. Please be cautious when making changes.
 *
 * Dynamic Imports: https://stackoverflow.com/questions/66096260/why-am-i-getting-referenceerror-self-is-not-defined-when-i-import-a-client-side
 *
 * @property {Boolean} visible - Flag to show/hide modal
 * @property {Function} closeModal - Function to close/hide modal
 * @property {String} metadataFile - Metadata file to be visualized
 * @returns {Node} object rendering the Metadata Visualizer Modal
 */
const MetadataVisualizerModal = (props) => {
    const { visible, closeModal, metadataFile } = props;

    // Dynamic Import
    useEffect(() => {
        const initCedar = async () => {
            await import('cedar-embeddable-editor');
        };
        initCedar();
    }, []);

    useEffect(() => {
        if (visible) {
            let cee = document.querySelector('cedar-embeddable-editor');
            cee.loadConfigFromURL('../cedarConfig.json');

            cee.templateAndInstanceObject = { templateObject: Template, instanceObject: metadataFile };
        }
    }, [visible]);

    const bodyComp = (
        <div className={classes.modalBody}>
            <cedar-embeddable-editor />
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
                title="Visualize Metadata"
                bodyChildren={bodyComp}
                dialogClassName={classes.bigModal}
            />
        </>
    );
};

MetadataVisualizerModal.propTypes = {
    closeModal: PropTypes.func,
    metadataFile: PropTypes.string,
    visible: PropTypes.bool,
};

export default MetadataVisualizerModal;
