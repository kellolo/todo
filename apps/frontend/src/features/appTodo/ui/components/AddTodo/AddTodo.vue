<template>
  <div class="add-todo row-center h-[50px]">
    <InputText
      id="add-todo"
      v-model="valueModel"
      class="mr-[20px] h-full w-full"
      type="text"
      placeholder="What should I do..."
    />
    <Button label="+" class="btn btn--prime size-[50px]" :disabled="!valueModel" @click="emit('add-todo')" />
  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue'

const emit = defineEmits<{
  (e: 'add-todo'): void
}>()

const valueModel = defineModel<string>()
</script>

<style lang="scss" scoped>
:deep(.p-button-label) {
  font-size: 40px;
  font-weight: bold;
}
</style>
