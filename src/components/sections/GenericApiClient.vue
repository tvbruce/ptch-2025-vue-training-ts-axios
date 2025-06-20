<template>
    <div class="generic-api-client">
        <div class="section-intro">
            <h2>泛型 API 客戶端</h2>
            <p class="intro-text">
                泛型 API 客戶端是實現型別安全和程式碼重用的關鍵技術。本章節將展示如何設計和實現
                一個強大的泛型 API 客戶端，支援各種 HTTP 操作並保持完整的型別安全。
            </p>
        </div>

        <div class="generic-benefits">
            <h3>泛型的優勢</h3>
            <div class="benefits-grid">
                <div class="benefit-card">
                    <h4>🔒 型別安全</h4>
                    <p>在編譯時期就能發現型別錯誤，減少執行時期的問題</p>
                </div>
                <div class="benefit-card">
                    <h4>♻️ 程式碼重用</h4>
                    <p>一套代碼可以處理多種資料型別，減少重複開發</p>
                </div>
                <div class="benefit-card">
                    <h4>📖 更好的 IDE 支援</h4>
                    <p>提供完整的自動完成和型別提示功能</p>
                </div>
                <div class="benefit-card">
                    <h4>🧹 更乾淨的 API</h4>
                    <p>統一的介面設計，讓 API 使用更加直觀</p>
                </div>
            </div>
        </div>

        <div class="basic-generic-client">
            <h3>基礎泛型客戶端</h3>
            <CodeBlock title="基礎泛型 API 客戶端" :code="basicGenericCode" language="typescript"
                explanation="建立基礎的泛型 API 客戶端結構" />
        </div>

        <div class="advanced-generic-client">
            <h3>進階泛型客戶端</h3>
            <CodeBlock title="完整的泛型 API 客戶端" :code="advancedGenericCode" language="typescript"
                explanation="實現完整功能的泛型 API 客戶端，支援各種操作" />
        </div>

        <div class="typed-endpoints">
            <h3>型別化端點</h3>
            <div class="endpoint-examples">
                <div class="endpoint-tabs">
                    <button v-for="endpoint in endpoints" :key="endpoint.id" class="tab-button"
                        :class="{ active: activeEndpoint === endpoint.id }" @click="activeEndpoint = endpoint.id">
                        {{ endpoint.title }}
                    </button>
                </div>

                <div class="endpoint-content">
                    <div v-for="endpoint in endpoints" :key="endpoint.id" v-show="activeEndpoint === endpoint.id">
                        <CodeBlock :title="endpoint.title" :code="endpoint.code" language="typescript"
                            :explanation="endpoint.explanation" :runnable="true" @run="runExample" />
                    </div>
                </div>
            </div>
        </div>

        <div class="resource-client">
            <h3>資源客戶端模式</h3>
            <CodeBlock title="RESTful 資源客戶端" :code="resourceClientCode" language="typescript"
                explanation="實現 RESTful 風格的資源客戶端模式" />
        </div>

        <div class="middleware-system">
            <h3>中介軟體系統</h3>
            <div class="middleware-examples">
                <div class="middleware-tabs">
                    <button v-for="middleware in middlewares" :key="middleware.id" class="tab-button"
                        :class="{ active: activeMiddleware === middleware.id }"
                        @click="activeMiddleware = middleware.id">
                        {{ middleware.title }}
                    </button>
                </div>

                <div class="middleware-content">
                    <div v-for="middleware in middlewares" :key="middleware.id"
                        v-show="activeMiddleware === middleware.id">
                        <CodeBlock :title="middleware.title" :code="middleware.code" language="typescript"
                            :explanation="middleware.explanation" />
                    </div>
                </div>
            </div>
        </div>

        <div class="practical-usage">
            <h3>實際使用範例</h3>
            <CodeBlock title="完整使用範例" :code="usageExampleCode" language="typescript"
                explanation="展示如何在實際專案中使用泛型 API 客戶端" :runnable="true" @run="runExample" />
        </div>

        <div class="best-practices">
            <h3>最佳實踐</h3>
            <div class="practice-sections">
                <div class="practice-section">
                    <h4>🏗️ 設計原則</h4>
                    <ul>
                        <li>保持 API 的一致性和可預測性</li>
                        <li>使用清晰的命名慣例</li>
                        <li>提供適當的預設值</li>
                        <li>支援鏈式調用提高可讀性</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h4>⚡ 效能考慮</h4>
                    <ul>
                        <li>適當使用快取減少網路請求</li>
                        <li>實現請求去重避免重複調用</li>
                        <li>支援批量操作提高效率</li>
                        <li>使用連線池管理 HTTP 連線</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h4>🔧 擴展性</h4>
                    <ul>
                        <li>提供插件機制支援自定義功能</li>
                        <li>使用策略模式處理不同場景</li>
                        <li>支援多種序列化格式</li>
                        <li>允許自定義錯誤處理邏輯</li>
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

