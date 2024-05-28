<template>
<v-btn @click="test">
  se connecter avec google 
</v-btn>
</template>

<script setup lang="ts">
import { supabase } from '../utils/supabase'
const config = useRuntimeConfig()

const url = config.public.environnement === 'local' ?  `http://localhost:3000/profil` : `https://main--poc-astro-connect.netlify.app/profil`


const test = () => {
  supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: url,
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
})
}



</script>