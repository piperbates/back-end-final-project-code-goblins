const { query } = require("../index");

async function createResourcesTable() {
  let res = await query(`
        CREATE TABLE resourcestable (
            id SERIAL PRIMARY KEY,
            title TEXT,
            lecturer TEXT,
            videourl TEXT,
            thumbnailurl TEXT,
            videodesc TEXT
        )
    `);
  console.log(res);
}

createResourcesTable();
