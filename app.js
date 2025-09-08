import express from "express";
import postRouter from "./routes/posts.router.js";

const server = express();
server.use(express.json());

server.use("/posts",postRouter);

server.listen(4545, () => {
  console.log("server listening... ");
});
