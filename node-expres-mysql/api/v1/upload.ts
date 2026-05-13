import express from "express";
import path from "path";
import multer from "multer";
import { v4 as uuid } from "uuid";

export const router = express.Router();

// 2. ประกาศตัวแปร __dirname จำลองให้รองรับระบบสากล (แก้ปัญหาหาตัวแปร __dirname ไม่เจอ)
const __dirname = path.resolve();

class FileMiddleware {
  filename = "";
  public readonly diskLoader = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        // ชี้ไปที่โฟลเดอร์สำหรับเก็บไฟล์อัปโหลดในโปรเจกต์ของคุณ
        cb(null, path.join(__dirname, "uploads"));
      },
      filename: (_req, file, cb) => {
        const uniqueSuffix = uuid();
        const fileExtension = file.originalname.split(".").pop();
        this.filename = `${uniqueSuffix}.${fileExtension}`;
        cb(null, this.filename);
      },
    }),
    limits: {
      fileSize: 64 * 1024 * 1024, // 64 MByte (คำนวณแบบอ่านเข้าใจง่าย)
    },
  });
}

const fileUpload = new FileMiddleware();

// 3. ตัวรับสัญญาณสำหรับระบุประเภทและส่งชื่อไฟล์กลับไปแสดงผล
router.post("/", fileUpload.diskLoader.single("file"), (req, res) => {
  res.json({ filename: "/uploads/" + fileUpload.filename });
});

router.get("/:filename", (req, res) => {
  let filename = req.params.filename;
  const { dowload } = req.query;
  if (dowload === "true") {
    res.download(path.join(__dirname, "uploads", filename));
    return;
  }else{
  res.sendFile(path.join(__dirname, "uploads", filename));
  }
});
