<template>
  <div>
    Navigating...
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n()

useHead({
  title: 'Privacy Policy',
})

onMounted(() => {
  navigateTo(`/${locale.value}/docs/privacy`, { redirectCode: 301, replace: true })
})
</script>
