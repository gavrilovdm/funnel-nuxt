<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 :class="['text-2xl font-bold mb-8 text-center', props.title.classes]">{{ props.title.text }}</h1>
    
    <div class="space-y-4">
      <div v-for="option in props.options" :key="option.value" 
           class="relative p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-300"
           :class="{ 'border-emerald-500 bg-emerald-50': selectedOption === option.value }"
           @click="selectOption(option.value)">
        <div class="flex items-center">
          <div class="w-6 h-6 border rounded-full mr-3 flex items-center justify-center"
               :class="{ 'border-emerald-500': selectedOption === option.value }">
            <div v-if="selectedOption === option.value"
                 class="w-4 h-4 rounded-full bg-emerald-500">
            </div>
          </div>
          <span class="text-lg">{{ option.title }}</span>
        </div>
      </div>
    </div>
    
    <div class="text-center mt-8">
      <button 
        @click="navigateToNextScreen" 
        class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
        :disabled="!selectedOption"
        :class="{ 'opacity-50 cursor-not-allowed': !selectedOption }">
        Continue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from '#app';
import { useFunnelStore } from '../stores/funnel';

const props = defineProps({
  title: Object,
  options: Array
});

const router = useRouter();
const route = useRoute();
const funnelStore = useFunnelStore();

const currentScreenId = computed(() => {
  return route.params.screen as string;
});

const selectedOption = ref<string | null>(null);

const selectOption = (value: string) => {
  selectedOption.value = value;
  
  // Store the user's answer
  funnelStore.storeAnswer(currentScreenId.value, value);
};

const navigateToNextScreen = () => {
  if (!selectedOption.value) return;
  
  const nextScreen = funnelStore.getNextScreen(currentScreenId.value);
  if (nextScreen) {
    router.push(`/s/${nextScreen.id}`);
  } else {
    // If there's no next screen, we've reached the end of the funnel
    router.push('/thank-you');
  }
};
</script> 