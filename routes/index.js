var express = require("express");
var router = express.Router();

const {
  getAllVideos,
  addVideo,
  deleteVideo,
  updateVideo,
  getFilteredVideos,
} = require("../model/index");

//get all videos with optional search filter parameters

router.get("/", async function (req, res, next) {
  const { search, lecturer, tag } = req.query;
  if (search || lecturer || tag) {
    var result = await getFilteredVideos({ search, lecturer, tag });
  } else {
    var result = await getAllVideos();
  }
  res.json(result);
});

//add a video
router.post("/", async function (req, res, next) {
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

module.exports = router;
