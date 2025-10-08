import React from 'react';
import Banner from '../../components/Banner/Banner';
import classes from './SiteMap.module.scss';
import { Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Button from '../../components/Button/Button';
import DownloadIcon from '../../components/Images/svg/DownloadIcon';
import Image from 'next/legacy/image';
import siteMapImage from '../../public/images/site_map.png';
import siteMapDownloadImage from '../../public/images/site_map.pdf';

const SiteMap = (props) => {
    const router = useRouter();

    return (
        <>
            <Banner title="Site Map" variant="virus3" ariaLabel="site map" path={router.asPath} />
            <Container>
                <Row className={classes.titleGap}>
                    <span className={classes.title}>Site Map</span>
                    <span className={`${classes.body} narrowTextBackground`}>
                        The site supports researchers in accessing curated and de-identified data, allowing them to find, aggregate, and
                        perform data analyses in a cloud-enabled platform.
                    </span>
                </Row>
                <Row className={classes.buttonGap}>
                    <span className={classes.buttonText}>Available for download as a PDF:</span>
                    <a href="" target="_blank" rel="noopener noreferrer" download="">
                        <Button
                            label="Download PDF [502 KB]"
                            ariaLabel="Download PDF [502 KB]"
                            size="medium"
                            type="submit"
                            variant="siteMap"
                            iconLeft={<DownloadIcon />}
                            handleClick={() => {}}
                            className={classes.downloadPdfButton}
                        />
                    </a>
                </Row>
                <Row className={classes.imageGap}>
                    <div className="narrowTextBackground">
                        <Image priority src="" />
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default SiteMap;
