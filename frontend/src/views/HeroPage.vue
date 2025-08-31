<template>
  <div class="hero-page">
    <!-- 顶部居中 Logo -->
    <div class="top-center-logo">
      <img :src="require('@/assets/images/jglog2.png')" alt="顶部居中Logo">
    </div>



    <!-- 预加载器 -->
    <div class="preloader" v-if="isLoading">
      <div class="preloader-body">
        <div class="cssload-container">
          <div class="cssload-speeding-wheel"></div>
        </div>
        <p>加载中...</p>
      </div>
    </div>

    <!-- 页面主体 -->
    <div class="page text-center">
      <!-- 导航栏 -->
      <header class="page-head slider-menu-position">
        <div class="rd-navbar-wrap">
          <nav class="rd-navbar rd-navbar-default" 
               data-layout="rd-navbar-fixed" 
               data-sm-layout="rd-navbar-fixed"
               data-md-layout="rd-navbar-static" 
               data-lg-layout="rd-navbar-static"
               data-xl-layout="rd-navbar-static">
            <div class="rd-navbar-inner">
              <div class="rd-navbar-panel">
                <div class="rd-navbar-toggle" @click="toggleNavbar">
                  <span></span>
                </div>
                
              </div>
              <div class="rd-navbar-menu-wrap">
                <div class="rd-navbar-nav-wrap">
                  <div class="rd-navbar-mobile-scroll">
                    <ul class="rd-navbar-nav"></ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <!-- 轮播图内容 -->
      <section>
        <div class="swiper-container swiper-slider" ref="swiperContainer">
          <div class="swiper-wrapper">
            <!-- 第一张幻灯片 -->
            <div class="swiper-slide swiper-slide-overlay-disable" :style="{ backgroundImage: `url(${slideImages.ppt1})` }">
              <div class="swiper-slide-caption">
                 <div class="hero-content-right">
                   <!-- Logo在文字左侧 -->
                   <div class="slide-logo">
                      <img :src="require('@/assets/images/logo(before).png')" alt="Logo">
                    </div>
                    <div class="hero-text">
                      <h1 class="hero-title xl" data-caption-animate="fadeInUp" data-caption-delay="200">传承文化根脉<br>探寻时代价值</h1>
                      <p class="hero-subtitle lg" data-caption-animate="fadeInUp" data-caption-delay="350">深入中国化大地，聚焦传统非物质文化遗产领域传承与发展的核心痛点</p>
                      <div class="hero-actions" data-caption-animate="fadeInUp" data-caption-delay="600">
                        <router-link to="/homepage" class="btn btn-primary btn-ellipse btn-lg">
                          <span class="icon mdi mdi-telegram"></span>开始旅程
                        </router-link>
                        <router-link to="/index" class="btn btn-default btn-ellipse btn-lg ghost" style="margin-left: 15px;">
                          <span class="icon mdi mdi-museum"></span>山西博物馆
                        </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 第二张幻灯片 -->
            <div class="swiper-slide" :style="{ backgroundImage: `url(${slideImages.ppt2})` }">
              <div class="swiper-slide-caption">
                <div class="hero-content-right">
                  <!-- Logo在文字左侧 -->
                  <div class="slide-logo">
                      <img :src="require('@/assets/images/logo(before).png')" alt="Logo">
                    </div>
                    <div class="hero-text">
                      <h1 class="hero-title xl" data-caption-animate="fadeInUp" data-caption-delay="200">纸上得来终觉浅<br>绝知此事要躬行</h1>
                      <p class="hero-subtitle lg" data-caption-animate="fadeInUp" data-caption-delay="350">以数字媒体技术为核心驱动力，以非遗文化为载体，以文化传承为使命</p>
                      <div class="hero-actions" data-caption-animate="fadeInUp" data-caption-delay="600">
                        <router-link to="/homepage" class="btn btn-primary btn-ellipse btn-lg">
                          <span class="icon mdi mdi-telegram"></span>开始旅程
                        </router-link>
                        <a class="btn btn-default btn-ellipse btn-lg ghost" href="#" style="margin-left: 15px;">
                          <span class="icon mdi mdi-play"></span>播放影片
                        </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 第三张幻灯片 -->
            <div class="swiper-slide" :style="{ backgroundImage: `url(${slideImages.ppt3})` }">
              <div class="swiper-slide-caption">
                <div class="hero-content-right">
                  <!-- Logo在文字左侧 -->
                  <div class="slide-logo">
                      <img :src="require('@/assets/images/logo(before).png')" alt="Logo">
                    </div>
                    <div class="hero-text">
                      <h1 class="hero-title xl" data-caption-animate="fadeInUp" data-caption-delay="200">研习传统文化<br>传播非遗文化</h1>
                      <p class="hero-subtitle lg" data-caption-animate="fadeInUp" data-caption-delay="350">挖掘农业文明的底蕴，用青年人的视角记录和传承非遗文化</p>
                      <div class="hero-actions" data-caption-animate="fadeInUp" data-caption-delay="600">
                        <router-link to="/homepage" class="btn btn-primary btn-ellipse btn-lg">
                          <span class="icon mdi mdi-telegram"></span>开始旅程
                        </router-link>
                        <a class="btn btn-default btn-ellipse btn-lg ghost" href="#" style="margin-left: 15px;">
                          <span class="icon mdi mdi-play"></span>播放影片
                        </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </section>
    </div>

    <!-- PhotoSwipe Gallery -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="关闭 (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="分享"></button>
            <button class="pswp__button pswp__button--fs" title="切换全屏"></button>
            <button class="pswp__button pswp__button--zoom" title="放大/缩小"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="上一张 (方向键左)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="下一张 (方向键右)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroPageView',
  data() {
    return {
      isLoading: true,
      swiper: null,
      navbarOpen: false,
      slideImages: {
        ppt1: require('@/assets/images/ppt1.jpg'),
        ppt2: require('@/assets/images/ppt2.jpg'),
        ppt3: require('@/assets/images/ppt3.jpg')
      }
    }
  },
  mounted() {
    this.loadAssets();
    // 减少加载时间
    setTimeout(() => {
      this.isLoading = false;
      this.$nextTick(() => {
        this.initSwiper();
      });
    }, 500);

    // 监听页面可见性变化，确保自动播放正常工作
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
    }
    // 清理事件监听器
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },
  methods: {
    loadAssets() {
      // 加载Google Fonts
      const googleFonts = document.createElement('link');
      googleFonts.rel = 'stylesheet';
      googleFonts.href = 'https://fonts.googleapis.com/css?family=Poppins:400,600,700';
      document.head.appendChild(googleFonts);

      // 加载Bootstrap CSS
      const bootstrap = document.createElement('link');
      bootstrap.rel = 'stylesheet';
      bootstrap.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
      document.head.appendChild(bootstrap);

      // 加载Swiper CSS
      const swiperCSS = document.createElement('link');
      swiperCSS.rel = 'stylesheet';
      swiperCSS.href = 'https://unpkg.com/swiper@8/swiper-bundle.min.css';
      document.head.appendChild(swiperCSS);

      // 基础动画样式（简版 animate.css 关键帧）
      if (!document.getElementById('hero-animate-css')) {
        const style = document.createElement('style');
        style.id = 'hero-animate-css';
        style.textContent = `
          .animated{animation-duration:800ms;animation-fill-mode:both}
          @keyframes fadeInUp{from{opacity:0;transform:translate3d(0,40px,0)}to{opacity:1;transform:none}}
          .fadeInUp{animation-name:fadeInUp}
        `;
        document.head.appendChild(style);
      }
    },

    initSwiper() {
      // 使用动态导入加载Swiper
      this.loadSwiperScript().then(() => {
        if (window.Swiper && this.$refs.swiperContainer) {
          console.log('Initializing Swiper...');
          console.log('Container:', this.$refs.swiperContainer);
          console.log('Slides count:', this.$refs.swiperContainer.querySelectorAll('.swiper-slide').length);
          
          this.swiper = new window.Swiper(this.$refs.swiperContainer, {
            // 基本配置
            direction: 'horizontal',
            loop: true, // 循环播放
            speed: 650, // 切换速度
            effect: 'slide',
            spaceBetween: 0, // 减少间距以确保平滑切换
            slidesPerView: 1, // 每次显示一张
            centeredSlides: true, // 居中显示
            
            // 自动播放配置
            autoplay: {
              delay: 3000, // 每3秒自动切换
              disableOnInteraction: false, // 用户交互后继续自动播放
              pauseOnMouseEnter: false, // 鼠标悬停时不暂停
              stopOnLastSlide: false, // 不在最后一张停止
            },
            
            // 触摸配置
            allowTouchMove: true,
            simulateTouch: true,
            touchRatio: 1,
            touchAngle: 45,
            
            // 分页器配置
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
              dynamicBullets: true,
            },
            on: {
              init: () => { 
                console.log('Swiper initialized with 3s autoplay');
                this.initSlideBackgrounds(); 
                this.playCaptionAnimation();
                // 强制启动自动播放
                setTimeout(() => {
                  if (this.swiper && this.swiper.autoplay) {
                    this.swiper.autoplay.start();
                    console.log('Autoplay force started');
                  }
                }, 100);
              },
              slideChangeTransitionStart: () => { 
                console.log('Slide change started');
                this.hideCaptionAnimation(); 
              },
              slideChangeTransitionEnd: () => { 
                console.log('Slide change completed');
                this.playCaptionAnimation(); 
              },
              autoplayTimeLeft: () => {
                // 可选：显示自动播放倒计时（用于调试）
                // console.log('Autoplay timer tick');
              }
            }
          });
        }
      });
    },

    loadSwiperScript() {
      return new Promise((resolve) => {
        if (window.Swiper) {
          resolve();
          return;
        }
        
        // 加载Swiper CSS
        const swiperCSS = document.createElement('link');
        swiperCSS.rel = 'stylesheet';
        swiperCSS.href = 'https://unpkg.com/swiper@8/swiper-bundle.min.css';
        document.head.appendChild(swiperCSS);

        // 加载Swiper JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/swiper@8/swiper-bundle.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
      });
    },

    initSlideBackgrounds() {
      // 背景图片已经在HTML中通过v-bind设置，这里只需要确保样式正确
      const slides = document.querySelectorAll('.swiper-slide');
      slides.forEach(slide => {
        slide.style.backgroundSize = 'cover';
        slide.style.backgroundPosition = 'center';
        slide.style.backgroundRepeat = 'no-repeat';
      });
    },

    hideCaptionAnimation() {
      const slide = document.querySelector('.swiper-slide-active');
      if (!slide) return;
      const items = slide.querySelectorAll('[data-caption-animate], .slide-logo');
      items.forEach(el => {
        el.classList.remove('animated');
        el.style.animationDelay = '0ms';
        el.style.opacity = '0';
        el.style.transform = 'translate3d(0,40px,0)';
      });
    },

    playCaptionAnimation() {
      const slide = document.querySelector('.swiper-slide-active');
      if (!slide) return;
      const items = slide.querySelectorAll('[data-caption-animate], .slide-logo');
      items.forEach(el => {
        const anim = el.getAttribute('data-caption-animate') || 'fadeInUp';
        const delay = Number(el.getAttribute('data-caption-delay') || 0);
        el.classList.remove('animated', 'fadeInUp');
        // 强制重绘，确保重新触发动画
        // eslint-disable-next-line no-unused-expressions
        void el.offsetWidth;
        el.classList.add('animated', anim);
        el.style.animationDelay = `${delay}ms`;
      });
    },

    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    },

    handleVisibilityChange() {
      if (this.swiper) {
        if (document.hidden) {
          // 页面隐藏时暂停自动播放
          this.swiper.autoplay.stop();
        } else {
          // 页面显示时恢复自动播放
          this.swiper.autoplay.start();
          console.log('Autoplay resumed');
        }
      }
    }
  }
}
</script>

