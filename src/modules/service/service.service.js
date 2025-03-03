const Service = require("./service.model");

exports.getAllServices = async () => {
    const services = await Service.find().populate("routeId boatId");
    return services;
};

exports.getServiceById = async (id) => {
    const service = await Service.findById(id).populate("routeId boatId");
    return service;
};

exports.createService = async (serviceData) => {
    const { routeId, boatId } = serviceData
    const newService = await Service.create({ routeId, boatId });
    return newService;
};

exports.updateServiceById = async (id, updateData) => {
    const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true }).populate(" routeId boatId");
    return updatedService;
};

exports.deleteServiceById = async (id) => {
    const deletedService = await Service.findByIdAndDelete(id);
    return deletedService;
};