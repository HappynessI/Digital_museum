<template>
  <MainLayout>
    <div class="detail-page">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="main-title">风筝博物馆</h1>
        <p class="subtitle">四层风筝文化展馆 · 详情展示</p>
      </div>

      <!-- 内容区域 -->
      <div class="content-container">
        <div class="kite-gallery">
          <div class="kite-section">
            <img 
              :src="require('@/assets/images/shandong/0001页-img1.png')" 
              alt="风筝的文化渊源"
              class="kite-image"
            />
          </div>
          <div class="kite-section">
            <img 
              :src="require('@/assets/images/shandong/0002页-img1.png')" 
              alt="龙头蜈蚣风筝"
              class="kite-image"
            />
          </div>
          <div class="kite-section">
            <img 
              :src="require('@/assets/images/shandong/0003页-img1.png')" 
              alt="风筝的千年史诗"
              class="kite-image"
            />
          </div>
          <div class="kite-section">
            <img 
              :src="require('@/assets/images/shandong/0004页-img1.png')" 
              alt="风筝制作体验"
              class="kite-image"
            />
          </div>
          <div class="back-section">
            <router-link to="/F4" class="back-button">
              ← 返回展厅
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  name: 'ShandongF4Detail',
  components: {
    MainLayout
  },
  data() {
    return {}
  },
  mounted() {
    // 设置背景
    document.body.style.backgroundImage = `url(${require('@/assets/images/shandong/4层.png')})`;
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
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

.detail-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,248,240,0.95) 100%);
  backdrop-filter: blur(10px);
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInDown 0.8s ease;
}

.main-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: #d4380d;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.subtitle {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.3rem;
  color: #87481f;
  letter-spacing: 0.2em;
}

/* 内容容器 */
.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 风筝画廊样式 */
.kite-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeInUp 0.8s ease;
}

.kite-section {
  width: 100%;
  max-width: 1200px;
  margin: 0;
  padding: 0;
  display: block;
}

.kite-image {
  width: 100%;
  height: auto;
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.kite-image:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

.back-section {
  margin-top: 40px;
  text-align: center;
}

/* 返回按钮 */
.back-button {
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(135deg, #fa8c16 0%, #ff7875 100%);
  color: white;
  font-family: 'Noto Serif SC', serif;
  font-size: 1.1rem;
  text-decoration: none;
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(250,140,22,0.3);
}

.back-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(250,140,22,0.4);
  background: linear-gradient(135deg, #ff7875 0%, #fa8c16 100%);
}

/* 动画效果 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .content-container {
    padding: 20px 10px;
  }
  
  .kite-section {
    max-width: 100%;
  }
  
  .back-section {
    margin-top: 30px;
  }
  
  .back-button {
    padding: 10px 25px;
    font-size: 1rem;
  }
}
</style>
