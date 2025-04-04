require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');


const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
