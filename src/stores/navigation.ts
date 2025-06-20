import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { NavigationItem } from '@/types/components'
import { useProgressStore } from './progress'

export const useNavigationStore = defineStore('navigation', () => {
  const progressStore = useProgressStore()

  // 新的8個章節，分為4個階段
  const sections = ref<NavigationItem[]>([
    // 第一階段：基礎入門
    {
      id: 'typescript-introduction',
      title: 'TypeScript 基礎介紹',
      path: '/module/typescript-introduction',
      completed: false,
      current: false,
      stage: '第一階段：基礎入門',
      description: 'TypeScript 核心概念與優缺點分析，實用性展示',
    },
    {
      id: 'typescript-vs-javascript',
      title: 'TypeScript vs JavaScript',
      path: '/module/typescript-vs-javascript',
      completed: false,
      current: false,
      stage: '第一階段：基礎入門',
      description: '語法差異深度對比，開發效率提升實證',
    },

    // 第二階段：轉換適應
    {
      id: 'dotnet-to-typescript',
      title: '語言對比與轉換',
      path: '/module/dotnet-to-typescript',
      completed: false,
      current: false,
      stage: '第二階段：開發環境',
      description: '從其他語言轉換到 TypeScript 的經驗分享',
    },
    {
      id: 'vscode-setup',
      title: 'VS Code 開發環境設定',
      path: '/module/vscode-setup',
      completed: false,
      current: false,
      stage: '第二階段：開發環境',
      description: '必備擴充插件推薦，生產力工具整合',
    },

    // 第三階段：進階應用
    {
      id: 'advanced-typescript',
      title: 'TypeScript 進階概念',
      path: '/module/advanced-typescript',
      completed: false,
      current: false,
      stage: '第三階段：進階應用',
      description: '進階型別系統，泛型與條件型別，裝飾器使用',
    },
    {
      id: 'api-design-and-types',
      title: 'API 規格設計與型別定義',
      path: '/module/api-design-and-types',
      completed: false,
      current: false,
      stage: '第三階段：進階應用',
      description: 'OpenAPI/Swagger 規格設計，從 API 規格到 TypeScript 型別定義的完整流程',
    },
    {
      id: 'axios-basics',
      title: 'Axios 基礎使用',
      path: '/module/axios-basics',
      completed: false,
      current: false,
      stage: '第三階段：進階應用',
      description: 'HTTP 客戶端基礎，與其他解決方案的對比',
    },

    // 第四階段：實戰整合
    {
      id: 'axios-typescript-best-practices',
      title: 'Axios + TypeScript 最佳實踐',
      path: '/module/axios-typescript-best-practices',
      completed: false,
      current: false,
      stage: '第四階段：實戰整合',
      description: '型別安全的 API 客戶端，泛型 HTTP 服務',
    },
    {
      id: 'mock-strategies-demo',
      title: '多種 Mock 方案演示',
      path: '/module/mock-strategies-demo',
      completed: false,
      current: false,
      stage: '第四階段：實戰整合',
      description: 'JSON Server、MSW、Axios Mock Adapter 實戰對比',
    },
    {
      id: 'project-integration',
      title: '實戰項目整合',
      path: '/module/project-integration',
      completed: false,
      current: false,
      stage: '第四階段：實戰整合',
      description: '完整專案架構，部署與最佳實踐',
    },
  ])

  // 計算各階段的章節
  const stageGroups = computed(() => {
    const groups: Record<string, NavigationItem[]> = {}
    sections.value.forEach((section) => {
      if (!groups[section.stage]) {
        groups[section.stage] = []
      }
      groups[section.stage].push(section)
    })
    return groups
  })

  const currentSectionIndex = computed(() => {
    return sections.value.findIndex((section) => section.current)
  })

  const hasNextSection = computed(() => {
    return currentSectionIndex.value < sections.value.length - 1
  })

  const hasPreviousSection = computed(() => {
    return currentSectionIndex.value > 0
  })

  // 計算階段完成度
  const stageProgress = computed(() => {
    const progress: Record<string, { completed: number; total: number; percentage: number }> = {}

    Object.entries(stageGroups.value).forEach(([stage, stageSections]) => {
      const completed = stageSections.filter((s) => s.completed).length
      const total = stageSections.length
      progress[stage] = {
        completed,
        total,
        percentage: Math.round((completed / total) * 100),
      }
    })

    return progress
  })

  function setCurrentSection(sectionId: string) {
    sections.value.forEach((section) => {
      section.current = section.id === sectionId
    })
    progressStore.setCurrentSection(sectionId)
  }

  function markSectionCompleted(sectionId: string) {
    const section = sections.value.find((s) => s.id === sectionId)
    if (section) {
      section.completed = true
      progressStore.markSectionCompleted(sectionId)
    }
  }

  function getNextSection(): NavigationItem | null {
    if (hasNextSection.value) {
      return sections.value[currentSectionIndex.value + 1]
    }
    return null
  }

  function getPreviousSection(): NavigationItem | null {
    if (hasPreviousSection.value) {
      return sections.value[currentSectionIndex.value - 1]
    }
    return null
  }

  function getSectionsByStage(stage: string): NavigationItem[] {
    return sections.value.filter((section) => section.stage === stage)
  }

  function getCurrentStage(): string | null {
    const current = sections.value.find((s) => s.current)
    return current?.stage || null
  }

  return {
    sections,
    stageGroups,
    currentSectionIndex,
    hasNextSection,
    hasPreviousSection,
    stageProgress,
    setCurrentSection,
    markSectionCompleted,
    getNextSection,
    getPreviousSection,
    getSectionsByStage,
    getCurrentStage,
  }
})
