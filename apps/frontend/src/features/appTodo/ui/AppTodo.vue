<template>
  <div class="app-todo w-[600px] mx-auto my-[50px]">
    <div class="app-todo__header row-center mb-[40px]">
      <h1 class="text-[40px] font-bold uppercase">Todo list</h1>
    </div>
    <div class="app-todo__content col-center">
      <AddTodo class="mb-[20px] w-full" v-model:="newTodo" @add-todo="handleAddTodo" />
      <ListTodo class="mb-[20px] w-full" :items="items" @change-item="handleChangeItem" />
      <ControlsTodo class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { AddTodo, ListTodo, ControlsTodo } from './components'

import { useAppTodoStore } from '../model'
import { storeToRefs } from 'pinia'

const { items } = storeToRefs(useAppTodoStore())

const newTodo = ref<string>('')

const handleAddTodo = async () => {
  console.log(newTodo.value)
}

const handleChangeItem = async ({ id, value }: { id: string; value: string }) => {
  console.log(id, value)
}
</script>
