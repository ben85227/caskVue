<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import MapCarousel from '../components/MapCarousel.vue'
import '../scss/Home.scss'

// 圖鑑區資料
const IlluData = {
  base: {
    zh: '六大基酒',
    en: 'Base Spirit',
    desc: '「六大基酒是文化的基礎，麥芽與橡木、杜松與草本、甘蔗與果香...，從原料到工藝，乘載著各式風味的可能性，體驗飲酒文化就從基酒開始。」',
    imgs: [
      { src: 'images/newvodka.png', alt: '伏特加' },
      { src: 'images/image17.png', alt: '威士忌' },
      { src: 'images/Subtract.png', alt: '琴酒' },
    ],
  },
  classic: {
    zh: '經典調酒',
    en: 'Classic Cocktail',
    desc: '「經典雞尾酒是時代的縮影，苦艾與琴酒、蘭姆與果汁、威士忌與苦精...，從比例到平衡，凝聚著歷史的記憶與美感，探索調酒文化就從經典開始。」',
    imgs: [
      { src: 'images/newvodka.png', alt: '伏特加' },
      { src: 'images/image17.png', alt: '威士忌' },
      { src: 'images/Subtract.png', alt: '琴酒' },
    ],
  },
  popular: {
    zh: '大眾調酒',
    en: 'Popular Cocktail',
    desc: '「大眾調酒是日常的陪伴，啤酒與汽水、伏特加與果茶、清酒與果汁...，從輕鬆到歡聚，蘊藏著親切熟悉的味道與氛圍，享受飲酒文化就從大眾開始。」',
    imgs: [
      { src: 'images/newvodka.png', alt: '伏特加' },
      { src: 'images/image17.png', alt: '威士忌' },
      { src: 'images/Subtract.png', alt: '琴酒' },
    ],
  },
}

// 新聞數據
const newsData = [
  { id: 1, title: '【嚴選活動】｜環遊世界品調酒｜30 杯全球精選雞尾酒 DIY', image: 'images/newsPoster1.jpg' },
  { id: 2, title: '【金曲佳釀】｜爵士及品酒之夜｜經典調酒配上爵士金曲', image: 'images/newsPoster2.jpg' },
  { id: 3, title: '【茶酒特調】｜自己泡茶酒｜莓果白蘭地專題', image: 'images/newsPoster3.jpg' },
  { id: 4, title: '【節慶專屬】｜中秋微醺提案－文旦柚子｜雙人體驗方案', image: 'images/newsPoster4.jpg' },
  { id: 5, title: '【動手體驗】｜Mojito專題-沁涼一夏｜雙人體驗方案', image: 'images/newsPoster5.jpg' },
]

// 輪播狀態
const currentIndex = ref(0)
const isAutoPlaying = ref(true)
let timer = null

const startAutoPlay = () => {
  stopAutoPlay()
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % newsData.length
  }, 4000)
}

const stopAutoPlay = () => {
  if (timer) clearInterval(timer)
  timer = null
}

onMounted(() => startAutoPlay())
onUnmounted(() => stopAutoPlay())

watch(isAutoPlaying, (val) => {
  if (val) startAutoPlay()
  else stopAutoPlay()
})

// 處理 hover 事件
const handleMouseEnter = (index) => {
  isAutoPlaying.value = false
  currentIndex.value = index
}

const handleMouseLeave = () => {
  isAutoPlaying.value = true
}

// 點擊圓點跳至指定項目，5 秒後恢復自動播放
const goToSlide = (index) => {
  currentIndex.value = index
  isAutoPlaying.value = false
  setTimeout(() => { isAutoPlaying.value = true }, 5000)
}

// 圖鑑 tab
const tab = ref('base')
const data = computed(() => IlluData[tab.value])
const onPick = (key) => { tab.value = key }
</script>

