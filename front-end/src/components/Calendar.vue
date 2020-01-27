<template>
  <v-content>
    
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>
    <v-app>
      <!-- Чуть было сделал на квартал, но понял, что про fork библиотеки ничего не говорили -->
      <v-date-picker
      v-model="picker"
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
      {{days}}
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
      days:[]
    }
  },
  watch: {
    overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)}},
  methods:{
    saveHandler(){
      //!! TEMP 
      let onReq = this.picker.map(day=>{return {date:day,value:"true"}})
      saveDays(onReq)
    },
    resetHandler:()=>{
      console.log('reset')
    }
  },
  beforeMount(){
    receiveDays("ads")
    .then(r=>{
      this.$store.dispatch('receive',r.data)
      this.days=r.data
    })
  }

}
</script>

<style>


</style>