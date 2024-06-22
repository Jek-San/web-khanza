<template>
  <div class="min-h-full p-4">
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
    <button
      @click="fetchData"
      class="mb-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
    >
      Fetch Data
    </button>
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
          <!-- Add other columns as needed -->
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="item in filteredData" :key="item.no_rawat">
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
          <!-- Add other columns as needed -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import axios from "axios"

const fromDate = ref("")
const toDate = ref("")
const searchQuery = ref("")
const data = ref([])

// definePageMeta({
//   middleware: ["auth"],
//   // or middleware: 'auth'
// })

const fetchData = async () => {
  const response = await axios.get("http://localhost/api/get_registrasi.php", {
    params: {
      fromDate: fromDate.value,
      toDate: toDate.value,
    },
  })
  data.value = response.data
}

const filteredData = computed(() => {
  return data.value.filter((item) => {
    const matchesDateRange =
      (!fromDate.value ||
        new Date(item.tgl_registrasi) >= new Date(fromDate.value)) &&
      (!toDate.value || new Date(item.tgl_registrasi) <= new Date(toDate.value))
    const matchesSearchQuery =
      !searchQuery.value ||
      item.nm_pasien.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesDateRange && matchesSearchQuery
  })
})

console.log("API URL:", process.env.API_URL)
console.log("API KEY:", process.env.API_KEY)
</script>
