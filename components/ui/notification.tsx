import classes from "./notification.module.css";
import { Notification as NotificationType } from "../../model/notification";
import ReactDom from "react-dom";

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
  return ReactDom.createPortal(
    <div className={getNotificationStyle(status)}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notifications")!
  );
}

export default Notification;
