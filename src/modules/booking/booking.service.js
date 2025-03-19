const Booking = require('../booking/booking.model');

// Get a booking by ID
exports.getBookingById = async (id) => {
    const booking = await Booking.findById(id).populate("routeId").populate("serviceId").select("-userId")
    return booking;
};

// Get all bookings
exports.getAllBookings = async (userId) => {

    const bookings = await Booking.find(userId ? { userId } : {}).populate('serviceId').populate('routeId');
    return bookings;

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
