<template>
<div id="app">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>
  <div class="date-pickers">
    <v-date-picker
    v-for="i in [0,1,2]"
    :key="'date-picker-'+i"
    :prev-icon='(i!=0)?"":"$prev"'
    :next-icon='(i!=2)?"":"$next"'
    v-model="picker"
    :picker-date.sync="pickerMonths[i]"
    multiple
    no-title
    />

  </div>
  <div id="buttons">
    <div class="mt-5" >
      <v-btn 
      class="float-right mr-5" 
      color="primary" 
      @click="saveHandler">
        Save
      </v-btn>
      <v-btn 
      class="float-right mr-10" 
      @click="resetHandler">
        Reset
      </v-btn>
    </div>
  </div>
</div>
</template>

<script>
import {saveDays, receiveDays} from "@/api"

export default {
  name:"Calendar",
  data:function(){
    return {
      valuePick:'',
      isMultiple:"",
      picker:[],
      overlay:false,
      firstPickerDate:'',
      pickerMonths:[],
      prevMonths:[]
    }
  },
  methods:{
    saveHandler() {
      let onReq = [];
      const {received} = this.$store.getters
      // Can be more beauty...
      let onWork = received.filter(day=>!this.picker.includes(day))
      let onRelax = this.picker.filter(picked => !received.includes(picked))
      onWork.forEach(date=>onReq.push({date,value:false}));
      onRelax.forEach(date=>onReq.push({date,value:true}));
      saveDays(onReq)

    },
    resetHandler() {
      this.picker = this.$store.getters.received
    }, 
    normalizeDate(date){
      // normalize of month [year,month]
      if(date[1]>12){
        date[0]++
        date[1] = date[1]-12
      } else if (date[1]<1){
        date[0]--
        date[1] = 12 - date[1]
      }
      return date
    },
    changeMonthInDates(dates,normalIndex,changes){
      let arrDates = dates.map(el=>el.split('-').map(el=>+el))
      let newDates = []
      arrDates.forEach((date,index)=>{
        if (index == normalIndex){
          newDates[index]=this.normalizeDate(date);
        } else {
          date[1]=date[1]+changes
          newDates[index]=this.normalizeDate(date)
        }
      })
      return newDates
    },
  },
  mounted: function () {
    this.prevMonths=['2020-01','2020-02','2020-03'];
    this.pickerMonths = this.prevMonths.slice(0)
    this.$watch('pickerMonths', function (newVal) {
      this.overlay=true;
      let newVals  = newVal.map(el=>+el.split('-')[1]);
      let prevVals = this.prevMonths.map(el=>+el.split('-')[1]);
      for(let key in newVals){
        let changes = newVals[key]-prevVals[key]
        if(changes !=0){
          changes=((changes == 11)||(changes==-1))?-1:1
          this.prevMonths= this.changeMonthInDates(newVal,key,changes).map(el=>el[0]+'-'+el[1].toString().padStart(2, "0"))
          this.pickerMonths = this.prevMonths.slice(0)
        }
      }
      receiveDays(this.prevMonths.join(','))
      .then(r=>{
        this.$store.dispatch('receive',r.data)
        this.picker=r.data
        this.overlay=false
      })
    }, {deep:true})
  }
}
</script>

<style scoped>
.date-pickers > * {
  display: inline-block;
  box-shadow:none;
}



</style>