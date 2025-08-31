<template>
  <div class="homepage bg-background text-foreground">
    <!-- 全局加载动画 -->
    <div v-if="isLoading" class="page-loading-overlay">
      <div class="loading-container">
        <div class="loading-spinner-ring"></div>
        <div class="loading-text">正在加载数字博物馆...</div>
        <div class="loading-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: loadingProgress + '%' }"></div>
          </div>
          <div class="progress-text">{{ loadingProgress }}%</div>
        </div>
      </div>
    </div>
    <!-- 顶部导航栏 -->
    <header class="header-glass fixed top-0 left-0 right-0 transition-transform duration-300 ease-in-out z-50">
      <div class="w-full px-2 md:px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <router-link to="/home" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img 
                :src="require('@/assets/images/practice-team-logo.png')" 
                alt="实践队logo" 
                class="h-8 w-8 object-cover rounded-full"
              >
              <span class="text-lg font-semibold text-gray-800">溯本求源 <span class="text-red-500 mx-1">|</span> 文润经心</span>
            </router-link>
          </div>
          
          <div class="flex items-center space-x-4 flex-wrap">
            <!-- 数字博物馆导航（合并入口） -->
            <nav class="hidden md:flex items-center space-x-4">
              <button @click="showAIAssistant" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors bg-gradient-to-r from-blue-50 to-purple-50 rounded-md border border-blue-200 hover:border-red-200">
                🤖 AI 智能体
              </button>
              <span class="text-gray-400">|</span>
              <router-link to="/heropage" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors bg-red-50 rounded-md border border-red-200">
                ✨ 实践队风采展示
              </router-link>
              <span class="text-gray-400">|</span>
              <router-link to="/home" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                数字博物馆
              </router-link>
              <span class="text-gray-400">|</span>
              <router-link to="/agriculture" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                农业非遗特展
              </router-link>
            </nav>
            
            <button @click="toggleTheme" class="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <i data-lucide="moon" class="h-5 w-5"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <!-- 主内容 -->
    <main class="min-h-screen pt-16">
      <!-- Hero 区域 - 轮播图 -->
      <div class="hero-carousel-section relative overflow-hidden">
        <!-- Swiper 轮播图 -->
        <div class="swiper-container" ref="swiperContainer">
          <div class="swiper-wrapper">
            <!-- 第一张轮播图 -->
            <div class="swiper-slide" :style="{ backgroundImage: `url(${slideImages.ppt1})`, backgroundPosition: 'center 60%' }">
            </div>
            
            <!-- 第二张轮播图 -->
            <div class="swiper-slide" :style="{ backgroundImage: `url(${slideImages.ppt2})` }">
            </div>
            
            <!-- 第三张轮播图 -->
            <div class="swiper-slide" :style="{ backgroundImage: `url(${slideImages.ppt3})`, backgroundPosition: 'center 65%' }">
            </div>

            <!-- 第四张轮播图 -->
            <div class="swiper-slide" :style="{ backgroundImage: `url(${slideImages.ppt4})` }">
            </div>
          </div>
          
          <!-- 分页器 -->
          <div class="swiper-pagination"></div>
          
          <!-- 导航按钮 -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
      
      <!-- 愿景与使命：独立分区 -->
      <MissionVision
        :vision-text="''"
        :mission-text="''"
        :timeline="mission.timeline"
        :combined-text="''"
        :show-title="false"
      >
        <template #aside>
          
        </template>
      </MissionVision>

      <!-- 愿景与使命下方的介绍图片 -->
      <div class="mission-intro-image-wrap">
        <img :src="introductionImage" alt="introduction" />
        <div class="mission-intro-text">
          <h3 class="mission-intro-title">愿景和使命</h3>
          <div class="mission-intro-one" v-html="formattedMissionText"></div>
        </div>
      </div>

      <!-- 团队介绍：独立分区（分层架构 + 抽屉详情） -->
      <TeamOverview id="team" :leader="team.leader" :groups="team.groups" />

      <!-- 社会实践成果展示区域 -->
      <section class="map-section">
        <div class="map-container">
          <!-- 实践队介绍 -->
          <div class="text-center mb-4">
            <h2 class="text-4xl font-bold mb-3 gradient-title">
              社会实践足迹
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              我们的社会实践队深入山西、山东两省，开展实地调研活动。通过走访调研、实地观察、深度访谈等形式，
              深入了解当地经济社会发展状况，积累了宝贵的实践经验和研究成果。
            </p>
            <div class="flex justify-center items-center gap-6 mt-3">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-red-600 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">实践目的地</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🎯</span>
                <span class="text-sm font-medium text-gray-700">调研点位</span>
              </div>
            </div>
          </div>
          
          <!-- 地图展示 -->
          <div class="flex items-start justify-between gap-4 max-w-none mx-auto">
            <!-- 左侧：实践成果红色按钮 -->
            <aside class="results-aside results-left">
              <button @click="showPracticeResults" class="practice-success-btn">
                <div class="btn-content">
                  <div class="btn-icon">🏆</div>
                  <div class="btn-text">实践成果</div>
                </div>
              </button>
            </aside>

            <!-- 中间：地图 -->
            <div class="flex-1 max-w-none">
              <div ref="chinaChart" class="china-map">
                <div v-if="mapLoading" class="loading-indicator">
                  <div class="loading-spinner"></div>
                  <span>正在加载实践足迹地图...</span>
                </div>
                <!-- 左上角团队 Logo -->
                <img
                  :src="require('@/assets/images/practice-team-logo.png')"
                  alt="实践队logo"
                  class="map-corner-logo"
                >
              </div>
            </div>

            <!-- 右侧：成果统计卡（桌面端显示） -->
            <aside class="results-aside results-right">
              <div class="mini-cards">
                <div class="mini-card">
                  <div class="mini-icon un">UN</div>
                  <div>
                    <div class="mini-num">1</div>
                    <div class="mini-label">联合国级</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon national">国</div>
                  <div>
                    <div class="mini-num">4</div>
                    <div class="mini-label">国家级</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon provincial">省</div>
                  <div>
                    <div class="mini-num">5</div>
                    <div class="mini-label">省级</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon municipal">市</div>
                  <div>
                    <div class="mini-num">1</div>
                    <div class="mini-label">市级</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon neutral">🎤</div>
                  <div>
                    <div class="mini-num">14</div>
                    <div class="mini-label">篇采访</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon neutral">📄</div>
                  <div>
                    <div class="mini-num">4万</div>
                    <div class="mini-label">字调查报告</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon neutral">🏛️</div>
                  <div>
                    <div class="mini-num">11</div>
                    <div class="mini-label">非遗项目</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          
          <!-- 非遗级别统计（移动端显示） -->
          <div class="results-cards-mobile mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div class="stat-card heritage-level-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-xl text-white font-bold">UN</span>
                </div>
                <h3 class="text-2xl font-bold text-yellow-600 mb-2">1</h3>
                <p class="text-gray-600 font-medium">联合国级</p>
              </div>
            </div>
            
            <div class="stat-card heritage-level-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-xl text-white font-bold">国</span>
                </div>
                <h3 class="text-2xl font-bold text-red-600 mb-2">4</h3>
                <p class="text-gray-600 font-medium">国家级</p>
              </div>
            </div>
            
            <div class="stat-card heritage-level-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-xl text-white font-bold">省</span>
                </div>
                <h3 class="text-2xl font-bold text-blue-600 mb-2">5</h3>
                <p class="text-gray-600 font-medium">省级</p>
              </div>
            </div>
            
            <div class="stat-card heritage-level-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-xl text-white font-bold">市</span>
                </div>
                <h3 class="text-2xl font-bold text-green-600 mb-2">1</h3>
                <p class="text-gray-600 font-medium">市级</p>
              </div>
            </div>
          </div>
          
          <!-- 调研成果统计（移动端显示） -->
          <div class="results-cards-mobile mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div class="stat-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl">🎤</span>
                </div>
                <h3 class="text-2xl font-bold text-red-600 mb-2">14</h3>
                <p class="text-gray-600 font-medium">篇采访</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl">📄</span>
                </div>
                <h3 class="text-2xl font-bold text-red-600 mb-2">4万</h3>
                <p class="text-gray-600 font-medium">字调查报告</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl">🏛️</span>
                </div>
                <h3 class="text-2xl font-bold text-red-600 mb-2">11</h3>
                <p class="text-gray-600 font-medium">非遗项目</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 非遗项目详细展示 -->
      <section class="heritage-projects-section">
        <div class="container mx-auto px-4">
          <h3 class="section-title">非遗项目详览</h3>
          <div class="heritage-layout">
          
          <!-- 项目分类展示（左列，竖向列表） -->
          <div class="heritage-categories">
            <!-- 联合国级 -->
            <div class="heritage-category">
              <div class="category-header">
                <div class="level-badge level-un">联合国级</div>
                <h4 class="category-title">联合国教科文组织非物质文化遗产名录</h4>
              </div>
              <div class="projects-grid">
                <div class="project-card">
                  <div class="project-name">联合国教科文组织非物质文化遗产名录</div>
                  <div class="project-region">国际认定</div>
                </div>
              </div>
            </div>

            <!-- 国家级 -->
            <div class="heritage-category">
              <div class="category-header">
                <div class="level-badge level-national">国家级</div>
                <h4 class="category-title">国家级非物质文化遗产 (4项)</h4>
              </div>
              <div class="projects-grid">
                <div class="project-card">
                  <div class="project-name">锔瓷堆</div>
                  <div class="project-region">山东省</div>
                </div>
                <div class="project-card">
                  <div class="project-name">风筝</div>
                  <div class="project-region">山东省</div>
                </div>
                <div class="project-card">
                  <div class="project-name">杨家埠木版年画</div>
                  <div class="project-region">山东省</div>
                </div>
                <div class="project-card">
                  <div class="project-name">潍坊剪纸</div>
                  <div class="project-region">山东省</div>
                </div>
              </div>
            </div>

            <!-- 省级 -->
            <div class="heritage-category">
              <div class="category-header">
                <div class="level-badge level-provincial">省级</div>
                <h4 class="category-title">省级非物质文化遗产 (5项)</h4>
              </div>
              <div class="projects-grid">
                <div class="project-card">
                  <div class="project-name">胶东传统手作香</div>
                  <div class="project-region">山东省</div>
                </div>
                <div class="project-card">
                  <div class="project-name">汉服制作技艺</div>
                  <div class="project-region">传统服饰</div>
                </div>
                <div class="project-card">
                  <div class="project-name">国画技艺</div>
                  <div class="project-region">传统绘画</div>
                </div>
                <div class="project-card">
                  <div class="project-name">手塑工艺</div>
                  <div class="project-region">传统手工</div>
                </div>
                <div class="project-card">
                  <div class="project-name">核雕技艺</div>
                  <div class="project-region">微雕艺术</div>
                </div>
              </div>
            </div>

            <!-- 市级 -->
            <div class="heritage-category">
              <div class="category-header">
                <div class="level-badge level-municipal">市级</div>
                <h4 class="category-title">市级非物质文化遗产 (1项)</h4>
              </div>
              <div class="projects-grid">
                <div class="project-card">
                  <div class="project-name">烟台市级非物质文化遗产项目</div>
                  <div class="project-region">山东省烟台</div>
                </div>
              </div>
            </div>
          </div>
          
          </div>
          
        </div>
      </section>

      <!-- 关键数据总览（扩展版） -->
      <section class="stats-extended">
        <div class="container mx-auto px-4">
          <h3 class="section-title">关键数据总览</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-num">128+</div>
              <div class="stat-desc">深度访谈对象</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📝</div>
              <div class="stat-num">186,000+</div>
              <div class="stat-desc">报告撰写字数</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏛️</div>
              <div class="stat-num">2 省 3 市</div>
              <div class="stat-desc">覆盖区域</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏷️</div>
              <div class="stat-num">27 项</div>
              <div class="stat-desc">非遗项目（国家/省/市级）</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🎥</div>
              <div class="stat-num">530+</div>
              <div class="stat-desc">影像素材（照片/视频）</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 非遗分级统计 · 可视化图表（ECharts） -->
      <section class="heritage-charts">
        <div class="container mx-auto px-4">
          <h3 class="section-title">非遗分级与城市分布</h3>
          <div class="charts-grid">
            <div class="chart-box">
              <div class="chart-title">分级占比</div>
              <div ref="heritageLevelChart" class="chart-canvas"></div>
            </div>
            <div class="chart-box">
              <div class="chart-title">城市展项数量</div>
              <div ref="cityCountChart" class="chart-canvas"></div>
            </div>
          </div>
        </div>
      </section>

      

      
    </main>
    
    <!-- 页脚（内容由你后续补充） -->
    <footer class="site-footer">
      <div class="container mx-auto px-4">
        <div class="footer-inner">
          <!-- 页脚功能导航 -->
          <div class="footer-content">
            <div class="footer-nav-grid">
              <!-- 导航 -->
              <div class="footer-section">
                <h3 class="footer-section-title">
                  <i class="section-icon">🧭</i>
                  导航
                </h3>
                <ul class="footer-nav-list">
                  <li><a href="/heropage" class="footer-nav-link">实践队风采展示</a></li>
                  <li><a href="/home" class="footer-nav-link">数字博物馆</a></li>
                  <li><a href="/agriculture" class="footer-nav-link">农业非遗特展</a></li>
                </ul>
              </div>

              <!-- 公告 -->
              <div class="footer-section">
                <h3 class="footer-section-title">
                  <i class="section-icon">🔔</i>
                  公告
                </h3>
                <ul class="footer-nav-list">
                  <li><a href="#" class="footer-nav-link">网站重大更新公告</a></li>
                </ul>
              </div>

              <!-- 关于 -->
              <div class="footer-section">
                <h3 class="footer-section-title">
                  <i class="section-icon">ℹ️</i>
                  关于
                </h3>
                <ul class="footer-nav-list">
                  <li><a href="#" class="footer-nav-link">文润经心实践队</a></li>
                  <li><a href="#" class="footer-nav-link">与我们联系</a></li>
                </ul>
              </div>

              <!-- 技术支持 -->
              <div class="footer-section">
                <h3 class="footer-section-title">
                  <i class="section-icon">⚡</i>
                  技术支持
                </h3>
                <ul class="footer-nav-list">
                  <li><a href="#" class="footer-nav-link">Vue.js <span class="external-icon">↗</span></a></li>
                  <li><a href="#" class="footer-nav-link">ECharts <span class="external-icon">↗</span></a></li>
                  <li><a href="#" class="footer-nav-link">Swiper <span class="external-icon">↗</span></a></li>
                  <li><a href="#" class="footer-nav-link">Tailwind CSS <span class="external-icon">↗</span></a></li>
                </ul>
              </div>

              <!-- 关注 -->
              <div class="footer-section">
                <h3 class="footer-section-title">
                  <i class="section-icon">❤️</i>
                  关注
                </h3>
                <div class="footer-follow-content">
                  <p class="follow-label">微信公众号</p>
                  <div class="qr-code">
                    <img src="/homepage/images/gongzhongh.jpg" alt="微信公众号二维码" class="qr-image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    
    <!-- AI智能体对话窗口 - 通过导航栏按钮触发 -->
    <AIDialog :visible="showAI" @close="showAI = false" />
  </div>
