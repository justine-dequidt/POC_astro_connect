<template>
    <v-card class="profile-missions">
      <v-card-title class="text-center">Missions</v-card-title>
      <v-list>
        <v-list-item v-for="mission in missions" :key="mission.id">
          <v-list-item-content>
            <div class="mission-title">{{ mission.title }} - {{ mission.client }} ({{ mission.year }})</div>
            <div class="mission-description">{{ mission.description }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    missions: {
      id: number;
      title: string;
      client: string;
      year: number;
      description: string;
    }[];
  }>();
  </script>
  
  <style scoped>
  .profile-missions {
    padding: 20px;
  }
  
  .mission-title {
    font-weight: bold;
  }
  
  .mission-description {
    margin-top: 5px;
  }
  </style>
  