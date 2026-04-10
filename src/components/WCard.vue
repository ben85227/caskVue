<script setup>
import { computed } from 'vue'

const props = defineProps({
  zh:        { type: String, required: true },
  en:        { type: String, required: true },
  img:       { type: String, default: '' },
  highlight: { type: String, default: '' },
  align:     { type: String, default: 'left' },
  onClick:   { type: Function, default: null },
})

// 在中文名稱中標記關鍵字
const zhParts = computed(() => {
  if (!props.highlight) return null
  const idx = props.zh.indexOf(props.highlight)
  if (idx === -1) return null
  return {
    before: props.zh.slice(0, idx),
    hit:    props.zh.slice(idx, idx + props.highlight.length),
    after:  props.zh.slice(idx + props.highlight.length),
  }
})

// 在英文名稱中標記關鍵字（大小寫不敏感）
const enParts = computed(() => {
  if (!props.highlight) return null
  const low = props.en.toLowerCase()
  const q   = props.highlight.toLowerCase()
  const idx = low.indexOf(q)
  if (idx === -1) return null
  return {
    before: props.en.slice(0, idx),
    hit:    props.en.slice(idx, idx + props.highlight.length),
    after:  props.en.slice(idx + props.highlight.length),
  }
})

const alignClass = computed(() => props.align === 'right' ? 'is-right' : 'is-left')

const handleClick = (e) => {
  if (e.target.closest('.w_card_visual') && props.onClick) {
    props.onClick(props.en)
  }
}
</script>

<template>
  <div :class="`w_card ${alignClass}`" style="cursor: pointer" @click="handleClick">
    <div class="w_card_visual">
      <div class="w_card_frame">
        <div class="w_card_bg" />
        <img v-if="img" class="w_card_img" :src="img" :alt="`${zh} ${en}`" />
        <div v-else class="w_img_placeholder" />
        <div class="w_card_meta">
          <!-- 中文名稱（含關鍵字標記） -->
          <div class="w_card_name">
            <template v-if="zhParts">
              {{ zhParts.before }}<mark>{{ zhParts.hit }}</mark>{{ zhParts.after }}
            </template>
            <template v-else>{{ zh }}</template>
          </div>
          <!-- 英文名稱（含關鍵字標記） -->
          <div class="w_card_en">
            <template v-if="enParts">
              {{ enParts.before }}<mark>{{ enParts.hit }}</mark>{{ enParts.after }}
            </template>
            <template v-else>{{ en }}</template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