</template>

<script>
import MissionVision from '@/components/MissionVision.vue'
import TeamOverview from '@/components/TeamOverview.vue'
import AIDialog from '@/components/AIDialog.vue'

export default {
  name: 'HomePageView',
  components: { MissionVision, TeamOverview, AIDialog },
  computed: {
    formattedMissionText() {
      return this.mission.oneLiner
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // 转换markdown加粗为HTML
        .split('\n\n')  // 按双换行分段
        .map(paragraph => `<p class="mission-paragraph">${paragraph}</p>`)  // 每段包装为p标签
        .join('')
    }
  },
  data() {
    return {
      isLoading: true,
      loadingProgress: 0,
      mapLoading: true,
      showAI: false,
      swiper: null,
      echarts: null,
      chart: null, // 保留，供其他图表使用
      mapChart: null, // 专用于地图实例，避免与其他图表冲突
      cityChart: null,
      currentMapLevel: 'china', // china | province
      currentProvince: null,
      introductionImage: process.env.BASE_URL + 'homepage/images/introduction.jpg',
      slideImages: {
        ppt1: process.env.BASE_URL + 'homepage/images/home_ppt1.jpg',
        ppt2: process.env.BASE_URL + 'homepage/images/home_ppt2.jpg',
        ppt3: process.env.BASE_URL + 'homepage/images/home_ppt3.jpg',
        ppt4: process.env.BASE_URL + 'homepage/images/home_ppt4.jpg'
      },
      // 顶部横幅/行动按钮
      banner: {
        tagline: '以数叙事，见证非遗的当代生命力',
        actions: [
          { text: '了解愿景', to: '#mission' },
          { text: '查看团队', to: '#team' }
        ]
      },
      // 愿景使命数据
      mission: {
        vision: '守护并活化在地文化记忆，推动社会参与',
        mission: '以发现—记录—传播为路径，促公共文化服务优化',
        oneLiner: '我们的**愿景**是让沉淀千年的非遗文化在数字时代焕发新生，从历史的珍藏转变为涌动于日常生活的鲜活力量，成为凝聚民族认同、坚定文化自信的源泉。\n\n我们的**使命**是深入文化腹地，通过系统的数字化记录与存续，守护非遗根脉；以创新的文创开发与新媒体传播，打破文化壁垒，使其更广泛地融入现代生活；并搭建产学研融合的桥梁，探索可持续的传承模式。我们旨在以青年之眼发现文化之美，以科技之力延续非遗之火，最终推动传统文化在创造性转化与创新性发展中薪火相传，生生不息。',
        methods: [
          { title: '发现', points: ['田野走访', '问题定位'], icon: '🔍' },
          { title: '记录', points: ['标准化方法沉淀', '图像/文本/数据'], icon: '📝' },
          { title: '传播', points: ['数字化叙事', '参与式展示'], icon: '📣' }
        ],
        timeline: []
      },
      // 团队分层结构
      team: {
        leader: { name: '指导老师', title: '总负责人', avatar: require('@/assets/images/practice-team-logo.png') },
        groups: [
          { 
            key: 'digital', 
            name: '数字组', 
            desc: '数据治理与可视化', 
            tags: ['数据','可视化'], 
            members: [
              { name: '唐宇阔', role: '组长', photo: process.env.BASE_URL + 'homepage/images/digital/数字组-组长-唐宇阔.jpg' },
              { name: '李泓伯', role: '成员', photo: process.env.BASE_URL + 'homepage/images/digital/数字组-李泓伯.jpg' },
              { name: '王一涵', role: '成员', photo: process.env.BASE_URL + 'homepage/images/digital/数字组-王一涵.jpg' }
            ]
          },
          { 
            key: 'photo', 
            name: '摄影组', 
            desc: '影像采集与编辑', 
            tags: ['影像','拍摄'], 
            members: [
              { name: '邓语馨', role: '组长', photo: process.env.BASE_URL + 'homepage/images/camera/摄影组-组长-邓语馨.jpg' },
              { name: '高琳纳', role: '成员', photo: process.env.BASE_URL + 'homepage/images/camera/摄影组-高琳纳.png' }
            ]
          },
          { 
            key: 'promo', 
            name: '宣传组', 
            desc: '品牌与传播', 
            tags: ['新媒体','海报'], 
            members: [
              { name: '唐震', role: '组长', photo: process.env.BASE_URL + 'homepage/images/Promotion/宣传组-组长-唐震.jpg' },
              { name: '卢蓉', role: '组长', photo: process.env.BASE_URL + 'homepage/images/Promotion/宣传组-组长-卢蓉.jpg' },
              { name: '宋佳轩', role: '成员', photo: process.env.BASE_URL + 'homepage/images/Promotion/宣传组-宋佳轩.jpg' },
              { name: '张诗淇', role: '成员', photo: process.env.BASE_URL + 'homepage/images/Promotion/宣传组-张诗淇.png' },
              { name: '沈沫含', role: '成员', photo: process.env.BASE_URL + 'homepage/images/Promotion/宣传组-沈沫含.png' },
              { name: '赵敏彤', role: '成员', photo: process.env.BASE_URL + 'homepage/images/Promotion/宣传组-赵敏彤.png' },
              { name: '赵梦冉', role: '成员', photo: process.env.BASE_URL + 'homepage/images/Promotion/宣传组-赵梦冉.jpg' },
              { name: '杨承金', role: '成员', photo: process.env.BASE_URL + 'homepage/images/Promotion/宣传组-杨承金.jpg' },
              { name: '王佳瑶', role: '成员', photo: process.env.BASE_URL + 'homepage/images/Promotion/宣传组-王佳瑶.png' },
              { name: '陈宇', role: '成员', photo: process.env.BASE_URL + 'homepage/images/Promotion/宣传组-陈宇.png' },
              { name: '贾文格格', role: '成员', photo: process.env.BASE_URL + 'homepage/images/Promotion/宣传组-贾文格格.png' }
            ]
          },
          { 
            key: 'research', 
            name: '调研组', 
            desc: '田野与文献研究', 
            tags: ['方法','访谈'], 
            members: [
              { name: '王雪婷', role: '组长', photo: process.env.BASE_URL + 'homepage/images/Research/调研组-组长-王雪婷.jpg' },
              { name: '韦亚萍', role: '组长', photo: process.env.BASE_URL + 'homepage/images/Research/调研组-组长-韦亚萍.png' },
              { name: '葛照然', role: '队长', photo: process.env.BASE_URL + 'homepage/images/Research/队长-调研组-葛照然.png' },
              { name: '田欣', role: '成员', photo: process.env.BASE_URL + 'homepage/images/Research/调研组-田欣.jpg' },
              { name: '周艺埼', role: '成员', photo: process.env.BASE_URL + 'homepage/images/Research/调研组-周艺埼.jpg' }
            ]
          },
          { 
            key: 'ops', 
            name: '外联组', 
            desc: '后勤与协调', 
            tags: ['行政','对接'], 
            members: [
              { name: '野菲雪', role: '组长', photo: process.env.BASE_URL + 'homepage/images/External_relation/外联组-组长-野菲雪.jpg' },
              { name: '李一帆', role: '成员', photo: process.env.BASE_URL + 'homepage/images/External_relation/外联组-李一帆.png' },
              { name: '丁培婧', role: '成员', photo: process.env.BASE_URL + 'homepage/images/External_relation/外联组-丁培婧.png' },
              { name: '施云峰', role: '成员', photo: process.env.BASE_URL + 'homepage/images/External_relation/外联组-施云峰.png' },
              { name: '王灿', role: '成员', photo: process.env.BASE_URL + 'homepage/images/External_relation/外联组-王灿.png' }
            ]
          },
          { 
            key: 'thinktank', 
            name: '智囊团', 
            desc: '策略与顾问', 
            tags: ['策略','评审'], 
            members: [
              { name: '曹子平', role: '成员', photo: process.env.BASE_URL + 'homepage/images/smart/智囊团-曹子平.jpeg' },
              { name: '田雨萱', role: '成员', photo: process.env.BASE_URL + 'homepage/images/smart/智囊团-田雨萱.png' },
              { name: '迟学君', role: '成员', photo: process.env.BASE_URL + 'homepage/images/smart/智囊团-迟学君.jpg' }
            ]
          }
        ]
      },

      // 兼容旧用法的展示块（已不使用卡片，仅保留以防回退）
      missionBlocks: [],
      
    }
  },
  mounted() {
    // 强制滚动到页面顶部
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    this.startLoading();
    this.missionBlocks = this.mission.methods.map(m => ({ title: m.title, points: m.points, icon: m.icon }))
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
    }
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    
    // 开始加载流程
    async startLoading() {
      try {
        // 步骤1: 预加载图片 (30%)
        await this.preloadImages();
        this.updateLoadingProgress(30);
        
        // 步骤2: 加载首页资源 (60%)
        await this.loadHomepageAssets();
        this.updateLoadingProgress(60);
        
        // 步骤3: 初始化图表 (90%)
        await this.initCharts();
        this.updateLoadingProgress(90);
        
        // 步骤4: 完成加载 (100%)
        this.updateLoadingProgress(100);
        
        // 延迟一点时间让用户看到100%，然后隐藏加载界面
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
        
      } catch (error) {
        // 即使出错也要隐藏加载界面
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    
    // 更新加载进度
    updateLoadingProgress(progress) {
      const startProgress = this.loadingProgress;
      const difference = progress - startProgress;
      const steps = 20;
      const stepSize = difference / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        this.loadingProgress = Math.min(startProgress + (stepSize * currentStep), progress);
        
        if (currentStep >= steps || this.loadingProgress >= progress) {
          clearInterval(interval);
          this.loadingProgress = progress;
        }
      }, 50);
    },
    
    // 预加载图片
    preloadImages() {
      return new Promise((resolve) => {
        const images = [
          this.slideImages.ppt1,
          this.slideImages.ppt2,
          this.slideImages.ppt3,
          this.slideImages.ppt4,
          require('@/assets/images/practice-team-logo.png'),
          require('@/assets/images/logo.png')
        ];
        
        let loadedCount = 0;
        const totalImages = images.length;
        
        if (totalImages === 0) {
          resolve();
          return;
        }
        
        // 预加载所有图片
        images.forEach(src => {
          const img = new Image();
          img.onload = img.onerror = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
              resolve();
            }
          };
          img.src = src;
        });
      });
    },
    loadHomepageAssets() {
      return new Promise((resolve) => {
        let loadedCount = 0;
        const totalAssets = 3; // Swiper CSS, ECharts+Map, Swiper JS
        
        const checkComplete = () => {
          loadedCount++;
          if (loadedCount >= totalAssets) {
            resolve();
          }
        };
        
        // 加载Tailwind CSS（仅开发环境使用 CDN，生产环境请使用构建集成）
        const isProduction = process.env.NODE_ENV === 'production';
        if (!isProduction && !document.querySelector('script[src*="tailwindcss"]')) {
          const tailwindScript = document.createElement('script');
          tailwindScript.src = 'https://cdn.tailwindcss.com';
          document.head.appendChild(tailwindScript);
        }

        // 加载Swiper CSS
        if (!document.querySelector('link[href*="swiper"]')) {
          const swiperCSS = document.createElement('link');
          swiperCSS.rel = 'stylesheet';
          swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';
          swiperCSS.onload = checkComplete;
          swiperCSS.onerror = checkComplete;
          document.head.appendChild(swiperCSS);
        } else {
          checkComplete();
        }

        // 加载ECharts 并注册中国地图（省级 GeoJSON）
        const ensureEchartsLoaded = () => new Promise((resolve) => {
          if (window.echarts) { resolve(); return; }
          const echartsScript = document.createElement('script');
          echartsScript.src = 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js';
          echartsScript.onload = resolve;
          echartsScript.onerror = resolve;
          document.head.appendChild(echartsScript);
        });

        const loadChinaMap = () => new Promise((resolve) => {
          // 省级行政区划 GeoJSON（含边界与多边形）
          const url = 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full';
          fetch(url)
            .then((r) => r.json())
            .then((geojson) => {
              if (window.echarts && geojson) {
                window.echarts.registerMap('china', geojson);
              }
              resolve();
            })
            .catch(() => resolve());
        });

        ensureEchartsLoaded().then(() => {
          this.echarts = window.echarts;
          loadChinaMap().then(() => {
            this.initMap();
            checkComplete();
          });
        });

        // 加载Lucide Icons (非必需，不计入加载进度)
        if (!window.lucide) {
          const lucideScript = document.createElement('script');
          lucideScript.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.js';
          lucideScript.onload = () => {
            setTimeout(() => {
              if (window.lucide) {
                window.lucide.createIcons();
              }
            }, 100);
          };
          document.head.appendChild(lucideScript);
        }

        // 加载Swiper JS
        if (!window.Swiper) {
          const swiperScript = document.createElement('script');
          swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
          swiperScript.onload = () => {
            this.initSwiper();
            checkComplete();
          };
          swiperScript.onerror = checkComplete;
          document.head.appendChild(swiperScript);
        } else {
          this.initSwiper();
          checkComplete();
        }

        // 加载自定义样式 (非必需，不计入加载进度)
        const customCSS = document.createElement('link');
        customCSS.rel = 'stylesheet';
        customCSS.href = '/homepage/styles.css';
        document.head.appendChild(customCSS);
      });
    },

    initSwiper() {
      this.$nextTick(() => {
        if (window.Swiper && this.$refs.swiperContainer) {
          this.swiper = new window.Swiper(this.$refs.swiperContainer, {
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
            },
            loop: true,
            speed: 600,
            effect: 'slide',
            spaceBetween: 8,
            allowTouchMove: true,
            simulateTouch: true,
            roundLengths: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            // 使用平滑移动切换，移除淡入淡出配置
          });
        }
      });
    },

    initMap() {
      this.$nextTick(() => {
        if (this.echarts && this.$refs.chinaChart) {
          this.mapLoading = false;
          this.mapChart = this.echarts.init(this.$refs.chinaChart);
          this.renderChinaMap();
          // 确保地图充分利用容器空间
          setTimeout(() => {
            if (this.mapChart) {
              this.mapChart.resize();
            }
          }, 100);
        }
      });
    },

    // 渲染全国（省级）地图并高亮到访省份
    renderChinaMap() {
      this.currentMapLevel = 'china';
      this.currentProvince = null;
      const visitedProvinces = ['山东省', '山西省'];
      
      // 定义实践城市坐标（去掉"市"字）
      const practiceCities = [
        // 山东省城市
        { name: '淄博', value: [118.054, 36.813], province: '山东' },
        { name: '潍坊', value: [119.161756, 36.706774], province: '山东' },
        { name: '烟台', value: [121.447935, 37.463822], province: '山东' },
        // 山西省城市
        { name: '太原', value: [112.549248, 37.87059], province: '山西' },
        { name: '晋城', value: [112.853, 35.497], province: '山西' },
        { name: '晋中', value: [112.736, 37.687], province: '山西' },
        { name: '运城', value: [111.003, 35.022], province: '山西' }
      ];
      
      // 天津坐标
      const tianjinCoord = [117.190182, 39.125596];

      const option = {
        title: {
          text: '实践足迹地图',
          left: 'center',
          textStyle: { color: '#333', fontWeight: 700 }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params && params.name ? params.name : ''
          }
        },
        geo: {
          map: 'china', 
          roam: false, // 禁用用户缩放和拖拽
          zoom: 4.4, // 放大至少两倍
          center: [116.5, 39.5], // 华北地区居中
          label: { show: false },
          itemStyle: { areaColor: '#f3f4f6', borderColor: '#9ca3af' },
          emphasis: { label: { show: true, color: '#111827' }, itemStyle: { areaColor: '#fde8e8' } },
          regions: visitedProvinces.map((name) => ({ 
            name, 
            itemStyle: { 
              areaColor: '#f87171', // 降低对比度的红色
              borderColor: '#dc2626',
              borderWidth: 2
            } 
          }))
        },
        series: [
          // 天津城市标记
          {
            name: '出发地',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'diamond', // 使用菱形标记
            symbolSize: 20,
            itemStyle: {
              color: '#3b82f6', // 蓝色标记
              borderColor: '#1e40af',
              borderWidth: 2
            },
            label: { 
              show: true, 
              formatter: '天津', 
              color: '#1f2937', 
              fontWeight: 600,
              fontSize: 12,
              offset: [0, -15] 
            },
            data: [{ name: '天津', value: tianjinCoord }]
          },
          // 实践城市标记
          {
            name: '实践城市',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'circle',
            symbolSize: 12,
            label: { 
              show: true, 
              formatter: '{b}', 
              color: '#1f2937', // 与天津一致的深灰色
              fontWeight: 700, 
              offset: [0, -14] 
            },
            itemStyle: { color: '#dc2626', shadowBlur: 8, shadowColor: 'rgba(220,38,38,0.4)' },
            data: practiceCities
          },
          // 从天津到各实践城市的箭头
          {
            name: '实践路线',
            type: 'lines',
            coordinateSystem: 'geo',
            lineStyle: {
              color: '#fbbf24', // 亮黄色
              width: 2,
              curveness: 0.2, // 添加弧度
              type: 'solid'
            },
            tooltip: { show: false },
            effect: {
              show: true,
              period: 3,
              trailLength: 0.2,
              color: '#fbbf24', // 亮黄色
              symbolSize: 6
            },
            data: practiceCities.map(city => ({
              fromName: '天津',
              toName: city.name,
              coords: [tianjinCoord, city.value]
            }))
          }
        ]
      };
      this.mapChart.setOption(option, true);
      this.mapChart.off('click');
      this.mapChart.on('click', (params) => {
        // 省份点击切换到省级地图
        if (params.name === '山东省') this.renderProvinceMap('山东省', '370000');
        if (params.name === '山西省') this.renderProvinceMap('山西省', '140000');
        
        // 城市点击跳转到对应博物馆
        if (params.seriesType === 'scatter' && params.seriesName === '实践城市') {
          this.handleCityClick(params.name);
        }
      });
    },

    // 渲染省份的市级行政区划
    renderProvinceMap(provinceName, provinceCode) {
      this.currentMapLevel = 'province';
      this.currentProvince = provinceName;
      const url = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${provinceCode}_full`;
      fetch(url)
        .then((r) => r.json())
        .then((geojson) => {
          if (this.echarts && geojson) {
            this.echarts.registerMap(provinceName, geojson);
          }
          
          // 定义走访过的城市（去掉"市"字）
          let visitedCities = [];
          if (provinceName === '山东省') {
            visitedCities = ['淄博市', '潍坊市', '烟台市']; // 保持原始地图数据中的名称用于匹配
          } else if (provinceName === '山西省') {
            visitedCities = ['太原市', '晋城市', '晋中市', '运城市']; // 保持原始地图数据中的名称用于匹配
          }
          
          const option = {
            title: { text: `${provinceName} · 市级行政区`, left: 'center', textStyle: { color: '#333', fontWeight: 700 } },
            tooltip: {
              trigger: 'item',
              formatter: function(params) {
                return params && params.name ? params.name.replace('市','') : ''
              }
            },
            graphic: [{
              type: 'text', left: 20, top: 16,
              style: { text: '返回全国', fill: '#ef4444', font: 'bold 14px "Microsoft YaHei", Arial, sans-serif' },
              onclick: () => this.renderChinaMap()
            }],
            geo: {
              map: provinceName, 
              roam: false, // 禁用省级地图缩放
              zoom: 1.1, // 稍微放大省级地图
              label: { 
                show: true, 
                color: '#374151', 
                fontSize: 12,
                formatter: function(params) {
                  // 移除城市名称中的"市"字
                  return params.name.replace('市', '');
                }
              },
              itemStyle: { areaColor: '#fff', borderColor: '#9ca3af' },
              emphasis: { 
                label: { 
                  show: true, 
                  color: '#111827', 
                  fontWeight: 700,
                  formatter: function(params) {
                    // 移除城市名称中的"市"字
                    return params.name.replace('市', '');
                  }
                }, 
                itemStyle: { areaColor: '#fee2e2' } 
              },
              regions: visitedCities.map((name) => ({ 
                name, 
                itemStyle: { 
                  areaColor: '#f87171', // 与主地图一致的颜色
                  borderColor: '#dc2626',
                  borderWidth: 2
                } 
              }))
            },
            series: [] // 删除所有大头钉
          };
          this.mapChart && this.mapChart.setOption(option, true);
          this.mapChart && this.mapChart.off('click');
          this.mapChart && this.mapChart.on('click', (params) => {
            // 点击任何城市都跳转到对应省份博物馆
            if (visitedCities.includes(params.name)) {
              this.handleCityClick(params.name);
            }
          });
        })
        .catch(() => { /* 忽略错误，保持现状 */ });
    },



    toggleTheme() {
      // 主题切换逻辑
      document.body.classList.toggle('dark');
      document.documentElement.setAttribute('data-theme', 
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
      );
    },

    showAIAssistant() {
      // 显示AI智能体
      this.showAI = true;
    },

    showPracticeResults() {
      // 跳转到实践成果页面
      this.$router.push('/results');
    },

    handleCityClick(cityName) {
      // 处理城市点击事件，跳转到对应博物馆
      // 统一处理城市名称，移除"市"字进行比较
      const normalizedCityName = cityName.replace('市', '');
      const shanxiCities = ['太原', '晋城', '晋中', '运城'];
      const shandongCities = ['淄博', '潍坊', '烟台'];
      
      if (shanxiCities.includes(normalizedCityName) || shandongCities.includes(normalizedCityName)) {
        this.$router.push('/home');
      }
    },

    // 非遗分级/城市分布图
    initCharts() {
      return new Promise((resolve) => {
        if (!window.echarts) {
          resolve();
          return;
        }
      // 玫瑰图
      const levelEl = this.$refs.heritageLevelChart;
      if (levelEl) {
        const level = window.echarts.init(levelEl);
        level.setOption({
          color: ['#ef4444','#f97316','#f59e0b','#6b7280'],
          tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
          legend: { bottom: 0, textStyle: { color: '#6b7280' } },
          series: [{
            type: 'pie', name: '分级占比', roseType: 'radius',
            radius: ['25%','70%'], center: ['50%','45%'],
            itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
            label: { color: '#374151' },
            emphasis: { label: { show: true, fontWeight: 800, color: '#111827' } },
            data: [
              { value: 1, name: '联合国级' },
              { value: 4, name: '国家级' },
              { value: 5, name: '省级' },
              { value: 1, name: '市级' }
            ]
          }],
          animationDuration: 800,
          animationEasing: 'cubicOut'
        });
      }

      // 横向柱状
      const cityEl = this.$refs.cityCountChart;
      if (cityEl) {
        const city = window.echarts.init(cityEl);
        city.setOption({
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { left: 16, right: 16, bottom: 18, top: 26, containLabel: true },
          xAxis: {
            type: 'value', boundaryGap: [0,0.01],
            axisLabel: { color: '#6b7280' },
            splitLine: { lineStyle: { color: '#f3f4f6' } }
          },
          yAxis: {
            type: 'category', data: ['烟台','潍坊','淄博'],
            axisLabel: { color: '#374151' }
          },
          series: [{
            type: 'bar', name: '展项数量', barWidth: 18,
            itemStyle: {
              color: new window.echarts.graphic.LinearGradient(0,0,1,0,[
                { offset: 0, color: '#fecaca' },
                { offset: 1, color: '#ef4444' }
              ]),
              borderRadius: [0,8,8,0]
            },
            label: { show: true, position: 'right', color: '#ef4444', fontWeight: 700 },
            data: [1,4,5] // 对应烟台、潍坊、淄博的项目数量
          }],
          animationDuration: 700,
          animationEasing: 'cubicOut'
        });
        this.chart = city;
      }
      
      // 图表初始化完成
      resolve();
      });
    }
  }
}
</script>

<style>
/* 全局加载动画样式 */
.page-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(10px);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

.loading-spinner-ring {
  width: 80px;
  height: 80px;
  border: 6px solid #f1f5f9;
  border-top: 6px solid #ef4444;
  border-radius: 50%;
  animation: spinner-ring 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

@keyframes spinner-ring {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.loading-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.loading-progress {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
  animation: progress-shimmer 1.5s infinite;
}

@keyframes progress-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-text {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

/* 愿景与使命下方介绍图片样式 */
.mission-intro-image-wrap {
  /* 两列布局：左图右文 */
  max-width: 1400px;
  margin: 0 auto 1rem;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2.5rem;
  align-items: stretch; /* 左右两列等高 */
}
.mission-intro-image-wrap img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain; /* 防止变形，整体缩放以适配文字高度 */
  border-radius: 12px;
}

.mission-intro-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #374151;
  justify-self: center; /* 水平方向居中到右侧空白区域中间 */
  text-align: center;
  padding: 0 1rem;
}

.mission-intro-title {
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 4rem;
  margin-top: -1rem;
}
.mission-intro-one {
  font-size: 1.125rem;
  color: #374151;
}

.mission-paragraph {
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1.7;
}

.mission-paragraph:last-child {
  margin-bottom: 0;
}

.mission-paragraph strong {
  color: #dc2626;
  font-weight: 700;
}

@media (max-width: 768px) {
  .mission-intro-image-wrap {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 0 1rem;
    margin: 0 auto 0.5rem;
  }
  .mission-intro-image-wrap img {
    width: 100%;
    max-width: 280px;
    height: auto;
    margin: 0 auto;
    object-fit: contain;
  }
  .mission-intro-text {
    font-size: 1rem;
    padding: 0;
  }
  .mission-intro-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    margin-top: -0.5rem;
  }
  .mission-paragraph {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }
}

/* 导入原始homepage样式，集成完整CSS变量系统 */

/* CSS变量 - 透明度和阴影系统 */
:root {
  /* Z-index层级 */
  --z-negative: -1;
  --z-base: 0;
  --z-raised: 1;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal: 1300;
  --z-popover: 1400;
  --z-tooltip: 1500;
  
  /* 滚动条 */
  --scrollbar-track: #f5f7fa;
  --scrollbar-thumb: #c1c1c1;
  --scrollbar-thumb-hover: #a8a8a8;
  
  /* 主色彩 */
  --primary: #818cf8;
  --primary-hover: #6366f1;
  --primary-active: #6366f1;
  --secondary: #9F7AEA;
  --secondary-hover: #B794F4;
  --secondary-active: #805AD5;
  --accent: #553C9A;
  --accent-hover: #6B46C1;
  --accent-active: #44337A;
  --neutral: #4B5563;
  --neutral-hover: #6B7280;
  --neutral-active: #374151;
  
  /* 基础色彩 */
  --base-100: #FFFFFF;
  --base-200: #F9FAFB;
  --base-300: #F3F4F6;
  --base-content: #1F2937;
  
  /* 状态色彩 */
  --info: #6366F1;
  --info-content: #FFFFFF;
  --success: #10B981;
  --success-content: #FFFFFF;
  --warning: #F59E0B;
  --warning-content: #FFFFFF;
  --error: #EF4444;
  --error-content: #FFFFFF;
  
  /* 文本色彩 */
  --text-base: #1F2937;
  --text-muted: #4B5563;
  --text-disabled: #9CA3AF;
  --text-placeholder: #D1D5DB;
  
  /* 边框色彩 */
  --border-base: #E5E7EB;
  --border-light: #F3F4F6;
  
  /* 阴影系统 */
  --shadow-sm: rgba(147, 147, 250, .05);
  --shadow-md: rgba(147, 147, 250, .1);
  --shadow-lg: rgba(147, 147, 250, .15);
}

/* 暗色主题变量 */
[data-theme="dark"], .dark {
  --base-100: #0F172A;
  --base-200: #1E293B;
  --base-300: #334155;
  --base-content: #F1F5F9;
  --text-base: #F1F5F9;
  --text-muted: #94A3B8;
  --text-disabled: #64748B;
  --text-placeholder: #475569;
  --border-base: #334155;
  --border-light: #1E293B;
  --scrollbar-track: #1E293B;
  --scrollbar-thumb: #475569;
  --scrollbar-thumb-hover: #64748B;
}

/* 背景色 */
.bg-background {
  background-color: var(--base-100);
}

.text-foreground {
  color: var(--text-base);
}

/* 毛玻璃效果 */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-glass {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 242, 242, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid rgba(220, 38, 38, 0.2);
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
}

[data-theme="dark"] .header-glass,
.dark .header-glass {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
  border-bottom: 2px solid rgba(220, 38, 38, 0.3);
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
}

/* 轮播图样式 */
.hero-carousel-section {
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
  min-height: 320px;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Swiper 分页器样式 */
.swiper-pagination {
  bottom: 20px !important;
  z-index: 10;
}

.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.6);
  opacity: 1;
  transition: all 0.3s ease;
  margin: 0 4px;
}

.swiper-pagination-bullet-active {
  background: #fff;
  transform: scale(1.2);
}

/* Swiper 导航按钮样式 */
.swiper-button-next,
.swiper-button-prev {
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  transform: scale(1.1);
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 16px;
  font-weight: bold;
}

/* 地图区域样式 */
.map-section {
  background: linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #fef2f2 100%);
  min-height: auto;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  position: relative;
}

.map-container {
  max-width: 2000px;
  margin: 0 auto;
  padding: 1rem 0.25rem 0.5rem;
}

@media (max-width: 768px) {
  .map-container {
    max-width: 100%;
    padding: 0.75rem 0.25rem 0;
  }
}

@media (max-width: 480px) {
  .map-container {
    padding: 0.5rem 0.1rem 0;
  }
}

.map-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #DC2626 50%, transparent 100%);
}

/* 中国地图样式 */
.china-map {
  width: 100%;
  height: 1300px; /* 超大容器高度，确保地图充分显示 */
  position: relative;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 地图左上角团队 Logo */
.map-corner-logo {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  object-fit: cover;
  background: #fff;
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  border: 2px solid rgba(255,255,255,0.9);
  z-index: 5;
}

/* 关键数据总览 */
.stats-extended { padding: 3rem 0; background: linear-gradient(180deg,#fff 0%,#f9fafb 100%); }
.section-title { font-size: 1.75rem; font-weight: 800; text-align: center; margin-bottom: 1.5rem; }
.stats-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1rem; }
.stat-card { background: #ffffff; border: 1px solid #eef2f7; border-radius: 16px; padding: 1.25rem; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.04); transition: transform .2s ease, box-shadow .2s ease; }
.stat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 30px rgba(0,0,0,0.08); }
.stat-icon { font-size: 1.5rem; margin-bottom: .5rem; }
.stat-num { font-size: 1.8rem; font-weight: 800; color: #111827; }
.stat-desc { color: #6b7280; font-size: .95rem; margin-top: .25rem; }

@media (max-width: 1024px){ .stats-grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
@media (max-width: 640px){ .stats-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }

 

 

/* 图表区域 */
.heritage-charts { padding: 2.5rem 0; background: #f9fafb; }
.charts-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 1.25rem; }
.chart-box { background: #fff; border: 1px solid #eef2f7; border-radius: 16px; padding: 1rem; box-shadow: 0 12px 24px rgba(0,0,0,.05); }
.chart-title { font-weight: 800; margin: .25rem 0 .5rem; color: #111827; }
.chart-canvas { width: 100%; height: 320px; }
@media (max-width: 768px){ .charts-grid { grid-template-columns: 1fr; } .chart-canvas{ height: 260px; } }

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #6b7280;
  font-size: 14px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #dc2626;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 实践成果按钮样式 */
.practice-success-btn {
  background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%);
  border: none;
  border-radius: 16px;
  padding: 0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 25px rgba(220, 38, 38, 0.3),
    0 4px 12px rgba(220, 38, 38, 0.2);
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
  margin: 0;
  min-height: 96px;
  outline: none;
}

.practice-success-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.practice-success-btn:hover::before {
  opacity: 1;
}

.practice-success-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 
    0 12px 35px rgba(220, 38, 38, 0.4),
    0 6px 18px rgba(220, 38, 38, 0.25);
}

.practice-success-btn:active {
  transform: translateY(-2px) scale(1.02);
  transition: all 0.15s ease;
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 24px 16px;
  color: white;
  position: relative;
  z-index: 1;
}

.btn-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  animation: bounce 2s infinite;
}

.btn-text {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  line-height: 1.2;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

.gradient-title {
  background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .practice-success-btn {
    width: 140px;
    height: 180px;
  }
  
  .btn-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }
  
  .btn-text {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .hero-carousel-section {
    height: calc(100vh - 64px);
    min-height: 260px;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }
  
  .swiper-pagination {
    bottom: 15px !important;
  }
  
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    margin: 0 3px;
  }
  
  /* 移动端改为水平布局 */
  .flex.items-center.justify-between {
    flex-direction: column;
    gap: 2rem;
  }
  
  .practice-success-btn {
    width: 120px;
    height: 160px;
  }
  
  .btn-icon {
    font-size: 2rem;
    margin-bottom: 8px;
  }
  
  .btn-text {
    font-size: 0.875rem;
  }
  
  .china-map {
    height: 1000px; /* 移动端超大容器高度 */
  }
}

@media (max-width: 480px) {
  .hero-carousel-section {
    height: calc(100vh - 64px);
    min-height: 220px;
  }
  
  .china-map {
    height: 900px; /* 小屏设备超大容器高度 */
  }
}

.homepage {
  min-height: 100vh;
  background-color: #f8fafc;
}



.hero-carousel-section {
  height: calc(100vh - 64px);
}

.swiper-container {
  height: 100%;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.6s ease-in-out; /* 平滑过渡体验 */
}

.gradient-title {
  background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.china-map {
  height: 1300px;
  width: 100%;
  position: relative;
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #dc2626;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.practice-success-btn {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.3);
}

.practice-success-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(220, 38, 38, 0.4);
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  font-size: 2rem;
}

.btn-text {
  font-weight: 600;
  font-size: 1rem;
}

.map-section {
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
}

/* ——— 实践成果侧边栏（桌面端） ——— */
.results-aside {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 240px;
  position: sticky;
  top: 96px;
}

.mini-cards { display: flex; flex-direction: column; gap: 12px; }
.mini-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  margin: 0;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #eef2f7;
  box-shadow: 0 10px 20px rgba(0,0,0,0.04);
}
.mini-icon {
  width: 36px; height: 36px; border-radius: 999px; display: grid; place-items: center;
  color: #fff; font-weight: 800; font-size: .9rem;
}
.mini-icon.un { background: linear-gradient(135deg, #f59e0b, #d97706); }
.mini-icon.national { background: linear-gradient(135deg, #dc2626, #991b1b); }
.mini-icon.provincial { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
.mini-icon.municipal { background: linear-gradient(135deg, #059669, #047857); }
.mini-icon.neutral { background: #fee2e2; color: #ef4444; font-size: 1.1rem; }
.mini-num { font-weight: 800; color: #111827; line-height: 1; }
.mini-label { font-size: .85rem; color: #6b7280; }

/* 侧边栏与移动端显示控制 */
@media (max-width: 1024px) {
  .results-aside { display: none; }
}
@media (min-width: 1025px) {
  .results-cards-mobile { display: none !important; }
}

/* 成果速览（stat-card）增强样式 */
.stat-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #eef2f7;
  box-shadow: 0 10px 20px rgba(0,0,0,0.04);
  transition: transform .25s ease, box-shadow .25s ease;
}
.stat-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, #DC2626 0%, #EF4444 100%);
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(0,0,0,0.08);
}
.stat-card .stat-num {
  background: linear-gradient(135deg, #DC2626, #EF4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2rem;
  line-height: 1.1;
}
.stat-card .stat-desc {
  color: #6b7280;
}

/* 团队简介 */
 .team-section { padding: 2.5rem 0; background: #ffffff; }
 .team-hero { display: grid; grid-template-columns: 1fr; gap: 1rem; align-items: center; max-width: 960px; margin: 0 auto 1.5rem; }
 .team-brand { display: flex; align-items: center; gap: 1rem; }
 .team-logo { width: 56px; height: 56px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,.08); object-fit: cover; background: #fff; border: 1px solid #eef2f7; }
 .team-name { font-size: 1.5rem; font-weight: 800; color: #111827; }
 .team-slogan { color: #ef4444; font-weight: 700; }
 .team-intro { color: #4b5563; line-height: 1.9; }
 .team-intro-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 1rem; max-width: 1100px; margin: 0 auto; }
 .team-card { background: #fff; border: 1px solid #eef2f7; border-radius: 16px; padding: 1rem; box-shadow: 0 10px 24px rgba(0,0,0,.04); }
 .team-card-title { font-weight: 800; color: #111827; margin-bottom: .5rem; }
 .team-card-text { color: #374151; }
 .bullet-list { padding-left: 1rem; color: #4b5563; }
 .bullet-list li { list-style: disc; margin: .25rem 0; }
 .advisors-list, .members-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .5rem; }
 .advisor-item, .member-item { display: flex; align-items: center; gap: .5rem; }
 .avatar { width: 32px; height: 32px; display: grid; place-items: center; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 10px; }
 .member-item .tag { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #fef2f2; color: #ef4444; font-weight: 700; font-size: .8rem; margin-right: .25rem; }
 .member-item .name { color: #374151; }
 @media (max-width: 992px){ .team-intro-grid { grid-template-columns: 1fr; } }

/* 页脚 */
.site-footer {
  background: linear-gradient(180deg, #fff5f5 0%, #fff 100%);
  border-top: 1px solid #eef2f7;
  padding: 48px 0 32px;
}
.site-footer .footer-inner { 
  display: grid; 
  grid-template-columns: 1fr; 
  gap: 32px; 
  max-width: 1200px; 
  margin: 0 auto; 
}
.site-footer .brand-name { font-weight: 800; color: #f8fafc; font-size: 1.25rem; }
.site-footer .brand-desc { color: #94a3b8; }
.footer-logo { 
  width: 56px; 
  height: 56px; 
  border-radius: 12px; 
  box-shadow: 0 6px 14px rgba(0,0,0,.08); 
  background: #fff; 
  border: 1px solid #eef2f7; 
  object-fit: cover; 
  margin-top: 8px; 
}
.footer-team { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.footer-team-text { font-weight: 700; color: #f8fafc; }
.footer-team-text .sep { color: #ef4444; margin: 0 6px; }

/* 页脚功能导航样式 */
.footer-nav-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #374151;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.section-icon {
  font-size: 1rem;
  line-height: 1;
}

.footer-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-nav-list li {
  margin: 0;
}

.footer-nav-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.4;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.footer-nav-link:hover {
  color: #374151;
}

.external-icon {
  font-size: 0.75rem;
  opacity: 0.7;
}

/* 关注区域特殊样式 */
.footer-follow-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.follow-label {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 12px;
  font-weight: 500;
}

.qr-code {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.qr-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .footer-nav-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .footer-nav-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  .footer-section-title {
    font-size: 0.95rem;
    margin-bottom: 12px;
  }
  
  .footer-nav-link {
    font-size: 0.8rem;
  }
  
  .qr-code {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 480px) {
  .footer-nav-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .footer-section-title {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
  
  .footer-nav-list {
    gap: 8px;
  }
  
  .footer-nav-link {
    font-size: 0.775rem;
  }
}

/* 非遗项目展示样式 */
.heritage-projects-section {
  padding: 3rem 0;
  background: linear-gradient(135deg, #fef7f0 0%, #ffffff 50%, #f0f9ff 100%);
}

.heritage-layout { display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: start; }
.heritage-categories { display: flex; flex-direction: column; gap: 1rem; }

.heritage-category {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.level-badge {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.875rem;
  color: white;
}

.level-un { background: linear-gradient(135deg, #f59e0b, #d97706); }
.level-national { background: linear-gradient(135deg, #dc2626, #991b1b); }
.level-provincial { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
.level-municipal { background: linear-gradient(135deg, #059669, #047857); }

.category-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.projects-grid { display: flex; flex-direction: column; gap: .75rem; }

.project-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #dc2626;
}

.project-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.project-region {
  font-size: 0.875rem;
  color: #6b7280;
}

.heritage-summary {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #dc2626, #ef4444);
  border-radius: 16px;
  color: white;
}

.summary-item {
  text-align: center;
}

.summary-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.summary-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

.heritage-level-card {
  transition: all 0.3s ease;
  padding: 1rem; /* 减少内边距 */
}

.heritage-level-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.heritage-level-card .w-12 {
  width: 2.5rem; /* 缩小图标尺寸 */
  height: 2.5rem;
}

.heritage-level-card .text-2xl {
  font-size: 1.5rem; /* 缩小数字字体 */
}

.heritage-level-card .text-gray-600 {
  font-size: 0.875rem; /* 缩小标签字体 */
}

/* 移动端适配 */
@media (max-width: 768px) {
  .hero-carousel-section {
    height: 50vh;
  }
  
  .china-map {
    height: 800px;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .heritage-summary {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .heritage-layout { grid-template-columns: 1fr; }
  
  .heritage-categories {
    gap: 1.5rem;
  }
  
  .heritage-category {
    padding: 1rem;
  }
  
  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>