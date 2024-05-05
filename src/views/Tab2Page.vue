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
{ title: 'Misleading Visualizations', 
content: `A misleading visualization in data visualization refers to a graphical representation of data that inaccurately portrays information. This misrepresentation can occur intentionally or unintentionally and may lead viewers to draw incorrect conclusions or misunderstand the underlying data.
<ul>
      <img src="/images/mis_theme_page.png" alt="theme" />
    </ul>`},
{ title: 'Exaggerated proportion of Toyota Sales',
  content: `This visualization is kind of misleading, because it is exaggerating Toyota sales by comparing it with all other car sales. The users will assume that Toyota has major proportion of sales compared to other car sales.
    <ul>
      <iframe src="/images/mis1_pie.html" width="800" height="800"></iframe>
      </ul>`},
      { title: 'Total sales vs Average sales ',
  content: `This visualization is kind of misleading, because it is using dual Y-axis and both the scales are different. It is difficult to identify and compare the actual values. 
    <ul>
      <iframe src="/images/mis2_bl.html" width="1000" height="600"></iframe>
      </ul>`},
      {title: 'Some other interactive visualizations made for the project'},
  { title: 'Most common Makes, Models and Body types', 
  content: ` This is Sunburst chart with Makes as upper layer. It's an interactive vis, once you click on Ford (for exacmple) the sunburst becomes for Ford .
      <ul>
        <iframe src="/images/vis1_sunburst.html" width="800" height="800"></iframe>
      </ul>`
  },
  { title: 'Top 10 vehicle sales',
   content: `This is Stacked bar chart which shows sales of Top 10 vechicle makes over the time period
      <ul>
        <iframe src="/images/vis2_stackedbar.html" width="1000" height="1000"></iframe>
      </ul>
   
            ` 
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
  display: flex;
  flex-direction: column;
}

.content{
  padding: 0 64px;

}

.step {
  margin: 0;
  padding: 24px;
  width: 100%;
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

