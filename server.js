const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');
const session = require('express-session'); 
const thoughtRoutes = require('./routes/thoughtRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
const seedData = require('./utils/seedData');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/social_network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = require('./models/User');
const Thought = require('./models/Thought');
const Reaction = require('./models/Reaction');

// Configure session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));


// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Could not create user' });
  }
});

// Create a new thought
app.post('/api/thoughts', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.json(newThought);
  } catch (error) {
    res.status(400).json({ error: 'Could not create thought' });
  }
});

// Create a new reaction
app.post('/api/reactions', async (req, res) => {
  try {
    const newReaction = await Reaction.create(req.body);
    res.json(newReaction);
  } catch (error) {
    res.status(400).json({ error: 'Could not create reaction' });
  }
});

// Use thought and reaction routes
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/reactions', reactionRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
