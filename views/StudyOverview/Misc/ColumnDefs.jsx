/* eslint-disable multiline-ternary */
import PropTypes from 'prop-types';
import classes from '../StudyOverview.module.scss';
import DownloadIcon from '../../../components/Images/svg/DownloadIcon';
import Tooltip from '../../../components/Tooltip/Tooltip';
import Button from '../../../components/Button/Button';
import ChevronDownIcon from '../../../components/Images/svg/ChevronDownIcon';
import EyeballIcon from '../../../components/Images/svg/EyeballIcon';
import { getFileSize } from '../../../lib/componentHelpers/TableFunctions/getFileSize';
import { GET_DOCUMENT, GET_DATA_FILE, GET_METADATA_DICT_FILE} from '../../../constants/apiRoutes';
import { downloadLink } from '../../../lib/pageHelpers/downloadLink';
import { FiletypeJson, FiletypeYml, JournalArrowDown } from 'react-bootstrap-icons';
import Link from 'next/link';

/**
 * Study Overview Study Documents Table Column Definitions
 * @property {String} studyId - ID of study
 * @property {String} baseUrl - base url for download link
 * @property {Function} restGet - REST API to download
 * @returns {Array} Table column array for Tanstack React tables
 */

// STUDY DOCUMENTS TABLE
export const documentsTable = (studyId, baseUrl, restGet) => {
    return [
        {
            id: 'document',
            accessorKey: 'document',
            cell: (info) => info.getValue(),
            header: 'Document',
            alignLeft: true,
        },
        {
            id: 'documentName',
            accessorKey: 'documentName',
            cell: (info) => info.getValue(),
            header: 'Document Name',
            alignLeft: true,
        },
        {
            id: 'documentSize',
            accessorKey: 'documentSize',
            cell: (info) => {
                const val = info.getValue();
                return getFileSize(val, 0);
            },
            header: 'File Size',
        },
        {
            id: 'id',
            accessorKey: 'id',
            cell: (info) => {
                const fileId = info.getValue();
                return (
                    <Tooltip id="downloadTooltip" title="Download Document">
                        <a>
                            <Button
                                className={classes.downloadIcon}
                                ariaLabel="Download Document"
                                variant="icon"
                                iconCenter={<DownloadIcon width="30" height="30" />}
                                size="icon"
                                handleClick={async () => {
                                    downloadLink(
                                        `${baseUrl}${GET_DOCUMENT.replace('[fileID]', fileId).replace('[studyID]', studyId)}`,
                                        restGet
                                    );
                                }}
                            ></Button>
                        </a>
                    </Tooltip>
                );
            },
            header: 'Download',
        },
    ];
};

documentsTable.PropTypes = {
    studyId: PropTypes.string,
};

/**
 * Study Overview Study Datasets Table Column Definitions
 * @property {String} baseUrl - base url for download link
 * @property {Function} setMetadataModalVisible - function to open metadata visualizer modal
 * @property {Function} setMetadataFile - function to set metadata file for metadata visualizer modal
 * @property {Function} restGet - REST api to download and get metadata file content for metadata viewer
 * @returns {Array} Table column array for Tanstack React tables
 */

