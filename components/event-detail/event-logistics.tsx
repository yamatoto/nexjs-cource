import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import LogisticsItem from "./logistics-item";
import classes from "./event-logistics.module.css";
import { toLocalYMD } from "../../helpers/date";
import Image from "next/image";

function EventLogistics({
  date,
  address,
  image,
  imageAlt,
}: {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width={400} height={400} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{toLocalYMD(date)}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{address.replace(", ", "\n")}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
