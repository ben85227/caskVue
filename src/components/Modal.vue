<script setup>
import '../scss/Modal.scss'

defineProps({
  isOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-backdrop" @click="handleBackdropClick">
      <div class="modal-content">
        <button class="modal-close" aria-label="關閉" @click="emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
