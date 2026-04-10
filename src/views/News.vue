<script setup>
import { RouterLink } from 'vue-router'
import '../scss/News.scss'

const arrArticle = [
  { id: 1, month: 'Sept.', date: 20,   articleTitle: '【嚴選活動】', articleSub: '環遊世界品調酒｜30 杯全球精選雞尾酒', articleImg: './images/activity1.png', detailPage: '/EventDetailPage' },
  { id: 2, month: 'Sept.', date: 19,   articleTitle: '【金曲佳釀】', articleSub: '爵士及品酒之夜｜經典調酒配上爵士金曲',  articleImg: './images/activity2.png', detailPage: '/EventDetailPage' },
  { id: 3, month: 'Sept.', date: 13,   articleTitle: '【茶酒特調】', articleSub: '自己泡茶酒｜莓果白蘭地專題',            articleImg: './images/activity3.png', detailPage: '/EventDetailPage' },
  { id: 4, month: 'Sept.', date: 13,   articleTitle: '【節慶專屬】', articleSub: '中秋微醺提案－文旦柚子｜雙人體驗方案',  articleImg: './images/activity4.png', detailPage: '/EventDetailPage' },
  { id: 5, month: 'Sept.', date: '05', articleTitle: '【動手體驗】', articleSub: 'Mojito專題｜沁涼一夏－雙人體驗方案',    articleImg: './images/activity5.png', detailPage: '/EventDetailPage' },
  { id: 6, month: 'Sept.', date: '05', articleTitle: '【嚴選活動】', articleSub: '環遊世界品調酒｜30 杯全球精選雞尾酒',   articleImg: './images/activity1.png', detailPage: '/EventDetailPage' },
  { id: 7, month: 'Aug.',  date: '30', articleTitle: '【金曲佳釀】', articleSub: '爵士及品酒之夜｜經典調酒配上爵士金曲',  articleImg: './images/activity2.png', detailPage: '/EventDetailPage' },
  { id: 8, month: 'Aug.',  date: '29', articleTitle: '【茶酒特調】', articleSub: '自己泡茶酒｜莓果白蘭地專題',            articleImg: './images/activity3.png', detailPage: '/EventDetailPage' },
  { id: 9, month: 'Aug.',  date: '22', articleTitle: '【節慶專屬】', articleSub: '中秋微醺提案－文旦柚子｜雙人體驗方案',  articleImg: './images/activity4.png', detailPage: '/EventDetailPage' },
]
</script>

<template>
  <section class="Ian_news">
    <div class="Ian_mainArea">
      <div class="Ian_title">
        <h1>酒吧活動消息</h1>
      </div>

      <div class="Ian_articleArea">
        <RouterLink
          v-for="article in arrArticle"
          :key="article.id"
          class="Ian_goDetailPage"
          :to="article.detailPage"
        >
          <div class="Ian_articleBody">
            <div class="Ian_dateBox">
              <div class="Ian_decorateBox">
                <div class="Ian_decorateUpBox"></div>
                <div class="Ian_decorateDownBox"></div>
              </div>
              <div class="Ian_articleDate">
                <div class="Ian_month">{{ article.month }}</div>
                <div class="Ian_date">{{ article.date }}</div>
              </div>
            </div>
            <div class="Ian_articleMain">
              <div class="Ian_textBox">
                <h2 class="Ian_articleTitle">{{ article.articleTitle }}</h2>
                <h3 class="Ian_articleSub">{{ article.articleSub }}</h3>
              </div>
              <div class="Ian_imgBox">
                <img :src="article.articleImg" class="Ian_articleImg" alt="" />
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
