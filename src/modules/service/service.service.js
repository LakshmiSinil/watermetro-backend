const Service = require("./service.model");

exports.getAllServices = async () => {
    const services = await Service.find().populate('boatId').populate('routeId');
    return services;
};
   

exports.getServiceById = async (id) => {
    const service = await Service.findById(id);
    return service;
};

exports.createService = async (serviceData) => {
    const { routeId, boatId,time } = serviceData
    const newService = await Service.create({ routeId, boatId,time });
    return newService;
};

exports.updateServiceById = async (id, updateData) => {
    const{routeId, boatId,time }=updateData
    const updatedService = await Service.findByIdAndUpdate(id,{routeId, boatId,time }, { new: true });
    return updatedService;
};

exports.deleteServiceById = async (id) => {
    const deletedService = await Service.findByIdAndDelete(id);
    return deletedService;
};