// Import query
const { query } = require("../index");
require("dotenv").config();

// Sample Data
const sampleData = [
  {
    title: "Week 13 - Day 4 - Simon and David from Wondr",
    lecturer: "Guest",
    video_url: "https://vimeo.com/495726092",
    thumbnail_url: "https://i.vimeocdn.com/video/1025552077_295x166.jpg?r=pad",
    tags: ["wondr", "guest lecture", "agile", "teams", "startups"],
    timestamps: [
      {
        name: "start",
        time: "0",
      },
      {
        name: "middle",
        time: "1800",
      },
    ],
    lecture_date: "2020-12-17",
    bootcamp_week: "13",
    description: "Simon and David from Wondr talk about their startup journey",
    github_links: ["https://github.com/SchoolOfCode/"],
    slides: ["https://www.google.com"],
    other_links: ["https://site.mywondr.co/"],
  },
  {
    title: "Week 12 - Day 5 - Serverless",
    lecturer: "Liz",
    video_url: "https://vimeo.com/495725984",
    thumbnail_url: "https://i.vimeocdn.com/video/1025552912_295x166.jpg?r=pad",
    tags: ["serverless", "aws", "cloud"],
    timestamps: [
      {
        name: "start",
        time: "0",
      },
      {
        name: "middle",
        time: "1800",
      },
    ],
    lecture_date: "2020-12-11",
    bootcamp_week: "12",
    description: "A workshop on getting a serverless API up and running",
    github_links: ["https://github.com/SchoolOfCode/"],
    slides: ["https://www.google.com"],
    other_links: ["https://aws.amazon.com/"],
  },
  {
    title: "Week 12 - Day 4 - Docker",
    lecturer: "Tao",
    video_url: "https://vimeo.com/489797788",
    thumbnail_url: "https://i.vimeocdn.com/video/1013185470_295x166.jpg?r=pad",
    tags: ["docker", "servers", "cloud"],
    timestamps: [
      {
        name: "start",
        time: "0",
      },
      {
        name: "middle",
        time: "1800",
      },
    ],
    lecture_date: "2020-12-10",
    bootcamp_week: "12",
    description: "A workshop on Docker and getting it up and running",
    github_links: ["https://github.com/SchoolOfCode/"],
    slides: ["https://www.google.com"],
    other_links: ["https://www.docker.com/"],
  },
  {
    title: "Week 10 - Day 2 - useReducer Review (Recap Sesssion)",
    lecturer: "Liz",
    video_url: "https://vimeo.com/489792489",
    thumbnail_url: "https://i.vimeocdn.com/video/1013197144_295x166.jpg?r=pad",
    tags: ["react", "usereducer", "functions", "javascript"],
    timestamps: [
      {
        name: "start",
        time: "0",
      },
      {
        name: "middle",
        time: "1800",
      },
    ],
    lecture_date: "2020-11-10",
    bootcamp_week: "10",
    description: "A recap of useReducer",
    github_links: ["https://github.com/SchoolOfCode/"],
    slides: ["https://www.google.com"],
    other_links: ["https://www.docker.com/"],
  },
  {
    title: "Week 10 - Day 1 - JWT Authentication",
    lecturer: "Ben",
    video_url: "https://vimeo.com/489792198",
    thumbnail_url: "https://i.vimeocdn.com/video/1013175389_295x166.jpg?r=pad",
    tags: ["node", "authentication", "jwt", "tokens"],
    timestamps: [
      {
        name: "start",
        time: "0",
      },
      {
        name: "middle",
        time: "1800",
      },
    ],
    lecture_date: "2020-11-06",
    bootcamp_week: "10",
    description: "Implementing and using JWT",
    github_links: ["https://github.com/SchoolOfCode/"],
    slides: ["https://www.google.com"],
    other_links: ["https://www.docker.com/"],
  },
];

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

// Execute
async function execute() {
  for (let i = 0; i < sampleData.length; i++) {
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
    } = sampleData[i];
    await addVideo(
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
  }
}

execute();
