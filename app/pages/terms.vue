<template>
  <div>
    Navigating...
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n()

useHead({
  title: 'Terms of Service',
})

onMounted(() => {
  navigateTo(`/${locale.value}/docs/terms`, { redirectCode: 301, replace: true })
})
</script>
