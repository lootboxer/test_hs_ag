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
      <v-toolbox class="mt-5" >
        <v-btn class="float-right mr-5" color="primary" @click="saveHandler">Save</v-btn>
        <v-btn class="float-right mr-10" @click="resetHandler">Reset</v-btn>
      </v-toolbox>
    </v-app>

  </v-content>
</template>

<script>
export default {
  name:"Calendar",
  data:function(){
    return {
      picker:[],
      overlay:false
    }
  },
  beforeCreate:()=>{

  },
  watch: {
    overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)}},
  methods:{
    saveHandler:()=>{

    },
    resetHandler:()=>{

    }
  }

}
</script>

<style>


</style>