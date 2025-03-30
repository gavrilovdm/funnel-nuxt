<template>
  <div class="container mx-auto px-4 py-16 max-w-2xl text-center">
    <h1 class="text-4xl font-bold mb-6 text-emerald-500">Thank You!</h1>
    <p class="text-xl mb-8">Your responses have been recorded.</p>
    
    <div v-if="showAnswers" class="mt-8 text-left p-6 bg-gray-50 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Your answers:</h2>
      <div v-for="(answer, screenId) in userAnswers" :key="screenId" class="mb-4">
        <h3 class="font-bold text-lg">{{ getScreenTitle(screenId) }}</h3>
        <div v-if="Array.isArray(answer)">
          <ul class="list-disc pl-6">
            <li v-for="option in answer" :key="option">{{ getOptionTitle(screenId, option) }}</li>
          </ul>
        </div>
        <div v-else>
          {{ getOptionTitle(screenId, answer) }}
        </div>
      </div>
    </div>
    
    <button 
      @click="restartFunnel" 
      class="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
      Start Again
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from '#app';
import { useFunnelStore } from '../stores/funnel';

const router = useRouter();
const funnelStore = useFunnelStore();
const userAnswers = computed(() => funnelStore.userAnswers);
const showAnswers = ref(false);

onMounted(() => {
  // Check if the user has answers
  const hasAnswers = Object.keys(userAnswers.value).length > 0;
  
  if (!hasAnswers) {
    // If no answers, redirect to the beginning of the funnel
    router.push('/');
  } else {
    showAnswers.value = true;
  }
});

// Get the title of a screen based on its ID
const getScreenTitle = (screenId) => {
  const screen = funnelStore.getScreen(screenId);
  return screen?.props.title.text || screenId;
};

// Get the title of an option based on its value
const getOptionTitle = (screenId, optionValue) => {
  const screen = funnelStore.getScreen(screenId);
  if (!screen || !('options' in screen.props)) return optionValue;
  
  const option = screen.props.options.find(opt => opt.value === optionValue);
  return option?.title || optionValue;
};

// Reset the funnel and start again
const restartFunnel = () => {
  // Clear session storage
  if (process.client) {
    sessionStorage.removeItem('fjor_user_answers');
    sessionStorage.removeItem('fjor_config_type');
  }
  
  // Go back to the beginning
  router.push('/');
};
</script> 