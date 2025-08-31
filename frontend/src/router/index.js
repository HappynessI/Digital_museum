import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    // 根路径重定向逻辑：每次访问都进入HeroPage
    beforeEnter: (to, from, next) => {
      next('/heropage');
    }
  },
  {
    path: '/homepage',
    name: 'homepage',
    // Homepage 路由 - 返回首页使用此路径
    meta: { title: '首页' },
    component: () => import(/* webpackChunkName: "homepage" */ '../views/Homepage.vue')
  },
  {
    path: '/heropage',
    name: 'heropage', 
    // HeroPage 路由 - 第一次进入网站显示
    meta: { title: '实践队风采' },
    component: () => import(/* webpackChunkName: "heropage" */ '../views/HeroPage.vue')
  },
  {
    path: '/results',
    name: 'practice-results',
    meta: { title: '社会实践 · 成果展示' },
    component: () => import(/* webpackChunkName: "results" */ '../views/PracticeResultsPage.vue')
  },
  // 数字博物馆主要页面路由
  {
    path: '/home',
    name: 'digital-museum-home',
    meta: { title: '数字博物馆 · 首页' },
    component: () => import(/* webpackChunkName: "shanxi-home" */ '../views/shanxi/ShanxiHomePage.vue')
  },
  // 已不需要单独的导览页（/index），删除该路由
  // F1展厅 - 运斤成风（原F2）
  {
    path: '/F1',
    name: 'f1-home',
    meta: { title: 'F1 展厅 · 运斤成风' },
    component: () => import(/* webpackChunkName: "f1" */ '../views/shanxi/exhibitions/ShanxiF1Home.vue')
  },
  {
    path: '/Detail1',
    name: 'f2-detail1',
    meta: { title: 'F1 展厅 · 展项一' },
    component: () => import(/* webpackChunkName: "f1-detail01" */ '../views/shanxi/exhibitions/ShanxiF1Detail01.vue')
  },
  {
    path: '/Detail2',
    name: 'f2-detail2',
    meta: { title: 'F1 展厅 · 展项二' },
    component: () => import(/* webpackChunkName: "f1-detail02" */ '../views/shanxi/exhibitions/ShanxiF1Detail02.vue')
  },
  {
    path: '/Detail3',
    name: 'f2-detail3',
    meta: { title: 'F1 展厅 · 展项三' },
    component: () => import(/* webpackChunkName: "f1-detail03" */ '../views/shanxi/exhibitions/ShanxiF1Detail03.vue')
  },
  // F2展厅 - 非遗珍馐（原F3）
  {
    path: '/F2',
    name: 'f2-food',
    meta: { title: 'F2 展厅 · 非遗珍馐' },
    component: () => import(/* webpackChunkName: "f2-food" */ '../views/shanxi/exhibitions/ShanxiF2Home.vue')
  },
  {
    path: '/Detail11',
    name: 'f3-detail1',
    meta: { title: 'F2 展厅 · 展项一' },
    component: () => import(/* webpackChunkName: "f2-detail01" */ '../views/shanxi/exhibitions/ShanxiF2Detail01.vue')
  },
  {
    path: '/Detail12',
    name: 'f3-detail2',
    meta: { title: 'F2 展厅 · 展项二' },
    component: () => import(/* webpackChunkName: "f2-detail02" */ '../views/shanxi/exhibitions/ShanxiF2Detail02.vue')
  },
  {
    path: '/Detail13',
    name: 'f3-detail3',
    meta: { title: 'F2 展厅 · 展项三' },
    component: () => import(/* webpackChunkName: "f2-detail03" */ '../views/shanxi/exhibitions/ShanxiF2Detail03.vue')
  },

  // F4展厅 - 山东展馆入口
  {
    path: '/F4',
    name: 'f4-home',
    meta: { title: 'F4 展厅 · 山东展馆' },
    component: () => import(/* webpackChunkName: "f4" */ '../views/shanxi/exhibitions/ShandongF4Home.vue')
  },
  
  // F4展厅 - 了解详情页面
  {
    path: '/shandong/f4/detail',
    name: 'f4-detail',
    meta: { title: 'F4 展厅 · 了解详情' },
    component: () => import(/* webpackChunkName: "f4-detail" */ '../views/shanxi/exhibitions/ShandongF4Detail.vue')
  },
  
  // F4展厅 - 文创墙页面
  {
    path: '/shandong/f4/wenchuang',
    name: 'f4-wenchuang',
    meta: { title: 'F4 展厅 · 文创墙' },
    component: () => import(/* webpackChunkName: "f4-wenchuang" */ '../views/shanxi/exhibitions/ShandongF4Wenchuang.vue')
  },

  // 山东展馆 F3（非遗技艺）与子页
  { path: '/F3', name: 'sd-f3', meta: { title: 'F3 展厅 · 非遗技艺' }, component: () => import('../views/shanxi/exhibitions/ShandongF3Home.vue') },
  { path: '/shandong/f3/detail', name: 'sd-f3-detail', meta: { title: '山东 · 了解详情' }, component: () => import('../views/shanxi/exhibitions/ShandongF3Details.vue') },
  { path: '/shandong/f3/interview', name: 'sd-f3-interview', meta: { title: '山东 · 访谈纪要' }, component: () => import('../views/shanxi/exhibitions/ShandongF3Interviews.vue') },

  // 农业非遗特展
  {
    path: '/agriculture',
    name: 'agriculture',
    meta: { title: '农业非遗特展' },
    component: () => import(/* webpackChunkName: "agriculture" */ '../views/AgriculturePage.vue')
  },
  // 农具演进史页面
  {
    path: '/agriculture-tools',
    name: 'agriculture-tools',
    meta: { title: '农具演进史' },
    component: () => import(/* webpackChunkName: "agriculture-tools" */ '../views/AgricultureToolsPage.vue')
  },
  // 404
  {
    path: '*',
    name: 'not-found',
    meta: { title: '页面未找到' },
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果是浏览器前进/后退，恢复之前的位置
    if (savedPosition) {
      return savedPosition
    }
    
    // 对于跳转到首页的情况，强制滚动到顶部
    if (to.path === '/' || to.name === 'homepage') {
      return new Promise((resolve) => {
        setTimeout(() => {
          window.scrollTo(0, 0);
          resolve({ x: 0, y: 0 });
        }, 100);
      });
    }
    
    // 其他情况也滚动到顶部
    return { x: 0, y: 0 }
  }
})

// 全局前置守卫 - 确保页面跳转时正确处理滚动
router.beforeEach((to, from, next) => {
  // 如果跳转到首页，确保滚动到顶部
  if (to.path === '/' || to.name === 'homepage') {
    // 立即滚动到顶部
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }
  next();
});

// 全局后置钩子 - 设置页面标题
router.afterEach((to) => {
  const defaultTitle = '溯智 | 数字博物馆';
  const pageTitle = to && to.meta && to.meta.title ? `${to.meta.title} | 数字博物馆` : defaultTitle;
  document.title = pageTitle;
});

export default router
