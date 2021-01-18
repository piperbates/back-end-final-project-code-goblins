const { query } = require("../db");
let Vimeo = require("vimeo").Vimeo;
let client = new Vimeo(
  process.env.VIMEO_ID,
  process.env.VIMEO_SECRET,
  process.env.VIMEO_TOKEN
);
const { config } = require("../config");

//Get all videos
async function getAllVideos() {
  const result = await query(
    `SELECT * FROM ${config.DATABASE_VIDEOS} ORDER BY lecture_date DESC;`
  );
  return result.rows;
}

//Get filtered videos from the search query URL parameters
async function getFilteredVideos(urlQueries) {
  let { search, lecturer, week, tag } = urlQueries;
  search ? (search = `%${search}%`) : (search = `%%`);
  lecturer ? (lecturer = `%${lecturer}%`) : (lecturer = "%%");
  tag
    ? (tag = "['" + (Array.isArray(tag) ? tag.join("','") : tag) + "']")
    : (tag = "[]");

  const result = await query(
    `SELECT * FROM ${config.DATABASE_VIDEOS}
      WHERE (description ILIKE $1 OR title ILIKE $1)
      AND (lecturer ILIKE $2)
      AND (bootcamp_week = COALESCE($3, bootcamp_week))
      AND ARRAY ${tag}::text[]&&tags
      ORDER BY lecture_date DESC;`,
    [search, lecturer, week]
  );
  return result.rows;
}

