const sql3 = require('sqlite3');

let db = new sql3.Database("./db/main.db")

exports.readDaysCallback = function (req,res){
  db.all(`
    SELECT date_ FROM weekends 
    WHERE 
      date_ 
    LIKE 
      "${req.query.months}-__"
      `, (err, rows)=>{
    if (err){
      console.error(err)
    }
    else {
      res.json(rows.map(row=>row.date_))
    }
  })
}


exports.writeDays = function (inputDates){
  const weekends = inputDates.filter(day=>day.value).map(obj=>obj.date)
  const onWorking = inputDates.filter(day=>!day.value).map(obj=>obj.date)
  //TODO: except incorrect values (value:not true or false)
  //TODO: CHECK REGEX DATE 
  weekends.forEach(day => {
    db.run(`
      INSERT INTO weekends (date_) VALUES (?)
      `, day, err => console.log(err) )
  });
  onWorking.forEach(day => {
    db.run(`
      DELETE FROM weekends WHERE date_=?
    `, day, err=>console.log(err))
    }
  )
};