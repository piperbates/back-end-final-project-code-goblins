var express = require("express");
var router = express.Router();


const { getAllVideos, addVideo } = require("../model/index");

//get all videos

router.get("/", async function (req, res, next) {
  console.log("get request made");
  const result = await getAllVideos();
  console.log("request made");
  console.log(result);
  res.json({ success: true, data: result });
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

module.exports = router;
