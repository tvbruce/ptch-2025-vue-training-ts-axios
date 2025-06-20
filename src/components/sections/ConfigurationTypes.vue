<template>
    <div class="configuration-types">
        <div class="section-intro">
            <h2>配置型別管理</h2>
            <p class="intro-text">
                良好的配置管理是建構可維護和可擴展應用程式的基礎。本章節將探討如何在 TypeScript 中
                設計和實現型別安全的配置系統，涵蓋環境設定、API 配置和應用程式參數管理。
            </p>
        </div>

        <div class="config-principles">
            <h3>配置管理原則</h3>
            <div class="principles-grid">
                <div class="principle-card">
                    <h4>🏗️ 型別安全</h4>
                    <p>使用 TypeScript 定義嚴格的配置介面，在編譯時期捕獲錯誤</p>
                </div>
                <div class="principle-card">
                    <h4>🔧 分層配置</h4>
                    <p>支援開發、測試、生產等不同環境的配置繼承和覆蓋</p>
                </div>
                <div class="principle-card">
                    <h4>🔍 驗證機制</h4>
                    <p>在應用程式啟動時驗證配置的完整性和有效性</p>
                </div>
                <div class="principle-card">
                    <h4>🔐 安全性</h4>
                    <p>保護敏感配置資訊，避免意外洩露</p>
                </div>
            </div>
        </div>

        <div class="config-types">
            <h3>配置型別定義</h3>
            <CodeBlock title="基礎配置型別" :code="configTypesCode" language="typescript" explanation="定義完整的應用程式配置型別結構" />
        </div>

        <div class="config-manager">
            <h3>配置管理器</h3>
            <CodeBlock title="ConfigManager 類別" :code="configManagerCode" language="typescript"
                explanation="實現型別安全的配置管理器" />
        </div>

        <div class="environment-configs">
            <h3>環境配置</h3>
            <div class="env-tabs">
                <button v-for="env in environments" :key="env.id" class="tab-button"
                    :class="{ active: activeEnv === env.id }" @click="activeEnv = env.id">
                    {{ env.title }}
                </button>
            </div>

            <div class="env-content">
                <div v-for="env in environments" :key="env.id" v-show="activeEnv === env.id">
                    <CodeBlock :title="env.title" :code="env.code" language="typescript"
                        :explanation="env.explanation" />
                </div>
            </div>
        </div>

        <div class="config-validation">
            <h3>配置驗證</h3>
            <CodeBlock title="配置驗證系統" :code="configValidationCode" language="typescript"
                explanation="實現完整的配置驗證和錯誤處理機制" />
        </div>

        <div class="dynamic-config">
            <h3>動態配置</h3>
            <div class="dynamic-examples">
                <div class="dynamic-tabs">
                    <button v-for="example in dynamicExamples" :key="example.id" class="tab-button"
                        :class="{ active: activeDynamic === example.id }" @click="activeDynamic = example.id">
                        {{ example.title }}
                    </button>
                </div>

                <div class="dynamic-content">
                    <div v-for="example in dynamicExamples" :key="example.id" v-show="activeDynamic === example.id">
                        <CodeBlock :title="example.title" :code="example.code" language="typescript"
                            :explanation="example.explanation" />
                    </div>
                </div>
            </div>
        </div>

        <div class="practical-usage">
            <h3>實際應用範例</h3>
            <CodeBlock title="完整使用範例" :code="usageExampleCode" language="typescript" explanation="展示如何在實際專案中使用配置管理系統"
                :runnable="true" @run="runExample" />
        </div>

        <div class="security-practices">
            <h3>安全最佳實踐</h3>
            <div class="security-grid">
                <div class="security-card">
                    <h4>🔐 敏感資料保護</h4>
                    <ul>
                        <li>使用環境變數存放 API 金鑰</li>
                        <li>避免在前端程式碼中硬編碼密碼</li>
                        <li>實現配置資料的加密存儲</li>
                        <li>定期輪換敏感認證資訊</li>
                    </ul>
                </div>

                <div class="security-card">
                    <h4>🛡️ 存取控制</h4>
                    <ul>
                        <li>實現基於角色的配置存取</li>
                        <li>設定配置修改的審計日誌</li>
                        <li>限制配置修改的權限範圍</li>
                        <li>使用安全的配置傳輸方式</li>
                    </ul>
                </div>

                <div class="security-card">
                    <h4>🔍 監控與審計</h4>
                    <ul>
                        <li>記錄所有配置變更操作</li>
                        <li>實現配置異常的即時告警</li>
                        <li>定期檢查配置的一致性</li>
                        <li>建立配置備份和恢復機制</li>
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

