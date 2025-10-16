/* eslint-disable multiline-ternary */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import useRest from '../../lib/hooks/useRest';
import Link from 'next/link';
import Banner from '../../components/Banner/Banner';
import Button from '../../components/Button/Button';
import BasicCheckbox from '../../components/Checkbox/BasicCheckbox';
import CalloutBox from '../../components/CalloutBox/CalloutBox';
import ApprovedPublicDataTable from '../../components/Table/ApprovedPublicDataTable';
import classes from './ApprovedData.module.scss';
import { getFileSize } from '../../lib/componentHelpers/TableFunctions/getFileSize';
import NoticeBox from '../../components/NoticeBox/NoticeBox';
import { WORKBENCH_LINK } from '../../constants/apiRoutes';

/**
 * Approved Data Page
 *
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} approvedData - Array of objects of the data a user has been approved for from dbGaP
 * @property {Boolean} hasWorkbench - Flag to determine label for "Create/Launch Workbench" button
 * @property {Boolean} hasActiveAddonRequest - Flag to determine if user has active add-on request active. Controls Add-on button
 * @property {String} addonType - string to identify type of add-on. Currently not used
 * @property {String} baseUrl - base url used for download
 *
 * @returns {JSX} Approved Data Component
 */

const ApprovedData = (props) => {
    const { approvedData, baseUrl, hasWorkbench, hasActiveAddonRequest, addonType } = props;

    const router = useRouter();
    const { restPost } = useRest();

    const dataTableColumns = [
        {
            id: 'fileName',
            accessorKey: 'fileName',
            header: 'File Name',
            cell: ({ row, getValue }) => (
                <div
                    style={{
                        paddingLeft: `${row.depth * 2}rem`,
                    }}
                >
                    <>
                        <BasicCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                onChange: row.getToggleSelectedHandler(),
                                label: getValue(),
                                row: row,
                            }}
                        />
                    </>
                </div>
            ),
            alignLeft: true,
            size: 250,
        },
        {
            id: 'fileType',
            accessorKey: 'fileType',
            cell: (info) => info.getValue(),
            header: 'File Type',
            alignLeft: true,
            size: 200,
        },
        {
            id: 'fileFormat',
            accessorKey: 'fileFormat',
            cell: (info) => info.getValue(),
            header: 'File Format',
            alignLeft: true,
            size: 100,
        },
        {
            id: 'fileSize',
            accessorKey: 'fileSize',
            cell: (info) => {
                const val = info.getValue();
                return getFileSize(val, 0);
            },
            alignLeft: true,
            header: 'File Size',
            size: 90,
        },
    ];

    useEffect(() => {
        // Check if router is ready to be used (hydration complete)
        if (!router.isReady) {
            return;
        }

        // Get hash (if exists) from URL to getElementByID and scroll
        const hash = window.location.hash;
        if (!hash) {
            return;
        }
        const id = hash.replace('#', '');
        const scrollToAnchor = () => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        };

        // Try scrolling after a short delay to make sure content is rendered
        setTimeout(scrollToAnchor, 100);
    }, [router.isReady]);

    const launchWorkbench = async () => {
        const workbenchResponse = await restPost(WORKBENCH_LINK, [], {
            showLoading: true,
            errorMessage: 'Error Launching Workbench',
        });
        if (workbenchResponse.status === 200) {
            window.open(workbenchResponse.data.data, '_blank');

            if (!hasWorkbench) {
                router.reload();
            }
        }
    };

    // Table for each study
    const renderTables = approvedData.map((study) => {
        return (
            <div key={study.studyName} className={classes.study}>
                <h2 id={study.studyId}>
                    <Link href={`/study/${study.studyId}`}>{study.studyName}</Link>
                </h2>
                <div className={classes.studyTable}>
                    <ApprovedPublicDataTable
                        tableRows={study.datasets}
                        tableHeaders={dataTableColumns}
                        ariaCaption="Approved Data Table"
                        hasWorkbench={hasWorkbench}
                        noHover
                        allowSort
                        baseUrl={baseUrl}
                        id={study.studyId}
                    ></ApprovedPublicDataTable>
                </div>
            </div>
        );
    });

    return (
        <>
            <Banner title="My Approved Data" path={router.asPath} variant="virus6" ariaLabel="My Approved Data" />
            {approvedData.length > 0 && (
                <>
                    <Container className={`${classes.Container} pullRight`}>
                        <Button
                            className={classes.generalButton}
                            label={hasWorkbench ? 'Launch Workbench' : 'Create Workbench'}
                            variant="primary"
                            handleClick={() => launchWorkbench()}
                        />
                    </Container>
                    <Container className={classes.Container}>
                        <CalloutBox
                            className={classes.instructionsContainer}
                            body={
                                <div className={classes.instructions}>
                                    <div>
                                        This page contains data files from studies you&apos;ve received approval from dbGaP. You can either
                                        download these files or transfer them to the &apos;Analytics Workbench&apos;. To download a file,
                                        first select a file and then click &apos;Zip & Download&apos;. To move the files to the
                                        &apos;Analytics Workbench,&apos; you will first need to create a workbench using the &apos;Create
                                        Workbench&apos; button. Then, select your files and transfer them to the &apos;Analytics
                                        Workbench&apos; by pressing &apos;Add to Workbench&apos;.
                                    </div>
                                    <div>
                                        For more guidance on applying for add-ons, downloading files, and transferring files to the
                                        workbench, please refer to the Data Hub User Tutorial.
                                    </div>
                                    <div>
                                        For more guidance on using our tools offerings within the Analytics Workbench, please refer to the Workbench User Tutorial.
                                    </div>
                                </div>
                            }
                        />
                    </Container>
                    <Container className={classes.Container}>{renderTables}</Container>
                </>
            )}
            {approvedData.length === 0 && (
                <NoticeBox
                    className={classes.noticeBox}
                    body={
                        <div>
                            You do not have any approved data. To access features on this page as well as the Analytics Workbench, you must
                            first receive access for one study in system. After you receive access, return to this page using the same
                            Login that you use to log into to other systems.
                        </div>
                    }
                />
            )}
        </>
    );
};

ApprovedData.propTypes = {
    addonType: PropTypes.string,
    approvedData: PropTypes.array,
    baseUrl: PropTypes.string,
    hasActiveAddonRequest: PropTypes.bool,
    hasWorkbench: PropTypes.bool,
};

export default ApprovedData;
