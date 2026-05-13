import express from "express";
import { conn } from "../../database/connections";
import { TripPostRequest } from "../../model/trip";
import mysql = require("mysql2");

export const router = express.Router(); 

router.get("/", (req, res) => {
  conn.query('select * from trip', (err, result) => {
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  const id  = req.params.id;
  conn.query("select * from trip where idx = ?" , [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

router.get("/search/fields", (req, res) => {
  conn.query(
    "select * from trip where (idx IS NULL OR idx = ?) OR (name IS NULL OR name like ?)",
    [ req.query.id, "%" + req.query.name + "%"],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
});

router.post("/", (req, res) => {
  let trip: TripPostRequest = req.body;
  let sql =
    "INSERT INTO `trip`(`name`, `country`, `destinationid`, `coverimage`, `detail`, `price`, `duration`) VALUES (?,?,?,?,?,?,?)";
  sql = mysql.format(sql, [
    trip.name,
    trip.country,
    trip.destinationid,
    trip.coverimage,
    trip.detail,
    trip.price,
    trip.duration,
  ]);

  conn.query(sql, (err, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
});

router.put("/:id", (req, res) => { 
  let id = req.params.id;
  let trip: TripPostRequest = req.body;
  let sql =
    "UPDATE `trip` SET `name`=?,`country`=?,`destinationid`=?,`coverimage`=?,`detail`=?,`price`=?,`duration`=? WHERE idx = ?";
  sql = mysql.format(sql, [
    trip.name,
    trip.country,
    trip.destinationid,
    trip.coverimage,
    trip.detail,
    trip.price,
    trip.duration,
    id
  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result });
  });
});

router.delete("/:id", (req, res) => {
  let id = +req.params.id;
  conn.query("delete from trip where idx = ?", [id], (err, result) => {
     if (err) throw err;
     res
       .status(200)
       .json({ affected_row: result });
  });
});
