<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import '../scss/_reset.scss'
import '../scss/Navbar.scss'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleScroll = (e, id) => {
  e.preventDefault()
  const target = document.querySelector(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
  isOpen.value = false
}
</script>

<template>
  <div id="topbar">
    <div class="logo">
      <RouterLink to="/">酒桶理論</RouterLink>
    </div>
    <div class="navbar">
      <button
        :class="['hamburger', { 'is-active': isOpen }]"
        @click="toggleMenu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <nav :class="['navigation', { show: isOpen }]">
        <ul class="menu">
          <li><RouterLink to="/News">最新消息</RouterLink></li>
          <li><RouterLink to="/Illustrations">酒精圖鑑</RouterLink></li>
          <li><RouterLink to="/Bar">酒吧地圖</RouterLink></li>
          <li><RouterLink to="/BarRoute">路跑路線</RouterLink></li>
          <li><RouterLink to="/About">關於我們</RouterLink></li>
        </ul>
      </nav>
    </div>
  </div>
</template>
