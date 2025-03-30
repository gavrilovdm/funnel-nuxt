<template>
  <div>
    <!-- This page will initialize the funnel and load the first screen -->
    <div v-if="loading" class="flex items-center justify-center h-screen">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
    <template v-else-if="landingScreen">
      <LandingV1 :title="landingScreen.props.title" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFunnelStore } from '../stores/funnel';

const funnelStore = useFunnelStore();
const loading = ref(true);
const landingScreen = ref<any>(null);

onMounted(async () => {
  // Check if the user already has a configuration assigned
  const hasConfig = funnelStore.loadConfig();
  
  if (!hasConfig) {
    // If not, assign a new configuration
    funnelStore.assignConfig();
  }
  
  // Load the user's previous answers if any
  funnelStore.loadAnswers();
  
  // Get the landing screen data
  landingScreen.value = funnelStore.getScreen('index');
  loading.value = false;
});
</script> 