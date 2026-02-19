<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, User, Lock, Eye, EyeOff } from 'lucide-vue-next'
import { getAuthErrorMessage } from '#shared/constants/authMessages'

const route = useRoute()
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const error = ref('')
const turnstileToken = ref('')

const redirectTo = computed(() => route.query.redirectTo as string || '/')

// Check for error in URL query parameter
onMounted(() => {
  const errorCode = route.query.error as string
  if (errorCode) {
    error.value = getAuthErrorMessage(errorCode) || 'An error occurred during login'
  }
})

definePageMeta({
  layout: 'empty',
  title: 'Login',
  breadcrumb: 'Login',
})
</script>

<template>
  <CenteredAppLayout
    :center-content="true"
    :full-width="true"
    :hide-sidebar-trigger="true"
    title="Login"
  >
    <Card class="w-full max-w-md mx-4">
      <CardHeader class="text-center relative">
        <CardTitle>
          Welcome Back
        </CardTitle>
        <CardDescription>
          Sign in to your Gromet Reader account to continue
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Alert
          v-if="error"
          variant="destructive"
          class="mb-4"
        >
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <form
          action="/api/auth/login-password"
          method="POST"
          class="space-y-4"
        >
          <input
            type="hidden"
            name="redirectTo"
            :value="redirectTo"
          >
          <div class="space-y-2">
            <Label
              for="username"
              class="text-sm font-medium"
            >
              Username
            </Label>
            <div class="relative">
              <User class="absolute left-3 top-3 h-4 w-4" />
              <Input
                id="username"
                v-model="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                class="pl-9 h-11"
                :disabled="isLoading"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label
              for="password"
              class="text-sm font-medium"
            >
              Password
            </Label>
            <div class="relative">
              <Lock class="absolute left-3 top-3 h-4 w-4" />
              <Input
                id="password"
                v-model="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="pl-9 pr-9 h-11"
                :disabled="isLoading"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                class="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-transparent"
                @click="showPassword = !showPassword"
              >
                <Eye
                  v-if="!showPassword"
                  class="h-4 w-4"
                />
                <EyeOff
                  v-else
                  class="h-4 w-4"
                />
              </Button>
            </div>
          </div>

          <div class="space-y-3">
            <NuxtTurnstile
              v-model="turnstileToken"
            />
            <Button
              type="submit"
              class="w-full h-11"
              :disabled="isLoading || !username.trim() || !password.trim()"
            >
              <Loader2
                v-if="isLoading"
                class="mr-2 h-4 w-4 animate-spin"
              />
              <Lock
                v-else
                class="mr-2 h-4 w-4"
              />
              Sign In with Password
            </Button>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-card/60 px-2 text-gray-500 dark:text-gray-400 rounded-xl">Or</span>
              </div>
            </div>
          </div>
        </form>

        <div class="text-center mt-6 space-y-3">
          <div class="text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our
            <NuxtLink
              to="/terms"
              class="underline"
              target="_blank"
              rel="noopener noreferrer"
            >Terms of Service</NuxtLink>
            and
            <NuxtLink
              to="/privacy"
              class="underline"
              target="_blank"
              rel="noopener noreferrer"
            >Privacy Policy</NuxtLink>
          </div>
        </div>
      </CardContent>
    </Card>
  </CenteredAppLayout>
</template>
