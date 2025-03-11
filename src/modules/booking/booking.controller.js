const express = require("express");
const router = express.Router();
const { getAllBookings, getBookingById, updateBookingById, deleteBookingById, createBooking } = require("./booking.service");
const { authenticate } = require("../../middlewares/authMiddleware");

//  GET ALL BOOKINGS
router.get("/", async (req, res) => {

    const bookings = await getAllBookings()
    res.json(bookings);
    console.log(bookings)
    res.json({ bookings })

});

//  GET ONE BOOKING BY ID
router.get("/:id", async (req, res) => {
    const bookingid = req.params.id
    const booking = await getBookingById(bookingid);
    console.log(booking)
    res.json({ booking })

});

// CREATE A NEW BOOKING
router.post("/", authenticate, async (req, res) => {
    const newBooking = await createBooking({ ...req.body, userId: req.user.userId });
    console.log(newBooking)
    res.json({ newBooking });

});


//  UPDATE A BOOKING
router.patch("/:id", async (req, res) => {
    const updatebooking = req.params.id
    const updatedBooking = await updateBookingById(updatebooking);
    console.log(updatebooking)
    res.json({ updatedBooking });
});

// DELETE A BOOKING
router.delete("/:id", async (req, res) => {

    const deletebooking = req.params.id
    const deletedBooking = await deleteBookingById(deletebooking);
    console.log(deletebooking)
    res.json({ deletedBooking });
});

module.exports = router;
