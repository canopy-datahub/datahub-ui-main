import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './PieGraph.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, getElementAtEvent } from 'react-chartjs-2';

/**
 * A Pie graph that can showcase data in infographs and more detailed graphs.
 * * See https://react-chartjs-2.js.org/components/chart and  for examples and documentation
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Object} [data] - Object containing Labels and associated datasets with those labels.
 *  See /PieGraph.stories.js for data example
 * @property {String} [size='small'] - Changes the size style to one of our presets 'small', 'medium', 'large', or 'auto' if nothing is passed through
 * @property {Boolean} config - Any additional options to be added beyond the presets
 * @property {String} title - Title for the graph
 * @property {String} variant - uses a different variant set of options to make it look like either our infographs or a detailed graph
 * @property {String} ariaText - screenreader text replacement.
 * @property {String} [tabIndex='0'] - allows the user to tab to this element. Default is '0'/'-1'. See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
 * @returns {JSX} A PieGraph React Component
 */

const PieGraph = (props) => {
    const { size, data, config, title, variant, ariaText, tabIndex } = props;

    //Registers Chart components we may use in this.  May need to edit this based on variant.
    ChartJS.register(ArcElement, Tooltip, Legend);

    // See https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/chart/events?from-embed=&file=/App.tsx:1418-1437 for an example on useRef here
    const chartRef = useRef(null);

    /**
     * Helper function to access the dataElement clicked on and associate it with data or onClick functionality.
     * Keep the console log in, commented out, for debug purposes
     * This will eventually assign functionality to clicking on an element based on a function within the dataset
     * @param {Element} dataElement - Array containing information about the data we clicked on.  We only need the index, which is position 0.
     */
    const useEventClick = (dataElement) => {
        if (dataElement.length) {
            const { datasetIndex, index } = dataElement[0];
            console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
        }
    };

    /**
     *useOnClick helper functions
     * @param {Event} clickEvent - The click event from clicking on a specific area
     * @returns {null} - Doesn't return anything because we shove a corresponding action in (probably to route to another page)
     */
    const useOnClick = (clickEvent) => {
        const chart = chartRef.current;

        if (chart) {
            useEventClick(getElementAtEvent(chart, clickEvent));
        }
    };

    let height, width;

    const options = {
        plugins: {
            title: {
                display: title, // here for True/False check
                text: title, // actual text of the header
            },
        },
        maintainAspectRatio: false,
    };

    switch (size) {
        case 'small':
            height = '200';
            break;
        case 'medium':
            options.maintainAspectRatio = false;
            height = '400';
            width = '400';
            break;
        case 'large':
            options.maintainAspectRatio = false;
            height = '700';
            width = '700';
            break;
    }

    for (const option in config) {
        config.option = config.option + option;
    }

    // Role and aria and tabIndex are here for 508
    return (
        <div>
            <Pie
                role="img"
                aria-label={ariaText}
                tabIndex={tabIndex}
                options={options}
                height={height}
                width={width}
                data={data}
                ref={chartRef}
                onClick={useOnClick}
            />
        </div>
    );
};

PieGraph.defaultProps = {
    size: 'small',
    tabIndex: '0',
};

PieGraph.propTypes = {
    ariaText: PropTypes.string.isRequired,
    config: PropTypes.object,
    data: PropTypes.shape({
        labels: PropTypes.arrayOf(PropTypes.string),
        datasets: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string,
                label: PropTypes.string,
                id: PropTypes.number,
                data: PropTypes.array,
            })
        ),
    }).isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    tabIndex: PropTypes.string,
    title: PropTypes.string,
    variant: PropTypes.oneOf(['infograph', 'detailed']).isRequired,
};

export default PieGraph;
