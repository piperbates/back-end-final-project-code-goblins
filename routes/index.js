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

/*** tag management ***/

router.get("/tags/", async function (req, res, next) {
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

module.exports = router;
