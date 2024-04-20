<template>
  <div id="app">
    <ScrollTellingSection/>
  </div>
</template>


<script>
import ScrollTellingSection from './components/ScrollTellingSection.vue';

export default {
  name: 'App',
  components: {
    ScrollTellingSection
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
