import { onMounted, watch, isRef } from 'vue'

export function useDocumentTitle(title) {
  const setTitle = (val) => {
    document.title = val ? `${val} | 酒桶理論` : '酒桶理論'
  }

  if (isRef(title)) {
    watch(title, setTitle, { immediate: true })
  } else {
    onMounted(() => setTitle(title))
  }
}
