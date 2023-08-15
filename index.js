const express = require('express');
const session = require('express-session');
const connectDB = require('./config/connection'); // Import the connectDB function
const thoughtRoutes = require('./routes/thoughtRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
const userRoutes = require('./routes/api/userRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Set up routes
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/reactions', reactionRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB
connectDB(); // Call the connectDB function to establish the database connection

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
