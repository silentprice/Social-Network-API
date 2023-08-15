const seedUsers = require('./seedUsers');
const seedThoughts = require('./seedThoughts');
const seedFriends = require('./seedFriends');
const seedReactions = require('./seedReactions');

const seedAll = async () => {
  try {
    await seedUsers();
    await seedThoughts();
    await seedFriends();
    await seedReactions();

    console.log('All seed data generated successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedAll();
