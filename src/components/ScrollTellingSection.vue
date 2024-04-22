<template>
    <div>
      <VueScrollama
          :debug="false"
          :offset="0.5"
          @step-enter="handleStepEnter"
          class="scrollama-container"
      >
        <div
            v-for="(step, index) in steps"
            :key="index"
            class="step"
            :data-step-no="index + 1"
        >
          <h2>{{ step.title }}</h2>
          <p>{{ step.content }}</p>
        </div>
      </VueScrollama>
      <div v-if="currentStep">Current step is: {{ currentStep }}</div>
    </div>
  </template>

<script setup>
import { ref } from 'vue';
import VueScrollama from 'vue3-scrollama';

const currentStep = ref(null);
const steps = [
  { title: 'Step 1', content: 'Content for step 1.' },
  { title: 'Step 2', content: 'Content for step 2.' },
  { title: 'Step 3', content: 'Content for step 3.' },
  // Add more steps as needed...
];

function handleStepEnter({ element }) {
  currentStep.value = element.dataset.stepNo;
}
</script>

</script>

<style scoped>
.scrollama-container {
  margin-bottom: 100vh;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

/* test*/