import express, { json } from "express";
import { send } from "process";
export const router = express.Router(); 

router.get("/", (req, res) => {
  conn.query('select * from trip', (err, result, fields)=>{
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  res
    .send("Get in trip.ts id: " + req.params.id);
});

router.post("/", (req, res) => {
  let body = req.body;
  res
    .status(201)
    .json({ text: "Get in trip.ts body: " + JSON.stringify(body) });
});
