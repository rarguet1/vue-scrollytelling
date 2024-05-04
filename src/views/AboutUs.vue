<!-- AboutUs.vue -->
<template>
  <v-container>
    <v-row class="data-table-row">
      <v-col cols="12">
        <h1>About Us</h1>
        <div class="body-1" style="font-size: 18px;">
          <p>Welcome to our interactive analysis platform for the "Vehicle Sales and Market Trends Dataset," developed
            as our main project for CMSC 436 during the Spring 2024 semester. This tool is designed to share relevant
            insights about our car dataset, providing useful information for automotive industry analysts, car
            dealerships, and enthusiasts. Our comprehensive dataset includes detailed vehicle transaction records across
            the United States, featuring attributes such as make, model, year, body type, transmission type, and much
            more.</p>
          <p style="font-size: 18px;"><b>Key Features:</b></p>
          <ul class="body-2" style="font-size: 16px;">
            <li><b>Vehicle Sales Analysis</b>: Explore the sales data of various car brands. Understand the distribution of sales across different vehicle brands and identify the
              top-selling models.</li>
            <li><b>Market Trend Analysis:</b> Analyze how various vehicle types perform over time. Determine automotive market
              trends on a yearly basis, understanding which models and makes are gaining popularity or fading out.
            </li>
            <li><b>Regional Sales Distribution:</b> Explore how vehicle sales differ by state. Our interactive maps and filters
              allow users to visualize sales distribution and identify regions with high sales volumes.</li>
            <li><b>Top Performers:</b> Identify the best-selling cars. This feature helps in understanding which vehicles are
              preferred by consumers.</li>
          </ul>
        </div>

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

<style>
.body-1 {
  text-indent: 0;
  margin-left: 0;
  padding-right: 3em;
  line-height: 1.2;
  text-align: justify;
}

.body-2 {
  text-indent: 0;
  margin-left: 0;
  padding-right: 3em;
  line-height: 1.2;
}

.body-2 li {
  margin-bottom: 10px;
  list-style-type: none;
  align-items: center;
}

.container {
  position: relative;
  height: 100vh;
}
</style>
