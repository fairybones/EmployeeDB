require('dotenv').config();

const { Pool } = require("pg");

const pool = new Pool(
  {
    // user: process.env.DB_USER,
    user: "postgres",
    // password: process.env.DB_PASSWORD,
    host: "localhost",
    // database: process.env.DB_NAME,
    database: "employees_db",
    password: "wOw111!",
  },

  console.log(`Successfully connected to employees_db database.`)
);

module.exports = pool;