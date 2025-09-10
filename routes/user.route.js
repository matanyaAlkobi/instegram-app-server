import express from "express";
import { handleUserRegistration } from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup",handleUserRegistration)

export default router;



