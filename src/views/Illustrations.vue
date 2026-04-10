<script setup>
import { ref, computed } from 'vue'
import SideTOC from '../components/SideTOC.vue'
import WCard from '../components/WCard.vue'
import Modal from '../components/Modal.vue'
import IllustrationsInnerPages from '../components/IllustrationsInnerPages.vue'
import '../scss/illustrations.scss'
import '../scss/side-toc.scss'

const keyword = ref('')
const isModalOpen = ref(false)
const selectedDrink = ref('')

const NAV_OFFSET = 60
const EXTRA = 8

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const idx = el.querySelector('.w_section_idx')
  const target = idx ?? el
  let offset = NAV_OFFSET + EXTRA
  const sticky = document.querySelector('.w_search_wrap')
  if (sticky) {
    const cs = getComputedStyle(sticky)
    if (cs.position === 'sticky') {
      const topPx = parseFloat(cs.top || '0') || 0
      offset += topPx + sticky.offsetHeight / 2
    }
  }
  const y = target.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

// 靜態資料（無需響應式）
const base = [
  { zh: '伏特加', en: 'Vodka',   img: './images/Vodka.png' },
  { zh: '琴酒',   en: 'Gin',     img: './images/Gin.png' },
  { zh: '蘭姆酒', en: 'Rum',     img: './images/Rum.png' },
  { zh: '龍舌蘭', en: 'Tequila', img: './images/Tequila.png' },
  { zh: '威士忌', en: 'Whiskey', img: './images/Whiskey.png' },
  { zh: '白蘭地', en: 'Brandy',  img: './images/Brandy.png' },
]

const classics = [
  { zh: '黛綺麗',   en: 'Daiquiri', img: './images/Daiquiri.png' },
  { zh: '內格羅尼', en: 'Negroni',  img: './images/Negroni.png' },
  { zh: '邊車',     en: 'Sidecar',  img: './images/Sidecar.png' },
]

const standard = [
  { zh: '柯夢波丹', en: 'Cosmopolitan',       img: './images/Cosmopolitan.png' },
  { zh: '長島冰茶', en: 'Long Island Iced Tea', img: './images/LongIslandIcedTea.png' },
  { zh: '龍舌蘭日出', en: 'Tequila Sunrise',  img: './images/TequilaSunrise.png' },
]

const handleCardClick = (drinkName) => {
  let drinkKey = drinkName
  if (drinkName === 'Long Island Iced Tea') drinkKey = 'LongIslandIcedTea'
  else if (drinkName === 'Tequila Sunrise') drinkKey = 'TequilaSunrise'
  selectedDrink.value = drinkKey
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  selectedDrink.value = ''
}

const q = computed(() => keyword.value.trim().toLowerCase())
const isSearching = computed(() => q.value.length > 0)

const match = (item) =>
  !q.value ||
  item.zh.includes(keyword.value.trim()) ||
  item.en.toLowerCase().includes(q.value)

const baseF     = computed(() => base.filter(match))
const classicsF = computed(() => classics.filter(match))
const standardF = computed(() => standard.filter(match))
const empty     = computed(() => !baseF.value.length && !classicsF.value.length && !standardF.value.length)
const combinedF = computed(() => [...baseF.value, ...classicsF.value, ...standardF.value])

const align = (i) => (Math.floor(i / 3) % 2 === 0 ? 'left' : 'right')
</script>

