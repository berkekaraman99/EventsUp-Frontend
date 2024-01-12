<template>
  <ul class="dropdown-menu dropdown-menu-end animate scaleOut">
    <li v-for="link in links" :key="link.id">
      <RouterLink :to="{ name: link.routeName }" class="dropdown-item">
        <i :class="link.icon"></i>
        <span class="mx-2">{{ t(link.content) }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()

    const links = ref<Array<any>>([
      {
        id: 1,
        routeName: 'createCommunity',
        content: 'header.createcommunity',
        icon: 'fa-solid fa-people-group'
      },
      {
        id: 2,
        routeName: 'createPost',
        content: 'header.createpost',
        icon: 'fa-solid fa-note-sticky'
      },
      {
        id: 3,
        routeName: 'createEvent',
        content: 'header.createevent',
        icon: 'fa-solid fa-calendar'
      }
    ])

    return {
      links,
      t
    }
  }
})
</script>

<style scoped></style>
