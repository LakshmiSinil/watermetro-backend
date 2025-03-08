const express = require("express");
const router = express.Router();
const {
    getAllServices,
    getServiceById,
    createService,
    updateServiceById,
    deleteServiceById
} = require("./service.service");

// GET ALL SERVICES
router.get("/", async (req, res) => {
    
    const services = await getAllServices();
    console.log(services)
    res.json({ services });
    console.log("🚀 ~ router.get ~ res:", res)
});

// GET A SINGLE SERVICE BY ID
router.get("/:id", async (req, res) => {
    const service = await getServiceById(req.params.id);
    console.log(service);
    res.json({ service });
});

// CREATE A NEW SERVICE
router.post("/", async (req, res) => {
    const newService = await createService(req.body);
    res.json({ message: "Service created successfully", service: newService });
});

// UPDATE A SERVICE
router.patch("/:id", async (req, res) => {
    const updatedService = await updateServiceById(req.params.id, req.body);
    console.log(updatedService);
    res.json({ updatedService });
});

// DELETE A SERVICE
router.delete("/:id", async (req, res) => {
    const deletedService = await deleteServiceById(req.params.id);
    console.log(deletedService);
    res.json({ deletedService });
});

module.exports = router;
