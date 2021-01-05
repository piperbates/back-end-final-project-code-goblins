const { query } = require("../index");

//GET REQUESTS
//get all resources
async function getAllResources() {
  const res = await query(`
  SELECT * FROM resourcestable
    `);
  return res.rows;
}

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
        feedback
        )
      VALUES ($1)
      `,
      [
        value
      ]
    );
    return res;
  }

  //Add New Resource to the resources table 
  async function addNewResource(value) {
    console.log({value})
    const res = await query(
      `
      INSERT INTO resourcesTable (
        title,
        lecturer,
        videourl,
        thumbnailurl,
        videodesc
        )
      VALUES ($1, $2, $3, $4, $5)
      `,
      [value.title, value.lecturer, value.videourl, value.thumbnailurl, value.videodesc]
    );
    return res;
  }

  module.exports = {
      addNewFeedback, addNewResource, getAllFeedback, getAllResources
  }