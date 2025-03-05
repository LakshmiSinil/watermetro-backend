const express = require('express');
// upate all import paths
const { registerUser, loginUser, getUserById, getAllUsers, updateUserById } = require('./user.service');
const userModel = require('./user.model');
const { authenticate } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', authenticate, async (req, res) => {
    const user = await userModel.findById(req.user.userId)
    if (!user) res.status(404).json({ message: "User not found" })
    res.json({ user })
})

router.get('/:id', async (req, res) => {
    const userId = req.params.id
    const user = await getUserById(userId)
    if (!user) res.status(404).json({ message: "User not found" })
    res.json({ user })
})

// get a all user
router.get("/", async (req, res) => {
    const users = await getAllUsers();
    res.json({ users });
});

// update a user
router.patch("/:id", async (req, res) => {
    const updateUser = req.params.id
    const updatedUser = await updateUserById(updateUser);
    console.log(updateUser)
    res.json({ updatedUser });
});

module.exports = router;






