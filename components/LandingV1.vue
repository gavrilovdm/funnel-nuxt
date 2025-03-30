<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 :class="['text-4xl font-bold mb-8 text-center', props.title.classes]">{{ props.title.text }}</h1>
    <div class="text-center mt-8">
      <BaseButton @click="navigateToNextScreen">
        Continue
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#app';
import { useFunnelStore } from '../stores/funnel';
import BaseButton from './BaseButton.vue';

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