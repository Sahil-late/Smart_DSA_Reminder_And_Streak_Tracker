import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

let cached = global.mongoose
if (!cached) cached = global.mongoose = { conn: null, promise: null };
async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const uri = process.env.MONGO_URL
    if (!uri) throw new Error("Please define MONGODB_URI in .env.local");
    cached.promise = mongoose.connect(uri).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;