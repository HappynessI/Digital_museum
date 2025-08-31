<template>
  <div v-if="open" class="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
    <div class="panel">
      <header class="panel-head">
        <h3 id="drawer-title" class="title">{{ group?.name || '小组详情' }}</h3>
        <button class="close" @click="$emit('close')" aria-label="关闭">✕</button>
      </header>
      <p class="desc">{{ group?.desc }}</p>
      <div class="meta">
        <span class="badge" v-for="(t,i) in (group?.tags||[])" :key="i">#{{ t }}</span>
      </div>
      <div class="members">
        <div class="member" v-for="(m,i) in (group?.members||[])" :key="i">
          <div class="avatar" aria-hidden="true">👤</div>
          <div>
            <div class="name">{{ m.name }}</div>
            <div class="role">{{ m.role }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" @click="$emit('close')"></div>
  </div>
</template>

<script>
export default {
  name: 'GroupDrawer',
  props: {
    open: { type: Boolean, default: false },
    group: { type: Object, default: null }
  }
}
</script>

<style scoped>
.drawer { position: fixed; inset: 0; z-index: 1300; }
.mask { position: absolute; inset: 0; background: rgba(17,24,39,.5); }
.panel { position: absolute; right: 0; top: 0; height: 100%; width: min(480px, 100%); background: #fff; border-left: 1px solid #eef2f7; box-shadow: -8px 0 20px rgba(0,0,0,.08); padding: 1rem; display: grid; grid-auto-rows: max-content; gap: .75rem; animation: slide .25s ease; }
@keyframes slide { from { transform: translateX(10%); opacity: .6; } to { transform: translateX(0); opacity: 1; } }
.panel-head { display: flex; align-items: center; justify-content: space-between; }
.title { font-weight: 800; color: #111827; }
.close { border: 1px solid #e5e7eb; background: #fff; border-radius: 10px; padding: .25rem .5rem; cursor: pointer; }
.desc { color: #374151; }
.meta { display: inline-flex; gap: .25rem; flex-wrap: wrap; }
.badge { background: #fef2f2; color: #ef4444; padding: 2px 8px; border-radius: 999px; font-weight: 700; font-size: .8rem; }
.members { display: grid; grid-template-columns: 1fr; gap: .5rem; }
.member { display: inline-flex; align-items: center; gap: .5rem; border: 1px solid #f1f5f9; border-radius: 12px; padding: .5rem; }
.avatar { width: 32px; height: 32px; border-radius: 999px; background: #fff5f5; display: grid; place-items: center; }
.name { font-weight: 700; color: #111827; }
.role { color: #6b7280; }
</style>

