<template>
  <Form
    class="form-auth col-center height-full"
    :validate-on-value-update="false"
    :validate-on-blur="true"
    :resolver="resolver"
  >
    <div class="form-auth__content col-center">
      <FormField v-slot="$field" name="email" class="col-center mb-[24px]">
        <InputText id="login" v-model="formData.login" type="text" placeholder="Email" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
          $field.error?.message
        }}</Message>
      </FormField>

      <FormField v-slot="$field" name="password" class="col-center mb-[24px]">
        <Password id="password" v-model="formData.password" placeholder="Password" :feedback="false" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
          $field.error?.message
        }}</Message>
      </FormField>
    </div>

    <Button label="Sign in" class="btn btn--prime" type="submit" @click="loginHandler" />
  </Form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { uiButton } from '@repo/ui'
import type { FormAuthProps } from './types.js'
import { type AuthData } from 'frontend/src/shared'
import { resolver } from './helpers'
const props = defineProps<FormAuthProps>()

const emit = defineEmits<{
  (e: 'login', formData: AuthData): void
}>()

const formData = reactive<AuthData>({
  login: '',
  password: '',
})

const loginHandler = () => {
  emit('login', formData)
}

// const resolver = ({ values }: { values: AuthData }) => {
//   const errors = {} as Record<keyof AuthData, any>

//   if (!values.login) {
//     errors.login = [{ message: 'Login is required.' }]
//   }

//   return {
//     errors,
//   }
// }
</script>

<style scoped lang="scss">
.form-auth {
  width: 300px;
}
</style>
