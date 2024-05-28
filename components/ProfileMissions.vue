<template>
  <v-card class="profile-missions">
    <v-card-title class="text-center">Missions</v-card-title>
    <v-list>
      <v-list-item-group v-model="expandedMission" active-class="open">
        <v-list-item v-for="(mission, index) in missions" :key="index">
          <v-list-item-content>
            <v-row align="center" class="mission-header">
              <v-col cols="8">
                <div class="mission-title">{{ mission.clientName }} - {{ mission.stratDate }} ({{ mission.duration }})</div>
              </v-col>
              <v-col cols="4" class="text-right">
                <v-btn variant="text" icon @click="toggleDetails(index)">
                  <v-icon>{{ expandedMission === index ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                <v-btn variant="text" icon @click="openEditModal(index)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn variant="text" icon @click="deleteMission(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-expand-transition>
              <div v-show="expandedMission === index" class="mission-details">
                <p><strong>Contexte:</strong> {{ mission.context }}</p>
                <p><strong>Tâches:</strong></p>
                <ul>
                  <li v-for="task in mission.task" :key="task">{{ task }}</li>
                </ul>
                <p><strong>Technologies:</strong></p>
                <ul>
                  <li v-for="tech in mission.technos" :key="tech.name">{{ tech.name }} ({{ tech.level }})</li>
                </ul>
                <p><strong>Durée:</strong> {{ mission.duration }}</p>
                <p><strong>En cours:</strong> {{ mission.inProgress ? 'Oui' : 'Non' }}</p>
              </div>
            </v-expand-transition>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <!-- Edit Mission Modal -->
    <EditMissionModal
      v-if="selectedMissionIndex !== null"
      :mission="missions[selectedMissionIndex]"
      :index="selectedMissionIndex"
      @save="updateMission"
      @close="closeEditModal"
    />
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineProps } from 'vue';

interface HardSkill {
  name: string;
  level: string;
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

const props = defineProps<{ missions: Mission[], profilId: string }>();

const expandedMission = ref<number | null>(null);
const selectedMissionIndex = ref<number | null>(null);

const toggleDetails = (index: number) => {
  expandedMission.value = expandedMission.value === index ? null : index;
};

const openEditModal = (index: number) => {
  selectedMissionIndex.value = index;
};

const closeEditModal = () => {
  selectedMissionIndex.value = null;
};

const updateMission = async (index: number, updatedMission: Mission) => {
  props.missions.splice(index, 1, updatedMission);
  try {
      const { error } = await supabase.from('profil').update([
        { mission:  props.missions },
      ]).eq('id', props.profilId).select();
      if (error) throw error;
    } catch (error) {
      alert('Une erreur est survenue: ' + error);
    }
  closeEditModal();
};

const deleteMission = async (index: number) => {
  props.missions.splice(index, 1);
  try {
      const { error } = await supabase.from('profil').update([
        { mission:  props.missions },
      ]).eq('id', props.profilId).select();
      if (error) throw error;
    } catch (error) {
      alert('Une erreur est survenue: ' + error);
    }
};
</script>

<style scoped>
.profile-missions {
  padding: 20px;
}

.mission-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mission-title {
  font-weight: bold;
}

.mission-details {
  margin-top: 15px;
  padding-left: 25px;
}
</style>
