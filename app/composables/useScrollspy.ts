import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'

interface UseScrollspyOptions {
  /** CSS selector to find headings, or a ref to a root element to scope the query */
  rootEl?: Ref<HTMLElement | null>
  /** Selector for heading elements */
  selector?: string
  /** Offset from top in pixels */
  offset?: number
  /** Margin passed to IntersectionObserver rootMargin */
  rootMargin?: string
}

export function useScrollspy(options: UseScrollspyOptions = {}) {
  const {
    rootEl,
    selector = 'h2[id], h3[id]',
    rootMargin = '-100px 0px -66%',
  } = options

  const activeHeadings = ref<string[]>([])
  let observer: IntersectionObserver | null = null

  function updateHeadings(headings?: Element[]) {
    observer?.disconnect()

    const elements = headings ?? Array.from(
      (rootEl?.value ?? document).querySelectorAll(selector),
    )

    if (!elements.length) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeHeadings.value = [entry.target.id]
          }
        }
      },
      { rootMargin, threshold: 0 },
    )

    elements.forEach(el => observer!.observe(el))
  }

  onMounted(() => {
    updateHeadings()
  })

  if (rootEl) {
    watch(rootEl, () => updateHeadings())
  }

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    activeHeadings,
    updateHeadings,
  }
}
