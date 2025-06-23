<template>
    <aside class="navigation-sidebar" :class="{ 'navigation-sidebar--collapsed': navigationStore.isCollapsed }">
        <!-- 收合按鈕 -->
        <button class="sidebar-toggle" @click="navigationStore.toggleSidebar"
                :title="navigationStore.isCollapsed ? '展開側邊欄' : '收合側邊欄'">
            <span class="toggle-icon" :class="{ 'toggle-icon--collapsed': navigationStore.isCollapsed }">
                {{ navigationStore.isCollapsed ? '→' : '←' }}
            </span>
        </button>

        <div class="sidebar-header" v-show="!navigationStore.isCollapsed">
            <h3>Vue3 教育訓練</h3>
            <p class="subtitle">TypeScript & Axios 應用</p>
            <div class="progress-summary">
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: `${progressStore.completionPercentage}%` }"></div>
                </div>
                <span class="progress-text">
                    {{ progressStore.completionPercentage }}% 完成 ({{ progressStore.completedSections.length }}/{{
                        progressStore.totalSections }})
                </span>

            </div>
        </div>

        <nav class="sidebar-nav" v-show="!navigationStore.isCollapsed">
            <div v-for="(stageSections, stage) in navigationStore.stageGroups" :key="stage" class="stage-group">
                <div class="stage-header">
                    <h4 class="stage-title">{{ stage }}</h4>
                    <div class="stage-progress">
                        <div class="stage-progress-bar">
                            <div class="stage-progress-fill"
                                :style="{ width: `${navigationStore.stageProgress[stage]?.percentage || 0}%` }"></div>
                        </div>
                        <span class="stage-progress-text">
                            {{ navigationStore.stageProgress[stage]?.completed || 0 }}/{{
                                navigationStore.stageProgress[stage]?.total || 0 }}
                        </span>
                    </div>
                </div>

                <ul class="nav-list">
                    <li v-for="section in stageSections" :key="section.id" class="nav-item" :class="{
                        'nav-item--current': section.current,
                        'nav-item--completed': section.completed
                    }">
                        <router-link :to="section.path" class="nav-link"
                            @click="navigationStore.setCurrentSection(section.id)">
                            <div class="nav-icon">
                                <span v-if="section.completed" class="icon-check">✓</span>
                                <span v-else-if="section.current" class="icon-current">●</span>
                                <span v-else class="icon-pending">○</span>
                            </div>
                            <div class="nav-content">
                                <span class="nav-text">{{ section.title }}</span>
                                <span class="nav-description">{{ section.description }}</span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>



        <div class="sidebar-footer" v-show="!navigationStore.isCollapsed">
            <button class="btn-reset" @click="resetProgress" title="重置進度">
                重置進度
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation'
import { useProgressStore } from '@/stores/progress'

const navigationStore = useNavigationStore()
const progressStore = useProgressStore()



function resetProgress() {
    if (confirm('確定要重置學習進度嗎？此操作無法復原。')) {
        progressStore.resetProgress()
        navigationStore.sections.forEach(section => {
            section.completed = false
            section.current = false
        })
    }
}
</script>

<style scoped>
.navigation-sidebar {
    width: 320px;
    height: 100vh;
    background: #fff;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    overflow-y: auto;
    transition: width 0.3s ease;
}

.navigation-sidebar--collapsed {
    width: 0;
    border-right: none;
}

.sidebar-toggle {
    position: absolute;
    top: 20px;
    right: -12px;
    width: 24px;
    height: 24px;
    background: #3182ce;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    z-index: 101;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar-toggle:hover {
    background: #2c5aa0;
    transform: scale(1.1);
}

.toggle-icon {
    transition: transform 0.2s ease;
}

.toggle-icon--collapsed {
    transform: scaleX(-1);
}

.sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
}

.sidebar-header h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
}

.subtitle {
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
    color: #4a5568;
    font-style: italic;
}

.progress-summary {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4299e1, #3182ce);
    transition: width 0.3s ease;
}

.progress-text {
    font-size: 0.875rem;
    color: #4a5568;
    text-align: center;
    font-weight: 500;
}



.sidebar-nav {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 0;
}

.stage-group {
    margin-bottom: 1.5rem;
}

.stage-header {
    padding: 0.75rem 1.5rem;
    background: #edf2f7;
    border-bottom: 1px solid #e2e8f0;
}

.stage-title {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: #2d3748;
}

.stage-progress {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.stage-progress-bar {
    flex: 1;
    height: 4px;
    background: #cbd5e0;
    border-radius: 2px;
    overflow: hidden;
}

.stage-progress-fill {
    height: 100%;
    background: #48bb78;
    transition: width 0.3s ease;
}

.stage-progress-text {
    font-size: 0.75rem;
    color: #4a5568;
    font-weight: 500;
}

.nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-item {
    margin: 0;
}

.nav-link {
    display: flex;
    align-items: flex-start;
    padding: 0.75rem 1.5rem;
    color: #4a5568;
    text-decoration: none;
    transition: all 0.2s;
    border-left: 3px solid transparent;
}

.nav-link:hover {
    background: #f7fafc;
    color: #2d3748;
}

.nav-item--current .nav-link {
    background: #ebf8ff;
    color: #3182ce;
    border-left-color: #3182ce;
}

.nav-item--completed .nav-link {
    color: #38a169;
}

.nav-icon {
    width: 20px;
    height: 20px;
    margin-right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    flex-shrink: 0;
    margin-top: 2px;
}

.icon-check {
    color: #38a169;
    font-weight: bold;
}

.icon-current {
    color: #3182ce;
}

.icon-pending {
    color: #a0aec0;
}

.nav-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.nav-text {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.4;
}



.nav-description {
    font-size: 0.75rem;
    color: #a0aec0;
    line-height: 1.3;
    margin-top: 0.125rem;
}

.sidebar-footer {
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
    background: #f7fafc;
}



.btn-reset {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background: #fff;
    color: #4a5568;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
}

.btn-reset:hover {
    background: #f7fafc;
    border-color: #cbd5e0;
}



@media (max-width: 768px) {
    .navigation-sidebar {
        width: 100%;
        height: auto;
        position: relative;
    }

    .navigation-sidebar--collapsed {
        width: 0;
    }

    .sidebar-toggle {
        right: 20px;
        top: 20px;
    }
}
</style>