const activeEnv = ref('development')
const activeDynamic = ref('feature-flags')

const configTypesCode = `// 完整的配置型別定義
// 基礎配置介面
interface BaseConfig {
  app: AppConfig
  api: ApiConfig
  database: DatabaseConfig
  cache: CacheConfig
  logging: LoggingConfig
  security: SecurityConfig
  features: FeatureFlags
}

// 應用程式配置
interface AppConfig {
  name: string
  version: string
  environment: 'development' | 'testing' | 'staging' | 'production'
  port: number
  host: string
  debug: boolean
  cors: {
    enabled: boolean
    origins: string[]
    credentials: boolean
  }
}

// API 配置
interface ApiConfig {
  baseUrl: string
  timeout: number
  retries: number
  rateLimit: {
    enabled: boolean
    maxRequests: number
    windowMs: number
  }
  endpoints: {
    auth: string
    users: string
    products: string
    orders: string
  }
  headers: Record<string, string>
}

// 資料庫配置
interface DatabaseConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
  ssl: boolean
  poolSize: number
  connectionTimeout: number
  queryTimeout: number
}

// 快取配置
interface CacheConfig {
  enabled: boolean
  type: 'memory' | 'redis' | 'memcached'
  host?: string
  port?: number
  ttl: number
  maxSize: number
  prefix: string
}

// 日誌配置
interface LoggingConfig {
  level: 'debug' | 'info' | 'warn' | 'error'
  format: 'json' | 'text'
  outputs: Array<'console' | 'file' | 'syslog'>
  file?: {
    path: string
    maxSize: string
    maxFiles: number
  }
  enableRequestLogging: boolean
  enableErrorTracking: boolean
}

// 安全配置
interface SecurityConfig {
  jwt: {
    secret: string
    expiresIn: string
    refreshExpiresIn: string
    algorithm: string
  }
  encryption: {
    algorithm: string
    keyLength: number
  }
  rateLimiting: {
    windowMs: number
    maxRequests: number
  }
  csrf: {
    enabled: boolean
    secret: string
  }
}

// 功能開關
interface FeatureFlags {
  enableNewUI: boolean
  enableAdvancedSearch: boolean
  enableSocialLogin: boolean
  enablePaymentGateway: boolean
  enableAnalytics: boolean
  enableNotifications: boolean
}

// 環境特定配置
type Environment = 'development' | 'testing' | 'staging' | 'production'

interface EnvironmentConfig extends BaseConfig {
  environment: Environment
}

// 配置驗證結果
interface ConfigValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}`

