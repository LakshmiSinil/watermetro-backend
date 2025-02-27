const Notification = require("../modules/notification/notification.model");

// Get all notifications
exports.getAllNotifications = async () => {
    const notifications = await Notification.find();
    return notifications;
};

// Get a notification by ID
exports.getNotificationById = async (id) => {
    const notification = await Notification.findById(id);
    return notification;
};

// Create a new notification
exports.createNotification = async (notificationData) => {
    const newNotification = await Notification.create(notificationData);
    return newNotification;
};

// Update a notification by ID
exports.updateNotificationById = async (id, updateData) => {
    const updatedNotification = await Notification.findByIdAndUpdate(id, updateData, { new: true });
    return updatedNotification;
};

// Delete a notification by ID
exports.deleteNotificationById = async (id) => {
    const deletedNotification = await Notification.findByIdAndDelete(id);
    return deletedNotification;
};
