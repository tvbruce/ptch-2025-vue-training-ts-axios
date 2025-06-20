import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ProgressData } from '@/types/components'

export const useProgressStore = defineStore('progress', () => {
  const currentSection = ref<string>('')
  const completedSections = ref<string[]>([])

  const totalSections = computed(() => 8)

  const completionPercentage = computed(() => {
    return Math.round((completedSections.value.length / totalSections.value) * 100)
  })

  const progressData = computed<ProgressData>(() => ({
    currentSection: currentSection.value,
    completedSections: completedSections.value,
    totalSections: totalSections.value,
    completionPercentage: completionPercentage.value,
  }))

  function setCurrentSection(sectionId: string) {
    currentSection.value = sectionId
  }

  function markSectionCompleted(sectionId: string) {
    if (!completedSections.value.includes(sectionId)) {
      completedSections.value.push(sectionId)
    }
  }

  function resetProgress() {
    currentSection.value = ''
    completedSections.value = []
  }

  function isSectionCompleted(sectionId: string): boolean {
    return completedSections.value.includes(sectionId)
  }

  function getStageCompletionPercentage(stageSectionIds: string[]): number {
    const completed = stageSectionIds.filter((id) => completedSections.value.includes(id)).length
    return Math.round((completed / stageSectionIds.length) * 100)
  }

  return {
    currentSection,
    completedSections,
    totalSections,
    completionPercentage,
    progressData,
    setCurrentSection,
    markSectionCompleted,
    resetProgress,
    isSectionCompleted,
    getStageCompletionPercentage,
  }
})
