<template>
  <div>
    <button @click="openModal">Open Modal</button>
    <HeadlessModal
      v-if="isModalVisible"
      :show="isModalVisible"
      :title="modalTitle"
      :content="modalContent"
      @close="closeModal"
    >
      <p>Additional content passed via slot.</p>
    </HeadlessModal>
  </div>
</template>

<script setup>
import { ref } from "vue"
import HeadlessModal from "~/components/HeadlessModal.vue"
// Modal data end//
const isModalVisible = ref(false)
const modalTitle = ref("Deactivate Account")
const modalContent = ref(
  "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."
)

const openModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}
//Modal data end
</script>
