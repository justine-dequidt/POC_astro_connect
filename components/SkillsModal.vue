<template>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ props: activator }">
      <v-btn icon v-bind="activator">
        <v-icon>mdi-account-edit-outline</v-icon>
      </v-btn>
    </template>
      <v-card>
        <v-card-title>
          <span class="headline">Gérer les compétences</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addSkill">
            <v-row>
              <v-col cols="6">
                <v-text-field label="Nom de la compétence" v-model="newSkill.name" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-rating
                    v-model="newSkill.level"
                    active-color="blue"
                    color="orange lighten-1"
                    length="3"
                    :item-labels="['Junior', 'Confirmé', 'Expert']"
                >
                <template v-slot:item-label="props">
                    <span
                        class="font-weight-black text-caption"
                    >
                    {{ props.label }}
                    </span>
                </template>
            </v-rating>
              </v-col>
              <v-col cols="12" class="text-right">
                <v-btn color="primary" @click="addSkill">Ajouter / modifier</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-list>
            <v-list-item v-for="(skill, index) in skills" :key="index">
              <v-list-item-content>
                {{ skill.name }} - Niveau: {{ skill.level }}
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="editSkill(index)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="removeSkill(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="saveSkills">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  skills: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:skills']);

const dialog = ref(false);
const newSkill = ref({ name: '', level: 0 });
const skills = ref([...props.skills]);

const addSkill = () => {
  if (newSkill.value.name && newSkill.value.level) {
    skills.value.unshift({ ...newSkill.value });
    newSkill.value = { name: '', level: 0 };
  }
  emit('update:skills', skills.value);
};

const removeSkill = (index: number) => {
  skills.value.splice(index, 1);
  emit('update:skills', skills.value);
};

const editSkill = (index: number) => {
  const skill = skills.value[index];
  newSkill.value = { ...skill };
  skills.value.splice(index, 1);
};

const saveSkills = () => {
  if (newSkill.value.name && newSkill.value.level) {
    skills.value.unshift({ ...newSkill.value });
    newSkill.value = { name: '', level: 0 };
  }
  emit('update:skills', skills.value);
  dialog.value = false;
};
</script>
  
<style scoped>
/* Ajoutez vos styles ici si nécessaire */
</style>
  