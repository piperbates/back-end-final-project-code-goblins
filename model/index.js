const { query } = require("../db");

//Get all videos
async function getAllVideos() {
  const result = await query(`SELECT * FROM videos ;`);
  return result.rows;
}

//Get filtered videos from the search query URL parameters
async function getFilteredVideos(urlQueries) {
  // Destructure url search parameters
  let { search, lecturer, tag } = urlQueries;
  // Pre-format search string if it exists
  search ? (search = `%${search}%`) : (search = `%%`);
  // Pre-format lecturer string if it exists
  lecturer ? (lecturer = `%${lecturer}%`) : (lecturer = "%%");
  // Pre-format tags if they exist
  tag
    ? (tag = "['" + (Array.isArray(tag) ? tag.join("','") : tag) + "']")
    : (tag = "[]");

  const result = await query(
    `SELECT * FROM videos
      WHERE (description ILIKE $1 OR title ILIKE $1)
      AND (lecturer ILIKE $2)
      AND ARRAY ${tag}::text[]<@tags;`,
    [search, lecturer]
  );
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

module.exports = {
  getAllVideos,
  getFilteredVideos,
  addVideo,
};
