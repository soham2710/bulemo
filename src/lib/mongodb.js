// src/lib/mongodb.js
import { MongoClient } from 'mongodb';

// Safely check for MongoDB URI with fallback for build time
const MONGODB_URI = process.env.MONGODB_URI || "";

// Only throw an error in a runtime context, not during build
if (!MONGODB_URI && typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  console.warn('Please define the MONGODB_URI environment variable inside .env.local');
}

// Connection options
const options = {};

let client;
let clientPromise;

// Create a mocked client promise for build time when URI is not available
if (!MONGODB_URI) {
  // Mock client promise for build time
  clientPromise = Promise.resolve({
    db: () => ({
      collection: () => ({
        findOne: () => Promise.resolve(null),
        find: () => ({
          toArray: () => Promise.resolve([]),
        }),
        // Add other methods you use
      }),
    }),
  });
} else {
  // Normal connection logic when URI is available
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(MONGODB_URI, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(MONGODB_URI, options);
    clientPromise = client.connect();
  }
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