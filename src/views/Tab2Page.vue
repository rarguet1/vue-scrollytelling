<template>
  <ScrollamaWrapper>
    <!-- Content specific to Tab 1 -->
    <div v-for="(step, index) in steps" :key="index" class="step">
      <h2>{{ step.title }}</h2>
      <p>{{ step.content }}</p>
    </div>
  </ScrollamaWrapper>
</template>

<script>
import { ScrollamaWrapper } from 'vue-scrollama'; // Import the ScrollamaWrapper component

export default {
  name: 'Tab2Page',
  components: {
    ScrollamaWrapper // Register the ScrollamaWrapper component
  },
  data() {
    return {
      steps: [
        { title: 'Step 1', content: 'Content for step 1.' },
        { title: 'Step 2', content: 'Content for step 2.' },
        { title: 'Step 3', content: 'Content for step 3.' }
      ]
    };
  }
};
</script>

<style scoped>
.step {
  margin-bottom: 100vh; /* Ensures each step occupies enough vertical space to scroll through */
  height: 50vh; /* Height of each step for visibility during scroll */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
