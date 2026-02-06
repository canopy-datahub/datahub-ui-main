/* eslint-disable max-len */
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classes from './StudyOverview.module.scss';
import Banner from '../../components/Banner/Banner';
import Button from '../../components/Button/Button';
import InfoIcon from '../../components/Images/svg/InfoIcon';
import QuestionCircleFilled from '../../components/Images/svg/QuestionCircleFilled';
import Table from '../../components/Table/Table';
import RequestAccessModal from './Components/RequestAccessModal';
import DataFilesModal from './Components/DataFilesModal';
import MetadataVisualizerModal from './Components/MetadataVisualizerModal';
import DictionaryVisualizerModal from './Components/DictionaryVisualizerModal';
import NoticeBox from '../../components/NoticeBox/NoticeBox';
import useRest from '../../lib/hooks/useRest';
import { downloadLink } from '../../lib/pageHelpers/downloadLink';
import { BASE_URL } from '../../constants/apiRoutes';
import { combineDuplicates, renderList } from './Misc/HelperFunctions';
import { getFileSize } from '../../lib/componentHelpers/TableFunctions/getFileSize';
import { documentsTable, datasetsTable, variablesSubTable, variablesInformationTable } from './Misc/ColumnDefs';
import Link from 'next/link';

/**
 * View for the Study Overview
 *
 * @property {String} studyId - ID of study
 * @property {Array<Object>} studyData - Study's metadata like Title, Detail, and Representative
 * @property {Array<Object>} studyDocuments - List of study's documents
 * @property {Array<Object>} studyDatasets - List of study's datasets
 * @property {String} baseUrl - base URL used for downloads
 * @returns {Node} object rendering the Study Overview
 */

