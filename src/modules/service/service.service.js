const Service = require("./service.model");

exports.getAllServices = async () => {
    const services = await Service.find().populate("userid routeId boatId");
    return services;
};

exports.getServiceById = async (id) => {
    const service = await Service.findById(id).populate("userid routeId boatId");
    return service;
};

exports.createService = async (serviceData) => {
    const newService = await Service.create(serviceData);
    return newService;
};

exports.updateServiceById = async (id, updateData) => {
    const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true }).populate("userid routeId boatId");
    return updatedService;
};

exports.deleteServiceById = async (id) => {
    const deletedService = await Service.findByIdAndDelete(id);
    return deletedService;
};