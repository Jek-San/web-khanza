<template>
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
      <i class="fa fa-search" aria-hidden="true"></i>
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

    <!-- Table Container -->
    <div class="table-container">
      <!-- Table -->
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-dim-300 sticky-header">
          <tr>
            <th
              v-if="paginatedData.length > 1"
              class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Detail
            </th>
            <th
              v-for="(column, index) in tableColumns"
              :key="index"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in paginatedData" :key="item['No Rawat']">
            <td>
              <!-- Pass data to Patient component -->
              <Patient msg="Patient" :dataPatient="item" />
            </td>
            <td
              v-for="(column, index) in tableColumns"
              :key="index"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            >
              {{ item[column] }}
            </td>
          </tr>
          <!-- Loading Indicator -->
          <tr v-if="loading">
            <td
              :colspan="tableColumns.length"
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
import Patient from "./Patient.vue"

// Reactive variables
const fromDate = ref(new Date().toISOString().slice(0, 10))
const toDate = ref(new Date().toISOString().slice(0, 10))
const searchQuery = ref("")
const data = ref([])
const currentPage = ref(1)
const perPage = 10 // Adjust as needed
const loading = ref(false) // Loading state
const tableColumns = ref([]) // To store table column headers dynamically

// Fetch data from API
const fetchData = async () => {
  loading.value = true // Start loading
  try {
    const response = await axios.get("http://localhost:8000/api/ranap", {
      params: {
        fromDate: fromDate.value,
        toDate: toDate.value,
        search: searchQuery.value,
      },
    })
    data.value = response.data
    console.log("API Response:", response.data)
    // Dynamically extract table columns from the first item in data
    if (data.value.length > 0) {
      tableColumns.value = Object.keys(data.value[0])
    }
  } catch (error) {
    console.error("Error fetching data:", error)
  } finally {
    loading.value = false // End loading
  }
}

// Computed properties
const filteredData = computed(() => {
  // Filter based on searchQuery and date range
  return data.value.filter((item) => {
    const matchesDateRange =
      (!fromDate.value ||
        new Date(item["Tgl Masuk"]) >= new Date(fromDate.value)) &&
      (!toDate.value || new Date(item["Tgl Masuk"]) <= new Date(toDate.value))
    const matchesSearchQuery =
      !searchQuery.value ||
      item["Nama Pasien"]
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    return matchesDateRange && matchesSearchQuery
  })
})

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage
  const endIndex = startIndex + perPage
  return filteredData.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / perPage)
})

// Pagination functions
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
.table-container {
  overflow-x: auto;
  max-height: 500px; /* Adjust as needed */
}

/* Make header sticky */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1; /* Ensure it stays above the table content */
}
</style>
