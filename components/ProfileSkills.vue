<template>
    <v-card class="profile-skills">
      <v-card-title class="text-center">Compétences</v-card-title>
      <v-list>
        <v-list-item v-for="skill in skills" :key="skill">
          <v-list-item-content>{{ skill }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script setup lang="ts">
  
  defineProps<{
    skills: string[];
    user: {};
  }>();
  </script>
  
  <style scoped>
  .profile-skills {
    padding: 20px;
  }
  
  .add-skill {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  </style>
  