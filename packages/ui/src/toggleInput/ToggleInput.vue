<template>
  <div class="toggle-input" @dblclick="editMode = true">
    <button v-if="!editMode" class="toggle-input__btn">
      {{ valueModel }}
    </button>
    <template v-else>
      <div class="toggle-input__edit f-row">
        <input v-model="valueModel" type="text" class="toggle-input__edit--input" />
        <div class="toggle-input__edit--controls f-row">
          <button class="toggle-input__edit--controls--btn" @click="handleChange">&#x2713;</button>
          <button class="toggle-input__edit--controls--btn" @click="editMode = false">&#x1F5D9;</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ToggleInputProps } from './types'
import { defineModel, ref } from 'vue'
const props = defineProps<ToggleInputProps>()
const emit = defineEmits<{
  (e: 'change'): void
}>()

const valueModel = defineModel<string>()
const editMode = ref<boolean>(false)

const handleChange = () => {
  emit('change')
  editMode.value = false
}
</script>

<style lang="scss" scoped>
.f-row {
  display: flex;
  align-items: center;
}
.toggle-input {
  display: block;
  width: auto;
  height: auto;
  &__checkbox {
    display: none;
  }
  &__edit {
    &--controls {
      margin-left: 10px;
      &--btn {
        color: #ffffff;
        margin-right: 5px;
        cursor: pointer;
        &:hover {
          color: #bbfbfd;
        }
      }
    }
    &--input {
      background: #ffffff;
      color: #000000;
      padding: 0 5px;
      border-radius: 10px;
    }
  }
}
</style>
