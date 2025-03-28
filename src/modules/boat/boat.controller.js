const express = require("express");
const { getAllBoats, getBoatById, updateBoatById, deleteBoatById, createBoat, getEmployeesBoat } = require("./boat.service");
const router = express.Router();
const { authenticate, adminOrEmployee } = require('../../middlewares/authMiddleware');

// GET ALL BOATS
router.get("/", async (req, res) => {
    const boats = await getAllBoats();
    res.json({ boats });
});

// get my boat
router.get("/mine", authenticate, async (req, res) => {
    const userId = req.user.userId
    const boat = await getEmployeesBoat(userId)
    res.json({ boat })
})
// GET ONE BOAT
router.get("/:id", async (req, res) => {
    const boatid = req.params.id
    const boat = await getBoatById(boatid);
    console.log(boat)
    res.json(boat);

});
// ADD A BOAT
router.post("/", authenticate, adminOrEmployee, async (req, res) => {
    const newBoat = await createBoat(req.body);
    console.log(newBoat);
    res.json({ newBoat });
});

// UPDATE A BOAT
router.patch("/:id", async (req, res) => {
    const boatId = req.params.id
    console.log("🚀 ~ router.patch ~ boatId:", boatId)
    console.log("🚀 ~ router.patch ~ req.body:", req.body)
    const updatedBoat = await updateBoatById(boatId, req.body);
    console.log(updatedBoat)
    res.json({ updatedBoat });

});

// DELETE A BOAT
router.delete("/:id", async (req, res) => {
    const deleteBoat = req.params.id
    const deletedBoat = await deleteBoatById(deleteBoat);
    console.log(deleteBoat)

    res.json({ deletedBoat });

});

module.exports = router;