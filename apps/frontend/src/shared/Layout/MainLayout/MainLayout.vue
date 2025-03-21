<template>
  <div class="app__wrapper min-h-screen flex flex-col">
    <Header class="shrink-0" />
    <main class="size-full flex-1 overflow-y-auto">
      <slot name="content" />
    </main>
    <Toaster />
    <!-- <Info /> -->
  </div>
</template>

<script setup lang="ts">
import { Header } from '../components'
</script>

<style lang="scss" scoped></style>
