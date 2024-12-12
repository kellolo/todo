<template>
  <div class="test-comp">
    <Button type="button" label="Clck Me" severity="info" @click="loginHandler" />
  </div>
</template>

<script setup lang="ts">
const loginHandler = async () => {
  const url = 'http://localhost:3000/auth/login'
  const payload = {
    email: 'example@example.com',
    password: 'securepassword',
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Указываем тип отправляемых данных
      },
      body: JSON.stringify(payload), // Преобразуем объект в строку JSON
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json() // Если сервер возвращает JSON
    console.log('Login successful:', data)
  } catch (error) {
    console.error('Error during login:', error)
  }
}
import { Button } from 'primevue'
</script>

<style></style>
