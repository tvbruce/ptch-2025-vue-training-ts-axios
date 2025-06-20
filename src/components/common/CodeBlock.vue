<template>
  <div class="code-block">
    <div class="code-header">
      <h4 class="code-title">{{ title }}</h4>
      <div class="code-actions">
        <button class="btn-copy" @click="copyCode" :class="{ copied: isCopied }">
          {{ isCopied ? '已複製' : '複製' }}
        </button>
        <button v-if="runnable" class="btn-run" @click="runCode" :disabled="isRunning">
          {{ isRunning ? '執行中...' : '執行' }}
        </button>
      </div>
    </div>

    <pre class="code-content"><code
      :class="`language-${language}`"
    >{{ props.code }}</code></pre>

    <div v-if="explanation" class="code-explanation">
      <h5>說明：</h5>
      <p>{{ explanation }}</p>
    </div>

    <div v-if="output" class="code-output">
      <h5>輸出結果：</h5>
      <pre>{{ output }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  title: string
  code: string
  language: string
  explanation?: string
  runnable?: boolean
  expectedOutput?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  run: [code: string]
}>()

const isCopied = ref(false)
const isRunning = ref(false)
const output = ref('')

// 直接顯示程式碼，不進行 HTML 標籤處理

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('複製失敗:', error)
  }
}

async function runCode() {
  if (!props.runnable) return

  isRunning.value = true
  try {
    emit('run', props.code)
    // 模擬執行時間
    await new Promise(resolve => setTimeout(resolve, 1000))
    output.value = props.expectedOutput || '程式碼執行完成'
  } catch (error) {
    output.value = `執行錯誤: ${error}`
  } finally {
    isRunning.value = false
  }
}

onMounted(() => {
  // 如果需要進階語法高亮，可以在這裡整合 Prism.js 或其他語法高亮庫
})
</script>

<style scoped>
.code-block {
  margin: 1.5rem 0;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid #e1e5e9;
}

.code-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
}

.code-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-copy,
.btn-run {
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  background: #fff;
  color: #4a5568;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn-copy:hover,
.btn-run:hover {
  background: #f7fafc;
  border-color: #a0aec0;
}

.btn-copy.copied {
  background: #48bb78;
  color: white;
  border-color: #48bb78;
}

.btn-run:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.code-content {
  padding: 1.5rem;
  margin: 0;
  background: #2d3748;
  color: #e2e8f0;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.code-content code {
  font-family: inherit;
}

.code-explanation,
.code-output {
  padding: 1rem;
  background: #fff;
  border-top: 1px solid #e1e5e9;
}

.code-explanation h5,
.code-output h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2d3748;
}

.code-explanation p {
  margin: 0;
  color: #4a5568;
  line-height: 1.6;
}

.code-output pre {
  margin: 0;
  padding: 0.75rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  color: #2d3748;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .code-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .code-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
