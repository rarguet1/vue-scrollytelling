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
{ 
    title: 'Introduction to the Dataset and Unique Measurement Choice:', 
    content: `I wanted to help the audience visualize our car dataset in an interesting way. 
              I’m sure you’ve heard that Americans will use anything but the metric system. 
              That led me down a rabbit hole to find the most bizarre metric for our dataset.

              Some popular examples include:
              <ul>
                <li>Banana for scale</li>
                <li>American Eagles</li>
                <li>Hot Dogs</li>
              </ul>`
  },
  { 
    title: 'Choosing Cats as a Unit of Measurement:', 
    content: `However, there is one thing the internet loves… cats! 
    We will be using some math to find out how many cats can fit in a car. 
    Originally we intended to find out how many cats fit in the trunk of a car… 
    However, not all cars have a trunk, some are hatchbacks. 
    This led us to reconsider our methods. 
    Inspired by this article, 'Honda Civic Trunk Cats', cats will be our chosen unit of measurement.` 
  },
  { 
    title: 'Mathematical Approach and Methodology:', 
    content: `I will be borrowing their math and extrapolating a bit, so bear with me…` 
  },
  { 
    title: 'Analysis Set 1: Popular Cars:', 
    content: `"I have two sets to discuss, the first being of the most popular cars in our dataset. 
    We will explore how many cats can fit in them, providing insights into the spatial capacities of these beloved models` 
  },
  { title: 'Analysis Set 2: Largest Cars:', 
  content: `The second set will focus on the largest cars in our dataset. 
  How many cats can fit in them? 
  We’ve handpicked those based on universal car knowledge because web scraping the car sizes would not be too fun…` },
  { title: 'Conclusion',
  content: `In this exploration, we’ve seen how even the most whimsical measurements can provide insights and make data visualization more engaging.`
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

