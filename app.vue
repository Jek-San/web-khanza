<template>
  <div :class="{ dark: darkMode }">
    <div class="min-h-full">
      <div class="grid grid-cols-12 sm:pr-6 lg:max-w-7xl lg:pr-8">
        <!-- LEFT SIDEBAR -->
        <div
          class="bg-dim-100 md:sticky md:top-0 md:h-screen md:col-span-2 xl:col-span-1 md:block hidden"
        >
          <!-- Sidebar Content -->
          <div class="flex flex-col items-center">
            <!-- SVG Logo -->
            <img src="/light.png" alt="Logo" class="w-20 h-20 mb-4" />
            <!-- Navigation Menu -->
            <nav class="flex flex-col gap-4">
              <a href="#home" class="text-gray-700 dark:text-gray-300">Home</a>
              <a href="#about" class="text-gray-700 dark:text-gray-300"
                >About</a
              >
              <a href="#services" class="text-gray-700 dark:text-gray-300"
                >Services</a
              >
              <a href="#portfolio" class="text-gray-700 dark:text-gray-300"
                >Portfolio</a
              >
              <a href="#contact" class="text-gray-700 dark:text-gray-300"
                >Contact</a
              >
            </nav>
          </div>
        </div>

        <!-- TOPBAR (Mobile) -->
        <div class="bg-dim-300 md:hidden block min-w-full col-span-12">
          <!-- Topbar Content -->
          <div class="p-4 flex items-center justify-between">
            <!-- SVG Logo -->
            <img src="/light.png" alt="Logo" class="w-20 h-20" />
            <!-- Navigation Menu -->
            <nav class="flex gap-4">
              <a href="#home" class="text-gray-700 dark:text-gray-300">Home</a>
              <a href="#about" class="text-gray-700 dark:text-gray-300"
                >About</a
              >
              <a href="#services" class="text-gray-700 dark:text-gray-300"
                >Services</a
              >
              <a href="#portfolio" class="text-gray-700 dark:text-gray-300"
                >Portfolio</a
              >
              <a href="#contact" class="text-gray-700 dark:text-gray-300"
                >Contact</a
              >
            </nav>
          </div>
        </div>

        <!-- MAIN CONTENT -->
        <div class="col-span-12 md:col-span-10 xl:col-span-10">
          <!-- Main Content -->
          <div class="p-4">Main Content</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const darkMode = ref(false)
</script>