// STUDY DATASETS TABLE
export const datasetsTable = (baseUrl, setMetadataModalVisible, setMetadataFile, setDictModalVisible, setDictFile, restGet) => {
    return [
        {
            id: 'sourceFileName',
            accessorKey: 'sourceFileName',
            cell: (info) => {
                const fileName = info.getValue();
                const fileId = info.row.original.dataFileId;
                const fileSize = getFileSize(info.row.original.fileSize, 0);
                let downloadIcon;

                if (fileId) {
                    downloadIcon = (
                        <Tooltip id="downloadTooltip" title={`Download Data File (${fileSize})`}>
                            <a>
                                <Button
                                    className={classes.downloadIcon}
                                    ariaLabel={`Download Data File (${fileSize})`}
                                    variant="icon"
                                    iconCenter={<JournalArrowDown width="30" height="30" />}
                                    size="icon"
                                    handleClick={async () => {
                                        downloadLink(`${baseUrl}${GET_DATA_FILE}${fileId}`, restGet);
                                    }}
                                ></Button>
                            </a>
                        </Tooltip>
                    );
                }

                return (
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '8px', 
                        width: '100%',
                        flexWrap: 'wrap'
                    }}>
                        <span style={{ 
                            flex: '1 1 auto', 
                            minWidth: 0,
                            wordBreak: 'break-word'
                        }}>{fileName}</span>
                        {downloadIcon && <span style={{ flex: '0 0 auto', display: 'flex' }}>{downloadIcon}</span>}
                    </div>
                );
            },
            header: 'File Name',
            alignLeft: true,
            size: 250,
        },
        {
            id: 'category',
            accessorKey: 'category',
            cell: (info) => info.getValue(),
            header: 'File Type',
            size: 160,
        },
        {
            id: 'fileFormat',
            accessorKey: 'fileFormat',
            cell: (info) => info.getValue(),
            header: 'File Format(s)',
            size: 130,
        },
        {
            id: 'sampleSize',
            accessorKey: 'sampleSize',
            cell: (info) => {
                return info.getValue() ? info.getValue() : 0;
            },
            header: '# of Records',
            size: 120,
        },
        {
            id: 'totalVariables',
            accessorKey: 'totalVariables',
            header: '# of Variables',
            cell: ({ row }) => {
                return row.getCanExpand() && row.original.totalVariables ? (
                    <Button
                        className={row.getIsExpanded() ? `${classes.variablesButton} ${classes.expanded}` : `${classes.variablesButton}`}
                        label={row.original.totalVariables.toString()}
                        ariaLabel={row.getIsExpanded() ? 'Hide Variables Table' : 'View Variables Table'}
                        iconRight={<ChevronDownIcon />}
                        variant="primary"
                        size="auto"
                        handleClick={row.getToggleExpandedHandler()}
                    ></Button>
                ) : (
                    0
                );
            },
            size: 130,
        },
        {
            id: 'metadataFileId',
            accessorKey: 'metadataFileId',
            cell: (info) => {
                const fileId = info.getValue();
                const fileExtension = info.row.original.metadataFileName?.split('.') || [];
                const fileSize = getFileSize(info.row.original.metadataFileSize, 0);
                let metadataFile, metadataViewerIcon, downloadIcon, downloadIconYaml;

                const getMeta = async () => {
                    const metaResponse = await restGet(`${GET_METADATA_DICT_FILE}${fileId}`, {
                        showLoading: true,
                        errorMessage: 'Error with viewing metadata file',
                    });
                    if (metaResponse.status === 200) {
                        metadataFile = metaResponse.data.data;
                        setMetadataModalVisible(true);
                        setMetadataFile(metadataFile);
                    }
                };

                if (fileExtension[fileExtension.length - 1] === 'json') {
                    metadataViewerIcon = (
                        <Tooltip id="downloadTooltip" title={`Visualize Metadata File`}>
                            <a>
                                <Button
                                    className={classes.eyeball}
                                    ariaLabel={`Visualize Metadata File`}
                                    variant="icon"
                                    iconCenter={<EyeballIcon />}
                                    size="icon"
                                    handleClick={() => {
                                        getMeta();
                                    }}
                                ></Button>
                            </a>
                        </Tooltip>
                    );
                }
                if (fileId) {
                    downloadIcon = (
                        <Tooltip id="downloadTooltip" title={`Download Metadata File (JSON) (${fileSize})`}>
                            <a>
                                <Button
                                    className={classes.downloadIcon}
                                    ariaLabel={`Download Metadata File (JSON) (${fileSize})`}
                                    variant="icon"
                                    iconCenter={<FiletypeJson width="30" height="30" />}
                                    size="icon"
                                    handleClick={async () => {
                                        downloadLink(`${baseUrl}${GET_DATA_FILE}${fileId}&yaml=false`, restGet);
                                    }}
                                ></Button>
                            </a>
                        </Tooltip>
                    );
                    downloadIconYaml = (
                        <Tooltip id="downloadTooltip" title={`Download Metadata File (YAML) (${fileSize})`}>
                            <a>
                                <Button
                                    className={classes.downloadIcon}
                                    ariaLabel={`Download Metadata File (YAML) (${fileSize})`}
                                    variant="icon"
                                    iconCenter={<FiletypeYml width="30" height="30" />}
                                    size="icon"
                                    handleClick={async () => {
                                        downloadLink(`${baseUrl}${GET_DATA_FILE}${fileId}&yaml=true`, restGet);
                                    }}
                                ></Button>
                            </a>
                        </Tooltip>
                    );
                }

                return (
                    <>
                        {metadataViewerIcon}
                        {downloadIcon}
                        {downloadIconYaml}
                        {!metadataViewerIcon && !downloadIcon && <p aria-label="No metadata file"></p>}
                    </>
                );
            },
            header: 'Metadata',
            size: 170,
        },
        {
            id: 'dictionaryFileId',
            accessorKey: 'dictionaryFileId',
            cell: (info) => {
                const fileId = info.getValue();
                const fileSize = getFileSize(info.row.original.dictionaryFileSize, 0);
                let dictFile, dictViewerIcon, downloadIcon;

                const getDict = async () => {
                    const dictResponse = await restGet(`${GET_METADATA_DICT_FILE}${fileId}`, {
                        showLoading: true,
                        errorMessage: 'Error with viewing data dictionary file',
                    });
                    if (dictResponse.status === 200) {
                        dictFile = dictResponse.data.data;
                        setDictModalVisible(true);
                        setDictFile(dictFile);
                    }
                };

                if (fileId) {
                    dictViewerIcon = (
                        <Tooltip id="downloadTooltip" title={`Visualize Data Dictionary File`}>
                            <a>
                                <Button
                                    className={classes.eyeball}
                                    ariaLabel={`Visualize Data Dictionary File`}
                                    variant="icon"
                                    iconCenter={<EyeballIcon />}
                                    size="icon"
                                    handleClick={() => {
                                        getDict();
                                    }}
                                ></Button>
                            </a>
                        </Tooltip>
                    );

                    downloadIcon = (
                        <Tooltip id="downloadTooltip" title={`Download Dictionary File (${fileSize})`}>
                            <a>
                                <Button
                                    className={classes.downloadIcon}
                                    ariaLabel={`Download Dictionary File (${fileSize})`}
                                    variant="icon"
                                    iconCenter={<JournalArrowDown width="30" height="30" />}
                                    size="icon"
                                    handleClick={async () => {
                                        downloadLink(`${baseUrl}${GET_DATA_FILE}${fileId}`, restGet);
                                    }}
                                ></Button>
                            </a>
                        </Tooltip>
                    );
                }

                return (
                    <>
                        {dictViewerIcon}
                        {downloadIcon}
                        {!dictViewerIcon && !downloadIcon && <p aria-label="No dictionary file"></p>}
                    </>
                );
            },
            header: 'Dictionary',
            size: 130,
        },
    ];
};

