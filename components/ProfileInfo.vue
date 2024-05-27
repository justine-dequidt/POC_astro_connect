<template>
    <v-card class="profile-info">
      <v-card-title class="text-center">Profil</v-card-title>
      <v-card-subtitle class="text-center">{{ user.title }}</v-card-subtitle>
      <v-list>
        <v-list-item>
          <v-list-item-content>Expérience : {{ user.experience }}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>Entreprise : {{ user.company }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    user: {
      title: string;
      experience: string;
      company: string;
    }
  }>();
  </script>
  
  <style scoped>
  .profile-info {
    padding: 20px;
  }
  </style>
  