import express from "express";
import * as db from "./database.js";
import cors from "cors";

const app = express();

app.use(
  cors(),
  express.json(),
);

app.get("/", (req, res)=>{
  db.getAllCitations().then(c=>res.json(c));
})

app.post("/", (req, res)=>{
  db.postCitation(req, res).then(c=>res.json(c))
})

app.delete("/:id", (req, res)=>{
  db.deleteCitation(req, res).then(c=>res.json(c))
})

app.listen(3000, () =>{
  console.log("listening to port 3000");
})