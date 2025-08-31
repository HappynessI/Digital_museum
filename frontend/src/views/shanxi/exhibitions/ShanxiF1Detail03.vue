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
        >
          访谈纪要
        </router-link>
        <router-link 
          to="/Detail3" 
          class="nav-tab"
          :class="{ active: $route.path === '/Detail3' }"
        >
          实践风采
        </router-link>
      </div>
    </template>
    
    <div class="f2-detail3-page">
      <!-- 内容区域 -->
      <div class="content-area">
        <div class="content-wrapper">
          <img 
            :src="require('@/assets/images/砖雕风采.jpg')" 
            alt="晋派砖雕实践风采"
            class="detail-image"
          />
          <div class="additional-content">
            <h3>实践风采</h3>
            <p>实践队员们深入砖雕工坊，亲身体验传统工艺的魅力。从最初的生疏到逐渐熟练，每一个环节都让我们深刻感受到传统技艺的博大精深和工匠精神的可贵。</p>
            <p>在师傅的指导下，队员们学习了砖雕的基本技法。从简单的线条雕刻开始，到复杂的图案设计，每一刀都需要精准的力度和角度控制。看似简单的动作，实际上需要长年累月的练习才能达到炉火纯青的境界。</p>
            <p>记录砖雕师傅们的日常工作，我们看到了他们对技艺的执着追求和对传统文化的深深热爱。无论是酷暑严寒，他们都坚持在工坊中挥汗如雨，用双手雕琢着一件件精美的艺术品。</p>
            <p>通过实地调研，我们更深入地了解了非遗文化的现状与挑战。如何在保持传统的同时适应现代社会的发展需求，如何吸引年轻人参与传承，这些都是我们需要思考和解决的问题。</p>
          </div>
        </div>
      </div>
    </div>
  </RomeLayout>
</template>

<script>
import RomeLayout from '@/layouts/RomeLayout.vue'

export default {
  name: 'ShanxiF1Detail03',
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
.f2-detail3-page {
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