const activeEndpoint = ref('user-endpoint')
const activeMiddleware = ref('cache-middleware')

const basicGenericCode = `// 基礎泛型 API 客戶端
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

// 基礎響應介面
interface ApiResponse<T = any> {
  data: T
  message: string
  success: boolean
}

// 基礎泛型客戶端
class GenericApiClient {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    })
  }

  // 泛型 GET 方法
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.get(url, config)
    return response.data.data
  }

  // 泛型 POST 方法
  async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.post(url, data, config)
    return response.data.data
  }

  // 泛型 PUT 方法
  async put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.put(url, data, config)
    return response.data.data
  }

  // 泛型 DELETE 方法
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.delete(url, config)
    return response.data.data
  }
}`

const advancedGenericCode = `// 進階泛型 API 客戶端
interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean
  skipCache?: boolean
  retryCount?: number
}

interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  order?: 'asc' | 'desc'
}

interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

class AdvancedApiClient {
  private axiosInstance: AxiosInstance
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private cacheTimeout = 5 * 60 * 1000 // 5 分鐘

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    })

    this.setupInterceptors()
  }

  // 帶快取的 GET 方法
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const cacheKey = this.getCacheKey('GET', url, config?.params)

    // 檢查快取
    if (!config?.skipCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data
      }
    }

    const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.get(url, config)
    const result = response.data.data

    // 儲存到快取
    if (!config?.skipCache) {
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      })
    }

    return result
  }

  // 帶分頁的 GET 方法
  async getPaginated<T>(
    url: string,
    params?: PaginationParams,
    config?: RequestConfig
  ): Promise<PaginatedResponse<T>> {
    const response: AxiosResponse<PaginatedResponse<T>> = await this.axiosInstance.get(url, {
      ...config,
      params: {
        ...params,
        ...config?.params
      }
    })
    return response.data
  }

  // 批量 POST 方法
  async postBatch<T, D = any>(
    url: string,
    dataArray: D[],
    config?: RequestConfig
  ): Promise<T[]> {
    const requests = dataArray.map(data =>
      this.axiosInstance.post<ApiResponse<T>>(url, data, config)
    )

    const responses = await Promise.all(requests)
    return responses.map(response => response.data.data)
  }

  // 條件式請求
  async getIf<T>(
    url: string,
    condition: () => boolean | Promise<boolean>,
    config?: RequestConfig
  ): Promise<T | null> {
    const shouldFetch = await condition()
    if (!shouldFetch) {
      return null
    }

    return this.get<T>(url, config)
  }

  // 清除快取
  clearCache(pattern?: string): void {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key)
        }
      }
    } else {
      this.cache.clear()
    }
  }

  private getCacheKey(method: string, url: string, params?: any): string {
    const paramsString = params ? JSON.stringify(params) : ''
    return \`\${method}:\${url}:\${paramsString}\`
  }

  private setupInterceptors(): void {
    // 請求攔截器
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // 添加請求 ID 用於追蹤
        config.headers['X-Request-ID'] = this.generateRequestId()
        return config
      }
    )

    // 響應攔截器
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // 統一錯誤處理
        return Promise.reject(this.transformError(error))
      }
    )
  }

  private generateRequestId(): string {
    return \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`
  }

  private transformError(error: any): any {
    // 錯誤轉換邏輯
    return error
  }
}`

const endpoints = [
    {
        id: 'user-endpoint',
        title: '用戶端點',
        code: `// 用戶相關端點的型別定義