<style>
.hero-page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #000;
}

.page {
  width: 100%;
  height: 100vh;
  position: relative;
}

/* 让头部不占据布局高度，避免顶部出现黑边 */
.page-head {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: transparent;
}

.swiper-container {
  width: 100% !important;
  height: 100vh !important;
}

.swiper-wrapper {
  width: 100% !important;
  height: 100% !important;
}

.swiper-slide {
  width: 100% !important;
  height: 100vh !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  position: relative;
  /* 确保slides能正常显示和切换 */
  display: block !important;
  opacity: 1 !important;
}

.swiper-slide::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25); /* 轻微蒙版效果 */
  pointer-events: none;
  z-index: 1;
}

.swiper-slide-caption {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; /* 确保内容在蒙版之上 */
  padding-top: 150px; /* 减少padding-top值，文字内容上移 */
}

/* 预加载器样式 */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preloader-body {
  text-align: center;
  color: white;
}

.cssload-container {
  margin-bottom: 20px;
}

.cssload-speeding-wheel {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 文字样式 */
.swiper-slide h1,
.hero-title { color: #fff; font-weight: 800; font-size: 3.6rem; line-height: 1.12; margin-bottom: 1.1rem; text-shadow: 2px 2px 6px rgba(0,0,0,0.85); }
.hero-title.xl { font-size: 4.2rem; }

.swiper-slide p,
.hero-subtitle { color:#fff; font-size: 1.3rem; margin-bottom: 2.2rem; text-shadow: 1px 2px 3px rgba(0,0,0,0.85); }
.hero-subtitle.lg { font-size: 1.45rem; }

/* 仅作用在该页面的按钮样式 */
.hero-page .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 26px;
  border-radius: 999px;
  text-decoration: none;
  margin: 6px 10px 6px 0;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: 1px solid transparent;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease, border-color 0.18s ease;
  will-change: transform;
}

.hero-page .btn .icon { margin-right: 2px; }

.hero-page .btn-primary {
  color: #fff;
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  box-shadow: 0 10px 30px rgba(220, 38, 38, 0.35);
}

.hero-page .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(220, 38, 38, 0.48);
}

.hero-page .btn-primary:active { transform: translateY(0); box-shadow: 0 8px 22px rgba(220,38,38,0.4); }
.hero-page .btn-primary:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(239,68,68,0.35); }

