<template>
  <div class="info">
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useToasterStore } from './store'

const toast = useToast()
const toasterStore = useToasterStore()

const addToast = () => {
  const { alert } = toasterStore
  if (alert) {
    toast.add(alert)
  }
}

watch(() => toasterStore.timeStamp, addToast)
</script>

<style lang="scss" scoped></style>
