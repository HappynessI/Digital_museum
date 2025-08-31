<template>
  <RomeLayout>
    <template #navigation>
      <div class="detail-nav-tabs">
        <router-link to="/shandong/f3/detail" class="nav-tab">非遗名片：山东技艺</router-link>
        <router-link to="/shandong/f3/interview" class="nav-tab" :class="{ active: $route.path === '/shandong/f3/interview' }">访谈纪要</router-link>
      </div>
    </template>

    <div class="detail-page">
      <div class="card card-fill">
        <img :src="require('@/assets/images/shandong/3.png')" class="v-img" alt="3" />
        <img :src="require('@/assets/images/shandong/4.png')" class="v-img" alt="4" />
        <img :src="require('@/assets/images/shandong/6.png')" class="v-img" alt="6" />
        <img :src="require('@/assets/images/shandong/7.png')" class="v-img" alt="7" />
      </div>
    </div>
  </RomeLayout>
</template>

<script>
import RomeLayout from '@/layouts/RomeLayout.vue'
export default { 
  name: 'ShandongF3Interviews', 
  components: { RomeLayout },
  mounted() {
    document.body.style.backgroundImage = `url(${require('@/assets/images/shandong/微信图片_2025-08-23_141956_811.png')})`
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
  },
  destroyed() { document.body.style.backgroundImage = '' }
}
</script>

<style scoped>
.detail-nav-tabs { display: flex; gap: 2rem; align-items: center; }
.nav-tab { display: block; padding: 8px 16px; color: #333; text-decoration: none; background: rgba(255,255,255,.8); border: 1px solid rgba(0,0,0,.1); border-radius: 8px; transition: all .3s ease; font-weight: 600; font-size: 14px; backdrop-filter: blur(10px); box-shadow: 0 2px 8px rgba(0,0,0,.1); }
.nav-tab:hover { color: #2563eb; background: rgba(37,99,235,.1); border-color: #2563eb; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37,99,235,.2); text-decoration: none; }
.nav-tab.active { color: #fff; background: linear-gradient(135deg,#2563eb,#1d4ed8); border-color: #2563eb; font-weight: 700; box-shadow: 0 4px 12px rgba(37,99,235,.3); }

.card { background: rgba(255,255,255,.96); border-radius: 14px; padding: 16px; box-shadow: 0 10px 30px rgba(0,0,0,.2); max-width: 1100px; margin: 0 auto; animation: fadeInUp 0.8s ease; }
.card-fill { min-height: calc(100vh - 110px); overflow: auto; }
.v-img { width: 100%; display: block; margin-bottom: 16px; border-radius: 8px }
.card-fill::-webkit-scrollbar { width: 10px; }
.card-fill::-webkit-scrollbar-thumb { background: rgba(0,0,0,.2); border-radius: 8px; }
.card-fill::-webkit-scrollbar-track { background: transparent; }

/* 动画效果 */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>



