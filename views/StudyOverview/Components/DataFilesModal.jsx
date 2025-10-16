/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Modal from '../../../components/GeneralModal/GeneralModal';
import Link from 'next/link';
import { GET_RESOURCE_CENTER_BUCKET } from '../../../constants/apiRoutes';

/**
 * Modal for How to Use Data Files on Study Overview page
 *
 * @property {Boolean} visible - Flag to show/hide modal
 * @property {Function} closeModal - Function to close/hide modal
 * @property {String} baseUrl - Used for resource download link
 * @returns {Node} object rendering the Data Files Modal
 */
const DataFilesModal = (props) => {
    const { visible, closeModal, baseUrl } = props;

    const bodyComp = (
        <div className={classes.modalBody}>
            <div>
                In the site, data is harmonized, or re-labeled and re-coded, so data can be uniformly interpreted across multiple studies.
            </div>
            <div>
                Most studies provide two types of data files:
                <ul>
                    <li>
                        <b>Harmonized files</b> (<span className={classes.codeBlock}>transformcopy</span>)
                    </li>
                    <li>
                        <b>Non-harmonized files</b> (<span className={classes.codeBlock}>origcopy</span>)
                    </li>
                </ul>
            </div>
            <div>
                If a file with <span className={classes.codeBlock}>transformcopy</span> exists, there will be a corresponding file with{' '}
                <span className={classes.codeBlock}>origcopy</span>. Generally, you only need one type of file for your analysis. Choose
                based on your processing goals and whether you need to compare across the programs.
            </div>
            <div>
                For more information about data files and harmonization, view the{' '}
                <a href="/" target="_blank" rel="noopener noreferrer">
                    Data Files video
                </a>{' '}
                or{' '}
                <a href="" target="_blank" rel="noopener noreferrer">
                    File Organization document
                </a>
                .
            </div>
            <div>
                <p>
                    If you have further questions, please fill out a <Link href="/support">Support Request</Link>.
                </p>
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
                title="How to Use Data Files"
                bodyChildren={bodyComp}
                dialogClassName={classes.modal}
            />
        </>
    );
};

DataFilesModal.propTypes = {
    baseUrl: PropTypes.string,
    closeModal: PropTypes.func,
    visible: PropTypes.bool,
};

export default DataFilesModal;
