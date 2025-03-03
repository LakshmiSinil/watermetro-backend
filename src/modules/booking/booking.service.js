const Booking = require('../booking/booking.model');

// Get a booking by ID
exports.getBookingById = async (id) => {
    const booking = await Booking.findById(id);
    console.log(booking);
    return booking;
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new booking
exports.createBooking = async (createData) => {
    const { userId, serviceId, routeId, type, passengerCount, ispaid, status } = createData;
    const newBooking = await Booking.create({ userId, serviceId, routeId, type, passengerCount, ispaid, status });
    return newBooking
}
// Update a booking by ID
exports.updateBookingById = async (id, updateData) => {
    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, { new: true });
    console.log(updatedBooking);
    return updatedBooking;
};

// Delete a booking by ID
exports.deleteBookingById = async (id) => {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    console.log(deletedBooking);
    return deletedBooking;
};
