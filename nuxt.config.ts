// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiUrl: "fsfsdf",
    },
  },
  plugins: [
    "~/plugins/auth-check.ts", // Register the auth-check plugin
  ],
  app: {
    head: {
      title: "SIMRS Telaga Bunda",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "SIMRS Telaga Bunda" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/light.png" }],
    },
  },
})
