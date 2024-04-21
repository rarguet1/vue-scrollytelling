<template>
  <v-app id="app">
    <semipolar-spinner :animation-duration="2000" :size="65" color="#1e90ff" />
    <TabNavigation />
    <v-main>
      <ScrollTellingSection />
    </v-main>
    <v-footer color="primary" class="elevation-3" padless>
      <v-container fluid>
        <v-tabs grow class="white--text">
          <v-tab v-for="link in links" :key="link.title" :to="link.to">
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
import { SemipolarSpinner  } from 'epic-spinners'

export default {
  name: 'App',
  components: {
    TabNavigation,
    VFooter,
    SemipolarSpinner,
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
  margin-top: 50px;
}
</style>
