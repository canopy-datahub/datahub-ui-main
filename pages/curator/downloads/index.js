// The curator downloads page surfaced the upload-portal queue. With the
// Uploader role disabled platform-wide (see UserServiceImpl.BLOCKED_ROLES),
// nothing lands in that queue, so this page is intentionally a 404. The view
// in views/DownloadsDashboard/ is kept for easy revert.
export async function getServerSideProps() {
    return { notFound: true };
}

const CuratorDownloadsPage = () => null;

export default CuratorDownloadsPage;
