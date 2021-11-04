import { useContext } from "react";
import classes from "./notification.module.css";
import NotificationContext from "../../store/notification-context";

function getClass(status: "success" | "error" | "pending"): string {
  switch (status) {
    case "success":
      return classes.success;
    case "error":
      return classes.error;
    case "pending":
      return classes.pending;
    default:
      return "";
  }
}

function Notification({
  title,
  message,
  status,
}: {
  title: string;
  message: string;
  status: "success" | "error" | "pending";
}) {
  const { hideNotification } = useContext(NotificationContext);
  const activeClasses = `${classes.notification} ${getClass(status)}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
