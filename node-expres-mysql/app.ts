import express from "express";
import { router as index } from "./api/v1/index";
import { router as trip } from "./api/v1/trip";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());

app.use("/", index);
app.use("/trip", trip);