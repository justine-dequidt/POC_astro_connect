<template>
  <v-card class="profile-info">
    <v-toolbar color="transparent">
      <v-toolbar-title class="text-h6">Profil</v-toolbar-title>
      <template v-slot:append>
        <EditProfilForm
          title="Modifier mon profil"
          inputPlaceholder="Métier"
          :profilTitle="user.title"
          @save="handleSaveProfil"
        />
      </template>
    </v-toolbar>
    <v-card-subtitle>{{ user.title }}</v-card-subtitle>
    <v-list>
      <v-list-item>
        <v-list-item-content>Expérience : {{ user.experience }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Entreprise : Grow your business</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import EditProfilForm from './EditProfilForm.vue';
import { supabase } from '../utils/supabase';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  profilId: {
    type: String,
    required: true,
  },
});

const handleSaveProfil = async (profilTitle: string) => {
  try {
    const { error } = await supabase
      .from('profil')
      .update({ title: profilTitle })
      .eq('id', props.profilId)
      .select();
    if (error) throw error;
    props.user.title = profilTitle;
  } catch (error) {
    alert('Une erreur est survenue: ' + error.message);
  }
};
</script>

<style scoped>
.profile-info {
  padding: 20px;
}
</style>
