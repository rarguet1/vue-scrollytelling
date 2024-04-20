<template>
  <div id="app">
    <TabNavigation />
    <ScrollTellingSection />
  </div>
</template>

<script>
import TabNavigation from './components/TabNavigation.vue'

export default {
  name: 'App',
  components: {
    TabNavigation,
  },
  methods: {
    // Debounce function to delay execution of a function
    debounce(func, wait) {
      let timeout;
      return function () {
        const context = this,
          args = arguments;
        const later = function () {
          timeout = null;
          func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    // Example method to be debounced
    handleResize: function () {
      console.log('Resized!');
    },
  },
  mounted() {
    this.debouncedHandleResize = this.debounce(this.handleResize, 500);
    window.addEventListener('resize', this.debouncedHandleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.debouncedHandleResize);
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #9c1691;
  margin-top: 60px;
}
</style>
