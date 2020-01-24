const express = require("express");

const app = express();

app.get("/dates",(req,res)=>{
  console.log(req.params)
  res.send(200)
})


app.post("/dates/save",(req,res)=>{
  console.log(req)
  res.send(200)
})


let port = 4000;

app.listen(port,()=>console.log(`API запущен на порте: ${port}`))