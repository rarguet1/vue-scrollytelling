<template>
  <div>
    <div ref="chart" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist-min';

export default {
  name: 'SunburstChart',
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const data = [{
    type: "sunburst",
    labels: ["United States", "Northeast", "Midwest", "South", "West", "Alabama", "Arizona", "California", "Colorado", "Florida", "Georgia", "Hawaii", "Illinois", "Indiana", "Louisiana", "Massachusetts", "Maryland", "Michigan", "Minnesota", "Missouri", "Mississippi", "North Carolina", "Nebraska", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "South Carolina", "Tennessee", "Texas", "Utah", "Virginia", "Washington", "Wisconsin"],
    parents: ["", "United States", "United States", "United States", "United States", "South", "West", "West", "West", "South", "South", "West", "Midwest", "Midwest", "South", "Northeast", "South", "Midwest", "Midwest", "Midwest", "South", "South", "Midwest", "Northeast", "West", "West", "Northeast", "Midwest", "South", "West", "Northeast", "South", "South", "United States", "South", "West", "Midwest", "West", "South", "West"],
    values: [277226, 67119, 67530, 404157, 9216, 25, 7612, 66213, 6270, 75243, 30939, 1205, 21494, 3879, 1744, 6167, 9788, 14185, 8627, 15286, 1730, 18731, 3685, 23003, 163, 11682, 4749, 20294, 54, 1047, 24117, 2427, 3754, 19183, 41657, 1716, 9448, 7012, 9196],
    outsidetextfont: { size: 20, color: "#377eb8" },
    leaf: { opacity: 0.4 },
}];




      const layout = {
        margin: { l: 0, r: 0, b: 0, t: 0 },
        sunburstcolorway: ["#f3cec9", "#e7a4b7", "#ce6693", "#b9257a", "#99065b", "#670640"],
      };

      Plotly.newPlot(this.$refs.chart, data, layout);
    }
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
