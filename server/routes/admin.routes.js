const express = require("express");

const router = express.Router();
const User = require("../models/User.model");
const File = require("../models/File.model");
const Comment = require("../models/Comment.model");


const fileUploader = require("../config/cloudinary.config");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


const mongoose = require("mongoose");

// const {
//   isLoggedIn,
//   isLoggedOut,
//   isAdmin,
// } = require("../middleWare/route-guard");

// const { findById } = require("../models/client-model");

// The admin is already a user => user routes

// // GET - gets all the files
// router.get("/files", isAuthenticated, async (req, res) => {
//     try {
//       const response= await File.find().sort( { "title": -1 } )
//       res.status(200).json(response);
//     } catch (e) {
//         res.status(200).json({ message: e });
//     }
//   });

//   //GET - gets one file
// router.get("/files/:fileId",isAuthenticated, async (req, res) => {
//     try {
//       const response = await File.findById(req.params.fileId);
//       res.status(200).json(response);
//     } catch (e) {
//       res.status(200).json({ message: e });
//     }
//   });


  //POST - create a file
  router.post(
    "/files",isAuthenticated,
    fileUploader.single("file"),
    async (req, res) => {
      try {
        const { title ,description } = req.body;
        const file = { title, description, file: req.file.path };
        const response = await File.create(file);
        res.status(200).json(response);
      } catch (e) {
        res.status(200).json({ message: e });
      }
    }
  );

 // DELETE - delete a file
 
  router.delete("/files/:fileId",isAuthenticated,async(req,res,next)=>{
    try {
        await File.findByIdAndDelete(req.params.fileId);
        res
          .status(200)
          .json({ message: `File with id ${req.params.projectId} was deleted` });
      } catch (e) {
        res.status(200).json({ message: e });
      }
  })


//PUT PATCH
router.put("/files/:fileId",isAuthenticated, async (req, res) => {
    try {
      const { title, description } = req.body;
      const response = await File.findByIdAndUpdate(
        req.params.fileId,
        {
          title,
          description,
        },
        {
          new: true,
        }
      );
      res.status(200).json(response);
    } catch (e) {
      res.status(200).json({ message: e });
    }
  });


// //nodemailler

// router.get("/client/messages",(req,res,next)=>{
//   res.render("./client/messages")
// })

// router.post('/send-email', (req, res, next) => {
//   let { email1, subject1, message1 } = req.body;
//   console.log(email1)
//   console.log(subject1)
//   console.log(message1)
//   let transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'oussamahamdani1@gmail.com',
//       pass: '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'
//     }
//   });
//   transporter.sendMail({
//     from: 'oussamahamdani1@gmail.com',
//     to: email1, 
//     subject: subject1, 
//     text: message1,
//     html: `<b>${message1}</b>`
//   })
//   .then(info => res.render('./client/messages', {email1, subject1, message1, info}))
//   .catch(error => console.log(error));
// });




module.exports = router;