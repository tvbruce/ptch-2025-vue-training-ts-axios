import type { CourseModule } from '@/types/course'

export const httpClientModule: CourseModule = {
  id: 'http-client-integration',
  title: 'HTTP 客戶端與型別安全',
  description:
    '深入學習 TypeScript 中的 HTTP 客戶端整合，比較原生 Fetch 與 Axios 的差異，掌握型別安全的 API 調用技巧。',
  estimatedDuration: 420,
  difficulty: 'intermediate',
  sections: [
    {
      id: 'native-fetch-vs-axios',
      title: '原生 Fetch vs Axios 比較',

      completed: false,
      content: [
        {
          type: 'text',
          title: '章節簡介',
          description: '本章節將深入比較原生 Fetch API 與 Axios 庫的差異',
          content: `
            在現代 Web 開發中，HTTP 客戶端的選擇對專案的開發效率和維護性有重大影響。
            本章節將從多個角度比較原生 Fetch API 和 Axios 庫，幫助你做出明智的技術選擇。
          `,
        },
        {
          type: 'comparison',
          title: 'Fetch API 的限制',
          description: '了解原生 Fetch API 在實際使用中的挑戰',
          content: '原生 Fetch API 雖然是瀏覽器內建功能，但在複雜應用中存在一些限制',
          limitations: [
            '需要手動檢查 response.ok',
            '錯誤處理較為複雜',
            '沒有內建的請求/響應攔截器',
            '沒有自動 JSON 轉換',
            '沒有請求超時設定',
            '沒有內建的重試機制',
            '瀏覽器相容性問題',
          ],
        },
      ],
      exercises: [
        {
          id: 'fetch-vs-axios-comparison',
          title: '實現相同功能比較',
          description: '分別使用 Fetch 和 Axios 實現相同的 API 調用功能，比較代碼複雜度',
          type: 'coding',
          difficulty: 'medium',
          starterCode: `// 請分別使用 Fetch 和 Axios 實現以下功能：
// 1. GET 請求獲取用戶列表
// 2. POST 請求創建新用戶
// 3. 統一的錯誤處理
// 4. 自動添加認證 header

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Fetch 實現
class FetchApiClient {
  // 在這裡實現
}

// Axios 實現
class AxiosApiClient {
  // 在這裡實現
}`,
          hints: [
            '注意 Fetch 需要手動檢查 response.ok',
            'Axios 可以使用攔截器簡化重複代碼',
            '考慮錯誤處理的一致性',
            '比較兩種方式的代碼行數和複雜度',
          ],
        },
      ],
    },
  ],
}
