const { query } = require("../index");

const sqlStatement = `
DROP TABLE public.videos
`;

async function dropTable() {
  let result = await query(sqlStatement);
}

dropTable();