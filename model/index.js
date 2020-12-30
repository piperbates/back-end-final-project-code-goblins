const { query } = require("../db");

//Get all videos
async function getAllVideos() {
  const result = await query(`SELECT * FROM videos ;`);
  return result.rows;
}

//Add video
async function addVideo(
  title,
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
  other_links
) {
  const result = await query(
    `INSERT INTO videos (title,
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
      other_links) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;`,
    [title,
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
      other_links]
  );
  return result.rows;
}

module.exports = {
  getAllVideos,
  addVideo,
};
