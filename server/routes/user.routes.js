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
const Budget = require("../models/Budget.model");
const { find } = require("../models/User.model");


// const { } = require("../middleWare/route-guard");



// const passport = require("passport");

const saltRounds = 10;



//the logout of the client
// router.post("/logout", (req, res, next) => {
//   req.logout((error) => {
//     if (error) {
//       next(error);
//     }
//   });
// });
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
router.get("/podcasts", isAuthenticated, async (req, res) => {
    try {
      const response= await File.find().sort( { "title": -1 } ).populate({ path: "comments" });
      res.status(200).json(response);
    } catch (e) {
        res.status(200).json({ message: e });
    }
  });

  //GET - gets one file
// router.get("/files/:fileId",isAuthenticated, async (req, res) => {
//     try {
//       const response = await File.findById(req.params.fileId);
//       res.status(200).json(response);
//     } catch (e) {
//       res.status(200).json({ message: e });
//     }
//   });

  //GET - budget saved by the user

  router.get("/budget",isAuthenticated,async(req,res,next)=>{
    try {
      const budget = await Budget.find()
      res.status(200).json(budget);
    } catch (e) {
      res.status(200).json({ message: e });
    }
  })


  //PUT - update budget by user 
router.put("/budget", isAuthenticated, async (req, res, next) => {
  try {

    const { item, price } = req.body;
    const {userOfBudget} = req.payload._id;
    const budgetBody = {  item, price,userOfBudget };
    const createdBudget = await Budget.create(budgetBody);
    const response = await Budget.findByIdAndUpdate(
      id,
      {
        $push: {
          items: createdBudget._id,
        },
      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(200).json({ message: e });
  }
})

// GET - read comments

router.get("/podcasts/comment",isAuthenticated,async(req,res)=>{
  try {
    const comments = await Comment.find()

    res.status(200).json(comments);
  } catch (e) {
    res.status(200).json({ message: e });
  }
})


// POST - create Comment 
router.post("/podcasts/comment", isAuthenticated, async (req, res, next) => {
  try {
    const { text, postId } = req.body;

    const userId = req.payload.username;
    const commentBody = { username: userId, text, post: postId };

    const comment = await Comment.create(commentBody);
    const response = await File.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: comment.username,
        },
      },
      { new: true }
    );
   
    res.status(200).json(response);
  } catch (e) {
    res.status(200).json({ message: e });
  }
});


//PUT - update comment by user or admin    not done yet
router.put(
  "/podcasts/:commentId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const commentOfUser = await Comment.findById(commentId);
      const userId = req.payload._id;
      if (commentOfUser.username === userId.username || userId.admin) {
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


//DELETE - Delete comment by user or admin    not done yet
router.delete(
  "/podcasts/:commentId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const commentOfUser = await Comment.findById(commentId);
      const userId = req.payload._id;
      if (commentOfUser.username === userId.username || userId.admin) {
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