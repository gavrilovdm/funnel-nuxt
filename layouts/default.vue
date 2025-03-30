<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div v-if="funnelStore.currentScreen" class="mb-8">
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div
            class="bg-emerald-400 h-2.5 rounded-full transition-all duration-300"
            :style="{ width: `${funnelStore.progress}%` }"
          ></div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFunnelStore } from '~/stores/funnel'

const funnelStore = useFunnelStore()
</script> 