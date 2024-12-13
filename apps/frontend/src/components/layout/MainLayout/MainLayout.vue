<template>
  <div class="app__wrapper">
    <Header />
    <main>
      <slot name="content" />
    </main>
    <Toaster />
    <!-- <Info /> -->
  </div>
</template>

<script setup lang="ts">
import { Header, Info } from '@/components/layout'
</script>

<style lang="scss" scoped></style>
