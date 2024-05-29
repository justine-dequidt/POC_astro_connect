<template>
    <v-card class="profile-softskills">
        <v-toolbar color="transparent">
        <v-toolbar-title class="text-h6" text="Langues"></v-toolbar-title>
        <template v-slot:append>
            <AddItemForm
            title="Ajouter une langue"
            inputPlaceholder="langue"
            @save="handleSaveLangue"
            :items="degrees"
            />
        </template>
      </v-toolbar>
      <v-list>
        <v-list-item v-for="degree in degrees" :key="degree">
          <v-list-item-content>{{ degree.name }} - ({{ degree.level }}) </v-list-item-content>
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
  
  
  const handleSaveLangue = async (langue: string[]) => {
    try {
      const { error } = await supabase.from('profil').update([
        { langue: langue },
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
