import express from "express";
import {
  getAllPosts,
  CreatePosthandler,
  handleGetPostById,
} from "../controller/posts.controller.js";
import { authenticateUser } from "../auth/auth.js";

const router = express.Router();


router.get("/", authenticateUser, getAllPosts);

router.get("/:id", authenticateUser, handleGetPostById);

router.post("/create", authenticateUser, CreatePosthandler);

export default router;
