import { createRouter, createWebHashHistory } from 'vue-router';
import Tab1Page from '../views/Tab1Page.vue';  
import Tab2Page from '../views/Tab2Page.vue';
import Tab3Page from '../views/Tab3Page.vue';
import Tab4Page from '../views/Tab4Page.vue';
import Tab5Page from '../views/Tab5Page.vue';
import HomePage from '../views/HomePage.vue'
import OurTeam from '../views/OurTeam.vue'
import AboutUs from '../views/AboutUs.vue'
import { ScrollamaWrapper } from 'vue-scrollama';

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/AboutUs',
    name: 'AboutUs',
    component: AboutUs,
  },
  {
    path: '/Ourteam',
    name: 'OurTeam',
    component: OurTeam,
  },
  {
    path: '/',
    redirect: '/Home' // Redirect to the first tab when the root path is accessed
  },
  {
    path: '/tab1',
    name: 'tab1',
    component: Tab1Page
  },
  {
    path: '/tab2',
    name: 'tab2',
    component: Tab2Page
  },
  {
    path: '/tab3',
    name: 'tab3',
    component: Tab3Page
  },
  {
    path: '/tab4',
    name: 'tab4',
    component: Tab4Page
  },
  {
    path: '/tab5',
    name: 'tab5',
    component: Tab5Page
  },
  {
    path: '/scrollama', // Define the path for Scrollama
    name: 'scrollama',
    component: ScrollamaWrapper // Assign ScrollamaWrapper to the route
  }
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  }
});

export default router;
