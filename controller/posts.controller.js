import loadDataFromDatabase from "../DAL/postsDAL.js";

import path from "path";
import { fileURLToPath } from "url";

// Set up the path to the post database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPostPath = path.resolve(__dirname, "../DB/postsDB.json");

// Sends a request to a function to receive the data,
// and returns the data to the client
export async function getAllPosts(req, res) {
  try {
    const allPosts = await loadDataFromDatabase(dbPostPath);
    res.json(allPosts);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}
