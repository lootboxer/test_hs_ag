
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const {writeDaysCallBack, readDaysCallback} = require('./lib/db')

const app = express();

app.use(cors())
app.use(bodyParser.json())

app.get("/dates",readDaysCallback)

app.post("/dates/save",writeDaysCallBack)



let port = 4000;

app.listen(port,()=>console.log(`API запущен на порте: ${port}`))