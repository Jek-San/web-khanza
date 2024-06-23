<template>
  <div :class="{ dark: darkMode }">
    <div class="min-h-full p-4">
      <!-- Date inputs and search bar -->
      <div class="mb-4">
        <label for="fromDate" class="block text-sm font-medium text-gray-700"
          >From Date</label
        >
        <input
          v-model="fromDate"
          type="date"
          id="fromDate"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div class="mb-4">
        <label for="toDate" class="block text-sm font-medium text-gray-700"
          >To Date</label
        >
        <input
          v-model="toDate"
          type="date"
          id="toDate"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div class="mb-4">
        <label for="search" class="block text-sm font-medium text-gray-700"
          >Search</label
        >
        <input
          v-model="searchQuery"
          type="text"
          id="search"
          placeholder="Search..."
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <!-- Fetch data button -->
      <button
        @click="fetchData"
        :disabled="loading"
        class="mb-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
      >
        <span
          v-if="loading"
          class="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white"
        ></span>
        Fetch Data
      </button>

      <!-- Pagination controls -->
      <div class="mb-4 flex items-center justify-between">
        <div>
          <span class="text-sm text-gray-700"
            >Page {{ currentPage }} of {{ totalPages }}</span
          >
        </div>
        <div class="flex space-x-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="px-3 py-1 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Table -->
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              No Reg
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              No Rawat
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tgl Registrasi
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nama Pasien
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in paginatedData" :key="item.no_rawat">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ item.no_reg }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ item.no_rawat }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ item.tgl_registrasi }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ item.nm_pasien }}
            </td>
          </tr>
          <!-- Loading Indicator -->
          <tr v-if="loading">
            <td
              colspan="4"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
            >
              <span
                class="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-gray-500 rounded-full"
              ></span>
              Loading...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import axios from "axios"

const fromDate = ref(new Date().toISOString().slice(0, 10))
const toDate = ref(new Date().toISOString().slice(0, 10))
const searchQuery = ref("")
const data = ref([])
const currentPage = ref(1)
const perPage = 10 // Adjust as needed
const loading = ref(false) // Loading state

const fetchData = async () => {
  loading.value = true // Start loading
  try {
    const response = await axios.get("http://localhost:8000/api/registrasi", {
      params: {
        fromDate: fromDate.value,
        toDate: toDate.value,
      },
    })
    data.value = response.data
  } catch (error) {
    console.error("Error fetching data:", error)
  } finally {
    loading.value = false // End loading
  }
}

const filteredData = computed(() => {
  // Filter based on searchQuery and date range
  let filtered = data.value.filter((item) => {
    const matchesDateRange =
      (!fromDate.value ||
        new Date(item.tgl_registrasi) >= new Date(fromDate.value)) &&
      (!toDate.value || new Date(item.tgl_registrasi) <= new Date(toDate.value))
    const matchesSearchQuery =
      !searchQuery.value ||
      item.nm_pasien.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesDateRange && matchesSearchQuery
  })
  return filtered
})

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage
  const endIndex = startIndex + perPage
  return filteredData.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / perPage)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
