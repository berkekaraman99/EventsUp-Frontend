<template>
  <div class="d-flex align-items-center justify-content-center not-selectable">
    <div class="ps-3">
      <slot name="icon" />
    </div>

    <div class="px-3">
      <slot name="name" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.not-selectable {
  user-select: none;
}
</style>
