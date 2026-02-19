<script lang="ts" setup>
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { LandingFaq } from '~~/types/landing'

defineProps<LandingFaq>()
</script>

<template>
  <section
    id="faq"
    class="py-28 lg:py-32 relative mx-2.5 mt-2.5 lg:mx-4 from-background via-background to-primary/20 rounded-t-2xl rounded-b-4xl bg-linear-to-b"
  >
    <div class="container max-w-5xl">
      <div class="mx-auto grid gap-16 lg:grid-cols-2">
        <div class="space-y-4">
          <h2
            class="text-2xl tracking-tight md:text-4xl lg:text-5xl"
          >
            {{ title }}
          </h2>
          <p class="text-muted-foreground max-w-md leading-snug lg:mx-auto">
            {{ subtitle }}
          </p>
        </div>

        <div class="grid gap-6 text-start">
          <div
            v-for="(category, categoryIndex) in categories"
            :key="category.label"
          >
            <h3 class="text-muted-foreground border-b py-4">
              {{ category.label }}
            </h3>
            <Accordion
              type="single"
              collapsible
              class="w-full"
            >
              <AccordionItem
                v-for="(item, i) in category.items"
                :key="i"
                :value="`${categoryIndex}-${i}`"
              >
                <AccordionTrigger>{{ item.question }}</AccordionTrigger>
                <AccordionContent class="text-muted-foreground">
                  {{ item.answer }}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
