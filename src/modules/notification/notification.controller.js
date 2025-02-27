const express = require("express");
const router = express.Router();
const {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotificationById,
    deleteNotificationById
} = require("../modules/notification/notification.service");

// GET ALL NOTIFICATIONS
router.get("/", async (req, res) => {
    const notifications = await getAllNotifications();
    console.log(notifications);
    res.json({ notifications });
});

// GET A SINGLE NOTIFICATION BY ID
router.get("/:id", async (req, res) => {
    const notification = await getNotificationById(req.params.id);
    console.log(notification);
    res.json({ notification });
});

// INSERT (CREATE) A NEW NOTIFICATION
router.post("/", async (req, res) => {
    const { userId, message } = req.body;
    const newNotification = await createNotification({ userId, message });
    console.log(newNotification);
    res.json({ newNotification });
});

// UPDATE A NOTIFICATION
router.patch("/:id", async (req, res) => {
    const updatedNotification = await updateNotificationById(req.params.id, req.body);
    console.log(updatedNotification);
    res.json({ updatedNotification });
});

// DELETE A NOTIFICATION
router.delete("/:id", async (req, res) => {
    const deletedNotification = await deleteNotificationById(req.params.id);
    console.log(deletedNotification);
    res.json({ deletedNotification });
});

module.exports = router;