const StudyOverview = (props) => {
    const { studyId, studyData, studyDocuments, studyDatasets, baseUrl } = props;
    const { restGet } = useRest();

    const downloadServiceUrl = BASE_URL;

    // Request Access Modal
    const [requestAccessModalVisible, setRequestAccessModalVisible] = useState(false);
    const closeRequestAccessModal = () => {
        setRequestAccessModalVisible(false);
    };

    // Data Files Modal
    const [dataFilesModalVisible, setDataFilesModalVisible] = useState(false);
    const closeDataFilesModal = () => {
        setDataFilesModalVisible(false);
    };

    // Metadata Visualizer Modal
    const [metadataModalVisible, setMetadataModalVisible] = useState(false);
    const closeMetadataModal = () => {
        setMetadataModalVisible(false);
    };
    const [metadataFile, setMetadataFile] = useState('');

    // Dictionary Visualizer Modal
    const [dictModalVisible, setDictModalVisible] = useState(false);
    const closeDictModal = () => {
        setDictModalVisible(false);
    };
    const [dictFile, setDictFile] = useState('');

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'Link to Homepage',
        },
        {
            page: 'Study Explorer',
            pageLink: '/studyExplorer/studies',
            ariaLabel: 'Study Explorer',
        },
        {
            page: 'Study Overview',
            ariaLabel: 'Study Overview',
        },
    ];

    const { Title, Detail, Representative } = studyData.props;

    const representativeData = renderList(Representative);
    const detailData = renderList(combineDuplicates(Detail));

    const studyName = Title.find((x) => x.label === 'Study Name');
    const studySize = Title.find((x) => x.label === 'Study Size (MB)');
    const rapidsLink = Representative.find((x) => x.label === 'RAPIDS Link');
    const phsLink = Representative.find((x) => x.label === 'dbGaP Study Accession');

    // Get study size by converting MB into bytes and using getFileSize to get the most readable unit/magnitude
    const formattedSize = studySize ? getFileSize(Number(studySize.propertyValue[0] * 1024 * 1024), 0) : null;

    // Not all studies have a Study Size (ex: DHT studies). This is to assign the banner variables properly even with missing data
    const pageTitle = formattedSize ? `${studyName.propertyValue[0]} (${formattedSize})` : `${studyName.propertyValue[0]}`;

    // STUDY DOCUMENTS TABLE
    const documentsTableColumns = documentsTable(studyId, downloadServiceUrl, restGet);

    // STUDY DATASETS TABLE
    const datasetsTableColumns = datasetsTable(
        downloadServiceUrl,
        setMetadataModalVisible,
        setMetadataFile,
        setDictModalVisible,
        setDictFile,
        restGet
    );

    let totalFiles, dataFiles, metaFiles, dictFiles;
    totalFiles = dataFiles = metaFiles = dictFiles = 0;

    studyDatasets.dataFileDTOS.forEach((dataFile) => {
        totalFiles++;
        dataFiles++;
        if (dataFile.dictionaryFileId) {
            totalFiles++;
            dictFiles++;
        }
        if (dataFile.metadataFileId) {
            totalFiles++;
            metaFiles++;
        } 
    });

    const renderSubComponent = ({ row }) => {
        const renderVariables = row.original.dataVariables.split(/,|;/).map((variable) => {
            return <li key={variable}>{variable}</li>;
        });

        return (
            <div className={classes.variablesSubRow}>
                <div className={classes.variablesHeader}>Variable Names</div>
                <div className={classes.variablesBody}>
                    <ul className={classes.variablesList}>{renderVariables}</ul>
                </div>
            </div>
        );
    };

    return (
        <>
            <Banner title={pageTitle} manualCrumbs={crumbs} variant="lab4" ariaLabel="Study Overview Breadcrumb" topic="Studies" />
            <div className={classes.studyOverview}>
                <div className={`${classes.divider} ${classes.firstDivider}`}>
                    <Container>Study Information</Container>
                </div>
                <div className={classes.section}>
                    <Container className={classes.Container}>
                        <div className={classes.data}>{representativeData}</div>
                        <div className={classes.data}>{detailData}</div>
                    </Container>
                </div>

                {studyData.variables.length > 0 && (
                    <>
                        <div className={classes.divider}>
                            <Container>Variable Information</Container>
                        </div>
                        <div className={classes.section}>
                            <Container className={classes.Container}>
                                <div className={classes.buttonSection}>
                                    <span className={classes.bold}>Total Variables:</span> {new Set(studyData.variables.map(v => v.variableName)).size}
                                </div>
                                <Table
                                    className={`${classes.tableContainer} ${classes.variablesInformation}`}
                                    tableRows={Array.from(
                                        new Map(studyData.variables.map(v => [v.variableName, v])).values()
                                    ).sort((a, b) => {
                                        // Sort: variables with non-null labels first
                                        const aHasLabel = a.variableLabel && a.variableLabel.trim() !== '';
                                        const bHasLabel = b.variableLabel && b.variableLabel.trim() !== '';
                                        if (aHasLabel && !bHasLabel) return -1;
                                        if (!aHasLabel && bHasLabel) return 1;
                                        return 0;
                                    })}
                                    tableHeaders={variablesInformationTable}
                                    ariaCaption="Study Variables Information Table"
                                    noHover
                                    allowSort
                                    responsive={false}
                                    modification="offWhite"
                                    variant="narrow"
                                ></Table>
                            </Container>
                        </div>
                    </>
                )}

                {studyDocuments.length > 0 && (
                    <>
                        <div className={classes.divider}>
                            <Container>Study Documents</Container>
                        </div>
                        <div className={classes.section}>
                            <Container className={classes.Container}>
                                <div className={`pullRight ${classes.buttonSection}`}>
                                    <Button label="Download All" variant="primary" size="auto" handleClick={async () => {}}></Button>
                                </div>
                                <Table
                                    className={classes.tableContainer}
                                    tableRows={studyDocuments}
                                    tableHeaders={documentsTableColumns}
                                    ariaCaption="Study Documents Table"
                                    noHover
                                    responsive={false}
                                    modification="offWhite"
                                ></Table>
                            </Container>
                        </div>
                    </>
                )}

                <div className={classes.divider}>
                    <Container>Data Files</Container>
                </div>
                <div className={classes.section}>
                    <Container className={classes.Container}>
                        {rapidsLink && (
                            <>
                                <div className={`pullRight ${classes.buttonSection}`}>
                                    <Button
                                        className={classes.reqAccessBtn}
                                        label="How to Request Access"
                                        variant="primary"
                                        iconLeft={<InfoIcon />}
                                        size="auto"
                                        handleClick={() => setRequestAccessModalVisible(true)}
                                    ></Button>
                                </div>
                                <NoticeBox
                                    className={classes.noticeBox}
                                    body={
                                        <div>
                                            The data from this study is owned by the Digital Health Technologies (DHT) program which hosts
                                            its data on the RAPIDS platform. Open the "How to Request Access" modal to find the link to the
                                            corresponding study page in RAPIDS.
                                        </div>
                                    }
                                />
                            </>
                        )}
                        {!rapidsLink && studyDatasets.dataFileDTOS.length === 0 && (
                            <NoticeBox
                                className={classes.noticeBox}
                                body={<div>This study currently has no data files. Please check back at a later date.</div>}
                            />
                        )}
                        {studyDatasets.dataFileDTOS.length > 0 && (
                            <>
                                <div className={` ${classes.buttonSection} d-flex justify-content-between`}>
                                    <div>
                                        <Button
                                            className={classes.reqAccessBtn}
                                            label="How to Use Data Files"
                                            variant="tertiary"
                                            iconLeft={<QuestionCircleFilled />}
                                            size="auto"
                                            handleClick={() => setDataFilesModalVisible(true)}
                                        ></Button>
                                    </div>
                                </div>
                                <div className={classes.datasetStats}>
                                    <div>
                                        <span>Total Files:</span> {totalFiles}
                                    </div>
                                    <div className={classes.fileStats}>
                                        <div>
                                            <span>Data Files:</span> {dataFiles}
                                        </div>
                                        <div>
                                            <span>Metadata Files:</span> {metaFiles}
                                        </div>
                                        <div>
                                            <span>Dictionary Files:</span> {dictFiles}
                                        </div>
                                    </div>
                                </div>
                                <Table
                                    className={classes.tableContainer}
                                    tableRows={studyDatasets.dataFileDTOS}
                                    tableHeaders={datasetsTableColumns}
                                    ariaCaption="Study Datasets Table"
                                    noHover
                                    allowSort
                                    responsive={false}
                                    getRowCanExpand={() => true}
                                    renderSubComponent={renderSubComponent}
                                    modification="offWhite"
                                ></Table>
                            </>
                        )}
                    </Container>
                </div>
            </div>

            <RequestAccessModal
                visible={requestAccessModalVisible}
                closeModal={closeRequestAccessModal}
                rapidsLink={rapidsLink}
                dbGapLink={phsLink}
            />
            <DataFilesModal visible={dataFilesModalVisible} closeModal={closeDataFilesModal} baseUrl={downloadServiceUrl} />
            <MetadataVisualizerModal visible={metadataModalVisible} closeModal={closeMetadataModal} metadataFile={metadataFile} />
            <DictionaryVisualizerModal visible={dictModalVisible} closeModal={closeDictModal} dictFile={dictFile} />
        </>
    );
};

StudyOverview.propTypes = {
    baseUrl: PropTypes.string,
    studyData: PropTypes.object,
    studyDatasets: PropTypes.object,
    studyDocuments: PropTypes.array,
    studyId: PropTypes.string,
};

export default StudyOverview;