<template>
  <main class="home">

    <!-- Hero 區 -->
    <section class="hero">
      <div class="heroLeft">
        <h1 class="brand">
          <span class="brandLine brandLine--top">Cask</span>
          <span class="brandLine brandLine--bottom">
            Theory
            <span class="brandZh">酒桶理論</span>
          </span>
        </h1>
      </div>
      <div class="heroRightTop">
        <img src="/images/man-is-pouring-strong-alcohol-drink-into-glass.jpg" alt="酒吧吧台與酒杯" />
      </div>
      <div class="heroLeftBottom">
        <img src="/images/half-lime-with-cocktail-drink-garnish-with-cocktail-white-desk.jpg" alt="酒吧吧台與酒杯" />
      </div>
      <div class="heroRightBottom">
        <p class="slogan">「從經典到創新，打開<span class="Bartending">調酒</span>的全景視野」</p>
      </div>
    </section>

    <!-- 最新消息 -->
    <section class="news">
      <!-- 左：直排標題 -->
      <div class="newsLeft">
        <div class="newsN"><p>N</p></div>
        <div class="newsTitle"><h2>酒吧活動消息</h2></div>
      </div>

      <!-- 中：宣傳海報 -->
      <div class="newsPoster">
        <div class="posterContainer">
          <img
            v-for="(item, index) in newsData"
            :key="item.id"
            :src="item.image"
            :alt="item.title"
            :class="['posterImage', { active: index === currentIndex }]"
          />
        </div>
        <div class="carouselDots">
          <button
            v-for="(_, index) in newsData"
            :key="index"
            :class="['dot', { active: index === currentIndex }]"
            @click="goToSlide(index)"
          />
        </div>
      </div>

      <!-- 右：新聞列表 -->
      <div class="newsright">
        <div class="newsList">
          <ul @mouseleave="handleMouseLeave">
            <li
              v-for="(item, index) in newsData"
              :key="item.id"
              :class="{ active: index === currentIndex }"
              @mouseenter="handleMouseEnter(index)"
            >
              <RouterLink to="/EventDetailPage">{{ item.title }}</RouterLink>
            </li>
          </ul>
          <RouterLink class="goNewsBtn" to="/News">前往最新消息</RouterLink>
        </div>
        <div class="newsWs"><p>Ws</p></div>
      </div>
    </section>

    <!-- 酒吧地圖 -->
    <MapCarousel />

    <!-- 路跑路線 -->
    <section class="route">
      <h2 class="routeTitle">酒精路跑路線</h2>
      <div class="routeCards">
        <a class="routeCard1" href="#">
          <img src="/images/route1.jpg" alt="" />
          <div class="info">
            <span class="num">推薦路線 1</span>
            <h3 class="title">善導寺微醺漫步</h3>
          </div>
        </a>
        <a class="routeCard2" href="#">
          <img src="/images/route2.jpg" alt="" />
          <div class="info">
            <span class="num">推薦路線 2</span>
            <h3 class="title">中山站醉意市集</h3>
          </div>
        </a>
        <a class="routeCard3" href="#">
          <img src="/images/route3.jpg" alt="" />
          <div class="info">
            <span class="num">推薦路線 3</span>
            <h3 class="title">信義奢華浪漫之旅</h3>
          </div>
        </a>
      </div>
    </section>

    <!-- 酒精圖鑑 -->
    <section class="Illustrations">
      <div class="leftImg">
        <img src="/images/glass.png" alt="酒杯裝飾" />
      </div>

      <div class="Illustrations-nav">
        <h2>酒精圖鑑</h2>
        <div class="navBtn">
          <button :class="{ active: tab === 'base' }" @click="onPick('base')">六大基酒</button>
          <button :class="{ active: tab === 'classic' }" @click="onPick('classic')">經典調酒</button>
          <button :class="{ active: tab === 'popular' }" @click="onPick('popular')">大眾調酒</button>
        </div>
      </div>

      <div class="Illustrations-body">
        <div class="Illustrations-introduce">
          <div class="introduce-title">
            <h2 class="titleZh">{{ data.zh }}</h2>
            <span class="titleEn">{{ data.en }}</span>
          </div>
          <p>{{ data.desc }}</p>
          <div class="cardRow">
            <img v-for="(it, i) in data.imgs" :key="i" :src="it.src" :alt="it.alt" />
          </div>
          <RouterLink class="goIllBtn" to="/Illustrations">前往圖鑑目錄</RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>
