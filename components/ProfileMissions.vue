<template>
  <v-card class="profile-missions">
    <v-toolbar color="transparent">
    <v-toolbar-title class="text-h6" text="Missions"></v-toolbar-title>
    <v-btn @click="openDialog">Ajouter une mission</v-btn>
      <AddMissionDialog v-if="dialogVisible" @close="closeDialog" @save="addMission" />
    </v-toolbar>
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
                <p><strong> {{ mission.title }} </strong></p>
                <br>
                <p><strong>Contexte:</strong> {{ mission.context }}</p>
                <br>
                <p><strong>Tâches:</strong></p>
                <br>
                <ul>
                  <li v-for="task in mission.task" :key="task">{{ task }}</li>
                </ul>
                <p><strong>Technologies:</strong></p>
                <br>
                <ul>
                  <li v-for="tech in mission.technos" :key="tech.name">{{ tech.name }} ({{ tech.level }})</li>
                </ul>
                <br>
                <p><strong>Durée:</strong> {{ mission.duration }}</p>
                <br>
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
import type { HardSkill } from '~/interfaces/hardSkill';
import type { Mission } from '~/interfaces/mission';

const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};


const props = defineProps<{ missions: Mission[], profilId: string, hardSkills: HardSkill }>();

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

const mergeTechnos = (baseTechnos: { name: string; level: string }[], updatedTechnos: { name: string; level: string }[]) => {
        const existingTechnoNames = new Set(baseTechnos.map(techno => techno.name));
        const newTechnos = updatedTechnos.filter(techno => !existingTechnoNames.has(techno.name));
        return [...baseTechnos, ...newTechnos];
    };

const updateMission = async (index: number, updatedMission: Mission) => {
    const skills = mergeTechnos(props.hardSkills, updatedMission.technos);
    props.missions.splice(index, 1, updatedMission);
    try {
        const { error } = await supabase.from('profil').update([
            { mission: props.missions, hardSkill: skills },
        ]).eq('id', props.profilId).select();
        if (error) throw error;
    } catch (error) {
        alert('Une erreur est survenue: ' + error);
    }

    closeEditModal();
};


const addMission = async (mission: Mission) => {
  props.missions.push(mission);
  try {
    const { error } = await supabase.from('profil').update([
        { mission:  props.missions },
      ]).eq('id', props.profilId).select();
      if (error) throw error;
  } catch (error) {
    alert('Une erreur est survenue: ' + error);
  }
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
