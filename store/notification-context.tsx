import { createContext, useEffect, useState } from "react";

type NotificationData = {
  title: string;
  message: string;
  status: "success" | "error" | "pending";
};

const NotificationContext = createContext<{
  notification: NotificationData | null;
  showNotification: (notificationData: NotificationData) => void;
  hideNotification: () => void;
}>({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export function NotificationContextProvider({
  children,
}: JSX.ElementChildrenAttribute) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationData | null>(null);

  useEffect(() => {
    if (activeNotification && activeNotification.status !== "pending") {
      const timer = setTimeout(() => {
        console.log("3000");
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(data: NotificationData) {
    setActiveNotification(data);
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
