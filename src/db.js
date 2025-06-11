// db.js
require('dotenv').config();
const { Client } = require('pg');

const connection = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Connect to DB and handle errors
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to PgAdmin:', err.message);
    process.exit(1);
  }
  console.log('Connected to PgAdmin database');
});

module.exports = connection;
