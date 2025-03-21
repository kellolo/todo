<template>
  <div class="auth col-center size-full">
    <FormAuth @login="loginHandler" />
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'
import { useNavigation } from 'frontend/src/shared'
import { type AuthData, login } from 'frontend/src/features/auth'

import { FormAuth } from './components'

const { goHome } = useNavigation()

const loginHandler = async (data: AuthData) => {
  // await login(data)
  goHome()
}
</script>

<style lang="scss" scoped>
.auth {
}
</style>
