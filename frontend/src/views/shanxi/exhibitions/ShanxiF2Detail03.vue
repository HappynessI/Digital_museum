<template>
  <Rome2Layout>
    <!-- 传递导航标签到header -->
    <template #navigation>
      <div class="detail-nav-tabs">
        <router-link 
          to="/Detail11" 
          class="nav-tab"
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
          :class="{ active: $route.path === '/Detail13' }"
        >
          实践风采
        </router-link>
      </div>
    </template>
    
    <div class="f3-detail3-page">
      <!-- 内容区域 -->
      <div class="content-area">
        <div class="content-wrapper">
          <img 
            :src="require('@/assets/images/花馍风采.jpg')" 
            alt="闻喜花馍实践风采"
            class="detail-image"
          />
          <div class="additional-content">
            <h3>实践风采</h3>
            <p>实践队员们亲自参与花馍制作，从最初的好奇到逐渐入门，每一个步骤都让我们深刻感受到这门传统技艺的魅力与不易。在传承人的悉心指导下，我们体验了和面、揉团、造型等各个环节。</p>
            <p>记录花馍传承人的日常工作，我们看到了她们对技艺的执着追求和对传统文化的深深热爱。无论是节庆时分还是平日里，她们都在用心制作着一个个精美的花馍，传递着美好的祝愿。</p>
            <p>通过实地体验，我们更深刻地理解了非遗文化的价值与意义。花馍不仅仅是食物，更是承载着深厚文化内涵的艺术品，是连接过去与现在的文化纽带。</p>
            <p>在实践过程中，我们也思考着如何更好地传承和发展这门技艺。通过现代传播手段让更多年轻人了解花馍文化，通过创新设计让传统技艺适应现代生活，这些都是我们共同努力的方向。</p>
          </div>
        </div>
      </div>
    </div>
  </Rome2Layout>
</template>

<script>
import Rome2Layout from '@/layouts/Rome2Layout.vue'

export default {
  name: 'ShanxiF2Detail03',
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
.f3-detail3-page {
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