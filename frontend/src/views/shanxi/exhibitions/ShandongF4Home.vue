<template>
  <MainLayout>
    <div class="f4-home-page">
      <!-- 简化的标题 -->
      <div class="simple-title">
        <h1>F4 · 齐鲁遗珍</h1>
        <p>山东展馆入口</p>
      </div>
      
      <!-- 主要展示区域 -->
      <div class="main-content">
        <div class="featured-item">
          <div class="item-image">
            <img 
              :src="require('@/assets/images/shandong/7.png')" 
              alt="齐鲁遗珍导览图" 
              ref="mainImage"
            />
          </div>
          <div class="item-content">
            <h2>🪁 四层风筝文化展馆</h2>
            <p>
              踏入这座四层风筝文化殿堂，从古代竹篾纸糊到现代艺术珍品，从民间传说到国际竞技，每一层都承载着风筝文化的独特魅力。在这里感受深厚的文化底蕴和匠人精神，一同在风筝的世界中翱翔。
            </p>
            <div class="action-buttons">
              <router-link to="/shandong/f4/detail" class="primary-button">了解详情</router-link>
              <router-link to="/shandong/f4/wenchuang" class="secondary-button">文创墙</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  name: 'ShandongF4Home',
  components: {
    MainLayout
  },
  data() {
    return {}
  },
  mounted() {
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
  },
  methods: {}
}
</script>

<style scoped>
.f4-home-page {
  min-height: 100vh;
  padding: 2rem;
  color: #fff;
  position: relative;
}

.f4-home-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3); /* 蒙版效果 */
  pointer-events: none;
  z-index: -1;
}

/* 简化的标题样式 */
.simple-title {
  text-align: center;
  margin-bottom: 3rem;
  padding: 1rem 0;
  animation: fadeInDown 0.8s ease;
}

.simple-title h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  background: linear-gradient(135deg, #10B981, #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.simple-title p {
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.main-content {
  max-width: 900px; /* 缩小卡片宽度 */
  margin: 0 auto;
  animation: fadeInUp 0.8s ease;
}

.featured-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.item-image {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.item-image:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
  transform: translateY(-2px);
}

.item-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
}

.item-image:hover img {
  transform: scale(1.08);
}

.item-content {
  background: rgba(0, 0, 0, 0.4); /* 半透明背景，让背景隐约可见 */
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(8px); /* 轻微背景模糊效果 */
}

.item-content h2 {
  color: #10B981;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.item-content p {
  line-height: 1.8;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  font-size: 1.1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-button,
.secondary-button {
  padding: 1rem 2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
}

.primary-button {
  background: linear-gradient(135deg, #10B981, #059669);
  color: #fff;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.primary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.6);
}

.secondary-button {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
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

/* 响应式设计 */
@media (max-width: 768px) {
  .f4-home-page {
    padding: 1rem;
  }
  
  .simple-title h1 {
    font-size: 2rem;
  }
  
  .featured-item {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .item-image img {
    height: 300px;
  }
  
  .action-buttons {
    justify-content: center;
  }
  
  .primary-button,
  .secondary-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style>