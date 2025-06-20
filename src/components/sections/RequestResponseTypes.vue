<template>
    <div class="request-response-types">
        <div class="section-intro">
            <h2>請求與響應型別</h2>
            <p class="intro-text">
                在 TypeScript 中定義清晰的請求與響應型別是實現型別安全 API 調用的關鍵。
                本章節將介紹如何設計和使用這些型別，以提高代碼的可維護性和安全性。
            </p>
        </div>

        <div class="types-overview">
            <h3>型別系統架構</h3>
            <div class="architecture-diagram">
                <div class="type-layer">
                    <h4>基礎響應型別</h4>
                    <CodeBlock title="ApiResponse 基礎型別" :code="baseTypesCode" language="typescript"
                        explanation="定義統一的 API 響應格式，確保所有請求都有一致的結構" />
                </div>
            </div>
        </div>

        <div class="request-types">
            <h3>請求型別定義</h3>
            <div class="types-grid">
                <div class="type-example">
                    <h4>GET 請求型別</h4>
                    <CodeBlock title="查詢參數型別" :code="getRequestTypes" language="typescript"
                        explanation="定義 GET 請求的查詢參數型別" />
                </div>

                <div class="type-example">
                    <h4>POST 請求型別</h4>
                    <CodeBlock title="請求體型別" :code="postRequestTypes" language="typescript"
                        explanation="定義 POST/PUT 請求的請求體型別" />
                </div>
            </div>
        </div>

        <div class="response-types">
            <h3>響應型別設計</h3>
            <CodeBlock title="泛型響應型別" :code="responseTypesCode" language="typescript" explanation="使用泛型設計靈活的響應型別系統" />
        </div>

        <div class="practical-example">
            <h3>實戰範例</h3>
            <div class="example-tabs">
                <button v-for="example in examples" :key="example.id" class="tab-button"
                    :class="{ active: activeExample === example.id }" @click="activeExample = example.id">
                    {{ example.title }}
                </button>
            </div>

            <div class="example-content">
                <div v-for="example in examples" :key="example.id" v-show="activeExample === example.id">
                    <CodeBlock :title="example.title" :code="example.code" language="typescript"
                        :explanation="example.explanation" :runnable="true" @run="runExample" />
                </div>
            </div>
        </div>

        <div class="best-practices">
            <h3>最佳實踐</h3>
            <div class="practice-grid">
                <div class="practice-card">
                    <h4>命名規範</h4>
                    <ul>
                        <li>請求型別使用 Request 後綴</li>
                        <li>響應型別使用 Response 後綴</li>
                        <li>使用描述性的介面名稱</li>
                        <li>保持型別定義的一致性</li>
                    </ul>
                </div>

                <div class="practice-card">
                    <h4>型別組織</h4>
                    <ul>
                        <li>按功能模組組織型別</li>
                        <li>共用型別放在 types 目錄</li>
                        <li>使用 index.ts 導出型別</li>
                        <li>避免循環依賴</li>
                    </ul>
                </div>

                <div class="practice-card">
                    <h4>錯誤處理型別</h4>
                    <ul>
                        <li>定義統一的錯誤響應格式</li>
                        <li>使用聯合型別處理多種錯誤</li>
                        <li>包含錯誤碼和錯誤訊息</li>
                        <li>支援國際化錯誤訊息</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="navigation-footer">
            <button class="btn-complete" @click="completeSection">
                完成本章節
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const emit = defineEmits<{
    complete: []
}>()

const activeExample = ref('user-api')

const baseTypesCode = `// 基礎 API 響應型別
interface ApiResponse<T = any> {
  data: T
  message: string
  success: boolean
  code?: number
}

// 分頁響應型別
interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// 錯誤響應型別
interface ErrorResponse {
  error: {
    code: string
    message: string
    details?: Record<string, any>
  }
  success: false
}`

const getRequestTypes = `// GET 請求查詢參數型別
interface UserListParams {
  page?: number
  limit?: number
  search?: string
  status?: 'active' | 'inactive'
  sortBy?: 'name' | 'createdAt' | 'email'
  order?: 'asc' | 'desc'
}

interface UserDetailParams {
  id: number
  include?: Array<'profile' | 'orders' | 'addresses'>
}`

const postRequestTypes = `// POST/PUT 請求體型別
interface CreateUserRequest {
  name: string
  email: string
  password: string
  profile?: {
    avatar?: string
    bio?: string
    phone?: string
  }
}

interface UpdateUserRequest {
  name?: string
  email?: string
  profile?: {
    avatar?: string
    bio?: string
    phone?: string
  }
}`

