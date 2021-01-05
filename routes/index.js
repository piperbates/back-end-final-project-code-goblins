var express = require('express');
var router = express.Router();
const {
  addNewFeedback, addNewResource, getAllResources, getAllFeedback
} =require("../db/models/data");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET all resources */
router.get('/resources', async function(req, res, next) {
  const resources = await getAllResources();
  res.json({success: true, payload: resources})
});

/* GET all feedback */
router.get('/feedback', async function(req, res, next) {
  const feedback = await getAllFeedback();
  res.json({success: true, payload: feedback})
});

//POST a new resource to the library
router.post("/resources", async function (req, res) {
  let body = req.body;
  console.log(`New Resource, ${body.title} has been added to the resource library`);
  
  const items = await addNewResource(body);
  // console.log("this is items", items);
  res.json(items);
});

//POST new feedback
router.post("/feedback", async function (req, res) {
  let body = req.body;
  console.log("this is the feedback:", body.feedback);
  
  const items = await addNewFeedback(body);
  // console.log("this is items", items);
  res.json(items);
});


module.exports = router;
