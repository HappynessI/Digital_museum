<template>
  <div class="agriculture-page">
    <!-- 顶部导航丝带 -->
    <nav class="ribbon">
      <div class="ribbon-content">
                        <div class="logo-container">
                  <router-link to="/homepage" class="logo-link">
                    <img :src="require('@/assets/images/practice-team-logo.png')" alt="实践队logo" class="logo-img">
                    <span class="logo-text">溯本求源 <span class="separator">|</span> 文润经心</span>
                  </router-link>
                </div>
                <div class="nav-links">
                  <router-link to="/homepage" class="ribbon-item">返回首页</router-link>
          <a href="#pear" class="ribbon-item active">莱阳梨膏</a>
          <router-link to="/agriculture-tools" class="ribbon-item">农具演进</router-link>
        </div>
      </div>
    </nav>

    <!-- Screen 1 - 莱阳梨膏 -->
    <section id="pear" class="screen">
      <!-- Hero区域 -->
      <div class="hero" :style="{ background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${require('@/assets/images/agriculture/莱阳梨膏/贡梨树.png')}') center/cover` }">
        <div class="hero-content">
          <h1 class="hero-title">二十斤梨，熬一斤膏</h1>
          <p class="hero-subtitle">四百年传承 · 匠心独运</p>
          <div class="hero-description">
            <p>莱阳梨膏，源自明朝万历年间，历经四百余年传承，是山东省非物质文化遗产代表性项目。选用莱阳贡梨，采用传统工艺慢火熬制，二十斤梨仅能熬制一斤膏，浓缩了梨的全部精华，呈现琥珀色泽，香气浓郁。</p>
          </div>
          <div class="hero-features">
            <div class="feature-item">
              <span class="feature-number">400</span>
              <span class="feature-text">年传承</span>
            </div>
            <div class="feature-item">
              <span class="feature-number">20:1</span>
              <span class="feature-text">熬制比例</span>
            </div>
            <div class="feature-item feature-image">
              <img :src="require('@/assets/images/agriculture/莱阳梨膏/梨园.png')" alt="梨园" class="feature-img">
              <span class="feature-text">古梨园</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 梨膏制作工艺展示 -->
      <div class="craft-section">
        <div class="craft-container">
          <h2 class="section-title">传统工艺</h2>
          <div class="craft-grid">
            <div class="craft-item">
              <div class="craft-image">
                <img :src="require('@/assets/images/agriculture/莱阳梨膏/梨特写.png')" alt="莱阳梨特写" class="craft-img">
              </div>
              <div class="craft-content">
                <h3>精选贡梨</h3>
                <p>莱阳贡梨，又称慈梨，是制作梨膏的最佳原料。其果肉细腻，汁水丰富，甜度适中，具有独特的香气。每一颗梨都经过精心挑选，确保品质上乘。贡梨生长在莱阳特有的土壤环境中，吸收了充足的阳光和养分，为梨膏的制作奠定了坚实的基础。</p>
              </div>
            </div>
            <div class="craft-item reverse">
              <div class="craft-image">
                <img :src="require('@/assets/images/agriculture/莱阳梨膏/梨膏制作.png')" alt="梨膏制作工艺" class="craft-img">
              </div>
              <div class="craft-content">
                <h3>古法熬制</h3>
                <p>采用传统工艺，将新鲜梨汁慢火熬制，整个过程需要十几个小时。二十斤梨仅能熬制一斤膏，浓缩了梨的全部精华。熬制过程中需要不断搅拌，防止糊底，同时保持火候的稳定。这种传统工艺虽然耗时耗力，但能够最大程度保留梨的营养成分和天然风味。</p>
              </div>
            </div>
            <div class="craft-item">
              <div class="craft-image">
                <img :src="require('@/assets/images/agriculture/莱阳梨膏/梨膏特写.png')" alt="梨膏特写" class="craft-img">
              </div>
              <div class="craft-content">
                <h3>琥珀色泽</h3>
                <p>熬制完成的梨膏呈现琥珀色，质地粘稠，香气浓郁，保留了梨的天然营养和风味。梨膏不仅具有润肺止咳的功效，还富含多种维生素和矿物质。其独特的制作工艺和营养价值，使其成为莱阳地区重要的传统食品和文化遗产。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Story区域 - 历史传承时间轴 -->
      <div class="story">
        <div class="story-content">
          <h3 class="timeline-main-title">历史传承</h3>
          <div class="timeline-vertical-container">
            <div class="timeline-vertical-line"></div>
            
            <div class="timeline-vertical-item left" data-year="1582">
              <div class="timeline-content-left">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/历史图片/1582.png')" alt="万历年间宫廷" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
              <div class="timeline-dot"></div>
              <div class="timeline-content-right">
                <div class="timeline-year-display">1582</div>
                <div class="timeline-text-content">
                  <h4>万历年间</h4>
                  <p>万历皇帝品尝莱阳梨膏，赞不绝口，从此莱阳梨膏成为贡品，开启了四百年的传承历史。</p>
                </div>
              </div>
            </div>
            
            <div class="timeline-vertical-item right" data-year="1620">
              <div class="timeline-content-left">
                <div class="timeline-year-display">1620</div>
                <div class="timeline-text-content">
                  <h4>工艺成熟</h4>
                  <p>梨膏制作技艺逐渐成熟，形成了完整的工艺流程，二十斤梨熬一斤膏的传统工艺确立。</p>
                </div>
              </div>
              <div class="timeline-dot"></div>
              <div class="timeline-content-right">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/历史图片/1620.png')" alt="传统工艺" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="timeline-vertical-item left" data-year="1850">
              <div class="timeline-content-left">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/历史图片/1850.png')" alt="商贸繁荣" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
              <div class="timeline-dot"></div>
              <div class="timeline-content-right">
                <div class="timeline-year-display">1850</div>
                <div class="timeline-text-content">
                  <h4>名扬四海</h4>
                  <p>莱阳梨膏名扬四海，成为重要的贸易商品，远销京津等地，声誉日隆。</p>
                </div>
              </div>
            </div>
            
            <div class="timeline-vertical-item right" data-year="2008">
              <div class="timeline-content-left">
                <div class="timeline-year-display">2008</div>
                <div class="timeline-text-content">
                  <h4>非遗认证</h4>
                  <p>入选国家级非物质文化遗产代表性项目名录，传统技艺得到官方认可和保护。</p>
                </div>
              </div>
              <div class="timeline-dot"></div>
              <div class="timeline-content-right">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/历史图片/2008.png')" alt="非遗认证" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="timeline-vertical-item left" data-year="2023">
              <div class="timeline-content-left">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/历史图片/2023.png')" alt="现代传承" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
              <div class="timeline-dot"></div>
              <div class="timeline-content-right">
                <div class="timeline-year-display">2023</div>
                <div class="timeline-text-content">
                  <h4>现代传承</h4>
                  <p>古梨园保护面积达28000亩，传承基地建设完成，技艺传承进入新时代。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Heritage区域 -->
      <div class="heritage">
        <h2 class="heritage-title">非遗传承</h2>
        <div class="heritage-cards">
          <div class="heritage-card">
            <div class="card-image">
              <img :src="require('@/assets/images/agriculture/莱阳梨膏/梨园.png')" alt="古梨园" class="product-img">
            </div>
            <h3>古梨园</h3>
            <p>莱阳古梨园占地28000亩，其中百年以上古梨树超过5000棵。这些古梨树见证了莱阳梨膏制作技艺的传承历史，是活态的文化遗产。</p>
          </div>
          
          <div class="heritage-card heritage-cert-card heritage-highlight">
            <div class="cert-images">
              <img :src="require('@/assets/images/agriculture/莱阳梨膏/非遗名录上半.png')" alt="非遗证书上半" class="cert-img-top">
              <img :src="require('@/assets/images/agriculture/莱阳梨膏/非遗名录下半（展示梨膏地位）.png')" alt="非遗证书下半" class="cert-img-bottom">
            </div>
            <div class="hover-tip">悬浮查看详情</div>
            <h3>非遗认证</h3>
            <p>莱阳梨膏制作技艺于2008年入选国家级非物质文化遗产代表性项目名录，项目编号VIII-119。这是对莱阳梨膏四百年传承历史的官方认可，也是对其独特工艺和文化价值的充分肯定。</p>
          </div>
          
          <div class="heritage-card">
            <div class="card-image">
              <img :src="require('@/assets/images/agriculture/莱阳梨膏/梨膏特写.png')" alt="梨膏产品" class="product-img">
            </div>
            <h3>现代传承</h3>
            <p>在保持传统工艺的基础上，莱阳梨膏制作技艺也在与时俱进。现代化的包装和销售方式，让更多人能够品尝到正宗的莱阳梨膏。</p>
          </div>
        </div>
      </div>
    </section>



    <!-- 证书详情弹窗 -->
    <div id="certModal" class="modal" v-show="showModal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <img :src="require('@/assets/images/agriculture/莱阳梨膏/非遗名录下半（展示梨膏地位）.png')" alt="非遗证书详情" class="modal-img">
        <h3>莱阳梨膏制作技艺</h3>
        <p>项目编号：VIII-119</p>
        <p>申报地区：莱阳市</p>
        <p>保护级别：国家级非物质文化遗产</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgriculturePageView',
  data() {
    return {
      showModal: false
    }
  },
  mounted() {
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0);
    
    // 初始化滚动监听和交互
    this.initScrollAnimations();
    this.initNavigation();
    this.initCertModal();
  },
  methods: {
    initScrollAnimations() {
      // 时间轴滚动动画
      const timelineItems = document.querySelectorAll('.timeline-vertical-item');
      
      const checkTimelineAnimation = () => {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8;
        const centerPoint = windowHeight * 0.5;
        
        timelineItems.forEach((item, index) => {
          const itemRect = item.getBoundingClientRect();
          const itemTop = itemRect.top;
          const itemBottom = itemRect.bottom;
          const itemCenter = itemTop + itemRect.height / 2;
          
          if (itemTop < triggerPoint && itemBottom > 0) {
            if (!item.classList.contains('animate')) {
              setTimeout(() => {
                item.classList.add('animate');
              }, index * 50);
            }
          }
          
          const distanceFromCenter = Math.abs(itemCenter - centerPoint);
          const maxDistance = windowHeight * 0.4;
          
          if (itemTop < windowHeight && itemBottom > 0) {
            const focusIntensity = 1 - (distanceFromCenter / maxDistance);
            
            if (focusIntensity > 0.3) {
              item.classList.add('in-focus');
            } else if (itemTop > windowHeight * 0.9 || itemBottom < windowHeight * 0.1) {
              item.classList.remove('in-focus');
            }
          } else {
            item.classList.remove('in-focus');
          }
        });
      };
      
      let ticking = false;
      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(checkTimelineAnimation);
          ticking = true;
        }
      };
      
      window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
      });
      
      checkTimelineAnimation();
    },
    
    initNavigation() {
      // 导航丝带点击事件
      const ribbonItems = document.querySelectorAll('.ribbon-item');
      ribbonItems.forEach(item => {
        item.addEventListener('click', (e) => {
          const href = item.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
            
            ribbonItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
          }
        });
      });
      

    },
    
    initCertModal() {
      // 证书卡片点击事件
      const certCard = document.querySelector('.heritage-cert-card');
      if (certCard) {
        certCard.addEventListener('click', () => {
          this.showModal = true;
        });
      }
    },
    
    closeModal() {
      this.showModal = false;
    }
  }
}
</script>

<style scoped>
/* 导入Agriculture项目的完整CSS样式 */
@import '@/assets/styles/agriculture.css';
</style>
