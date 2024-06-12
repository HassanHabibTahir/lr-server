const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

async function connectDB() {
  try {
    mongoose.set('strictQuery', false);
    mongoose.set('bufferCommands', false);
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    return conn;
  } catch (error) {
    throw error;
  }
}

module.exports = { connectDB };
