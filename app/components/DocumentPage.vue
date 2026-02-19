<script setup lang="ts">
import type { ContentNavigationItem, DocsEnCollectionItem, DocsViCollectionItem } from '@nuxt/content'
import { UserIcon, CalendarIcon, RefreshCwIcon, ClockIcon, ArrowLeftIcon } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  page: DocsEnCollectionItem | DocsViCollectionItem
  surround?: ContentNavigationItem[]
  notFoundMessage?: string
}>(), {
  notFoundMessage: 'Page not found',
})

const { locale } = useI18n()

// Format date
const formatDate = (dateString?: string) => {
  if (!dateString)
    return null
  return new Date(dateString).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Computed helpers
const tocLinks = computed(() => props.page?.body?.toc?.links ?? [])
const hasToc = computed(() => props.page?.toc !== false && tocLinks.value.length > 0)
const hasHeader = computed(() => props.page?.title || props.page?.description || props.page?.author || props.page?.publishedAt)
const hasMeta = computed(() => props.page?.author || props.page?.publishedAt || props.page?.updatedAt || props.page?.readingTime)
</script>

<template>
  <div class="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
        <!-- Main Content -->
        <article class="min-w-0">
          <!-- Paper Container -->
          <div>
            <!-- Header Section -->
            <div
              v-if="hasHeader"
              class="border-b border-border p-8 sm:p-12 lg:px-16 lg:pt-12 lg:pb-8"
            >
              <div class="space-y-4">
                <!-- Category Badge -->
                <div
                  v-if="page.category"
                  class="flex items-center gap-2"
                >
                  <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {{ page.category }}
                  </span>
                </div>

                <!-- Title -->
                <h1
                  v-if="page.title"
                  class="text-4xl font-bold text-foreground leading-tight"
                >
                  {{ page.title }}
                </h1>

                <!-- Description -->
                <p
                  v-if="page.description"
                  class="text-lg text-muted-foreground leading-relaxed"
                >
                  {{ page.description }}
                </p>

                <!-- Metadata Row -->
                <div
                  v-if="hasMeta"
                  class="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-sm text-muted-foreground"
                >
                  <span
                    v-if="page.author"
                    class="flex items-center gap-1.5"
                  >
                    <UserIcon class="size-4" />
                    {{ page.author }}
                  </span>

                  <span
                    v-if="page.publishedAt"
                    class="flex items-center gap-1.5"
                  >
                    <CalendarIcon class="size-4" />
                    {{ formatDate(page.publishedAt) }}
                  </span>

                  <span
                    v-if="page.updatedAt"
                    class="flex items-center gap-1.5"
                  >
                    <RefreshCwIcon class="size-4" />
                    Updated {{ formatDate(page.updatedAt) }}
                  </span>

                  <span
                    v-if="page.readingTime"
                    class="flex items-center gap-1.5"
                  >
                    <ClockIcon class="size-4" />
                    {{ page.readingTime }}
                  </span>
                </div>

                <!-- Tags -->
                <div
                  v-if="page.tags?.length"
                  class="flex flex-wrap gap-2 pt-2"
                >
                  <span
                    v-for="tag in page.tags"
                    :key="tag"
                    class="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-foreground"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Content Section -->
            <div class="p-8 sm:p-12 lg:p-16">
              <ContentRenderer
                v-if="page"
                :value="page"
                class="prose prose-neutral dark:prose-invert max-w-none"
              />
              <div
                v-else
                class="text-center py-12"
              >
                <h1 class="text-3xl font-bold text-foreground mb-4">
                  {{ notFoundMessage }}
                </h1>
                <p class="text-muted-foreground">
                  This page doesn't exist in {{ locale }} language.
                </p>
              </div>
            </div>
          </div>

          <!-- Back to Home Link -->
          <div class="mt-8 text-center">
            <NuxtLink
              to="/"
              class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeftIcon class="size-4" />
              Back to Home
            </NuxtLink>
          </div>
        </article>

        <!-- Table of Contents Sidebar -->
        <aside v-if="hasToc">
          <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <ContentToc
              :links="page.body?.toc?.links"
              highlight
            />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.prose) {
  /* Headings */
  & h1 {
    font-size: 2.25rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin-bottom: 1rem;
    margin-top: 0;
    line-height: 1.2;
  }

  & h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    margin-bottom: 1rem;
    margin-top: 2.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid hsl(var(--border));
  }

  & h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    margin-bottom: 0.75rem;
    margin-top: 2rem;
  }

  & h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;
  }

  /* Paragraphs */
  & p {
    font-size: 1rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.75;
    margin-bottom: 1rem;
  }

  /* Links */
  & a {
    color: hsl(var(--primary));
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s;
  }

  & a:hover {
    color: hsl(var(--primary) / 0.8);
  }

  /* Lists */
  & ul,
  & ol {
    margin-bottom: 1rem;
    margin-left: 1.5rem;
  }

  & li {
    font-size: 1rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.75;
    margin-bottom: 0.5rem;
  }

  & ul li {
    list-style-type: disc;
  }

  & ol li {
    list-style-type: decimal;
  }

  /* Nested lists */
  & ul ul,
  & ol ol,
  & ul ol,
  & ol ul {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  /* Strong text */
  & strong {
    font-weight: 600;
    color: hsl(var(--foreground));
  }

  /* Emphasis */
  & em {
    font-style: italic;
  }

  /* Code */
  & code {
    background-color: hsl(var(--muted));
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family: ui-monospace, monospace;
  }

  /* Blockquotes */
  & blockquote {
    border-left: 4px solid hsl(var(--primary));
    padding-left: 1rem;
    font-style: italic;
    color: hsl(var(--muted-foreground));
    margin: 1rem 0;
  }

  /* Horizontal Rule */
  & hr {
    border-color: hsl(var(--border));
    margin: 2rem 0;
  }

  /* First paragraph after heading */
  & h1 + p,
  & h2 + p,
  & h3 + p {
    margin-top: 1rem;
  }

  /* Tables */
  & table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }

  & th,
  & td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid hsl(var(--border));
  }

  & th {
    font-weight: 600;
    color: hsl(var(--foreground));
    background-color: hsl(var(--muted) / 0.5);
  }

  & td {
    color: hsl(var(--muted-foreground));
  }

  /* Add scroll margin to headings for anchor links */
  & h2[id],
  & h3[id],
  & h4[id] {
    scroll-margin-top: 6rem;
  }
}

/* Custom scrollbar for TOC */
aside {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted-foreground) / 0.3) transparent;
}

aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background-color: hsl(var(--muted-foreground) / 0.3);
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background-color: hsl(var(--muted-foreground) / 0.5);
}
</style>
