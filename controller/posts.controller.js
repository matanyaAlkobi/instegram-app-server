import loadDataFromDatabase, { writeToFile } from "../DAL/postsDAL.js";

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

// Collects all data
// Sends to function that creates object
// Sends to function that writes back to file
export async function CreatePosthandler(req, res) {
  try {
    const allPosts = await loadDataFromDatabase(dbPostPath);
    const newPost = await createsAPostObj(allPosts, req);
    allPosts.push(newPost);

    await writeToFile(allPosts, dbPostPath);
    res.json({ message: newPost });
  } catch (err) {}
}


// Gets a post uploaded by the user
// and adds default data to it
// Returns the new post
async function createsAPostObj(allPosts, req) {
  try {
    const newPost = {};
    const maxID =
      allPosts.length > 0 ? Math.max(...allPosts.map((r) => r.id)) : 1;

    newPost.id = maxID + 1;

    newPost.username = req.body.username;

    newPost.image = req.body.image;
    newPost.imageDescription = req.body.imageDescription;
    newPost.likes = 0;
    const imageName = req.body.image.split(".");
    newPost.imagemame = imageName[0];
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    newPost.timeAndHour = `${hours}:${minutes}`;
    return newPost;
  } catch (error) {
    res.status(err.status || 500).json({ message: err.message });
  }
}
