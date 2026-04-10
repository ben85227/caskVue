<script setup>
import '../scss/_reset.scss'
import '../scss/Footer.scss'
import fbIcon from '../assets/icon-fb.svg'
import igIcon from '../assets/icon-ig.svg'
import lineIcon from '../assets/icon-line.svg'
import fbIconHover from '../assets/icon-fb-hover.svg'
import igIconHover from '../assets/icon-ig-hover.svg'
import lineIconHover from '../assets/icon-line-hover.svg'

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <footer>
    <div class="footerMain">
      <div class="footer-spacer" />
      <small>Copyright &copy; 酒桶理論Cask Theory</small>
      <div class="footer-right">
        <ul class="social">
          <li>
            <a href="#" aria-label="Instagram">
              <img class="icon normal" :src="igIcon" alt="Instagram" />
              <img class="icon hover" :src="igIconHover" alt="Instagram hover" />
            </a>
          </li>
          <li>
            <a href="#" aria-label="Facebook">
              <img class="icon normal" :src="fbIcon" alt="Facebook" />
              <img class="icon hover" :src="fbIconHover" alt="Facebook hover" />
            </a>
          </li>
          <li>
            <a href="#" aria-label="LINE">
              <img class="icon normal" :src="lineIcon" alt="Line" />
              <img class="icon hover" :src="lineIconHover" alt="Line hover" />
            </a>
          </li>
        </ul>
        <button class="to-top-btn" aria-label="回到最上面" @click="scrollToTop">↑</button>
      </div>
    </div>
  </footer>
</template>
