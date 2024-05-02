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
    labels: ["United States", "Northeast", "Midwest", "South", "West",],
    parents: ["", "United States", "United States", "United States", "United States",],
    values: [472325, 58036, 96646, 214723, 102920,], // Ensure sums are consistent
    branchvalues: 'total'
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
