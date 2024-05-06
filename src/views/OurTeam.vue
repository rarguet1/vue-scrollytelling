<template>
  <v-container>
    <v-row justify="center" class="vrow">
      <v-col
        cols="12" sm="8" md="6" lg="4" 
        v-for="member in teamMembers"
        :key="member.id"
      >
        <v-card class="mx-auto" max-width="344px" outlined> <!-- Use mx-auto to center the card -->
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-avatar class="profile-container" tile color="grey">
                <img class="profile-pic" :src="member.image" alt="Profile" />
              </v-list-item-avatar>
              <div class="overline mb-4">{{ member.role }}</div>
              <v-list-item-title class="headline mb-1">{{ member.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ member.bio }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


  
  <script>
// import {VListItem, VListItemTitle, VListItemSubtitle, VListItemAvatar, VListItemContent } from 'vuetify/lib';
import { VCard, VCol, VRow } from 'vuetify/components'
  export default {
    name: 'OurTeam',
    VCard,
    VRow,
    VCol,
    data() {
      return {
        teamMembers: [
          {
            id: 1,
            name: 'Bryce',
            role: 'Technical writing & QA/QC',
            bio: 'Im supposed to write my bio here.',
            image: `/images/Troll-face.gif`,
          },
          {
            id: 2,
            name: 'Daya',
            role: 'Coding Monkey',
            bio: 'Short bio here.',
            image: 'path_to_image',
          },
          {
            id: 3,
            name: 'Jalen',
            role: 'Resource manager',
            bio: '"I\'m here to serve"',
            image: '/images/cute_lol.jpg',
          },
          {
            id: 4,
            name: 'Rodolfo',
            role: 'Project Manager',
            bio: 'Me when error',
            image: '/images/huh-2.jpeg',
          },
          // ... Add more members as needed
        ]
      };
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    margin-top: 50px;  /* Add top margin to each card */
    margin-bottom: 50px;  /* Add bottom margin to each card */
  }

  .vrow{
    padding-left: 25%;
  }

  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }

  .profile-pic {
    display: block;
    margin: auto;
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
  </style>