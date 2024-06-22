import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"
import Cookies from "universal-cookie"
import { useAuth } from "~/composables/useAuth"

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()
  const user = new Cookies().get("user_session")
  console.log(user)
  // checkAuth()

  if (user === null && to.path !== "/login") {
    // If not authenticated and trying to access a protected route, redirect to login
    return navigateTo("/login")
  } else if (user !== null && to.path === "/login") {
    return navigateTo("/")
  }

  // If authenticated or accessing login, proceed
})
