/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classes from './Metrics.module.scss';
import Banner from '../../components/Banner/Banner';
import Table from '../../components/Table/Table';
import { createMetricsColumns } from '../../lib/componentHelpers/TableHelpers/metricsTableHelpers';
import DatePicker from '../../components/DatePicker/DatePicker';
import Sidebar from '../../components/Sidebar/Sidebar';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import DownloadIcon from '../../components/Images/svg/DownloadIcon';
import CollapsibleSideBar from '../../components/CollapsibleSideBar/CollapsibleSideBar';
import VariablesModal from './Components/VariablesModal';
import { menuItems, timeDropdownOptions } from './Constants/MetricsConstants';
import { useRouter } from 'next/router';
import { format, parse } from 'date-fns';
import Cookies from 'js-cookie';
import useRest from '../../lib/hooks/useRest';
import { downloadLink } from '../../lib/pageHelpers/downloadLink';

// The best way to handle a simple repetitive page like this is probably with a few components that get reused a lot.
/**
 * Metrics view that handles each type of metrics reporting within it.
 * Each view has some consistent components between them.  A Sidebar, a Table, and some controls for the table
 * @property {Array} tableRows - Rows for the table
 * @property {Array<Object>} tableColumns - Column Definitions for the table
 * @property {Object} reportType - Dictates what kind of report this is, so the light differences between the views can appear
 * @property {Array<Object>} aggregations - Populates a dropdown for user to select how they want to aggregate data
 * @property {Object} reportIDs - Object with Years and DateResponse, specifically passed by the Hub Content page relating to date snapshot selection
 * @property {Object} initData - Any initial data being loaded into the page
 * @property {String} redirectString - base string passed to the handleClick on Generate Report for redirecting the user
 * @returns a dynamically generated page handling all of the different kinds of metrics reports
 */

