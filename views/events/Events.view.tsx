import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.module.css";
import styles from "./Events.module.scss";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const Events = () => {
  interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    desc?: string;
  }
  const localizer = momentLocalizer(moment);

  const handleDayClick = (date: Date) => {
    alert(`You clicked on ${date}`);
  };
  const CustomDay = ({ className, value, children, ...props }: any) => {
    const handleClick = () => {
      props.onClick(value);
    };
    return (
      <div {...props} className={`${className} custom-day`} onClick={handleDayClick}>
        {children}
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}></div>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        // add an onclick event to the calendar cells
        onSelectEvent={(event: Event) => alert(event.title)}
        components={{
          dateCellWrapper: (props) => <CustomDay {...props} className={`customDayCell`} />,
        }}
      />
    </div>
  );
};

export default Events;
