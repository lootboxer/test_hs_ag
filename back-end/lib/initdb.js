const sql3 = require('sqlite3');

let db = new sql3.Database("./db/main.db", sql3.OPEN_READWRITE | sql3.OPEN_CREATE,(err)=>{
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

db.run(`
CREATE TABLE "weekends" (
  "date_" DATE NOT NULL,
  PRIMARY KEY ("date_")
)
`)