<template>
  <section id="mission" class="mission-section" aria-labelledby="mv-title">
    <div class="container">
      <h2 v-if="showTitle" id="mv-title" class="title">愿景与使命</h2>

      <!-- 左右布局：左侧可插 Hero，右侧显示愿景与使命文本 -->
      <div class="mv-layout">
        <aside class="aside" aria-label="项目品牌信息">
          <slot name="aside"></slot>
        </aside>
        <div class="content">
          <p class="center-paragraph">{{ mergedText }}</p>
        </div>
      </div>

      <div class="timeline" v-if="timeline && timeline.length">
        <div class="tick" v-for="(t,i) in timeline" :key="i">
          <div class="t-time">{{ t.time }}</div>
          <div class="t-event">{{ t.event }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MissionVision',
  props: {
    blocks: { type: Array, default: () => [] },
    timeline: { type: Array, default: () => [] },
    visionText: { type: String, default: '' },
    missionText: { type: String, default: '' },
    combinedText: { type: String, default: '' },
    showTitle: { type: Boolean, default: true }
  },
  computed: {
    mergedText() {
      if (this.combinedText) return this.combinedText
      const v = this.visionText ? `愿景：${this.visionText}` : ''
      const m = this.missionText ? `使命：${this.missionText}` : ''
      return [v, m].filter(Boolean).join(' ；') || ''
    }
  }
}
</script>

<style scoped>
.mission-section { background: #ffffff; padding: 2rem 0; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }
.title { font-size: 1.75rem; font-weight: 800; text-align: center; margin-bottom: 1rem; }
.mv-layout { display: grid; grid-template-columns: minmax(260px, .9fr) 1.6fr; gap: 1rem; align-items: center; }
.aside { display: block; position: relative; }
.content { display: block; }
.center-paragraph { color: #374151; line-height: 1.9; text-align: center; max-width: 900px; margin: 0 auto 1rem; font-size: 1.125rem; }
.timeline { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: .75rem; margin-top: 1rem; }
.tick { background: #fff; border: 1px solid #f1f5f9; border-radius: 12px; padding: .75rem; text-align: center; }
.t-time { font-weight: 800; color: #ef4444; }
.t-event { color: #374151; font-size: .95rem; }
@media (max-width: 992px){ .mv-layout{ grid-template-columns: 1fr; } .center-paragraph{ text-align: left; margin-left: 0; margin-right: 0; } .timeline{ grid-template-columns: 1fr; } }
</style>

