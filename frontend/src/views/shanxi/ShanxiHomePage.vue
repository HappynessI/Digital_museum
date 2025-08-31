<template>
  <MainLayout>
    <div class="shanxi-home-page">
      <div class="page-title">
        <h1>映像晋鲁</h1>
      </div>
      
      <!-- 主要导航区域 -->
      <div class="navigation-area">
        <div class="split-demo split-demo-horizontal">
          <div class="sidebar">
            <HomeNavMenu />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'
import HomeNavMenu from '@/components/shanxi/HomeNavMenu.vue'

export default {
  name: 'DigitalMuseumHome',
  components: {
    MainLayout,
    HomeNavMenu
  },
  mounted() {
    // 设置页面背景
    document.body.style.backgroundImage = `url(${require('@/assets/images/博物馆首页.png')})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "local";
    document.body.style.backgroundSize = "cover";
  },
  destroyed() {
    // 清除页面背景
    document.body.style.backgroundImage = "";
    document.body.style.backgroundRepeat = "";
    document.body.style.backgroundAttachment = "";
    document.body.style.backgroundSize = "";
  }
}
</script>

<style scoped>
.shanxi-home-page {
  min-height: 100vh;
  position: relative;
}

.page-title {
  text-align: center;
  padding: 2rem 0;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  animation: fadeInDown 0.8s ease;
}

.page-title h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.navigation-area {
  padding: 0 20px;
}

.split-demo {
  margin-left: 20px;
  margin-top: 90px;
}

.split-demo-horizontal {
  display: flex;
  flex-direction: row;
}

.sidebar {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  min-width: 250px;
  animation: fadeInUp 0.8s ease;
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
  .split-demo {
    margin-left: 10px;
    margin-top: 50px;
  }
  
  .sidebar {
    min-width: 200px;
    padding: 15px;
  }
  
  .page-title h1 {
    font-size: 2rem;
  }
}
</style>
