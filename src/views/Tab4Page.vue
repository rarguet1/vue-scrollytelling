<template>
  <div>
    <VueScrollama :debug="false" :offset="0.2" @step-enter="handleStepEnter" class="scrollama-container">
      <v-col v-for="(step, index) in steps" :key="index" class="step"
        :class="{ 'step-active': currentStep === (index + 1).toString() }" :data-step-no="index + 1">
        <h2>{{ step.title }}</h2>
        <div v-html="step.content" class="content"></div>
        <BubbleChart v-if="index === 1" :min-year="minYear" :max-year="maxYear" :all-data="allData"></BubbleChart>
        <SunburstChart v-if="index === 2"></SunburstChart> 
      </v-col>
    </VueScrollama>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueScrollama from 'vue3-scrollama';
import { VCol } from 'vuetify/components';
import BubbleChart from './BubbleChart.vue';
import SunburstChart from './SunburstChart.vue';  // Adjust the path as necessary


const steps = ref([
  { title: "Introduction", content: `Let's pretend you're a data analyst and your boss has tasked you with a comprehensive examination of vehicle sales data. 
  Being the overachiever that you are, you decide to seize this opportunity not only to deliver insightful analysis but also to impress your boss and climb up in the corporate world rankings.
  The "Vehicle Sales and Market Trends Dataset" serves as the basis for our analysis.` 
}, 
  { title: "Exploring Automotive Market Trends (1980-2015)", content: `Each data point in the bubble plot represents a vehicle make, with bubble size correlating to market share.` },
  { title: "Sunburst Chart", content: "This is a sunburst chart." }
  ]
);
  
const currentStep = ref(null);

function handleStepEnter({ element }) {
  currentStep.value = element.dataset.stepNo;
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
  padding-bottom: 10%; /* fixes missing transitions */
}

.step {
  padding-top: 100px;
  padding-right: 50px;
  margin-bottom: 10vh;
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
  padding-right: 1.3em; /* Adjust this as needed to align with the text above */
  line-height: 1.6;

}

</style>