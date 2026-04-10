<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import '../scss/BarCard.scss'

const props = defineProps({
  bar:      { type: Object,  required: true },
  cardType: { type: String,  default: 'square' },
})

const badgeConfig = computed(() => {
  if (props.bar.type === '熱門') return { text: '熱門', className: 'badge-hot' }
  if (props.bar.type === '最新') return { text: '最新', className: 'badge-new' }
  return null
})
</script>

<template>
  <RouterLink :to="`/bar/${bar.id}`" :class="`bar-card ${cardType}`">
    <div class="img-box">
      <img :src="`/images/barListCard${bar.id}.png`" :alt="bar.name" />
      <div v-if="badgeConfig" :class="`badge ${badgeConfig.className}`">
        {{ badgeConfig.text }}
      </div>
    </div>
    <div class="text-overlay">
      <div class="text-box">
        <h3 class="bar-name">{{ bar.name }}</h3>
        <div class="station-info">
          <span class="mrt-line" :style="{ color: bar.lineColor }">{{ bar.line }}</span>
          <span class="divider">•</span>
          <span class="station">{{ bar.station }}</span>
        </div>
        <p class="description">{{ bar.description }}</p>
      </div>
    </div>
  </RouterLink>
</template>
