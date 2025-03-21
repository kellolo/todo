<template>
  <div class="list-todo col-center p-[10px] rounded-sm bg-blue-500">
    <ItemTodo
      v-for="(item, index) of $props.items"
      :key="item.id || index"
      :item="item"
      class="mb-[10px]"
      @change="emit('change-item', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'
import type { ListTodoProps } from './types'

import { ItemTodo } from './components'
const emit = defineEmits<{
  (e: 'change-item', item: { id: string; value: string }): void
}>()
const props = defineProps<ListTodoProps>()
</script>

<style lang="scss" scoped></style>
