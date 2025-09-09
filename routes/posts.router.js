import express from "express";
import {
  getAllPosts,
  CreatePosthandler,
  handleGetPostById,
} from "../controller/posts.controller.js";

const router = express.Router();

export default router;

router.get("/", getAllPosts);

router.get("/:id", handleGetPostById);

router.post("/create",CreatePosthandler)