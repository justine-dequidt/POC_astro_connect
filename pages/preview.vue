<template>
    <div class="container" v-if="user && profil">
        <div id="pdf" class="container-global">
            <img class="footerPdf" src="../assets/header.png" alt="footerPdf"/>
            <div class="container-pdf">
                <div class="left-side ma-6">
                    <img class="profile-avatar" :src="user.user_metadata.picture" alt="User Avatar">
                    <div class="ma-4">
                        <h2>Skills</h2>
                        <h4>Expert</h4>
                        <v-chip v-for="skill in profil.hardSkill.level3" :key="skill.name" class="mr-2 mt-2 ">
                            {{skill.name}}
                        </v-chip>
                        <h4>Comfirmé</h4>
                        <v-chip v-for="skill in profil.hardSkill.level2" :key="skill.name" class="mr-2 mt-2 ">
                            {{skill.name}}
                        </v-chip>
                        <h4>Junior</h4>
                        <v-chip v-for="skill in profil.hardSkill.level3" :key="skill.name" class="mr-2 mt-2">
                            {{skill.name}}
                        </v-chip>
                        <h2 class="mt-4">Soft skills</h2>
                        <v-chip v-for="skill in profil.softSkill" :key="skill" class="mr-2 mt-2">
                            {{skill}}
                        </v-chip>
                        <h2 class="mt-4">Langues</h2>
                        <v-chip v-for="item in profil.langue" :key="item.name" class="mr-2 mt-2">
                            {{item.name}} / {{item.level}}
                        </v-chip>
                    </div>
                </div>
                <div class="right-side ">
                    <div class="profil-title">
                        <h1>{{ user.user_metadata.full_name }}</h1>
                        <h3>{{ profil.title }}</h3>
                    </div>
                    <div class="ma-6">
                        <h6>{{ profil.profilText }}</h6>
                        <div>
                            <h2 class="mt-10">Work Experience</h2>
                            <div v-for="mission in profil.mission" :key="mission.id" class="mb-2">
                                <h5>{{mission.clientName }} - {{ mission.duration }}</h5> 
                                <p class="text-size">{{mission.title }}</p> 
                            </div>
                            <h2 class="mt-6">Education</h2>
                            <div v-for="diploma in profil.diploma" :key="diploma.name" class="mb-2">
                                <p class="text-size">{{diploma.year }} - {{ diploma.name }}</p> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img class="footerPdf" src="../assets/footerPdf.png" alt="footerPdf"/>
        </div>
    </div>
    <v-btn @click="exportPdf">
        Download
    </v-btn>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Profil } from '~/interfaces/profil';
import html2pdf from 'html2pdf.js';

const user = ref<Profil>(null);
const profil = ref<Profil>(null);

onMounted(async () => {
    const { data } = await supabase.auth.getSession();
    user.value = data.session.user;
    user.value.user_metadata.full_name = capitalizeWords(user.value.user_metadata.full_name)
    try{
        let { data } = await supabase.from('profil').select('*').eq('user_id', user.value.id)
            profil.value = data[0]
    }catch(error){
        alert("Une erreur est survenue" + error)
    }
    profil.value.hardSkill = sortSkillsByLevel(profil.value.hardSkill)
});

function capitalizeWords(str: string): string {
  return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
}

function sortSkillsByLevel(skills: Skill[]): { level1: Skill[], level2: Skill[], level3: Skill[] } {
  const level1: Skill[] = [];
  const level2: Skill[] = [];
  const level3: Skill[] = [];

  skills.forEach(skill => {
    if (skill.level === 1) {
      level1.push(skill);
    } else if (skill.level === 2) {
      level2.push(skill);
    } else if (skill.level === 3) {
      level3.push(skill);
    }
});

  return { level1, level2, level3 };
}

const exportPdf = async () => {
  const element = document.getElementById('pdf');

  const opt = {
    margin: 0,
    filename: 'profil.pdf',
    jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
  };
  await html2pdf().set(opt).from(element).save();
}
</script>
<style>
.container-pdf {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  background-color: white;
    width: 800px;
}
.container-global{
    background-color: white;
  
}
.text-size{
    font-size: 10px;
}
.container{
    background-color: rgb(244, 244, 244);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px;
}
.profile-avatar {
    width: 140px !important;
    height: 140px !important;
    border-radius: 80px;
    border: solid 10px white;
    margin-top: -100px;
}
.profil-title{
    margin: -85px 0px 10px 20px;
}
.right-side{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
}
.left-side{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
}
.footerPdf{
    width: 800px;
}
</style>