.hero-page .btn-default {
  color: #fff;
  background-color: rgba(255,255,255,0.14);
  border-color: rgba(255,255,255,0.45);
  backdrop-filter: blur(6px);
}

.hero-page .btn-default:hover {
  background-color: rgba(255,255,255,0.24);
  border-color: rgba(255,255,255,0.6);
}

.hero-page .btn-default:active { background-color: rgba(255,255,255,0.18); }
.hero-page .btn-default:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(255,255,255,0.35); }

.btn-ellipse { border-radius: 999px; padding: 12px 28px; }
.btn-lg { padding: 14px 36px; font-size: 16px; }
.btn-default.ghost { backdrop-filter: blur(6px); }

/* 左Logo右文字布局 */
.hero-content-right { 
  width: 100%; 
  display: flex; 
  justify-content: center; 
  align-items: flex-start; /* 顶部对齐 */
  padding: 0 40px; /* 左右边距 */
  gap: 40px; /* logo和文字之间的间距 */
}
.hero-text { 
  text-align: left; 
  max-width: 600px; /* 限制文本最大宽度 */
  flex: 1; /* 占据剩余空间 */
}
.hero-actions { margin-top: 24px; }

/* Logo在文字左侧的样式 */
.slide-logo {
  flex-shrink: 0; /* 防止被压缩 */
  width: 180px;
  height: 280px;
  opacity: 0;
  animation: slideInFromLeft 1.2s ease-out 0.5s forwards;
}

