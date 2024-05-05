<template>
  <div>
    <VueScrollama :debug="false" :offset="0.2" @step-enter="handleStepEnter" class="scrollama-container">
      <v-col v-for="(step, index) in steps" :key="index" class="step"
        :class="{ 'step-active': currentStep === (index + 1).toString() }" :data-step-no="index + 1">
        <h2>{{ step.title }}</h2>
        <div v-html="step.content" class="content"></div>
        <BubbleWrapGame v-if="index === 0" class="game" />
        <BubbleChart v-if="index === 2" :min-year="minYear" :max-year="maxYear" :all-data="allData"></BubbleChart>
        <SunburstChart v-if="index === 3"></SunburstChart>
      </v-col>
    </VueScrollama>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueScrollama from 'vue3-scrollama';
import { VCol } from 'vuetify/components';
import BubbleChart from './BubbleChart.vue';
import SunburstChart from './SunburstChart.vue';
import BubbleWrapGame from './BubbleWrapGame.vue';


const steps = ref([
  {
    title: 'Animation and Interactivity',
    content: `In the realm of data visualization, animation stands out as a powerful tool, especially useful when navigating through different configurations of datasets. 
    It facilitates context preservation by helping users track changes through smooth transitions from one state to another, crucial for understanding how data evolves over time. 
    Additionally, animation enhances user engagement by incorporating interactive elements that respond to user inputs, such as hovering over data points to reveal more detailed information.
    In keeping with the theme of animation and interactivity, I've also added a fun bubble wrap game for you to enjoy. Make sure to turn up the volume for the full experience!`
  },
  {
    title: "Introduction to Automotive Market Trends", content: `Let's have some fun and pretend you're a data analyst and your boss has tasked you with a comprehensive examination of vehicle sales data. 
  Being the overachiever that you are, you decide to seize this opportunity not only to deliver insightful analysis but also to impress your boss and climb up in the corporate world rankings.
  The "Vehicle Sales and Market Trends Dataset" serves as the basis for our analysis.
  <ul>
      <li><img src="/images/dog.gif"></li>
  </ul>
  `
  },
  {
    title: "Exploring Automotive Market Trends (1980-2015)", content: `In this section, we use a beeswarm plot to explore vehicle sales by make. Each data point in the beeswarm plot represents sales data for a particular vehicle make. 
    The layout of this plot helps us visualize the distribution of sales volume across different makes, highlighting which makes are more dominant in the market based on the clustering of points. The beeswarm plot allows us to see the spread of sales data without any overlaps, making it easier to identify makes with high or low sales volumes. This visualization helps us spot patterns, trends, and outliers in the sales across the years. 
    The distribution provides clear insights into which vehicle makes have been leading sales at different times and which ones are less popular among consumers.` 
  },
  { title: "Sunburst Chart", content: `Continuing with our exploration of vehicle sales data, let's delve into a visually engaging sunburst chart that breaks down car sales across the US by region and state. 
  This interactive diagram not only highlights which areas are driving the most sales but also allows you to see how individual states contribute to their region's performance. By interacting with this chart, you can click on specific regions to drill down into state-level data, offering a more focused view of sales trends.` 
},
]
);

const currentStep = ref(null);

function handleStepEnter({ element }) {
  currentStep.value = element.dataset.stepNo;
}
</script>

<style>
.scrollama-container .step0 {
  margin-bottom: 1vh;
  padding-bottom: 10%;
}

.scrollama-container .step0 h2 {
  margin-bottom: 10px;
}

.game {
  margin-top: 10px;
  margin-bottom: 20px;
}

.scrollama-container {
  display: flex;
  flex-direction: column;
}

.content {
  padding-right: 5%;
  padding-left: 1%;
  padding-bottom: 10%;
  /* fixes missing transitions */
}

.step {
  padding-top: 100px;
  margin-bottom: 10vh;
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
  line-height: 1.6;
}
</style>