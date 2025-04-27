// src/lib/mongodb.js
import { MongoClient } from 'mongodb';

// Check for MongoDB URI in environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Connection options
const options = {};

let client;
let clientPromise;

// Use global variable in development to preserve connection across hot reloads
if (process.env.NODE_ENV === 'development') {
  // Check if the global variable doesn't exist
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client for each connection
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Helper to get database instance
export async function getDb() {
  const client = await clientPromise;
  return client.db('bulemo-db');
}

// Helper to get collection
export async function getCollection(collectionName) {
  const db = await getDb();
  return db.collection(collectionName);
}