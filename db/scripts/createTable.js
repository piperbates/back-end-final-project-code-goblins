const { query } = require("../index");

const sqlStatement = `
CREATE TABLE videos(
id SERIAL PRIMARY KEY,
title TEXT,
tags TEXT [],
timestamps JSON []
)
`;

async function createTable() {
  let result = await query(sqlStatement);
  console.log(result);
}

createTable();