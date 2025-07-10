import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';

export default async (req, res) => {
    logger.defaultMeta.service = 'checking_download_link';
    const {
        query
    } = req;

    let fullLink = query.downloadLink;

    // Put together all query params to create full download link
    if (Object.keys(query).length > 1) {
        for (const [index, param] of Object.keys(query).entries()) {
            if (index) {
                fullLink += `&${param}=${query[param]}`;
            }
        }
    }

    // Helper function to check download link. Returns whether link works or not
    const checkLink = async (url) => {
        return fetch(url, {
            method: 'HEAD',
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return true; // Link is valid
                } else {
                    return false; // Link leads to 404 or other error
                }
            })
            .catch((error) => {
                logger.error(`Something went wrong with checking download link`, error);
                return false; // Assume error means link is broken
            });
    };

    try {
        await BaseMiddleware(req, res);
        switch (req.method) {
            case `GET`:
                logger.info('Checking download link: %s', encodeURI(fullLink));

                await checkLink(encodeURI(fullLink)).then((linkWorks) => {
                    if (linkWorks) {
                        res.status(200).end();
                    } else {
                        res.status(404).end();
                    }
                });

                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong with checking download link`, e);
        res.status(e.response.status).json({ e });
    }
};