const configManagerCode = `// 型別安全的配置管理器
class ConfigManager {
  private config: EnvironmentConfig
  private validators: Map<string, (value: any) => boolean> = new Map()
  private listeners: Map<string, Function[]> = new Map()

  constructor(environment: Environment) {
    this.config = this.loadConfig(environment)
    this.setupValidators()
    this.validateConfig()
  }

  // 取得配置值
  get<K extends keyof EnvironmentConfig>(key: K): EnvironmentConfig[K] {
    return this.config[key]
  }

  // 取得巢狀配置值
  getPath<T = any>(path: string): T {
    const keys = path.split('.')
    let value: any = this.config

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key]
      } else {
        throw new Error(\`Configuration path '\${path}' not found\`)
      }
    }

    return value as T
  }

  // 檢查配置是否存在
  has(path: string): boolean {
    try {
      this.getPath(path)
      return true
    } catch {
      return false
    }
  }

  // 設定配置值（用於動態配置）
  set<K extends keyof EnvironmentConfig>(key: K, value: EnvironmentConfig[K]): void {
    const oldValue = this.config[key]
    this.config[key] = value

    // 通知監聽器
    this.notifyListeners(key as string, value, oldValue)
  }

  // 監聽配置變更
  onChange<K extends keyof EnvironmentConfig>(
    key: K,
    callback: (newValue: EnvironmentConfig[K], oldValue: EnvironmentConfig[K]) => void
  ): () => void {
    const keyStr = key as string
    if (!this.listeners.has(keyStr)) {
      this.listeners.set(keyStr, [])
    }

    this.listeners.get(keyStr)!.push(callback)

    // 回傳取消監聽的函數
    return () => {
      const callbacks = this.listeners.get(keyStr)
      if (callbacks) {
        const index = callbacks.indexOf(callback)
        if (index > -1) {
          callbacks.splice(index, 1)
        }
      }
    }
  }

  // 驗證配置
  validateConfig(): ConfigValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 驗證必要欄位
    if (!this.config.app.name) {
      errors.push('App name is required')
    }

    if (!this.config.api.baseUrl) {
      errors.push('API base URL is required')
    }

    // 驗證數值範圍
    if (this.config.app.port < 1 || this.config.app.port > 65535) {
      errors.push('Port must be between 1 and 65535')
    }

    if (this.config.api.timeout < 1000) {
      warnings.push('API timeout should be at least 1000ms')
    }

    // 自定義驗證器
    for (const [path, validator] of this.validators) {
      try {
        const value = this.getPath(path)
        if (!validator(value)) {
          errors.push(\`Invalid value for \${path}\`)
        }
      } catch {
        errors.push(\`Missing required configuration: \${path}\`)
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }

  // 註冊自定義驗證器
  addValidator(path: string, validator: (value: any) => boolean): void {
    this.validators.set(path, validator)
  }

  // 載入配置
  private loadConfig(environment: Environment): EnvironmentConfig {
    // 基礎配置
    const baseConfig = this.getBaseConfig()

    // 環境特定配置
    const envConfig = this.getEnvironmentConfig(environment)

    // 合併配置
    return this.mergeConfigs(baseConfig, envConfig)
  }

  private getBaseConfig(): Partial<EnvironmentConfig> {
    return {
      app: {
        name: 'TypeScript Tutorial',
        version: '1.0.0',
        environment: 'development',
        port: 3000,
        host: 'localhost',
        debug: true,
        cors: {
          enabled: true,
          origins: ['*'],
          credentials: false
        }
      },
      api: {
        baseUrl: '/api/v1',
        timeout: 10000,
        retries: 3,
        rateLimit: {
          enabled: false,
          maxRequests: 100,
          windowMs: 60000
        },
        endpoints: {
          auth: '/auth',
          users: '/users',
          products: '/products',
          orders: '/orders'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      features: {
        enableNewUI: false,
        enableAdvancedSearch: false,
        enableSocialLogin: false,
        enablePaymentGateway: false,
        enableAnalytics: false,
        enableNotifications: false
      }
    }
  }

  private getEnvironmentConfig(environment: Environment): Partial<EnvironmentConfig> {
    const configs = {
      development: {
        app: { debug: true, port: 3000 },
        api: { baseUrl: 'http://localhost:3001/api/v1' },
        features: { enableNewUI: true }
      },
      testing: {
        app: { debug: false, port: 3002 },
        api: { baseUrl: 'http://test-api.example.com/api/v1' }
      },
      staging: {
        app: { debug: false, port: 3003 },
        api: { baseUrl: 'https://staging-api.example.com/api/v1' }
      },
      production: {
        app: { debug: false, port: 80 },
        api: { baseUrl: 'https://api.example.com/api/v1' },
        features: { enableAnalytics: true }
      }
    }

    return configs[environment] || {}
  }

  private mergeConfigs(base: any, override: any): EnvironmentConfig {
    const merged = { ...base }

    for (const key in override) {
      if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
        merged[key] = this.mergeConfigs(merged[key] || {}, override[key])
      } else {
        merged[key] = override[key]
      }
    }

    return merged as EnvironmentConfig
  }

  private setupValidators(): void {
    // 設定內建驗證器
    this.addValidator('app.port', (port: number) => port > 0 && port <= 65535)
    this.addValidator('api.timeout', (timeout: number) => timeout > 0)
    this.addValidator('api.baseUrl', (url: string) => url.length > 0)
  }

  private notifyListeners(key: string, newValue: any, oldValue: any): void {
    const callbacks = this.listeners.get(key)
    if (callbacks) {
      callbacks.forEach(callback => callback(newValue, oldValue))
    }
  }
}`

