<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 :class="['text-2xl font-bold mb-8 text-center', props.title.classes]">{{ props.title.text }}</h1>
    
    <div class="space-y-4">
      <div v-for="option in props.options" :key="option.value" 
           class="relative p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-300"
           :class="{ 'border-emerald-500 bg-emerald-50': selectedOptions.includes(option.value) }"
           @click="toggleOption(option.value)">
        <div class="flex items-center">
          <div class="w-6 h-6 border rounded-md mr-3 flex items-center justify-center"
               :class="{ 'bg-emerald-500 border-emerald-500': selectedOptions.includes(option.value) }">
            <svg v-if="selectedOptions.includes(option.value)" 
                 xmlns="http://www.w3.org/2000/svg" 
                 class="h-4 w-4 text-white" 
                 viewBox="0 0 20 20" 
                 fill="currentColor">
              <path fill-rule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clip-rule="evenodd" />
            </svg>
          </div>
          <span class="text-lg">{{ option.title }}</span>
        </div>
      </div>
    </div>
    
    <div class="text-center mt-8">
      <BaseButton 
        @click="navigateToNextScreen" 
        :disabled="selectedOptions.length === 0">
        Continue
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from '#app';
import { useFunnelStore } from '../stores/funnel';
import BaseButton from './BaseButton.vue';

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

const selectedOptions = ref<string[]>([]);

const toggleOption = (value: string) => {
  const index = selectedOptions.value.indexOf(value);
  if (index === -1) {
    selectedOptions.value.push(value);
  } else {
    selectedOptions.value.splice(index, 1);
  }
  
  // Store the user's answer
  funnelStore.storeAnswer(currentScreenId.value, selectedOptions.value);
};

const navigateToNextScreen = () => {
  if (selectedOptions.value.length === 0) return;
  
  const nextScreen = funnelStore.getNextScreen(currentScreenId.value);
  if (nextScreen) {
    router.push(`/s/${nextScreen.id}`);
  } else {
    // If there's no next screen, we've reached the end of the funnel
    router.push('/thank-you');
  }
};
</script> 