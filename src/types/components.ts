export interface NavigationItem {
  id: string
  title: string
  path: string
  completed: boolean
  current: boolean
  stage: string
  description: string
}

export interface ProgressData {
  currentSection: string
  completedSections: string[]
  totalSections: number
  completionPercentage: number
}

export interface CodeEditorProps {
  modelValue: string
  language: string
  readonly?: boolean
  height?: string
  theme?: 'vs-dark' | 'vs-light'
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
  children?: TableOfContentsItem[]
}

export interface NotificationConfig {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  persistent?: boolean
}

export interface StageProgress {
  completed: number
  total: number
  percentage: number
}

export interface ComparisonData {
  title: string
  description: string
  beforeAfter: {
    before: {
      title: string
      code: string
      problems: string[]
    }
    after: {
      title: string
      code: string
      benefits: string[]
    }
  }
  dotnetAnalogy?: string
}
