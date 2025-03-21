<template>
  <div class="controls-todo row-between">
    <Button label="Refresh" class="btn btn--prime" @click="emit('list-refresh')" />
    <Button label="Archive Done" class="btn btn--prime" @click="emit('list-archive')" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'list-refresh'): void
  (e: 'list-archive'): void
}>()
</script>

<style lang="scss" scoped></style>
