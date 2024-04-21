<template>
    <v-container 
    fluid 
    class="pa-0" 
    :style="{ backgroundImage: 'url(' + require('@/assets/miata2.gif') + ')' }"
    style="height: 100vh; 
    background-size: 15.2%;
    /* background-size: 80%;  */
    /* background-repeat: no-repeat; */
    background-position: center center;">
      
      <!-- Main content -->
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="20" class="text-center">
          <h1 class="white--text">Explore our car dataset!</h1>
        </v-col>
      </v-row>
  
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
  };
  </script>

<style scoped>
.pa-0 .white--text {
  color: #000 !important; /* Ensure the text is white */
}
</style>
