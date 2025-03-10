// lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Ensure global caching only in server-side environments
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // If the connection is cached, use it
  if (cached.conn) {
    return cached.conn;
  }

  // If there is no promise, we create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,  // Disable buffering of commands when disconnected
    };

    // Creating a new promise to establish the MongoDB connection
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    }).catch((err) => {
      console.error("MongoDB connection error: ", err);
      throw err;  // Rethrow the error after logging it
    });
  }

  // Await the promise and assign the connection to the cached object
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;  // Clear the promise on failure
    console.error("MongoDB connection failed: ", e); // Log the error
    throw e; // Rethrow the error for higher-level handling
  }

  return cached.conn;
}

export default connectDB;
