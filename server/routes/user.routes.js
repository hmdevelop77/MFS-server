const express = require("express");

const router = express.Router();
const User = require("../models/User.model");
const File = require("../models/File.model");
const Comment = require("../models/Comment.model");
const fileUploader = require("../config/cloudinary.config");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");





// const {
// } = require("../middleWare/route-guard");



// const passport = require("passport");

const saltRounds = 10;

//signup page for client
router.get("/signup", (req, res, next) => {
  try {
    console.log("this will be in the frontend")
  } catch (error) {
    next(error);
  }
});


// get client profile
router.get("/:userid", (req, res, next) => {
  try {
    res.render("./client/profil-client");
  } catch (error) {
    next(error);
  }
});


//get the login page
router.get("/login", (req, res, next) => {
  try {
    console.log("this will be frontend")
  } catch (error) {
    next(error);
  }
});




//the logout of the client
router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      next(error);
    }
  });
});
//routes for google auth


// router.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile"],
//   })
// );
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: `${process.env.APP_HOSTNAME}/client/profile`, // check this url
//     failureRedirect: `${process.env.APP_HOSTNAME}/client/login`, // check this url also
//   })
// );

// GET - gets all the files
router.get("/files", isAuthenticated, async (req, res) => {
    try {
      const response= await File.find().sort( { "title": -1 } )
      res.status(200).json(response);
    } catch (e) {
        res.status(200).json({ message: e });
    }
  });

  //GET - gets one file
router.get("/files/:fileId",isAuthenticated, async (req, res) => {
    try {
      const response = await File.findById(req.params.fileId);
      res.status(200).json(response);
    } catch (e) {
      res.status(200).json({ message: e });
    }
  });


  //POST - create a comment by user or admin       not done yet
router.post("/files/comment", isAuthenticated, async (req, res, next) => {
  try {
    const { text, id } = req.body;
    // if(text===""){
    //    res.render("./client/audios-client", {
    //     errorMessage: "Please enter a comment",
    //   });
    // }
    const commentBody = { username: req.user.username, text, post: id };
    const comment = await Comment.create(commentBody);
    const response = await File.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: comment._id,
        },
      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(200).json({ message: e });
  }
});

//Delete comment by user or admin    not done yet
router.delete(
  "/files/:commentId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const commentOfUser = await Comment.findById(commentId);
      if (commentOfUser.username === req.user.username || req.user.admin) {
        const comment = await Comment.findByIdAndDelete(commentId);
        const response = await File.findByIdAndUpdate(
          commentId,
          {
            $pull: {
              comments: comment._id,
            },
          },
          { new: true }
        );
        res.status(200).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (e) {
        res.status(200).json({ message: e });
    }
  }
);

//Update comment by user or admin    not done yet

router.put(
  "/files/:commentId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const commentOfUser = await Comment.findById(commentId);
      if (commentOfUser.username === req.user.username || req.user.admin) {
        const comment = await Comment.findByIdAndUpdate(commentId);
        const response = await File.findByIdAndUpdate(
          commentId,
          {
            $pull: {
              comments: comment._id,
            },
          },
          { new: true }
        );
        res.status(200).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (e) {
        res.status(200).json({ message: e });
    }
  }
);

//delete profile
router.delete("/profile", async (req, res, next) => {
  try {
    const client = req.user._id;
    await User.findByIdAndDelete(client);
    res.redirect("/");
  } catch (error) {
    next();
  }
});

// search bar
router.get("/files/search", async (req, res, next) => {
  try {
    const { searchFile } = req.query;
    const audioList = await File.find()
      .sort({ title: -1 })
      .populate({ path: "comments" });
    const filteredAudios = audioList.filter((audios) => {
      return audios.title.includes(searchFile);
    });
    res.render("./client/filtered-audios", { filteredAudios });
  } catch (error) {
    next();
  }
});






module.exports = router;