// Get a specific video by ID
async function getVideoById(id) {
  const result = await query(
    `SELECT * FROM ${config.DATABASE_VIDEOS} WHERE id = $1;`,
    [id]
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
  cohort,
  description,
  github_links,
  slides,
  other_links
) {
  const result = await query(
    `INSERT INTO ${config.DATABASE_VIDEOS} (title,
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
  const result = await query(
    `DELETE FROM ${config.DATABASE_VIDEOS} WHERE id = $1;`,
    [id]
  );
  return result.rows;
}

//Update video
async function updateVideo(data) {
  console.log(data.id);
  const result = await query(
    `UPDATE ${config.DATABASE_VIDEOS}
      SET title = $1,
          lecturer = $2,
          video_url = $3,
          thumbnail_url = $4,
          tags = $5,
          timestamps = $6,
          lecture_date = $7,
          bootcamp_week = $8,
          cohort = $9,
          description = $10,
          github_links = $11,
          slides = $12,
          other_links = $13 
      WHERE id = $14
    `,
    [
      data.title,
      data.lecturer,
      data.video_url,
      data.thumbnail_url,
      data.tags,
      data.timestamps,
      data.lecture_date,
      data.bootcamp_week,
      data.cohort,
      data.description,
      data.github_links,
      data.slides,
      data.other_links,
      data.id,
    ]
  );
  return result.rows[0];
}

/* FEEDBACK BUTTON */
//get all feedback

// async function getAllFeedback() {
//   const res = await query(`
//   SELECT * FROM ${config.DATABASE_FEEDBACK}
//     `);

async function getAllFeedback(value) {
  const res = await query(
    `
  SELECT * FROM ${config.DATABASE_FEEDBACK} WHERE videoid = $1 ORDER BY id DESC
    `,
    [value]
  );
  return res.rows;
}

//Add new feedback function, adds new piece of feedback to the feedback table
async function addNewFeedback(value) {
  let date = new Date();
  const res = await query(
    `
      INSERT INTO ${config.DATABASE_FEEDBACK} (
        videoid,
        feedback,
        created_at
        )
      VALUES ($1, $2, $3)
      `,
    [value.videoId, value.feedback, date]
  );
  return res;
}

//Vimeo Data

const getVimeoVideoData = async (query) => {
  return new Promise((resolve, reject) => {
    client.request(
      {
        path: "/me/videos",
        query: {
          page: query.pagePosition,
          per_page: query.perPageCount,
          fields:
            "uri,name,description,link,duration,created_time,pictures.sizes,files",
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
  const sql = `SELECT * FROM ${config.DATABASE_TAGS} ORDER BY tag ASC`;
  const response = await query(sql);
  return response.rows;
};

const deleteTag = async (tag) => {
  const sql = `DELETE FROM ${config.DATABASE_TAGS} WHERE key = $1`;
  const response = await query(sql, [tag]);
  return response.rows;
};

const addTag = async (tag) => {
  const sql = `INSERT INTO ${config.DATABASE_TAGS} (tag) VALUES (LOWER($1))`;
  const response = await query(sql, [tag]);
  return response.rows;
};

const updateTag = async (tag) => {
  const sql = `UPDATE tags SET ${config.DATABASE_TAGS} = LOWER($1) WHERE key = $2`;
  const response = await query(sql, [tag.updateValue, tag.updateRecord]);
  return response.rows;
};

const getNextTagVal = async () => {
  const sql = `SELECT last_value FROM ${config.DATABASE_TAGKEYSEQ}`;
  const response = await query(sql);
  return response.rows;
};

/*** lecture functions ***/

const getAllLecturerData = async () => {
  const sql = `SELECT * FROM ${config.DATABASE_LECTURERS} ORDER BY lecturer ASC`;
  const response = await query(sql);
  return response.rows;
};

const deleteLecturer = async (lecturer) => {
  const sql = `DELETE FROM ${config.DATABASE_LECTURERS} WHERE key = $1`;
  const response = await query(sql, [lecturer]);
  return response.rows;
};

const addLecturer = async (lecturer) => {
  const sql = `INSERT INTO ${config.DATABASE_LECTURERS} (lecturer) VALUES ($1)`;
  const response = await query(sql, [lecturer]);
  return response.rows;
};

const updateLecturer = async (lecturer) => {
  const sql = `UPDATE ${config.DATABASE_LECTURERS} SET lecturer = $1 WHERE key = $2`;
  const response = await query(sql, [
    lecturer.updateValue,
    lecturer.updateRecord,
  ]);
  return response.rows;
};

const getNextLecturerVal = async () => {
  const sql = `SELECT last_value FROM ${config.DATABASE_LECTURERKEYSEQ}`;
  const response = await query(sql);
  return response.rows;
};

/*** filter functions ***/
const getUniqueTags = async () => {
  const sql = `SELECT DISTINCT UNNEST(tags) AS value FROM ${config.DATABASE_VIDEOS} ORDER BY value ASC`;
  const response = await query(sql);
  return response.rows;
};

const getUniqueWeek = async () => {
  const sql = `SELECT DISTINCT(bootcamp_week) AS value FROM ${config.DATABASE_VIDEOS} ORDER BY bootcamp_week ASC`;
  const response = await query(sql);
  return response.rows;
};

const getUniqueSocLecturer = async () => {
  const sql = `SELECT DISTINCT(lecturer) 
               AS value
               FROM ${config.DATABASE_VIDEOS} 
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
               FROM ${config.DATABASE_VIDEOS} 
               WHERE lecturer 
               NOT IN (
                 SELECT DISTINCT(lecturer) 
                 FROM lecturers
                 )
               ORDER BY lecturer ASC`;
  const response = await query(sql);
  return response.rows;
};

const getTotalVideoCount = async () => {
  const sql = `SELECT COUNT(*) FROM videos`;
  const repsonse = await query(sql);
  return repsonse.rows;
};

const getVideosPagination = async (params) => {
  const { paging, position } = params;
  const updPosition = (position - 1) * paging;
  const sql = `SELECT * FROM videos
               LIMIT $1
               OFFSET $2`;
  const response = await query(sql, [paging, updPosition]);
  return response.rows;
};

//LIMIT - amount per page
//OFFSET - row to start in database

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
  getVideosPagination,
  getTotalVideoCount,
};
