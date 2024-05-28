<template>
    <v-container class="profile-container" v-if="user && profil && userInfo">
      <v-row>
        <v-col cols="12" md="4">
          <ProfileHeader :user="user.user_metadata" />
        </v-col>
        <v-col cols="12" md="8">
          <ProfileInfo :profilId="profil.id" :user="userInfo" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <ProfileSkills :user="user" :profilId="profil.id" :skills="profil.hardSkill" />
        </v-col>
        <v-col cols="12" md="3">
          <ProfileSoftSkills :user="user" :profilId="profil.id" :softSkills="profil.softSkill" />
        </v-col>
        <v-col cols="12" md="3">
          <ProfileEducation :user="user" :profilId="profil.id" :degrees="profil.diploma" />
        </v-col>
      </v-row>
      <ProfileMissions :profilId="profil.id" :missions="profil.mission" />
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { supabase } from '../utils/supabase';
  // definePageMeta({
  //   middleware: ['auth'],
  // });

  import ProfileHeader from '@/components/ProfileHeader.vue';
  import ProfileInfo from '@/components/ProfileInfo.vue';
  import ProfileSkills from '@/components/ProfileSkills.vue';
  import ProfileSoftSkills from '@/components/ProfileSoftSkills.vue';
  import ProfileEducation from '@/components/ProfileEducation.vue';
  import ProfileMissions from '@/components/ProfileMissions.vue';
  
  const user = ref(null);
  const userInfo = ref(null);
  const profil = ref(null);
  
  onMounted(async () => {
    const { data } = await supabase.auth.getSession();
    user.value = data.session.user;
    try{
        let { data } = await supabase.from('profil').select('*').eq('user_id', user.value.id)
        if(data[0]){
            profil.value = data[0]
        }else{
            const { data, error } = await supabase.from('profil').insert([
                { user_id: user.value.id },
            ]).select();
            profil.value = data[0]
            if(error) throw error
        }
    }catch(error){
        alert("Une erreur est survenue" + error)
    }
    userInfo.value = {
      title: profil.value.title,
      experience: profil.value.xp,
      company: "Grow Your Business"
    };
  });
  </script>
  
  <style scoped>
  .profile-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .profile-header {
    margin-bottom: 20px;
  }
  </style>
  