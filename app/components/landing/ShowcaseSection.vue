<script lang="ts" setup>
import { ref } from 'vue'
import { Motion } from 'motion-v'
import {
  AppleCardCarousel,
  AppleCarouselItem,
  AppleCard,
} from '@/components/ui/apple-card-carousel'
import { CircleCheckIcon } from 'lucide-vue-next'
import type { LandingShowcase } from '~~/types/landing'

defineProps<LandingShowcase>()

// Track the active gallery image index per project
const activeGalleryIndex = ref<Record<number, number>>({})

function getActiveIndex(projectIndex: number): number {
  return activeGalleryIndex.value[projectIndex] ?? 0
}

function setActiveIndex(projectIndex: number, imageIndex: number) {
  activeGalleryIndex.value[projectIndex] = imageIndex
}
</script>

<template>
  <section
    id="showcase"
    class="overflow-hidden py-28 lg:py-32"
  >
    <div class="container">
      <Motion
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7 }"
        :viewport="{ once: true, margin: '0px 0px -80px 0px' }"
        class="space-y-4"
      >
        <h2 class="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          {{ title }}
        </h2>
        <p class="text-muted-foreground max-w-md leading-snug">
          {{ subtitle }}
        </p>
      </Motion>

      <!-- Apple Card Carousel -->
      <div class="relative -mr-[max(3rem,calc((100vw-80rem)/2+3rem))]">
        <AppleCardCarousel>
          <AppleCarouselItem
            v-for="(project, index) in projects"
            :key="index"
            :index="index"
          >
            <AppleCard
              :card="{ src: project.src, title: project.title, category: project.category }"
              :index="index"
              :layout="true"
            >
              <!-- Chrome Web Store-style detail content -->
              <div class="space-y-8">
                <!-- Gallery Carousel -->
                <div class="overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                  <!-- Main Image -->
                  <div class="relative aspect-video w-full overflow-hidden">
                    <Transition
                      name="gallery-fade"
                      mode="out-in"
                    >
                      <img
                        :key="getActiveIndex(index)"
                        :src="project.gallery[getActiveIndex(index)]"
                        :alt="`${project.title} screenshot ${getActiveIndex(index) + 1}`"
                        class="size-full object-cover"
                      >
                    </Transition>
                  </div>
                  <!-- Thumbnail Strip -->
                  <div class="flex gap-2 overflow-x-auto p-3">
                    <button
                      v-for="(img, imgIndex) in project.gallery"
                      :key="imgIndex"
                      class="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition-all duration-200"
                      :class="[
                        getActiveIndex(index) === imgIndex
                          ? 'ring-primary opacity-100'
                          : 'ring-transparent opacity-60 hover:opacity-90',
                      ]"
                      @click="setActiveIndex(index, imgIndex)"
                    >
                      <img
                        :src="img"
                        :alt="`Thumbnail ${imgIndex + 1}`"
                        class="size-full object-cover"
                      >
                    </button>
                  </div>
                </div>

                <!-- Two-column layout: Description | Sidebar -->
                <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <!-- Left: Description & Highlights -->
                  <div class="space-y-8 md:col-span-2">
                    <!-- Overview -->
                    <div>
                      <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Overview
                      </h3>
                      <p class="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {{ project.description }}
                      </p>
                    </div>

                    <!-- Highlights -->
                    <div>
                      <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Highlights
                      </h3>
                      <ul class="mt-3 space-y-3">
                        <li
                          v-for="(highlight, hIndex) in project.highlights"
                          :key="hIndex"
                          class="flex items-start gap-3 text-[15px] text-neutral-600 dark:text-neutral-400"
                        >
                          <CircleCheckIcon
                            class="mt-0.5 size-5 shrink-0 text-primary"
                          />
                          {{ highlight }}
                        </li>
                      </ul>
                    </div>

                    <!-- Technology Tags -->
                    <div>
                      <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Technologies
                      </h3>
                      <div class="mt-3 flex flex-wrap gap-2">
                        <span
                          v-for="tag in project.tags"
                          :key="tag"
                          class="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                          {{ tag }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Right: Info Sidebar -->
                  <div class="space-y-6">
                    <div class="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-800">
                      <dl class="space-y-4">
                        <div>
                          <dt class="text-xs font-medium tracking-wide uppercase text-neutral-500 dark:text-neutral-400">
                            Type
                          </dt>
                          <dd class="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {{ project.category }}
                          </dd>
                        </div>
                        <div class="border-t border-neutral-200 pt-4 dark:border-neutral-700">
                          <dt class="text-xs font-medium tracking-wide uppercase text-neutral-500 dark:text-neutral-400">
                            Client
                          </dt>
                          <dd class="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {{ project.client }}
                          </dd>
                        </div>
                        <div class="border-t border-neutral-200 pt-4 dark:border-neutral-700">
                          <dt class="text-xs font-medium tracking-wide uppercase text-neutral-500 dark:text-neutral-400">
                            Year
                          </dt>
                          <dd class="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {{ project.year }}
                          </dd>
                        </div>
                        <div class="border-t border-neutral-200 pt-4 dark:border-neutral-700">
                          <dt class="text-xs font-medium tracking-wide uppercase text-neutral-500 dark:text-neutral-400">
                            Stack
                          </dt>
                          <dd class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                            {{ project.tags.join(' · ') }}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </AppleCard>
          </AppleCarouselItem>
        </AppleCardCarousel>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition: opacity 0.25s ease;
}

.gallery-fade-enter-from,
.gallery-fade-leave-to {
  opacity: 0;
}
</style>
