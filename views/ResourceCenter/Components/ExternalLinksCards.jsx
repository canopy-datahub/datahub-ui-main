import React from 'react';
import PropTypes from 'prop-types';
import classes from '../ResourceCenter.module.scss';

/**
 * External Links Resource Cards
 * @property {Object} router - Next router to be used for button handleClick functions
 * @returns {Array} Array of Objects for Card data
 */

const moreButtonClasses = `${classes.moreButton} ${classes.green}`;

export const externalLinksCards = (router, baseUrl, restGet) => {
    return [
        {
            title: 'National COVID Cohort Collaborative (N3C)',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Browse collections of deidentified clinical data in the United States for COVID-19 research. The N3C systematically
                        and regularly collects data derived from the electronic health records of people who were tested for COVID-19 or who
                        had related symptoms.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'CDC COVID Data Tracker',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Browse maps, charts, and data provided by the Centers for Disease Control and Prevention (CDC) on jurisdictional
                        hospitalizations, deaths, emergency department visits, and test positivity for COVID-19, as well as COVID-19 data
                        focused on variants, wastewater surveillance, and post-COVID conditions.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'COVID-19 Seroprevalence Studies Hub (COVID-19 SeroHub)',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Explore studies of Severe Acute Respiratory Syndrome Coronavirus 2 (SARS-CoV-2) seroprevalence in the United States.
                        COVID-19 SeroHub is a collaboration of the Centers for Disease Control and Prevention, National Cancer Institute,
                        and National Institute of Allergy and Infectious Diseases.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'OpenData COVID-19 Portal',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Explore SARS-CoV-2 screening data and assay information from the National Center for Advancing Translational
                        Sciences (NCATS) developed by screening a panel of SARS-CoV-2–related assays against all approved drugs. Data can be
                        viewed, sorted, searched and exported directly from the portal website.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'NIH-supported Data Repositories',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Browse list of data sharing repositories maintained by the Trans-NIH BioMedical Informatics Coordinating Committee
                        (BMIC). Domain-specific repositories are typically limited to data of a certain type or related to a certain
                        discipline. Generalist repositories accept data regardless of data type, format, content, or disciplinary focus.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'NIH Common Data Elements (CDEs) Repository',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Browse the collection of structured human and machine-readable definitions of data elements that have been
                        recommended or required by NIH Institutes and Centers and other organizations for use in research and for other
                        purposes.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'NIH-Endorsed COVID-19 Data Elements',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Browse collection of NIH-Endorsed Common Data Elements. The Project 5 Tier 1 CDEs are intended to support a wide
                        spectrum of translational, clinical, and applied COVID-19 research.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'NIH RADx Common Data Elements',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Browse the set of 12 common data elements required to be used in data collection and generation by all studies
                        involving human participants under the NIH Rapid Acceleration of Diagnostics (RADx) program.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'NIH RADx-UP Common Data Elements',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Browse the set of common data elements and standardized study questions to be used in projects supported under the
                        NIH Rapid Acceleration of Diagnostics-Underserved Populations (RADx-UP) program.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'PhenX Toolkit COVID-19 Research Collections',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Browse recommended collections of measurement protocols to support research on COVID-19, including Specialty
                        Collections.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                   
                </span>
            ),
        },
        {
            title: 'Disaster Research Response (DR2) COVID-19 Collection',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Browse a collection of COVID-19-related data collection tools, including surveys, data dictionaries, and more, from
                        the Disaster Research Response (DR2) program.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'UMLS Terminology Services ',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Unified Medical Language System (UMLS) Terminology Services (UTS) provides access to the UMLS Knowledge Sources and
                        to UMLS tools, including the UMLS Metathesaurus Browser, the Value Set Authority Center (VSAC), RxNorm Browser
                        (RxNav), SNOMED CT Browser and more. Users can access the UTS after requesting a UMLS Metathesaurus license and
                        creating a UTS account.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'EVS Explore',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Explore terminologies hosted by NCI Enterprise Vocabulary Services (EVS), including NCI Thesaurus, ChEBI, GO,
                        ICD-10-CM, and more.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    
                </span>
            ),
        },
        {
            title: 'NIH Guide for Grants and Contracts',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        Explore the NIH Guide for Grants and Contracts, which is the NIH's official publication of notices of grant
                        policies, guidelines, and funding opportunities. Search across over 17,000 records to find your organization's next
                        opportunity.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                </span>
            ),
        },
        {
            title: 'Data Management & Sharing Policy',
            type: 'externalLinks',
            children: (
                <>
                    <p>
                        View this NIH policy outlining data submission requirements, data management best practices, and expectations for
                        sharing NIH-funded or conducted research.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>

                </span>
            ),
        },
        {
            title: 'LitCovid',
            type: 'externalLinks',
            children: (
                <>
                    <p>Browse this literature hub for tracking up-to-date scientific information about the 2019 novel Coronavirus.</p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>

                </span>
            ),
        },
        {
            title: 'NIH COVID-19 Researcher Resources',
            type: 'externalLinks',
            children: (
                <>
                    <p>Browse NIH COVID-19 resources, including datasets, tools, and publications.</p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>

                </span>
            ),
        },
        {
            title: 'NIH COVID-19 Researcher Youtube Resources',
            type: 'externalLinks',
            children: (
                <>
                    <p>Browse NIH COVID-19 Youtube resources.</p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                </span>
            ),
        },
    ];
};

externalLinksCards.PropTypes = {
    router: PropTypes.object,
};
