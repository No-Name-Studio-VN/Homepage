<script setup lang="ts">
import { isEmpty } from 'es-toolkit/compat'

definePageMeta({
  title: 'Home',
  breadcrumb: 'Home',
})

const { data } = await useLandingContent()

const route = useRoute()
if (!isEmpty(route.hash)) {
  const sectionId = route.hash.substring(1)
  setTimeout(() => scrollToSection(sectionId), 300)
}

function scrollToSection(sectionId: string) {
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
  <div v-if="data">
    <LandingHeroSection
      :badge="data.hero.badge"
      :title="data.hero.title"
      :subtitle="data.hero.subtitle"
      :primary-cta="data.hero.primaryCta"
      :secondary-cta="data.hero.secondaryCta"
    />
    <LandingAboutSection
      :label="data.about.label"
      :title="data.about.title"
      :description="data.about.description"
      :stats="data.about.stats"
      :services="data.about.services"
    />
    <LandingShowcaseSection
      :label="data.showcase.label"
      :title="data.showcase.title"
      :subtitle="data.showcase.subtitle"
      :projects="data.showcase.projects"
    />
    <LandingFaqSection
      :label="data.faq.label"
      :title="data.faq.title"
      :subtitle="data.faq.subtitle"
      :categories="data.faq.categories"
    />
    <LandingContactSection
      :label="data.contact.label"
      :title="data.contact.title"
      :subtitle="data.contact.subtitle"
      :email="data.contact.email"
      :cta="data.contact.cta"
      :form="data.contact.form"
    />
  </div>
</template>
