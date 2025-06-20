<template>
    <div class="error-handling">
        <div class="section-intro">
            <h2>錯誤處理策略</h2>
            <p class="intro-text">
                健全的錯誤處理是構建可靠 Web 應用程式的基石。本章節將介紹在 TypeScript 中
                如何設計和實現完善的 HTTP 錯誤處理策略，包含錯誤分類、處理模式和最佳實踐。
            </p>
        </div>

        <div class="error-types">
            <h3>錯誤類型分類</h3>
            <div class="error-categories">
                <div class="category-card network">
                    <h4>🌐 網路錯誤</h4>
                    <ul>
                        <li>連線超時</li>
                        <li>網路中斷</li>
                        <li>DNS 解析失敗</li>
                        <li>伺服器無回應</li>
                    </ul>
                </div>

                <div class="category-card http">
                    <h4>📡 HTTP 錯誤</h4>
                    <ul>
                        <li>4xx 客戶端錯誤</li>
                        <li>5xx 伺服器錯誤</li>
                        <li>重定向問題</li>
                        <li>狀態碼處理</li>
                    </ul>
                </div>

                <div class="category-card application">
                    <h4>💻 應用程式錯誤</h4>
                    <ul>
                        <li>資料驗證錯誤</li>
                        <li>業務邏輯錯誤</li>
                        <li>權限錯誤</li>
                        <li>格式錯誤</li>
                    </ul>
                </div>

                <div class="category-card system">
                    <h4>⚙️ 系統錯誤</h4>
                    <ul>
                        <li>記憶體不足</li>
                        <li>並發限制</li>
                        <li>資源耗盡</li>
                        <li>配置錯誤</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="error-definitions">
            <h3>錯誤型別定義</h3>
            <CodeBlock title="錯誤型別系統" :code="errorTypesCode" language="typescript" explanation="建立完整的錯誤型別系統，支援不同錯誤場景" />
        </div>

        <div class="error-handler">
            <h3>統一錯誤處理器</h3>
            <CodeBlock title="ErrorHandler 類別" :code="errorHandlerCode" language="typescript"
                explanation="實現統一的錯誤處理器，支援不同處理策略" />
        </div>

        <div class="retry-strategies">
            <h3>重試策略</h3>
            <div class="strategy-tabs">
                <button v-for="strategy in retryStrategies" :key="strategy.id" class="tab-button"
                    :class="{ active: activeStrategy === strategy.id }" @click="activeStrategy = strategy.id">
                    {{ strategy.title }}
                </button>
            </div>

            <div class="strategy-content">
                <div v-for="strategy in retryStrategies" :key="strategy.id" v-show="activeStrategy === strategy.id">
                    <CodeBlock :title="strategy.title" :code="strategy.code" language="typescript"
                        :explanation="strategy.explanation" />
                </div>
            </div>
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

        <div class="error-monitoring">
            <h3>錯誤監控與日誌</h3>
            <div class="monitoring-grid">
                <div class="monitoring-card">
                    <h4>錯誤追蹤</h4>
                    <CodeBlock title="錯誤追蹤系統" :code="errorTrackingCode" language="typescript"
                        explanation="實現錯誤追蹤和分析系統" />
                </div>

                <div class="monitoring-card">
                    <h4>日誌記錄</h4>
                    <CodeBlock title="結構化日誌" :code="structuredLoggingCode" language="typescript"
                        explanation="建立結構化的錯誤日誌系統" />
                </div>
            </div>
        </div>

        <div class="user-experience">
            <h3>使用者體驗優化</h3>
            <div class="ux-strategies">
                <div class="ux-card">
                    <h4>🎯 友善的錯誤訊息</h4>
                    <p>將技術錯誤轉換為使用者可理解的訊息</p>
                    <ul>
                        <li>避免技術術語</li>
                        <li>提供具體的解決建議</li>
                        <li>支援多語言錯誤訊息</li>
                    </ul>
                </div>

                <div class="ux-card">
                    <h4>🔄 優雅降級</h4>
                    <p>在錯誤發生時提供替代方案</p>
                    <ul>
                        <li>顯示快取資料</li>
                        <li>提供離線功能</li>
                        <li>引導使用者採取行動</li>
                    </ul>
                </div>

                <div class="ux-card">
                    <h4>📊 進度指示</h4>
                    <p>讓使用者了解處理狀態</p>
                    <ul>
                        <li>顯示載入狀態</li>
                        <li>重試進度指示</li>
                        <li>預估恢復時間</li>
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

const activeStrategy = ref('exponential-backoff')
const activeExample = ref('api-client')

