import express from "express";
import postRouter from "./routes/posts.router.js";

import path from "path";
import { fileURLToPath } from "url";

// Set up the path to the image directory folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.resolve(__dirname, "../instegram-app-client");
const server = express();
server.use(express.json());

// Serve static files from the 'public' directory
server.use(express.static(path.join(imagePath, 'public/images')));
server.use("/post",postRouter);

server.listen(4545, () => {
  console.log("server listening... ");
});
