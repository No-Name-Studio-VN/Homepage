<template>
  <NuxtLoadingIndicator />
  <TooltipProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </TooltipProvider>
  <Toaster class="pointer-events-auto" />
</template>

<script lang="ts" setup>
import { Toaster } from '@/components/ui/sonner'
</script>
