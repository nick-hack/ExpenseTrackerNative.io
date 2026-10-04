import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Welcome",
      message: "Welcome to Finance Manager App",
      read: false,
      time: new Date(),
    },
  ]);

  // Add new notification
  const addNotification = (title, message) => {
    const newNotif = {
      id: Date.now().toString(),
      title,
      message,
      read: false,
      time: new Date(),
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Mark as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  // unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};