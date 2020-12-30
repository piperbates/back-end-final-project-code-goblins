const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
//remember dotenv in full build
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  query: (sql, values, callback) => {
    return pool.query(sql, values, callback);
  },
};
