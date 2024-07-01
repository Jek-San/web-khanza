<template>
  <div>{{ msg }}</div>
  <div>
    <button @click="openModal">Open Modal</button>

    <!-- Modal Component -->
    <HeadlessModal
      :show="isModalVisible"
      :title="modalTitle"
      :content="modalContent"
      @close="closeModal"
    >
      <!-- You can also pass additional content using slot -->
      <template v-slot>
        <div class="flex gap-4 flex-wrap justify-center">
          <div
            class="flex flex-col items-center shadow-lg hover:bg-dim-100 hover:cursor-pointer justify-center bg-gray-200 rounded-lg p-4 min-w-[200px] min-h-[200px]"
          >
            <p>sfsafsafsdfsdafsdfsdf</p>
          </div>
          <div
            class="flex flex-col items-center justify-center bg-gray-200 shadow-lg hover:bg-dim-100 hover:cursor-pointer rounded-lg p-4 min-w-[200px] min-h-[200px]"
          >
            <p>sfsafsafsdfsdafsdfsdf</p>
          </div>
          <div
            class="flex flex-col items-center justify-center bg-gray-200 shadow-lg hover:bg-dim-100 hover:cursor-pointer rounded-lg p-4 min-w-[200px] min-h-[200px]"
          >
            <p>sfsafsafsdfsdafsdfsdf</p>
          </div>
          <div
            class="flex flex-col items-center justify-center bg-gray-200 shadow-lg hover:bg-dim-100 hover:cursor-pointer rounded-lg p-4 min-w-[200px] min-h-[200px]"
          >
            <p>sfsafsafsdfsdafsdfsdf</p>
          </div>
          <div
            class="flex flex-col items-center justify-center bg-gray-200 shadow-lg hover:bg-dim-100 hover:cursor-pointer rounded-lg p-4 min-w-[200px] min-h-[200px]"
          >
            <p>sfsafsafsdfsdafsdfsdf</p>
          </div>
          <div
            class="flex flex-col items-center justify-center bg-gray-200 shadow-lg hover:bg-dim-100 hover:cursor-pointer rounded-lg p-4 min-w-[200px] min-h-[200px]"
          >
            <p>sfsafsafsdfsdafsdfsdf</p>
          </div>
          <!-- Add more ChildComponent instances for additional cards -->
        </div>
      </template>
    </HeadlessModal>
  </div>
</template>

<script setup>
import { defineProps } from "vue"

import { onBeforeMount } from "vue"
import HeadlessModal from "~/components/HeadlessModal.vue"
const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
  dataPatient: {
    type: Object,
    required: true,
  },
})

const isModalVisible = ref(false)
const modalTitle = computed(
  () => `${props.dataPatient["Nama Pasien"]} - ${props.dataPatient["No Rawat"]}`
)
const modalContent = " "
const openModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}
onBeforeMount(() => {
  console.log(props.dataPatient)
})
</script>
