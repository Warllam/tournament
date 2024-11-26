// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  },
  app: {
    head: {
      title: 'LAN Tournament System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Multi-game LAN tournament management system' }
      ]
    }
  },
  devtools: { enabled: true }
})