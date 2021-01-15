const { query } = require("../index");

async function createFeedbackTable() {
  let res = await query(`
        CREATE TABLE feedbackTable (
            id SERIAL PRIMARY KEY,
            videoid INTEGER,
            feedback TEXT,
            created_at TIMESTAMP
        )
    `);
  console.log(res);
}

createFeedbackTable();
