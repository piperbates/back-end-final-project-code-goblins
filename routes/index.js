var express = require("express");
var router = express.Router();

const {
  getAllVideos,
  addVideo,
  deleteVideo,
  updateVideo,
  getFilteredVideos,
  getVideoById,
  // getAllFeedback,
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
} = require("../model/index");

// Get all videos with optional search filter parameters (see readme.md for query parameters)
router.get("/search", async function (req, res, next) {
  const { search, lecturer, week, tag } = req.query;
  if (search || lecturer || week || tag) {
    var result = await getFilteredVideos({ search, lecturer, week, tag });
  } else {
    var result = await getAllVideos();
  }
  res.json(result);
});

// Get a specific video by id at the specified path
router.get("/searchbyid/:id", async function (req, res, next) {
  const { id } = req.params;
  const result = await getVideoById(id);
  res.json(result);
});

// Add a video
router.post("/addcontent", async function (req, res, next) {
  console.log("post request made");
  const {
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
  } = req.body;
  const result = await addVideo(
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
  );
  console.log(result);
  res.json({ success: true, data: result });
});

//Delete Video
//Delete request to http://localhost:5000/idNumb

router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  const result = await deleteVideo(id);
  res.json({ success: true, data: result });
});

//Update Video
//Put request to http://localhost:5000/idNumb
//In req.body put in column wanting to be changed with value.
router.put("/:id", async function (req, res, next) {
  const id = req.params.id;
  const {
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
  } = req.body;
  const result = await updateVideo(
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
  );
  res.json({ success: true, data: `Row with id ${result} has been updated.` });
});

// /* GET all feedback */
// router.get('/feedback', async function(req, res, next) {
//   const feedback = await getAllFeedback();
//   res.json({success: true, payload: feedback})
// });

//POST new feedback
router.post("/feedback", async function (req, res) {
  let body = req.body;
  console.log(`this is the feedback for ${body.videoId}: ${body.feedback}`);

  const items = await addNewFeedback(body);
  // console.log("this is items", items);
  res.json(items);
});

router.get("/vimeo/allData", async function (req, res, next) {
  const vimeoData = await getVimeoVideoData(req.query);
  res.json(vimeoData);
});

/*** tag routes ***/
/* these are used for tag editor */
router.get("/tags", async function (req, res, next) {
  const tagData = await getAllTagData();
  res.json(tagData);
});

router.delete("/tags/:id", async function (req, res, next) {
  const response = await deleteTag(req.params.id);
  res.json(response);
});

router.post("/tags", async function (req, res, next) {
  const response = await addTag(req.body.tag);
  res.json(response);
});

router.patch("/tags", async function (req, res, next) {
  const response = await updateTag(req.body);
  res.json(response);
});

router.get("/tags/lastkey", async function (req, res, next) {
  const response = await getNextTagVal();
  res.json(response);
});

/*** lecture routes ***/
/* these are used for lecture editor */
router.get("/lecturers", async function (req, res, next) {
  const lecturerData = await getAllLecturerData();
  res.json(lecturerData);
});

router.delete("/lecturers/:id", async function (req, res, next) {
  const response = await deleteLecturer(req.params.id);
  res.json(response);
});

router.post("/lecturers", async function (req, res, next) {
  const response = await addLecturer(req.body.lecturer);
  res.json(response);
});

router.patch("/lecturers", async function (req, res, next) {
  const response = await updateLecturer(req.body);
  res.json(response);
});

router.get("/lecturers/lastkey", async function (req, res, next) {
  const response = await getNextLecturerVal();
  res.json(response);
});

/*** search filter routes ***/
/* these are used for home page search functionality */
router.get("/filter/tags", async function (req, res, next) {
  const response = await getUniqueTags();
  res.json(Array.from(response).map((tag) => tag.value));
});

router.get("/filter/week", async function (req, res, next) {
  const response = await getUniqueWeek();
  res.json(Array.from(response).map((week) => week.value));
});

router.get("/filter/lecturer", async function (req, res, next) {
  const response = await getUniqueSocLecturer();
  res.json(Array.from(response).map((lecturer) => lecturer.value));
});

router.get("/filter/guest", async function (req, res, next) {
  const response = await getUniqueNonSocLecturer();
  res.json(Array.from(response).map((guest) => guest.value));
});

module.exports = router;
