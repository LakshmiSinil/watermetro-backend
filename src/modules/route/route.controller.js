const express = require("express");
const router = express.Router();
const Route = require("../modules/routes/routes.model");

//  GET ALL ROUTES
router.get("/", async (req, res) => {
    const routes = await getAllRoutes();
    console.log(routes)
    res.json(routes);
});

// GET A SINGLE ROUTE BY ID
router.get("/:id", async (req, res) => {
    const routeid = req.params.id
    const route = await getRouteById(routeid);
    console.log(route)
    res.json(route);
});

// INSERT (CREATE) A NEW ROUTE
router.post("/", async (req, res) => {
    const { fromLocation, toLocation, status } = req.body;
    const newRoute = new Route({ fromLocation, toLocation, status });
    await newRoute.save();
    res.json({ message: "Route created successfully", route: newRoute });

});

// UPDATE A ROUTE
router.patch("/:id", async (req, res) => {
    const updateroute = req.params.id
    const updatedRoute = await getRouteById(updateroute);
    console.log(updateroute)
    res.json({ updatedRoute });

});

// DELETE A ROUTE
router.delete("/:id", async (req, res) => {

    const deleteroute = req.params.id
    const deletedRoute = await deleteRouteById(deleteroute);
    console.log(deleteroute)
    res.json({ deletedRoute });

});

module.exports = router;
