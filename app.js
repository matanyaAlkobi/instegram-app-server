import express from "express";
import postRouter from "./routes/posts.router.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Set up the path to the image directory folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.resolve(__dirname, "./");

const server = express();

server.use(cors({
  origin: [
    'http://localhost:5175',
    'http://localhost:5174', 
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

server.use(express.json());

// Serve static files from the 'public' directory
server.use(express.static(path.join(imagePath, 'public')));
server.use("/post",postRouter);

server.listen(4545, () => {
  console.log("server listening... ");
});
