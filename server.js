const express = require('express');
const session = require('express-session');
const connectDB = require('./config/connection'); // Import the connectDB function
const routes = require('./routes')

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up routes
app.use(routes)

// Connect to MongoDB
connectDB(); // Call the connectDB function to establish the database connection

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
