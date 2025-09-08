import loadDataFromDatabase from "../DAL/postsDAL.js";

import path from "path";
import { fileURLToPath } from "url";
import { postFinder } from "../services/post.servise.js";

// Set up the path to the post database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPostPath = path.resolve(__dirname, "../DB/postsDB.json");

// Sends a request to a function to receive the data,
// and returns the data to the client
export async function getAllPosts(req, res) {
  try {
    const allPosts = await loadDataFromDatabase(dbPostPath);

    res.status(200).json(allPosts);
  } catch (err) {
    res.status(err.status || 500).json({ message: "Internal server error" });
  }
}

export async function handleGetPostById(req, res) {
  try {
    console.log(req.params.id);
    const idToSearch = parseInt(req.params.id);
    console.log(req.params.id);

    const TheRequestedPost = await postFinder(idToSearch, dbPostPath);
    res.status(200).json(TheRequestedPost);
  } catch (err) {
    res.status(err.status || 500).json({message: err.message});
  }
}
