import express from "express";
import { router as index } from "./api/v1/index";
import { router as trip } from "./api/v1/trip";
import { router as upload } from "./api/v1/upload";

import bodyParser from "body-parser";
import path from "path/win32";
import cors from "cors";

import { jwtAuthen, generateToken, secret } from "./jwtauthen";

export const app = express();
const pathAPIv1 = "/api/v1";

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5500",
    "http://localhost:8080",
];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

app.use(jwtAuthen, (err: any, req: any, res: any, next: any) => {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
});

// Test Token
app.use("/testtoken", (req, res) => {
    const payload: any = { username: "Tada" }; 
    const jwttoken = generateToken(payload, secret);
  res.status(200).json({
    token: jwttoken,
  });
});

app.use(express.static("public"));

app.use(bodyParser.text());
app.use(bodyParser.json());

app.use("/upload", upload);
app.use("/uploads", express.static("uploads"));

app.use(pathAPIv1, index);
app.use(pathAPIv1 + "/trip", trip);