const responseTypesCode = `// 完整的響應型別系統
interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
  profile?: UserProfile
}

interface UserProfile {
  avatar?: string
  bio?: string
  phone?: string
}

// 特定 API 響應型別
type UserListResponse = PaginatedResponse<User>
type UserDetailResponse = ApiResponse<User>
type CreateUserResponse = ApiResponse<User>
type UpdateUserResponse = ApiResponse<User>

// API 操作的聯合型別
type UserApiResponse =
  | UserListResponse
  | UserDetailResponse
  | CreateUserResponse
  | UpdateUserResponse`

const examples = [
    {
        id: 'user-api',
        title: '用戶 API 型別',
        code: `// 完整的用戶 API 型別定義示例
import axios, { AxiosResponse } from 'axios'

// API 客戶端類別
class UserApiClient {
  private baseURL = '/api/users'

  // 獲取用戶列表
  async getUsers(params: UserListParams): Promise<User[]> {
    const response: AxiosResponse<UserListResponse> = await axios.get(
      this.baseURL,
      { params }
    )
    return response.data.data
  }

  // 獲取用戶詳情
  async getUser(id: number, params?: UserDetailParams): Promise<User> {
    const response: AxiosResponse<UserDetailResponse> = await axios.get(
      \`\${this.baseURL}/\${id}\`,
      { params }
    )
    return response.data.data
  }

  // 創建用戶
  async createUser(data: CreateUserRequest): Promise<User> {
    const response: AxiosResponse<CreateUserResponse> = await axios.post(
      this.baseURL,
      data
    )
    return response.data.data
  }

  // 更新用戶
  async updateUser(id: number, data: UpdateUserRequest): Promise<User> {
    const response: AxiosResponse<UpdateUserResponse> = await axios.put(
      \`\${this.baseURL}/\${id}\`,
      data
    )
    return response.data.data
  }
}`,
        explanation: '這個範例展示了如何在實際 API 客戶端中使用型別定義'
    },
    {
        id: 'error-handling',
        title: '錯誤處理型別',
        code: `// 錯誤處理型別定義
interface ApiError {
  code: string
  message: string
  field?: string
  details?: Record<string, any>
}

interface ValidationError extends ApiError {
  code: 'VALIDATION_ERROR'
  field: string
  value: any
}

interface AuthError extends ApiError {
  code: 'AUTH_ERROR' | 'TOKEN_EXPIRED' | 'UNAUTHORIZED'
}

// 型別安全的錯誤處理
async function handleApiCall<T>(
  apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>
): Promise<T> {
  try {
    const response = await apiCall()

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    return response.data.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data as ErrorResponse
      throw new Error(errorData.error.message)
    }
    throw error
  }
}`,
        explanation: '展示如何定義和處理不同類型的 API 錯誤'
    }
]

function runExample(code: string) {
    console.log('Running example:', code)
}

function completeSection() {
    emit('complete')
}
</script>

<style scoped>
.request-response-types {
    max-width: 100%;
    margin: 0 auto;
    padding: 0;
}

.section-intro {
    margin-bottom: 2rem;
}

.section-intro h2 {
    font-size: 1.75rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.intro-text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a5568;
}

.types-overview {
    margin-bottom: 3rem;
}

.types-overview h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.architecture-diagram {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
}

.type-layer h4 {
    color: #2d3748;
    margin-bottom: 1rem;
}

.request-types,
.response-types {
    margin-bottom: 3rem;
}

.request-types h3,
.response-types h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
}

.type-example h4 {
    color: #2d3748;
    margin-bottom: 1rem;
}

.practical-example {
    margin-bottom: 3rem;
}

.practical-example h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.example-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tab-button {
    padding: 0.5rem 1rem;
    border: 1px solid #cbd5e0;
    border-radius: 4px 4px 0 0;
    background: #f7fafc;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.2s;
}

.tab-button.active {
    background: white;
    color: #2d3748;
    border-bottom-color: white;
}

.example-content {
    border: 1px solid #cbd5e0;
    border-radius: 0 8px 8px 8px;
    background: white;
    padding: 1.5rem;
}

.best-practices {
    margin-bottom: 3rem;
}

.best-practices h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.practice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.practice-card {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.practice-card h4 {
    margin-bottom: 1rem;
    color: #2d3748;
}

.practice-card ul {
    margin: 0;
    padding-left: 1.5rem;
}

.practice-card li {
    margin-bottom: 0.5rem;
    color: #4a5568;
}

.navigation-footer {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;
}

.btn-complete {
    padding: 0.75rem 2rem;
    background: #48bb78;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-complete:hover {
    background: #38a169;
    transform: translateY(-1px);
}

@media (max-width: 768px) {
    .types-grid {
        grid-template-columns: 1fr;
    }

    .practice-grid {
        grid-template-columns: 1fr;
    }
}
</style>
