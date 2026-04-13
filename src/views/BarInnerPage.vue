<script setup>
import { ref, computed, watch } from 'vue'
const base = import.meta.env.BASE_URL
import { useRoute, useRouter } from 'vue-router'
import { allBars } from '../data/barData.js'
import '../scss/BarInnerPage.scss'

const route  = useRoute()
const router = useRouter()

const currentImageIndex = ref(0)

const id = computed(() => parseInt(route.params.id))

const currentBar = computed(() => allBars.find(bar => bar.id === id.value))

const recommendedBars = computed(() => {
  const available = allBars.filter(bar => bar.id !== id.value)
  return [...available].sort(() => 0.5 - Math.random()).slice(0, 3)
})

// id 改變時重置輪播索引
watch(id, () => { currentImageIndex.value = 0 })

const handlePrevImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % recommendedBars.value.length
}

const goToBar = (barId) => {
  router.push(`/bar/${barId}`)
}

const displayBars = computed(() => {
  if (!recommendedBars.value.length) return []
  const first  = recommendedBars.value[currentImageIndex.value]
  const second = recommendedBars.value[(currentImageIndex.value + 1) % recommendedBars.value.length]
  return [first, second]
})
</script>

<template>
  <main v-if="currentBar" class="BI_bar-inner">
    <!-- 主要內容區域 -->
    <section class="BI_hero-section">
      <div class="BI_content-wrapper">
        <!-- 左側資訊區塊 -->
        <div class="BI_info-panel">
          <h1 class="BI_bar-name">{{ currentBar.name }}</h1>
          <div class="BI_bar-details">
            <div class="BI_detail-item">
              <span class="BI_label">地址：</span>
              <span class="BI_value">{{ currentBar.address }}</span>
            </div>
            <div class="BI_detail-item">
              <span class="BI_label">電話：</span>
              <span class="BI_value">{{ currentBar.phone }}</span>
            </div>
            <div class="BI_detail-item">
              <span class="BI_label">營業時間：</span>
              <span class="BI_value">{{ currentBar.hours }}</span>
            </div>
          </div>
          <div class="BI_description">
            <p>{{ currentBar.descriptionInner }}</p>
          </div>
        </div>

        <!-- 右側主圖 -->
        <div class="BI_main-image">
          <img
            :src="currentBar.images?.[0] || `${base}images/barListCard1.png`"
            :alt="currentBar.name"
          />
          <div class="BI_corner-accent BI_corner-bottom-left">
            <img :src="`${base}images/BI_corner-bottom-left.png`" alt="L形裝飾" />
          </div>
        </div>
      </div>
    </section>

    <!-- 推薦酒吧區域 -->
    <section class="BI_recommended-section">
      <div class="BI_recommended-container">
        <button class="BI_nav-btn" @click="handlePrevImage">
          <img :src="`${base}images/barInnerPage-left-arrow.png`" alt="左側切換按鈕" />
        </button>

        <div class="BI_corner-accent BI_corner-top-left">
          <img :src="`${base}images/BI_corner-top-left.png`" alt="L形裝飾" />
        </div>

        <div class="BI_recommended-images">
          <div
            v-for="(bar, displayIndex) in displayBars"
            :key="`${bar.id}-${displayIndex}`"
            :class="['BI_recommended-item', displayIndex === 0 ? 'active' : 'next']"
            @click="goToBar(bar.id)"
          >
            <div class="BI_recommended-image">
              <img
                :src="bar.images?.[0] || `${base}images/barListCard1.png`"
                :alt="bar.name"
              />
              <div class="BI_image-overlay">
                <div class="BI_overlay-name">{{ bar.name }}</div>
                <div class="BI_overlay-station">{{ bar.line }} - {{ bar.station }}</div>
                <div class="BI_overlay-desc">{{ bar.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="BI_back-button-container">
        <button class="BI_back-button" @click="router.push('/Bar')">返回酒吧地圖</button>
      </div>
    </section>
  </main>
</template>
