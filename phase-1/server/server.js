const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

// MULTER
app.use(express.static("uploads"));
const multer = require("multer");
const { FILE } = require("dns");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

// TIME CONVERSION
const today = new Date();
const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Incoming request from ${req.path} @ ${dateTime}`);
  next();
});

// READING PostData.json
let myData;
fs.readFile("PostData.json", "utf8", (err, postData) => {
  if (err) {
    console.log("File read failed: ", err);
  } else {
    myData = JSON.parse(postData);
    console.log("File read successful");
  }
});

// GETTING POSTS FROM SERVER
app.get("/posts", (req, res) => {
  let postsArray = [];
  myData.map((data) => {
    postsArray.push({
      id: data.id,
      car: data.car,
      userName: data.userName,
      image: data.image,
      description: data.description,
      likes: data.likes,
      timestamp: data.timestamp,
      deleted: data.deleted,
    });
  });
  res.status(200).json(postsArray);
});

// POSTING TO SERVER
app.post("/posts", (req, res) => {
  const myObj = {
    id: Date.now().toString(),
    car: req.body.car,
    userName: "U",
    image: req.body.image,
    description: req.body.description,
    likes: 0,
    timestamp: Date.now(),
    deleted: false,
  };
  myData.unshift(myObj);
  res.status(200).json(myData);

  // WRITING TO PostData.json
  const strigifiedData = JSON.stringify(myData);
  fs.writeFile("PostData.json", strigifiedData, (err) => {
    if (err) {
      console.log("Write file failed");
    } else {
      console.log("Successfully wrote to file");
    }
  });
});

// POSTING FILE TO SERVER
app.post("/posts/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

// DELETING POST FROM SERVER
app.post("/posts/:id/delete", (req, res) => {
  myData.forEach((post) => {
    if (post.id === req.params.id) {
      post.deleted = true;
    }
  });
  res.status(200).json(myData);
});

app.listen(8080, () => {
  console.log(`Now listening at port 8080 for Carnnection @ ${dateTime}`);
});
