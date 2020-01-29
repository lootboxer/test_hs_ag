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