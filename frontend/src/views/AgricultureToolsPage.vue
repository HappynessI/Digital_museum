<template>
  <div class="tools-page">
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
          <router-link to="/agriculture" class="ribbon-item">莱阳梨膏</router-link>
          <a href="#tools" class="ribbon-item active">农具演进</a>
        </div>
      </div>
    </nav>

    <!-- Hero区域 -->
    <section id="tools" class="screen">
      <div class="hero" :style="{ background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${require('@/assets/images/agriculture/农具/很多农具特写.jpg')}') center/cover` }">
        <div class="hero-content">
          <h1 class="hero-title">千年农具演进史</h1>
          <p class="hero-subtitle">从木耒到芯片的智慧传承</p>
          <div class="hero-description">
            <p>从一万年前黄河冲积扇上的第一把木耒，到今日AI驱动的智慧农业，每一次工具革新都是人类文明的重要节点。在莱阳这片古老的土地上，我们见证了农具的千年演进。</p>
          </div>
          <div class="hero-features">
            <div class="feature-item navigation-card" @click="scrollToSection('timeline')">
              <span class="feature-number">演进</span>
              <span class="feature-text">历程</span>
            </div>
            <div class="feature-item navigation-card" @click="scrollToSection('heritage')">
              <span class="feature-number">现代</span>
              <span class="feature-text">传承</span>
            </div>
            <div class="feature-item feature-image">
              <img :src="require('@/assets/images/agriculture/农具/犁特写.jpg')" alt="农具" class="feature-img">
              <span class="feature-text">演进脉络</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 农具演进时间轴 -->
    <section id="timeline" class="screen">
      <div class="story">
        <div class="story-content">
          <h3 class="timeline-main-title">农具演进史</h3>
          <div class="timeline-vertical-container">
            <div class="timeline-vertical-line"></div>
            
            <!-- 第一阶段：荒火与木耒 -->
            <div class="timeline-vertical-item left" data-year="万年前">
              <div class="timeline-content-left">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/农具/犁特写.jpg')" alt="木耒农具" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
              <div class="timeline-dot">
                <span class="dot-year">万年前</span>
              </div>
              <div class="timeline-content-right">
                <div class="timeline-text-content">
                  <h4>荒火与木耒</h4>
                  <span class="timeline-subtitle">农业的"零号工具"</span>
                  <p>一万年前，黄河冲积扇上的先民把树枝用火烤弯，做成最原始的"耒"——一根分叉的木棍。耒的齿间绑上石片，便是"耜"，一推一拉，划开了东亚最早的垄沟。它笨拙，却第一次把"土地"变成了"田"。今天我们在莱阳古梨园里仍能见到它的影子：那些被犁铧翻起的沙壤，在400年梨树根系下泛着与史前同样的光泽。</p>
                </div>
              </div>
            </div>
            
            <!-- 第二阶段：铁与牛 -->
            <div class="timeline-vertical-item right" data-year="汉唐">
              <div class="timeline-content-left">
                <div class="timeline-text-content">
                  <h4>铁与牛</h4>
                  <span class="timeline-subtitle">汉唐的"生产力革命"</span>
                  <p>战国炼铁炉火，把柔软的红铜变成冷冽的生铁；东汉冶铁鼓风，又把生铁炼成坚韧的钢。于是"铁犁"与"牛轭"同时出现在画像石上——犁铧加宽，犁壁弯曲，翻土深度从10厘米下探到30厘米。在莱阳，今天仍能听到驴蹄敲击磨盘的回声。驴拉的磨，将梨果磨浆取汁，正是汉唐"铁木结合"技术的民间传承：铁轴木轮、石槽木柄，旋转之间，把"梨"变成"膏"。</p>
                </div>
              </div>
              <div class="timeline-dot">
                <span class="dot-year">汉唐</span>
              </div>
              <div class="timeline-content-right">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/农具/驴拉的磨特写.png')" alt="铁制农具" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 第三阶段：井车与水排 -->
            <div class="timeline-vertical-item left" data-year="宋元">
              <div class="timeline-content-left">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/农具/好多人围着一台机器（合照）.jpg')" alt="水利设备" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
              <div class="timeline-dot">
                <span class="dot-year">宋元</span>
              </div>
              <div class="timeline-content-right">
                <div class="timeline-text-content">
                  <h4>井车与水排</h4>
                  <span class="timeline-subtitle">宋元的水利创新</span>
                  <p>宋代《耕织图》里出现"翻车"（龙骨水车），通过齿轮把河水抬升到三米高的田畦；元代王祯《农书》记载的"水排"则用水力驱动鼓风，为铁犁、铁锄提供了更便宜的钢材。在莱阳照旺庄镇大陶漳村，人们把宋代水力思维嫁接到现代：标准化梨园铺设滴灌管网，28000亩老梨树第一次喝到"精确到毫升"的黄河水。古梨树与新管道同框，是跨越千年的"水利对话"。</p>
                </div>
              </div>
            </div>
            
            <!-- 第四阶段：蒸汽机下乡 -->
            <div class="timeline-vertical-item right" data-year="清末">
              <div class="timeline-content-left">
                <div class="timeline-text-content">
                  <h4>蒸汽机下乡</h4>
                  <span class="timeline-subtitle">清末的"金属风暴"</span>
                  <p>19世纪后半叶，山东沿海开埠。洋行把英国"艾利斯"牌火犁（蒸汽拖拉机）运到烟台港，铁甲巨兽喷吐白烟，一昼夜可耕150亩。由于燃料昂贵，它最终没能在莱阳普及，却留下一个工业隐喻：传统木犁的终点，正是钢铁时代的起点。今天，我们在梨膏生产线上仍能找到蒸汽时代的"灵魂"——巴氏灭菌罐的穹顶曲线，正是19世纪锅炉的缩小版。</p>
                </div>
              </div>
              <div class="timeline-dot">
                <span class="dot-year">清末</span>
              </div>
              <div class="timeline-content-right">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/农具/很多农具特写.jpg')" alt="蒸汽时代农具" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 第五阶段：电机与传送带 -->
            <div class="timeline-vertical-item left" data-year="20世纪">
              <div class="timeline-content-left">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/农具/很多队员研究磨面机.jpg')" alt="电气化农具" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
              <div class="timeline-dot">
                <span class="dot-year">20世纪</span>
              </div>
              <div class="timeline-content-right">
                <div class="timeline-text-content">
                  <h4>电机与传送带</h4>
                  <span class="timeline-subtitle">20世纪的"电气化"</span>
                  <p>1950年代，中国农村第一次出现"电磨"。电机替代驴力，传送带替代竹篮，莱阳梨膏作坊里响起"嗡嗡"的均匀节拍。与此同时，"铁制手摇榨汁机"进入梨园——果农把慈梨切块，投入漏斗，手摇柄一圈，清汁顺着铁皮槽流入木桶。这台看似简陋的机器，把榨汁效率提高了8倍，也为今日2000吨级梨膏工厂埋下伏笔。</p>
                </div>
              </div>
            </div>
            
            <!-- 第六阶段：芯片与算法 -->
            <div class="timeline-vertical-item right" data-year="21世纪">
              <div class="timeline-content-left">
                <div class="timeline-text-content">
                  <h4>芯片与算法</h4>
                  <span class="timeline-subtitle">21世纪的"智慧农业"</span>
                  <p>2023年，莱阳古梨园上空出现了无人机。通过摄像头观察叶片颜色，计算机帮助判断每棵树需要多少水；地面的小车沿着导航路径，把刚采摘的慈梨送到分选台——按重量、甜度、外观品质快速分类。在工厂里，电脑程序模拟梨膏制作过程：温度、湿度、浓度等数据都记录在系统中，20斤梨浓缩成1斤膏的传统工艺，现在可以通过数字化方式精确重现400年前的宫廷配方。</p>
                </div>
              </div>
              <div class="timeline-dot">
                <span class="dot-year">21世纪</span>
              </div>
              <div class="timeline-content-right">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/农具/冬天的树园.png')" alt="智慧农业" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 第七阶段：非遗与后工业 -->
            <div class="timeline-vertical-item left" data-year="现在">
              <div class="timeline-content-left">
                <div class="timeline-image-container">
                  <div class="image-frame">
                    <img :src="require('@/assets/images/agriculture/农具/老人在晒谷.png')" alt="传统工艺传承" class="timeline-image">
                    <div class="image-overlay"></div>
                  </div>
                </div>
              </div>
              <div class="timeline-dot">
                <span class="dot-year">现在</span>
              </div>
              <div class="timeline-content-right">
                <div class="timeline-text-content">
                  <h4>非遗与后工业</h4>
                  <span class="timeline-subtitle">工具的终极意义</span>
                  <p>当机械臂代替手臂、大数据代替老把式，我们为什么还要回望一把木耒？因为工具从来不只是效率，更是人与土地的"情感接口"。非遗保护的真正价值，不是把木犁放进博物馆，而是让木犁、铁犁、无人机在同一片梨园里对话："我翻过的每一寸土，你都在继续翻。"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 现代传承区域 -->
    <section id="heritage" class="screen">
      <div class="heritage-container">
        <h2 class="heritage-title">现代传承</h2>
        
        <!-- 手绘风农具装饰图案 -->
        <div class="heritage-decoration-tools"></div>
        
        <!-- 具体形状的装饰图案 -->
        <div class="star-decoration"></div>
        <div class="diamond-decoration"></div>
        <div class="triangle-decoration"></div>
        <div class="circle-decoration"></div>
        <div class="hexagon-decoration"></div>
        <div class="star-decoration"></div>
        <div class="diamond-decoration"></div>
        
        <div class="heritage-flex">
          <!-- 卡片1：下方弹出文字框 -->
          <div class="heritage-card-modern card-bottom-text" 
               :style="{ backgroundImage: `url('${require('@/assets/images/agriculture/农具/竹编篮.jpg')}')`, transform: 'translateY(-60px) rotate(-1.5deg)', opacity: 1 }">
            <div class="card-overlay"></div>
            <div class="corner-star"></div>
            <div class="corner-diamond"></div>
            <div class="card-content">
              <h3 class="card-title">传统工艺</h3>
              <p class="card-brief">千年智慧的传承</p>
            </div>
            <div class="card-expanded-text">
              <h4>传统工艺的价值传承</h4>
              <p>石磨等传统农具承载着千年智慧，在现代农业中仍有重要价值。传统工艺不仅是技术，更是文化的载体。</p>
            </div>
          </div>
          
          <!-- 卡片2：上方弹出文字框 -->
          <div class="heritage-card-modern card-top-text card-elevated" 
               :style="{ backgroundImage: `url('${require('@/assets/images/agriculture/农具/很多队员研究磨面机.jpg')}')`, transform: 'translateY(80px) rotate(1.5deg)', opacity: 1 }">
            <div class="card-overlay"></div>
            <div class="corner-triangle"></div>
            <div class="corner-circle"></div>
            <div class="card-content">
              <h3 class="card-title">学习传承</h3>
              <p class="card-brief">青年一代的使命</p>
            </div>
            <div class="card-expanded-text">
              <h4>青年一代的传承使命</h4>
              <p>年轻一代积极学习传统农具的使用方法和制作工艺，通过实地调研和亲身体验，将千年农耕智慧延续到新时代，让传统在创新中焕发新的生机。他们是传统文化的守护者和传播者。</p>
            </div>
          </div>
          
          <!-- 卡片3：下方弹出文字框 -->
          <div class="heritage-card-modern card-bottom-text" 
               :style="{ backgroundImage: `url('${require('@/assets/images/agriculture/农具/冬天的树园.png')}')`, transform: 'translateY(-60px) rotate(1.5deg)', opacity: 1 }">
            <div class="card-overlay"></div>
            <div class="corner-star"></div>
            <div class="corner-triangle"></div>
            <div class="card-content">
              <h3 class="card-title">现代融合</h3>
              <p class="card-brief">传统与现代的对话</p>
            </div>
            <div class="card-expanded-text">
              <h4>传统与现代的完美融合</h4>
              <p>在莱阳古梨园，传统与现代和谐共存。无人机与木犁、AI算法与师傅经验、智能设备与竹编篮，在同一片土地上对话："我翻过的每一寸土，你都在继续翻。"这种融合体现了技术与传统的完美结合。</p>
            </div>
          </div>
          
          <!-- 卡片4：上方弹出文字框 -->
          <div class="heritage-card-modern card-top-text card-elevated" 
               :style="{ backgroundImage: `url('${require('@/assets/images/agriculture/农具/三个女生拿着篮子.jpg')}')`, transform: 'translateY(80px) rotate(-1.5deg)', opacity: 1 }">
            <div class="card-overlay"></div>
            <div class="corner-diamond"></div>
            <div class="corner-circle"></div>
            <div class="card-content">
              <h3 class="card-title">文化传播</h3>
              <p class="card-brief">智慧的薪火相传</p>
            </div>
            <div class="card-expanded-text">
              <h4>文化传播的重要意义</h4>
              <p>通过教育实践和文化传播，让更多人了解农具文化的深厚内涵。每一次体验，每一次学习，都是对传统文化最好的传承和发扬。文化传播让传统智慧连接过去、现在和未来。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AgricultureToolsPageView',
  mounted() {
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0);
    
    // 初始化交互
    this.initNavigation();
    this.initScrollAnimations();
  },
  methods: {
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
      
      // 印章按钮点击事件
      const sealBtn = document.querySelector('.btn-seal');
      if (sealBtn) {
        sealBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector('#timeline');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    },
    
    initScrollAnimations() {
      // 时间轴滚动动画
      const timelineItems = document.querySelectorAll('.timeline-vertical-item');
      const heritageCards = document.querySelectorAll('.heritage-card-modern');
      
      const checkScrollAnimations = () => {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8;
        
        // 时间轴动画
        timelineItems.forEach((item, index) => {
          const itemRect = item.getBoundingClientRect();
          const itemTop = itemRect.top;
          const itemBottom = itemRect.bottom;
          const itemCenter = itemTop + itemRect.height / 2;
          const centerPoint = windowHeight * 0.5;
          
          // 触发动画
          if (itemTop < triggerPoint && itemBottom > 0) {
            if (!item.classList.contains('animate')) {
              setTimeout(() => {
                item.classList.add('animate');
              }, index * 100);
            }
          }
          
          // 视觉中心强调效果
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
        
        // 传承卡片动画
        heritageCards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect();
          const cardTop = cardRect.top;
          const cardBottom = cardRect.bottom;
          
          if (cardTop < triggerPoint && cardBottom > 0) {
            if (!card.classList.contains('animate')) {
              // 依次动画，每个卡片延迟150ms
              setTimeout(() => {
                card.classList.add('animate');
              }, index * 150);
            }
          }
        });
      };
      
      // 使用requestAnimationFrame优化滚动性能
      let ticking = false;
      
      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(checkScrollAnimations);
          ticking = true;
        }
      };
      
      // 监听滚动事件
      window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
      });
      
      // 页面加载时检查一次
      checkScrollAnimations();
    },
    
    // 滚动到指定区域
    scrollToSection(sectionId) {
      const target = document.querySelector(`#${sectionId}`);
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
}
</script>