.slide-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* Logo从左侧滑入动画效果 */
@keyframes slideInFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-50px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@media (max-width: 992px) {
  .hero-content-right { 
    flex-direction: column; /* 垂直布局 */
    align-items: center;
    justify-content: center; 
    padding: 0 20px;
    gap: 20px; /* 减少间距 */
  }
  .hero-text { 
    text-align: center; 
    max-width: 100%;
  }
  .slide-logo {
    width: 120px;
    height: 180px;
    animation: slideInFromLeft 1.2s ease-out 0.5s forwards;
  }
}



.swiper-container {
  width: 100% !important;
  height: 100vh !important;
}

.swiper-wrapper {
  width: 100% !important;
  height: 100% !important;
}

/* 标题左侧Logo样式 */
.title-left-logo {
  position: absolute;
  left: 80px;
  top: 30%;
  transform: translateY(-50%);
  z-index: 10;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  opacity: 0;
  animation: slideInRotate 1.2s ease-out 0.5s forwards;
}

/* 扇形Logo专用样式 */
.title-left-logo.fan-logo {
  width: 180px;
  height: 280px;
  border-radius: 0;
  overflow: visible;
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.05), rgba(160, 82, 45, 0.05));
  border: 2px solid rgba(139, 69, 19, 0.2);
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0 12px 25px rgba(139, 69, 19, 0.25);
  left: 70px;
  top: 30%;
  animation: fanSlideIn 1.5s ease-out 0.5s forwards;
}

