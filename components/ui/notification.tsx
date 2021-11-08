import classes from "./notification.module.css";
import { Notification as NotificationType } from "../../model/notification";

function getNotificationStyle(status: "success" | "error" | "pending"): string {
  const { notification } = classes;
  switch (status) {
    case "success":
      return `${notification} ${classes.success}`;
    case "error":
      return `${notification} ${classes.error}`;
    default:
      return notification;
  }
}

function Notification({ title, message, status }: NotificationType) {
  return (
    <div className={getNotificationStyle(status)}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
