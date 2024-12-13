<template>
  <Form class="form-auth">
    <div class="form-auth__content">
      <InputText v-model="formData.login" placeholder="Login" class="form-auth__content--item" :class="{}" />
      <Password v-model="formData.password" placeholder="Password" class="form-auth__content--item" />
    </div>

    <Button label="Sign in" class="form-auth__content--item" @click="loginHandler" />
    <ui-button label="TESSSST" />
  </Form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { uiButton } from '@repo/ui'
import type { FormAuthProps } from './types'
import type { AuthData } from '@/types'
const props = defineProps<FormAuthProps>()
const emit = defineEmits(['login'])
const formData = reactive<AuthData>({
  login: '',
  password: '',
})

const loginHandler = () => {
  emit('login', formData)
}

const resolver = ({ values }: { values: AuthData }) => {
  const errors = {} as Record<keyof AuthData, any>

  if (!values.login) {
    errors.login = [{ message: 'Login is required.' }]
  }

  return {
    errors,
  }
}
</script>

<style scoped lang="scss">
.form-auth {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    &--item {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>
