const express = require('express');
const { registerUser, loginUser, getUserById, getAllUsers, updateUserById, createBulkUsers } = require('./user.service');
const userModel = require('./user.model');
const { authenticate } = require('../../middlewares/authMiddleware');
const {createUser} =require('./user.service');

const router = express.Router();

router.post('/bulk', async (req, res) => {
    try {
        const { bulkData } = req.body;
        if (!bulkData || !Array.isArray(bulkData)) {
            return res.status(400).json({ error: "Invalid data format." });
        }
        const users = await createBulkUsers(bulkData)
        console.log("🚀 ~ router.post ~ users:", users)

        res.status(201).json({
            message: "Users created successfully.",
            userDetails: users.map(({ email, plainPassword }) => ({ email, password: plainPassword }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create users." });
    }
});

router.post("/", async (req, res) => {
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

router.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.json({ users });
});

router.patch('/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUser = await updateUserById(userId,req.body);
    console.log("🚀 ~ router.patch ~ updatedUser:", updatedUser)
    res.json({ updatedUser });
});

module.exports = router;



