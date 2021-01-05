const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.PGPOOL,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  query: (txt, params, cb) => {
    return pool.query(txt, params, cb);
  },
};
