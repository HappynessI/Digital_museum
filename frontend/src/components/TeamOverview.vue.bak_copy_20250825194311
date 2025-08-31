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
          <div class="detail-panel">
            <h3 class="d-title">{{ activeGroup.name }}</h3>
            <p class="d-desc">{{ activeGroup.desc || leader.title }}</p>
            <div class="meta">
              <span class="badge" v-for="(t,i) in (activeGroup.tags||[])" :key="i">#{{ t }}</span>
            </div>
            <div class="members" v-if="activeGroup.members && activeGroup.members.length">
              <div class="member" v-for="(m,i) in activeGroup.members" :key="i">
                <div class="avatar" aria-hidden="true">👤</div>
                <div>
                  <div class="m-name">{{ m.name }}</div>
                  <div class="m-role">{{ m.role }}</div>
                </div>
              </div>
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
    return { activeGroup: null }
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
    select(g){ this.activeGroup = g }
  }
}
</script>

<style scoped>
.team-overview { background: #fff; padding: 2rem 0; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }
.head { text-align: center; margin-bottom: 1rem; }
.title { font-size: 1.75rem; font-weight: 800; }

/* 新布局：左侧纵向卡片 + 右侧详情 */
.layout { display: grid; grid-template-columns: 320px 1fr; gap: 1rem; align-items: start; }
.nav { position: relative; padding-left: .75rem; display: grid; grid-auto-rows: max-content; gap: .75rem; }
.nav::before { content: ''; position: absolute; left: 10px; top: 0; bottom: 0; border-left: 2px dashed #fecaca; }
.detail { min-height: 280px; }
.detail-panel { border: 1px solid #eef2f7; border-radius: 16px; padding: 1rem; box-shadow: 0 10px 24px rgba(0,0,0,.04); background: #fff; }
.d-title { font-weight: 800; color: #111827; font-size: 1.25rem; margin-bottom: .5rem; }
.d-desc { color: #374151; margin-bottom: .5rem; }
.meta { display: inline-flex; gap: .25rem; flex-wrap: wrap; margin-bottom: .5rem; }
.badge { background: #fef2f2; color: #ef4444; padding: 2px 8px; border-radius: 999px; font-weight: 700; font-size: .8rem; }
.members { display: grid; grid-template-columns: 1fr; gap: .5rem; }
.member { display: inline-flex; align-items: center; gap: .5rem; border: 1px solid #f1f5f9; border-radius: 12px; padding: .5rem; }
.avatar { width: 32px; height: 32px; border-radius: 999px; background: #fff5f5; display: grid; place-items: center; }
.m-name { font-weight: 700; color: #111827; }
.m-role { color: #6b7280; }

@media (max-width: 992px){
  .layout { grid-template-columns: 1fr; }
  .nav::before { left: 6px; }
}
</style>

