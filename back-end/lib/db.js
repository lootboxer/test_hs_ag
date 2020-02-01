const sql3 = require('sqlite3');

let db = new sql3.Database("./db/main.db")

exports.readDaysCallback = function (req,res){
  let months = req.query.months.split(',')
  db.all(`
    SELECT date_ FROM weekends 
    WHERE 
      (date_ LIKE   "${months[0]}-%")
    OR
      (date_ LIKE   "${months[1]}-%")
    OR
      (date_ LIKE   "${months[2]}-%")
    `, (err, rows)=>{
    if (err){
      console.error(err)
    }
    else {
      res.json(rows.map(row=>row.date_))
    }
  })
}


exports.writeDaysCallBack = function (req,res){
  const weekends = req.body.filter(day=>day.value).map(obj=>obj.date)
  const onWorking = req.body.filter(day=>!day.value).map(obj=>obj.date)
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
  res.json(weekends)
};