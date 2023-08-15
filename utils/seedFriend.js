const connection = require('../config/connection');
const User = require('../models/User');

const seedFriends = async () => {
  try {
    const users = await User.find();

    if (users.length >= 2) {
      const user1 = users[0];
      const user2 = users[1];

      user1.friends.push(user2._id);
      user2.friends.push(user1._id);

      await Promise.all([user1.save(), user2.save()]);

      console.log('Friends seeded successfully');
    } else {
      console.error('Not enough users to create friends');
    }
  } catch (error) {
    console.error('Error seeding friends:', error);
  } finally {
    connection.close();
  }
};

seedFriends();
