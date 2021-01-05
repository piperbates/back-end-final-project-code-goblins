const { query } = require("../index");

async function createFeedbackTable() {
  let res = await query(`
        CREATE TABLE feedbackTable (
            id SERIAL PRIMARY KEY,
            videoId INTEGER
            feedback TEXT

        )
    `);
  console.log(res);
}

createFeedbackTable();