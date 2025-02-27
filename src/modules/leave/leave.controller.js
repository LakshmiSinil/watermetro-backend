const express = require("express");
const router = express.Router();
const {
    getAllLeaves,
    getLeaveById,
    createLeave,
    updateLeaveById,
    deleteLeaveById
} = require("./leave.service");

// GET ALL LEAVES
router.get("/", async (req, res) => {
    const leaves = await getAllLeaves();
    console.log(leaves);
    res.json({ leaves });
});

// GET A SINGLE LEAVE BY ID
router.get("/:id", async (req, res) => {
    const leave = await getLeaveById(req.params.id);
    console.log(leave);
    res.json({ leave });
});

// CREATE A NEW LEAVE
router.post("/", async (req, res) => {
    const { userId, startDate, endDate, reason, status } = req.body;
    const newLeave = await createLeave({ userId, startDate, endDate, reason, status });
    res.json({ message: "Leave created successfully", leave: newLeave });
});

// UPDATE A LEAVE
router.patch("/:id", async (req, res) => {
    const updatedLeave = await updateLeaveById(req.params.id, req.body);
    console.log(updatedLeave);
    res.json({ updatedLeave });
});

// DELETE A LEAVE
router.delete("/:id", async (req, res) => {
    const deletedLeave = await deleteLeaveById(req.params.id);
    console.log(deletedLeave);
    res.json({ deletedLeave });
});

module.exports = router;