<style scoped>
/* 导入Agriculture项目的完整CSS样式，并添加特定的农具演进页面样式 */
@import '@/assets/styles/agriculture.css';
@import '@/assets/styles/agriculture-tools.css';
@import '@/assets/styles/agriculture-tools-heritage.css';

/* 农具演进页面特有样式 */
.tools-page {
  font-family: 'Noto Serif SC', serif;
  background: var(--paper);
  color: var(--ink);
  line-height: 1.6;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
}

/* 印章按钮文字样式 */
.btn-seal-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.btn-seal-text .line {
  line-height: 1.2;
}

/* 时间轴点年份样式 */
.dot-year {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--amber);
  background: var(--paper);
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 时间轴副标题 */
.timeline-subtitle {
  display: block;
  font-size: 0.9rem;
  color: var(--amber);
  font-weight: 500;
  margin-bottom: 10px;
  opacity: 0.8;
}

/* 现代传承区域样式 */
.heritage-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 40px;
  position: relative;
}

.heritage-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  color: var(--amber);
  margin-bottom: 80px;
  position: relative;
}

.heritage-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, var(--amber), var(--gold));
  border-radius: 2px;
}

/* 装饰元素 */
.heritage-decoration-tools,
.star-decoration,
.diamond-decoration,
.triangle-decoration,
.circle-decoration,
.hexagon-decoration {
  position: absolute;
  opacity: 0.1;
  pointer-events: none;
}

.star-decoration {
  width: 20px;
  height: 20px;
  background: var(--amber);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.diamond-decoration {
  width: 16px;
  height: 16px;
  background: var(--gold);
  transform: rotate(45deg);
}

.triangle-decoration {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 18px solid var(--amber);
}

.circle-decoration {
  width: 14px;
  height: 14px;
  background: var(--gold);
  border-radius: 50%;
}

.hexagon-decoration {
  width: 20px;
  height: 17px;
  background: var(--amber);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

/* 现代传承卡片样式已在外部文件中定义 */

/* 导航卡片样式 */
.navigation-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.navigation-card:hover {
  background: rgba(255,255,255,0.3) !important;
  transform: translateY(-8px) scale(1.05) !important;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2) !important;
}

.navigation-card .feature-number {
  font-size: 1.8rem !important;
}

.navigation-card .feature-text {
  font-size: 1.1rem !important;
}
</style>
