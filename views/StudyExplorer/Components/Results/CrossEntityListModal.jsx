import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import Modal from '../../../../components/GeneralModal/GeneralModal';
import Button from '../../../../components/Button/Button';
import Tooltip from '../../../../components/Tooltip/Tooltip';
import Link from 'next/link';
import { buildSearchQuery } from '../../../../lib/utils/searchQueryBuilder';
import { useRouter } from 'next/router';

/**
 * Modal for Cross Entity List Modal on Study Explorer page
 *
 * @property {Boolean} visible - Flag to show/hide modal
 * @property {Function} closeModal - Function to close/hide modal
 * @property {Array} list - Variable's list of studies for modal
 * @property {String} listLabel - Label for the related cross entity list
 * @property {String} selectedVariable - Selected variable to be used for search button
 * @property {String} selectedStudy - Selected study to be used for search button
 * @property {Function} setSorting - Function to set new sorting. Used for search button
 * @property {Function} setPagination - Function to set new pagination. Used for search button
 * @property {String} view - Current view
 * @returns {Node} object rendering the Request Access Modal
 */
const CrossEntityListModal = (props) => {
    const { visible, closeModal, list, listLabel, selectedVariable, selectedStudy, setSorting, setPagination, view } = props;
    const router = useRouter();

    const renderList = () => {
        if (listLabel === 'Studies') {
            //listLabel is 'studies' means the variables tab is active
            const items = list
                .sort((a, b) => (a.title || '').localeCompare(b.title || ''))
                .map((item) => {
                    return (
                        <li key={item.title}>
                            {item.study_id ? (
                                <Link href={`/study/${item.study_id}`} legacyBehavior>
                                    <a><div className={classes.bold}>{item.title}</div></a>
                                </Link>
                            ) : (
                                <div className={classes.bold}>{item.title}</div>
                            )}
                        </li>
                    );
                });

            return <ul className={classes.list}>{items}</ul>;
        } else {
            const items = list.map((item) => {
                if (item.hasOverview) {
                    return (
                        <li key={item.variableId}>
                            <Tooltip id="downloadTooltip" title={item.variableLabel}>
                                <a href={`/variable/${item.variableId}`}>
                                    <span className={classes.bold}>{item.variableName}</span>
                                </a>
                            </Tooltip>
                        </li>
                    );
                } else {
                    return (
                        <li key={item.variableName}>
                            <span className={classes.bold}>{item.variableName}</span>
                        </li>
                    );
                }
            });
            return <ul className={`${classes.list} ${classes.variablesList}`}>{items}</ul>;
        }
    };

    const bodyComp = (
        <div className={classes.modalBody}>
            <div>
                <Button
                    className={classes.crossEntityModalIcon}
                    label={`Explore ${listLabel.toLowerCase()} in search`}
                    ariaLabel={`Explore ${listLabel.toLowerCase()} in search`}
                    variant="primary"
                    handleClick={async () => {
                        let facets = [];
                        let sorting;
                        if (listLabel === 'Studies') {
                            facets = [
                                {
                                    name: 'study_variables_array',
                                    facets: [selectedVariable],
                                },
                            ];
                            sorting = { sort: 'asc', field: 'title' };

                            const searchQueryBuilderProps = {
                                facetList: facets,
                                sorting,
                                pagination: { page: '1', size: '50' },
                                setSorting,
                                setPagination,
                                view,
                            };

                            const searchQuery = buildSearchQuery(searchQueryBuilderProps);
                            await router.push(`/studyExplorer/studies?${searchQuery}`, undefined, { scroll: false });
                        } else {
                            facets = [
                                {
                                    name: 'study_name',
                                    facets: [selectedStudy],
                                },
                            ];
                            sorting = { sort: 'asc', field: 'id' };

                            const searchQueryBuilderProps = {
                                facetList: facets,
                                sorting,
                                pagination: { page: '1', size: '50' },
                                setSorting,
                                setPagination,
                                view,
                            };

                            const searchQuery = buildSearchQuery(searchQueryBuilderProps);
                            await router.push(`/studyExplorer/variables?${searchQuery}`, undefined, { scroll: false });
                        }
                        closeModal();
                    }}
                ></Button>
            </div>

            <div className={classes.scrollable}>{renderList()}</div>
        </div>
    );

    return (
        <>
            <Modal
                show={visible}
                onHide={() => {
                    closeModal();
                }}
                closable={true}
                title={`${listLabel} (${list.length})`}
                bodyChildren={bodyComp}
                dialogClassName={classes.bigModal}
            />
        </>
    );
};

CrossEntityListModal.propTypes = {
    closeModal: PropTypes.func,
    list: PropTypes.array,
    listLabel: PropTypes.string,
    selectedStudy: PropTypes.string,
    selectedVariable: PropTypes.string,
    setPagination: PropTypes.func,
    setSorting: PropTypes.func,
    view: PropTypes.string,
    visible: PropTypes.bool,
};

export default CrossEntityListModal;
