"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Simulating real-time notifications
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now(),
        message: `New notification at ${new Date().toLocaleTimeString()}`,
        type: ["info", "success", "warning", "error"][
          Math.floor(Math.random() * 4)
        ] as Notification["type"],
        timestamp: new Date(),
      };
      setNotifications((prev) => [newNotification, ...prev].slice(0, 5));
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const removeNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={toggleNotifications}
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
        )}
      </Button>
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 z-50"
          >
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-500">No new notifications</p>
                ) : (
                  <ul className="space-y-2">
                    {notifications.map((notification) => (
                      <motion.li
                        key={notification.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`flex justify-between items-start p-2 rounded-md text-sm ${
                          notification.type === "info"
                            ? "bg-blue-100"
                            : notification.type === "success"
                            ? "bg-green-100"
                            : notification.type === "warning"
                            ? "bg-yellow-100"
                            : "bg-red-100"
                        }`}
                      >
                        <span>{notification.message}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
