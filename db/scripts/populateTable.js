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
        timeDesc: "Start",
        timeString: "00:00:00",
        timeSecondsValue: 0,
      },
      {
        timeDesc: "Our Journey",
        timeString: "00:13:39",
        timeSecondsValue: 300,
      },
      {
        timeDesc: "Our Company",
        timeString: "00:34:30",
        timeSecondsValue: 2070,
      },
      {
        timeDesc: "Final Words",
        timeString: "00:49:37",
        timeSecondsValue: 2977,
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
        timeDesc: "Introduing AWS",
        timeString: "00:00:00",
        timeSecondsValue: 0,
      },
      {
        timeDesc: "More on sererless functions",
        timeString: "00:26:36",
        timeSecondsValue: 1596,
      },
      {
        timeDesc: "Lambda functions",
        timeString: "01:17:35",
        timeSecondsValue: 4655,
      },
      {
        timeDesc: "Putting it all together",
        timeString: "01:46:15",
        timeSecondsValue: 6375,
      },
      {
        timeDesc: "What next",
        timeString: "02:17:22",
        timeSecondsValue: 8242,
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
        timeDesc: "Introducing Docker",
        timeString: "00:00:00",
        timeSecondsValue: 0,
      },
      {
        timeDesc: "Containers vs Serverless",
        timeString: "00:06:30",
        timeSecondsValue: 390,
      },
      {
        timeDesc: "Leveraging the power of containers",
        timeString: "00:18:54",
        timeSecondsValue: 1134,
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
        timeDesc: "Start",
        timeString: "00:00:00",
        timeSecondsValue: 0,
      },
      {
        timeDesc: "Deep dive on use reducer",
        timeString: "00:05:30",
        timeSecondsValue: 330,
      },
      {
        timeDesc: "Further React hooks",
        timeString: "00:21:20",
        timeSecondsValue: 1280,
      },
      {
        timeDesc: "Advanced techniques",
        timeString: "00:42:49",
        timeSecondsValue: 2569,
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
        timeDesc: "What are JWTs?",
        timeString: "00:00:00",
        timeSecondsValue: 0,
      },
      {
        timeDesc: "The inner workings of tokens",
        timeString: "00:07:10",
        timeSecondsValue: 430,
      },
      {
        timeDesc: "Security essentials",
        timeString: "00:13:50",
        timeSecondsValue: 830,
      },
      {
        timeDesc: "Workshop review",
        timeString: "00:28:47",
        timeSecondsValue: 1727,
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
