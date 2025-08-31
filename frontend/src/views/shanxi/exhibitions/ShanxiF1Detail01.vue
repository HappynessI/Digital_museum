<template>
  <RomeLayout>
    <!-- 传递导航标签到header -->
    <template #navigation>
      <div class="detail-nav-tabs">
        <router-link 
          to="/Detail1" 
          class="nav-tab"
          :class="{ active: $route.path === '/Detail1' }"
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
        >
          实践风采
        </router-link>
      </div>
    </template>
    
    <div class="f2-detail1-page">
      <!-- 内容区域 -->
      <div class="content-area">
        <div class="content-wrapper">
          <img 
            :src="require('@/assets/images/砖雕介绍.jpg')" 
            alt="晋派砖雕介绍"
            class="detail-image"
          />
          <div class="additional-content">
            <h3>砖雕工艺详情</h3>
            <p>晋派砖雕历史悠久，技艺精湛，是山西地区独特的传统工艺。每一件砖雕作品都承载着深厚的历史文化内涵，体现了山西工匠们世代相传的卓越技艺和精益求精的匠心精神。</p>
            <p>工艺流程包括选料、制坯、雕刻、烧制等步骤，每个环节都需要严格的技术要求和丰富的经验积累。从原料的精心挑选到最终成品的精美呈现，无不体现着传统工艺的精髓。</p>
            <p>砖雕题材丰富多样，包括花鸟虫鱼、人物故事、吉祥图案等，每一个图案都有着深刻的文化寓意和美好的祝愿，是中华优秀传统文化的重要载体。</p>
            <p>现代砖雕艺术在传承传统技艺的基础上，融入了当代审美理念和创新元素，使这门古老的艺术焕发出新的生机与活力。</p>
          </div>
        </div>
      </div>
    </div>
  </RomeLayout>
</template>

<script>
import RomeLayout from '@/layouts/RomeLayout.vue'

export default {
  name: 'ShanxiF1Detail01',
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
.f2-detail1-page {
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
  text-indent: 2em; /* 首行缩进 */
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
    min-width: auto;
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

@media (max-width: 576px) {
  .detail-nav-tabs {
    gap: 0.5rem;
  }
  
  .nav-tab {
    padding: 5px 10px;
    font-size: 11px;
    white-space: nowrap;
  }
}
</style>