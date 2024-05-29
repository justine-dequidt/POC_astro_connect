<template>
  <v-card class="profile-info">
    <v-toolbar color="transparent">
      <v-toolbar-title class="text-h6">Profil</v-toolbar-title>
      <template v-slot:append>
        <EditProfilForm
          title="Modifier mon profil"
          inputPlaceholder="Métier"
          :profilTitle="user.title"
          :date="user.stratDate"
          @save="handleSaveProfil"
        />
      </template>
    </v-toolbar>
    <v-card-subtitle>{{ user.title }}</v-card-subtitle>
    <v-list>
      <v-list-item>
        <v-list-item-content>Expérience : {{ experience }} ans</v-list-item-content>
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

const experience =  ref(null)
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

onMounted(async () => {
  experience.value = calculateYearsDifference(props.user.startDate)
})


function calculateYearsDifference(startDate: Date): string {
  const currentDate = new Date();
  const msInYear = 1000 * 60 * 60 * 24 * 365.25; 
  const differenceInMs = currentDate.getTime() - new Date(startDate).getTime();
  const differenceInYears = differenceInMs / msInYear;
  const roundedYears = Math.ceil(differenceInYears * 2) / 2;
  return roundedYears.toString().replace('.5', ',5');
}

const handleSaveProfil = async (profil: object) => {
  try {
    const { error } = await supabase
      .from('profil')
      .update({ startDate: profil.startDate, title: profil.job })
      .eq('id', props.profilId)
      .select();
    if (error) throw error;
    props.user.title = profil.job;
    experience.value = calculateYearsDifference(profil.startDate)
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