const errorTypesCode = `// 錯誤型別定義系統
// 基礎錯誤介面
interface BaseError {
  code: string
  message: string
  timestamp: Date
  correlationId?: string
}

// 網路錯誤
interface NetworkError extends BaseError {
  type: 'NETWORK_ERROR'
  code: 'TIMEOUT' | 'CONNECTION_FAILED' | 'DNS_ERROR'
  retryable: boolean
}

// HTTP 錯誤
interface HttpError extends BaseError {
  type: 'HTTP_ERROR'
  status: number
  statusText: string
  response?: any
  retryable: boolean
}

// 驗證錯誤
interface ValidationError extends BaseError {
  type: 'VALIDATION_ERROR'
  field: string
  value: any
  constraints: string[]
}

// 業務邏輯錯誤
interface BusinessError extends BaseError {
  type: 'BUSINESS_ERROR'
  code: string
  details?: Record<string, any>
}

// 系統錯誤
interface SystemError extends BaseError {
  type: 'SYSTEM_ERROR'
  code: 'MEMORY_ERROR' | 'RESOURCE_EXHAUSTED' | 'CONFIG_ERROR'
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
}

// 聯合錯誤型別
type ApiError = NetworkError | HttpError | ValidationError | BusinessError | SystemError

// 錯誤工廠
class ErrorFactory {
  static createNetworkError(code: NetworkError['code'], message: string): NetworkError {
    return {
      type: 'NETWORK_ERROR',
      code,
      message,
      timestamp: new Date(),
      retryable: true,
      correlationId: this.generateCorrelationId()
    }
  }

  static createHttpError(status: number, message: string, response?: any): HttpError {
    return {
      type: 'HTTP_ERROR',
      code: \`HTTP_\${status}\`,
      message,
      status,
      statusText: this.getStatusText(status),
      response,
      timestamp: new Date(),
      retryable: status >= 500,
      correlationId: this.generateCorrelationId()
    }
  }

  private static generateCorrelationId(): string {
    return \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`
  }

  private static getStatusText(status: number): string {
    const statusMap: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable'
    }
    return statusMap[status] || 'Unknown Error'
  }
}`

const errorHandlerCode = `// 統一錯誤處理器
interface ErrorHandlerConfig {
  logErrors: boolean
  showUserMessages: boolean
  enableRetry: boolean
  maxRetries: number
  notificationService?: NotificationService
  analyticsService?: AnalyticsService
}

class ErrorHandler {
  private config: ErrorHandlerConfig

  constructor(config: ErrorHandlerConfig) {
    this.config = config
  }

  async handle(error: ApiError, context?: string): Promise<void> {
    // 記錄錯誤
    if (this.config.logErrors) {
      this.logError(error, context)
    }

    // 發送錯誤分析
    if (this.config.analyticsService) {
      this.config.analyticsService.trackError(error)
    }

    // 顯示用戶友善訊息
    if (this.config.showUserMessages) {
      const userMessage = this.getUserFriendlyMessage(error)
      this.showErrorMessage(userMessage)
    }

    // 處理特定錯誤類型
    await this.handleSpecificError(error)
  }

  private logError(error: ApiError, context?: string): void {
    const logEntry = {
      type: error.type,
      code: error.code,
      message: error.message,
      timestamp: error.timestamp,
      correlationId: error.correlationId,
      context,
      stack: new Error().stack
    }

    if (error.type === 'SYSTEM_ERROR' && error.severity === 'CRITICAL') {
      console.error('🚨 CRITICAL ERROR:', logEntry)
    } else {
      console.error('❌ Error:', logEntry)
    }
  }

  private getUserFriendlyMessage(error: ApiError): string {
    const messageMap: Record<string, string> = {
      TIMEOUT: '請求超時，請稍後再試',
      CONNECTION_FAILED: '網路連線失敗，請檢查網路狀態',
      HTTP_401: '您的登入已過期，請重新登入',
      HTTP_403: '您沒有權限執行此操作',
      HTTP_404: '找不到請求的資源',
      HTTP_500: '伺服器發生錯誤，請稍後再試',
      VALIDATION_ERROR: '輸入資料有誤，請檢查後重試'
    }

    return messageMap[error.code] || '發生未知錯誤，請聯繫技術支援'
  }

  private showErrorMessage(message: string): void {
    if (this.config.notificationService) {
      this.config.notificationService.showError(message)
    } else {
      alert(message) // 簡單的備用方案
    }
  }

  private async handleSpecificError(error: ApiError): Promise<void> {
    switch (error.type) {
      case 'HTTP_ERROR':
        if (error.status === 401) {
          // 處理認證過期
          await this.handleAuthExpired()
        }
        break

      case 'NETWORK_ERROR':
        if (error.retryable && this.config.enableRetry) {
          // 處理可重試的網路錯誤
          this.scheduleRetry(error)
        }
        break

      case 'VALIDATION_ERROR':
        // 突出顯示錯誤欄位
        this.highlightErrorField(error.field)
        break
    }
  }

