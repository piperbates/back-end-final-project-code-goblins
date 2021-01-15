const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // connectionString: process.env.DATABASE_URI_PROD,
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  query: (sql, values, callback) => {
    return pool.query(sql, values, callback);
  },
};
