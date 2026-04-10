<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import '../scss/side-toc.scss'

// ── SVG 幾何工具 ──────────────────────────────────────────
function polar(cx, cy, r, deg) {
  const rad = (Math.PI / 180) * deg
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}
function arcPath(cx, cy, r, startDeg, endDeg) {
  const s = polar(cx, cy, r, startDeg)
  const e = polar(cx, cy, r, endDeg)
  const large = endDeg - startDeg <= 180 ? 0 : 1
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
}

// ── 常數 ─────────────────────────────────────────────────
const NAV_OFFSET = 60
const ORANGE = '#ff6a2b'
const GREY   = '#d9d9d9'
const R = 130, CX = 130, CY = 130, STROKE = 12, SIZE = 260

const segments = [
  { id: 'seg1', start: -90, end: -30 },
  { id: 'seg2', start: -30, end:  30 },
  { id: 'seg3', start:  30, end:  90 },
]

// ── 狀態 ─────────────────────────────────────────────────
const active = ref('w_base')
const tocRef = ref(null)

const colors = computed(() => {
  if (active.value === 'w_base')     return [ORANGE, GREY,   GREY]
  if (active.value === 'w_classics') return [GREY,   ORANGE, GREY]
  if (active.value === 'w_standard') return [GREY,   GREY,   ORANGE]
  return [GREY, GREY, GREY]
})

// ── IntersectionObserver：高亮目前章節 ───────────────────
let sectionObserver = null

onMounted(() => {
  const secs = document.querySelectorAll('section[data-w-toc]')
  if (!secs.length) return
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => { if (e.isIntersecting) active.value = e.target.id })
    },
    { threshold: 0.55, rootMargin: `-${NAV_OFFSET}px 0px 0px 0px` }
  )
  secs.forEach(s => sectionObserver.observe(s))
})

onUnmounted(() => {
  sectionObserver?.disconnect()
  window.removeEventListener('scroll', place)
  window.removeEventListener('resize', place)
})

// ── 浮動位置計算 ──────────────────────────────────────────
function heroH() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--hero-h').trim()
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : 420
}
function place() {
  const footer  = document.querySelector('footer, .site-footer, #footer')
  const initTop = heroH() + 60
  const vh  = window.innerHeight
  const h   = tocRef.value?.offsetHeight ?? 0
  const centerTop = Math.max(24, (vh - h) / 2)
  let topPx = initTop - window.scrollY
  if (topPx < centerTop) topPx = centerTop
  if (footer) {
    const footerTop = footer.getBoundingClientRect().top + window.scrollY
    topPx = Math.min(topPx, footerTop - window.scrollY - h - 24)
  }
  document.documentElement.style.setProperty('--toc-top', `${Math.max(0, topPx)}px`)
}

onMounted(() => {
  place()
  window.addEventListener('scroll', place, { passive: true })
  window.addEventListener('resize', place)
})

// ── 跳至章節 ─────────────────────────────────────────────
const jump = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const idx = el.querySelector('.w_section_idx')
  const extra = 8
  const y = idx
    ? idx.getBoundingClientRect().top + window.scrollY - NAV_OFFSET - extra
    : el.getBoundingClientRect().top  + window.scrollY - NAV_OFFSET
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
  active.value = id
}
</script>

<template>
  <aside ref="tocRef" class="w_toc_right" aria-label="章節導覽">
    <svg
      class="w_toc_right__svg"
      :width="SIZE"
      :height="SIZE"
      :viewBox="`0 0 ${SIZE} ${SIZE}`"
      aria-hidden="true"
    >
      <path
        v-for="(seg, i) in segments"
        :key="seg.id"
        :d="arcPath(CX, CY, R, seg.start, seg.end)"
        fill="none"
        :stroke="colors[i]"
        :stroke-width="STROKE"
        stroke-linecap="butt"
        stroke-linejoin="round"
      />
    </svg>

    <ol class="w_toc_right__list">
      <li :class="{ 'is-active': active === 'w_base' }"     @click="jump('w_base')">
        <span class="no">01</span><span class="title">六大基酒</span>
      </li>
      <li :class="{ 'is-active': active === 'w_classics' }" @click="jump('w_classics')">
        <span class="no">02</span><span class="title">經典調酒</span>
      </li>
      <li :class="{ 'is-active': active === 'w_standard' }" @click="jump('w_standard')">
        <span class="no">03</span><span class="title">大眾調酒</span>
      </li>
    </ol>
  </aside>
</template>
