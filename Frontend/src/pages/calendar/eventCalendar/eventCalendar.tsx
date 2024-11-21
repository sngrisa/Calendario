import { FaUser } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import "./eventCalendar.scss";
import { ICalendarEvent } from "../calendar";

const EventCalendar = ({ event }: { event: ICalendarEvent }) => {
    const { title, user } = event;

    return (
        <div className="event-calendar">
            <div className="event-title">
                <MdEvent className="mr-2 text-2xl text-purple-950" />
                <strong className="uppercase">{title}</strong>
            </div>
            {user && (
                <div className="event-user">
                    <FaUser className="mr-2 text-2xl text-purple-950" />
                    <strong>{user.username}</strong>
                </div>
            )}
        </div>
    );
}

export default EventCalendar;