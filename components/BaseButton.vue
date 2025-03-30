<template>
  <button 
    @click="$emit('click')"
    class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
    :disabled="disabled"
    :class="{ 'opacity-50 cursor-not-allowed': disabled }">
    <slot>Continue</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>();

defineEmits<{
  click: []
}>();
</script> 