<template>
    <v-card class="profile-softskills">
        <v-toolbar color="transparent">
        <v-toolbar-title class="text-h6" text="Soft Skills"></v-toolbar-title>
        <template v-slot:append>
            <AddItemForm
            title="Ajouter un soft skill"
            inputPlaceholder="Soft skill"
            @save="handleSaveSoftSkills"
            :items="softSkills"
            />
        </template>
      </v-toolbar>
      <v-list>
        <v-list-item v-for="skill in softSkills" :key="skill">
          <v-list-item-content>{{ skill }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
</template>
  

  <script setup lang="ts">
  import { supabase } from '../utils/supabase';

  const props = defineProps<{
    softSkills: string[];
    user: {};
    profilId: string;
  }>();
  
  
  const handleSaveSoftSkills = async (skills: string[]) => {
    try {
      const { error } = await supabase.from('profil').update([
        { softSkill: skills },
      ]).eq('id', props.profilId ).select();
      if (error) throw error;
    } catch (error) {
      alert('Une erreur est survenue: ' + error);
    }
  };
  </script>
  
  <style scoped>
  .profile-softskills {
    padding: 20px;
  }
  </style>
