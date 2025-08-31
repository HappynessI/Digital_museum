<template>
  <div class="rome2-layout">
    <div class="layout-background"></div>
    <div class="layout-content">
      <!-- 顶部导航区域 -->
      <header class="top-navigation">
        <div class="nav-controls">
          <div class="control-buttons">
            <button @click="goBack" class="back-button">
              ← 返回
            </button>
            <router-link to="/" class="home-button">
              🏠 首页
            </router-link>
          </div>
          
          <!-- 自定义导航内容插槽 -->
          <div class="custom-nav">
            <slot name="navigation"></slot>
          </div>
        </div>
      </header>
      
      <!-- 主要内容区域 -->
      <main class="main-content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rome2Layout',
  mounted() {
    // 动态设置背景图片
    const bgElement = this.$el.querySelector('.layout-background');
    if (bgElement) {
      bgElement.style.backgroundImage = `url(${require('@/assets/images/展厅2.jpg')})`;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.rome2-layout {
  min-height: 100vh;
  width: 100%;
  position: relative;
}

.layout-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: local;
  background-size: cover;
  z-index: -1;
}

.layout-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

.top-navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
}

.nav-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 0;
}

.control-buttons {
  display: flex;
  gap: 12px;
}

.back-button,
.home-button {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px 16px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-button:hover,
.home-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-decoration: none;
  color: #333;
}

.custom-nav {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-left: 2rem;
}

.main-content {
  padding-top: 90px; /* 为顶部导航留出空间 */
  min-height: 100vh;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-navigation {
    top: 10px;
    left: 10px;
    right: 10px;
  }
  
  .nav-controls {
    flex-direction: column;
    gap: 8px;
  }
  
  .back-button,
  .home-button {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  .main-content {
    padding-top: 100px;
  }
}

@media (max-width: 576px) {
  .nav-controls {
    flex-direction: row;
    justify-content: center;
  }
  
  .back-button,
  .home-button {
    flex: 1;
    text-align: center;
    max-width: 120px;
  }
}
</style>
