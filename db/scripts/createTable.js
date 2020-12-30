const { query } = require("../index");

const sqlStatement = `
CREATE TABLE videos(
id SERIAL PRIMARY KEY,
title TEXT,
lecturer TEXT,
video_url TEXT,
thumbnail_url TEXT,
tags TEXT [],
timestamps JSON [],
lecture_date DATE,
bootcamp_week TEXT,
description VARCHAR (500),
github_links TEXT [],
slides TEXT [],
other_links TEXT [],
)
`;

async function createTable() {
  let result = await query(sqlStatement);
  console.log(result);
}

createTable();