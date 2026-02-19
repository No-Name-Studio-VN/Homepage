<script setup lang="ts">
import { kebabCase } from 'scule'
import type { Collections, DocsEnCollectionItem, DocsViCollectionItem, PageCollections } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

const route = useRoute()
const { locale } = useI18n()

const collectionName = computed(() => `docs_${locale.value}`)

const { data: page } = await useAsyncData(kebabCase(route.path), async () => {
  // Build collection name based on current locale
  const content = await queryCollection((collectionName.value) as keyof Collections).path(route.path).first()

  // Optional: fallback to default locale if content is missing
  if (!content && locale.value !== 'en') {
    return await queryCollection('docs_en').path(route.path).first()
  }

  return content as DocsEnCollectionItem | DocsViCollectionItem
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${kebabCase(route.path)}-surround`, () => {
  return queryCollectionItemSurroundings(collectionName.value as keyof PageCollections, route.path, {
    fields: ['description'],
  })
})

const { data: navigation } = await useAsyncData(`${kebabCase(route.path)}-navigation`, () => {
  return queryCollectionNavigation(collectionName.value as keyof PageCollections)
})

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

const headline = ref(findPageHeadline(navigation.value, page.value?.path))
const breadcrumbs = computed(() => findPageBreadcrumbs(navigation.value, page.value?.path || ''))

useSeo({
  title,
  description,
  type: 'article',
  modifiedAt: (page.value as unknown as Record<string, unknown>).modifiedAt as string | undefined,
  breadcrumbs,
})

watch(() => navigation.value, () => {
  headline.value = findPageHeadline(navigation.value, page.value?.path) || headline.value
})

defineOgImageComponent('Docs', {
  headline: headline.value,
})

if (page.value?.ogImage) {
  defineOgImage(page.value?.ogImage) // <-- Nuxt OG Image
}
</script>

<template>
  <div>
    <DocumentPage
      v-if="page"
      :page="page"
      :surround="surround"
      not-found-message="Privacy Policy not found"
    />
  </div>
</template>
