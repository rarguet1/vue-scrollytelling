<template>
  <v-app id="app">
        <v-container class="px-4" style="min-width: 100%;">
      <TabNavigation />
    </v-container>
    
    <v-main>
      <ScrollTellingSection />
    </v-main>
    
    <!-- Footer with controlled width -->
    <v-footer color="transparent" class="elevation-3">
    <v-container 
      class="pa-3" 
      :style="{
        maxWidth: '100%', 
        margin: 'auto', 
        backgroundColor: '#880E4F',
      }" 
    >
      <v-tabs grow class="white--text">
        <v-tab 
          v-for="link in links" 
          :key="link.title" 
          :to="link.to"
        >
          {{ link.title }}
        </v-tab>
      </v-tabs>
    </v-container>
  </v-footer>
  </v-app>
  
</template>



<script>
import { VFooter } from 'vuetify/lib/components/index.mjs';
import TabNavigation from './components/TabNavigation.vue'

export default {
  name: 'App',
  components: {
    TabNavigation,
    VFooter,
  },
  data() {
    return {
      links: [
        { title: 'Home', to: '/Home' },
        { title: 'About Us', to: '/AboutUs' },
        { title: 'Team', to: '/Ourteam' },
      ],
    };
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
    this.debouncedHandleResize = this.debounce(this.handleResize, 1000);
    window.addEventListener('resize', this.debouncedHandleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.debouncedHandleResize);
  }

}
</script>

<style>

.px-4{
  padding-right: 1rem !important;
  padding-left: 1rem !important;
}

.v-footer {
  bottom: 0;
  width: 99.9%;
}

.scrollama-container {
  display: flex;
  flex-direction: column;
  height: 200vh;
  overflow-y: auto;
}

html, body {
  margin: 1%;
  padding: 0.5%;
  min-height: 100vh;
  background: linear-gradient(90deg, #880E4F, #F9CBE4, #880E4F);
}

html{
  scroll-behavior: smooth;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  align-items: center;
  margin-top: 20px;
  padding-left: 3px;
  padding-right: 30px;
}

.v-tab {
  color: #FFF !important; /* This ensures the text is white and overrides other styles */
}

.scrollama-container .step .content li {
  color: #333;
  margin-bottom: 10px;
}

</style>

