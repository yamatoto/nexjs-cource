import { Event } from "../../models/event";
import EventItem from "./event-item";
import classes from "./event-list.module.css";
const EventList = ({ events }: { events: Event[] }) => {
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </ul>
  );
};

export default EventList;
