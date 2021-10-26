import { Event } from "../../models/event";

import Button from "../ui/button";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";

import { toLocalDate } from "../../helpers/date";

import classes from "./event-item.module.css";

const EventItem = ({ id, title, location, date, image }: Event) => {
  return (
    <li className={classes.item}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{toLocalDate(date)}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{location.replace(", ", "\n")}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button pathname="/events/[eventId]" query={{ eventId: id }}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
