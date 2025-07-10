import { CHECK_DOWNLOAD_LINK } from '../../constants/apiRoutes';

/**
 * Function to check if download link. If valid, hit api download endpoint. Otherwise, throw toast error.
 * @param {String} downloadLink - download link/api call with BASE_URL carried in
 * @param {Function} restGet - REST hook to perform GET call
 */

export const downloadLink = async (downloadLink, restGet) => {
    const checkDownloadLink = await restGet(
        `${CHECK_DOWNLOAD_LINK}${downloadLink}`,
        {
            showLoading: true,
            errorMessage: "Error downloading file. If problem persists, please contact the Support Team by using the 'Contact Us' link in the navigation bar.",
        }
    );
    if (checkDownloadLink.status === 200) {
        const a = document.createElement('a');
        a.href = downloadLink;
        a.click();
        a.remove();
        return '';
    }
};
