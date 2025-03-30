// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  ssr: true,

  typescript: {
    strict: true
  },

  compatibilityDate: '2025-03-30'
})