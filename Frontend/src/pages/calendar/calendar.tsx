/* import "./calendar.scss"; */
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { messages } from "../../lang/messages";
import EventCalendar from "./eventCalendar/eventCalendar";
import ModalCalendar from "./modalCalendar/modalCalendar";
import { useStore } from "../../store/useStore";
import ModalCalendarDetails from "./modalCalendarDetails/modalCalendarDetails";
import "./calendar.scss";

moment.locale('es');
const localizer = momentLocalizer(moment);

export interface IUserEvent {
  _id: string | any;
  username: string | any;
  email: string | any;
}

export interface ICalendarEvent {
  _id: string | number;
  title: string;
  notes: string | any;
  start: Date;
  end: Date;
  user: IUserEvent;
}

const CalendarComponent = ({ toggleNavbarFooter }: { toggleNavbarFooter: any }) => {
  const { openModalDetails, openModal, events, fetchEvents } = useStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastChange') || 'month');

  useEffect(() => {
    toggleNavbarFooter();
    return () => {
      toggleNavbarFooter();
    };
  }, [toggleNavbarFooter]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(()=>{fetchEvents();},[])


  const onHandledClick = () => {
    openModal();
  };

  const onSelectedItem = (event: ICalendarEvent) => {
    useStore.getState().setSelectedEvent(event);
    openModalDetails();
  };

  const onViewChange = (event: any) => {
    setLastView(event);
    localStorage.setItem('lastChange', event);
  };

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: 'darkblue',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'whitesmoke',
    }
  });


  return (
    <section id="backgroundCalendar">
      <div id="calendar-screen" className="container mx-auto gap-4 pb-20">
        <ModalCalendar />
        <ModalCalendarDetails />
        <Calendar
          localizer={localizer}
          events={(events).map((event: any) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }))}
          startAccessor="start"
          endAccessor="end"
          className="rbc-calendar"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          components={{ event: EventCalendar }}
          onDoubleClickEvent={onHandledClick}
          onSelectEvent={onSelectedItem}
          onView={onViewChange}
          view={lastView}
          style={{ height: "80vh" }}
        />
      </div>
    </section>
  );
};

export default CalendarComponent;