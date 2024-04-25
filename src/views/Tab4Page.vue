<template>
  <div>
    <VueScrollama
      :debug="false" 
      :offset="0.2"
      @step-enter="handleStepEnter"
      class="scrollama-container"
    >
      <v-col
        v-for="(step, index) in steps"
        :key="index"
        class="step"
        :class="{ 'step-active': currentStep === (index + 1).toString() }"
        :data-step-no="index + 1"
      >
        <h2>{{ step.title }}</h2>
        <div v-html="step.content" class="content"></div>      
        <div v-if="index === 2" id="sunburst"></div>
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
  { title: 'Step 2', content: 'Content for step 2.' },
  { title: 'Step 3', content: 'Content for step 3.' },
];

onMounted(() => {
  currentStep.value = '1';  // Set the first step active
  createSunburst();  // Call this function when the component is mounted
});

function handleStepEnter({ element }) {
  currentStep.value = element.dataset.stepNo;
}

function createSunburst() {
  // Define width, height, and radius for the sunburst chart
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;

  // Create a SVG for the sunburst chart
  const svg = d3.select("#sunburst").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Sample data structure for sunburst chart
  const data = {
    name: "root",
    children: [
      { name: "section 1", size: 100 },
      { name: "section 2", size: 300 },
      { name: "section 3", size: 200 }
    ]
  };

  const root = d3.hierarchy(data).sum(d => d.size);
  const partition = d3.partition().size([2 * Math.PI, root.height + 1])(root);

  const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => d.y1 * radius - 1);

  svg.selectAll("path")
    .data(partition.descendants().filter(d => d.depth))
    .enter().append("path")
    .attr("fill", d => d.data.color)
    .attr("d", arc);
}
</script>


<style scoped>
.scrollama-container {
  display: flex;
  flex-direction: column;
}

.content{
  padding-right: 5%;
  padding-left: 1%;
}

.step {
  padding-top: 50px;
  min-height: 400px;
  margin-bottom: 100vh;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: translateY(20px); 
  opacity: 0.5; /* Start with a lower opacity */
}

.step-active {
  transform: translateY(0); /* End at natural position */
  opacity: 1; /* Fully visible when active */
}

.scrollama-container .step p {
  text-indent: 0;
  margin-left: 0;
  padding-right: 1.2em; /* Adjust this as needed to align with the text above */
  line-height: 1.2;
}

</style>

