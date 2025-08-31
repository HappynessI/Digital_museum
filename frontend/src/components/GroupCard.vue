<template>
  <button 
    class="group-card" 
    role="listitem" 
    @click="$emit('open')" 
    :aria-label="group.name"
  >
    <div class="head">
      <div class="badge">{{ group.name }}</div>
      <div class="tags">
        <span 
          v-for="(t, i) in group.tags" 
          :key="i" 
          class="tag"
        >
          #{{ t }}
        </span>
      </div>
    </div>
    <p class="desc">{{ group.desc }}</p>
  </button>
</template>

<script>
export default {
  name: 'GroupCard',
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  emits: ['open']
}
</script>

<style scoped>
.group-card {
  text-align: left;
  width: 100%;
  border: 1px solid #eef2f7;
  background: #fff;
  border-radius: 16px;
  padding: 1rem;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.group-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.08);
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.badge {
  font-weight: 800;
  color: #111827;
}

.tags {
  display: inline-flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.tag {
  background: #fef2f2;
  color: #ef4444;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 0.8rem;
  font-weight: 700;
}

.desc {
  color: #4b5563;
}
</style>
