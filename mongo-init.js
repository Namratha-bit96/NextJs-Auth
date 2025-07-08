// MongoDB initialization script
db = db.getSiblingDB('users');

// Create a user for the application
db.createUser({
  user: 'artstore_user',
  pwd: 'artstore_password',
  roles: [
    {
      role: 'readWrite',
      db: 'users'
    }
  ]
});

// Create collections if they don't exist
db.createCollection('users');
db.createCollection('products');

print('MongoDB initialized successfully'); 