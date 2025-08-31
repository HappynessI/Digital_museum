<template>
  <RomeLayout>
    <!-- 传递导航标签到header -->
    <template #navigation>
      <div class="detail-nav-tabs">
        <router-link 
          to="/Detail1" 
          class="nav-tab"
        >
          非遗名片：晋派砖雕
        </router-link>
        <router-link 
          to="/Detail2" 
          class="nav-tab"
          :class="{ active: $route.path === '/Detail2' }"
        >
          访谈纪要
        </router-link>
        <router-link 
          to="/Detail3" 
          class="nav-tab"
        >
          实践风采
        </router-link>
      </div>
    </template>
    
    <div class="f2-detail2-page">
      <!-- 内容区域 -->
      <div class="content-area">
        <div class="content-wrapper">
          <img 
            :src="require('@/assets/images/砖雕访谈.jpg')" 
            alt="晋派砖雕访谈纪要"
            class="detail-image"
          />
          <div class="additional-content">
            <h3>访谈纪要</h3>
            <p>通过深入访谈，我们了解到砖雕工艺的传承现状既充满希望又面临挑战。老一辈工匠们对技艺传承的思考和担忧，反映了传统手工艺在现代社会中的生存状态。</p>
            <p>砖雕师傅李老先生说："这门手艺传了几代人，不能在我们这一代断了。但现在的年轻人都不愿意学，觉得太辛苦，赚钱又少。"这番话道出了许多传统工艺面临的共同困境。</p>
            <p>年轻一代对传统工艺有着不同的理解。大学生小王表示："我觉得砖雕很美，但需要用现代的方式来传承和发展。比如结合数字技术，让更多人了解这门艺术。"</p>
            <p>通过访谈我们发现，传统与现代的结合是砖雕艺术发展的必然趋势。既要保持传统技艺的精髓，又要适应时代发展的需要，这是每一位传承人都在思考的问题。</p>
          </div>
        </div>
      </div>
    </div>
  </RomeLayout>
</template>

<script>
import RomeLayout from '@/layouts/RomeLayout.vue'

export default {
  name: 'ShanxiF1Detail02',
  components: {
    RomeLayout
  },
  mounted() {
    document.body.style.backgroundImage = `url(${require('@/assets/images/展厅.jpg')})`;
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
.f2-detail2-page {
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