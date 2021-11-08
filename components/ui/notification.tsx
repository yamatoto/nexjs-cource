import ReactDOM from "react-dom";

import classes from "./notification.module.css";
import { Notification } from "../../model/notification";

function Notification({ title, message, status }: Notification) {
  const statusClass = status === "success" ? classes.success : classes.error;
  return (
    <div className={`${classes.notification} ${statusClass}`}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
