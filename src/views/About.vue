<script setup>
import { RouterLink } from 'vue-router'
import '../scss/About.scss'
</script>

<template>
  <section class="Ian_aboutFirst">
    <div class="Ian_firstText">
      <div class="Ian_firstMain">
        <div class="Ian_aboutRwdTitle">
          <h1>AboutUs</h1>
        </div>
        <div class="Ian_boutBox">
          <div class="Ian_bout">
            <img src="/images/bout.png" alt="" />
          </div>
        </div>
        <div class="Ian_aboutText1Box">
          <div class="Ian_aboutText1">
            <h2>Cask Theory團隊</h2>
          </div>
        </div>
        <div class="Ian_aboutText2">
          <p>還記得嗎？</p><br />
          <p>夜晚不一定要熱鬧，有時候只是一杯酒，</p><br />
          <p>就能替今天收個尾。</p><br />
        </div>
        <div class="Ian_us">
          <img src="/images/us.png" alt="" />
        </div>
      </div>
    </div>
  </section>

  <section class="Ian_aboutSecond">
    <div class="Ian_aboutFunction">
      <div class="Ian_functionText">
        <p>整合雙北酒吧與餐酒館資訊，讓夜晚選擇變得更簡單多元</p>
        <p>豐富酒類介紹，從基酒到調酒，完整收錄、一目瞭然</p>
        <p>獨家設計的酒精路跑路線圖，幫助沒有靈感的夜晚找到方向</p>
        <p>精緻會員收藏頁，將喜愛的酒種與酒吧加入口袋名單，創建個人專屬收藏庫</p>
      </div>
      <div class="Ian_functionTitle">
        <h2>核心功能</h2>
      </div>
    </div>
  </section>

  <section class="Ian_aboutThird">
    <div class="Ian_storyDecorateBox">
      <div class="Ian_storyDecorateBox1"></div>
      <div class="Ian_storyTitle"><h2>我們的故事</h2></div>
      <div class="Ian_storyDecorateBox2"></div>
    </div>
    <div class="Ian_storyText1">
      <p>我們熱愛酒吧文化，也熱愛調酒的世界。</p>
      <p>但夜晚選擇豐富，常讓人難以決定該走進哪間店，或舉起哪一杯。</p>
    </div>
    <div class="Ian_storyPhotoPart">
      <div class="Ian_storyPhoto">
        <img src="/images/about1.png" alt="" />
        <img src="/images/about2.png" alt="" />
        <img src="/images/about3.png" alt="" />
        <img src="/images/about4.png" alt="" />
        <img src="/images/about5.png" alt="" />
      </div>
      <div class="Ian_storyText2">
        <p>但我們明白，酒吧與調酒從來不只是飲品，它們是夜色的一部分，</p>
        <p>是讓相遇更偶然、回憶更悠長的理由。</p>
      </div>
    </div>
    <div class="Ian_storyText3">
      <p>所以我們把它們收集起來，化作地圖、圖鑑與幾條路線，</p>
      <p>希望讓夜晚不再複雜，只是簡單地，留下屬於你的微醺時光。</p>
    </div>
    <div class="Ian_storyText4">
      <p>「我為那些不喝酒的人感到惋惜，他們一早醒來，就再也不會有比那更美好的感受了。」</p>
      <p>"I feel sorry for people who don't drink. When they wake up in the morning,</p>
      <p>that's as good as they're going to feel all day."</p>
      <p>－frank sinatra(1915-1998)</p>
    </div>
    <div class="Ian_storyBtn">
      <RouterLink to="/">
        <button class="Ian_backHomeBTN">回首頁</button>
      </RouterLink>
    </div>
  </section>
</template>
