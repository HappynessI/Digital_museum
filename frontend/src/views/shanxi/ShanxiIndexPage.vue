<template>
  <div class="shanxi-index-page">
    <div class="index-background"></div>
    <div class="index-content">
      <div class="row index-main-row">
        <div class="col-1"></div>
        <div class="col-3">
          <button 
            type="button" 
            class="btn btn-outline-light btn-lg index-enter-btn" 
            @click="goToHome"
          >
            点击进入
          </button>
          <span class="index-spacer">&nbsp;&nbsp;&nbsp;</span>
          <router-link 
            to="/detail" 
            class="index-about-link"
          >
            >> 了解我们
          </router-link>
        </div>
        <div class="col-8"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShanxiIndexPageView',
  methods: {
    goToHome() {
      this.$router.push('/home');
    }
  },
  mounted() {
    // 动态设置背景图片
    const bgElement = this.$el.querySelector('.index-background');
    if (bgElement) {
      bgElement.style.backgroundImage = `url(${require('@/assets/images/博物馆首页.png')})`;
    }
  },
  destroyed() {
    // 清除页面样式
    document.body.style.backgroundImage = "";
    document.body.style.backgroundRepeat = "";
    document.body.style.backgroundAttachment = "";
    document.body.style.backgroundSize = "";
  }
}
</script>

<style scoped>
.shanxi-index-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.index-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: local;
  background-size: cover;
  z-index: -1;
}

.index-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
}

.index-main-row {
  width: 100%;
  margin-top: 35%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-1, .col-3, .col-8 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.col-1 {
  flex: 0 0 8.333333%;
  max-width: 8.333333%;
}

.col-3 {
  flex: 0 0 25%;
  max-width: 25%;
}

.col-8 {
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
}

.index-enter-btn {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  color: #fff;
  background-color: transparent;
  border-color: #fff;
  font-family: '宋体', serif;
  transition: all 0.3s ease;
}

.index-enter-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #fff;
  transform: translateY(-2px);
}

.index-spacer {
  margin: 0 10px;
}

.index-about-link {
  color: #c0c0c0;
  font-family: '宋体', serif;
  text-decoration: none;
  transition: color 0.3s ease;
}

.index-about-link:hover {
  color: #fff;
  text-decoration: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .index-main-row {
    margin-top: 50%;
  }
  
  .col-1 {
    flex: 0 0 5%;
    max-width: 5%;
  }
  
  .col-3 {
    flex: 0 0 70%;
    max-width: 70%;
  }
  
  .col-8 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  
  .index-enter-btn {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>
