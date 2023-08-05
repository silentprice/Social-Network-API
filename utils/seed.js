const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

const seedData = async () => {
  try {
    // Create users
    const user1 = await User.create({ username: 'user1' });
    const user2 = await User.create({ username: 'user2' });

    // Create thoughts
    const thought1 = await Thought.create({ text: 'Hello, world!', username: 'user1' });
    const thought2 = await Thought.create({ text: 'What a beautiful day!', username: 'user2' });

    // Create reactions
    const reaction1 = await Reaction.create({
      reactionBody: 'I agree!',
      username: 'user2',
      thoughtId: thought1._id,
    });
    const reaction2 = await Reaction.create({
      reactionBody: 'Me too!',
      username: 'user1',
      thoughtId: thought2._id,
    });

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;
