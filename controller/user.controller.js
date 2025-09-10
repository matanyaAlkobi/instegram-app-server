import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import { createUserInDB } from "../services/user.service.js";
import loadDataFromDatabase from "../DAL/postsDAL.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

// Set up the path to the post database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userDBpath = path.resolve(__dirname, "../DB/userDB.json");

export async function handleUserRegistration(req, res) {
  try {
    const { username, password, email } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ error: "Username and password are required" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await createUserInDB(
      { username, hashedPassword, email },
      userDBpath
    );

    if (result.status === "exists") {
      return res.status(400).json({ error: "Username already exists" });
    }
    res
      .status(201)
      .json({ message: "User created successfully", user: result.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// The function looks up the user
// Compares the passwords
// Creates a token
// Returns a cookie to the client
export async function handleUserLogin(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    const allusers = await loadDataFromDatabase(userDBpath);
    let foundUser = "";

    for (let i = 0; i < allusers.length; i++) {
      if (allusers[i].username === req.body.username) {
        foundUser = allusers[i];
        break;
      }
    }

    if (!foundUser) {
      return res.status(404).json({ error: "User not found, please sign up" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      foundUser.hashedPassword
    );

    if (!passwordMatch)
      return res.status(401).json({ error: "Incorrect password" });
    const token = jwt.sign(
      {
        userId: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
        secure: "None",
      })
      .status(200)
      .json({
        message: "Login successful",
        username: foundUser.username,
        role: foundUser.role,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function checksIfAUserExists(params) {}
