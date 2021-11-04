import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import NotificationContext from "../../store/notification-context";
import Notification from "../ui/notification";

const Layout = ({ children }: JSX.ElementChildrenAttribute) => {
  const { notification } = useContext(NotificationContext);
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
