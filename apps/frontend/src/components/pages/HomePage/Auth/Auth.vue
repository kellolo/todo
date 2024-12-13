<template>
  <div class="auth">
    <FormAuth @login="loginHandler" />
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'
import type { AuthData } from '@/types'
import { login } from '@/store'

import { FormAuth } from './components'

const loginHandler = async (data: AuthData) => {
  await login(data)
}
</script>

<style lang="scss" scoped>
.auth {
}
</style>
