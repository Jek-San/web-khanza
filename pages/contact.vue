<template>
  <div>
    <div>
      <button @click="openModal">Open Modal</button>
      <Modal
        v-if="isModalVisible"
        :show="isModalVisible"
        :title="modalTitle"
        :content="modalContent"
        @close="closeModal"
      >
        <p>Additional content passed via slot.</p>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Modal from "../components/Modal.vue"

const isModalVisible = ref(false)
const modalTitle = ref("Modal Title")
const modalContent = ref("Modal Content")

const openModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}
</script>
