<template>
  <div class="results-page">
    <!-- 顶部 Hero -->
    <section class="hero">
      <div class="container">
        <h1 class="title">社会实践 · 成果展示</h1>
        <p class="subtitle">用行动丈量中国，用数据讲述故事</p>
        <div class="actions">
          <router-link to="/homepage" class="btn btn-ghost">返回首页</router-link>
          <a href="#downloads" class="btn btn-primary">下载报告</a>
        </div>
      </div>
    </section>

    <!-- 成果总览数据卡 -->
    <section class="kpis">
      <div class="container grid-4">
        <div class="kpi">
          <div class="num">14</div>
          <div class="label">深度访谈</div>
        </div>
        <div class="kpi">
          <div class="num">4万+</div>
          <div class="label">字数（阶段报告）</div>
        </div>
        <div class="kpi">
          <div class="num">530+</div>
          <div class="label">影像素材</div>
        </div>
        <div class="kpi">
          <div class="num">11</div>
          <div class="label">非遗项目</div>
        </div>
      </div>
    </section>

    <!-- 实践活动集（时间线） -->
    <section class="timeline">
      <div class="container">
        <h2 class="section-title">实践活动集</h2>
        <ul class="tl">
          <li v-for="(item, idx) in timeline" :key="idx" class="tl-item">
            <div class="dot"></div>
            <div class="content">
              <div class="meta">{{ item.date }} · {{ item.city }}</div>
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.desc }}</div>
              <div class="tags">
                <span v-for="t in item.tags" :key="t" class="tag">#{{ t }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- 影像集（精选作品） -->
    <section class="gallery">
      <div class="container">
        <h2 class="section-title">影像集 · 精选</h2>
        <div class="grid gallery-grid">
          <div class="card" v-for="(img, i) in gallery" :key="i">
            <img :src="img.src" :alt="img.alt">
            <div class="caption">
              <div class="name">{{ img.title }}</div>
              <div class="meta">{{ img.meta }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 采访·节选（卡片列表） -->
    <section class="interviews">
      <div class="container">
        <h2 class="section-title">采访 · 节选</h2>
        <div class="grid-3">
          <article class="iv-card" v-for="(iv, i) in interviews" :key="i">
            <div class="iv-title">“{{ iv.quote }}”</div>
            <div class="iv-meta">—— {{ iv.name }} · {{ iv.role }}</div>
            <div class="iv-desc">{{ iv.desc }}</div>
          </article>
        </div>
      </div>
    </section>

    <!-- 报告下载 -->
    <section id="downloads" class="downloads">
      <div class="container">
        <h2 class="section-title">阶段报告与材料下载</h2>
        <div class="download-list">
          <a class="download-item" href="#" @click.prevent="onDownload('阶段报告-摘要.pdf')">
            <span>阶段报告（摘要版）</span>
            <i>PDF</i>
          </a>
          <a class="download-item" href="#" @click.prevent="onDownload('方法论手册-简版.pdf')">
            <span>方法论手册（简版）</span>
            <i>PDF</i>
          </a>
          <a class="download-item" href="#" @click.prevent="onDownload('开放数据-样例.csv')">
            <span>开放数据（样例）</span>
            <i>CSV</i>
          </a>
        </div>
        <p class="hint">注：示例文件待实际成果产出后替换真实链接。</p>
      </div>
    </section>
  </div>
  </template>

<script>
export default {
  name: 'PracticeResultsPage',
  data() {
    return {
      timeline: [
        { date: '7 月', city: '山西 · 太原', title: '省博学术交流', desc: '与博物馆学者交流非遗数字化展陈路径，调研典型展项与观众交互体验。', tags: ['交流', '展陈', '方法'] },
        { date: '7 月', city: '山西 · 运城', title: '田野走访 · 口述史采集', desc: '围绕盐湖相关记忆开展主题访谈，补充在地叙事素材。', tags: ['口述史', '盐湖'] },
        { date: '8 月', city: '山东 · 潍坊', title: '国家级非遗 · 风筝', desc: '记录工序环节、采访传承人，建立标准化元数据。', tags: ['非遗', '风筝', '传承人'] },
        { date: '8 月', city: '山东 · 淄博', title: '传统工艺 · 锔瓷堆', desc: '拍摄工坊环境与工具细节，形成可视化图文稿。', tags: ['工艺', '图文'] }
      ],
      gallery: [
        { src: require('@/assets/images/花馍风采.jpg'), alt: '花馍风采', title: '花馍风采', meta: '山东 · 烟台' },
        { src: require('@/assets/images/花馍介绍.jpg'), alt: '花馍介绍', title: '花馍介绍', meta: '山东 · 烟台' },
        { src: require('@/assets/images/砖雕风采.jpg'), alt: '砖雕风采', title: '砖雕风采', meta: '山西 · 太原' },
        { src: require('@/assets/images/砖雕介绍.jpg'), alt: '砖雕介绍', title: '砖雕介绍', meta: '山西 · 太原' },
        { src: require('@/assets/images/home-03-270x360.jpg'), alt: '访谈现场', title: '访谈现场', meta: '样本采集' },
        { src: require('@/assets/images/home-02-270x360.jpg'), alt: '报告撰写', title: '报告撰写', meta: '方法沉淀' }
      ],
      interviews: [
        { quote: '只有真正理解背后的生活逻辑，才能谈得上保护与传承', name: '刘老师', role: '文化研究者', desc: '田野记录不仅是“采样”，更是与在地共同面对现实问题的过程。' },
        { quote: '年轻人愿意学、敢于试，老手艺才有生命力', name: '张师傅', role: '非遗传承人', desc: '把工艺讲清楚、让大众看得懂，这是传承和传播的第一步。' },
        { quote: '数据不是冷冰冰的数字，它应该服务于故事与行动', name: '王同学', role: '项目统筹', desc: '以“发现—记录—传播”为主线，形成可复用的方法论与工具箱。' }
      ]
    }
  },
  methods: {
    onDownload(name) {
      alert(`${name} 将在成果定稿后提供下载链接。`)
    }
  }
}
</script>

<style>
.results-page { background: #f8fafc; color: #111827; }
.container { max-width: 1120px; margin: 0 auto; padding: 0 16px; }

/* 顶部 */
.hero { padding: 40px 0 24px; background: linear-gradient(135deg, #fee2e2 0%, #ffffff 60%); border-bottom: 1px solid #f1f5f9; }
.hero .title { font-size: 28px; font-weight: 800; margin: 0 0 6px; }
.hero .subtitle { color: #6b7280; margin: 0 0 12px; }
.actions { display: flex; gap: 10px; }
.btn { padding: 8px 14px; border-radius: 10px; font-weight: 700; border: 1px solid #e5e7eb; background: #fff; color: #111827; transition: all .2s ease; text-decoration: none; display: inline-flex; align-items: center; }
.btn:hover { transform: translateY(-1px); box-shadow: 0 8px 16px rgba(0,0,0,.06); }
.btn-primary { background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%); color: #fff; border-color: transparent; }
.btn-ghost { background: #fff; color: #ef4444; border-color: #fecaca; }

/* KPIs */
.kpis { padding: 18px 0; background: #ffffff; border-bottom: 1px solid #f1f5f9; }
.grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.kpi { background: #fff; border: 1px solid #eef2f7; border-radius: 16px; padding: 16px; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.04); }
.kpi .num { font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #DC2626, #EF4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.kpi .label { color: #6b7280; font-size: 13px; }

@media (max-width: 768px) { .grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }

/* 时间线 */
.timeline { padding: 24px 0; }
.section-title { font-size: 20px; font-weight: 800; margin: 0 0 12px; }
.tl { list-style: none; padding: 0; margin: 0; border-left: 3px solid #ef4444; }
.tl-item { position: relative; padding: 12px 0 12px 16px; }
.tl-item .dot { position: absolute; left: -7px; top: 22px; width: 10px; height: 10px; background: #ef4444; border-radius: 50%; box-shadow: 0 0 0 6px rgba(239,68,68,.12); }
.tl-item .meta { color: #ef4444; font-weight: 700; margin-bottom: 4px; }
.tl-item .title { font-weight: 800; margin-bottom: 4px; }
.tl-item .desc { color: #6b7280; }
.tags { margin-top: 6px; display: flex; gap: 6px; flex-wrap: wrap; }
.tag { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #fef2f2; color: #ef4444; font-weight: 700; font-size: 12px; }

/* 影像集 */
.gallery { padding: 18px 0; background: linear-gradient(180deg,#fff 0%,#f9fafb 100%); }
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.card { background: #fff; border: 1px solid #eef2f7; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.04); transition: transform .2s ease, box-shadow .2s ease; }
.card:hover { transform: translateY(-4px); box-shadow: 0 18px 36px rgba(0,0,0,0.08); }
.card img { width: 100%; height: 180px; object-fit: cover; display: block; }
.caption { padding: 10px 12px; }
.caption .name { font-weight: 800; }
.caption .meta { color: #6b7280; font-size: 12px; }

/* 采访 */
.interviews { padding: 18px 0; }
.grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.iv-card { background: #fff; border: 1px solid #eef2f7; border-radius: 16px; padding: 14px; box-shadow: 0 10px 20px rgba(0,0,0,0.04); }
.iv-title { font-weight: 800; margin-bottom: 6px; }
.iv-meta { color: #ef4444; font-weight: 700; margin-bottom: 6px; }
.iv-desc { color: #6b7280; }
@media (max-width: 768px) { .grid-3 { grid-template-columns: 1fr; } }

/* 下载 */
.downloads { padding: 18px 0 28px; background: #ffffff; }
.download-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.download-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border: 1px solid #e5e7eb; border-radius: 12px; text-decoration: none; color: #111827; background: #fff; transition: all .2s ease; }
.download-item:hover { border-color: #ef4444; box-shadow: 0 12px 24px rgba(0,0,0,.06); transform: translateY(-2px); }
.download-item i { font-style: normal; color: #ef4444; font-weight: 800; }
.hint { color: #6b7280; margin-top: 10px; font-size: 12px; }
@media (max-width: 768px) { .download-list { grid-template-columns: 1fr; } }
</style>

