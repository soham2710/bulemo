// scripts/init-db.js
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// Load environment variables with explicit path
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('ERROR: MongoDB URI not found in environment variables');
  console.log('Checking for .env.local file...');
  
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    console.log('✓ .env.local file exists at:', envPath);
    console.log('Please ensure it contains a valid MONGODB_URI=mongodb://... line');
    console.log('No spaces around equals sign, no quotes around the URI');
  } else {
    console.log('✗ .env.local file not found at:', envPath);
    console.log('Please create this file with your MongoDB connection string:');
    console.log('MONGODB_URI=mongodb://username:password@hostname/database');
  }
  
  process.exit(1);
}

async function initializeDatabase() {
  let client;
  
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log('✓ Connected to MongoDB successfully');
    
    const db = client.db('bulemo-db');
    
    // Create admin user
    const usersCollection = db.collection('users');
    
    // Check if admin user already exists
    const adminExists = await usersCollection.findOne({ username: 'admin' });
    
    if (!adminExists) {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Admin@2025#', salt);
      
      // Create admin user
      await usersCollection.insertOne({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date()
      });
      
      console.log('✓ Admin user created successfully');
    } else {
      console.log('ℹ Admin user already exists, skipping creation');
    }
    
    // Create indexes for blog collection
    const blogsCollection = db.collection('blogs');
    
    // Create indexes for blogs
    await blogsCollection.createIndex({ slug: 1 }, { unique: true });
    await blogsCollection.createIndex({ status: 1 });
    await blogsCollection.createIndex({ createdAt: -1 });
    
    console.log('✓ Blog indexes created successfully');
    
    // Create indexes for contacts collection
    const contactsCollection = db.collection('contacts');
    
    // Create indexes for contacts
    await contactsCollection.createIndex({ createdAt: -1 });
    await contactsCollection.createIndex({ email: 1 });
    
    console.log('✓ Contact indexes created successfully');
    
    console.log('✓ Database initialization completed successfully');
  } catch (error) {
    console.error('ERROR initializing database:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('Database connection closed');
    }
  }
}

// Execute the initialization
console.log('Starting database initialization...');
initializeDatabase()
  .then(() => console.log('Database script completed'))
  .catch(err => console.error('Unhandled error in database initialization:', err));