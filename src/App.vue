<template>
  <v-app id="app">
    <!-- <semipolar-spinner :animation-duration="2000" :size="65" color="#880E4F" /> -->
    
    <!-- Tab Navigation wrapped in a container to control width -->
    <v-container class="px-4" style="max-width: 85%; margin: auto;">
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
        maxWidth: '85%', 
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
// import { SemipolarSpinner  } from 'epic-spinners'

export default {
  name: 'App',
  components: {
    TabNavigation,
    VFooter,
    // SemipolarSpinner,
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
  align-items: center;
  margin-top: 20px;
}

.v-tab {
  color: #FFF !important; /* This ensures the text is white and overrides other styles */
}

/* Global styles */
.scrollama-container .step .content ul {
  width: 15%;
  padding: 10px;
  margin: auto;
  list-style-type: disc;
}

.scrollama-container .step .content li {
  color: #333;
  margin-bottom: 10px;
}
</style>

