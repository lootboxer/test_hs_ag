const sql3 = require('sqlite3');

let db = new sql3.Database("./../db/main.db")

export function readDays(months){

}


export function writeDays(inputDates){
  const weekends = inputDates.filter(day=>day.value)
  const working = inputDates.filter(day=>!day.value)
  //TODO: except incorrect values (value:not true or false)
  

  return outDates
}