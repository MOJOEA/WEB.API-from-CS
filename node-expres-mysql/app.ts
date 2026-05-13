import express from "express"; // กลับมาใช้แบบปกติ
import { router as index } from "./api/index"; // ลบ .js ออกไปเลยครับ

export const app = express();

app.use("/", (req, res) => {
  res.send("Hello World!!!");
});
