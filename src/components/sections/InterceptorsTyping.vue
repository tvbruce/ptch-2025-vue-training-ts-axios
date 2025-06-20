<template>
    <div class="interceptors-typing">
        <div class="section-intro">
            <h2>攔截器型別定義</h2>
            <p class="intro-text">
                Axios 攔截器是實現統一請求處理、響應處理和錯誤處理的強大工具。
                本章節將深入探討如何在 TypeScript 中正確定義和使用攔截器型別。
            </p>
        </div>

        <div class="interceptor-concepts">
            <h3>攔截器概念</h3>
            <div class="concepts-grid">
                <div class="concept-card">
                    <h4>請求攔截器</h4>
                    <p>在請求發送前執行，可以修改請求配置、添加認證 token、設定公共 headers 等。</p>
                </div>
                <div class="concept-card">
                    <h4>響應攔截器</h4>
                    <p>在響應返回後執行，可以統一處理響應數據、錯誤處理、token 刷新等。</p>
                </div>
            </div>
        </div>

        <div class="request-interceptors">
            <h3>請求攔截器型別</h3>
            <CodeBlock title="請求攔截器型別定義" :code="requestInterceptorTypes" language="typescript"
                explanation="定義請求攔截器的型別，包含配置修改和錯誤處理" />
        </div>

        <div class="response-interceptors">
            <h3>響應攔截器型別</h3>
            <CodeBlock title="響應攔截器型別定義" :code="responseInterceptorTypes" language="typescript"
                explanation="定義響應攔截器的型別，處理成功響應和錯誤響應" />
        </div>

        <div class="practical-examples">
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

        <div class="advanced-patterns">
            <h3>進階模式</h3>
            <div class="pattern-grid">
                <div class="pattern-card">
                    <h4>攔截器鏈</h4>
                    <CodeBlock title="多個攔截器組合" :code="interceptorChainCode" language="typescript"
                        explanation="展示如何組合多個攔截器形成處理鏈" />
                </div>

                <div class="pattern-card">
                    <h4>條件攔截器</h4>
                    <CodeBlock title="基於條件的攔截器" :code="conditionalInterceptorCode" language="typescript"
                        explanation="根據不同條件應用不同的攔截器邏輯" />
                </div>
            </div>
        </div>

        <div class="best-practices">
            <h3>最佳實踐</h3>
            <div class="practice-list">
                <div class="practice-item">
                    <h4>🔒 安全性考慮</h4>
                    <ul>
                        <li>避免在攔截器中洩露敏感信息</li>
                        <li>安全地處理認證 token</li>
                        <li>防止無限重試循環</li>
                    </ul>
                </div>

                <div class="practice-item">
                    <h4>⚡ 性能優化</h4>
                    <ul>
                        <li>避免在攔截器中執行重計算</li>
                        <li>使用快取減少重複處理</li>
                        <li>合理設定超時和重試次數</li>
                    </ul>
                </div>

                <div class="practice-item">
                    <h4>🐛 錯誤處理</h4>
                    <ul>
                        <li>提供有意義的錯誤訊息</li>
                        <li>記錄詳細的錯誤日誌</li>
                        <li>實現優雅的降級策略</li>
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

const activeExample = ref('auth-interceptor')

const requestInterceptorTypes = `// 請求攔截器型別定義
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

// 自定義請求配置型別
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean
  retryCount?: number
  skipErrorHandler?: boolean
}

// 請求攔截器回調型別
type RequestInterceptorFulfilled = (
  config: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>

type RequestInterceptorRejected = (error: any) => any

// 攔截器選項型別
interface InterceptorOptions {
  synchronous?: boolean
  runWhen?: (config: InternalAxiosRequestConfig) => boolean
}

// 請求攔截器配置
interface RequestInterceptorConfig {
  fulfilled: RequestInterceptorFulfilled
  rejected?: RequestInterceptorRejected
  options?: InterceptorOptions
}`

