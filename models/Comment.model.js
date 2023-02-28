const { Schema, model } = require("mongoose");
// Schema for comments
const commentsSchema = new Schema({
    username: { type: String, required: true },
    text: {type: String,required: true},
    postId: { type: String, required: true },
  });
  
  const Comment = model("Comment", commentsSchema);
  module.exports = Comment;