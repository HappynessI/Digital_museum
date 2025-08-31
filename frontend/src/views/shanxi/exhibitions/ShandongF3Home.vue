<template>
  <MainLayout>
    <div class="f3-home-page">
      <!-- 简化的标题 -->
      <div class="simple-title">
        <h1>F3 · 非遗技艺</h1>
        <p>胶东地区的传统技艺与匠心精神</p>
      </div>
      
      <!-- 主要展示区域：与 F1/F2 同款左右分栏卡片 -->
      <div class="main-content">
        <div class="featured-item">
          <div class="item-image">
            <img 
              :src="require('@/assets/images/shandong/00.png')" 
              alt="山东非遗展板" 
            />
          </div>
          <div class="item-content">
            <h2>🏛️ 展厅亮点：山东 · 非遗技艺</h2>
            <p>
              胶东地区非遗技艺底蕴深厚，既有与生活密切相关的传统日用工艺，也有兼具仪式感与美学特征的表演与节庆技艺。
              本展聚焦“匠心与传承”，通过影像、文献与口述史材料，呈现当代语境下的非遗活态。
            </p>
            <div class="action-buttons">
              <router-link to="/shandong/f3/detail" class="primary-button">
                🔍 了解详情
              </router-link>
              <router-link to="/shandong/f3/interview" class="secondary-button">
                🎤 访谈纪要
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  name: 'ShandongF3Home',
  components: { MainLayout },
  mounted() {
    document.body.style.backgroundImage = `url(${require('@/assets/images/shandong/3层.jpg')})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
  },
  destroyed() {
    document.body.style.backgroundImage = ''
  }
}
</script>

<style scoped>
.f3-home-page { min-height: 100vh; padding: 2rem; color: #fff; position: relative; }
.f3-home-page::before { content: ''; position: fixed; inset: 0; background: rgba(0,0,0,.3); pointer-events: none; z-index: -1; }

.simple-title { text-align: center; margin-bottom: 3rem; padding: 1rem 0; animation: fadeInDown 0.8s ease; }
.simple-title h1 { font-size: 3rem; font-weight: bold; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0,0,0,.8); background: linear-gradient(135deg,#2563eb,#1d4ed8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.simple-title p { font-size: 1.2rem; opacity: .9; text-shadow: 1px 1px 2px rgba(0,0,0,.7); }

.main-content { max-width: 900px; margin: 0 auto; animation: fadeInUp 0.8s ease; }
.featured-item { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
.item-image { position: relative; overflow: hidden; border-radius: 15px; box-shadow: 0 8px 30px rgba(0,0,0,.4); transition: all .4s cubic-bezier(.4,0,.2,1); }
.item-image:hover { box-shadow: 0 12px 40px rgba(0,0,0,.6); transform: translateY(-2px); }
.item-image img { width: 100%; height: 400px; object-fit: cover; display: block; transition: transform .4s cubic-bezier(.4,0,.2,1); }
.item-image:hover img { transform: scale(1.08); }

.item-content { background: rgba(0,0,0,.4); border-radius: 15px; padding: 2rem; backdrop-filter: blur(8px); }
.item-content h2 { color: #3b82f6; font-size: 2rem; margin-bottom: 1.5rem; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,.7); }
.item-content p { line-height: 1.8; margin-bottom: 2rem; text-shadow: 1px 1px 2px rgba(0,0,0,.5); font-size: 1.1rem; }

.action-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }
.primary-button, .secondary-button { padding: 1rem 2rem; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: .5rem; font-size: 1.1rem; transition: all .3s ease; }
.primary-button { background: linear-gradient(135deg,#2563eb,#1d4ed8); color: #fff; box-shadow: 0 6px 20px rgba(37,99,235,.35); }
.primary-button:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(37,99,235,.5); color: #fff; text-decoration: none; }
.secondary-button { background: rgba(255,255,255,.2); color: #fff; border: 2px solid rgba(255,255,255,.3); backdrop-filter: blur(10px); }
.secondary-button:hover { background: rgba(255,255,255,.3); transform: translateY(-3px); text-decoration: none; color: #fff; box-shadow: 0 6px 20px rgba(255,255,255,.2); }

/* 动画效果 */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .f3-home-page { padding: 1rem; }
  .simple-title h1 { font-size: 2rem; }
  .featured-item { grid-template-columns: 1fr; text-align: center; gap: 2rem; }
  .item-image img { height: 300px; }
  .action-buttons { justify-content: center; }
  .primary-button, .secondary-button { padding: .8rem 1.5rem; font-size: 1rem; }
}
</style>



