import { dateFormatter } from '../../../lib/componentHelpers/SupportFunctions/dateFormatter';
import DeleteDownloadModal from './Modals/DeleteDownloadModal';
import DownloadIcon from '../../../components/Images/svg/DownloadIcon';
import Tooltip from '../../../components/Tooltip/Tooltip';
import Button from '../../../components/Button/Button';
import classes from '../DownloadsDashboard.module.scss';
import { downloadLink } from '../../../lib/pageHelpers/downloadLink';
import { GET_UPLOAD_FILE } from '../../../constants/apiRoutes';

export const downloadsDashboardTableColumns = (baseUrl, restGet) => {
    return [
        {
            id: 'uploadBy',
            accessorKey: 'uploadBy',
            cell: (info) => info.getValue(),
            header: 'Uploader',
            size: '200',
            alignLeft: true,
        },
        {
            id: 'study',
            accessorKey: 'study',
            cell: (info) => info.getValue(),
            header: 'Study',
            size: '300',
            alignLeft: true,
        },
        {
            id: 'uploadAt',
            accessorKey: 'uploadAt',
            cell: (info) => dateFormatter(info.getValue()),
            header: 'Submitted At ',
            size: '150',
            alignLeft: true,
        },
        {
            id: 'id',
            accessorKey: 'id',
            cell: (info) => (
                <Tooltip id="downloadTooltip" title={`Download File(s)`}>
                    <a>
                        <Button
                            className={classes.downloadIcon}
                            ariaLabel={`Download File(s)`}
                            variant="icon"
                            iconCenter={<DownloadIcon width="30" height="30" />}
                            size="icon"
                            handleClick={async () => {
                                downloadLink(
                                    GET_UPLOAD_FILE.replace('[uploadID]', info.getValue()),
                                    restGet
                                );
                            }}
                        ></Button>
                    </a>
                </Tooltip>
            ),
            header: 'Download',
            size: '115',
            removeSort: true,
        },
        {
            id: 'status',
            accessorKey: 'status',
            cell: ({ row }) => {
                const uploadID = row.original.id;
                return <DeleteDownloadModal uploadID={uploadID} />;
            },
            header: 'Delete',
            size: '110',
            removeSort: true,
        },
    ];
};
