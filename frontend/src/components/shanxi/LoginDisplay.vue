<template>
  <div class="login-display">
    <router-link to="/homepage" class="home-link">
      <img :src="require('@/assets/images/practice-team-logo.png')" alt="实践队logo" class="logo-img">
      <span class="team-name">溯本求源 <span class="separator">|</span> 文润经心</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginDisplay',
  data() {
    return {
      isAuthenticated: false,
      userName: ''
    }
  },
  methods: {
    logout() {
      this.isAuthenticated = false;
      this.userName = '';
      // 这里可以添加实际的登出逻辑
    }
  },
  mounted() {
    // 这里可以检查用户登录状态
    // 暂时模拟未登录状态
    this.isAuthenticated = false;
  }
}
</script>

<style scoped>
.login-display {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.home-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.home-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  text-decoration: none;
  color: #fff;
}

.logo-img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.team-name {
  font-size: 14px;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.separator {
  color: #fbbf24;
  font-weight: 400;
  margin: 0 4px;
  opacity: 0.8;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.welcome-text {
  color: #fff;
  font-size: 14px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.login-section {
  display: flex;
  align-items: center;
}

.login-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.login-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  color: #fff;
}
</style>
