/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import classes from './Events.module.scss';
import Banner from '../../components/Banner/Banner';
import { getTypeIcon } from '../../lib/componentHelpers/EventsFunctions/getTypeIcon';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { regexReplace } from '../../lib/componentHelpers/ResourcePages/regexReplace';
import { format } from 'date-fns';

/**
 * View for the Events Page
 * @property {Object} events - List of all past and current events
 * @returns {Node} object rendering events
 */

const Events = (props) => {
    const { events } = props;
    const router = useRouter();

    const renderedEvents = (eventList) => {
        return eventList.map((item) => {
            const date = format(new Date(item.eventDate), 'Pp');

            return (
                <div key={`${item.title}-${date}`} className={classes.section}>
                    <div className={classes.title}>
                        <div className={classes.icon}>{getTypeIcon(item.type)}</div>
                        <h5 id={item.slug}>
                            {item.title} | {date} ET
                        </h5>
                    </div>

                    <hr className={classes.separator} />
                    <div>{parse(regexReplace(item.description, item.links))}</div>
                </div>
            );
        });
    };

    return (
        <>
            <Banner title="Events" path={router.asPath} variant="virus4" ariaLabel="Events Breadcrumb" />

            <Container className={`${classes.Container} whiteTextBackground`}>
                {events.currentEvents.length > 0 && (
                    <>
                        <h2 className={classes.blue}>Upcoming Events</h2>
                        <Row className={classes.Row}>{renderedEvents(events.currentEvents)}</Row>
                        <hr />
                        <br />
                    </>
                )}
                <h2 className={classes.blue}>Past Events</h2>
                <Row className={classes.Row}>{renderedEvents(events.pastEvents)}</Row>
            </Container>
        </>
    );
};

Events.propTypes = {
    events: PropTypes.object,
};

export default Events;
