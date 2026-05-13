import express from "express";
import { router as index } from "./api/index";
import { router as trip } from "./api/trip";

export const app = express();

app.use("/", index);
app.use("/trip", trip);