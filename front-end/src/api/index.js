const axios = require('axios');

const service = axios.create({
  baseURL:"http://localhost:4000",
})

export const receiveDays = function(months) {
  return service({
    url:'/dates',
    method: "GET",
    params:{
      months
    }
  })
};

export const saveDays = function(days){
  return service({
    url:'/dates/save',
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    data:JSON.stringify(days)
  })
}