<template>
  <div class="w_illusAll">
    <section class="w_hero_full">
      <div class="w_hero_mask" />
      <div class="w_hero_inner">
        <div class="w_hero_panel">
          <h3>今日推薦</h3>
          <h2>邊車 <span>Side car</span></h2>
          <p>
            經典入口時酸甜均衡，口感清爽且酒體集中，既優雅又具力道。<br />
            具代表性的經典調酒，酸甜的口感相當適合夏天入口。
          </p>
        </div>
        <div class="w_hero_center">
          <h1 class="w_hero_vtitle">酒精圖鑑</h1>
        </div>
        <div class="w_hero_spacer" aria-hidden="true" />
      </div>
    </section>

    <div class="w_search_wrap">
      <div class="w_search_tabs" role="tablist" aria-label="章節切換">
        <button type="button" class="w_tab" @click="scrollTo('w_base')">六大基酒</button>
        <button type="button" class="w_tab" @click="scrollTo('w_classics')">經典調酒</button>
        <button type="button" class="w_tab" @click="scrollTo('w_standard')">大眾調酒</button>
      </div>
      <label class="barSearch">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" fill="none" stroke-width="2" />
          <line x1="16.65" y1="16.65" x2="22" y2="22" stroke="currentColor" stroke-width="2" />
        </svg>
        <input
          v-model="keyword"
          type="search"
          placeholder="搜尋酒種"
          aria-label="搜尋酒種"
        />
      </label>
    </div>

    <main :class="['w_illustrations', { 'is-searching': isSearching }]" style="min-height: calc(100vh - 320px)">
      <SideTOC v-if="!isSearching" />

      <!-- 搜尋空結果 -->
      <section v-if="isSearching && empty" aria-live="polite" class="w_container w_search_empty">
        <p style="color: #777; padding: 16px 6px">找不到符合「{{ keyword }}」的結果，請試試其他關鍵字。</p>
      </section>

      <!-- 合併搜尋結果 -->
      <section v-if="isSearching && !empty" aria-live="polite" class="w_container w_search_results">
        <div class="w_cards">
          <WCard
            v-for="(c, i) in combinedF"
            :key="`${c.en}-${c.zh}`"
            :zh="c.zh"
            :en="c.en"
            :img="c.img"
            :highlight="keyword.trim()"
            :align="align(i)"
          />
        </div>
      </section>

      <!-- 正常三區段 -->
      <template v-if="!isSearching">
        <!-- 01 六大基酒 -->
        <section id="w_base" data-w-toc>
          <header class="w_section_title">
            <div class="w_section_wrap">
              <span class="w_section_idx">01</span>
              <div class="w_section_bar">
                <h2 class="w_section_zh">六大基酒</h2>
                <h3 class="w_section_en">Six Base Spirits</h3>
              </div>
            </div>
          </header>
          <div class="w_container">
            <div class="w_cards">
              <WCard
                v-for="(c, i) in baseF"
                :key="c.en"
                :zh="c.zh"
                :en="c.en"
                :img="c.img"
                :highlight="keyword.trim()"
                :align="align(i)"
                :on-click="handleCardClick"
              />
            </div>
          </div>
        </section>

        <!-- 02 經典調酒 -->
        <section id="w_classics" data-w-toc>
          <header class="w_section_title">
            <div class="w_section_wrap">
              <span class="w_section_idx">02</span>
              <div class="w_section_bar">
                <h2 class="w_section_zh">經典調酒</h2>
                <h3 class="w_section_en">Classic Cocktails</h3>
              </div>
            </div>
          </header>
          <div class="w_container">
            <div class="w_cards">
              <WCard
                v-for="(c, i) in classicsF"
                :key="c.en"
                :zh="c.zh"
                :en="c.en"
                :img="c.img"
                :highlight="keyword.trim()"
                :align="align(i)"
                :on-click="handleCardClick"
              />
            </div>
          </div>
        </section>

        <!-- 03 大眾調酒 -->
        <section id="w_standard" data-w-toc>
          <header class="w_section_title">
            <div class="w_section_wrap">
              <span class="w_section_idx">03</span>
              <div class="w_section_bar">
                <h2 class="w_section_zh">大眾調酒</h2>
                <h3 class="w_section_en">Bar Standard</h3>
              </div>
            </div>
          </header>
          <div class="w_container">
            <div class="w_cards">
              <WCard
                v-for="(c, i) in standardF"
                :key="c.en"
                :zh="c.zh"
                :en="c.en"
                :img="c.img"
                :highlight="keyword.trim()"
                :align="align(i)"
                :on-click="handleCardClick"
              />
            </div>
          </div>
        </section>
      </template>
    </main>

    <!-- Modal -->
    <Modal :is-open="isModalOpen" @close="handleCloseModal">
      <IllustrationsInnerPages :drink-type="selectedDrink" />
    </Modal>
  </div>
</template>
