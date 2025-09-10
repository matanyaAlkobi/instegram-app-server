import express from "express";
import { handleUserLogin, handleUserRegistration } from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup",handleUserRegistration)

router.post("/login",handleUserLogin)
export default router;



