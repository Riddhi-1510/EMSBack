require('dotenv').config()
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000; // Render sets the PORT environment variable

const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Connect to MongoDB
require('./connection.js');

const staticRoutes = require('./routes/authRoutes.js');
const employeeRoutes = require('./routes/employeeroutes.js');
const adminRoutes = require('./routes/adminroutes.js');

const _dirname = path.resolve();

const corsOptions = {
    origin: 'http://localhost:3000',  // Change this to your frontend URL if deployed
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// Define routes
app.use("/api", staticRoutes);
app.use("/api", adminRoutes);
app.use("/employee/api", employeeRoutes);

// Ensure server listens on all interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
