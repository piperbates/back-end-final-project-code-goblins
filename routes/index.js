var express = require("express");
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// "dev": "nodemon -r dotenv/config ./bin/www",

const { getAllVideos, addVideo } = require("../model/index");

//get all videos

router.get("/", async function (req, res, next) {
  console.log("get request made");
  const result = await getAllVideos();
  console.log("request made");
  console.log(result)
  res.json({ success: true, data: result });
});

//add a video
router.post("/", async function (req, res, next) {
  console.log("post request made");
  const { title, tags, timestamps } = req.body;
  const result = await addVideo(title, tags, timestamps);
  console.log(result)
  res.json({ success: true, data: result });
});

module.exports = router;
