const connection = require('../config/connection');
const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');

const seedReactions = async () => {
  try {
    const thoughts = await Thought.find();

    if (thoughts.length >= 2) {
      const thought1 = thoughts[0];
      const thought2 = thoughts[1];

      const reactions = [
        {
          reactionBody: 'I agree!',
          username: 'user2',
          thoughtId: thought1._id,
        },
        {
          reactionBody: 'Me too!',
          username: 'user1',
          thoughtId: thought2._id,
        },
        // Add more reactions as needed
      ];

      await Reaction.insertMany(reactions);

      console.log('Reactions seeded successfully');
    } else {
      console.error('Not enough thoughts to create reactions');
    }
  } catch (error) {
    console.error('Error seeding reactions:', error);
  } finally {
    connection.close();
  }
};

seedReactions();
