const Service = require("./service.model");
const mongoose = require('mongoose');

exports.getAllServices = async () => {
    const services = await Service.find().populate('boatId').populate('routeId');
    return services;
};

// exports.getUserServices = async (userId) => {
//     try {
//         // Find boats assigned to the user (employee)
//         const boats = await boats.find({ userId }).select('_id');
        
//         if (!boats.length) {
//             return { message: "No services found for this user." };
//         }

//         // Extract boat IDs
//         const boatIds = boats.map(boat => boat._id);

//         // Find services related to the user's boats
//         const services = await Service.find({ boatId: { $in: boatIds } })
//             .populate('routeId', 'name')
//             .populate('boatId', 'name');

//         return services;
//     } catch (error) {
//         console.error("Error fetching user services:", error);
//         throw new Error("Failed to fetch user services.");
//     }
// };

exports.getServiceById = async (id) => {
    const service = await Service.findById(id);
    return service;
};

exports.createService = async (serviceData) => {
    const { routeId, boatId, time } = serviceData
    const newService = await Service.create({ routeId, boatId, time });
    return newService;
};

exports.updateServiceById = async (id, updateData) => {
    const { routeId, boatId, time } = updateData
    const updatedService = await Service.findByIdAndUpdate(id, { routeId, boatId, time }, { new: true });
    return updatedService;
};

exports.deleteServiceById = async (id) => {
    const deletedService = await Service.findByIdAndDelete(id);
    return deletedService;
};