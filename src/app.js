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
// const winston = require('winston')
// const expressWinston = require('express-winston');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// app.use(expressWinston.logger({
//     transports: [
//       new winston.transports.Console()
//     ],
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//     ),
//     meta: true, 
//     msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
//     expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
//     colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
//     ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
//   }));

app.use('/users', userRoutes);
app.use('/boats', boatRoutes);
app.use('/bookings', bookingRoutes);
app.use('/leaves', leaveRoutes);
app.use('/notifications', notificationRoutes);
app.use('/routes', routeRoutes);
app.use('/services', serviceRoutes);


module.exports = app;