datasetsTable.PropTypes = {
    baseUrl: PropTypes.string,
    setMetadataFile: PropTypes.func,
    setMetadataModalVisible: PropTypes.func,
};

// Variables Sub Table
export const variablesSubTable = [
    {
        id: 'dataVariables',
        accessorKey: 'dataVariables',
        header: 'Variable Names',
        cell: (info) => info.getValue().replace(/,/g, ', ').replace(/;/g, ', '),
        removeSort: true,
        alignLeft: true,
    },
];

// Variables Information Table
export const variablesInformationTable = [
    {
        id: 'variableName',
        accessorKey: 'variableName',
        cell: (props) => {
            if (props.row.original.hasOverview) {
                return (
                    <Link href={`/variable/${props.row.original.variableId}`} legacyBehavior>
                        {<a className={classes.variableLink}>{props.getValue()}</a>}
                    </Link>
                );
            } else {
                return <span style={{ color: '#000' }}>{props.getValue()}</span>;
            }
        },
        header: 'Variable Name',
        alignLeft: true,
        size: 180,
    },
    {
        id: 'variableLabel',
        accessorKey: 'variableLabel',
        cell: (info) => {
            const value = info.getValue();
            if (value) {
                return <span style={{ color: '#000' }}>{value}</span>;
            } else {
                return <span style={{ color: '#000' }}>-</span>;
            }
        },
        header: 'Label',
        alignLeft: true,
        removeSort: true,
        size: 300,
    },
];
