const express = require("express");
const router = express.Router();
const { authenticate, adminOrEmployee } = require('../../middlewares/authMiddleware');
const {
    getAllServices,
    getServiceById,
    createService,
    updateServiceById,
    deleteServiceById,
    getEmployeesServices
} = require("./service.service");

// GET ALL SERVICES
router.get("/", authenticate, adminOrEmployee, async (req, res) => {
    const services = await getAllServices();
    res.json({ services });
});

// router.get("/mine", authenticate, adminOrEmployee, async (req, res) => {
//     const user=req.user
//     const services = await getEmployeesServices(user.userId);
//     res.json({ services });
// });




// GET A SINGLE SERVICE BY ID
router.get("/:id", authenticate, async (req, res) => {
    const service = await getServiceById(req.params.id);
    res.json({ service });
});



// CREATE A NEW SERVICE
router.post("/", authenticate, adminOrEmployee, async (req, res) => {
    const newService = await createService(req.body);
    res.json({ message: "Service created successfully", service: newService });
});

// UPDATE A SERVICE
router.patch("/:id", async (req, res) => {
    const updatedService = await updateServiceById(req.params.id, req.body);
    res.json({ updatedService });
});

// DELETE A SERVICE
router.delete("/:id", async (req, res) => {
    const deletedService = await deleteServiceById(req.params.id);
    console.log(deletedService);
    res.json({ deletedService });
});

module.exports = router;
