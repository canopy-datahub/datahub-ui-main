/* eslint-disable multiline-ternary */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import useRest from '../../lib/hooks/useRest';
import Banner from '../../components/Banner/Banner';
import Button from '../../components/Button/Button';
import BasicCheckbox from '../../components/Checkbox/BasicCheckbox';
import CalloutBox from '../../components/CalloutBox/CalloutBox';
import ApprovedPublicDataTable from '../../components/Table/ApprovedPublicDataTable';
import classes from './PublicData.module.scss';
import { getFileSize } from '../../lib/componentHelpers/TableFunctions/getFileSize';
import { WORKBENCH_LINK } from '../../constants/apiRoutes';

/**
 * Public Data Page
 *
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} publicData - Array of objects of the public data collections a user can use
 * @property {Boolean} hasWorkbench - Flag to determine label for "Create/Launch Workbench" button
 * @property {String} baseUrl - base url used for download
 *
 * @returns {JSX} Public Data Component
 */

const PublicData = (props) => {
    const { publicData, hasWorkbench, baseUrl } = props;

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
            id: 'fileCategory',
            accessorKey: 'fileCategory',
            cell: (info) => info.getValue(),
            header: 'File Type',
            alignLeft: true,
            size: 200,
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

    const launchWorkbench = async () => {
        const workbenchResponse = await restPost(WORKBENCH_LINK, [], {
            showLoading: true,
            errorMessage: 'Error Launching Workbench',
        });
        if (workbenchResponse.status === 200) {
            window.open(workbenchResponse.data.data, '_blank');
        }
    };

    const renderTables = publicData.map((collection) => {
        return (
            <div key={collection.name} className={classes.collection}>
                <h2 className={classes.name}>{collection.name}</h2>
                <div className={classes.description}>{collection.description}</div>
                <div className={classes.collectionTable}>
                    <ApprovedPublicDataTable
                        publicData={true}
                        tableRows={collection.files}
                        tableHeaders={dataTableColumns}
                        ariaCaption="Public Data Table"
                        hasWorkbench={hasWorkbench}
                        noHover
                        allowSort
                        baseUrl={baseUrl}
                        studyId={collection.studyId}
                    ></ApprovedPublicDataTable>
                </div>
            </div>
        );
    });

    return (
        <>
            <Banner title="Public Data" path={router.asPath} variant="virus6" ariaLabel="Public Data" />
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
                                This page contains public data files. You can either download these files or transfer them to the
                                &apos;Analytics Workbench&apos;. To download a file, first select a file and then click &apos;Zip &
                                Download&apos;. To move the files to the &apos;Analytics Workbench,&apos; you will first need to create a
                                workbench using the &apos;Create Workbench&apos; button. Then, select your files and transfer them to the
                                &apos;Analytics Workbench&apos; by pressing &apos;Add to Workbench&apos;.
                            </div>
                            <div>
                                For more guidance on applying for add-ons, downloading files, and transferring files to the workbench,
                                please refer to the <a href={`/tutorial?tutorial=publicData`}>RADx Data Hub User Tutorial.</a>
                            </div>
                            <div>
                                For more guidance on using our tools offerings within the Analytics Workbench, please refer to the{' '}
                                <a href={`/workbenchTutorial`}>Workbench User Tutorial.</a>
                            </div>
                        </div>
                    }
                />
            </Container>
            {publicData.length > 0 && <Container className={classes.Container}>{renderTables}</Container>}
            {publicData.length === 0 && <Container className={classes.Container}>There is no public data at this time.</Container>}
        </>
    );
};

PublicData.propTypes = {
    baseUrl: PropTypes.string,
    hasWorkbench: PropTypes.bool,
    publicData: PropTypes.array,
};

export default PublicData;
