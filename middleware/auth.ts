import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"
import { useAuth } from "~/composables/useAuth"

export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useAuth()
  if (!isAuthenticated.user.value && to.path !== "/login") {
    // Redirect to login page
    return navigateTo("/login")
  }
})
