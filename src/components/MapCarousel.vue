<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const base = import.meta.env.BASE_URL

const bars = [
  { id: 1,  mrt: '中山站',        title: 'Draft Land',      img: '${base}images/barCard1.png' },
  { id: 2,  mrt: '忠孝復興站',    title: 'Bar Mood',        img: '${base}images/barCard2.png' },
  { id: 3,  mrt: '台北小巨蛋',    title: 'The Whisky Bar',  img: '${base}images/barCard3.png' },
  { id: 4,  mrt: '忠孝敦化站',    title: 'Mixology',        img: '${base}images/barCard4.png' },
  { id: 5,  mrt: '台北101/世貿站', title: 'Rooftop 101',    img: '${base}images/barCard5.png' },
  { id: 6,  mrt: '中山國小站',    title: 'Speakeasy',       img: '${base}images/barCard6.png' },
  { id: 7,  mrt: '國父紀念館站',  title: 'The Gin Room',    img: '${base}images/barCard7.png' },
  { id: 8,  mrt: '南京三民站',    title: 'Jazz Corner',     img: '${base}images/barCard8.png' },
  { id: 9,  mrt: '南港展覽館站',  title: 'Craft & Draft',   img: '${base}images/barCard9.png' },
  { id: 10, mrt: '淡水站',        title: 'Sunset Lounge',   img: '${base}images/barCard10.png' },
]

const count      = bars.length
const speedWheel = 0.08
const EPS        = 1
const clamp      = (n, min, max) => Math.max(min, Math.min(n, max))

const progress    = ref(50)
const sectionRef  = ref(null)
const progressRef = ref(progress.value)

const active   = computed(() => Math.floor(clamp(progress.value, 0, 100) / 100 * (count - 1)))
const zIndexes = computed(() =>
  Array.from({ length: count }, (_, i) => count - Math.abs(active.value - i))
)

// 同步 progressRef（供 wheel handler 讀取最新值，不觸發重渲染）
function syncRef() { progressRef.value = progress.value }

let observer = null

const onWheel = (e) => {
  const p = progressRef.value
  const goingDown = e.deltaY > 0
  const goingUp   = e.deltaY < 0
  if ((p <= EPS && goingUp) || (p >= 100 - EPS && goingDown)) return
  e.preventDefault()
  e.stopPropagation()
  progress.value = clamp(p + e.deltaY * speedWheel, 0, 100)
  syncRef()
}

onMounted(() => {
  const el = sectionRef.value
  if (!el) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) el.addEventListener('wheel', onWheel, { passive: false })
        else                      el.removeEventListener('wheel', onWheel)
      })
    },
    { threshold: 0.5, rootMargin: '-10% 0px' }
  )
  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
  sectionRef.value?.removeEventListener('wheel', onWheel)
})

const onItemClick = (i) => {
  progress.value = clamp((i / (count - 1)) * 100, 0, 100)
  syncRef()
}
</script>

<template>
  <section class="mapSection">
    <div class="mapTitleBox">
      <h2 class="mapTitle">酒吧地圖</h2>
    </div>

    <div ref="sectionRef" class="map">
      <div class="carousel">
        <div
          v-for="(bar, i) in bars"
          :key="i"
          class="carousel-item"
          :style="{ '--zIndex': zIndexes[i], '--active': (i - active) / count }"
          @click="onItemClick(i)"
        >
          <RouterLink
            :to="`/bar/${bar.id}`"
            class="carousel-box"
            @click.stop
          >
            <div v-if="bar.mrt" class="mrt">{{ bar.mrt }}</div>
            <div class="title">{{ bar.title }}</div>
            <div class="num">{{ String(i + 1).padStart(2, '0') }}</div>
            <img :src="bar.img" :alt="bar.title" />
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="goToBar">
      <RouterLink class="goBarBtn" to="/Bar">前往酒吧列表</RouterLink>
    </div>
  </section>
</template>
