<template>
<v-btn>
  Button
</v-btn>
</template>

<script setup lang="ts">
import { supabase } from '../utils/supabase'
const config = useRuntimeConfig()

supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: config.public.environnement === 'local' ?  `http://localhost:3000/profil` : `https://main--poc-astro-connect.netlify.app/profil`,
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
})


</script>