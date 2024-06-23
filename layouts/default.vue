<template>
  <div :class="{ dark: darkMode }">
    <div class="min-h-full">
      <div class="grid grid-cols-12 sm:pr-6 lg:max-w-7xl lg:pr-8">
        <!-- Sidebar (Visible on medium screens and up) -->
        <div
          v-if="isAuthenticated"
          class="bg-dim-100 md:sticky md:top-0 md:h-screen md:col-span-2 xl:col-span-1 md:block hidden"
        >
          <!-- Sidebar Content -->
          <div class="flex flex-col items-center">
            <!-- SVG Logo -->
            <img src="/light.png" alt="Logo" class="w-20 h-20 mb-4" />
            <!-- Navigation Menu -->
            <nav class="flex flex-col gap-4">
              <NuxtLink to="/" class="text-gray-700 dark:text-gray-300"
                >Home</NuxtLink
              >
              <NuxtLink to="/ranap" class="text-gray-700 dark:text-gray-300"
                >Ranap</NuxtLink
              >
              <NuxtLink to="/services" class="text-gray-700 dark:text-gray-300"
                >Services</NuxtLink
              >
              <NuxtLink to="/portfolio" class="text-gray-700 dark:text-gray-300"
                >Portfolio</NuxtLink
              >
              <NuxtLink to="/contact" class="text-gray-700 dark:text-gray-300"
                >Contact</NuxtLink
              >
            </nav>
          </div>
        </div>

        <!-- Mobile Navigation (Visible on small screens) -->
        <div
          v-if="isAuthenticated"
          class="bg-dim-300 md:hidden block min-w-full col-span-12"
        >
          <!-- Topbar Content -->
          <div class="p-4 flex items-center justify-between">
            <!-- SVG Logo -->
            <img src="/light.png" alt="Logo" class="w-20 h-20" />
            <!-- Navigation Menu -->
            <nav class="flex gap-4">
              <NuxtLink to="/" class="text-gray-700 dark:text-gray-300"
                >Home</NuxtLink
              >
              <NuxtLink to="/about" class="text-gray-700 dark:text-gray-300"
                >About</NuxtLink
              >
              <NuxtLink to="/services" class="text-gray-700 dark:text-gray-300"
                >Services</NuxtLink
              >
              <NuxtLink to="/portfolio" class="text-gray-700 dark:text-gray-300"
                >Portfolio</NuxtLink
              >
              <NuxtLink to="/contact" class="text-gray-700 dark:text-gray-300"
                >Contact</NuxtLink
              >
            </nav>
          </div>
        </div>

        <!-- Main Content Area (Full width on all screens) -->
        <div class="col-span-12 md:col-span-10 xl:col-span-11">
          <!-- Main Content -->
          <div class="p-4">
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useAuth } from "~/composables/useAuth"

const darkMode = ref(false)
const { isAuthenticated } = useAuth()
</script>
