<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Modifier la Mission</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="save">
          <v-text-field v-model="localMission.clientName" label="Nom du Client" required></v-text-field>
          <v-text-field v-model="localMission.sector" label="Secteur" required></v-text-field>
          <v-text-field v-model="localMission.title" label="Titre de la mission" required></v-text-field>
          <v-text-field
            v-model="localMission.stratDate"
            label="Date de Début (JJ/MM/YYYY)"
            placeholder="JJ/MM/YYYY"
            required
          ></v-text-field>

          <v-switch v-model="localMission.inProgress" label="En cours"></v-switch>

          <v-text-field
            v-if="!localMission.inProgress"
            v-model="localMission.endDate"
            label="Date de Fin (JJ/MM/YYYY)"
            placeholder="JJ/MM/YYYY"
            required
          ></v-text-field>

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
            <v-col cols="10">
              <v-text-field label="Ajouter une technologie" v-model="newTech.name" required></v-text-field>
            </v-col>
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
import { ref, watch, defineProps, defineEmits } from 'vue';
import type { HardSkill } from '~/interfaces/hardSkill';
import type { Mission } from '~/interfaces/mission';



const props = defineProps<{ mission: Mission, index: number }>();
const emit = defineEmits(['save', 'close']);

const dialog = ref(true);
const localMission = ref<Mission>({ ...props.mission });
const newTask = ref('');
const newTech = ref<HardSkill>({ name: '' });

watch(() => props.mission, (newMission) => {
  localMission.value = { ...newMission };
});

watch(localMission.value, async () => {
  calculateDuration();
});

const close = () => {
  dialog.value = false;
  emit('close');
};

const save = () => {
  emit('save', props.index, localMission.value);
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
    newTech.value = { name: '' };
  }
};

const removeTech = (index: number) => {
  localMission.value.technos.splice(index, 1);
};

const calculateDuration = () => {
  if (!localMission.value.stratDate) return;

  const startDate = new Date(localMission.value.stratDate.split('/').reverse().join('-'));

  let endDate = new Date();
  if (!localMission.value.inProgress && localMission.value.endDate) {
    endDate = new Date(localMission.value.endDate.split('/').reverse().join('-'));
  }

  const durationInMs = endDate.getTime() - startDate.getTime();
  const durationInDays = Math.ceil(durationInMs / (1000 * 3600 * 24));
  const years = Math.floor(durationInDays / 365);
  const remainingDays = durationInDays % 365;
  const months = Math.ceil(remainingDays / 30);

  let durationString = "";
  if (years > 0) durationString += `${years} an${years > 1 ? 's' : ''}`;
  if (months > 0) durationString += `${years > 0 ? ' et ' : ''}${months} mois`;

  localMission.value.duration = durationString;
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
