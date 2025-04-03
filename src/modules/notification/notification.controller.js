const express = require("express");
const router = express.Router();
const {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotificationById,
    deleteNotificationById
} = require("../notification/notification.service");
const { authenticate, adminOnly, adminOrEmployee } = require('../../middlewares/authMiddleware');

// GET ALL NOTIFICATIONS
router.get("/", async (req, res) => {
    const notifications = await getAllNotifications();
    
    res.json({ notifications });
});

// GET A SINGLE NOTIFICATION BY ID
router.get("/:id", async (req, res) => {
    const notification = await getNotificationById(req.params.id);
    res.json({ notification });
});

// INSERT (CREATE) A NEW NOTIFICATION
router.post("/", authenticate, adminOnly,async (req, res) => {
    const { userId, message } = req.body;
    const newNotification = await createNotification({ userId, message });
    console.log(newNotification);
    res.json({ newNotification });
});

// UPDATE A NOTIFICATION
router.patch("/:id", async (req, res) => {
    const updatedNotification = await updateNotificationById(req.params.id, req.body);
   
    res.json({ updatedNotification });
});

// DELETE A NOTIFICATION
router.delete("/:id", async (req, res) => {
    const deletedNotification = await deleteNotificationById(req.params.id);

    res.json({ deletedNotification });
});

module.exports = router;

