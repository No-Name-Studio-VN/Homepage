import type { DefinedCollection } from '@nuxt/content'
import { defineContentConfig, defineCollection } from '@nuxt/content'
import * as z from 'zod'
import { type Locale, locales } from './i18n-constants'
import { asSeoCollection } from '@nuxtjs/seo/content'

export const landingSchema = z.object({
  nav: z.object({
    items: z.array(z.object({
      label: z.string(),
      sectionId: z.string(),
    })),
  }),
  hero: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
  }),
  about: z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })),
    services: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })),
  }),
  showcase: z.object({
    label: z.string(),
    title: z.string(),
    subtitle: z.string(),
    projects: z.array(z.object({
      title: z.string(),
      description: z.string(),
      src: z.string(),
      tags: z.array(z.string()),
      category: z.string(),
    })),
  }),
  faq: z.object({
    label: z.string(),
    title: z.string(),
    subtitle: z.string(),
    categories: z.array(z.object({
      label: z.string(),
      items: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })),
    })),
  }),
  contact: z.object({
    label: z.string(),
    title: z.string(),
    subtitle: z.string(),
    email: z.string(),
    cta: z.string(),
    form: z.object({
      name: z.string(),
      email: z.string(),
      message: z.string(),
      submit: z.string(),
    }),
  }),
  footer: z.object({
    copyright: z.string(),
    tagline: z.string(),
    privacy: z.string(),
    terms: z.string(),
  }),
})

const collections: Record<string, DefinedCollection> = {}

locales.forEach((locale: Locale) => {
  collections[`docs_${locale}`] = defineCollection(asSeoCollection({
    type: 'page',
    source: {
      include: `${locale}/docs/**`,
      prefix: `/${locale}/docs`,
      exclude: [`${locale}/index.md`],
    },
    schema: z.object({
      // Basic metadata
      title: z.string(),
      description: z.string().optional(),

      // Author information
      author: z.string().optional(),

      // Date information
      publishedAt: z.string().optional(),
      updatedAt: z.string().optional(),

      // Reading time
      readingTime: z.string().optional(),

      // Categorization
      category: z.string().optional(),
      tags: z.array(z.string()).optional(),

      // SEO
      seo: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.array(z.string()).optional(),
        ogImage: z.string().optional(),
      }).optional(),

      // Content status
      draft: z.boolean().optional().default(false),
      featured: z.boolean().optional().default(false),

      // Layout options
      layout: z.enum(['default', 'wide', 'minimal']).optional().default('default'),

      // Table of contents
      toc: z.boolean().optional().default(true),

      // Legacy support for existing content
      header: z.object({
        title: z.string(),
        subTitle: z.string().optional(),
      }).optional(),
    }),
  }))

  collections[`landing_${locale}`] = defineCollection(asSeoCollection({
    type: 'data',
    source: {
      include: `${locale}/index.yml`,
      prefix: '/',
    },
    schema: landingSchema,
  }))
})

export default defineContentConfig({ collections })
