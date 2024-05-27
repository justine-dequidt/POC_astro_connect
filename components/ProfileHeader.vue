<template>
    <v-card class="profile-header">
      <v-avatar class="profile-avatar">
        <img :src="user.picture" alt="User Avatar">
      </v-avatar>
      <v-card-title class="profile-name">{{ user.full_name }}</v-card-title>
    </v-card>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    user: {
      picture: string;
      full_name: string;
    }
  }>();
  </script>
  
  <style scoped>
  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .profile-avatar {
    width: 90px !important;
    height: 90px !important;
  }
  
  .profile-name {
    margin-top: 10px;
    text-align: center;
  }
  </style>
  