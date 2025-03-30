<template>
  <div>
    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center h-screen">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
    
    <!-- Show the appropriate component based on the screen type -->
    <template v-else-if="currentScreen">
      <component 
        :is="components[currentScreen.component]" 
        v-bind="currentScreen.props" 
      />
    </template>
    
    <!-- Error state if screen not found -->
    <div v-else class="container mx-auto p-8 text-center">
      <h1 class="text-2xl text-red-500 font-bold">Screen not found</h1>
      <button @click="router.push('/')" class="mt-4 bg-emerald-500 text-white px-4 py-2 rounded">
        Go to Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from '#app';
import { useFunnelStore } from '../../stores/funnel';
import LandingV1 from '../../components/LandingV1.vue';
import SingleChoiceQuestion from '../../components/SingleChoiceQuestion.vue';
import MultiChoiceQuestion from '../../components/MultiChoiceQuestion.vue';

// Register components for dynamic usage
const components = {
  LandingV1,
  SingleChoiceQuestion,
  MultiChoiceQuestion
};

const route = useRoute();
const router = useRouter();
const funnelStore = useFunnelStore();

const screenId = computed(() => route.params.screen);
const loading = ref(true);
const currentScreen = ref(null);

onMounted(async () => {
  // Check if the user has a configuration assigned
  const hasConfig = funnelStore.loadConfig();
  
  if (!hasConfig) {
    // If not, redirect to home to assign a configuration
    router.push('/');
    return;
  }
  
  // Load the user's previous answers if any
  funnelStore.loadAnswers();
  
  // Get the current screen data
  const screen = funnelStore.getScreen(screenId.value);
  
  if (screen) {
    currentScreen.value = screen;
  } else {
    // Invalid screen ID, redirect to home
    router.push('/');
  }
  
  loading.value = false;
});

// Watch for route changes to update the screen
watch(() => route.params.screen, async (newScreenId) => {
  if (newScreenId) {
    loading.value = true;
    const screen = funnelStore.getScreen(newScreenId);
    
    if (screen) {
      currentScreen.value = screen;
    } else {
      // Invalid screen ID, redirect to home
      router.push('/');
    }
    
    loading.value = false;
  }
});
</script> 