import express from "express";
export const router = express.Router(); // ต้องมีคำว่า export const router เพื่อให้ไฟล์อื่นเรียกใช้ได้

// ตัวอย่าง Route สำหรับดึงข้อมูล Trip
router.get("/", (req, res) => {
  res.json({ message: "Get all trips data" });
});
