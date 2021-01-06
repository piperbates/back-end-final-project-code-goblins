const { query } = require("../db");

//Get all videos
async function getAllVideos() {
  const result = await query(`SELECT * FROM videos ;`);
  return result.rows;
}

//Get filtered videos from the search query URL parameters
async function getFilteredVideos(urlQueries) {
  // Destructure url search parameters
  let { search, lecturer, week, tag } = urlQueries;
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
      AND (bootcamp_week = COALESCE($3, bootcamp_week))
      AND ARRAY ${tag}::text[]<@tags;`,
    [search, lecturer, week]
  );
  return result.rows;
}

// Get a specific video by ID
async function getVideoById(id) {
  const result = await query("SELECT * FROM videos WHERE id = $1;", [id]);
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
  title = COALESCE($1, title),
  lecturer = COALESCE($2, lecturer),
  video_url = COALESCE($3, video_url),
  thumbnail_url = COALESCE($4, thumbnail_url),
  tags = COALESCE($5, tags),
  timestamps = COALESCE($6, timestamps),
  lecture_date = COALESCE($7, lecture_date),
  bootcamp_week = COALESCE($8, bootcamp_week),
  description = COALESCE($9, description),
  github_links = COALESCE($10, github_links),
  slides = COALESCE($11, slides),
  other_links = COALESCE($12, other_links) 
  WHERE id = ($13) 
  RETURNING id;`,
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
  return result.rows[0].id;
}


/* FEEDBACK BUTTON */
//get all feedback
async function getAllFeedback() {
  const res = await query(`
  SELECT * FROM feedbacktable
    `);
  return res.rows;
}


//Add new feedback function, adds new piece of feedback to the feedback table
async function addNewFeedback(value) {
    console.log({value})
    const res = await query(
      `
      INSERT INTO feedbackTable (
        videoid,
        feedback
        )
      VALUES ($1, $2)
      `,
      [
        value.videoId, value.feedback
      ]
    );
    return res;
  }

module.exports = {
  getAllVideos,
  getFilteredVideos,
  addVideo,
  deleteVideo,
  updateVideo,
  getVideoById,
  getAllFeedback, 
  addNewFeedback
};