interface User {
  id: number
  name: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

interface UpdateUserRequest {
  name?: string
  email?: string
  avatar?: string
}

interface UserListParams extends PaginationParams {
  search?: string
  status?: 'active' | 'inactive'
}

// 型別化的用戶端點類別
class UserEndpoint {
  constructor(private client: AdvancedApiClient) {}

  // 獲取用戶列表
  async list(params?: UserListParams): Promise<PaginatedResponse<User>> {
    return this.client.getPaginated<User>('/users', params)
  }

  // 獲取單個用戶
  async get(id: number): Promise<User> {
    return this.client.get<User>(\`/users/\${id}\`)
  }

  // 創建用戶
  async create(data: CreateUserRequest): Promise<User> {
    return this.client.post<User, CreateUserRequest>('/users', data)
  }

  // 更新用戶
  async update(id: number, data: UpdateUserRequest): Promise<User> {
    return this.client.put<User, UpdateUserRequest>(\`/users/\${id}\`, data)
  }

  // 刪除用戶
  async delete(id: number): Promise<void> {
    return this.client.delete<void>(\`/users/\${id}\`)
  }

  // 搜尋用戶
  async search(query: string): Promise<User[]> {
    return this.client.get<User[]>('/users/search', {
      params: { q: query }
    })
  }
}`,
        explanation: '展示如何為特定資源創建型別安全的端點類別'
    },
    {
        id: 'product-endpoint',
        title: '產品端點',
        code: `// 產品相關端點
interface Product {
  id: number
  name: string
  description: string
  price: number
  categoryId: number
  images: string[]
  stock: number
  isActive: boolean
}

interface ProductFilter {
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featured?: boolean
}

class ProductEndpoint {
  constructor(private client: AdvancedApiClient) {}

  async list(filter?: ProductFilter, pagination?: PaginationParams): Promise<PaginatedResponse<Product>> {
    return this.client.getPaginated<Product>('/products', {
      ...filter,
      ...pagination
    })
  }

  async getFeatured(): Promise<Product[]> {
    return this.client.get<Product[]>('/products/featured')
  }

  async getByCategory(categoryId: number): Promise<Product[]> {
    return this.client.get<Product[]>(\`/products/category/\${categoryId}\`)
  }

  async getRelated(productId: number): Promise<Product[]> {
    return this.client.get<Product[]>(\`/products/\${productId}/related\`)
  }
}`,
        explanation: '產品端點展示了如何處理複雜的查詢參數和過濾條件'
    }
]

const resourceClientCode = `// RESTful 資源客戶端模式
interface ResourceOperations<T, CreateT = Partial<T>, UpdateT = Partial<T>> {
  list(params?: any): Promise<PaginatedResponse<T>>
  get(id: number | string): Promise<T>
  create(data: CreateT): Promise<T>
  update(id: number | string, data: UpdateT): Promise<T>
  delete(id: number | string): Promise<void>
}

abstract class BaseResourceClient<T, CreateT = Partial<T>, UpdateT = Partial<T>>
  implements ResourceOperations<T, CreateT, UpdateT> {

  constructor(
    protected client: AdvancedApiClient,
    protected resourcePath: string
  ) {}

  async list(params?: any): Promise<PaginatedResponse<T>> {
    return this.client.getPaginated<T>(this.resourcePath, params)
  }

  async get(id: number | string): Promise<T> {
    return this.client.get<T>(\`\${this.resourcePath}/\${id}\`)
  }

  async create(data: CreateT): Promise<T> {
    return this.client.post<T, CreateT>(this.resourcePath, data)
  }

  async update(id: number | string, data: UpdateT): Promise<T> {
    return this.client.put<T, UpdateT>(\`\${this.resourcePath}/\${id}\`, data)
  }

  async delete(id: number | string): Promise<void> {
    return this.client.delete<void>(\`\${this.resourcePath}/\${id}\`)
  }

  // 批量操作
  async createMany(dataArray: CreateT[]): Promise<T[]> {
    return this.client.postBatch<T, CreateT>(this.resourcePath, dataArray)
  }

  async deleteMany(ids: (number | string)[]): Promise<void> {
    const requests = ids.map(id => this.delete(id))
    await Promise.all(requests)
  }
}

// 具體的資源客戶端實現
class UserResourceClient extends BaseResourceClient<User, CreateUserRequest, UpdateUserRequest> {
  constructor(client: AdvancedApiClient) {
    super(client, '/users')
  }

  // 擴展特定的用戶操作
  async activate(id: number): Promise<User> {
    return this.client.post<User>(\`\${this.resourcePath}/\${id}/activate\`)
  }

  async deactivate(id: number): Promise<User> {
    return this.client.post<User>(\`\${this.resourcePath}/\${id}/deactivate\`)
  }

  async changePassword(id: number, newPassword: string): Promise<void> {
    return this.client.post<void>(\`\${this.resourcePath}/\${id}/change-password\`, {
      password: newPassword
    })
  }
}`

const middlewares = [
    {
        id: 'cache-middleware',
        title: '快取中介軟體',
        code: `// 快取中介軟體
interface CacheConfig {
  ttl: number // 存活時間（毫秒）
  maxSize: number // 最大快取項目數
  keyGenerator?: (url: string, params?: any) => string
}

class CacheMiddleware {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map()
  private config: CacheConfig

  constructor(config: CacheConfig) {
    this.config = config
  }

  // 取得快取資料
  get<T>(key: string): T | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  // 設定快取資料
  set<T>(key: string, data: T, ttl?: number): void {
    // 檢查快取大小限制
    if (this.cache.size >= this.config.maxSize) {
      this.evictOldest()
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.ttl
    })
  }

  // 清除快取
  clear(pattern?: string): void {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key)
        }
      }
    } else {
      this.cache.clear()
    }
  }

  // 移除最舊的快取項目
  private evictOldest(): void {
    let oldestKey = ''
    let oldestTimestamp = Date.now()

    for (const [key, value] of this.cache.entries()) {
      if (value.timestamp < oldestTimestamp) {
        oldestTimestamp = value.timestamp
        oldestKey = key
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey)
    }
  }

  // 產生快取鍵
  generateKey(url: string, params?: any): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(url, params)
    }

    const paramsString = params ? JSON.stringify(params) : ''
    return \`\${url}:\${paramsString}\`
  }
}`,
        explanation: '實現智能快取中介軟體，支援 TTL 和 LRU 驅逐策略'
    },
    {
        id: 'auth-middleware',
        title: '認證中介軟體',
        code: `// 認證中介軟體
interface AuthConfig {
  tokenKey: string
  refreshTokenKey: string
  headerName: string
  tokenPrefix: string
  refreshEndpoint: string
}

class AuthMiddleware {
  private config: AuthConfig
  private isRefreshing = false
  private refreshPromise: Promise<string> | null = null

  constructor(config: AuthConfig) {
    this.config = config
  }

  // 取得存取 token
  getAccessToken(): string | null {
    return localStorage.getItem(this.config.tokenKey)
  }

  // 取得刷新 token
  getRefreshToken(): string | null {
    return localStorage.getItem(this.config.refreshTokenKey)
  }

  // 設定 token
  setTokens(accessToken: string, refreshToken?: string): void {
    localStorage.setItem(this.config.tokenKey, accessToken)
    if (refreshToken) {
      localStorage.setItem(this.config.refreshTokenKey, refreshToken)
    }
  }

  // 清除 token
  clearTokens(): void {
    localStorage.removeItem(this.config.tokenKey)
    localStorage.removeItem(this.config.refreshTokenKey)
  }

  // 刷新 token
  async refreshAccessToken(): Promise<string> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise
    }

    this.isRefreshing = true
    this.refreshPromise = this.performTokenRefresh()

    try {
      const newToken = await this.refreshPromise
      this.isRefreshing = false
      this.refreshPromise = null
      return newToken
    } catch (error) {
      this.isRefreshing = false
      this.refreshPromise = null
      this.clearTokens()
      throw error
    }
  }

  private async performTokenRefresh(): Promise<string> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await axios.post(this.config.refreshEndpoint, {
      refreshToken
    })

    const { accessToken, refreshToken: newRefreshToken } = response.data
    this.setTokens(accessToken, newRefreshToken)

    return accessToken
  }

  // 檢查 token 是否即將過期
  isTokenExpiring(): boolean {
    const token = this.getAccessToken()
    if (!token) return true

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const exp = payload.exp * 1000 // 轉換為毫秒
      const now = Date.now()
      const threshold = 5 * 60 * 1000 // 5 分鐘

      return exp - now < threshold
    } catch {
      return true
    }
  }
}`,
        explanation: '完整的認證中介軟體，支援 token 刷新和自動重試'
    }
]

const usageExampleCode = `// 完整使用範例
// 1. 初始化 API 客戶端
const apiClient = new AdvancedApiClient('/api/v1', {
  timeout: 15000,
  headers: {
    'X-App-Version': '1.0.0'
  }
})

// 2. 創建資源客戶端
const userClient = new UserResourceClient(apiClient)
const productClient = new ProductResourceClient(apiClient)

// 3. 創建端點客戶端
const userEndpoint = new UserEndpoint(apiClient)
const productEndpoint = new ProductEndpoint(apiClient)

// 4. 實際使用
class UserService {
  constructor(
    private userClient: UserResourceClient,
    private userEndpoint: UserEndpoint
  ) {}

  // 取得所有用戶
  async getAllUsers(): Promise<User[]> {
    const response = await this.userClient.list()
    return response.data
  }

  // 搜尋用戶
  async searchUsers(query: string): Promise<User[]> {
    return this.userEndpoint.search(query)
  }

  // 創建用戶
  async createUser(userData: CreateUserRequest): Promise<User> {
    const user = await this.userClient.create(userData)

    // 清除用戶列表快取
    apiClient.clearCache('/users')

    return user
  }

  // 批量創建用戶
  async createMultipleUsers(usersData: CreateUserRequest[]): Promise<User[]> {
    return this.userClient.createMany(usersData)
  }

  // 條件式取得用戶
  async getUserIfLoggedIn(userId: number): Promise<User | null> {
    return apiClient.getIf<User>(
      \`/users/\${userId}\`,
      () => this.isUserLoggedIn()
    )
  }

  private isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
}

// 5. 在元件中使用
const userService = new UserService(userClient, userEndpoint)

// 使用範例
async function example() {
  try {
    // 取得用戶列表
    const users = await userService.getAllUsers()
    console.log('Users:', users)

    // 搜尋用戶
    const searchResults = await userService.searchUsers('john')
    console.log('Search results:', searchResults)

    // 創建新用戶
    const newUser = await userService.createUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    })
    console.log('New user:', newUser)

  } catch (error) {
    console.error('Error:', error)
  }
}`

function runExample(code: string) {
    console.log('Running example:', code)
}

function completeSection() {
    emit('complete')
}
</script>

<style scoped>
.generic-api-client {
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

.generic-benefits {
    margin-bottom: 3rem;
}

.generic-benefits h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.benefit-card {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.benefit-card h4 {
    margin-bottom: 0.75rem;
    color: #2d3748;
    font-size: 1.1rem;
}

.benefit-card p {
    margin: 0;
    color: #4a5568;
    line-height: 1.5;
}

.basic-generic-client,
.advanced-generic-client,
.resource-client,
.practical-usage {
    margin-bottom: 3rem;
}

.basic-generic-client h3,
.advanced-generic-client h3,
.resource-client h3,
.practical-usage h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.typed-endpoints,
.middleware-system {
    margin-bottom: 3rem;
}

.typed-endpoints h3,
.middleware-system h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.endpoint-tabs,
.middleware-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.tab-button {
    padding: 0.5rem 1rem;
    border: 1px solid #cbd5e0;
    border-radius: 4px 4px 0 0;
    background: #f7fafc;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}

.tab-button.active {
    background: white;
    color: #2d3748;
    border-bottom-color: white;
}

.endpoint-content,
.middleware-content {
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

.practice-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.practice-section {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.practice-section h4 {
    margin-bottom: 1rem;
    color: #2d3748;
}

.practice-section ul {
    margin: 0;
    padding-left: 1.5rem;
}

.practice-section li {
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

    .benefits-grid,
    .practice-sections {
        grid-template-columns: 1fr;
    }

    .endpoint-tabs,
    .middleware-tabs {
        flex-direction: column;
    }

    .tab-button {
        border-radius: 4px;
    }

    .endpoint-content,
    .middleware-content {
        border-radius: 8px;
    }
}
</style>
