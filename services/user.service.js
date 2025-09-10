import loadDataFromDatabase, { writeToFile } from "../DAL/postsDAL.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function createUserInDB(user, userDBpath) {
  try {
    const allusers = await loadDataFromDatabase(userDBpath);

    for (let i = 0; i < allusers.length; i++) {
      if (allusers[i].username === user.username) {
        return { status: "exists", user: allusers[i] };
        break;
      }
    }
    const maxID =
      allusers.length > 0 ? Math.max(...allusers.map((r) => r.id)) : 1;
    user.id = maxID + 1;
    user.role = "user"
    allusers.push(user);
    
    await writeToFile(allusers, userDBpath);

    return { status: "created", user: user };
  } catch (err) {
    console.error("error:", err.message);
    throw err;
  }
}

export async function checksIfTheUserExists(params) {
  try {
    let foundUser = "";
    for (let i = 0; i < allusers.length; i++) {
      if (allusers[i].username === user.username) {
        foundUser = allusers[i];
        break;
      }
    }
    if (!foundUser) {
      return res.status(404).json({ error: "User not found, please sign up" });
    }
    const passwordMatch = await bcrypt.compare("password", foundUser.password);
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
        httpOnly: false,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        username: user.username,
        role: user.role,
      });
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
