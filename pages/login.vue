<template>
<v-btn>
  Button
</v-btn>
</template>

<script setup lang="ts">
import { supabase } from '../utils/supabase'

supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `http://localhost:3000/profil`,
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
})


</script>