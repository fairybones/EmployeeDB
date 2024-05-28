// Set up database connection 
const { Pool } = require('pg');
// Enable access to login info stored in .env file
require('dotenv').config();

const pool = new Pool(
    {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    },

console.log(`Successfully connected to employees_db database.`)
);

pool.connect();