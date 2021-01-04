# Code Goblins - Lecture Resources Hub
- **The Problem**: **How can we deliver Lecture Resources to bootcampers?**
    - Accessing and finding relevant videos and resources.
    - Getting specific information quickly and efficiently in one place.
    - Adding value to existing resources - Specifically long lecture recordings.

- **The Solution**: 
    - Lecture Resources Hub, youtube style layout.
    - Displays all videos which can then be searched through and filtered to narrow results to what bootcampers need.
    - Video viewer page that displays lecture but also contains extra information such as links to slides or github classroom links for bootcampers to access.
    - Content Management Page for coaches to upload videos and all the data on them to the database.

---

# First-time Setup

1. Clone the repo from https://github.com/SchoolOfCode/back-end-final-project-code-goblins

2. Install node modules with ```npm install```.

3. Run server using ```npm run dev```.

4. **Optional.** If you haven't already made a table create one with ```npm run createTable```.

5. **Optional.** You can also drop the pre-existing table with ```npm run dropTable``` then run the command above to create a new table.

---
# Technologies Used
- **Node.js** **v12.18.4.**
- **Express** **~4.16.1**
- **Node Postgres(PG)** **^8.5.1**
- **Nodemon** **^2.0.6**
- **CORS** **^2.8.5**
---
# API Requests

## GET All Lecture/Videos from database
- To get all lecture/videos from the database make a **GET** request to **http://localhost:5000**.
- For example the data will be returned like this:
```
{
    "id": 1,  
    "title": "database lecture",  
    "lecturer": "Chris Meah",
    "video_url": "youtube.com",
    "thumbnail_url": "image.svg",
    "tags": [
            "database",
            "postgreSQL",
            "SQL"
    ],
    "timestamps": [
            {
              "name": "intro",
              "time": "1:00"
            },
            {
              "name": "middle",
              "time": "15.05"
            }
    ],
    "lecture_date": "2021-01-01T00:00:00.000Z",
    "bootcamp_week": "Bootcamp week 4",
    "description": "A description of the video.",
    "github_links": [
                    "github link",
                    "second github link"
    ],
    "slides": [
              "google slides link",
              "More slides"
    ],
    "other_links": [
                "Link to medium",
                "Link to code wars"
    ]
}
```
---
## GET with query parameters
- ADD SOME INFORMATION HERE
---
## POST to the database
- Send a **POST** request to **"http://localhost:5000"**.
- In your request body use the following format for your data:
```
{
    "title": "",
    "lecturer": "",
    "video_url": "",
    "thumbnail_url": "",
    "tags": [""],
    "timestamps": [{"name": "", "time": ""}],
    "lecture_date": "01/01/2021",
    "bootcamp_week": "",
    "description": "",
    "github_links": [""],
    "slides": [""],
    "other_links": [""]
}
```
- If adding data through **Postman** fill the string with the data needed and remember to input the date in a valid format that can be picked up by SQL.
- If adding through the **front-end** then use the form on the **Content Management Page** to input data.
--- 
## ADD INSTRUCTIONS FOR UPDATE AND DELETE