<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Floating Island Header -->
    <div class="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-500 ease-out">
      <header
        class="w-full max-w-5xl transition-all duration-500 ease-out"
        :class="cn(
          'rounded-full border px-8 transition-all',
          isScrolled
            ? 'border-border bg-background/40 shadow-lg backdrop-blur-xs shadow-black/8 py-3'
            : 'border-border/20 bg-background/60 py-4 backdrop-blur-xs',
        )"
      >
        <div class="flex h-full items-center justify-between">
          <!-- Logo -->
          <NuxtLink
            to="/"
            class="flex items-center gap-2.5 group transition-all duration-300"
            :class="isScrolled ? 'scale-[0.97]' : 'scale-100'"
          >
            <NuxtImg
              src="/favicon.svg"
              alt="No Name Studio"
              class="h-6 w-6 transition-all duration-300"
            />
            <span class="text-md font-semibold tracking-tight text-primary hover:text-foreground">
              No Name Studio
            </span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-0.5">
            <Button
              v-for="item in data?.nav?.items"
              :key="item.sectionId"
              variant="ghost"
              size="sm"
              class="text-sm font-medium text-primary hover:text-foreground hover:bg-transparent cursor-pointer transition-colors duration-200"
              @click="navigateTo(`/${locale}#${item.sectionId}`)"
            >
              {{ item.label }}
            </Button>

            <Separator
              orientation="vertical"
              class="mx-3 h-4 bg-border/60"
            />

            <!-- Language Switcher Dropdown -->
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  variant="ghost"
                  size="sm"
                  class="text-sm font-medium cursor-pointer gap-1.5 text-primary hover:text-foreground hover:bg-transparent"
                >
                  <Globe class="h-3.5 w-3.5" />
                  {{ currentLocaleLabel }}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                class="min-w-35"
              >
                <DropdownMenuItem
                  v-for="loc in globalLocales"
                  :key="loc.code"
                  class="cursor-pointer"
                  :class="locale === loc.code && 'bg-accent text-accent-foreground'"
                  @click="setLocale(loc.code)"
                >
                  {{ loc.name }}
                  <span
                    v-if="locale === loc.code"
                    class="ml-auto text-xs text-primary"
                  >✓</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <!-- Theme Switcher -->
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  variant="ghost"
                  size="icon"
                  class="cursor-pointer text-primary hover:text-foreground hover:bg-transparent h-8 w-8"
                >
                  <Sun class="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon class="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span class="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
              >
                <ThemeSwitcher />
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <!-- Mobile Controls -->
          <div class="flex items-center gap-0.5 md:hidden">
            <!-- Language Switcher Dropdown (mobile) -->
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  variant="ghost"
                  size="icon"
                  class="cursor-pointer h-8 w-8 text-primary hover:text-foreground hover:bg-transparent"
                >
                  <Globe class="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
              >
                <DropdownMenuItem
                  v-for="loc in globalLocales"
                  :key="loc.code"
                  class="cursor-pointer"
                  :class="locale === loc.code && 'bg-accent text-accent-foreground'"
                  @click="setLocale(loc.code)"
                >
                  {{ loc.name }}
                  <span
                    v-if="locale === loc.code"
                    class="ml-auto text-xs text-primary"
                  >✓</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <!-- Theme Switcher (mobile) -->
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  variant="ghost"
                  size="icon"
                  class="cursor-pointer h-8 w-8 text-primary hover:text-foreground hover:bg-transparent"
                >
                  <Sun class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span class="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
              >
                <ThemeSwitcher />
              </DropdownMenuContent>
            </DropdownMenu>

            <!-- Mobile Menu Toggle -->
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              class="h-8 w-8 text-primary hover:text-foreground hover:bg-transparent"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <X
                v-if="isMobileMenuOpen"
                class="h-5 w-5"
              />
              <Menu
                v-else
                class="h-5 w-5"
              />
            </Button>
          </div>
        </div>
      </header>
    </div>

    <!-- Full-Page Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 -translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-400 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-full"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden"
      >
        <nav class="flex h-full flex-col justify-start gap-2 px-8 pt-32">
          <TransitionGroup
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            appear
          >
            <a
              v-for="(item, index) in data?.nav?.items"
              :key="item.sectionId"
              :href="`/${locale}#${item.sectionId}`"
              class="group relative w-full cursor-pointer py-2 touch-manipulation"
              :style="{ transitionDelay: `${index * 60}ms` }"
              @click.prevent="handleMobileNavClick(item.sectionId)"
            >
              <div class="flex items-center justify-between">
                <span class="text-3xl font-semibold tracking-tight text-foreground transition-all duration-300 group-hover:text-primary group-active:scale-95">
                  {{ item.label }}
                </span>
                <ChevronRight
                  class="h-7 w-7 shrink-0 text-primary opacity-0 translate-x-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                />
              </div>
              <!-- Expanding underline -->
              <span class="absolute bottom-2 left-0 h-0.5 w-0 bg-primary transition-all duration-400 ease-out group-hover:w-3/4" />
            </a>
          </TransitionGroup>
        </nav>
      </div>
    </Transition>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <footer class="border-t border-border/40 bg-background">
      <div class="mx-auto max-w-5xl px-6 py-14 lg:px-8">
        <div class="flex flex-col items-center gap-5 text-center">
          <div class="flex items-center gap-6">
            <NuxtLink
              to="/docs/privacy"
              class="text-xs text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {{ $t('common.privacy') }}
            </NuxtLink>
            <span class="h-3 w-px bg-border/60" />
            <NuxtLink
              to="/docs/terms"
              class="text-xs text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {{ $t('common.terms') }}
            </NuxtLink>
          </div>

          <!-- Copyright -->
          <p class="text-[11px] text-muted-foreground/50">
            {{ new Date().getFullYear() }} © No Name Studio - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Menu, Sun, Moon, X, ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { lanugageNames, locales } from '../../i18n-constants'

const { locale, setLocale } = useI18n()
const { data } = await useLandingContent()

const globalLocales = locales.map(locale => ({
  name: lanugageNames[locale],
  code: locale,
}))

const currentLocaleLabel = computed(() => {
  return globalLocales.find(l => l.code === locale.value)?.name ?? locale.value
})

const isMobileMenuOpen = ref(false)

const { y: scrollY } = useWindowScroll()
const isScrolled = computed(() => scrollY.value > 300)

// Close mobile menu on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen.value) {
      isMobileMenuOpen.value = false
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => window.removeEventListener('keydown', handleEscape))
})

// Prevent body scroll when mobile menu is open
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = ''
  }
})

function handleMobileNavClick(sectionId: string) {
  isMobileMenuOpen.value = false
  navigateTo(`/${locale}#${sectionId}`)
}
</script>
