const { query } = require("../index");

const statement = `DROP TABLE feedbackTable`;

async function dropTable() {
  let res = await query(statement);
  console.log(res);
  console.log("The table has been deleted.");
}

dropTable();
