<!-- AboutUs.vue -->
<template>
  <v-container>
    <!-- About Us Section -->
    <v-row class="data-table-row">
      <v-col cols="12">
        <h1>About Us</h1>
        <p class="body-1">
          This website was developed as our main project for CMSC 436 during the Spring 2024 semester. 
          It was designed to share relevant insights about our car dataset.
        </p>
      </v-col>
    </v-row>

    <!-- DataTable Section -->
    <v-row>
      <v-col cols="12">
        <DataTable :headers="headers" :items="values" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTable from './DataTable.vue';

export default {
  name: 'AboutUs',
  components: {
    DataTable
  },
};
</script>

<style scoped>
.body-1 {
  text-indent: 0;
  margin-left: 0;
  padding-right: 1.2em;
  line-height: 1.2;
}

</style>
