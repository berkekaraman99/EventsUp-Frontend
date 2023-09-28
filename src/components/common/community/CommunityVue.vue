<template>
  <div class="container community shadow-sm mb-5 rounded-3">
    <RouterLink
      :to="{
        name: 'community-details',
        params: { id: props.community.id, name: props.community.title }
      }"
      class="text-decoration-none text-dark"
    >
      <div class="row">
        <div class="col-sm-12 col-md-4 d-sm-flex align-items-sm-center justify-content-sm-center">
          <img
            :src="community.coverImage"
            alt="community cover"
            class="p-2 img-fluid rounded-4 my-3"
            v-if="community.coverImage"
          />
          <img
            class="p-2 my-3 rounded-4 img-fluid"
            src="https://picsum.photos/400"
            alt="event-image"
            v-else
          />
        </div>

        <div class="col-sm-12 col-md-8 col-lg-6 d-flex justify-content-between">
          <div class="d-flex flex-column justify-content-between rounded-4 m-2 p-2">
            <div>
              <h3 class="fw-bold">{{ community.title }}</h3>
              <p class="description">
                {{
                  WordCount(community.description) < 30
                    ? community.description
                    : getDescriptionCharacters(community.description).concat('...')
                }}
              </p>
            </div>
            <div>
              <div>
                Üye Sayısı:
                <span class="fw-bold">{{ community.participiantsCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { ICommunityPreview } from '@/models/community_preview_model'
import type { PropType } from 'vue'

const props = defineProps({
  community: {
    type: Object as PropType<ICommunityPreview>,
    required: true
  }
})

const WordCount = (str: string) => {
  return str.split(' ').length
}
const getDescriptionCharacters = (str: string) => {
  let mainStr = ''
  for (let i = 0; i < 200; i++) {
    mainStr += str[i]
  }
  return mainStr
}
</script>

<style scoped lang="scss">
.community {
  border-radius: 0.5rem;
  max-width: 880px;
  max-height: 300px;
  background-color: white;

  @media (max-width: 768px) {
    max-height: fit-content;
  }

  &:hover {
    background-color: whitesmoke;
  }
}
.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.description {
  letter-spacing: 1px;
}
</style>
