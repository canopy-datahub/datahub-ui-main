/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Modal from '../../../components/GeneralModal/GeneralModal';
import InfoIcon from '../../../components/Images/svg/InfoIcon';
import Accordion from 'react-bootstrap/Accordion';
/**
 * Modal for How to Request Access on Study Overview page
 *
 * @property {Boolean} visible - Flag to show/hide modal
 * @property {Function} closeModal - Function to close/hide modal
 * @property {Object} rapidsLink - Link for this study in the RAPIDS platform if it is a DHT study
 * @returns {Node} object rendering the Request Access Modal
 */
const RequestAccessModal = (props) => {
    const { visible, closeModal, rapidsLink, dbGapLink } = props;

    const accordionContent = [
        {
            name: '1. Check the requirements',
            content: [
                {
                    item: (
                        <div>
                            Requestors must have a NIH eRA Commons ID (or appropriate NIH Login). If you need an account, request one
                            through your institution’s Office of Sponsored Research (or equivalent).{' '}
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Click here
                            </a>{' '}
                            to learn more about eRA Commons and dbGaP accounts.
                        </div>
                    ),
                },
                {
                    item: (
                        <div>
                            <b>
                                Requestors must be permanent employees of their institution at a level equivalent to a tenure-track
                                professor or senior scientist with responsibilities that most likely include laboratory administration and
                                oversight.
                            </b>{' '}
                            Non-PI users such as laboratory staff and trainees such as graduate students, and postdoctoral fellows must have
                            a PI at their institution submit a request and add them as a downloader after dbGaP approval.{' '}
                            <a href="" target="_blank" rel="noopener noreferrer">
                                Click here
                            </a>{' '}
                            for instructions to add data downloaders.
                        </div>
                    ),
                },
            ],
        },
        {
            name: '2. Prepare a list of studies for the request',
            content: [
                {
                    item: (
                        <div>
                            Record each study’s dbGaP Study Accession (phs) number – found at the top of the Study Overview page, or on the
                            Study Explorer. Later, you will search for and add these numbers in the dbGaP controlled-access portal.
                        </div>
                    ),
                },
                {
                    item: (
                        <div>
                            If you are planning to access all studies from a RADx program (RADx Digital Health Technologies (RADx-DHT), RADx
                            Radical (RADx-rad), RADx Tech, or RADx Underserved Populations (RADx-UP)), use the corresponding RADx program
                            dbGaP collection listed below. These study collections contain all the studies in dbGaP for General Research Use
                            (GRU). If you are only using a subset of studies from a RADx program, follow directions in Step 2.a.
                            
                        </div>
                    ),
                },
            ],
        },
        {
            name: '3. Submit the request in the dbGaP controlled-access portal',
            content: [
                {
                    item: (
                        <div>
                            Navigate to the{' '}
                            <a href="" target="_blank" rel="noopener noreferrer">
                                dbGaP controlled-access portal
                            </a>
                            , and login using your eRA Commons credentials.
                        </div>
                    ),
                },
                {
                    item: <div>Navigate to My Projects, and create a new project.</div>,
                },
                {
                    item: (
                        <div>
                            In the Choose Datasets or Confirm Datasets tabs, select the studies or collections you want to add to the Data
                            Access Request by entering the dbGap Study/Collection Accession ID in the Study Lookup box. You can request up
                            to 200 studies. Select all datasets you have decided to include using the checkbox and move to the next step by
                            clicking on “Add Selected and Continue”.
                        </div>
                    ),
                },
                {
                    item: <div>Fill out the remaining request.</div>,
                },
            ],
        },
    ];

    const studyLink = ``;

    const note = rapidsLink ? (
        <p>
            <b>Note:</b> Data for this study is stored in a separate repository, RAPIDS. After you obtain dbGaP approval to access the data,
            navigate to the{' '}
            <a href={rapidsLink.propertyValue[0]} target="_blank" rel="noreferrer noopener">
                RAPIDS repository
            </a>{' '}
            to access the approved data.
        </p>
    ) : (
        <p>
            <b>Note:</b> After you obtain dbGaP approval to access RADx data, use the same eRA or NIH account used in dbGaP to log into the
            RADx Data Hub and access the approved data.
        </p>
    );

    const bodyComp = (
        <div className={classes.modalBody}>
            <div className={classes.upperContainer}>
                <div className="pe-3 pt-2">
                    <InfoIcon fontColor="#868686" circleColor="#DBE7E9" width="30px" height="30px" />
                </div>
                <div>
                    <div>
                        To access RADx Data Hub data, users must submit a project request through dbGaP. To ensure the smoothest request
                        process:
                    </div>
                    <div>
                        <Accordion defaultActiveKey={['0']} alwaysOpen className={classes.accordions}>
                            {accordionContent.map((accordion, index) => {
                                return (
                                    <Accordion.Item eventKey={index} key={accordion.name}>
                                        <Accordion.Header>{accordion.name}</Accordion.Header>
                                        <Accordion.Body>
                                            <ol type="a">
                                                {accordion.content.map((item, index) => {
                                                    return <li key={`accordion-${index}`}>{item.item}</li>;
                                                })}
                                            </ol>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                );
                            })}
                        </Accordion>
                    </div>
                </div>
            </div>
            <div>
                <p>
                    For guidance on the development of a data access request to complete project requests, please see{' '}
                    <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Tips for preparing a successful Data Access Request
                    </a>
                    .
                </p>
                {note}
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
                title="How to Request Access"
                bodyChildren={bodyComp}
                dialogClassName={classes.modal}
            />
        </>
    );
};

RequestAccessModal.propTypes = {
    closeModal: PropTypes.func,
    rapidsLink: PropTypes.shape({
        label: PropTypes.string,
        propertyValue: PropTypes.arrayOf(PropTypes.string),
    }),
    visible: PropTypes.bool,
};

export default RequestAccessModal;
