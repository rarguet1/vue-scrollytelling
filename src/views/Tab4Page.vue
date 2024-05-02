<template>
  <div>
    <div ref="chart" style="width: 100%; height: 500px;"></div>
    <input type="range" v-model="currentYear" :min="minYear" :max="maxYear" @input="updateChart">
    <p>Year: {{ currentYear }}</p>
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist-min';

export default {
  name: 'BubbleChart',
  data() {
    return {
      currentYear: 2020,
      minYear: 2015,
      maxYear: 2024,
      allData: {
        2015: { x: ['Company A', 'Company B'], y: [10, 20], size: [120, 180] },
        2020: { x: ['Company A', 'Company B'], y: [20, 30], size: [240, 300] },
        2024: { x: ['Company A', 'Company B'], y: [30, 40], size: [360, 420] }
      }
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const data = this.allData[this.currentYear];
      const trace = {
        x: data.x,
        y: data.y,
        mode: 'markers',
        marker: {
          size: data.size,
          sizemode: 'area',
          sizeref: 2 * Math.max(...data.size) / (40**2),
          color: data.size,
          colorscale: 'Viridis',
          showscale: true
        }
      };

      const layout = {
        title: 'Market Share by Company',
        xaxis: {
          title: 'Company',
          showgrid: false,
          zeroline: false
        },
        yaxis: {
          title: 'Market Share (%)',
          showline: false
        },
        showlegend: false,
        height: 600,
        width: 600
      };

      Plotly.newPlot(this.$refs.chart, [trace], layout);
    },
    updateChart() {
      Plotly.animate(this.$refs.chart, {
        data: [{x: this.allData[this.currentYear].x, y: this.allData[this.currentYear].y, 'marker.size': this.allData[this.currentYear].size}],
        layout: {}
      }, {
        transition: {
          duration: 500,
          easing: 'cubic-in-out'
        },
        frame: {
          duration: 500
        }
      });
    }
  }
};
</script>
