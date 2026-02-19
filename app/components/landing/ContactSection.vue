<script lang="ts" setup>
import { ref } from 'vue'
import { Motion } from 'motion-v'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Mail } from 'lucide-vue-next'
import type { LandingContact } from '~~/types/landing'

defineProps<LandingContact>()

const formData = ref({
  name: '',
  email: '',
  message: '',
})
</script>

<template>
  <section
    id="contact"
    class="py-28 md:py-36"
  >
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <!-- Left Column: CTA Content -->
        <Motion
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.7 }"
          :viewport="{ once: true, margin: '0px 0px -80px 0px' }"
        >
          <p class="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            {{ label }}
          </p>
          <h2 class="mt-4 text-3xl font-semibold tracking-tighter leading-tight sm:text-4xl md:text-[2.75rem]">
            {{ title }}
          </h2>
          <p class="mt-5 text-base leading-relaxed text-muted-foreground">
            {{ subtitle }}
          </p>

          <div class="mt-8">
            <a
              :href="`mailto:${email}`"
              class="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <Mail class="h-4 w-4" />
              {{ email }}
            </a>
          </div>

          <div class="mt-8">
            <Button
              size="lg"
              class="group rounded-full px-8 text-sm font-medium cursor-pointer"
            >
              {{ cta }}
              <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </Motion>

        <!-- Right Column: Contact Form — glass card -->
        <Motion
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.7, delay: 0.15 }"
          :viewport="{ once: true, margin: '0px 0px -80px 0px' }"
        >
          <form
            class="space-y-5 rounded-3xl border border-black/[0.04] bg-white/50 p-7 shadow-sm backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.03]"
            @submit.prevent
          >
            <div>
              <Input
                v-model="formData.name"
                :placeholder="form.name"
                class="h-11 rounded-xl border-black/[0.06] bg-background/60 text-sm placeholder:text-muted-foreground/60 dark:border-white/[0.08]"
              />
            </div>
            <div>
              <Input
                v-model="formData.email"
                type="email"
                :placeholder="form.email"
                class="h-11 rounded-xl border-black/[0.06] bg-background/60 text-sm placeholder:text-muted-foreground/60 dark:border-white/[0.08]"
              />
            </div>
            <div>
              <Textarea
                v-model="formData.message"
                :placeholder="form.message"
                class="min-h-[130px] resize-none rounded-xl border-black/[0.06] bg-background/60 text-sm placeholder:text-muted-foreground/60 dark:border-white/[0.08]"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              class="w-full rounded-xl text-sm font-medium cursor-pointer"
            >
              {{ form.submit }}
            </Button>
          </form>
        </Motion>
      </div>
    </div>
  </section>
</template>
