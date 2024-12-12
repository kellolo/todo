<template>
  <div class="app__wrapper">
    <Header />
    <main>
      <slot name="content" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Header } from '@/components/layout'
</script>

<style lang="scss" scoped></style>
