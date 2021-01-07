const { query } = require("../index");
const sampleData = require("../sampleData/videoData");

const drop = `
    DROP TABLE videos
    `;

const create = `
    CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title TEXT,
    lecturer TEXT,
    video_url TEXT,
    thumbnail_url TEXT,
    tags TEXT [],
    timestamps JSON [],
    lecture_date DATE,
    bootcamp_week INTEGER,
    description VARCHAR (500),
    github_links JSON [],
    slides JSON [],
    other_links JSON [])
    `;

const populate = `
    INSERT INTO videos 
    (title,
    lecturer,
    video_url,
    thumbnail_url,
    tags,
    timestamps,
    lecture_date,
    bootcamp_week,
    description,
    github_links,
    slides,
    other_links) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;

async function resetVideoTable() {
  let res = await query(drop);
  console.log(res);

  res = await query(create);
  console.log(res);

  sampleData.map(async (obj) => {
    res = await query(populate, [
      obj.title,
      obj.lecturer,
      obj.video_url,
      obj.thumbnail_url,
      obj.tags,
      obj.timestamps,
      obj.lecture_date,
      obj.bootcamp_week,
      obj.description,
      obj.github_links,
      obj.slides,
      obj.other_links,
    ]);
    console.log(res);
  });
}

resetVideoTable();
