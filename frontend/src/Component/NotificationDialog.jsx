import React from "react";

const NotificationDialog = ({ open, notification, onClose, onDone }) => {
  if (!open || !notification) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#0B1A12] rounded-lg shadow-lg w-96 max-w-full p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-[#F9FAFB]">
          {notification.title || "Notification"}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
          {notification.message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border dark:border-[#374151] hover:bg-gray-100 dark:hover:bg-[#12241A]"
          >
            Cancel
          </button>
          <button
            onClick={() => onDone(notification.id)}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDialog;