<template>
  <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Use server-side rendering (SSR) to ensure consistent experience
useHead({
  title: 'Fjor Nutrition - Personalized Nutrition Plan',
  meta: [
    { name: 'description', content: 'Get your personalized nutrition plan with Fjor Nutrition.' }
  ]
});
</script>
