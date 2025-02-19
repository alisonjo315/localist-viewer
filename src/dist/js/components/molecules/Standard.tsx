import React from "react";
import PropTypes from "prop-types";
import {
  getTruncDesc,
  getEventTime,
  getMonthHeader,
  getDisplayDate,
  getClassItem,
} from "../../helpers/displayEvent";
import AddCal from "./AddCal";
import {
  EventTitle,
  EventDate,
  EventLocation,
  EventThumbnail,
  EventDescription,
} from "./Partials";
import {
  EventElement,
  EventEvent,
  FilterBy,
  Format,
  HideType,
} from "../../../types/types";

interface StandardInnerProps {
  event: EventEvent;
  filterby: FilterBy;
  truncatedescription?: string;
  hideaddcal: HideType;
  hidedescription: HideType;
  hideimages: HideType;
}

const StandardInner = (props: StandardInnerProps) => {
  const { event, truncatedescription, hidedescription, hideimages } = props;
  const classList = getClassItem(event);
  return (
    <div className="views-row">
      <div className={`event-node node ${classList}`}>
        <div className="events">
          <div className="field title">
            <EventTitle title={event.title} url={event.localist_url} />
          </div>
          <EventLocation locationName={event.location_name} />
          <div>
            <EventDate date={getEventTime(event)} />
            {/* <EventTypes
                            eventTypes={getEventType(event, filterby)} /> */}
          </div>
          <EventThumbnail
            photoUrl={event.photo_url}
            title={event.title}
            hideimages={hideimages}
            photoCrop="big"
          />
          <EventDescription
            description={getTruncDesc(event, truncatedescription)}
            title={event.title}
            url={event.localist_url}
            hidedescription={hidedescription}
          />
          <AddCal {...props} />
        </div>
      </div>
    </div>
  );
};

StandardInner.propTypes = {
  event: PropTypes.object.isRequired,
  filterby: PropTypes.string.isRequired,
  truncatedescription: PropTypes.string.isRequired,
  hideaddcal: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  hidedescription: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  hideimages: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

interface StandardProps {
  events: EventElement[];
  filterby: FilterBy;
  format: Format;
  truncatedescription?: string;
  thumbnail?: string;
  wrapperClassArray: string[];
  listClassArray: string[];
  hideaddcal: HideType;
  hidedescription: HideType;
  hideimages: HideType;
}
const Standard = (props: StandardProps) => {
  const {
    events,
    filterby,
    hideaddcal,
    truncatedescription,
    // thumbnail,
    hidedescription,
    hideimages,
    listClassArray,
    wrapperClassArray,
  } = props;

  let lastMonth = "";
  let lastDay = "";

  const getMonth = (event: EventEvent) => {
    const month = getMonthHeader(event);
    if (lastMonth !== month) {
      lastMonth = month;
      return <h3 className="month-header">{month}</h3>;
    }
    return "";
  };

  const getDay = (event: EventEvent, format: Format) => {
    const displayDate = getDisplayDate(event, format);
    if (lastDay !== displayDate) {
      lastDay = displayDate;
      return (
        <h4 className="day-header">
          <span className="fa fa-calendar-o" />
          {displayDate}
        </h4>
      );
    }
    return "";
  };
  const wrapperClassList = wrapperClassArray.join(" ");
  const listClassList = listClassArray.join(" ");
  return (
    <section className="standard" title="Events List">
      <div className="events-main-body">
        <div className={`events-listing ${wrapperClassList}`}>
          <div className={`events-list ${listClassList}`}>
            {events.length > 0 ? (
              events.map((event) => {
                return (
                  <div key={event.event.id}>
                    {getMonth(event.event)}
                    {getDay(event.event, props.format)}
                    <StandardInner
                      event={event.event}
                      filterby={filterby}
                      hideaddcal={hideaddcal}
                      truncatedescription={truncatedescription}
                      //   thumbnail={thumbnail}
                      hidedescription={hidedescription}
                      hideimages={hideimages}
                    />
                  </div>
                );
              })
            ) : (
              <p>There are no upcoming events.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

Standard.propTypes = {
  events: PropTypes.array,
  filterby: PropTypes.string.isRequired,
  truncatedescription: PropTypes.string,
  thumbnail: PropTypes.string,
  wrapperClassArray: PropTypes.array.isRequired,
  listClassArray: PropTypes.array.isRequired,
  hideaddcal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hidedescription: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideimages: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Standard.defaultProps = {
  events: [],
  hideaddcal: "true",
  truncatedescription: "250",
  thumbnail: "true",
  wrapperclass: "",
  listclass: "",
  hidedescription: "false",
  hideimages: "false",
};

export default Standard;
