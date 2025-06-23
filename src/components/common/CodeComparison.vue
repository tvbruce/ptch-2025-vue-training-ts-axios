<template>
  <div class="code-comparison" ref="comparisonRef" :class="{ 'compact-mode': isCompactMode }">
    <div class="comparison-header">
      <h4 class="comparison-title">{{ title }}</h4>
      <div class="comparison-actions">
        <button class="btn-copy" @click="copyBothCode" :class="{ copied: isCopied }">
          {{ isCopied ? '已複製' : '複製全部' }}
        </button>
        <button class="btn-toggle-layout" @click="toggleLayout" :title="isCompactMode ? '切換到並排模式' : '切換到堆疊模式'">
          {{ isCompactMode ? '📊' : '📋' }}
        </button>
      </div>
    </div>

    <div class="comparison-content" :class="{ 'stacked-layout': isCompactMode }">
      <div class="comparison-panel">
        <div class="panel-header">
          <h5 class="panel-title">{{ beforeTitle }}</h5>
          <button class="btn-copy-single" @click="copyCode(beforeCode)" :class="{ copied: isBeforeCopied }">
            {{ isBeforeCopied ? '已複製' : '複製' }}
          </button>
        </div>
        <pre class="code-content"><code :class="`language-${language}`">{{ beforeCode }}</code></pre>
      </div>

      <div class="comparison-arrow">
        <div class="arrow-icon">→</div>
        <div class="arrow-text">編譯後</div>
      </div>

      <div class="comparison-panel">
        <div class="panel-header">
          <h5 class="panel-title">{{ afterTitle }}</h5>
          <button class="btn-copy-single" @click="copyCode(afterCode)" :class="{ copied: isAfterCopied }">
            {{ isAfterCopied ? '已複製' : '複製' }}
          </button>
        </div>
        <pre class="code-content"><code :class="`language-${afterLanguage || 'javascript'}`">{{ afterCode }}</code></pre>
      </div>
    </div>

    <div v-if="explanation" class="comparison-explanation">
      <h5>編譯說明：</h5>
      <p>{{ explanation }}</p>
    </div>

    <div v-if="highlights && highlights.length > 0" class="comparison-highlights">
      <h5>關鍵差異：</h5>
      <ul>
        <li v-for="highlight in highlights" :key="highlight">{{ highlight }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  title: string
  beforeTitle: string
  afterTitle: string
  beforeCode: string
  afterCode: string
  language: string
  afterLanguage?: string
  explanation?: string
  highlights?: string[]
}

const props = defineProps<Props>()

const isCopied = ref(false)
const isBeforeCopied = ref(false)
const isAfterCopied = ref(false)
const isCompactMode = ref(false)
const comparisonRef = ref<HTMLElement>()

// 檢測容器寬度並自動切換佈局
function checkContainerWidth() {
  if (comparisonRef.value) {
    const width = comparisonRef.value.offsetWidth
    // 如果容器寬度小於 900px，自動切換到堆疊模式
    if (width < 900 && !isCompactMode.value) {
      isCompactMode.value = true
    }
  }
}

// 手動切換佈局模式
function toggleLayout() {
  isCompactMode.value = !isCompactMode.value
}

async function copyCode(code: string) {
  try {
    await navigator.clipboard.writeText(code)

    if (code === props.beforeCode) {
      isBeforeCopied.value = true
      setTimeout(() => {
        isBeforeCopied.value = false
      }, 2000)
    } else if (code === props.afterCode) {
      isAfterCopied.value = true
      setTimeout(() => {
        isAfterCopied.value = false
      }, 2000)
    }
  } catch (error) {
    console.error('複製失敗:', error)
  }
}

async function copyBothCode() {
  try {
    const combinedCode = `// ${props.beforeTitle}\n${props.beforeCode}\n\n// ${props.afterTitle}\n${props.afterCode}`
    await navigator.clipboard.writeText(combinedCode)

    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('複製失敗:', error)
  }
}

// 組件掛載後設置監聽器
onMounted(() => {
  checkContainerWidth()
  window.addEventListener('resize', checkContainerWidth)
})

// 組件卸載時清理監聽器
onUnmounted(() => {
  window.removeEventListener('resize', checkContainerWidth)
})
</script>

<style scoped>
.code-comparison {
  margin: 2rem 0;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
}

.comparison-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid #e1e5e9;
}

.comparison-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
}

.comparison-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-copy,
.btn-copy-single,
.btn-toggle-layout {
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  background: #fff;
  color: #4a5568;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn-toggle-layout {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  min-width: 44px;
}

.btn-copy:hover,
.btn-copy-single:hover,
.btn-toggle-layout:hover {
  background: #f7fafc;
  border-color: #a0aec0;
}

.btn-copy.copied,
.btn-copy-single.copied {
  background: #48bb78;
  color: white;
  border-color: #48bb78;
}

.btn-toggle-layout:hover {
  background: #e2e8f0;
}

.comparison-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 0;
  background: #2d3748;
  min-height: 400px;
}

.comparison-panel {
  display: flex;
  flex-direction: column;
  min-width: 0; /* 允許收縮 */
  overflow: hidden; /* 防止內容溢出 */
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #4a5568;
  border-bottom: 1px solid #718096;
  flex-shrink: 0; /* 防止標題被壓縮 */
}

