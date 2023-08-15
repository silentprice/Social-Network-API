const connection = require('../config/connection');
const Thought = require('../models/Thought');

const seedThoughts = async () => {
  try {
    const thoughts = [
      {
        text: 'This is a great day!',
        username: 'user1',
      },
      {
        text: 'Feeling excited about the weekend!',
        username: 'user2',
      },
      // Add more thoughts as needed
    ];

    await Thought.insertMany(thoughts);

    console.log('Thoughts seeded successfully');
  } catch (error) {
    console.error('Error seeding thoughts:', error);
  } finally {
    connection.close();
  }
};

seedThoughts();
