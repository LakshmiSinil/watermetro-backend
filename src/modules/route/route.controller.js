const express = require("express");
const router = express.Router();
const { getAllRoutes, getRouteById, updateRouteById, deleteRouteById, createRoute } = require('./route.service');
const { authenticate, adminOrEmployee } = require('../../middlewares/authMiddleware');
//  GET ALL ROUTES
router.get("/", async (req, res) => {
    const routes = await getAllRoutes();
    res.json(routes);
});

// GET A SINGLE ROUTE BY ID
router.get("/:id", async (req, res) => {
    const routeid = req.params.id
    const route = await getRouteById(routeid);
    res.json(route);
});

// INSERT (CREATE) A NEW ROUTE
router.post("/", authenticate, adminOrEmployee, async (req, res) => {
    const createdRoute = await createRoute(req.body)
    res.json({ message: "Route created successfully", route: createdRoute });

});

// UPDATE A ROUTE
router.patch("/:id", async (req, res) => {
    try {
        const routeId = req.params.id
        const updatedRoute = await updateRouteById(routeId, req.body);
        res.json({ updatedRoute })
    } catch (error) {
        console.log("🚀 ~ router.patch ~ error:", error)
        res.status(500).json({ message: "faild to update route" })
    }
});

// DELETE A ROUTE
router.delete("/:id", async (req, res) => {

    const deleteroute = req.params.id
    const deletedRoute = await deleteRouteById(deleteroute);
    console.log(deleteroute)
    res.json({ deletedRoute });

});

module.exports = router;
