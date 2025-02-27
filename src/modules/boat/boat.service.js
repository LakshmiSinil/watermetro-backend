const Boat = require('./boat.model');

// Get boat by ID
exports.getBoatById = async (id) => {
    const boat = await Boat.findById(id);
    console.log(boat);
    return boat;
};

// Get all boats
exports.getAllBoats = async (req, res) => {
    try {
        const boats = await Boat.find();
        res.status(200).json(boats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update boat by ID
exports.updateBoatById = async (id, updateData) => {
    const updatedBoat = await Boat.findByIdAndUpdate(id, updateData, { new: true });
    console.log(updatedBoat);
    return updatedBoat;
};

// Delete boat by ID
exports.deleteBoatById = async (id) => {
    const deletedBoat = await Boat.findByIdAndDelete(id);
    console.log(deletedBoat);
    return deletedBoat;
};



