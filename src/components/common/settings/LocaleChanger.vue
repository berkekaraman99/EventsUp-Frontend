<template>
  <div class="locale-changer">
    <!-- <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">
        {{ lang.text }}
      </option>
    </select> -->
    <FormKit
      type="select"
      :label="t('settings.language')"
      :options="[
        { label: langs[0].text, value: langs[0].code },
        { label: langs[1].text, value: langs[1].code },
        { label: langs[2].text, value: langs[2].code },
        { label: langs[3].text, value: langs[3].code }
      ]"
      validation="required"
      v-model="$i18n.locale"
      :classes="{
        inner: 'rounded-2',
        input: 'bg-white rounded-2'
      }"
      @change="saveLanguageLocale($i18n.locale)"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const langs = [
  { code: 'tr', text: 'Türkçe' },
  { code: 'en', text: 'English' },
  { code: 'de', text: 'Deutsch' },
  { code: 'ja', text: '日本' }
]

const saveLanguageLocale = (code: string) => {
  localStorage.setItem('locale', code)
  localStorage.setItem('fallbacklocale', code)
  console.log('Locale Setted')
}
</script>

<style scoped></style>
