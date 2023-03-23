const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const fs = require("fs");
const path = require("path");
const uploads = require("../../middleware/fileUpload");

const {
  SERVER_ERROR,
  STATUS_CODE_500,
} = require("../../common/constant/constants");

// @route GET api/media
// @desc Get Media
// @access Private
router.get("/", auth, async (req, res) => {
  //finds the stored directory
  const updoalDirectory = path.join("uploads");
  //reads the file in the directory
  fs.readdir(updoalDirectory, (err, files) => {
    if (err) {
      return res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
    //if there is no file
    if (files.length === 0) {
      return res.json("No Images Uploaded");
    }
    //finally returning the files
    return res.json(files);
  });
});

// @route POST api/media
// @desc Upload Media
// @access Private
router.post("/", auth, uploads.single("image"), async (req, res) => {
  const image = req.file.filename;
  res.json({ image });
});

module.exports = router;
