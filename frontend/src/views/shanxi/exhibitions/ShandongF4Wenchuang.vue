<template>
  <MainLayout>
    <div class="wenchuang-wall">
      <!-- 页面标题 -->
      <div class="page-header">
                 <h1 class="main-title">✨ 文创墙 ✨</h1>
         <p class="subtitle">非遗文化创意产品展示</p>
      </div>

      <!-- 文创产品展示区 -->
      <div class="content-frame animate__animated animate__fadeInUp">
      <div class="products-container">
        
                 <!-- 书签区域 -->
         <section class="product-section bookmarks">
           <div class="section-header">
             <h2 class="section-title">📚 精美书签</h2>
           </div>
           <div class="bookmarks-container">
             <div class="bookmarks-left">
               <div class="bookmark-item" @mouseenter="hoverBookmark(0, true)" @mouseleave="hoverBookmark(0, false)">
                 <div class="bookmark-card" :class="{ 'flipped': bookmarks[0].hovered }">
                   <img :src="require('@/assets/images/wenchuang/书签/1.png')" alt="书签1" class="bookmark-front" />
                   <img :src="require('@/assets/images/wenchuang/书签/2.png')" alt="书签2" class="bookmark-back" />
                 </div>
               </div>
               <div class="bookmark-item" @mouseenter="hoverBookmark(1, true)" @mouseleave="hoverBookmark(1, false)">
                 <div class="bookmark-card" :class="{ 'flipped': bookmarks[1].hovered }">
                   <img :src="require('@/assets/images/wenchuang/书签/3.png')" alt="书签3" class="bookmark-front" />
                   <img :src="require('@/assets/images/wenchuang/书签/4.jpg')" alt="书签4" class="bookmark-back" />
                 </div>
               </div>
               <div class="bookmark-item" @mouseenter="hoverBookmark(2, true)" @mouseleave="hoverBookmark(2, false)">
                 <div class="bookmark-card" :class="{ 'flipped': bookmarks[2].hovered }">
                   <img :src="require('@/assets/images/wenchuang/书签/5.png')" alt="书签5" class="bookmark-front" />
                   <img :src="require('@/assets/images/wenchuang/书签/6.jpg')" alt="书签6" class="bookmark-back" />
                 </div>
               </div>
             </div>
             <div class="keychains-right">
               <h3 class="keychain-title">🔑 精美钥匙扣</h3>
               <div class="keychains-display">
                 <div class="keychain-wrapper">
                   <img :src="require('@/assets/images/wenchuang/钥匙扣/钥匙扣1效果图.png')" alt="钥匙扣1" class="keychain-image" />
                 </div>
                 <div class="keychain-wrapper">
                   <img :src="require('@/assets/images/wenchuang/钥匙扣/钥匙扣2效果图.png')" alt="钥匙扣2" class="keychain-image" />
                 </div>
               </div>
               <p class="keychain-desc">小巧思 · 随身携带 🎁</p>
             </div>
           </div>
           <p class="product-desc fancy-text bookmark-desc">将非遗文化融入书香之中 ～</p>
         </section>

        <!-- 冰箱贴和团扇 -->
        <section class="product-row">
          <!-- 冰箱贴 -->
          <div class="product-section magnets">
            <div class="section-header">
              <h2 class="section-title">🧲 创意冰箱贴</h2>
            </div>
                       <div class="magnets-display">
             <div class="magnet-container">
               <img :src="currentMagnetImage" alt="冰箱贴" class="magnet-image" :class="{ 'magnet-switching': magnetSwitching }" @click="switchMagnet" />
               <p class="magnet-tip">💆 点击切换版本</p>
             </div>
           </div>
            <p class="product-desc fancy-text">把美好记忆贴在生活里！</p>
          </div>

          <!-- 团扇 -->
          <div class="product-section fan">
            <div class="section-header">
              <h2 class="section-title">🎋 典雅团扇</h2>
            </div>
                         <div class="fan-display">
               <div class="fan-container" @mouseenter="fanHover = true" @mouseleave="fanHover = false">
                 <img 
                   :src="require('@/assets/images/wenchuang/团扇/团扇.png')" 
                   alt="团扇" 
                   class="fan-image"
                   :class="{ 'fan-rotating': fanHover }"
                 />
                 <div class="fan-shadow" :class="{ 'shadow-active': fanHover }"></div>
               </div>
             </div>
            <p class="product-desc fancy-text">摇曳生姿，古韵悠长 ✿</p>
          </div>
        </section>

                 <!-- 帆布包+透卡合并 -->
         <section class="product-section combined-items">
           <div class="section-header">
             <h2 class="section-title">🎁 文创精品（帆布袋&透卡）</h2>
           </div>
           <div class="combined-display">
             <div class="combined-item-wrapper">
               <img :src="require('@/assets/images/wenchuang/帆布包/帆布包1.png')" alt="帆布包1" class="combined-item" />
             </div>
             <div class="combined-item-wrapper">
               <img :src="require('@/assets/images/wenchuang/帆布包/帆布包2.png')" alt="帆布包2" class="combined-item" />
             </div>
             <div class="combined-item-wrapper">
               <img :src="require('@/assets/images/wenchuang/透卡/1.png')" alt="透卡1" class="combined-item" />
             </div>
             <div class="combined-item-wrapper">
               <img :src="require('@/assets/images/wenchuang/透卡/2.png')" alt="透卡2" class="combined-item" />
             </div>
           </div>
           <p class="product-desc fancy-text">环保实用 · 晶莹剔透 ✨</p>
         </section>

                 <!-- 明信片无序排版 -->
         <section class="product-section postcards">
           <div class="section-header">
             <h2 class="section-title">💌 艺术明信片</h2>
           </div>
           
           <div class="postcards-scattered">
             <!-- 多个大卡在中间 -->
             <div class="postcard-main-group">
               <div class="postcard-main main-1">
                 <img :src="require('@/assets/images/wenchuang/明信片/核雕1.png')" alt="核雕1" class="postcard-image main" />
               </div>
               <div class="postcard-main main-2">
                 <img :src="require('@/assets/images/wenchuang/明信片/葫芦1.png')" alt="葫芦1" class="postcard-image main" />
               </div>
               <div class="postcard-main main-3">
                 <img :src="require('@/assets/images/wenchuang/明信片/青釉莲花尊1.png')" alt="青釉莲花尊1" class="postcard-image main" />
               </div>
               <div class="postcard-main main-4">
                 <img :src="require('@/assets/images/wenchuang/明信片/木版年画1.png')" alt="木版年画1" class="postcard-image main" />
               </div>
             </div>
             
             <!-- 散布小卡 -->
             <div class="postcard-scatter scatter-1">
               <img :src="require('@/assets/images/wenchuang/明信片/核雕2.png')" alt="核雕2" class="postcard-image small" />
             </div>
             <div class="postcard-scatter scatter-2">
               <img :src="require('@/assets/images/wenchuang/明信片/蛋雕3.png')" alt="蛋雕3" class="postcard-image small" />
             </div>
             <div class="postcard-scatter scatter-3">
               <img :src="require('@/assets/images/wenchuang/明信片/青釉莲花尊2.png')" alt="青釉莲花尊2" class="postcard-image small" />
             </div>
             <div class="postcard-scatter scatter-4">
               <img :src="require('@/assets/images/wenchuang/明信片/葫芦2.png')" alt="葫芦2" class="postcard-image small" />
             </div>
             <div class="postcard-scatter scatter-5">
               <img :src="require('@/assets/images/wenchuang/明信片/木版年画2.png')" alt="木版年画2" class="postcard-image small" />
             </div>
           </div>
           
           <p class="product-desc fancy-text">寄一份非遗的故事给远方 ✉</p>
         </section>

        

      </div>
      </div>

      <!-- 底部装饰文字 -->
      <div class="footer-decoration">
        <p class="ending-text">
          <span class="rotate-text">🌟</span>
          每一件文创，都是一个故事
          <span class="rotate-text">🌟</span>
        </p>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  name: 'ShandongF4Wenchuang',
  components: {
    MainLayout
  },
     data() {
     return {
       fanHover: false,
       currentMagnetIndex: 0,
       magnetSwitching: false,
       bookmarks: [
         { hovered: false },
         { hovered: false },
         { hovered: false }
       ],

     }
   },
   computed: {
     currentMagnetImage() {
       const images = [
         require('@/assets/images/wenchuang/冰箱贴/冰箱贴1.png'),
         require('@/assets/images/wenchuang/冰箱贴/冰箱贴2.png')
       ];
       return images[this.currentMagnetIndex];
     },

   },
   methods: {
     hoverBookmark(index, isHovered) {
       this.bookmarks[index].hovered = isHovered;
     },
     switchMagnet() {
       this.magnetSwitching = true;
       setTimeout(() => {
         this.currentMagnetIndex = (this.currentMagnetIndex + 1) % 2;
         this.magnetSwitching = false;
       }, 150);
     },

   },
     mounted() {
         // 设置背景
    document.body.style.backgroundImage = `url(${require('@/assets/images/shandong/4层.png')})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
     document.body.style.backgroundPosition = "center";
     document.body.style.minHeight = "100vh";
     document.documentElement.style.minHeight = "100vh";

   },
     destroyed() {
     document.body.style.backgroundImage = "";
     document.body.style.backgroundRepeat = "";
     document.body.style.backgroundAttachment = "";
     document.body.style.backgroundSize = "";
     document.body.style.backgroundPosition = "";
     document.body.style.minHeight = "";
     document.documentElement.style.minHeight = "";

   }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;700&display=swap');
@import 'animate.css';

.wenchuang-wall {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,248,240,0.85) 100%);
  backdrop-filter: blur(10px);
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInDown 0.8s ease;
}

.main-title {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 4rem;
  color: #d4380d;
  margin-bottom: 10px;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.1);
}

.subtitle {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.5rem;
  color: #87481f;
  letter-spacing: 0.3em;
}

/* 产品容器 */
.products-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px; /* 行间距缩小一半 */
}

/* 区域通用样式 - 移除边框 */
.product-section {
  padding: 40px 20px;
  transition: transform 0.3s ease;
  animation: fadeInUp 0.8s ease;
}

.product-section:hover {
  transform: translateY(-5px);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.section-title {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 2.5rem;
  color: #fa8c16;
  margin: 0;
}

/* 装饰箭头 */
.decoration-arrow,
.decoration-spiral,
.decoration-curve,
.decoration-zigzag,
.decoration-swirl {
  font-size: 2rem;
  color: #ff7875;
  animation: bounce 2s infinite;
}

.decoration-spiral {
  animation: rotate 3s linear infinite;
}

.decoration-curve {
  animation: swing 2s ease-in-out infinite;
}

/* 书签和钥匙扣样式 */

.bookmark-desc {
  text-align: left;
  margin-left: 20%;
  margin-top: 20px;
  margin-bottom: 0;
}
.bookmarks-container {
  display: flex;
  align-items: flex-start;
  gap: 60px;
}

.bookmarks-left {
  flex: 1;
  display: flex;
  gap: 30px;
  justify-content: center;
}

.bookmark-item {
  perspective: 1000px;
  cursor: pointer;
}

.bookmark-card {
  filter: drop-shadow(0 10px 18px rgba(0,0,0,0.18));
}

.bookmark-card {
  position: relative;
  width: 200px;
  height: 320px;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.bookmark-card.flipped {
  transform: rotateY(180deg);
}

.bookmark-front,
.bookmark-back {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  backface-visibility: hidden;
}

.bookmark-back {
  transform: rotateY(180deg);
}

.keychains-right {
  flex: 1;
  text-align: center;
}

.keychain-title {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 2rem;
  color: #fa8c16;
  margin-bottom: 20px;
}

.keychains-display {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 15px;
}

.keychain-wrapper {
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.keychain-wrapper:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
}

.keychain-image {
  width: 180px;
  height: 220px;
  object-fit: contain;
  border-radius: 8px;
  transition: transform 0.3s ease;
  display: block;
}

.keychain-desc {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.2rem;
  color: #722ed1;
  margin: 0;
}

/* 横向布局 - 冰箱贴和团扇 */
.product-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

/* 冰箱贴样式 - 去除圆形限制 */
.magnets-display {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.magnet-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.magnet-image {
  width: 350px;
  height: auto;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 10px;
}

.magnet-image:hover {
  transform: scale(1.05);
}

.magnet-image.magnet-switching {
  transform: scale(0.9) rotate(5deg);
  opacity: 0.7;
}

.magnet-tip {
  font-size: 1rem;
  color: #666;
  margin-top: 15px;
  font-family: 'Noto Serif SC', serif;
  background: rgba(255,255,255,0.9);
  padding: 5px 10px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 团扇样式 - 悬浮旋转+阴影 */
.fan-display {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.fan-container { position: relative; display: inline-block; cursor: pointer; }

.fan-image {
  width: 340px;
  height: auto;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center bottom;
}

.fan-image {
  width: 340px;
  height: auto;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center center;
}

.fan-image.fan-rotating {
  animation: fan360Rotate 3s linear infinite;
}

@keyframes fan360Rotate {
  from { transform: translateY(-20px) rotate(0deg); }
  to   { transform: translateY(-20px) rotate(360deg); }
}

/* 团扇速度调整 */
.fan-image.fan-rotating {
  animation: fan360Rotate 6s linear infinite;
}

.fan-shadow {
  position: absolute;
  bottom: -8px;
  left: 10%;
  width: 80%;
  height: 22px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.18), transparent 60%);
  filter: blur(10px);
  border-radius: 50%;
  opacity: 0.25;
  transform: scaleX(0.85);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fan-shadow.shadow-active { 
  opacity: 0.45; 
  transform: scaleX(1) translateY(-12px); 
}

/* 帆布包+透卡合并一行 - 立体阴影效果 */
.combined-display {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.combined-item-wrapper {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
}

.combined-item-wrapper:hover {
  transform: perspective(1000px) rotateX(-5deg) rotateY(5deg) translateY(-15px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}

.combined-item {
  width: 220px;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.combined-item-wrapper:nth-child(even):hover {
  transform: perspective(1000px) rotateX(-5deg) rotateY(-5deg) translateY(-15px);
}

/* 明信片样式 - 多个大卡+小卡围绕 */
.postcards-scattered {
  position: relative;
  width: 100%;
  height: 600px;
  margin: 40px 0;
}

.postcard-main-group {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  z-index: 5;
}

.postcard-main {
  position: relative;
}

.postcard-main .postcard-image {
  width: 320px; /* 再大一些 */
  height: auto;
  transition: transform 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}

.postcard-main .postcard-image:hover {
  transform: scale(1.08) rotate(2deg);
}

.main-1 { transform: rotate(-5deg); }
.main-2 { transform: rotate(3deg); }
.main-3 { transform: rotate(2deg); }
.main-4 { transform: rotate(-3deg); }

.postcard-scatter {
  position: absolute;
  transition: transform 0.3s ease;
}

.postcard-scatter .postcard-image {
  width: 120px;
  height: auto;
  transition: all 0.3s ease;
}

.postcard-scatter:hover .postcard-image {
  transform: scale(1.1) rotate(5deg);
}

/* 各个小卡的位置和透明度 - 更集中 */
.scatter-1 {
  top: 25%;
  left: 20%;
  opacity: 0.7;
  transform: rotate(-15deg);
}

.scatter-2 {
  top: 15%;
  right: 25%;
  opacity: 0.6;
  transform: rotate(20deg);
}

.scatter-3 {
  bottom: 30%;
  left: 18%;
  opacity: 0.8;
  transform: rotate(10deg);
}

.scatter-4 {
  bottom: 20%;
  right: 22%;
  opacity: 0.65;
  transform: rotate(-10deg);
}

.scatter-5 {
  top: 45%;
  right: 12%;
  opacity: 0.75;
  transform: rotate(25deg);
}



/* 产品描述文字 */
.product-desc {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0;
}

.fancy-text {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.4rem;
  color: #722ed1;
  letter-spacing: 0.1em;
  position: relative;
}

/* 底部装饰 */
.footer-decoration {
  text-align: center;
  margin-top: 80px;
  padding: 40px 0;
}

.ending-text {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 2rem;
  color: #eb2f96;
  letter-spacing: 0.2em;
}

.rotate-text {
  display: inline-block;
  animation: rotate 2s linear infinite;
  margin: 0 20px;
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
    transform: translateY(-10px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes swing {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-title {
    font-size: 3rem;
  }
  
  .product-row {
    grid-template-columns: 1fr;
  }
  
  .bookmarks-grid {
    grid-template-columns: 1fr;
  }
  
  .bookmark-singles {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .bags-display,
  .magnets-display,
  .cards-display {
    flex-direction: column;
    align-items: center;
  }
  
  .bag-image,
  .fan-image,
  .card-image {
    width: 80%;
    max-width: 250px;
  }
}
</style>
