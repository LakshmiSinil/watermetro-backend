const express = require('express');
// upate all import paths
const { registerUser, loginUser, getUserById } = require('./user.service');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/',(req,res) =>{
    console.log(req.params)
});
router.get('/:id',async (req,res) =>{
    const userid=req.params.id
    const user=await getUserById(userid)
    console.log(user)
    res.json({user})
} )
// /users/`746374683478374`
// GET get all employees /
// GET a user {param id}
// PATCH update user


module.exports = router;
