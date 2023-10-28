<template>
  <div class="vh-100">
    <div>
      <slot name="header"></slot>
      <slot name="sidebar"></slot>
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
