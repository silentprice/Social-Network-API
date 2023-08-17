const express = require('express');
const session = require('express-session');
const thoughtRoutes = require('../thoughtRoutes');
const userRoutes = require('./userRoutes');
const connectDB = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use('/thoughts', thoughtRoutes);
app.use('/users', userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
