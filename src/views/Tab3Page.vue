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
        <div v-if="index === 0" class="choropleth-map">
          <iframe src="/images/streamgraph.html"></iframe>
        </div> 
        <div v-if="index === 1" class="choropleth-map">
          <iframe src="/images/ChoroplethMap.html"></iframe>
        </div>     
      </v-col>
    </VueScrollama>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import VueScrollama from 'vue3-scrollama';
import { VCol } from 'vuetify/components';

const currentStep = ref(null);


// This is where you can add the titles for your sections
const steps = [
  { 
    title: 'Overall MMR Market Trend by Make',
    content: `This streamgraph depicts the yearly market trends (MMR) by car make and year, featuring additional interactivity such as scrollable legend, year slider, and reset buttons.`  
  },
  { 
    title: 'Total Number of Cars Sold per State',
    content: `This choropleth map illustrating the total number of cars sold in each state in the US, featuring interactive annotations and a hover feature. Note that data is unavailable for certain states.`
  },
];
onMounted(() => {
  currentStep.value = '1';  // Set the first step active
});

function handleStepEnter({ element }) {
  currentStep.value = element.dataset.stepNo;
}

</script>

<style scoped>
.scrollama-container {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.content{
  padding-bottom: 24px;
}

.step {
  margin: 20px 0;
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
  line-height: 1.2;
}

.choropleth-map {
  margin: auto;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
}

.choropleth-map iframe {
  width: 100%;
  height: 600px;
  border: none;
}
</style>