const responseInterceptorTypes = `// 響應攔截器型別定義
import type { AxiosResponse, AxiosError } from 'axios'

// 響應攔截器回調型別
type ResponseInterceptorFulfilled<T = any> = (
  response: AxiosResponse<T>
) => AxiosResponse<T> | Promise<AxiosResponse<T>>

type ResponseInterceptorRejected = (error: AxiosError) => any

// 響應攔截器配置
interface ResponseInterceptorConfig<T = any> {
  fulfilled: ResponseInterceptorFulfilled<T>
  rejected?: ResponseInterceptorRejected
  options?: InterceptorOptions
}

// 錯誤類型定義
interface ApiError {
  code: string
  message: string
  status?: number
  data?: any
}

// 統一錯誤處理型別
type ErrorHandler = (error: AxiosError) => Promise<any> | any`

const examples = [
    {
        id: 'auth-interceptor',
        title: '認證攔截器',
        code: `// 認證攔截器實現
import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'

interface AuthConfig {
  getToken: () => string | null
  refreshToken: () => Promise<string>
  onAuthError: () => void
}

class AuthInterceptor {
  private authConfig: AuthConfig

  constructor(authConfig: AuthConfig) {
    this.authConfig = authConfig
  }

  // 請求攔截器 - 自動添加認證 token
  setupRequestInterceptor(axiosInstance: typeof axios) {
    axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 跳過認證的請求
        if (config.skipAuth) {
          return config
        }

        const token = this.authConfig.getToken()
        if (token && config.headers) {
          config.headers.Authorization = \`Bearer \${token}\`
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // 響應攔截器 - 處理認證錯誤和 token 刷新
  setupResponseInterceptor(axiosInstance: typeof axios) {
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config

        // 處理 401 錯誤 - token 過期
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const newToken = await this.authConfig.refreshToken()
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = \`Bearer \${newToken}\`
            }
            return axiosInstance(originalRequest)
          } catch (refreshError) {
            this.authConfig.onAuthError()
            return Promise.reject(refreshError)
          }
        }

        return Promise.reject(error)
      }
    )
  }
}`,
        explanation: '展示如何實現完整的認證攔截器，包含 token 添加和自動刷新'
    },
    {
        id: 'logging-interceptor',
        title: '日誌攔截器',
        code: `// 日誌攔截器實現
interface LogConfig {
  logRequests: boolean
  logResponses: boolean
  logErrors: boolean
  sensitiveHeaders: string[]
}

class LoggingInterceptor {
  private config: LogConfig

  constructor(config: LogConfig) {
    this.config = config
  }

  setup(axiosInstance: typeof axios) {
    // 請求日誌攔截器
    if (this.config.logRequests) {
      axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          const logData = {
            method: config.method?.toUpperCase(),
            url: config.url,
            headers: this.filterSensitiveHeaders(config.headers),
            timestamp: new Date().toISOString()
          }

          console.log('🔄 API Request:', logData)
          return config
        }
      )
    }

    // 響應日誌攔截器
    if (this.config.logResponses) {
      axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
          const logData = {
            status: response.status,
            url: response.config.url,
            duration: this.calculateDuration(response.config),
            timestamp: new Date().toISOString()
          }

          console.log('✅ API Response:', logData)
          return response
        },
        (error) => {
          if (this.config.logErrors) {
            const logData = {
              status: error.response?.status,
              url: error.config?.url,
              message: error.message,
              timestamp: new Date().toISOString()
            }

            console.error('❌ API Error:', logData)
          }
          return Promise.reject(error)
        }
      )
    }
  }

  private filterSensitiveHeaders(headers: any): Record<string, string> {
    const filtered: Record<string, string> = {}

    for (const [key, value] of Object.entries(headers || {})) {
      if (this.config.sensitiveHeaders.includes(key.toLowerCase())) {
        filtered[key] = '***REDACTED***'
      } else {
        filtered[key] = String(value)
      }
    }

    return filtered
  }

  private calculateDuration(config: any): string {
    const startTime = config.metadata?.startTime
    if (startTime) {
      return \`\${Date.now() - startTime}ms\`
    }
    return 'unknown'
  }
}`,
        explanation: '實現完整的請求和響應日誌攔截器，支援敏感信息過濾'
    }
]

