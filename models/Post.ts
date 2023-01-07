import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  time: Number,
  title: String,
  description: String,
  body: String,
  image: String,
  imageAlt: String,
  slug: String,
  author: {
    id: String,
    name: String,
  },
  headers: [{ id: String, title: String }],
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
