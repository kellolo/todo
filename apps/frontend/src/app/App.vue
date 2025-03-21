<template>
  <MainLayout>
    <template #content>
      <RouterView />
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { MainLayout } from 'frontend/src/shared'
</script>

<style scoped lang="scss"></style>
