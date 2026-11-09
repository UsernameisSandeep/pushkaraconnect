import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors({ origin: process.env.WEB_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "PushkaraConnect API", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`PushkaraConnect API listening on http://localhost:${port}`);
});
