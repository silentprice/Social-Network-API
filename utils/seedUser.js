const connection = require('../config/connection');
const User = require('../models/User');

const seedUsers = async () => {
  try {
    // Create users
    const user1 = await User.create({ username: 'user1' });
    const user2 = await User.create({ username: 'user2' });

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

module.exports = seedUsers;
