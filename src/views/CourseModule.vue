<template>
  <div class="course-module">
    <NavigationSidebar />

    <main class="main-content">
      <div class="content-header">
        <h1>{{ currentSection?.title || '歡迎來到 TypeScript 教學課程' }}</h1>
        <div class="course-badge" v-if="currentSection">
          <span class="badge-stage">{{ currentSection.stage }}</span>
          <span class="badge-difficulty">{{ getDifficultyLabel(currentSection.id) }}</span>
        </div>
        <div class="section-meta">
          <button v-if="currentSection && !currentSection.completed" class="btn-complete" @click="markCompleted">
            標記為完成
          </button>
        </div>
      </div>

      <div class="content-body">
        <component :is="sectionComponent" v-if="sectionComponent" :section="currentSection" @complete="markCompleted" />

        <div v-else-if="!currentSection" class="section-welcome">
          <h2>歡迎來到 Vue3 教育訓練</h2>
          <p class="welcome-subtitle">TypeScript & Axios 應用的完整學習路徑</p>

          <div class="course-overview">
            <h3>🎯 訓練特色</h3>
            <div class="overview-features">
              <div class="feature-item">
                <span class="feature-icon">🔄</span>
                <div class="feature-content">
                  <h4>實用性對比</h4>
                  <p>每個概念都會展示「有用 vs 沒用」的實際差異</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🛡️</span>
                <div class="feature-content">
                  <h4>型別安全</h4>
                  <p>掌握 Vue3 + TypeScript 的型別系統，提升程式碼品質</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔧</span>
                <div class="feature-content">
                  <h4>工具整合</h4>
                  <p>深入的 VS Code 開發環境設定與生產力提升</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-icon">⚡</span>
                <div class="feature-content">
                  <h4>實戰案例</h4>
                  <p>真實專案中的 Vue3 + TypeScript + Axios 應用場景</p>
                </div>
              </div>
            </div>
          </div>

          <div class="learning-path">
            <h3>📚 學習路徑</h3>
            <div class="stages-grid">
              <div v-for="(stageSections, stage) in navigationStore.stageGroups" :key="stage" class="stage-card">
                <div class="stage-card-header">
                  <h4>{{ stage }}</h4>
                </div>
                <div class="stage-card-body">
                  <ul class="stage-sections">
                    <li v-for="section in stageSections" :key="section.id">
                      <router-link :to="section.path" class="section-link">
                        {{ section.title }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="get-started">
            <router-link to="/module/typescript-introduction" class="btn-start">
              開始學習 TypeScript
            </router-link>
          </div>
        </div>

        <div v-else class="section-placeholder">
          <h2>{{ currentSection.title }}</h2>
          <p>此章節內容正在開發中，敬請期待。</p>
          <div class="placeholder-info">
            <h3>章節內容預覽：</h3>
            <div class="preview-content">
              <p><strong>目標：</strong>{{ currentSection.description }}</p>

              <p><strong>難度：</strong>{{ getDifficultyLabel(currentSection.id) }}</p>
              <p><strong>階段：</strong>{{ currentSection.stage }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-footer">
        <div class="navigation-buttons">
          <button v-if="navigationStore.hasPreviousSection" class="btn-nav btn-previous" @click="goToPreviousSection">
            ← 上一章節
          </button>

          <button v-if="navigationStore.hasNextSection" class="btn-nav btn-next" @click="goToNextSection">
            下一章節 →
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'
import NavigationSidebar from '@/components/common/NavigationSidebar.vue'

// 導入新的章節元件
import TypeScriptIntroduction from '@/components/sections/TypeScriptIntroduction.vue'
import TypeScriptVsJavaScript from '@/components/sections/TypeScriptVsJavaScript.vue'
import DotNetToTypeScript from '@/components/sections/DotNetToTypeScript.vue'
import VSCodeSetup from '@/components/sections/VSCodeSetup.vue'
import AdvancedTypeScript from '@/components/sections/AdvancedTypeScript.vue'
import ApiDesignAndTypes from '@/components/sections/ApiDesignAndTypes.vue'
import AxiosBasics from '@/components/sections/AxiosBasics.vue'
import AxiosTypeScriptBestPractices from '@/components/sections/AxiosTypescriptBestPractices.vue'
import MockStrategiesDemo from '@/components/sections/MockStrategiesDemo.vue'
import ProjectIntegration from '@/components/sections/ProjectIntegration.vue'

const route = useRoute()
const router = useRouter()
const navigationStore = useNavigationStore()

// 新的章節元件映射
const sectionComponents = {
  'typescript-introduction': TypeScriptIntroduction,
  'typescript-vs-javascript': TypeScriptVsJavaScript,
  'dotnet-to-typescript': DotNetToTypeScript,
  'vscode-setup': VSCodeSetup,
  'advanced-typescript': AdvancedTypeScript,
  'api-design-and-types': ApiDesignAndTypes,
  'axios-basics': AxiosBasics,
  'axios-typescript-best-practices': AxiosTypeScriptBestPractices,
  'mock-strategies-demo': MockStrategiesDemo,
  'project-integration': ProjectIntegration,
}

const currentSection = computed(() => {
  const sectionId = route.params.sectionId as string
  return navigationStore.sections.find(s => s.id === sectionId)
})

const sectionComponent = computed(() => {
  const sectionId = route.params.sectionId as string
  return sectionComponents[sectionId as keyof typeof sectionComponents]
})

function getDifficultyLabel(sectionId: string): string {
  const difficultyMap: Record<string, string> = {
    'typescript-introduction': '入門',
    'typescript-vs-javascript': '入門',
    'dotnet-to-typescript': '中級',
    'vscode-setup': '入門',
    'advanced-typescript': '進階',
    'api-design-and-types': '中級',
    'axios-basics': '中級',
    'axios-typescript-best-practices': '進階',
    'mock-strategies-demo': '進階',
    'project-integration': '進階',
  }
  return difficultyMap[sectionId] || '中級'
}

function markCompleted() {
  if (currentSection.value) {
    navigationStore.markSectionCompleted(currentSection.value.id)
  }
}

function goToPreviousSection() {
  const previousSection = navigationStore.getPreviousSection()
  if (previousSection) {
    router.push(previousSection.path)
  }
}

function goToNextSection() {
  const nextSection = navigationStore.getNextSection()
  if (nextSection) {
    router.push(nextSection.path)
  }
}

watch(() => route.params.sectionId, (newSectionId) => {
  if (newSectionId) {
    navigationStore.setCurrentSection(newSectionId as string)
    // 確保頁面滾動到頂部
    window.scrollTo(0, 0)
  }
}, { immediate: true })

onMounted(() => {

})
</script>

<style scoped>
.course-module {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 320px;
  padding: 2rem;
  max-width: calc(100vw - 320px);
}

.content-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.content-header h1 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
}

.course-badge {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.badge-stage,
.badge-difficulty {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-stage {
  background: #e6fffa;
  color: #234e52;
  border: 1px solid #b2f5ea;
}

.badge-difficulty {
  background: #faf5ff;
  color: #553c9a;
  border: 1px solid #d6bcfa;
}

.section-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-complete {
  padding: 0.5rem 1rem;
  background: #48bb78;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.btn-complete:hover {
  background: #38a169;
}

.content-body {
  min-height: 60vh;
  margin-bottom: 2rem;
}

.section-welcome {
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.section-welcome h2 {
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
}

.welcome-subtitle {
  margin-bottom: 3rem;
  font-size: 1.25rem;
  color: #4a5568;
  font-weight: 300;
}

.course-overview h3,
.learning-path h3 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
}

.overview-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.feature-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.feature-content h4 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
}

.feature-content p {
  font-size: 0.875rem;
  color: #4a5568;
  line-height: 1.5;
}

.stages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stage-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stage-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stage-card-header {
  padding: 1rem;
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stage-card-header h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
}

.stage-card-body {
  padding: 1rem;
}

.stage-sections {
  list-style: none;
  margin: 0;
  padding: 0;
}

.stage-sections li {
  margin-bottom: 0.5rem;
}

.section-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  color: #4a5568;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
  font-size: 0.875rem;
}

.section-link:hover {
  background: #f7fafc;
  color: #2d3748;
}

.btn-start {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4299e1, #3182ce);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-start:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
}

.section-placeholder {
  text-align: center;
  padding: 4rem 2rem;
}

.section-placeholder h2 {
  margin-bottom: 1rem;
  color: #2d3748;
}

.placeholder-info {
  margin-top: 2rem;
  text-align: left;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.preview-content {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.preview-content p {
  margin-bottom: 0.75rem;
  color: #4a5568;
  line-height: 1.5;
}

.content-footer {
  border-top: 1px solid #e2e8f0;
  padding-top: 2rem;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
}

.btn-nav {
  padding: 0.75rem 1.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  background: #fff;
  color: #4a5568;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn-nav:hover {
  background: #f7fafc;
  border-color: #a0aec0;
}

.btn-next {
  margin-left: auto;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    max-width: 100vw;
    padding: 1rem;
  }

  .content-header h1 {
    font-size: 1.5rem;
  }

  .section-meta {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .overview-features {
    grid-template-columns: 1fr;
  }

  .stages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