const environments = [
    {
        id: 'development',
        title: '開發環境',
        code: `// 開發環境配置
const developmentConfig: Partial<EnvironmentConfig> = {
  app: {
    name: 'TypeScript Tutorial',
    version: '1.0.0',
    environment: 'development',
    port: 3000,
    host: 'localhost',
    debug: true,
    cors: {
      enabled: true,
      origins: ['http://localhost:3000', 'http://localhost:8080'],
      credentials: true
    }
  },
  api: {
    baseUrl: 'http://localhost:3001/api/v1',
    timeout: 15000,
    retries: 1,
    rateLimit: {
      enabled: false,
      maxRequests: 1000,
      windowMs: 60000
    },
    endpoints: {
      auth: '/auth',
      users: '/users',
      products: '/products',
      orders: '/orders'
    },
    headers: {
      'Content-Type': 'application/json',
      'X-Development': 'true'
    }
  },
  logging: {
    level: 'debug',
    format: 'text',
    outputs: ['console'],
    enableRequestLogging: true,
    enableErrorTracking: false
  },
  features: {
    enableNewUI: true,
    enableAdvancedSearch: true,
    enableSocialLogin: false,
    enablePaymentGateway: false,
    enableAnalytics: false,
    enableNotifications: true
  }
}`,
        explanation: '開發環境配置著重於除錯和開發便利性'
    },
    {
        id: 'production',
        title: '生產環境',
        code: `// 生產環境配置
const productionConfig: Partial<EnvironmentConfig> = {
  app: {
    name: 'TypeScript Tutorial',
    version: '1.0.0',
    environment: 'production',
    port: 80,
    host: '0.0.0.0',
    debug: false,
    cors: {
      enabled: true,
      origins: ['https://tutorial.example.com'],
      credentials: true
    }
  },
  api: {
    baseUrl: 'https://api.example.com/api/v1',
    timeout: 10000,
    retries: 3,
    rateLimit: {
      enabled: true,
      maxRequests: 100,
      windowMs: 60000
    },
    endpoints: {
      auth: '/auth',
      users: '/users',
      products: '/products',
      orders: '/orders'
    },
    headers: {
      'Content-Type': 'application/json',
      'X-API-Version': 'v1'
    }
  },
  logging: {
    level: 'warn',
    format: 'json',
    outputs: ['file', 'syslog'],
    file: {
      path: '/var/log/app.log',
      maxSize: '10m',
      maxFiles: 5
    },
    enableRequestLogging: false,
    enableErrorTracking: true
  },
  features: {
    enableNewUI: false,
    enableAdvancedSearch: true,
    enableSocialLogin: true,
    enablePaymentGateway: true,
    enableAnalytics: true,
    enableNotifications: true
  }
}`,
        explanation: '生產環境配置注重安全性、效能和穩定性'
    }
]

