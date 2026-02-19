import type { Collections, LandingEnCollectionItem, LandingViCollectionItem } from '@nuxt/content'

export function useLandingContent() {
  const { locale } = useI18n()
  const collectionName = computed(() => `landing_${locale.value}` as keyof Collections)

  return useAsyncData(
    'landing-content',
    async () => {
      const collection = (collectionName.value) as keyof Collections
      const result = await queryCollection(collection).first()

      // Fallback to English if content is missing
      if (!result && locale.value !== 'en') {
        const fallback = await queryCollection('landing_en').first()
        return fallback
      }

      return result as LandingEnCollectionItem | LandingViCollectionItem
    },
    { watch: [locale] },
  )
}
