import { Feed } from 'feed'
import { queryCollection } from '@nuxt/content/server'
import { withoutTrailingSlash } from 'ufo'
import { locales, defaultLocale } from '../../i18n-constants'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const url = withoutTrailingSlash(runtimeConfig.public.url as string)

  const now = new Date()

  const feed = new Feed({
    title: 'No Name Studio',
    description: 'The homepage of No Name Studio',
    id: url,
    link: url,
    language: defaultLocale,
    favicon: `${url}/favicon.ico`,
    copyright: `All rights reserved ${now.getFullYear()}, No Name Studio`,
  })

  // Query pages from all locale collections
  for (const locale of locales) {
    const collectionName = `docs_${locale}` as 'docs_en' | 'docs_vi'
    const docs = await queryCollection(event, collectionName)
      .where('draft', '<>', true)
      .all()

    for (const post of docs) {
      if (!post.publishedAt) continue

      const path = locale === defaultLocale
        ? post.path
        : `/${locale}${post.path}`

      feed.addItem({
        title: post.title ?? '-',
        id: withoutTrailingSlash(url + path),
        link: withoutTrailingSlash(url + path),
        description: post.description,
        date: new Date(post.publishedAt),
        category: post.category ? [{ name: post.category }] : undefined,
      })
    }
  }

  event.node.res.setHeader('content-type', 'text/xml')
  return feed.rss2()
})
