<template>
<div id="app">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>
  <div class="date-pickers">
    <!-- <v-date-picker
    next-icon=''
    v-model="picker"
    :picker-date.sync="firstPickerDate"
    multiple
    no-title
    />

    <v-date-picker
    prev-icon=''
    next-icon=''
    v-model="picker"
    :picker-date="monhtsArray[1]"
    multiple
    no-title
    />

    <v-date-picker
    prev-icon=''
    v-model="picker"
    :picker-date="monhtsArray[2]"
    multiple
    no-title
    >
    </v-date-picker> -->
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
      pickerMonths:['','','']
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
    pickerDatesCounting(val,i){
      let dateArray = val.split('-').map(el=>+el);
      if(dateArray[1]>12){
        dateArray[1]=1;
        dateArray[0]++
      } else{
        dateArray[1]+i
      }
      return dateArray.join('-')
    }
  },
  computed:{
    pickerMonths(val){
      this.overlay=true;
      this.monhtsArray.map((month,i)=>this.pickerDatesCounting(val,i))
      receiveDays(this.monhtsArray.join(','))
      .then(r=>{
        this.$store.dispatch('receive',r.data)
        this.picker=r.data
        this.overlay=false
      })
    }
  },
}
</script>

<style scoped>
.date-pickers > * {
  display: inline-block;
  box-shadow:none;
}



</style>