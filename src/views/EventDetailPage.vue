<script setup>
import { RouterLink } from 'vue-router'
import '../scss/EventDetailPage.scss'

const heroImg = '/images/eventDetailPage_heroBannerImg.png'
const infoImg1 = '/images/eventDetailPage_infoImg1.png'
const infoImg2 = '/images/eventDetailPage_infoImg2.png'
</script>

<template>
  <main class="eventDetailPage">
    <!-- Hero -->
    <section class="a_heroSection">
      <div class="a_heroBanner">
        <img class="a_heroImg" :src="heroImg" alt="活動主視覺" />
        <div class="a_heroRibbon">禁止酒駕 酒後不開車 安全有保障</div>
      </div>

      <div class="heroMeta">
        <ul class="heroChips">
          <li class="chip"># 東門站</li>
          <li class="chip"># 品酒</li>
          <li class="chip"># 音樂欣賞</li>
        </ul>
        <ul class="heroStats">
          <li>👁 785</li>
          <li>♡ 85</li>
        </ul>
      </div>

      <h1 id="eventTitle" class="heroTitle">
        【金曲佳釀】｜爵士及品酒之夜｜經典調酒配上爵士金曲
      </h1>
    </section>

    <!-- 活動資訊區 -->
    <section class="a_infoSection">
      <div class="a_infoBlock">
        <div class="a_infoCard">
          <h2 class="a_blockTitle">活動資訊</h2>
          <p class="a_textBox">時間：每週四 20:00–23:30</p>
          <p class="a_textBox">地點：The Gilded Drop</p>
          <p class="a_textBox">
            活動亮點：現場爵士演出 — 薩克斯風、貝斯與琴鍵交織，沉浸式音樂體驗主題調酒限量供應 —
            向爵士年代致敬的復古酒款紳士與淑女之夜 — 穿上復古時尚，享受爵士的浪漫與自由
          </p>
        </div>
        <figure class="a_photoBlock1">
          <img class="a_photo" :src="infoImg1" alt="活動現場照片 1" />
        </figure>
      </div>
    </section>

    <!-- 活動簡介區 -->
    <section class="a_introSection">
      <div class="a_introBlock">
        <figure class="a_photoBlock2">
          <img class="a_photo" :src="infoImg2" alt="活動現場照片 2" />
        </figure>
        <div class="a_introCard">
          <h2 class="a_blockTitle">活動簡介</h2>
          <p class="a_textBox">紳士品酒之夜《JAZZ NIGHT》</p>
          <p class="a_textBox">金曲佳釀，為經典致敬。</p>
          <p class="a_textBox">
            紳士及品酒之夜，是一場專屬於靈魂、風格與品味的沉醉體驗。這不是一場喧鬧的派對，而是一種對優雅年代的浪漫致敬。在爵士薩克斯的柔情與低音中，酒香與旋律緩緩交織，每一口酒都像一段旋律，每一個音符都如微醺的呢喃。我們邀請您，走入這個屬於紳士與淑女的時光場域。舉杯相邀、輕聲交談，讓風格成為你的語言，讓夜晚，成為記憶中最溫柔的一段樂章。
          </p>
        </div>
      </div>
    </section>

    <!-- 地圖 + 交通方式 -->
    <section class="a_mapSection">
      <div class="a_mapBlock">
        <h2 class="a_blockTitle">活動地圖</h2>
        <div class="mapCard">
          <iframe
            class="a_mapIframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7546295681077!2d121.5254698!3d25.0423998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a970a11a84ad%3A0x58e05f2528812097!2z5ZyL56uL6Ie65YyX5ZWG5qWt5aSn5a24!5e0!3m2!1szh-TW!2stw!4v1753778275399!5m2!1szh-TW!2stw"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div class="a_trafficCard">
        <h2 class="a_blockTitle">交通資訊</h2>
        <div class="a_textBox">
          <p>地址：台北市中山區忠孝西路 238 號</p>
          <p>大眾運輸：捷運東門站 2 號出口步行 5 分鐘，或可搭212、262 公車至忠孝東路站。</p>
          <p>代客叫車：櫃台可協助</p>
        </div>
      </div>
    </section>

    <!-- 推薦區 -->
    <section class="eventDetailRecommendSection">
      <h2 class="eventDetailRecommendTitle">猜你喜歡...</h2>
      <div class="a_recList">
        <RouterLink to="/EventDetailPage" class="a_recCard">
          <img class="a_recCardImage" src="/images/eventDetialRec1.png" alt="【嚴選活動】｜環遊世界品調酒" loading="lazy" />
          <div class="a_recCardBody">
            <p class="a_recCardMeta">2025.09.20(六)17:00-20:00</p>
            <h3 class="a_recCardTitle">【嚴選活動】｜環遊世界品調酒｜30 杯全球精選雞尾酒 DIY</h3>
          </div>
          <div class="a_recCardFooter">
            <span class="a_recCardTag">#圓山</span>
            <div class="a_recCardStats">
              <span class="a_recCardStat"><span aria-hidden="true">👁</span> 785</span>
              <span class="a_recCardStat"><span aria-hidden="true">♡</span> 85</span>
            </div>
          </div>
        </RouterLink>

        <RouterLink to="/EventDetailPage" class="a_recCard">
          <img class="a_recCardImage" src="/images/eventDetialRec2.png" alt="【嚴選活動】｜環遊世界品調酒" loading="lazy" />
          <div class="a_recCardBody">
            <p class="a_recCardMeta">2025.09.20(六)17:00-20:00</p>
            <h3 class="a_recCardTitle">【嚴選活動】｜環遊世界品調酒｜30 杯全球精選雞尾酒 DIY</h3>
          </div>
          <div class="a_recCardFooter">
            <span class="a_recCardTag">#圓山</span>
            <div class="a_recCardStats">
              <span class="a_recCardStat"><span aria-hidden="true">👁</span> 785</span>
              <span class="a_recCardStat"><span aria-hidden="true">♡</span> 85</span>
            </div>
          </div>
        </RouterLink>

        <RouterLink to="/EventDetailPage" class="a_recCard">
          <img class="a_recCardImage" src="/images/eventDetialRec2.png" alt="【嚴選活動】｜環遊世界品調酒" loading="lazy" />
          <div class="a_recCardBody">
            <p class="a_recCardMeta">2025.09.20(六)17:00-20:00</p>
            <h3 class="a_recCardTitle">【嚴選活動】｜環遊世界品調酒｜30 杯全球精選雞尾酒 DIY</h3>
          </div>
          <div class="a_recCardFooter">
            <span class="a_recCardTag">#圓山</span>
            <div class="a_recCardStats">
              <span class="a_recCardStat"><span aria-hidden="true">👁</span> 785</span>
              <span class="a_recCardStat"><span aria-hidden="true">♡</span> 85</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- 返回按鈕 -->
    <div class="a_backButtonBox">
      <RouterLink class="a_goNewsBtn" to="/News">返回消息列表</RouterLink>
    </div>
  </main>
</template>
