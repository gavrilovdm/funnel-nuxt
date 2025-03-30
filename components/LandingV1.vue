<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 :class="['text-4xl font-bold mb-8 text-center', props.title.classes]">{{ props.title.text }}</h1>
    <div class="text-center mt-8">
      <button @click="navigateToNextScreen" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
        Continue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#app';
import { useFunnelStore } from '../stores/funnel';

const props = defineProps({
  title: Object
});

const funnelStore = useFunnelStore();
const router = useRouter();

const navigateToNextScreen = () => {
  const nextScreen = funnelStore.getNextScreen('index');
  if (nextScreen) {
    router.push(`/s/${nextScreen.id}`);
  }
};
</script> 