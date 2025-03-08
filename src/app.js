const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./modules/user/user.controller');
const boatRoutes = require('./modules/boat/boat.controller');
const bookingRoutes = require('./modules/booking/booking.controller');
const leaveRoutes = require('./modules/leave/leave.controller');
const notificationRoutes = require('./modules/notification/notification.controller');
const routeRoutes = require('./modules/route/route.controller');
const serviceRoutes = require('./modules/service/service.controller');
const winston = require('winston')
const expressWinston = require('express-winston');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.printf(({ message }) => message),
    meta: false, // Disabling extra meta data (like default response time, etc.)
    msg: "{{res.statusCode}} {{req.method}} {{req.url}}",
    expressFormat: false, // Turn off express default format
    colorize: false, // Keep it plain if you want to log to files later
}));

app.use('/users', userRoutes);
app.use('/boats', boatRoutes);
app.use('/bookings', bookingRoutes);
app.use('/leaves', leaveRoutes);
app.use('/notifications', notificationRoutes);
app.use('/routes', routeRoutes);
app.use('/services', serviceRoutes);


module.exports = app;