const interceptorChainCode = `// 攔截器鏈組合
class InterceptorManager {
  private axiosInstance: typeof axios

  constructor(axiosInstance: typeof axios) {
    this.axiosInstance = axiosInstance
  }

  setupInterceptorChain() {
    // 1. 日誌攔截器 (最外層)
    const loggingInterceptor = new LoggingInterceptor({
      logRequests: true,
      logResponses: true,
      logErrors: true,
      sensitiveHeaders: ['authorization', 'cookie']
    })
    loggingInterceptor.setup(this.axiosInstance)

    // 2. 認證攔截器
    const authInterceptor = new AuthInterceptor({
      getToken: () => localStorage.getItem('token'),
      refreshToken: async () => {
        // token 刷新邏輯
        return 'new-token'
      },
      onAuthError: () => {
        // 登出處理
      }
    })
    authInterceptor.setupRequestInterceptor(this.axiosInstance)
    authInterceptor.setupResponseInterceptor(this.axiosInstance)

    // 3. 重試攔截器
    const retryInterceptor = new RetryInterceptor({
      retries: 3,
      retryDelay: 1000,
      retryCondition: (error) => {
        return error.response?.status >= 500
      }
    })
    retryInterceptor.setup(this.axiosInstance)
  }
}`

const conditionalInterceptorCode = `// 條件攔截器實現
interface ConditionalInterceptorConfig {
  condition: (config: InternalAxiosRequestConfig) => boolean
  interceptor: RequestInterceptorFulfilled
}

class ConditionalInterceptor {
  static create(configs: ConditionalInterceptorConfig[]) {
    return (config: InternalAxiosRequestConfig) => {
      for (const { condition, interceptor } of configs) {
        if (condition(config)) {
          return interceptor(config)
        }
      }
      return config
    }
  }
}

// 使用範例
const conditionalRequestInterceptor = ConditionalInterceptor.create([
  {
    // 只對 API 請求添加認證
    condition: (config) => config.url?.startsWith('/api/') ?? false,
    interceptor: (config) => {
      const token = getToken()
      if (token && config.headers) {
        config.headers.Authorization = \`Bearer \${token}\`
      }
      return config
    }
  },
  {
    // 只對上傳請求設定特殊 headers
    condition: (config) => config.url?.includes('/upload') ?? false,
    interceptor: (config) => {
      if (config.headers) {
        config.headers['Content-Type'] = 'multipart/form-data'
      }
      return config
    }
  }
])`

function runExample(code: string) {
    console.log('Running example:', code)
}

function completeSection() {
    emit('complete')
}
</script>

<style scoped>
.interceptors-typing {
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

.interceptor-concepts {
    margin-bottom: 3rem;
}

.interceptor-concepts h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.concepts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.concept-card {
    padding: 1.5rem;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
}

.concept-card h4 {
    color: #2d3748;
    margin-bottom: 0.75rem;
}

.concept-card p {
    color: #4a5568;
    margin: 0;
    line-height: 1.5;
}

.request-interceptors,
.response-interceptors {
    margin-bottom: 3rem;
}

.request-interceptors h3,
.response-interceptors h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.practical-examples {
    margin-bottom: 3rem;
}

.practical-examples h3 {
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

.advanced-patterns {
    margin-bottom: 3rem;
}

.advanced-patterns h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.pattern-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
}

.pattern-card h4 {
    color: #2d3748;
    margin-bottom: 1rem;
}

.best-practices {
    margin-bottom: 3rem;
}

.best-practices h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.practice-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.practice-item {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.practice-item h4 {
    margin-bottom: 1rem;
    color: #2d3748;
}

.practice-item ul {
    margin: 0;
    padding-left: 1.5rem;
}

.practice-item li {
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

    .concepts-grid,
    .pattern-grid,
    .practice-list {
        grid-template-columns: 1fr;
    }
}
</style>
