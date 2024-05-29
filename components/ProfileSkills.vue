<template>
  <v-card class="profile-skills">
    <v-toolbar color="transparent">
      <v-toolbar-title class="text-h6">Compétences</v-toolbar-title>
      <template v-slot:append>
        <SkillsModal :skills="skills" @update:skills="updateSkills" />
        </template>
    </v-toolbar>
    <v-list>
      <v-list-item v-for="(skill, index) in skills" :key="index">
        <v-list-item-content>{{ skill.name }} - ({{ skill.level }})</v-list-item-content>
      </v-list-item>
    </v-list>
   
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import SkillsModal from './SkillsModal.vue';

const props = defineProps({
  skills: {
    type: Array,
    required: true
  },
  profilId: {
    type: String,
    required: true
  },
});

const skills = ref([...props.skills]);

const updateSkills = async (updatedSkills) => {
  skills.value = updatedSkills;
  try {
      const { error } = await supabase.from('profil').update([
        { hardSkill: updatedSkills },
      ]).eq('id', props.profilId ).select();
      if (error) throw error;
    } catch (error) {
      alert('Une erreur est survenue: ' + error);
    }
};
</script>

<style scoped>
.profile-skills {
  padding: 20px;
}

.text-center {
  text-align: center;
}
</style>
