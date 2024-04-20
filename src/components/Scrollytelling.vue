<template>
    <div ref="scrollContainer">
      <div v-for="(step, index) in steps" :key="index" ref="steps" class="step">
        <h2>{{ step.title }}</h2>
        <p>{{ step.content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import scrollama from 'scrollama';
  
  export default {
    data() {
      return {
        scroller: null,
        steps: [
          { title: 'Step 1', content: 'Content for step 1.' },
          { title: 'Step 2', content: 'Content for step 2.' },
          { title: 'Step 3', content: 'Content for step 3.' }
        ]
      };
    },
    mounted() {
      this.scroller = scrollama();
      this.scroller.setup({
        step: this.$refs.steps,
        offset: 0.5,
        debug: true
      })
      .onStepEnter(this.handleStepEnter);
    },
    methods: {
      handleStepEnter(response) {
        console.log('Entering:', response.element.textContent);
      }
    }
  };
  </script>
  
  <style scoped>
  .step {
    margin-bottom: 100vh;  /* Ensures each step occupies enough vertical space to scroll through */
    height: 50vh;          /* Height of each step for visibility during scroll */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>  