<template>
    <v-container>
      <!-- About Us Section -->
      <v-row>
        <v-col cols="12">
          <h1>About Us</h1>
          <p class="body-1">
            This website was developed as our main project for CMSC 436 during the Spring 2024 semester. 
            It was designed to share relevant insights about our car dataset.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'AboutUs',
    data() {
      return {
        values: [
          { title: 'Integrity', description: 'We act with honesty and honor without compromising the truth.' },
          { title: 'Innovation', description: 'We innovate to serve our customers, drive our growth, and win in dynamic business environments.' },
          // ... Add more values
        ],
      };
    },
    // Other component options like methods, computed properties, etc.
  };
  </script>
  
  <style scoped>
  /* Add styles here to fit the branding and design of your company */
  </style>
  