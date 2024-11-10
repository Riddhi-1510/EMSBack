require('dotenv').config();
const express = require('express');
const app = express();

// Use environment's PORT or fallback to 10000 (recommended to use platform's port)
const PORT = process.env.PORT || 10000;

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

// Start server and bind to 0.0.0.0
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
});

// Timeout settings (if needed)
server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds
