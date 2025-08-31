<template>
  <div class="main-layout">
    <div class="page">
      <main>
        <div class="top-left-nav">
          <button class="nav-btn" @click="goBack">返回</button>
          <router-link to="/homepage" class="nav-btn link">首页</router-link>
        </div>
        <article class="content px-4">
          <slot></slot>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        this.$router.push('/homepage')
      }
    }
  }
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  width: 100%;
}

.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.top-left-nav { position: fixed; top: 0; left: 0; z-index: 1000; display: flex; gap: 8px; padding: 10px; }
.nav-btn { background: rgba(0,0,0,.5); color: #fff; border: 1px solid rgba(255,255,255,.4); padding: 6px 12px; border-radius: 6px; cursor: pointer; text-decoration: none; }
.nav-btn:hover { background: rgba(0,0,0,.65); color: #fff; text-decoration: none; }

.px-4 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.content {
  padding-top: 60px; /* 为顶部导航留出空间 */
}

/* 全局样式重置 */
.main-layout :deep(body) {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
