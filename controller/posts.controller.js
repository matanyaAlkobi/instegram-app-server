import loadDataFromDatabase, { writeToFile } from "../DAL/postsDAL.js";

import path from "path";
import { fileURLToPath } from "url";
import { postFinder } from "../services/post.servise.js";
import { allowedNodeEnvironmentFlags } from "process";

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

// Converts the id from the server to type number
// Returns the requested post to the client
export async function handleGetPostById(req, res) {
  try {
    const idToSearch = parseInt(req.params.id);

    const TheRequestedPost = await postFinder(idToSearch, dbPostPath);
    res.status(200).json(TheRequestedPost);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

export async function CreatePosthandler(req, res) {
  try {
    const newPost = {};

    const allPosts = await loadDataFromDatabase(dbPostPath);
    const maxID =
      allPosts.length > 0 ? Math.max(...allPosts.map((r) => r.id)) : 1;

    newPost.id = maxID + 1;
    newPost.username = req.body.username;
    newPost.image = req.body.image;
    newPost.imageDescription = req.body.imageDescription;
    allPosts.push(newPost);
    await writeToFile(allPosts, dbPostPath);
    res.json({ message: "bla bla" });
  } catch (err) {}
}
