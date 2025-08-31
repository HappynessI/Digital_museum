<template>
  <div class="orgchart" role="tree" aria-label="分层组织图">
    <div class="root" role="treeitem" aria-level="1">
      <div class="node root-node">
        <div class="node-title">{{ leader.name }}</div>
        <div class="node-meta">{{ leader.title }}</div>
      </div>
    </div>
    <div class="children" role="group" aria-level="2">
      <div class="node child-node" v-for="g in groups" :key="g.key" role="treeitem">
        <div class="node-title">{{ g.name }}</div>
        <div class="node-meta">{{ g.desc }}</div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'OrgChart',
  props: {
    leader: { type: Object, required: true },
    groups: { type: Array, default: () => [] }
  }
}
</script>

<style scoped>
.orgchart { display: grid; gap: .75rem; justify-items: center; }
.node { background: #fff; border: 1px solid #eef2f7; border-radius: 12px; padding: .5rem .75rem; text-align: center; box-shadow: 0 8px 20px rgba(0,0,0,.04); }
.root-node { border-color: #fecaca; background: #fff5f5; }
.child-node { max-width: 280px; }
.node-title { font-weight: 800; color: #111827; }
.node-meta { color: #6b7280; font-size: .9rem; }
.children { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: .75rem; width: 100%; }
@media (max-width: 992px){ .children { grid-template-columns: 1fr; } }
</style>

