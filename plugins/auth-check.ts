// ~/plugins/auth-check.js

import { defineNuxtPlugin } from "#app"
import { useAuth } from "~/composables/useAuth"

export default defineNuxtPlugin((nuxtApp) => {
  const { checkAuth, user } = useAuth()
  console.log(user.value?.nama)
  // Check authentication status when the application initializes
  checkAuth()
})
