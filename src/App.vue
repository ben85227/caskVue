<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import './scss/side-toc.scss'
</script>

<template>
  <div class="wrap">
    <Navbar />
    <div class="frist">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>


<style lang="scss">
</style>