  private async handleAuthExpired(): Promise<void> {
    // 清除本地 token
    localStorage.removeItem('token')
    // 重定向到登入頁
    window.location.href = '/login'
  }

  private scheduleRetry(error: ApiError): void {
    // 重試邏輯將在重試策略部分實現
    console.log('Scheduling retry for:', error.code)
  }

  private highlightErrorField(field: string): void {
    const element = document.querySelector(\`[name="\${field}"]\`)
    if (element) {
      element.classList.add('error-highlight')
    }
  }
}`

const retryStrategies = [
    {
        id: 'exponential-backoff',
        title: '指數退避',
        code: `// 指數退避重試策略
class ExponentialBackoffRetry {
  private maxRetries: number
  private baseDelay: number
  private maxDelay: number
  private backoffFactor: number

  constructor({
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    backoffFactor = 2
  }: {
    maxRetries?: number
    baseDelay?: number
    maxDelay?: number
    backoffFactor?: number
  } = {}) {
    this.maxRetries = maxRetries
    this.baseDelay = baseDelay
    this.maxDelay = maxDelay
    this.backoffFactor = backoffFactor
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    let attempt = 0

    while (attempt <= this.maxRetries) {
      try {
        return await operation()
      } catch (error) {
        attempt++

        if (attempt > this.maxRetries) {
          throw error
        }

        if (!this.isRetryableError(error)) {
          throw error
        }

        const delay = this.calculateDelay(attempt)
        await this.sleep(delay)
      }
    }

    throw new Error('Max retries exceeded')
  }

  private calculateDelay(attempt: number): number {
    const delay = this.baseDelay * Math.pow(this.backoffFactor, attempt - 1)
    return Math.min(delay, this.maxDelay)
  }

  private isRetryableError(error: any): boolean {
    // 網路錯誤或 5xx 錯誤可重試
    return error.code === 'NETWORK_ERROR' ||
           (error.status >= 500 && error.status < 600)
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}`,
        explanation: '指數退避策略會在每次重試時增加等待時間，避免對伺服器造成過大壓力'
    },
    {
        id: 'linear-backoff',
        title: '線性退避',
        code: `// 線性退避重試策略
class LinearBackoffRetry {
  private maxRetries: number
  private delay: number

  constructor(maxRetries = 3, delay = 1000) {
    this.maxRetries = maxRetries
    this.delay = delay
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    let attempt = 0

    while (attempt <= this.maxRetries) {
      try {
        return await operation()
      } catch (error) {
        attempt++

        if (attempt > this.maxRetries) {
          throw error
        }

        if (!this.isRetryableError(error)) {
          throw error
        }

        const currentDelay = this.delay * attempt
        await this.sleep(currentDelay)
      }
    }

    throw new Error('Max retries exceeded')
  }

  private isRetryableError(error: any): boolean {
    return error.code === 'NETWORK_ERROR' ||
           (error.status >= 500 && error.status < 600)
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}`,
        explanation: '線性退避策略會在每次重試時以固定倍數增加等待時間'
    }
]

const examples = [
    {
        id: 'api-client',
        title: '完整 API 客戶端',
        code: `// 具備完整錯誤處理的 API 客戶端
class RobustApiClient {
  private axiosInstance: AxiosInstance
  private errorHandler: ErrorHandler
  private retryStrategy: ExponentialBackoffRetry

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '/api',
      timeout: 10000
    })

    this.errorHandler = new ErrorHandler({
      logErrors: true,
      showUserMessages: true,
      enableRetry: true,
      maxRetries: 3
    })

    this.retryStrategy = new ExponentialBackoffRetry({
      maxRetries: 3,
      baseDelay: 1000,
      maxDelay: 10000
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // 響應攔截器處理錯誤
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const apiError = this.transformError(error)
        await this.errorHandler.handle(apiError)
        throw apiError
      }
    )
  }

  private transformError(error: AxiosError): ApiError {
    if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      return ErrorFactory.createNetworkError('CONNECTION_FAILED', error.message)
    }

    if (error.response) {
      return ErrorFactory.createHttpError(
        error.response.status,
        error.message,
        error.response.data
      )
    }

    return ErrorFactory.createNetworkError('TIMEOUT', 'Request timeout')
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.retryStrategy.execute(async () => {
      const response = await this.axiosInstance.get<ApiResponse<T>>(url, config)
      return response.data.data
    })
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.retryStrategy.execute(async () => {
      const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config)
      return response.data.data
    })
  }
}`,
        explanation: '展示如何建立具備完整錯誤處理機制的 API 客戶端'
    }
]

const errorTrackingCode = `// 錯誤追蹤系統
class ErrorTracker {
  private errors: Map<string, ErrorMetrics> = new Map()

  track(error: ApiError): void {
    const key = \`\${error.type}:\${error.code}\`
    const existing = this.errors.get(key) || {
      count: 0,
      firstSeen: new Date(),
      lastSeen: new Date(),
      samples: []
    }

    existing.count++
    existing.lastSeen = new Date()
    existing.samples.push({
      timestamp: error.timestamp,
      correlationId: error.correlationId,
      message: error.message
    })

    // 只保留最近 10 個樣本
    if (existing.samples.length > 10) {
      existing.samples = existing.samples.slice(-10)
    }

    this.errors.set(key, existing)
  }

  getErrorMetrics(): ErrorMetrics[] {
    return Array.from(this.errors.entries()).map(([key, metrics]) => ({
      errorKey: key,
      ...metrics
    }))
  }

  getTopErrors(limit = 10): ErrorMetrics[] {
    return this.getErrorMetrics()
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }
}

interface ErrorMetrics {
  count: number
  firstSeen: Date
  lastSeen: Date
  samples: Array<{
    timestamp: Date
    correlationId?: string
    message: string
  }>
}`

const structuredLoggingCode = `// 結構化日誌系統
interface LogEntry {
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'
  timestamp: Date
  message: string
  context?: string
  error?: ApiError
  metadata?: Record<string, any>
}

class StructuredLogger {
  private logs: LogEntry[] = []
  private maxLogs = 1000

  error(message: string, error?: ApiError, context?: string, metadata?: Record<string, any>): void {
    this.log('ERROR', message, error, context, metadata)
  }

  warn(message: string, context?: string, metadata?: Record<string, any>): void {
    this.log('WARN', message, undefined, context, metadata)
  }

  private log(
    level: LogEntry['level'],
    message: string,
    error?: ApiError,
    context?: string,
    metadata?: Record<string, any>
  ): void {
    const entry: LogEntry = {
      level,
      timestamp: new Date(),
      message,
      context,
      error,
      metadata
    }

    this.logs.push(entry)

    // 維持日誌數量限制
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // 輸出到控制台
    this.outputToConsole(entry)
  }

  private outputToConsole(entry: LogEntry): void {
    const logData = {
      level: entry.level,
      timestamp: entry.timestamp.toISOString(),
      message: entry.message,
      context: entry.context,
      error: entry.error,
      metadata: entry.metadata
    }

    switch (entry.level) {
      case 'ERROR':
      case 'FATAL':
        console.error(logData)
        break
      case 'WARN':
        console.warn(logData)
        break
      default:
        console.log(logData)
    }
  }

  exportLogs(): LogEntry[] {
    return [...this.logs]
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
.error-handling {
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

.error-types {
    margin-bottom: 3rem;
}

.error-types h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.error-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.category-card {
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-card.network {
    background: #ebf8ff;
    border: 1px solid #90cdf4;
}

.category-card.http {
    background: #f0fff4;
    border: 1px solid #9ae6b4;
}

.category-card.application {
    background: #fef5e7;
    border: 1px solid #f6ad55;
}

.category-card.system {
    background: #fed7d7;
    border: 1px solid #feb2b2;
}

.category-card h4 {
    margin-bottom: 1rem;
    color: #2d3748;
}

.category-card ul {
    margin: 0;
    padding-left: 1.5rem;
}

.category-card li {
    margin-bottom: 0.5rem;
    color: #4a5568;
}

.error-definitions,
.error-handler {
    margin-bottom: 3rem;
}

.error-definitions h3,
.error-handler h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.retry-strategies {
    margin-bottom: 3rem;
}

.retry-strategies h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.strategy-tabs,
.example-tabs {
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

.strategy-content,
.example-content {
    border: 1px solid #cbd5e0;
    border-radius: 0 8px 8px 8px;
    background: white;
    padding: 1.5rem;
}

.practical-examples {
    margin-bottom: 3rem;
}

.practical-examples h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.error-monitoring {
    margin-bottom: 3rem;
}

.error-monitoring h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.monitoring-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
}

.monitoring-card h4 {
    color: #2d3748;
    margin-bottom: 1rem;
}

.user-experience {
    margin-bottom: 3rem;
}

.user-experience h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.ux-strategies {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.ux-card {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.ux-card h4 {
    margin-bottom: 0.75rem;
    color: #2d3748;
}

.ux-card p {
    margin-bottom: 1rem;
    color: #4a5568;
    line-height: 1.5;
}

.ux-card ul {
    margin: 0;
    padding-left: 1.5rem;
}

.ux-card li {
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

    .error-categories,
    .monitoring-grid,
    .ux-strategies {
        grid-template-columns: 1fr;
    }

    .strategy-tabs,
    .example-tabs {
        flex-direction: column;
    }

    .tab-button {
        border-radius: 4px;
    }

    .strategy-content,
    .example-content {
        border-radius: 8px;
    }
}
</style>
