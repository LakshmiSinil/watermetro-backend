const Boat = require('./boat.model');

// Get boat by ID
exports.getBoatById = async (id) => {
    const boat = await Boat.findById(id);
    console.log(boat);
    return boat;
};

// Get all boats
exports.getAllBoats = async () => {

        const boats = await Boat.find();
        return boats;
    
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

// Create a new boat
exports.createBoat = async (boatData) => {
    const newBoat = await Boat.create(boatData);
    console.log(newBoat);
    return newBoat;
};


