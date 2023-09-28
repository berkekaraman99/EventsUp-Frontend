<template>
  <span data-text="Thanks for hovering! I'm a tooltip" class="ctooltip ctooltip-left"
    >Hover over me!</span
  >
</template>

<script setup lang="ts">
import { useInterestStore } from '@/stores/interest'

const interestStore = useInterestStore()
interestStore.getAllInterest()
</script>

<style scoped lang="scss"></style>
