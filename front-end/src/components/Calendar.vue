<template>
  <v-content>
    
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>
    <v-app>
      <!-- Чуть было сделал на квартал, но понял, что про fork библиотеки ничего не говорили -->
      <v-date-picker
      v-model="picker"
      :picker-date.sync="pickerDate"
      multiple
      no-title
      >
      </v-date-picker>
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
    </v-app>

  </v-content>
</template>

<script>
import {saveDays, receiveDays} from "@/api"

export default {
  name:"Calendar",
  data:function(){
    return {
      picker:[],
      overlay:false,
      pickerDate:"",
    }
  },
  methods:{
    saveHandler(){
      //!! TEMP 
      let onReq = this.picker.map(day=>{return {date:day,value:"true"}})
      saveDays(onReq)
    },
    resetHandler(){
      this.picker = this.$store.getters.received
    }
  },
  watch:{
    pickerDate(){
      this.overlay=true;
      receiveDays(this.pickerDate)
      .then(r=>{
        this.$store.dispatch('receive',r.data)
        this.picker=r.data
        this.overlay=false
      })
    }
  },
}
</script>

<style>


</style>