import "dotenv/config";
// Load environment variables from .env file
require("dotenv").config();

// Set up database connection
const { Pool } = require("pg");

const pool = new Pool(
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    database: process.env.DB_NAME,
  },

  console.log(`Successfully connected to employees_db database.`)
);

pool.connect();