.title-left-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 顶部居中 Logo 样式 */
.top-center-logo {
  position: absolute;
  top: 8px; /* 略微上移，贴近顶部 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 200px;
  height: auto;
  opacity: 0;
  animation: fadeInOpacity 0.8s ease-out 0.2s forwards;
}

.top-center-logo img {
  width: 100%;
  height: auto;
  display: block;
}

/* 动画效果 */
@keyframes slideInRotate {
  0% {
    opacity: 0;
    transform: translateY(-50%) translateX(-220px) rotate(-360deg) scale(0.2);
    filter: blur(10px);
  }
  30% {
    opacity: 0.6;
    transform: translateY(-50%) translateX(-160px) rotate(-180deg) scale(0.6);
    filter: blur(5px);
  }
  70% {
    opacity: 0.9;
    transform: translateY(-50%) translateX(-130px) rotate(-45deg) scale(1.1);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateX(-140px) rotate(0deg) scale(1);
    filter: blur(0px);
  }
}

@keyframes fanSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-50%) translateX(-250px) rotate(-15deg) scale(0.3);
    filter: blur(8px);
  }
  40% {
    opacity: 0.7;
    transform: translateY(-50%) translateX(-180px) rotate(-5deg) scale(0.8);
    filter: blur(3px);
  }
  80% {
    opacity: 0.95;
    transform: translateY(-50%) translateX(-145px) rotate(2deg) scale(1.05);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateX(-150px) rotate(0deg) scale(1);
    filter: blur(0px);
  }
}

@keyframes fadeInSlide {
  0% {
    opacity: 0;
    transform: translateX(50px) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

/* 仅透明度动画，避免覆盖定位 transform */
@keyframes fadeInOpacity {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* 移除冲突的幻灯片样式，让Swiper自己管理显示状态 */

/* 应急背景色，防止完全黑屏 */
.swiper-slide {
  background-color: #2c3e50;
}

.swiper-slide:nth-child(1) {
  background-color: #3498db;
}

.swiper-slide:nth-child(2) {
  background-color: #e74c3c;
}

.swiper-slide:nth-child(3) {
  background-color: #27ae60;
}



.slide-title {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.slide-desc {
  font-size: 1.2rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.slide-buttons {
  margin-top: 30px;
}

/* 分页器样式 */
.swiper-pagination {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 100;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.swiper-pagination-bullet-active {
  background: #fff;
  transform: scale(1.2);
}

/* 标题容器调整 */
.swiper-slide-caption .col-sm-10.col-xl-6 {
  position: relative;
  padding-left: 280px !important;
}

.swiper-slide-caption .col-sm-10.col-xl-6.text-xl-left {
  padding-left: 280px !important;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .title-left-logo {
    position: static;
    margin: 0 auto 30px;
    transform: none;
    width: 80px;
    height: 80px;
  }
  
  .title-left-logo.fan-logo {
    width: 100px;
    height: 160px;
    padding: 8px;
    border-width: 1px;
    border-radius: 15px;
    margin: 0 auto 30px;
  }
  
  .swiper-slide-caption .col-sm-10.col-xl-6 {
    text-align: center !important;
    padding-left: 15px !important;
  }
  
  .swiper-slide-caption .col-sm-10.col-xl-6.text-xl-left {
    text-align: center !important;
    padding-left: 15px !important;
  }
  
  .top-center-logo {
    width: 130px;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .slide-title {
    font-size: 2rem;
  }
  
  .slide-desc {
    font-size: 1rem;
  }
}
</style>