<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Vue3 教育訓練</h1>
          <p class="hero-subtitle">
            TypeScript & Axios 應用的完整學習路徑
          </p>
          <p class="hero-description">
            掌握 Vue3 + TypeScript 的開發技巧，學習現代 Web 開發的最佳實踐，
            並深入了解如何結合 Axios 建構型別安全的 HTTP 客戶端應用。
          </p>
          <div class="hero-actions">
            <router-link to="/module/typescript-introduction" class="btn-primary">
              🚀 開始學習
            </router-link>
            <a href="#course-overview" class="btn-secondary">
              📖 課程概覽
            </a>
          </div>
        </div>

        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-number">8</div>
            <div class="stat-label">章節</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">10+</div>
            <div class="stat-label">小時</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">20+</div>
            <div class="stat-label">實例</div>
          </div>
        </div>
      </div>
    </div>

    <section id="course-overview" class="course-overview">
      <div class="container">
        <h2 class="section-title">訓練特色</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>Vue3 專精</h3>
            <p>專注於 Vue3 Composition API + TypeScript 的最佳實踐</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📈</div>
            <h3>由淺入深</h3>
            <p>從基礎概念開始，逐步深入到進階應用和實戰整合</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>實戰導向</h3>
            <p>每個章節都包含實際 Vue3 專案範例和互動練習</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🛠️</div>
            <h3>工具整合</h3>
            <p>深入介紹 Vue3 + TypeScript + Axios 的開發環境設定</p>
          </div>
        </div>
      </div>
    </section>

    <section class="curriculum">
      <div class="container">
        <h2 class="section-title">訓練大綱</h2>
        <div class="curriculum-grid">
          <div v-for="(section, index) in navigationStore.sections" :key="section.id" class="curriculum-card"
            :class="{ completed: section.completed }">
            <div class="card-header">
              <div class="chapter-number">{{ index + 1 }}</div>
              <div class="completion-status">
                <span v-if="section.completed" class="completed-icon">✓</span>
                <span v-else class="pending-icon">○</span>
              </div>
            </div>

            <div class="card-content">
              <h3 class="card-title">{{ section.title }}</h3>
              <p class="card-description">{{ getSectionDescription(section.id) }}</p>
              <div class="card-meta">
                <span class="difficulty">{{ getSectionDifficulty(section.id) }}</span>
              </div>
            </div>

            <div class="card-actions">
              <router-link :to="section.path" class="btn-start" :class="{ 'btn-continue': section.completed }">
                {{ section.completed ? '複習' : '開始' }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation'

const navigationStore = useNavigationStore()

function getSectionDescription(sectionId: string): string {
  const descriptions: Record<string, string> = {
    'typescript-introduction': '了解 TypeScript 的核心概念，優缺點分析，以及基本型別系統',
    'typescript-vs-javascript': '深入比較 JavaScript 與 TypeScript 的語法差異和使用場景',
    'dotnet-to-typescript': '針對有其他語言背景的開發人員，快速適應 TypeScript 開發',
    'vscode-setup': 'VS Code 開發環境設定，必備擴充插件推薦與配置',
    'typescript-advanced': '掌握進階型別系統、泛型、裝飾器等高級特性',
    'axios-basics': '學習 Axios HTTP 客戶端的基本使用方法和配置',
    'axios-typescript': '結合 TypeScript 與 Axios 建構型別安全的 API 客戶端',
    'practical-integration': '完整的實戰專案整合，部署與最佳實踐'
  };
  return descriptions[sectionId] || '課程內容正在準備中';
}

function getSectionDifficulty(sectionId: string): string {
  const difficulties: Record<string, string> = {
    'typescript-introduction': '初級',
    'typescript-vs-javascript': '初級',
    'dotnet-to-typescript': '中級',
    'vscode-setup': '初級',
    'typescript-advanced': '進階',
    'axios-basics': '中級',
    'axios-typescript': '進階',
    'practical-integration': '進階'
  };
  return difficulties[sectionId] || '中級';
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-section {
  padding: 4rem 0;
  color: white;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.hero-description {
  font-size: 1.125rem;
  margin-bottom: 3rem;
  opacity: 0.8;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary {
  background: #ffffff;
  color: #667eea;
}

.btn-primary:hover {
  background: #f7fafc;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
}

.stat-card {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
}

.course-overview,
.curriculum {
  background: white;
  padding: 4rem 0;
}

.course-overview h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 3rem;
}

.sections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.section-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.section-number {
  position: absolute;
  top: -12px;
  left: 2rem;
  width: 24px;
  height: 24px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}

.section-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.section-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time-estimate {
  color: #718096;
  font-size: 0.875rem;
  font-weight: 500;
}

.section-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.section-link:hover {
  color: #5a67d8;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.curriculum-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.curriculum-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.curriculum-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.curriculum-card.completed {
  border-color: #48bb78;
  background: #f0fff4;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chapter-number {
  background: #667eea;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.completed-icon {
  color: #48bb78;
  font-weight: bold;
}

.pending-icon {
  color: #a0aec0;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.card-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 1rem;
}

.btn-start,
.btn-continue {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
  transition: background 0.3s;
}

.btn-start:hover {
  background: #5a6fd8;
}

.btn-continue {
  background: #48bb78;
}

.btn-continue:hover {
  background: #38a169;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-stats {
    gap: 2rem;
  }

  .sections-grid {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 0 1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
