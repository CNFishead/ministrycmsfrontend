// CalendarView.tsx
import React from "react";
import { Calendar } from "react-big-calendar";
import CustomDay from "./CustomDay.component";

interface CalendarViewProps {
  localizer: any;
  events: any[];
  onEventSelect: (event: any) => void;
  onDateRangeChange: (range: any) => void;
  eventPropGetter: (event: any) => any;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  localizer,
  events,
  onEventSelect,
  onDateRangeChange,
  eventPropGetter,
}) => {
  return (
    <Calendar
      localizer={localizer}
      events={events?.map((event: any) => ({
        ...event,
        id: event._id,
        title: event.name,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
      }))}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={onEventSelect}
      components={{
        dateCellWrapper: (props) => (
          <CustomDay {...props} className="customDayCell" />
        ),
      }}
      onRangeChange={onDateRangeChange}
      eventPropGetter={eventPropGetter}
    />
  );
};

export default CalendarView;
