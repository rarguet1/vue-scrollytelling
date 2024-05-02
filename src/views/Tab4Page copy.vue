<template>
  <div>
    <VueScrollama :debug="false" :offset="0.2" @step-enter="handleStepEnter" class="scrollama-container">
      <v-col v-for="(step, index) in steps" :key="index" class="step"
        :class="{ 'step-active': currentStep === (index + 1).toString() }" :data-step-no="index + 1">
        <h2>{{ step.title }}</h2>
        <div v-html="step.content" class="content"></div>
        <div v-if="index === 1" id="sunburstChart"></div>
      </v-col>
    </VueScrollama>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VueScrollama from 'vue3-scrollama';
import { VCol } from 'vuetify/components';
import * as d3 from 'd3';

const currentStep = ref(null);

// Steps data
const steps = [
  { title: 'Step 1', content: 'Content for step 1.' },
  { title: 'Step 2', content: `This visualization elegantly captures the hierarchy of sales data, 
  starting from the overall regional perspective down to individual states. 
  Each segment represents a region, with nested layers revealing states and their respective sales counts.` },
  { title: 'Step 3', content: 'Content for step 3.' },
];

const SunburstData = [
  { state: 'al', sales_count: 25, region: 'South' },
  { state: 'az', sales_count: 7612, region: 'West' },
  { state: 'ca', sales_count: 66213, region: 'West' },
  { state: 'co', sales_count: 6270, region: 'West' },
  { state: 'fl', sales_count: 75243, region: 'South' },
  { state: 'ga', sales_count: 30939, region: 'South' },
  { state: 'hi', sales_count: 1205, region: 'West' },
  { state: 'il', sales_count: 21494, region: 'Midwest' },
  { state: 'in', sales_count: 3879, region: 'Midwest' },
  { state: 'la', sales_count: 1744, region: 'South' },
  { state: 'ma', sales_count: 6167, region: 'Northeast' },
  { state: 'md', sales_count: 9788, region: 'South' },
  { state: 'mi', sales_count: 14185, region: 'Midwest' },
  { state: 'mn', sales_count: 8627, region: 'Midwest' },
  { state: 'mo', sales_count: 15286, region: 'Midwest' },
  { state: 'ms', sales_count: 1730, region: 'South' },
  { state: 'nc', sales_count: 18731, region: 'South' },
  { state: 'ne', sales_count: 3685, region: 'Midwest' },
  { state: 'nj', sales_count: 23003, region: 'Northeast' },
  { state: 'nm', sales_count: 163, region: 'West' },
  { state: 'nv', sales_count: 11682, region: 'West' },
  { state: 'ny', sales_count: 4749, region: 'Northeast' },
  { state: 'oh', sales_count: 20294, region: 'Midwest' },
  { state: 'ok', sales_count: 54, region: 'South' },
  { state: 'or', sales_count: 1047, region: 'West' },
  { state: 'pa', sales_count: 24117, region: 'Northeast' },
  { state: 'pr', sales_count: 2427, region: 'South' },
  { state: 'sc', sales_count: 3754, region: 'South' },
  { state: 'tn', sales_count: 19183, region: 'South' },
  { state: 'tx', sales_count: 41657, region: 'South' },
  { state: 'ut', sales_count: 1716, region: 'West' },
  { state: 'va', sales_count: 9448, region: 'South' },
  { state: 'wa', sales_count: 7012, region: 'West' },
  { state: 'wi', sales_count: 9196, region: 'Midwest' }
];

onMounted(() => {
  currentStep.value = '1';  // Set the first step active
  drawSunburstChart(SunburstData);
});

function handleStepEnter({ element }) {
  currentStep.value = element.dataset.stepNo;
}

function drawSunburstChart(data) {

  let hierarchy = {
    name: "root",
    children: Array.from(d3.group(data, d => d.region), ([key, values]) => ({
      name: key,
      children: values.map(d => ({ name: d.state, value: d.sales_count }))
    }))
  };

  d3.select('#sunburstChart').select('svg').remove();

  const width = 1200;
  const height = 900;
  const radius = Math.min(width, height) / 7;

  // Create SVG element with a viewBox for responsiveness
  const svg = d3.select('#sunburstChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
    .style('font', '20px sans-serif');

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

  const root = d3.hierarchy(hierarchy)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

  d3.partition()
    .size([2 * Math.PI, root.height + 1])(root);

  const g = svg.append('g')
  g.selectAll('path')
    .data(root.descendants().filter(d => d.depth))
    .join('path')
    .attr('d', arc)
    .attr('fill', d => color((d.children ? d : d.parent).data.name))
    .attr('stroke', '#fff');

  // Add the mouseover interaction
  g.selectAll('path')
    .on('mouseover', function (event, d) {
      d3.select(this).transition()
        .duration(200)
        .style('fill', '#00FFE1');
      // Adjust tooltip content based on the hierarchical data
      const ancestor = d.ancestors().map(d => d.data.name).reverse().join(" > ");
      tooltip.style('opacity', 1)
        .html(`${ancestor}<br>Sales Count: ${d.value}`)
        .style('left', `${event.pageX}px`)
        .style('top', `${event.pageY}px`);
    })
    .on('mouseout', function () {
      d3.select(this).transition()
        .duration(500)
        .style('fill', d => color((d.children ? d : d.parent).data.name));
      tooltip.style('opacity', 0);
    });

  var tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('text-align', 'center')
    .style('width', '160px')
    .style('height', '60px')
    .style('padding', '2px')
    .style('background', 'lightsteelblue')
    .style('border', '0px')
    .style('border-radius', '8px')
    .style('pointer-events', 'none');

  svg.append('g')
    .attr('pointer-events', 'none')
    .attr('text-anchor', 'middle')
    .style('user-select', 'none')
    .selectAll('text')
    .data(root.descendants().filter(d => d.depth))
    .enter().append('text')
    .attr('dy', '0.35em')
    .attr('fill-opacity', d => +labelVisible(d.current ? d.current : d))
    .attr('transform', d => labelTransform(d.current ? d.current : d))
    .text(d => d.data.name);

  // Ensure only visible arcs have labels
  function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  // Utility function to determine if a label is visible
  function labelVisible(d) {
    return arcVisible(d) && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  // Position labels appropriately
  function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }

}


</script>


<style scoped>
.scrollama-container {
  display: flex;
  flex-direction: column;
}

.content {
  padding-right: 5%;
  padding-left: 1%;
}

.step {
  padding-top: 50px;
  min-height: 400px;
  margin-bottom: 100vh;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: translateY(20px);
  opacity: 0.5;
  /* Start with a lower opacity */
}

.step-active {
  transform: translateY(0);
  /* End at natural position */
  opacity: 1;
  /* Fully visible when active */
}

.scrollama-container .step p {
  text-indent: 0;
  margin-left: 0;
  padding-right: 1.2em;
  /* Adjust this as needed to align with the text above */
  line-height: 1.2;
}
</style>
