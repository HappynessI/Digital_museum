<template>
  <div class="home-nav-menu">
    <nav class="flex-column">
      <div class="nav-item px-3">
        <router-link 
          to="/homepage" 
          class="nav-link" 
          :class="{ active: $route.path === '/homepage' }"
          exact
        >
          <span class="oi oi-home" aria-hidden="true"></span> 首页
        </router-link>
      </div>
      
      <div class="nav-item px-3">
        <div class="nav-link nav-category">
          <span class="oi oi-list-rich" aria-hidden="true"></span> 山西展厅
        </div>
      </div>
      

      
      <div class="nav-item px-3">
        <router-link 
          to="/F1" 
          class="nav-link nav-sub"
        >
          F1 · 运斤成风
        </router-link>
      </div>
      
      <div class="nav-item px-3">
        <router-link 
          to="/F2" 
          class="nav-link nav-sub"
        >
          F2 · 非遗珍馐
        </router-link>
      </div>

      <div class="nav-item px-3">
        <div class="nav-link nav-category">
          <span class="oi oi-list-rich" aria-hidden="true"></span> 山东展馆
        </div>
      </div>

      <div class="nav-item px-3">
        <router-link 
          to="/F3" 
          class="nav-link nav-sub"
        >
          F3 · 非遗技艺
        </router-link>
      </div>
      
      <div class="nav-item px-3">
        <router-link 
          to="/F4" 
          class="nav-link nav-sub"
        >
          F4 · 齐鲁遗珍
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HomeNavMenu'
}
</script>

<style scoped>
.home-nav-menu {
  width: 100%;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.nav-item {
  margin-bottom: 8px;
}

.px-3 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  color: #333;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background-color: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  text-decoration: none;
}

.nav-link.active {
  background-color: #dc2626;
  color: #fff;
}

.nav-link.router-link-active {
  background-color: #dc2626;
  color: #fff;
}

.nav-category {
  background-color: #f8f9fa;
  color: #666;
  font-weight: 600;
  cursor: default;
  border-left: 4px solid #dc2626;
}

.nav-category:hover {
  background-color: #f8f9fa;
  color: #666;
}

.nav-sub {
  padding-left: 40px;
  position: relative;
}

.nav-sub:before {
  content: '├';
  position: absolute;
  left: 20px;
  color: #ccc;
}

.oi {
  margin-right: 8px;
  font-size: 14px;
}

/* Open Iconic 图标替代 */
.oi-home:before {
  content: '🏠';
}

.oi-list-rich:before {
  content: '📋';
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-link {
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
  }
  
  .nav-sub {
    padding-left: 30px;
  }
  
  .nav-sub:before {
    left: 15px;
  }
}
</style>
