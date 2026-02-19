<script lang="ts" setup>
import { Motion } from 'motion-v'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown } from 'lucide-vue-next'
import type { LandingHero } from '~~/types/landing'

defineProps<LandingHero>()

function scrollToElement(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - headerOffset
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}
</script>

<template>
  <section
    id="hero"
    class="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
  >
    <!-- Background Image -->
    <NuxtImg
      src="/images/bg2@0,5x.jpg"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      loading="eager"
      preload
    />

    <!-- Dark overlay for readability -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />

    <!-- Warm bottom fade -->
    <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

    <!-- Hero Content -->
    <div class="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-8">
      <Motion
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.2 }"
      >
        <span
          class="mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-bold tracking-wide text-white/90 backdrop-blur-sm"
        >
          {{ badge }}
        </span>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.4 }"
      >
        <h1 class="text-3xl font-semibold tracking-tighter leading-[1.08] text-white md:text-4xl lg:text-5xl lg:text-[4.25rem]">
          {{ title }}
        </h1>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.6 }"
      >
        <p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-md">
          {{ subtitle }}
        </p>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.8 }"
        class="mt-10 flex flex-row justify-center gap-3"
      >
        <Button
          size="lg"
          class="rounded-full px-8 text-sm font-medium cursor-pointer group"
          @click="scrollToElement('contact')"
        >
          {{ primaryCta }}
          <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
        <Button
          size="lg"
          variant="ghost"
          class="rounded-full px-8 text-sm font-medium text-white/90 hover:text-white cursor-pointer border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all"
          @click="scrollToElement('showcase')"
        >
          {{ secondaryCta }}
        </Button>
      </Motion>
    </div>

    <!-- Scroll Indicator -->
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.8, delay: 1.4 }"
      class="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <button
        class="animate-bounce text-white-foreground/40 transition-colors hover:text-white-foreground/80 cursor-pointer"
        aria-label="Scroll down"
        @click="scrollToElement('about')"
      >
        <ChevronDown class="h-5 w-5" />
      </button>
    </Motion>
  </section>
</template>
