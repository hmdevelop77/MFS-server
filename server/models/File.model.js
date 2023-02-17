const { Schema, model } = require("mongoose");

// Schema for audio files
// need to up updated to all type of files
const fileSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  file: {
    type: String,
    required: true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const File = model("File", fileSchema);
module.exports = File;
