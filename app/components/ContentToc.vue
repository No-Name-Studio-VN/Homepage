<script setup lang="ts">
import { computed } from 'vue'
import { createReusableTemplate } from '@vueuse/core'
import { ChevronDownIcon } from 'lucide-vue-next'
import type { TocLink } from '@nuxt/content'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useScrollspy } from '@/composables/useScrollspy'

export interface ContentTocLink extends TocLink {
  class?: string
}

export interface ContentTocProps {
  /** Title shown above the TOC */
  title?: string
  /** Whether to show a highlight indicator bar */
  highlight?: boolean
  /** List of TOC links */
  links?: ContentTocLink[]
  /** Whether TOC is open by default (mobile collapsible) */
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<ContentTocProps>(), {
  title: 'On This Page',
  highlight: true,
  defaultOpen: false,
})

const emit = defineEmits<{
  move: [id: string]
}>()

const { activeHeadings, updateHeadings } = useScrollspy()

const [DefineListTemplate, ReuseListTemplate] = createReusableTemplate<{ links: ContentTocLink[], level: number }>({
  props: {
    links: Array,
    level: Number,
  },
})

function scrollToHeading(id: string) {
  const encodedId = encodeURIComponent(id)
  const el = document.getElementById(encodedId) || document.getElementById(id)
  if (el) {
    const offset = 100
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
  emit('move', id)
}

function flattenLinks(links: ContentTocLink[]): ContentTocLink[] {
  return links.flatMap(link => [link, ...(link.children ? flattenLinks(link.children as ContentTocLink[]) : [])])
}

const indicatorStyle = computed(() => {
  if (!activeHeadings.value.length || !props.links?.length) return

  const flatLinks = flattenLinks(props.links)
  const activeIndex = flatLinks.findIndex(link => activeHeadings.value.includes(link.id))
  const linkHeight = 28
  const gapSize = 0

  return {
    '--indicator-size': `${(linkHeight * activeHeadings.value.length) + (gapSize * (activeHeadings.value.length - 1))}px`,
    '--indicator-position': activeIndex >= 0 ? `${activeIndex * (linkHeight + gapSize)}px` : '0px',
  }
})

const nuxtApp = useNuxtApp()

nuxtApp.hooks.hook('page:loading:end', () => {
  const headings = Array.from(document.querySelectorAll('h2, h3'))
  updateHeadings(headings)
})
nuxtApp.hooks.hook('page:transition:finish', () => {
  const headings = Array.from(document.querySelectorAll('h2, h3'))
  updateHeadings(headings)
})
</script>

<template>
  <div>
    <!-- Reusable recursive list template -->
    <!-- eslint-disable-next-line vue/no-template-shadow -->
    <DefineListTemplate v-slot="{ links, level }">
      <ul
        :class="[
          level > 0 ? 'ml-3 border-l border-border pl-2' : 'space-y-1',
        ]"
      >
        <li
          v-for="link in links"
          :key="link.id"
        >
          <a
            :href="`#${link.id}`"
            class="block rounded-md px-2 py-1 text-sm transition-colors"
            :class="[
              activeHeadings.includes(link.id)
                ? 'font-medium text-primary'
                : 'text-muted-foreground hover:text-foreground',
              link.class,
            ]"
            @click.prevent="scrollToHeading(link.id)"
          >
            {{ link.text }}
          </a>

          <ReuseListTemplate
            v-if="link.children?.length"
            :links="(link.children as ContentTocLink[])"
            :level="level + 1"
          />
        </li>
      </ul>
    </DefineListTemplate>

    <nav class="w-full">
      <!-- Mobile: Collapsible -->
      <Collapsible
        :default-open="defaultOpen"
        class="lg:hidden"
      >
        <div class="rounded-xl border border-border bg-card p-4">
          <CollapsibleTrigger class="flex w-full items-center justify-between">
            <h2 class="text-sm font-semibold text-foreground">
              {{ title }}
            </h2>
            <ChevronDownIcon class="size-4 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
          </CollapsibleTrigger>

          <CollapsibleContent class="mt-3">
            <div
              v-if="highlight"
              class="relative"
            >
              <div
                class="absolute left-0 top-0 w-0.5 rounded-full bg-primary transition-all duration-200"
                :style="{
                  height: indicatorStyle?.['--indicator-size'],
                  transform: `translateY(${indicatorStyle?.['--indicator-position']})`,
                }"
              />
            </div>
            <ReuseListTemplate
              v-if="links?.length"
              :links="links"
              :level="0"
            />
          </CollapsibleContent>
        </div>
      </Collapsible>

      <!-- Desktop: Always visible -->
      <div class="hidden lg:block">
        <div class="rounded-xl border border-border bg-card p-4">
          <h2 class="mb-3 text-sm font-semibold text-foreground">
            {{ title }}
          </h2>

          <div class="relative">
            <div
              v-if="highlight && indicatorStyle"
              class="absolute left-0 top-0 w-0.5 rounded-full bg-primary transition-all duration-200"
              :style="{
                height: indicatorStyle['--indicator-size'],
                transform: `translateY(${indicatorStyle['--indicator-position']})`,
              }"
            />

            <ReuseListTemplate
              v-if="links?.length"
              :links="links"
              :level="0"
            />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
