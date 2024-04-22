<template>
  <div>
    <VueScrollama
      :debug="false"  
      :offset="0.5"
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
        <p>{{ step.content }}</p>
      </v-col>
    </VueScrollama>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import VueScrollama from 'vue3-scrollama';
import { VCol } from 'vuetify/components';
import { onMounted } from 'vue';

onMounted(() => {
  currentStep.value = '1'; 
});


const currentStep = ref(null);
const steps = [
  { title: 'Step 1', content: 'Content for step 1.' },
  { title: 'Step 2', content: 'Content for step 2.' },
  { title: 'Step 3', content: 'Content for step 3.' },
];

function handleStepEnter({ element }) {
  console.log("Step Entered:", element.dataset.stepNo);  // Logging to see when steps are entered
  currentStep.value = element.dataset.stepNo;
}
</script>

<style scoped>
.scrollama-container {
  display: flex;
  flex-direction: column;
}

.step {
  margin-bottom: 100vh;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: translateY(20px); /* Start slightly translated down */
  opacity: 0.5; /* Start with a lower opacity */
}

.step-active {
  transform: translateY(0); /* End at natural position */
  opacity: 1; /* Fully visible when active */
}
</style>

