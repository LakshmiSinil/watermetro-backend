const express = require("express");
const { getAllBoats, getBoatById, updateBoatById, deleteBoatById } = require("./boat.service");
const router = express.Router();
// GET ALL BOATS
router.get("/", async (req, res) => {

    const boats = await getAllBoats();
    res.json(boats);
    console.log(boats)
    res.json({ boats });
}
);

// GET ONE BOAT
router.get("/:id", async (req, res) => {
    const boatid = req.params.id
    const boat = await getBoatById(boatid);
    console.log(boat)
    res.json(boat);

});
// ADD A BOAT
router.post("/", async (req, res) => {
    const { name, type } = req.body; 
    const newBoat = await createBoat({ name, type }); 
    console.log(newBoat);
    res.json({ newBoat });
});

// UPDATE A BOAT
router.patch("/:id", async (req, res) => {
    const updateBoat = req.params.id
    const updatedBoat = await updateBoatById(updateBoat);
    console.log(updateBoat)

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