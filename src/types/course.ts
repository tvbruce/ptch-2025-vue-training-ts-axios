export interface CourseModule {
  id: string
  title: string
  description: string
  sections: CourseSection[]
  estimatedDuration: number // 分鐘
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface CourseSection {
  id: string
  title: string
  content: SectionContent[]
  exercises: Exercise[]

  completed: boolean
}

export interface SectionContent {
  type: 'text' | 'code' | 'comparison' | 'interactive'
  title: string
  description: string
  content: string
  codeExample?: CodeExample
  highlights?: string[]
  limitations?: string[]
}

export interface CodeExample {
  title: string
  language: 'typescript' | 'javascript' | 'json'
  code: string
  explanation?: string
  runnable?: boolean
  expectedOutput?: string
}

export interface Exercise {
  id: string
  title: string
  description: string
  type: 'coding' | 'quiz' | 'comparison'
  difficulty: 'easy' | 'medium' | 'hard'
  starterCode?: string
  solution?: string
  hints?: string[]
  testCases?: TestCase[]
}

export interface TestCase {
  input: unknown
  expectedOutput: unknown
  description: string
}

export interface ComparisonItem {
  feature: string
  fetch: string
  axios: string
  winner: 'fetch' | 'axios' | 'tie'
}
