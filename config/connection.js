const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionString =
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_network_api';

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
