<template>
    <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ props: attrs }">
        <v-btn variant="outlined" v-bind="attrs" >
           Ajouter une Mission
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-form @submit.prevent="save">
            <v-text-field v-model="localMission.clientName" label="Nom du Client" required></v-text-field>
            <v-text-field v-model="localMission.sector" label="Secteur" required></v-text-field>
            <v-text-field v-model="localMission.stratDate" label="Date de Début" required></v-text-field>
            <v-text-field v-model="localMission.endDate" label="Date de Fin" required></v-text-field>
            <v-text-field v-model="localMission.duration" label="Durée" required></v-text-field>
            <v-switch v-model="localMission.inProgress" label="En cours"></v-switch>
            <v-textarea v-model="localMission.context" label="Contexte" required></v-textarea>
  
            <h3>Tâches</h3>
            <v-row>
              <v-col cols="10">
                <v-text-field label="Ajouter une tâche" v-model="newTask" required></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="addTask">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <ul class="items-list">
              <li v-for="(task, index) in localMission.task" :key="index" class="items-list-item">
                <span>{{ task }}</span>
                <v-btn icon @click="removeTask(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </li>
            </ul>
  
            <h3>Technologies</h3>
            <v-row>
              <v-col cols="5">
                <v-text-field label="Ajouter une technologie" v-model="newTech.name" required></v-text-field>
              </v-col>
                <!-- <v-text-field label="Niveau" v-model="newTech.level" required></v-text-field> -->
              <v-col cols="2">
                <v-btn icon @click="addTech">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <ul class="items-list">
              <li v-for="(tech, index) in localMission.technos" :key="index" class="items-list-item">
                <span>{{ tech.name }}</span>
                <v-btn icon @click="removeTech(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </li>
            </ul>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="save">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  
  interface HardSkill {
    name: string;
  }
  
  interface Mission {
    id: number;
    clientName: string;
    sector: string;
    stratDate: string;
    endDate: string;
    duration: string;
    inProgress: boolean;
    context: string;
    task: Array<string>;
    technos: Array<HardSkill>;
  }
  
  const props = defineProps<{ show: boolean }>();
  const emit = defineEmits(['save', 'close']);
  
  const dialog = ref(props.show);
  const localMission = ref<Mission>({
    id: Date.now(),
    clientName: '',
    sector: '',
    stratDate: '',
    endDate: '',
    duration: '',
    inProgress: false,
    context: '',
    task: [],
    technos: []
  });
  const newTask = ref('');
  const newTech = ref<HardSkill>({ name: ''});
  
  const close = () => {
    dialog.value = false;
    emit('close');
  };
  
  const handleRatingChange = (newRating) =>{
    localMission.value.currentRating = newRating;
      console.log('Selected Rating:', newRating); // Vous pouvez enregistrer cette valeur en BDD
    }

  const save = () => {
    emit('save', localMission.value);
    close();
  };
  
  const addTask = () => {
    if (newTask.value.trim()) {
      localMission.value.task.push(newTask.value.trim());
      newTask.value = '';
    }
  };
  
  const removeTask = (index: number) => {
    localMission.value.task.splice(index, 1);
  };
  
  const addTech = () => {
    if (newTech.value.name.trim()) {
      localMission.value.technos.push({ ...newTech.value });
      newTech.value = { name: ''};
    }
  };
  
  const removeTech = (index: number) => {
    localMission.value.technos.splice(index, 1);
  };
  </script>
  
  <style scoped>
  .items-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .items-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
  }
  
  .items-list-item span {
    flex-grow: 1;
  }
  
  .items-list-item v-btn {
    margin-left: 8px;
  }
  </style>
  