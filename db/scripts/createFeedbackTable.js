const { query } = require("../index");

async function createFeedbackTable() {
  let res = await query(`
        CREATE TABLE feedbackTable (
            id SERIAL PRIMARY KEY,
            feedback TEXT
        )
    `);
  console.log(res);
}

createFeedbackTable();
