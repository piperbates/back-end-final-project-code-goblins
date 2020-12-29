const { query } = require("../db");

//Get all videos
async function getAllVideos() {
  const result = await query(`SELECT * FROM videos ;`);
  return result.rows;
}

//Add video
async function addVideo(title, tags, timestamps) {
  const result = await query(
    `INSERT INTO videos (title, tags, timestamps) VALUES ($1, $2, $3) RETURNING *;`,
    [title, tags, timestamps]
  );
  return result.rows;
}

module.exports = {
    getAllVideos,
    addVideo,
};