const { error } = require("console");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

function readFile(file, callback) {
  fs.readFile(file, "utf8", callback);
}

function writeFile(file, data, callback) {
  fs.writeFile(file, JSON.stringify(data), callback);
}
//grab the the JSON data PARSE + MAP into a variable
router.get("/", (request, response) => {
  readFile("./data/videos.json", (error, data) => {
    console.log("readFile data....", data);
    if (error) {
      return response.send(error);
    }
    const videosArray = JSON.parse(data);
    const videos = videosArray.map((video) => ({
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    }));
    response.json(videos);
  });
});

router.get("/:id", (request, response) => {
  readFile("./data/videos.json", (error, data) => {
    if (error) {
      return response.send(error);
    }

    const videos = JSON.parse(data);

    const activeVideo = videos.find((video) => video.id === request.params.id);

    if (activeVideo) {
      response.json(activeVideo);
    } else {
      response.status(404).send(`OOOPS cant find video ${request.params.id}`);
    }
  });
});

// POST//// check that request.body doesnt retuen an an empty message

router.post("/", (request, response) => {
  readFile("./data/videos.json", (error, data) => {
    if (error) {
      return response.send(error);
    }
    const videoData = JSON.parse(data);

    videoData.push({
      id: uuidv4(),
      title: request.body.title,
      channel: "Donkey",
      image: "/img/image8.jpeg",
      description: request.body.description,
      views: "0",
      likes: "0",
      duration: "8:08",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: Date.now(),
      comments: [
        {
          id: uuidv4(),
          comment: "My First Wife Divorced Me",
          name: "Monkey Man",
          timestamp: Date.now(),
        },
        {
          id: uuidv4(),
          comment: "Second Wife Ran Away",
          name: "Monkey Man",
          timestamp: Date.now(),
        },
        {
          id: uuidv4(),
          comment: "Third Wife Flew Away",
          name: "Monkey Man",
          timestamp: Date.now(),
        },
      ],
    });

    console.log("videoData Push....", videoData);

    //change back to video
    writeFile("./data/videos.json", videoData, (error) => {
      if (error) {
        return response.send("sorry not writing file");
      }
      response.status(201).send("your special video has been posted!");
    });
  });
});

module.exports = router;