const configValidationCode = `// 配置驗證系統
interface ValidationRule<T = any> {
  field: string
  validator: (value: T) => boolean
  message: string
  level: 'error' | 'warning'
}

class ConfigValidator {
  private rules: ValidationRule[] = []

  // 添加驗證規則
  addRule<T>(rule: ValidationRule<T>): void {
    this.rules.push(rule)
  }

  // 驗證配置
  validate(config: EnvironmentConfig): ConfigValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    for (const rule of this.rules) {
      try {
        const value = this.getNestedValue(config, rule.field)
        const isValid = rule.validator(value)

        if (!isValid) {
          if (rule.level === 'error') {
            errors.push(rule.message)
          } else {
            warnings.push(rule.message)
          }
        }
      } catch (error) {
        if (rule.level === 'error') {
          errors.push(\`Field '\${rule.field}' is missing\`)
        } else {
          warnings.push(\`Field '\${rule.field}' is missing\`)
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }

  private getNestedValue(obj: any, path: string): any {
    const keys = path.split('.')
    let value = obj

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key]
      } else {
        throw new Error(\`Path '\${path}' not found\`)
      }
    }

    return value
  }
}

// 預設驗證規則
function createDefaultValidator(): ConfigValidator {
  const validator = new ConfigValidator()

  // 應用程式配置驗證
  validator.addRule({
    field: 'app.name',
    validator: (value: string) => typeof value === 'string' && value.length > 0,
    message: 'App name must be a non-empty string',
    level: 'error'
  })

  validator.addRule({
    field: 'app.port',
    validator: (value: number) => Number.isInteger(value) && value > 0 && value <= 65535,
    message: 'Port must be a valid integer between 1 and 65535',
    level: 'error'
  })

  // API 配置驗證
  validator.addRule({
    field: 'api.baseUrl',
    validator: (value: string) => {
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    },
    message: 'API base URL must be a valid URL',
    level: 'error'
  })

  validator.addRule({
    field: 'api.timeout',
    validator: (value: number) => value >= 1000 && value <= 60000,
    message: 'API timeout should be between 1000ms and 60000ms',
    level: 'warning'
  })

  // 安全配置驗證
  validator.addRule({
    field: 'security.jwt.secret',
    validator: (value: string) => value && value.length >= 32,
    message: 'JWT secret must be at least 32 characters long',
    level: 'error'
  })

  return validator
}`

