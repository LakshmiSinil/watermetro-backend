const express = require('express');
const { registerUser, loginUser, getUserById, getAllUsers, updateUserById, createBulkUsers } = require('./user.service');
const userModel = require('./user.model');
const { authenticate, adminOnly, adminOrEmployee } = require('../../middlewares/authMiddleware');
const { createUser } = require('./user.service');
const { changeUserPassword } = require('./user.service');
const router = express.Router();

router.post('/bulk', async (req, res) => {
    try {
        const { bulkData } = req.body;
        if (!bulkData || !Array.isArray(bulkData)) {
            return res.status(400).json({ error: "Invalid data format." });
        }
        const users = await createBulkUsers(bulkData)

        res.status(201).json({
            message: "Users created successfully.",
            userDetails: users.map(({ email, plainPassword }) => ({ email, password: plainPassword }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create users." });
    }
});

router.post("/", authenticate, adminOnly, async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required." });
        }

        const user = await createUser({ name, email });

        res.status(201).json({
            message: "User created successfully.",
            userDetails: { email: user.email, password: user.generatedPassword }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user." });
    }
});


router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', authenticate, async (req, res) => {
    const user = await userModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
});

router.get('/', authenticate,adminOrEmployee, async (req, res) => {
    const query=req.query
    console.log("🚀 ~ router.get ~ query:", query)
    const users = await getAllUsers(query.role);
    res.json({ users });
});

router.patch("/changepassword", authenticate, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.userId; // Extracted from authentication middleware
        console.log("🚀 ~ router.patch ~ userId:", userId)

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const result = await changeUserPassword(userId, currentPassword, newPassword);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("🚨 Change Password Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.patch('/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUser = await updateUserById(userId, req.body);
    res.json({ updatedUser });
});


module.exports = router;