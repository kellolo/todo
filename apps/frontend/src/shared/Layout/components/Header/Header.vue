<template>
  <header class="app-header">
    <div class="app-header__logo">
      <h1>My ToDo</h1>
    </div>
    <div class="app-header__user">
      <Button type="button" label="Login" severity="info" />
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
