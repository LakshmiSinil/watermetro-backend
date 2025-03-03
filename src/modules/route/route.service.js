const Route = require("./route.model");

exports.getAllRoutes = async () => {
    const routes = await Route.find();
    return routes;
};

exports.getRouteById = async (id) => {
    const route = await Route.findById(id);
    return route;
};

exports.createRoute = async (routeData) => {
    const { toLocation, fromLocation,fare } = routeData
    const newRoute = await Route.create({ toLocation, fromLocation,fare });
    return newRoute;
}

exports.updateRouteById = async (id, updateData) => {
    const { toLocation, fromLocation, status } = updateData
    const updatedRoute = await Route.findByIdAndUpdate(id, { toLocation, fromLocation, status }, { new: true });
    return updatedRoute;
};

exports.deleteRouteById = async (id) => {
    const deletedRoute = await Route.findByIdAndDelete(id);
    return deletedRoute;
};