.panel-title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #e2e8f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 1rem;
}

.btn-copy-single {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.code-content {
  padding: 1rem;
  margin: 0;
  background: #2d3748;
  color: #e2e8f0;
  overflow: auto; /* 同時支援水平和垂直滾動 */
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.8rem; /* 稍微縮小字體以容納更多內容 */
  line-height: 1.5;
  flex: 1;
  min-height: 300px;
  white-space: pre; /* 保持程式碼格式 */
  word-break: normal; /* 避免強制換行 */
}

.code-content code {
  font-family: inherit;
  display: block;
  min-width: max-content; /* 確保程式碼不會被強制換行 */
}

.comparison-arrow {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0.25rem;
  background: #4a5568;
  border-left: 1px solid #718096;
  border-right: 1px solid #718096;
  min-width: 60px;
  max-width: 80px;
  flex-shrink: 0;
}

.arrow-icon {
  font-size: 1.2rem;
  color: #81c784;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.arrow-text {
  font-size: 0.7rem;
  color: #cbd5e0;
  text-align: center;
  writing-mode: horizontal-tb;
  word-break: break-all;
}

.comparison-explanation,
.comparison-highlights {
  padding: 1rem;
  background: #fff;
  border-top: 1px solid #e1e5e9;
}

.comparison-explanation h5,
.comparison-highlights h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2d3748;
}

.comparison-explanation p {
  margin: 0;
  color: #4a5568;
  line-height: 1.6;
}

.comparison-highlights ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #4a5568;
}

.comparison-highlights li {
  margin-bottom: 0.25rem;
  line-height: 1.5;
}

/* 堆疊模式樣式 */
.comparison-content.stacked-layout {
  grid-template-columns: 1fr;
  grid-template-rows: minmax(300px, auto) auto minmax(300px, auto);
  min-height: auto;
}

.stacked-layout .comparison-arrow {
  flex-direction: row;
  padding: 0.75rem;
  justify-content: center;
  min-width: auto;
  max-width: none;
  min-height: 60px;
}

.stacked-layout .arrow-icon {
  margin-bottom: 0;
  margin-right: 0.5rem;
  transform: rotate(90deg);
  font-size: 1.2rem;
}

.stacked-layout .arrow-text {
  font-size: 0.75rem;
}

.stacked-layout .code-content {
  min-height: 300px;
}

/* 緊湊模式下的特殊樣式 */
.compact-mode .comparison-title {
  font-size: 1rem;
}

.compact-mode .code-content {
  font-size: 0.75rem;
  padding: 0.75rem;
}

/* 中等螢幕優化 - 平板橫向 */
@media (max-width: 1024px) and (min-width: 769px) {
  .code-content {
    font-size: 0.75rem;
    padding: 0.75rem;
  }

  .comparison-arrow {
    min-width: 50px;
    max-width: 60px;
    padding: 1rem 0.2rem;
  }

  .arrow-icon {
    font-size: 1rem;
  }

  .arrow-text {
    font-size: 0.65rem;
  }
}

/* 小螢幕優化 - 平板直向和手機橫向 */
@media (max-width: 768px) and (min-width: 481px) {
  .comparison-content {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(250px, auto) auto minmax(250px, auto);
    min-height: auto;
  }

  .comparison-arrow {
    flex-direction: row;
    padding: 0.75rem;
    justify-content: center;
    min-width: auto;
    max-width: none;
    min-height: 60px;
  }

  .arrow-icon {
    margin-bottom: 0;
    margin-right: 0.5rem;
    transform: rotate(90deg);
    font-size: 1.2rem;
  }

  .arrow-text {
    font-size: 0.75rem;
  }

  .code-content {
    font-size: 0.8rem;
    min-height: 250px;
  }

  .comparison-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .panel-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .panel-title {
    white-space: normal;
    margin-right: 0;
  }
}

/* 極小螢幕優化 - 手機直向 */
@media (max-width: 480px) {
  .code-comparison {
    margin: 1rem 0;
  }

  .comparison-header {
    padding: 0.75rem;
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }

  .comparison-title {
    font-size: 1rem;
    text-align: center;
  }

  .comparison-actions {
    justify-content: center;
  }

  .comparison-content {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(200px, auto) auto minmax(200px, auto);
    min-height: auto;
  }

  .comparison-arrow {
    flex-direction: row;
    padding: 0.5rem;
    justify-content: center;
    min-height: 50px;
  }

  .arrow-icon {
    margin-bottom: 0;
    margin-right: 0.5rem;
    transform: rotate(90deg);
    font-size: 1rem;
  }

  .arrow-text {
    font-size: 0.7rem;
  }

  .panel-header {
    padding: 0.5rem 0.75rem;
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  .panel-title {
    white-space: normal;
    margin-right: 0;
    text-align: center;
    font-size: 0.85rem;
  }

  .btn-copy-single {
    align-self: center;
  }

  .code-content {
    font-size: 0.75rem;
    padding: 0.75rem;
    min-height: 200px;
    line-height: 1.4;
  }

  .comparison-explanation,
  .comparison-highlights {
    padding: 0.75rem;
  }

  .comparison-explanation h5,
  .comparison-highlights h5 {
    font-size: 0.8rem;
  }

  .comparison-explanation p,
  .comparison-highlights li {
    font-size: 0.8rem;
  }
}
</style>
