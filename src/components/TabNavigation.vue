<template>
    <v-card flat>
      Team 3 visualizations!!!
      <v-tabs bg-color="primary" fixed-tabs>
        <v-tab 
          v-for="link in links" 
          :key="link.title" 
          :to="link.to">
          {{ link.title }}
        </v-tab>
      </v-tabs>
      <router-view />
    </v-card>
  </template>
  
  <script>
  import { VCard, VTabs, VTab } from 'vuetify/components'
  
  export default {
    name: 'TabNavigation',
    components: {
      VCard,
      VTabs,
      VTab
    },
    data() {
      return {
        links: [
          { title: "Bryces's vis", to: '/tab1' },
          { title: "Daya's vis", to: '/tab2' },
          { title: "Jalen's vis", to: '/tab3' },
          { title: "Rodolfo's vis", to: '/tab4' },
          { title: "Cats", to: '/tab5' }
        ]
      }
    }
  }
  </script>
  