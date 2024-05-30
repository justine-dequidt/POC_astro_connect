<template>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ props: attrs }">
        <v-btn icon v-bind="attrs" >
          <v-icon>mdi-account-edit-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ title }} </span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="saveProfilTitle">
            <v-row>
              <v-col cols="12">
                <v-text-field label="Phrase d'introduction profile" v-model="profilText" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field :label="inputPlaceholder" v-model="localProfilTitle" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-date-input label="Date de début" v-model="stratDate" required></v-date-input>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="saveProfilTitle">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    inputPlaceholder: {
      type: String,
      required: true,
    },
    profilTitle: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    profilText: {
      type: String,
      required: true,
    },
  });
  
  const emit = defineEmits(['save']);
  
  const dialog = ref(false);
  const localProfilTitle = ref(props.profilTitle);
  const stratDate = ref(props.date)
  const profilText = ref(props.profilText)

  
  watch(() => props.profilTitle, (newVal) => {
    localProfilTitle.value = newVal;
  });
  
  const saveProfilTitle = () => {
    const profilInfo = {
      job: localProfilTitle.value,
      startDate: stratDate.value,
      profilText: profilText.value
    }
    emit('save', profilInfo);
    dialog.value = false;
  };
  </script>
  
  <style scoped>
  .v-col.align-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  