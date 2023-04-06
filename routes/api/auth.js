const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const fs = require("fs");
const fileName = "./config/appConfig.json";
const file = require("../../config/appConfig.json");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const {
  SERVER_ERROR,
  JWT_SECRET,
  EXPIRES_IN,
  STATUS_CODE_500,
  EMAIL_REQUIRED_INVALID,
  EMAIL,
  PASSWORD,
  PASSWORD_INVALID,
  INVALID_CREDENTIALS,
  STATUS_CODE_400,
  MOBILE,
  MOBILE_REQUIRED,
  USER_EXSISTS,
} = require("../../common/constant/constants");

// @route POST api/auth
// @desc Register A User
// @access Public
router.post("/register", async (req, res) => {
  //pulling the data
  const { name, mobile, age, password, role } = req.body;
  try {
    const checkUser = await User.findOne({mobile: mobile});
    if(checkUser){
      return res.status(STATUS_CODE_400).send({ errors: [{ msg: USER_EXSISTS }] });
    }
    //creating a user
    const newUser = {
      mobile: mobile,
      password: password,
      name: name,
      age: age,
      role: role,
    };
    //creating a new user Data Object
    let user = new User(newUser);
    //preparing The Salt
    const salt = await bcrypt.genSalt(10);
    //hashing the Password
    user.password = await bcrypt.hash(newUser.password, salt);
    //save the Data to db
    await user.save();
    const payload = {
      user: {
        id: user.id,
        userData: user,
      },
    };
    //Signing the Token
    jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  [
    check(MOBILE, MOBILE_REQUIRED).exists(),
    check(PASSWORD, PASSWORD_INVALID).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(STATUS_CODE_400).json({ errors: errors.array() });
    }

    //retriving Data
    const { mobile, password } = req.body;

    try {
      //Email Check In DB
      let user = await User.findOne({
        $or: [
          {
            mobile: { $regex: new RegExp("^" + mobile.toLowerCase(), "i") },
          },
        ],
      });

      if (!user) {
        return res.status(STATUS_CODE_400).json({
          errors: [{ msg: INVALID_CREDENTIALS }],
        });
      }

      //Match The Passwords
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(STATUS_CODE_400)
          .json({ errors: [{ msg: INVALID_CREDENTIALS }] });
      }

      //Create Payload
      const payload = {
        user: {
          id: user._id,
          userData: user,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN }, (err, token) => {
        if (err) {
          throw err;
        }

        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_CODE_500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @route GET api/auth
// @desc Get User By Id
// @access Private
router.get("/load-user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route PUT api/auth
// @desc Update User
// @access Private
router.post("/update-user/:type", auth, async (req, res) => {
  try {
    const { user } = req.body;
    const userData = await User.findById(req.user.id).select("-password");

    if (!userData) {
      res.status(STATUS_CODE_400).json({ errors: [{ msg: BAD_REQUEST }] });
    }

    if (req.params.type === "bank") {
      userData.bankDetails = user.bankDetails;
    } else if (req.params.type === "profile") {
      userData.name = user.name;
      userData.age = user.age;
      userData.username = user.username;
    }

    await userData.save();
    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

module.exports = router;
