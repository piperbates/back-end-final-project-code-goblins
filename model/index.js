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
    [
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
      other_links,
    ]
  );
  return result.rows;
}

//Delete video
async function deleteVideo(id) {
  const result = await query(`DELETE FROM videos WHERE id = ($1);`, [id]);
  return result.rows;
}

//Update video
async function updateVideo(
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
  other_links,
  id
) {
  const result = await query(
    `UPDATE videos SET
  title = ($1),
  lecturer = ($2),
  video_url = ($3),
  thumbnail_url = ($4),
  tags = ($5),
  timestamps = ($6),
  lecture_date = ($7),
  bootcamp_week = ($8),
  description = ($9),
  github_links = ($10),
  slides = ($11),
  other_links = ($12) 
  WHERE id = ($13) `,
    [
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
      other_links,
      id,
    ]
  );
  return result.rows;
}

module.exports = {
  getAllVideos,
  addVideo,
  deleteVideo,
  updateVideo,
};
