<template>
  <div
    class="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-dim-100 to-dim-800 text-black"
  >
    <div class="w-full max-w-4xl p-8 bg-white shadow-2xl rounded-2xl flex">
      <div class="w-1/2 flex justify-center items-center">
        <img
          src="/light.png"
          alt="Logo"
          width="300"
          height="300"
          class="rounded-full shadow-lg"
        />
      </div>
      <div class="w-1/2 p-8 flex flex-col justify-center">
        <div class="text-center mb-6">
          <h3 class="text-3xl font-bold text-gray-800">SIMRS TELAGA BUNDA</h3>
        </div>
        <hr class="my-4 border-gray-200" />
        <h3 class="text-lg font-medium text-gray-700 text-center mb-4">
          Sign in
        </h3>
        <form
          @submit.prevent="handleSubmit"
          autocomplete="off"
          class="space-y-6"
        >
          <div class="relative">
            <label for="username" class="sr-only"
              >Email address / Username</label
            >
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Email address / Username"
              v-model="username"
              class="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div class="relative">
            <label for="password" class="sr-only">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              v-model="password"
              class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div class="flex justify-between items-center">
            <a href="#" class="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <div>
            <button
              type="submit"
              class="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </div>
          <div v-if="message" class="mt-2 text-green-500 text-center">
            {{ message }}
          </div>
        </form>
        <div v-if="user" class="mt-4 text-center">
          <p><strong>NIK:</strong> {{ user.nik }}</p>
          <p><strong>Name:</strong> {{ user.nama }}</p>
          <p><strong>Position:</strong> {{ user.jbtn }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "~/composables/useAuth"
import Cookies from "universal-cookie"

definePageMeta({
  layout: "login",
})

const username = ref("")
const password = ref("")
const message = ref("")
const router = useRouter()
const { login, isAuthenticated, user } = useAuth()

const handleSubmit = async () => {
  await login(username.value, password.value)
  if (isAuthenticated.value) {
    message.value = "Login successful!"
    // Uncomment the line below if you want to redirect after successful login.
    router.push("/")
  } else {
    message.value = "Invalid credentials. Please try again."
  }
}
</script>