const dynamicExamples = [
    {
        id: 'feature-flags',
        title: '功能開關',
        code: `// 動態功能開關系統
interface FeatureFlag {
  name: string
  enabled: boolean
  conditions?: FeatureCondition[]
  rolloutPercentage?: number
  validFrom?: Date
  validUntil?: Date
}

interface FeatureCondition {
  type: 'user' | 'region' | 'version' | 'custom'
  operator: 'equals' | 'in' | 'contains' | 'matches'
  value: any
}

class FeatureFlagManager {
  private flags: Map<string, FeatureFlag> = new Map()
  private userId?: string
  private userRegion?: string
  private appVersion?: string

  constructor(config: { userId?: string; userRegion?: string; appVersion?: string }) {
    this.userId = config.userId
    this.userRegion = config.userRegion
    this.appVersion = config.appVersion
  }

  // 設定功能開關
  setFlag(flag: FeatureFlag): void {
    this.flags.set(flag.name, flag)
  }

  // 檢查功能是否啟用
  isEnabled(flagName: string): boolean {
    const flag = this.flags.get(flagName)
    if (!flag) return false

    // 檢查基本啟用狀態
    if (!flag.enabled) return false

    // 檢查時間範圍
    if (flag.validFrom && new Date() < flag.validFrom) return false
    if (flag.validUntil && new Date() > flag.validUntil) return false

    // 檢查推出百分比
    if (flag.rolloutPercentage !== undefined) {
      const hash = this.hashUserId(this.userId || 'anonymous')
      if (hash % 100 >= flag.rolloutPercentage) return false
    }

    // 檢查條件
    if (flag.conditions) {
      return flag.conditions.every(condition => this.evaluateCondition(condition))
    }

    return true
  }

  private evaluateCondition(condition: FeatureCondition): boolean {
    let actualValue: any

    switch (condition.type) {
      case 'user':
        actualValue = this.userId
        break
      case 'region':
        actualValue = this.userRegion
        break
      case 'version':
        actualValue = this.appVersion
        break
      default:
        return true
    }

    switch (condition.operator) {
      case 'equals':
        return actualValue === condition.value
      case 'in':
        return Array.isArray(condition.value) && condition.value.includes(actualValue)
      case 'contains':
        return typeof actualValue === 'string' && actualValue.includes(condition.value)
      case 'matches':
        return typeof actualValue === 'string' && new RegExp(condition.value).test(actualValue)
      default:
        return false
    }
  }

  private hashUserId(userId: string): number {
    let hash = 0
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // 轉換為 32 位整數
    }
    return Math.abs(hash)
  }
}`,
        explanation: '實現靈活的功能開關系統，支援條件式啟用和段落推出'
    },
    {
        id: 'remote-config',
        title: '遠端配置',
        code: `// 遠端配置管理
interface RemoteConfigOptions {
  endpoint: string
  pollInterval: number
  cacheKey: string
  fallbackConfig: any
}

class RemoteConfigManager {
  private options: RemoteConfigOptions
  private config: any = {}
  private listeners: Function[] = []
  private pollTimer?: NodeJS.Timeout

  constructor(options: RemoteConfigOptions) {
    this.options = options
    this.loadFromCache()
    this.startPolling()
  }

  // 獲取配置值
  get<T = any>(key: string, defaultValue?: T): T {
    const keys = key.split('.')
    let value = this.config

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return defaultValue !== undefined ? defaultValue : this.getFallbackValue(key)
      }
    }

    return value as T
  }

  // 監聽配置變更
  onChange(callback: (newConfig: any, oldConfig: any) => void): () => void {
    this.listeners.push(callback)

    return () => {
      const index = this.listeners.indexOf(callback)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  // 手動刷新配置
  async refresh(): Promise<void> {
    try {
      const response = await fetch(this.options.endpoint, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      })

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
      }

      const newConfig = await response.json()
      const oldConfig = { ...this.config }

      this.config = newConfig
      this.saveToCache()

      // 通知監聽器
      this.listeners.forEach(listener => listener(newConfig, oldConfig))

    } catch (error) {
      console.error('Failed to fetch remote config:', error)
    }
  }

  // 停止自動刷新
  stop(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer)
      this.pollTimer = undefined
    }
  }

  private startPolling(): void {
    // 立即載入一次
    this.refresh()

    // 設定定期輪詢
    this.pollTimer = setInterval(() => {
      this.refresh()
    }, this.options.pollInterval)
  }

  private loadFromCache(): void {
    try {
      const cached = localStorage.getItem(this.options.cacheKey)
      if (cached) {
        this.config = JSON.parse(cached)
      }
    } catch (error) {
      console.warn('Failed to load config from cache:', error)
    }
  }

  private saveToCache(): void {
    try {
      localStorage.setItem(this.options.cacheKey, JSON.stringify(this.config))
    } catch (error) {
      console.warn('Failed to save config to cache:', error)
    }
  }

  private getFallbackValue(key: string): any {
    const keys = key.split('.')
    let value = this.options.fallbackConfig

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return undefined
      }
    }

    return value
  }
}`,
        explanation: '實現從遠端伺服器動態載入配置的管理系統'
    }
]

