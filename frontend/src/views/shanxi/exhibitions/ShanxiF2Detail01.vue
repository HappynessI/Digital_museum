<template>
  <Rome2Layout>
    <!-- 传递导航标签到header -->
    <template #navigation>
      <div class="detail-nav-tabs">
        <router-link 
          to="/Detail11" 
          class="nav-tab"
          :class="{ active: $route.path === '/Detail11' }"
        >
          非遗名片：闻喜花馍
        </router-link>
        <router-link 
          to="/Detail12" 
          class="nav-tab"
        >
          访谈纪要
        </router-link>
        <router-link 
          to="/Detail13" 
          class="nav-tab"
        >
          实践风采
        </router-link>
      </div>
    </template>
    
    <div class="f3-detail1-page">
      <!-- 内容区域 -->
      <div class="content-area">
        <div class="content-wrapper">
          <img 
            :src="require('@/assets/images/花馍介绍.jpg')" 
            alt="闻喜花馍介绍"
            class="detail-image"
          />
          <div class="additional-content">
            <h3>闻喜花馍工艺详情</h3>
            <p>闻喜花馍制作工艺精湛，每个步骤都体现着传承人的智慧和匠心。从选料开始，需要优质的面粉和纯净的水源，配比精确，揉制时间恰到好处，才能形成理想的面团质地。</p>
            <p>从选料到成型，从发酵到蒸制，每个环节都蕴含着深厚的文化内涵和丰富的实践经验。制作花馍不仅是技术活，更是艺术创作，需要创作者具备深厚的文化底蕴和敏锐的审美眼光。</p>
            <p>花馍的造型寓意深远，承载着人们对美好生活的向往和祝福。龙凤呈祥、花开富贵、年年有余等吉祥图案，不仅美观大方，更传递着深刻的文化内涵和精神寄托。</p>
            <p>在新时代背景下，闻喜花馍传承人在保持传统工艺精髓的同时，也在积极探索创新发展的道路，融入现代元素，使这一古老技艺焕发出新的生命力。</p>
          </div>
        </div>
      </div>
    </div>
  </Rome2Layout>
</template>

<script>
import Rome2Layout from '@/layouts/Rome2Layout.vue'

export default {
  name: 'ShanxiF2Detail01',
  components: {
    Rome2Layout
  },
  mounted() {
    document.body.style.backgroundImage = `url(${require('@/assets/images/展厅2.jpg')})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "local";
    document.body.style.backgroundSize = "cover";
  },
  destroyed() {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundRepeat = "";
    document.body.style.backgroundAttachment = "";
    document.body.style.backgroundSize = "";
  }
}
</script>

<style scoped>
.f3-detail1-page {
  min-height: 100vh;
  position: relative;
}

/* 顶部导航标签样式 */
.detail-nav-tabs {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-tab {
  display: block;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 14px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-tab:hover {
  color: #993636;
  text-decoration: none;
  background-color: rgba(153, 54, 54, 0.1);
  border-color: #993636;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(153, 54, 54, 0.2);
}

.nav-tab.active {
  color: #fff;
  background: linear-gradient(135deg, #993636, #b44444);
  border-color: #993636;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(153, 54, 54, 0.3);
}

/* 内容区域 */
.content-area {
  padding: 2rem 0;
  min-height: calc(100vh - 90px);
  animation: fadeInUp 0.8s ease;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.detail-image {
  width: 100%;
  height: auto;
  max-width: 100%;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.additional-content {
  text-align: left;
}

.additional-content h3 {
  color: #993636;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.additional-content p {
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.1rem;
  text-indent: 2em;
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .detail-nav-tabs {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-tab {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .content-wrapper {
    padding: 1.5rem;
    margin: 0 1rem;
  }
  
  .additional-content h3 {
    font-size: 1.5rem;
  }
  
  .additional-content p {
    font-size: 1rem;
  }
}
</style>