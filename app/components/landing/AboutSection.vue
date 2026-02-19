<script lang="ts" setup>
import { Motion } from 'motion-v'
import { Layers, Cpu, Plug, Leaf } from 'lucide-vue-next'
import type { LandingAbout } from '~~/types/landing'

defineProps<LandingAbout>()

const iconMap: Record<string, Component> = {
  layers: Layers,
  cpu: Cpu,
  plug: Plug,
  leaf: Leaf,
}
</script>

<template>
  <section
    id="about"
    class="py-28 lg:py-32 lg:pt-44"
  >
    <div class="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
      <!-- Bento Grid -->
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <!-- ─── Hero Card: Title + Description (2×2 on desktop) ─── -->
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          :viewport="{ once: true, margin: '0px 0px -60px 0px' }"
          class="col-span-2 md:row-span-2"
        >
          <div class="flex h-full flex-col justify-center rounded-3xl bg-primary/6 p-8 md:p-10 dark:bg-primary/10">
            <h2 class="text-3xl font-semibold tracking-tighter leading-[1.1] sm:text-4xl md:text-[2.75rem]">
              {{ title }}
            </h2>
            <p class="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {{ description }}
            </p>
          </div>
        </Motion>

        <!-- ─── Service 1: Wide card (2 cols) ─── -->
        <Motion
          v-if="services[0]"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.05 }"
          :viewport="{ once: true, margin: '0px 0px -40px 0px' }"
          class="col-span-2"
        >
          <div class="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card p-7 transition-shadow duration-300 hover:shadow-md">
            <div>
              <div class="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary/8 text-primary transition-colors group-hover:bg-primary/14">
                <component
                  :is="iconMap[services[0].icon]"
                  class="size-5.5"
                />
              </div>
              <h3 class="text-lg font-semibold tracking-tight">
                {{ services[0].title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                {{ services[0].description }}
              </p>
            </div>
          </div>
        </Motion>

        <!-- ─── Stat Cards (4 cells) ─── -->
        <Motion
          v-for="(stat, sIndex) in stats"
          :key="`stat-${sIndex}`"
          :initial="{ opacity: 0, scale: 0.95 }"
          :while-in-view="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.45, delay: 0.06 * sIndex }"
          :viewport="{ once: true, margin: '0px 0px -40px 0px' }"
        >
          <div
            class="flex h-full flex-col justify-end overflow-hidden rounded-3xl p-6 transition-shadow duration-300 hover:shadow-md md:p-7"
            :class="[
              sIndex === stats.length - 1
                ? 'bg-primary text-primary-foreground'
                : 'border border-border/60 bg-card',
            ]"
          >
            <div
              class="text-4xl font-bold tracking-tighter md:text-5xl"
              :class="[sIndex === stats.length - 1 ? '' : 'text-foreground']"
            >
              {{ stat.value }}
            </div>
            <div
              class="mt-1.5 text-xs font-medium tracking-wide uppercase"
              :class="[
                sIndex === stats.length - 1
                  ? 'text-primary-foreground/70'
                  : 'text-muted-foreground',
              ]"
            >
              {{ stat.label }}
            </div>
          </div>
        </Motion>

        <!-- ─── Service 2: Wide card (2 cols) ─── -->
        <Motion
          v-if="services[1]"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.08 }"
          :viewport="{ once: true, margin: '0px 0px -40px 0px' }"
          class="col-span-2"
        >
          <div class="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card p-7 transition-shadow duration-300 hover:shadow-md">
            <div>
              <div class="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary/8 text-primary transition-colors group-hover:bg-primary/14">
                <component
                  :is="iconMap[services[1].icon]"
                  class="size-5.5"
                />
              </div>
              <h3 class="text-lg font-semibold tracking-tight">
                {{ services[1].title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                {{ services[1].description }}
              </p>
            </div>
          </div>
        </Motion>

        <!-- ─── Service 3 (2 cols) ─── -->
        <Motion
          v-if="services[2]"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.1 }"
          :viewport="{ once: true, margin: '0px 0px -40px 0px' }"
          class="col-span-2"
        >
          <div class="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card p-7 transition-shadow duration-300 hover:shadow-md">
            <div>
              <div class="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary/8 text-primary transition-colors group-hover:bg-primary/14">
                <component
                  :is="iconMap[services[2].icon]"
                  class="size-5.5"
                />
              </div>
              <h3 class="text-lg font-semibold tracking-tight">
                {{ services[2].title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                {{ services[2].description }}
              </p>
            </div>
          </div>
        </Motion>

        <!-- ─── Service 4 (2 cols) ─── -->
        <Motion
          v-if="services[3]"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.12 }"
          :viewport="{ once: true, margin: '0px 0px -40px 0px' }"
          class="col-span-2"
        >
          <div class="group flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-secondary/60 p-7 transition-shadow duration-300 hover:shadow-md dark:bg-secondary/40">
            <div>
              <div class="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary/8 text-primary transition-colors group-hover:bg-primary/14">
                <component
                  :is="iconMap[services[3].icon]"
                  class="size-5.5"
                />
              </div>
              <h3 class="text-lg font-semibold tracking-tight">
                {{ services[3].title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                {{ services[3].description }}
              </p>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
