<template>
    <v-card class="profile-softskills">
        <v-toolbar color="transparent">
        <v-toolbar-title class="text-h6" text="Diplômes / Certifications"></v-toolbar-title>
        <template v-slot:append>
            <AddItemForm
            title="Ajouter un diplôme"
            inputPlaceholder="diplôme"
            @save="handleSaveDiploma"
            :items="degrees"
            />
        </template>
      </v-toolbar>
      <v-list>
        <v-list-item v-for="degree in degrees" :key="degree">
          <v-list-item-content> {{ degree.year }} - {{ degree.name }} </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
</template>
  

  <script setup lang="ts">
  import { supabase } from '../utils/supabase';

  const props = defineProps<{
    degrees: string[];
    profilId: string;
  }>();
  
  
  const handleSaveDiploma = async (diplomas: string[]) => {
    try {
      const { error } = await supabase.from('profil').update([
        { diploma: diplomas },
      ]).eq('id', props.profilId).select();
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
