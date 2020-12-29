const dotenv = require("dotenv");
const { Pool } = require("pg");
//remember dotenv in full build
const pool = new Pool({
  "user": "xrmpmnaxgpiifd",
  "host": "ec2-54-228-170-125.eu-west-1.compute.amazonaws.com",
  "database": "d19dnvn730veho",
  "password": "b0ef07e6441d5b257d6f30090d067f423c123fb286bae8f235ae49a26a33a3da",
  "port": "5432",
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  query: (sql, values, callback) => {
    return pool.query(sql, values, callback);
  },
};
