const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const { createBooking, updateBookingById, getAllBookings, deleteBookingById, getBookingById } = require("./booking.service");
const { authenticate } = require("../../middlewares/authMiddleware");
require("dotenv").config();
const router = express.Router();


const instance = new Razorpay({
    key_id: process.env.KEY,
    key_secret: process.env.SECRET
});

router.get("/", async (req, res) => {

    const bookings = await getAllBookings();
    res.json({ bookings });
});

router.get("/mine", authenticate, async (req, res) => {
    try {
        const bookings = await getAllBookings(req.user.userId)
        res.json({ bookings })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch bookings" })
    }
})

//  GET ONE BOOKING BY ID
router.get("/:id", async (req, res) => {
    const bookingId = req.params.id
    const booking = await getBookingById(bookingId);
    res.json({ booking })

});


router.post("/", authenticate, async (req, res) => {
    try {
        const newBooking = await createBooking({ ...req.body, userId: req.user.userId, ispaid: false });
        res.status(201).json({ newBooking });
    } catch (error) {
        res.status(500).json({ error: "Error creating booking" });
    }
});

//  UPDATE A BOOKING
router.patch("/:id", async (req, res) => {
    const bookingId = req.params.id
    console.log("🚀 ~ router.patch ~ bookingId:", bookingId, req.body)
    const updatedBooking = await updateBookingById(bookingId, req.body);
    console.log(updatedBooking)
    res.json({ updatedBooking });
});

// DELETE A BOOKING
router.delete("/:id", async (req, res) => {

    const deletebooking = req.params.id
    const deletedBooking = await deleteBookingById(deletebooking);
    console.log(deletebooking)
    res.json({ deletedBooking });
})

router.post("/razorpay-order", authenticate, async (req, res) => {
    try {
        const { amount, bookingId } = req.body;
        if (!bookingId) return res.status(400).json({ error: "Booking ID is required" });

        const options = {
            amount,
            currency: "INR",
            receipt: `receipt_${bookingId}`
        };
        const order = await instance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.log("🚀 ~ rzrpay booking ~ error:", error)
        res.status(500).json({ error: "Error creating Razorpay order" });
    }
});

router.post("/paymentverification", async (req, res) => {
    try {
        console.log('✅✅✅✅✅✅✅✅')
        console.log(req.body)
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");
        if (expectedSignature === razorpay_signature) {
            await updateBookingById(bookingId, { ispaid: true });
            res.json({ success: true, reference: razorpay_payment_id });
        } else {
            res.status(400).json({ success: false, error: "Invalid signature" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error verifying payment" });
    }
});

module.exports = router;