const usageExampleCode = `// 完整使用範例
// 1. 初始化配置管理
const configManager = new ConfigManager('development')

// 2. 驗證配置
const validation = configManager.validateConfig()
if (!validation.isValid) {
  console.error('Configuration errors:', validation.errors)
  process.exit(1)
}

if (validation.warnings.length > 0) {
  console.warn('Configuration warnings:', validation.warnings)
}

// 3. 使用配置
const apiConfig = configManager.get('api')
const dbConfig = configManager.get('database')
const features = configManager.get('features')

// 4. 設定功能開關
const featureFlags = new FeatureFlagManager({
  userId: 'user123',
  userRegion: 'US',
  appVersion: '1.0.0'
})

featureFlags.setFlag({
  name: 'newUI',
  enabled: true,
  rolloutPercentage: 50,
  conditions: [
    {
      type: 'region',
      operator: 'in',
      value: ['US', 'CA']
    }
  ]
})

// 5. 設定遠端配置
const remoteConfig = new RemoteConfigManager({
  endpoint: 'https://api.example.com/config',
  pollInterval: 60000, // 1 分鐘
  cacheKey: 'app-remote-config',
  fallbackConfig: {
    maxRetries: 3,
    timeout: 5000
  }
})

// 6. 在應用程式中使用
class ApiService {
  private client: AxiosInstance

  constructor() {
    const config = configManager.get('api')

    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: config.headers
    })

    // 監聽配置變更
    remoteConfig.onChange((newConfig) => {
      this.updateClientConfig(newConfig)
    })
  }

  async getUsers(): Promise<User[]> {
    // 檢查功能開關
    if (!featureFlags.isEnabled('newAPI')) {
      return this.getLegacyUsers()
    }

    // 使用遠端配置
    const maxRetries = remoteConfig.get('maxRetries', 3)
    const timeout = remoteConfig.get('timeout', 5000)

    // 執行 API 調用
    const response = await this.client.get('/users', {
      timeout,
      // 其他配置...
    })

    return response.data
  }

  private updateClientConfig(newConfig: any): void {
    if (newConfig.api) {
      this.client.defaults.timeout = newConfig.api.timeout
      this.client.defaults.baseURL = newConfig.api.baseUrl
    }
  }

  private async getLegacyUsers(): Promise<User[]> {
    // 舊版 API 實現
    return []
  }
}

// 7. 在 Vue 元件中使用
const apiService = new ApiService()

// 監聽配置變更並更新 UI
configManager.onChange('features', (newFeatures) => {
  // 更新 UI 狀態
  console.log('Features updated:', newFeatures)
})

export { configManager, featureFlags, remoteConfig, apiService }`

function runExample(code: string) {
    console.log('Running example:', code)
}

function completeSection() {
    emit('complete')
}
</script>

<style scoped>
.configuration-types {
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

.config-principles {
    margin-bottom: 3rem;
}

.config-principles h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.principles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.principle-card {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.principle-card h4 {
    margin-bottom: 0.75rem;
    color: #2d3748;
    font-size: 1.1rem;
}

.principle-card p {
    margin: 0;
    color: #4a5568;
    line-height: 1.5;
}

.config-types,
.config-manager,
.config-validation,
.practical-usage {
    margin-bottom: 3rem;
}

.config-types h3,
.config-manager h3,
.config-validation h3,
.practical-usage h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.environment-configs,
.dynamic-config {
    margin-bottom: 3rem;
}

.environment-configs h3,
.dynamic-config h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.env-tabs,
.dynamic-tabs {
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

.env-content,
.dynamic-content {
    border: 1px solid #cbd5e0;
    border-radius: 0 8px 8px 8px;
    background: white;
    padding: 1.5rem;
}

.security-practices {
    margin-bottom: 3rem;
}

.security-practices h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.security-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.security-card {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.security-card h4 {
    margin-bottom: 1rem;
    color: #2d3748;
}

.security-card ul {
    margin: 0;
    padding-left: 1.5rem;
}

.security-card li {
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

    .principles-grid,
    .security-grid {
        grid-template-columns: 1fr;
    }

    .env-tabs,
    .dynamic-tabs {
        flex-direction: column;
    }

    .tab-button {
        border-radius: 4px;
    }

    .env-content,
    .dynamic-content {
        border-radius: 8px;
    }
}
</style>
