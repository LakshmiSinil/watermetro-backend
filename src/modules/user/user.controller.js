const express = require('express');
// upate all import paths
const { registerUser, loginUser, getUserById } = require('./user.service');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/', (req, res) => {
    console.log(req.params)
});
// get user by id
router.get('/:id', async (req, res) => {
    const userid = req.params.id
    const user = await getUserById(userid)
    console.log(user)
    res.json({ user })
})
// get a all user
router.get("/", async (req, res) => {

    const users = await getAllUsers();
    console.log(users)
    res.json({ users });
});
// update a user
router.patch("/:id", async (req, res) => {
    const updateUser = req.params.id
    const updatedUser = await getUserById(updateUser);
    console.log(updateUser)
    res.json({ updatedUser });
});

module.exports = router;
// /users/`746374683478374`
// GET get all employees /
// GET a user {param id}
// PATCH update user






