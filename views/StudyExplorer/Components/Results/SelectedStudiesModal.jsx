import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import Modal from '../../../../components/GeneralModal/GeneralModal';
import Button from '../../../../components/Button/Button';
import Tooltip from '../../../../components/Tooltip/Tooltip';
import Link from 'next/link';
import { buildSearchQuery } from '../../../../lib/utils/searchQueryBuilder';
import { useRouter } from 'next/router';
import Table from '../../../../components/Table/Table';
import InfoIcon from '../../../../components/Images/svg/InfoIcon';
import Accordion from 'react-bootstrap/Accordion';

/**
 * Modal for Cross Entity List Modal on Study Explorer page
 *
 * @property {Boolean} visible - Flag to show/hide modal
 * @property {Function} closeModal - Function to close/hide modal
 * @property {Array} list - Variable's list of studies for modal
 * @property {String} listLabel - Label for the related cross entity list
 * @property {String} selectedVariable - Selected variable to be used for search button
 * @property {String} selectedStudy - Selected study to be used for search button
 * @property {Function} setSorting - Function to set new sorting. Used for search button
 * @property {Function} setPagination - Function to set new pagination. Used for search button
 * @property {String} view - Current view
 * @returns {Node} object rendering the Request Access Modal
 */
const SelectedStudiesModal = (props) => {
    const { visible, closeModal, selectedStudies } = props;
    const router = useRouter();

    const selectStudiesTableColumns = [
        {
            id: 'title',
            accessorKey: 'title',
            cell: (info) => info.getValue(),
            header: 'Study Name',
            alignLeft: true,
            size: 400,
        },
        {
            id: 'phs',
            accessorKey: 'phs',
            cell: (info) => info.getValue(),
            header: 'dbGap Study Accession',
            alignLeft: true,
            size: 130,
        },
    ];

    const accordionContent = [
        {
            name: '1. Check the requirements',
            content: [
                {
                    item: (
                        <div>
                            Requestors must have a NIH eRA Commons ID (or appropriate NIH Login). If you need an account, request one
                            through your institution’s Office of Sponsored Research (or equivalent).{' '}
                            <a href="/" target="_blank" rel="noopener noreferrer">
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
                            <a href="/" target="_blank" rel="noopener noreferrer">
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
                            If you are planning to access all studies from a program, use the corresponding program dbGaP collection listed
                            below. These study collections contain all the studies in dbGaP for General Research Use (GRU). If you are only
                            using a subset of studies from a program, follow directions in Step 2.a.
                            <ol type="i" className={classes.list}>
                                <li>
                                    <a href="" target="_blank" rel="noopener noreferrer">
                                        Collection A
                                    </a>
                                </li>
                                <li>
                                    <a href="/" target="_blank" rel="noopener noreferrer">
                                        Collection B
                                    </a>
                                </li>
                            </ol>
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
                            <a href="/" target="_blank" rel="noopener noreferrer">
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

    const bodyComp = (
        <div className={classes.modalBody}>
            <div>List of selected studies by dbGaP Study Accession number:</div>

            {selectedStudies?.length > 0 && (
                <Table
                    className={classes.scrollable}
                    tableRows={selectedStudies}
                    tableHeaders={selectStudiesTableColumns}
                    ariaCaption="Selected Studies Table"
                    noHover
                    allowSort
                    responsive={false}
                    modification="offWhite"
                ></Table>
            )}

            {selectedStudies?.length === 0 && (
                <div className="pb-3">
                    <div className={`${classes.noticeBox}`}>
                        There is currently no selected studies. To add to this list, return to the study explorer results and select the
                        checkbox for the desired studies.
                    </div>
                </div>
            )}

            {/* <div className={`${classes.upperContainer}`}>
                <div className="pe-3 pt-2">
                    <InfoIcon fontColor="#868686" circleColor="#DBE7E9" width="30px" height="30px" />
                </div>
                <div style={{ width: '100%' }}>
                    <div>To access data, users must submit a project request through dbGaP. To ensure the smoothest request process:</div>
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
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        Tips for preparing a successful Data Access Request
                    </a>
                    .
                </p>
                <p>
                    <b>Note:</b> After you obtain dbGaP approval to access data, use the same eRA or NIH account used in dbGaP to log into
                    the site and access the approved data.
                </p>
            </div> */}
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
                title="Selected Studies"
                bodyChildren={bodyComp}
                dialogClassName={classes.bigModal}
            />
        </>
    );
};

SelectedStudiesModal.propTypes = {
    closeModal: PropTypes.func,
    list: PropTypes.array,
    listLabel: PropTypes.string,
    selectedStudy: PropTypes.string,
    selectedVariable: PropTypes.string,
    setPagination: PropTypes.func,
    setSorting: PropTypes.func,
    view: PropTypes.string,
    visible: PropTypes.bool,
};

export default SelectedStudiesModal;
