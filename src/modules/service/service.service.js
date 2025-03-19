const Service = require("./service.model");
const mongoose = require('mongoose');

exports.getAllServices = async () => {
    const services = await Service.find().populate('boatId').populate('routeId');
    return services;
};

// exports.getEmployeesServices = async (employeeId) => {
//     console.log("🚀 = ~ employeeId:", employeeId)
//     const allServices = await Service.find()
//     // await allServices.populate('boatId')
//     // await allServices.populate('routeId');
//     console.log('service', allServices[0]) 
//     return allServices.filter(service => service.boatId?.userId?.toString() === employeeId)
// }

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