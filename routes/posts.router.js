import express from "express";
import { getAllPosts } from "../controller/posts.controller.js";

const router = express.Router();

export default router;

router.get("/",getAllPosts)