<template>
  <div class="not-found">
    <div class="container">
      <div class="code">404</div>
      <h1 class="title">页面未找到</h1>
      <p class="desc">很抱歉，您访问的页面不存在或已被移动。</p>
      <div class="actions">
        <router-link to="/homepage" class="btn btn-primary">返回首页</router-link>
        <router-link to="/heropage" class="btn btn-ghost">实践队风采</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style>
.not-found { min-height: 100vh; display: grid; place-items: center; background: linear-gradient(180deg,#fff 0%,#f9fafb 100%); }
.container { text-align: center; padding: 24px; }
.code { font-size: 96px; font-weight: 900; background: linear-gradient(135deg, #DC2626, #EF4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px; }
.title { font-size: 24px; font-weight: 800; margin: 0 0 8px; }
.desc { color: #6b7280; margin: 0 0 16px; }
.actions { display: flex; gap: 10px; justify-content: center; }
.btn { padding: 10px 16px; border-radius: 10px; font-weight: 700; border: 1px solid #e5e7eb; background: #fff; color: #111827; text-decoration: none; transition: all .2s ease; }
.btn:hover { transform: translateY(-1px); box-shadow: 0 8px 16px rgba(0,0,0,.06); }
.btn-primary { background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%); color: #fff; border-color: transparent; }
.btn-ghost { background: #fff; color: #ef4444; border-color: #fecaca; }
</style>

