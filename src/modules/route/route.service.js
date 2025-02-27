const Route = require("./routes.model");

exports.getAllRoutes = async () => {
    const routes = await Route.find();
    return routes;
};

exports.getRouteById = async (id) => {
    const route = await Route.findById(id);
    return route;
};

exports.createRoute = async (routeData) => {
    const newRoute = await Route.create(routeData);
    return newRoute;
};

exports.updateRouteById = async (id, updateData) => {
    const updatedRoute = await Route.findByIdAndUpdate(id, updateData, { new: true });
    return updatedRoute;
};

exports.deleteRouteById = async (id) => {
    const deletedRoute = await Route.findByIdAndDelete(id);
    return deletedRoute;
};
