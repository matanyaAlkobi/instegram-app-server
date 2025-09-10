import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import { name } from "../services/user.service.js";

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

    const result = await name({ username, hashedPassword, email },userDBpath);

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
