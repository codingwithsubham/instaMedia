const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Content = require("../../models/content");
const Category = require("../../models/category");

const {
  SERVER_ERROR,
  STATUS_CODE_500,
} = require("../../common/constant/constants");

// @route POST api/content/save-content
// @desc Save Content to DB
// @access Private
router.post("/save-content", auth, async (req, res) => {
  try {
    const { category, subCategory } = req.body;
    let dbCat = await Category.findOne({ name: category.toLowerCase() });
    if (!dbCat) {
      dbCat = new Category({
        name: category.toLowerCase(),
        subCategory: [subCategory.toLowerCase()],
      });
      await dbCat.save();
    } else {
      if (!dbCat.subCategory?.includes(subCategory.toLowerCase())) {
        dbCat.subCategory.push(subCategory.toLowerCase());
        await dbCat.save();
      }
    }
    const content = new Content(req.body);
    await content.save();
    res.json(content);
  } catch (err) {
    console.log(err);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/content/get-contents
// @desc Get All Contents from DB
// @access Private
router.get("/get-contents", auth, async (req, res) => {
  try {
    const contents = await Content.find({});
    return res.json(contents);
  } catch (err) {
    console.log(err);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/content/get-categories
// @desc Get All Contents from DB
// @access Private
router.get("/get-categories", auth, async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

module.exports = router;
