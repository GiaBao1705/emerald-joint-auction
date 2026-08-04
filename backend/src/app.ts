import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:8080" }));
app.use(express.json());
app.use("/api/posts", postsRouter);

app.get("/", (_, res) => {
  res.json({ status: "ok" });
});

app.use((_, res) => {
  res.status(404).json({ error: "Not found." });
});

export default app;
