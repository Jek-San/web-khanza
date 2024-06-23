// ~/composables/useAuth.ts

import { ref } from "vue"
import axios from "axios"
import Cookies from "universal-cookie"

interface User {
  nik: string
  nama: string
  jbtn: string
}

export function useAuth() {
  const config = useRuntimeConfig()

  const apiUrl = config.public.apiUrl // Ensure apiUrl is correctly accessed from runtime config
  const isAuthenticated = ref(true)
  const user = ref<User | null>(null)
  const cookies = new Cookies()

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        username,
        password,
      })
      if (response.data) {
        user.value = response.data
        isAuthenticated.value = true
        cookies.set("user_session", JSON.stringify(response.data), {
          path: "/",
        }) // Store user data in a cookie
        console.log(cookies.get("user_session"))
      } else {
        isAuthenticated.value = false
      }
    } catch (error) {
      console.error("Login error:", error)
      isAuthenticated.value = false
    }
  }

  const checkAuth = (): void => {
    const session = cookies.get("user_session")
    if (session) {
      try {
        user.value = JSON.parse(session)
        isAuthenticated.value = true
      } catch (error) {
        console.error("Error parsing user session:", error)
        logout() // Log out user if session data is corrupted
      }
    } else {
      logout() // Log out user if no session data found
    }
  }

  const logout = (): void => {
    cookies.remove("user_session", { path: "/" })
    user.value = null
    isAuthenticated.value = false
  }

  return {
    isAuthenticated,
    user,
    login,
    checkAuth,
    logout,
  }
}
