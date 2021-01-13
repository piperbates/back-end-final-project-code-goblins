const { query } = require("../db");
let Vimeo = require("vimeo").Vimeo;
let client = new Vimeo(
  process.env.VIMEO_ID,
  process.env.VIMEO_SECRET,
  process.env.VIMEO_TOKEN
);

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
  cohort,
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
      cohort,
      description,
      github_links,
      slides,
      other_links) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;`,
    [
      title,
      lecturer,
      video_url,
      thumbnail_url,
      tags,
      timestamps,
      lecture_date,
      bootcamp_week,
      cohort,
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
  cohort,
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
  cohort = COALESCE($9, bootcamp_week),
  description = COALESCE($10, description),
  github_links = COALESCE($11, github_links),
  slides = COALESCE($12, slides),
  other_links = COALESCE($13, other_links) 
  WHERE id = ($14) 
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
      cohort,
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
  console.log({ value });
  const res = await query(
    `
      INSERT INTO feedbackTable (
        videoid,
        feedback
        )
      VALUES ($1, $2)
      `,
    [value.videoId, value.feedback]
  );
  return res;
}

const getVimeoVideoData = async (query) => {
  return new Promise((resolve, reject) => {
    client.request(
      {
        path: "/me/videos",
        query: {
          page: query.pagePosition,
          per_page: query.perPageCount,
          fields:
            "uri,name,description,link,duration,created_time,pictures.sizes",
        },
      },
      (error, body) => {
        if (error) {
          reject(error);
        }
        resolve(body);
      }
    );
  });
};

/*** tag functions ***/

const getAllTagData = async () => {
  const sql = `SELECT * FROM tags ORDER BY tag ASC`;
  const response = await query(sql);
  return response.rows;
};

const deleteTag = async (tag) => {
  const sql = `DELETE FROM tags WHERE key = $1`;
  const response = await query(sql, [tag]);
  return response.rows;
};

const addTag = async (tag) => {
  const sql = `INSERT INTO tags (tag) VALUES ($1)`;
  const response = await query(sql, [tag]);
  return response.rows;
};

const updateTag = async (tag) => {
  const sql = `UPDATE tags SET tag = $1 WHERE key = $2`;
  const response = await query(sql, [tag.updateValue, tag.updateRecord]);
  return response.rows;
};

const getNextTagVal = async () => {
  const sql = `SELECT last_value FROM tags_key_seq`;
  const response = await query(sql);
  return response.rows;
};

/*** lecture functions ***/

const getAllLecturerData = async () => {
  const sql = `SELECT * FROM lecturers ORDER BY lecturer ASC`;
  const response = await query(sql);
  return response.rows;
};

const deleteLecturer = async (lecturer) => {
  const sql = `DELETE FROM lecturers WHERE key = $1`;
  const response = await query(sql, [lecturer]);
  return response.rows;
};

const addLecturer = async (lecturer) => {
  const sql = `INSERT INTO lecturers (lecturer) VALUES ($1)`;
  const response = await query(sql, [lecturer]);
  return response.rows;
};

const updateLecturer = async (lecturer) => {
  const sql = `UPDATE lecturers SET lecturer = $1 WHERE key = $2`;
  const response = await query(sql, [
    lecturer.updateValue,
    lecturer.updateRecord,
  ]);
  return response.rows;
};

const getNextLecturerVal = async () => {
  const sql = `SELECT last_value FROM lecturers_key_seq`;
  const response = await query(sql);
  return response.rows;
};

/*** filter functions ***/
const getUniqueTags = async () => {
  const sql = `SELECT DISTINCT UNNEST(tags) AS value FROM videos ORDER BY value ASC`;
  const response = await query(sql);
  return response.rows;
};

const getUniqueWeek = async () => {
  const sql = `SELECT DISTINCT(bootcamp_week) AS value FROM videos ORDER BY bootcamp_week ASC`;
  const response = await query(sql);
  return response.rows;
};

const getUniqueSocLecturer = async () => {
  const sql = `SELECT DISTINCT(lecturer) 
               AS value
               FROM videos 
               WHERE lecturer 
               IN (
                 SELECT DISTINCT(lecturer) 
                 FROM lecturers)
               ORDER BY lecturer ASC`;
  const response = await query(sql);
  return response.rows;
};

const getUniqueNonSocLecturer = async () => {
  const sql = `SELECT DISTINCT(lecturer)
               AS value
               FROM videos 
               WHERE lecturer 
               NOT IN (
                 SELECT DISTINCT(lecturer) 
                 FROM lecturers
                 )
               ORDER BY lecturer ASC`;
  const response = await query(sql);
  return response.rows;
};

module.exports = {
  getAllVideos,
  getFilteredVideos,
  addVideo,
  deleteVideo,
  updateVideo,
  getVideoById,
  getAllFeedback,
  addNewFeedback,
  getVimeoVideoData,
  getAllTagData,
  deleteTag,
  addTag,
  updateTag,
  getAllLecturerData,
  deleteLecturer,
  addLecturer,
  updateLecturer,
  getNextLecturerVal,
  getNextTagVal,
  getUniqueTags,
  getUniqueWeek,
  getUniqueNonSocLecturer,
  getUniqueSocLecturer,
};