const Metrics = (props) => {
    const { tableRows, totalRow, tableColumns, reportType, aggregations, reportIDs, initData, redirectString, CSV_URL } = props;
    const router = useRouter();
    const { restGet } = useRest();

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Metrics',
        },
    ];
    const [currentAggregate, setAggregate] = useState(initData?.aggregate || undefined);

    // Variables Modal
    const [variablesModalVisible, setVariablesModalVisible] = useState(false);
    const closeVariablesModal = () => {
        setVariablesModalVisible(false);
    };
    const [variablesList, setVariablesList] = useState('');

    // for side bar
    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const contentContainerClass = sidebarOpen ? classes.body : `${classes.body} ${classes.sidebarClosed}`;

    const onSelectedMenuItem = async (menuItem) => {
        await router.push(`/metrics/${menuItem.value}`);
    };

    // for Day Picker
    const [time, setTime] = useState(initData?.time || 'LastMonth');
    const [selectedDays, setSelectedDays] = useState({ from: parse(initData?.from, 'yyyy-MM-dd', new Date()), to: parse(initData?.to, 'yyyy-MM-dd', new Date()) });

    // for reportIDs
    const [year, setYear] = useState(initData?.selectedIDs?.year || 0);
    const [month, setMonth] = useState(initData?.selectedIDs?.month);
    const [monthList, setMonthList] = useState(initData?.months);
    const [ID, setID] = useState(initData?.selectedIDs?.reportID);
    const [IDList, setIDList] = useState(initData?.IDList);

    const handleClick = async () => {
        let query = '?';
        if (currentAggregate) {
            query += `&aggBy=${currentAggregate}`;
        }
        if (['Hub Content', 'Harmonization Outcomes'].includes(reportType.label)) {
            query += `&yi=${year}&mi=${month}&ri=${ID}`;
        } else if (time !== 'Custom') {
            query += `&time=${time}`;
        } else {
            query += `&startDate=${format(selectedDays.from, 'yyyy-MM-dd')}&endDate=${format(selectedDays.to, 'yyyy-MM-dd')}`;
        }
        await router.push(`${redirectString}${query}`, undefined, { scroll: false });
    };

    useMemo(() => {
        setMonthList(reportIDs?.dateResponse[year]?.months.map((value, index) => {
            return { label: value.month[0] + value.month.slice(1).toLowerCase(), value: index };
        }));
    }, [year]);

    // NOTE: you cannot use useMemo here because you will get similar months back
    useEffect(() => {
        setIDList(reportIDs?.dateResponse[year]?.months[month].reports.map((value, index) => {
            return { label: value.reportDate.slice(8), value: index, reportID: value.reportID };
        }));
    }, [month]);

    // if I have tableRows, that means I have table columns, so I can make their definitions
    return (
        <>
            <Banner title={`Metrics Reports`} manualCrumbs={crumbs} variant="crystal" ariaLabel="Metrics Breadcrumb"/>
            <Row className={classes.container}>
                <CollapsibleSideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} title="Report Types" titleClassName={classes.sidebarTitle}>
                    <Sidebar menuItems={menuItems} onSelectedMenuItem={onSelectedMenuItem} selectedItem={reportType} />
                </CollapsibleSideBar>

                <Col lg="10" className={contentContainerClass}>
                    <div className={classes.clamp}>
                        <h1 className={classes.row}>{reportType.label}</h1>
                        <Row className={classes.row}>
                            <div className={classes.flex}>
                                {aggregations && (
                                    <Select
                                        selectClass={classes.aggByDropdown}
                                        onChange={(e) => {
                                            setAggregate(e.target.value);
                                        }}
                                        options={aggregations}
                                        value={currentAggregate}
                                        label="Aggregate By"
                                        required
                                        labelClass={classes.label}
                                    />
                                )}
                                
                                {reportIDs
                                    ? (
                                        <>
                                            <Select
                                                selectClass={classes.dropdown}
                                                onChange={(e) => {
                                                    setYear(e.target.value);
                                                    setMonth(0);
                                                }}
                                                options={reportIDs.years}
                                                value={year}
                                                label="Year"
                                                required
                                                labelClass={classes.label}
                                            />
                                            <Select
                                                selectClass={classes.dropdown}
                                                options={monthList}
                                                onChange={(e) => {
                                                    setMonth(e.target.value);
                                                    setID(0);
                                                }}
                                                value={month}
                                                label="Month"
                                                required
                                                labelClass={classes.label}
                                            />
                                            <Select
                                                selectClass={classes.dropdown}
                                                options={IDList}
                                                onChange={(e) => {
                                                    setID(e.target.value);
                                                }}
                                                value={ID}
                                                label="Day"
                                                required
                                                labelClass={classes.label}
                                            />
                                        </>
                                    )
                                    : (
                                        <>
                                            <Select
                                                selectClass={classes.dropdown}
                                                onChange={(e) => {
                                                    setTime(e.target.value);
                                                }}
                                                options={timeDropdownOptions}
                                                value={time}
                                                label="Filter By Date"
                                                required
                                                labelClass={classes.label}/>
                                            {time === 'Custom' && (<DatePicker fromMonth={new Date(2019, 11)} selectedDays={selectedDays} setSelectedDays={setSelectedDays} type="Range" />)}
                                        </>)}

                                <Button label="Generate Report" handleClick={() => {
                                    handleClick();
                                }} variant="primary" className={`${classes.button} ml-2`} />
                                <Button
                                    variant="secondary"
                                    label="Download CSV"
                                    className={`${classes.button} ${classes.forceRight}`}
                                    disabled={!(tableColumns.length > 0)}
                                    iconLeft={<DownloadIcon />}
                                    handleClick={async () => {
                                        downloadLink(`${CSV_URL}&sessionId=${Cookies.get('chocolateChip')}`, restGet);
                                    }}
                                />
                            </div>
                        </Row>
                        <Row className={classes.row}>
                            {tableColumns && (
                                <Table
                                    tableRows={tableRows}
                                    allowSort
                                    tableHeaders={createMetricsColumns(tableColumns, setVariablesList, setVariablesModalVisible, classes)}
                                    className={classes.tableContainer}
                                    ariaCaption="Metrics Table"
                                    responsive={false}
                                    totalRow={totalRow}
                                    noHover
                                />
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>
            <VariablesModal
                visible={variablesModalVisible}
                closeModal={closeVariablesModal}
                variablesList={variablesList}
            />
        </>
    );
};

Metrics.propTypes = {
    CSV_URL: PropTypes.string.isRequired,
    aggregations: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number
    })),
    initData: PropTypes.shape({
        IDList: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number,
            reportID: PropTypes.number
        })),
        aggregate: PropTypes.string,
        from: PropTypes.any,
        months: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number
        })),
        selectedIDs: PropTypes.shape({
            month: PropTypes.number,
            reportID: PropTypes.number,
            year: PropTypes.number
        }),
        time: PropTypes.string,
        to: PropTypes.any
    }),
    redirectString: PropTypes.string.isRequired,
    reportIDs: PropTypes.shape({
        dateResponse: PropTypes.arrayOf(PropTypes.object),
        years: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.number,
            value: PropTypes.number
        }))
    }),
    reportType: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }),
    tableColumns: PropTypes.arrayOf(PropTypes.shape({
        length: PropTypes.number
    })),
    tableRows: PropTypes.array
};

export default Metrics;
