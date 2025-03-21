<template>
  <div class="item-todo row-between w-full rounded-sm p-[5px] bg-blue-300">
    <div class="item-todo__content w-full flex items-center">
      <Checkbox binary class="mr-[10px]" />

      <ToggleInput v-model="itemValue" @change="handleChangeItem" />
    </div>
    <div class="item-todo__controls"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ToggleInput } from '@repo/ui'
import type { ItemTodoProps } from '../../types'
const props = defineProps<ItemTodoProps>()

const emit = defineEmits<{
  (e: 'change', item: { id: string; value: string }): void
}>()

const itemValue = ref<string>(props.item.value)

const handleChangeItem = () => {
  const { id } = props.item

  if (id) {
    emit('change', { id, value: itemValue.value })
  }
}
</script>

<style lang="scss" scoped></style>
