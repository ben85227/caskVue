<script setup>
import { ref, computed } from 'vue'
import BarCard from '../components/BarCard.vue'
import { allBars, mrtLines } from '../data/barData.js'
import '../scss/Bar.scss'

const selectedLine = ref('全部')
const searchQuery  = ref('')
const activeTab    = ref('全部')

const filteredBars = computed(() => {
  let filtered = allBars

  if (selectedLine.value !== '全部')
    filtered = filtered.filter(bar => bar.line === selectedLine.value)

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(bar =>
      bar.name.toLowerCase().includes(q) ||
      bar.station.toLowerCase().includes(q) ||
      bar.description.toLowerCase().includes(q)
    )
  }

  if (activeTab.value === '熱門')
    filtered = filtered.filter(bar => bar.type === '熱門')
  else if (activeTab.value === '最新')
    filtered = filtered.filter(bar => bar.type === '最新')

  return filtered
})

const selectedLineColor = computed(() => {
  const line = mrtLines.find(l => l.name === selectedLine.value)
  return line ? line.color : '#ED972E'
})

const filterStyle = computed(() => ({
  color: selectedLineColor.value,
  borderLeft: `3px solid ${selectedLineColor.value}`,
  paddingLeft: '15px',
}))

const lineTagStyle = computed(() => ({
  color: selectedLineColor.value,
  fontWeight: 'bold',
  marginLeft: '8px',
  padding: '2px 8px',
  borderRadius: '12px',
  backgroundColor: `${selectedLineColor.value}20`,
  border: `1px solid ${selectedLineColor.value}50`,
}))

const showFilterInfo = computed(() =>
  searchQuery.value || selectedLine.value !== '全部' || activeTab.value !== '全部'
)

const getCardLayout = (index) => {
  const layouts = ['horizontal','square','square','square','square','vertical','horizontal','square','vertical','horizontal','square','horizontal','horizontal','square']
  return layouts[index] ?? 'square'
}
</script>

<template>
  <main class="B_bar">
    <section class="B_barHero">
      <h1 class="B_barHeroTitle">酒吧地圖</h1>
      <div class="B_barHeroFilter">
        <ul class="B_mrtList">
          <li v-for="line in mrtLines" :key="line.name" class="B_mrtItem">
            <button
              :class="['B_mrtBtn', { active: selectedLine === line.name }]"
              @click="selectedLine = line.name"
            >
              {{ line.name }}
            </button>
            <span class="B_mrtLine" :style="{ '--line-color': line.color }" />
          </li>
        </ul>

        <div class="B_barControls">
          <div class="B_tabs">
            <button :class="['B_tab', { active: activeTab === '全部' }]" @click="activeTab = '全部'">全部</button>
            <button :class="['B_tab', { active: activeTab === '熱門' }]" @click="activeTab = '熱門'">熱門</button>
            <button :class="['B_tab', { active: activeTab === '最新' }]" @click="activeTab = '最新'">最新</button>
          </div>

          <label class="B_barSearch">
            <svg class="B_icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" fill="none" stroke-width="2" />
              <line x1="16.65" y1="16.65" x2="22" y2="22" stroke="currentColor" stroke-width="2" />
            </svg>
            <input v-model="searchQuery" type="search" placeholder="搜尋酒吧" aria-label="搜尋酒吧" />
          </label>
        </div>
      </div>
    </section>

    <!-- 篩選結果提示 -->
    <div v-if="showFilterInfo" class="B_filter-info" :style="filterStyle">
      <span>找到 </span>
      <span style="font-weight: bold; font-size: 16px">{{ filteredBars.length }}</span>
      <span> 間酒吧</span>
      <span v-if="searchQuery" style="color: #ED972E; margin-left: 8px">(搜尋: "{{ searchQuery }}")</span>
      <span v-if="selectedLine !== '全部'" :style="lineTagStyle">路線: {{ selectedLine }}</span>
      <span
        v-if="activeTab !== '全部'"
        :style="{ color: activeTab === '熱門' ? '#ff6b35' : '#e74c3c', marginLeft: '8px', fontWeight: 'bold' }"
      >(類型: {{ activeTab }})</span>
    </div>

    <!-- 酒吧卡片網格 -->
    <section class="B_bar-grid">
      <BarCard
        v-if="filteredBars.length > 0"
        v-for="(bar, index) in filteredBars"
        :key="bar.id"
        :bar="bar"
        :card-type="getCardLayout(index)"
      />
      <div v-else class="B_no-results">
        <p>沒有找到符合條件的酒吧</p>
      </div>
    </section>
  </main>
</template>
