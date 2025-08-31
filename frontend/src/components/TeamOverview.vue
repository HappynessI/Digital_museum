<template>
  <section id="team" class="team-overview" aria-labelledby="team-title">
    <div class="container">
      <div class="head">
        <h2 id="team-title" class="title">团队介绍</h2>
      </div>
      <div class="layout">
        <aside class="nav" aria-label="小组导航">
          <GroupCard :group="leaderAsGroup" @open="select(leaderAsGroup)" />
          <GroupCard v-for="g in groups" :key="g.key" :group="g" @open="select(g)" />
        </aside>
        <div class="detail" v-if="activeGroup">
          <!-- 指导老师专用布局 -->
          <div v-if="activeGroup.key === 'leader'" class="teachers-section">
            <div class="teachers-header">
              <h3 class="section-title">指导老师</h3>
              <div class="section-description">
                <div class="desc-item">
                  <span class="desc-icon">•</span>
                  <span class="desc-text">统筹实践方向，为实践队提供专业指导与资源支持。</span>
                </div>
                <div class="desc-item">
                  <span class="desc-icon">•</span>
                  <span class="desc-text">统筹行程安排，协调内外事务，全程陪伴团队解决实践中的实际问题。</span>
                </div>
              </div>
            </div>
            
            <!-- 6位指导老师的3上3下布局 -->
            <div class="teachers-grid">
              <!-- 第一行：3位老师 -->
              <div class="teachers-row teachers-row-3">
                <div class="teacher-card" v-for="(teacher, index) in teachers.slice(0, 3)" :key="'top-' + index">
                  <div class="teacher-photo">
                    <img :src="teacher.photo" :alt="teacher.name" />
                  </div>
                  <div class="teacher-name">{{ teacher.name }}</div>
                </div>
              </div>
              
              <!-- 第二行：3位老师 -->
              <div class="teachers-row teachers-row-3">
                <div class="teacher-card" v-for="(teacher, index) in teachers.slice(3, 6)" :key="'bottom-' + index">
                  <div class="teacher-photo">
                    <img :src="teacher.photo" :alt="teacher.name" />
                  </div>
                  <div class="teacher-name">{{ teacher.name }}</div>
                </div>
              </div>
            </div>

          </div>
          
          <!-- 其他小组的原有布局 -->
          <div v-else class="detail-panel">
            <h3 class="d-title">{{ activeGroup.name }}</h3>
            <p class="d-desc">{{ activeGroup.desc || leader.title }}</p>
            <div class="meta">
              <span class="badge" v-for="(t,i) in (activeGroup.tags||[])" :key="i">#{{ t }}</span>
            </div>
            <div class="members" v-if="activeGroup.members && activeGroup.members.length">
              <!-- 有照片的成员使用卡片布局 -->
              <template v-if="activeGroup.members.some(m => m.photo)">
                <!-- 超过6人的轮播布局 -->
                <template v-if="activeGroup.members.length > 6">
                  <div class="members-carousel">
                    <!-- 页码指示器 -->
                    <div class="carousel-indicators">
                      <div 
                        v-for="(page, index) in getCarouselPages(activeGroup.members)" 
                        :key="index"
                        class="indicator"
                        :class="{ active: currentCarouselPage === index }"
                        @click="setCarouselPage(index)"
                      ></div>
                    </div>
                    
                    <!-- 轮播内容 -->
                    <div class="carousel-content">
                      <transition name="fade" mode="out-in">
                        <!-- 5人特殊布局 -->
                        <div v-if="getCurrentPageMembers(activeGroup.members).length === 5" class="carousel-grid-5" :key="currentCarouselPage">
                          <!-- 第一行：3人 -->
                          <div class="carousel-row-1">
                            <div class="member-card" v-for="(m,i) in getCurrentPageMembers(activeGroup.members).slice(0, 3)" :key="'row1-' + i">
                              <div class="member-photo" v-if="m.photo">
                                <img :src="m.photo" :alt="m.name" />
                              </div>
                              <div class="member-photo placeholder" v-else>
                                <div class="avatar-placeholder">👤</div>
                              </div>
                              <div class="member-info">
                                <div class="member-name">{{ m.name }}</div>
                                <div class="member-role">{{ m.role }}</div>
                              </div>
                            </div>
                          </div>
                          
                          <!-- 第二行：2人居中 -->
                          <div class="carousel-row-2">
                            <div class="member-card" v-for="(m,i) in getCurrentPageMembers(activeGroup.members).slice(3, 5)" :key="'row2-' + i">
                              <div class="member-photo" v-if="m.photo">
                                <img :src="m.photo" :alt="m.name" />
                              </div>
                              <div class="member-photo placeholder" v-else>
                                <div class="avatar-placeholder">👤</div>
                              </div>
                              <div class="member-info">
                                <div class="member-name">{{ m.name }}</div>
                                <div class="member-role">{{ m.role }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <!-- 其他人数的常规布局 -->
                        <div v-else class="members-grid" :class="getCarouselGridClass(getCurrentPageMembers(activeGroup.members).length)" :key="currentCarouselPage">
                          <div class="member-card" v-for="(m,i) in getCurrentPageMembers(activeGroup.members)" :key="'carousel-' + currentCarouselPage + '-' + i">
                            <div class="member-photo" v-if="m.photo">
                              <img :src="m.photo" :alt="m.name" />
                            </div>
                            <div class="member-photo placeholder" v-else>
                              <div class="avatar-placeholder">👤</div>
                            </div>
                            <div class="member-info">
                              <div class="member-name">{{ m.name }}</div>
                              <div class="member-role">{{ m.role }}</div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </div>
                    
                    <!-- 页码信息 -->
                    <div class="carousel-info">
                      {{ currentCarouselPage + 1 }} / {{ getCarouselPages(activeGroup.members).length }}
                    </div>
                  </div>
                </template>
                
                <!-- 5人特殊布局：上三下二居中 -->
                <template v-else-if="activeGroup.members.length === 5">
                  <div class="members-grid-5">
                    <!-- 第一行：3人 -->
                    <div class="members-row members-row-3">
                      <div class="member-card" v-for="(m,i) in activeGroup.members.slice(0, 3)" :key="'top-' + i">
                        <div class="member-photo" v-if="m.photo">
                          <img :src="m.photo" :alt="m.name" />
                        </div>
                        <div class="member-photo placeholder" v-else>
                          <div class="avatar-placeholder">👤</div>
                        </div>
                        <div class="member-info">
                          <div class="member-name">{{ m.name }}</div>
                          <div class="member-role">{{ m.role }}</div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- 第二行：2人居中 -->
                    <div class="members-row members-row-2-centered">
                      <div class="member-card" v-for="(m,i) in activeGroup.members.slice(3, 5)" :key="'bottom-' + i">
                        <div class="member-photo" v-if="m.photo">
                          <img :src="m.photo" :alt="m.name" />
                        </div>
                        <div class="member-photo placeholder" v-else>
                          <div class="avatar-placeholder">👤</div>
                        </div>
                        <div class="member-info">
                          <div class="member-name">{{ m.name }}</div>
                          <div class="member-role">{{ m.role }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                
                <!-- 其他人数的常规布局 -->
                <template v-else>
                  <div class="members-grid" :class="getMembersGridClass(activeGroup.members.length)">
                    <div class="member-card" v-for="(m,i) in activeGroup.members" :key="i">
                      <div class="member-photo" v-if="m.photo">
                        <img :src="m.photo" :alt="m.name" />
                      </div>
                      <div class="member-photo placeholder" v-else>
                        <div class="avatar-placeholder">👤</div>
                      </div>
                      <div class="member-info">
                        <div class="member-name">{{ m.name }}</div>
                        <div class="member-role">{{ m.role }}</div>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
              
              <!-- 没有照片的成员使用原有的简单列表 -->
              <template v-else>
              <div class="member" v-for="(m,i) in activeGroup.members" :key="i">
                <div class="avatar" aria-hidden="true">👤</div>
                <div>
                  <div class="m-name">{{ m.name }}</div>
                  <div class="m-role">{{ m.role }}</div>
                </div>
              </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GroupCard from './GroupCard.vue'

export default {
  name: 'TeamOverview',
  components: { GroupCard },
  props: {
    leader: { type: Object, required: true },
    groups: { type: Array, required: true }
  },
  data(){
    return { 
      activeGroup: null,
      currentCarouselPage: 0,
      carouselTimer: null,
      teachers: [
        {
          name: '李彦达',
          photo: process.env.BASE_URL + 'homepage/images/teacher/李彦达.png'
        },
        {
          name: '宗超', 
          photo: process.env.BASE_URL + 'homepage/images/teacher/指导老师-宗超.jpg'
        },
        {
          name: '龚芮琳',
          photo: process.env.BASE_URL + 'homepage/images/teacher/龚芮琳.png'
        },
        {
          name: '曹月',
          photo: process.env.BASE_URL + 'homepage/images/teacher/曹月.png'
        },
        {
          name: '任怡璇',
          photo: process.env.BASE_URL + 'homepage/images/teacher/辅导员-任怡璇.png'
        },
        {
          name: '郑君慧',
          photo: process.env.BASE_URL + 'homepage/images/teacher/总负责人-郑君慧.jpeg'
        }
      ]
    }
  },
  mounted(){
    // 默认选中指导老师
    this.activeGroup = this.leaderAsGroup
  },
  computed: {
    leaderAsGroup(){
      return { key: 'leader', name: '指导老师', desc: this.leader.title || '总负责人', tags: [], members: [] }
    }
  },
  methods: {
    select(g){ 
      // 先清理之前的状态
      this.clearCarouselTimer()
      this.currentCarouselPage = 0
      
      // 设置新的活动组
      this.activeGroup = g
      
      // 使用 nextTick 确保 DOM 更新后再启动轮播
      this.$nextTick(() => {
        if (g.members && g.members.length > 6) {
          this.startCarouselTimer()
        }
      })
    },
    getMembersGridClass(memberCount) {
      // 根据成员数量返回合适的布局类
      if (memberCount === 1) return 'grid-1'
      if (memberCount === 2) return 'grid-2'
      if (memberCount === 3) return 'grid-3'
      if (memberCount === 4) return 'grid-2x2'
      if (memberCount === 5) return 'grid-3-2-centered'
      if (memberCount === 6) return 'grid-3x2'
      return 'grid-auto' // 超过6个的情况
    },
    getCarouselPages(members) {
      // 将成员分页，每页6人
      const pages = []
      const pageSize = 6
      for (let i = 0; i < members.length; i += pageSize) {
        pages.push(members.slice(i, i + pageSize))
      }
      return pages
    },
    getCurrentPageMembers(members) {
      const pages = this.getCarouselPages(members)
      return pages[this.currentCarouselPage] || []
    },
    getCarouselGridClass(memberCount) {
      // 轮播页面的布局类
      if (memberCount === 1) return 'carousel-grid-1'
      if (memberCount === 2) return 'carousel-grid-2'
      if (memberCount === 3) return 'carousel-grid-3'
      if (memberCount === 4) return 'carousel-grid-4'
      if (memberCount === 5) return 'carousel-grid-5'
      if (memberCount === 6) return 'carousel-grid-6'
      return 'carousel-grid-6'
    },
    setCarouselPage(pageIndex) {
      this.currentCarouselPage = pageIndex
      this.clearCarouselTimer()
      
      // 重新启动轮播
      this.$nextTick(() => {
        this.startCarouselTimer()
      })
    },
    startCarouselTimer() {
      if (!this.activeGroup || !this.activeGroup.members || this.activeGroup.members.length <= 6) return
      
      this.carouselTimer = setInterval(() => {
        const totalPages = this.getCarouselPages(this.activeGroup.members).length
        this.currentCarouselPage = (this.currentCarouselPage + 1) % totalPages
      }, 4000) // 每4秒切换一次
    },
    clearCarouselTimer() {
      if (this.carouselTimer) {
        clearInterval(this.carouselTimer)
        this.carouselTimer = null
      }
    }
  },
  watch: {
    activeGroup: {
      handler(newGroup, oldGroup) {
        // 当切换组时，确保清理状态
        if (oldGroup && oldGroup.key !== newGroup?.key) {
          this.clearCarouselTimer()
          this.currentCarouselPage = 0
        }
      },
      immediate: false
    }
  },
  beforeDestroy() {
    this.clearCarouselTimer()
  },
  beforeUnmount() {
    this.clearCarouselTimer()
  }
}
</script>

<style scoped>
.team-overview { background: #fff; padding: 2rem 0; }
.container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
.head { text-align: center; margin-bottom: 1rem; }
.title { font-size: 1.75rem; font-weight: 800; }

/* 新布局：左侧纵向卡片 + 右侧详情 */
.layout { display: grid; grid-template-columns: 280px 1fr; gap: 2rem; align-items: start; }
.nav { position: relative; padding-left: .75rem; display: grid; grid-auto-rows: max-content; gap: .75rem; }
.nav::before { content: ''; position: absolute; left: 10px; top: 0; bottom: 0; border-left: 2px dashed #fecaca; }
.detail { min-height: 280px; }
.detail-panel { border: 1px solid #eef2f7; border-radius: 16px; padding: 1rem; box-shadow: 0 10px 24px rgba(0,0,0,.04); background: #fff; }
.d-title { font-weight: 800; color: #111827; font-size: 1.25rem; margin-bottom: .5rem; }
.d-desc { color: #374151; margin-bottom: .5rem; }
.meta { display: inline-flex; gap: .25rem; flex-wrap: wrap; margin-bottom: .5rem; }
.badge { background: #fef2f2; color: #ef4444; padding: 2px 8px; border-radius: 999px; font-weight: 700; font-size: .8rem; }
/* 原有的简单列表样式 */
.members { display: grid; grid-template-columns: 1fr; gap: .5rem; }
.member { display: inline-flex; align-items: center; gap: .5rem; border: 1px solid #f1f5f9; border-radius: 12px; padding: .5rem; }
.avatar { width: 32px; height: 32px; border-radius: 999px; background: #fff5f5; display: grid; place-items: center; }
.m-name { font-weight: 700; color: #111827; }
.m-role { color: #6b7280; }

/* 成员卡片布局样式 */
.members-grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 1rem;
}

/* 不同数量的网格布局 */
.grid-1 { grid-template-columns: 1fr; justify-items: center; }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-2x2 { grid-template-columns: repeat(2, 1fr); }
.grid-3-2 { grid-template-columns: repeat(3, 1fr); }
.grid-3x2 { grid-template-columns: repeat(3, 1fr); }
.grid-auto { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }

/* 轮播专用网格布局 - 确保最后一行居中 */
.carousel-grid-1 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  justify-items: center;
}

.carousel-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  justify-items: center;
}

.carousel-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  justify-items: center;
}

.carousel-grid-4 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  justify-items: center;
}

.carousel-grid-4 .member-card:nth-child(4) {
  grid-column: 2; /* 第4个元素放在第二行中间 */
  grid-row: 2;
}

.carousel-grid-5 {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
}

.carousel-grid-5 .carousel-row-1 {
  display: flex;
  gap: 3rem;
  justify-content: center;
}

.carousel-grid-5 .carousel-row-2 {
  display: flex;
  gap: 3rem;
  justify-content: center;
}

.carousel-grid-6 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  justify-items: center;
}

/* 5人特殊布局：上三下二居中 */
.members-grid-5 {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
}

.members-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.members-row-3 {
  /* 上排3人：正常居中 */
}

.members-row-2-centered {
  /* 下排2人：居中显示 */
  justify-content: center;
}

/* 轮播样式 */
.members-carousel {
  margin-top: 1rem;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #dc2626;
  transform: scale(1.2);
}

.indicator:hover {
  background: #f87171;
}

.carousel-content {
  position: relative;
  min-height: 300px;
}

.carousel-info {
  text-align: center;
  margin-top: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
}

/* 轮播切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.member-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.member-card:hover {
  transform: translateY(-8px);
}

.member-card:hover .member-photo {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.member-card:hover .member-info {
  box-shadow: 0 8px 25px rgba(220, 38, 38, 0.5);
}

.member-photo {
  width: 200px;
  height: 260px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  margin-bottom: 0;
  position: relative;
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.member-photo.placeholder {
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder {
  font-size: 2rem;
  color: #9ca3af;
}

.member-info {
  background: linear-gradient(135deg, #dc2626, #991b1b);
  color: white;
  padding: 0.75rem 0;
  border-radius: 0 0 16px 16px;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  width: 200px;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.member-name {
  color: white;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0;
}

.member-role {
  display: none; /* 隐藏角色信息，与指导老师样式保持一致 */
}

/* 指导老师专用样式 */
.teachers-section {
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.teachers-header {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1rem;
  text-align: left;
}

.section-description {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.desc-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.desc-icon {
  font-size: 1rem;
  color: #dc2626;
  font-weight: bold;
  line-height: 1.6;
}

.desc-text {
  color: #4b5563;
  line-height: 1.6;
  font-size: 1rem;
}

.teachers-grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.teachers-row {
  display: flex;
  justify-content: center;
  gap: 3rem;
}

.teachers-row-3 {
  /* 3个老师的行 */
}

.teachers-row-2 {
  /* 2个老师的行，居中显示 */
}

.teacher-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  max-width: 250px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.teacher-card:hover {
  transform: translateY(-8px);
}

.teacher-card:hover .teacher-photo {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.teacher-card:hover .teacher-name {
  box-shadow: 0 8px 25px rgba(220, 38, 38, 0.5);
}

.teacher-photo {
  width: 200px;
  height: 250px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  position: relative;
  margin-bottom: 0;
}

.teacher-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.teacher-name {
  background: linear-gradient(135deg, #dc2626, #991b1b);
  color: white;
  padding: 0.75rem 0;
  border-radius: 0 0 16px 16px;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  width: 200px;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}


@media (max-width: 992px){
  .container { padding: 0 1rem; }
  .layout { grid-template-columns: 1fr; gap: 1.5rem; }
  .nav::before { left: 6px; }
  
  .teachers-section {
    padding: 1.5rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .teachers-row {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  
  .teacher-card {
    min-width: 160px;
    max-width: 200px;
  }
  
  .teacher-photo {
    width: 180px;
    height: 230px;
  }
  
  .teacher-name {
    width: 180px;
  }
  
  .teachers-row {
    gap: 2rem;
  }
  
  /* 成员卡片响应式 */
  .members-grid.grid-3,
  .members-grid.grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .member-photo {
    width: 180px;
    height: 240px;
  }
  
  .member-info {
    width: 180px;
  }
  
  /* 5人布局响应式 */
  .members-row {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
}

@media (max-width: 768px){
  .teachers-row {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .teachers-row-3,
  .teachers-row-2 {
    flex-direction: column;
    align-items: center;
  }
  
  .section-description {
    gap: 0.5rem;
  }
  
  .desc-item {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
  
  /* 小屏幕成员卡片响应式 */
  .members-grid {
    grid-template-columns: 1fr !important;
    justify-items: center;
  }
  
  .member-photo {
    width: 200px;
    height: 260px;
  }
  
  .member-info {
    width: 200px;
  }
  
  /* 小屏幕5人布局响应式 */
  .members-row {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .members-row-3,
  .members-row-2-centered {
    flex-direction: column;
    align-items: center;
  }
}
</style>

