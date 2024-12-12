<template>
  <Button :label="props.label" class="ui__button" />
</template>

<script setup lang="ts">
import type { uiButtonProps } from './types'
const props = defineProps<uiButtonProps>()
</script>

<style lang="scss" scoped></style>
