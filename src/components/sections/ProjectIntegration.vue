<template>
    <div class="project-integration">
        <div class="section-intro">
            <h2>🚀 實戰項目整合 - 員工管理系統</h2>
            <p class="section-description">
                透過完整的員工管理系統實作，掌握 TypeScript + Axios 在企業級應用中的最佳實踐。
                本章節將帶您從零開始建立一個具有完整 CRUD 功能的系統。
            </p>
        </div>

        <!-- 專案概述 -->
        <div class="content-section">
            <h3>📋 專案說明</h3>
            <div class="project-overview">
                <p>
                    您將實作一個員工管理系統，這是企業應用中最常見的場景。
                    系統包含員工資料管理、部門關聯、搜尋篩選等核心功能。
                </p>

                <div class="feature-list">
                    <h4>🎯 系統功能</h4>
                    <ul>
                        <li>✅ 員工 CRUD 操作（新增、查詢、編輯、刪除）</li>
                        <li>✅ 部門管理與員工部門關聯</li>
                        <li>✅ 搜尋與篩選功能</li>
                        <li>✅ 分頁瀏覽與排序</li>
                        <li>✅ 表單驗證與錯誤處理</li>
                        <li>✅ 載入狀態管理</li>
                    </ul>
                </div>
            </div>
        </div>

            <!-- 環境準備 -->
    <div class="content-section">
      <h3>🏁 環境準備</h3>
      <div class="setup-instructions">
        <div class="step-card">
          <h4>一鍵啟動開發環境</h4>
          <CodeBlock
            title="啟動完整開發環境"
            language="bash"
            :code="setupEnvironmentCode"
            explanation="同時啟動 JSON Server (API) 和 Vue 開發伺服器，自動配置代理設定"
          />
        </div>

        <div class="step-card">
          <h4>驗證環境</h4>
          <CodeBlock
            title="檢查服務狀態"
            language="bash"
            :code="verifyEnvironmentCode"
            explanation="確認前端和 API 服務都正常運行"
          />
        </div>
      </div>
    </div>

        <!-- 任務 1：型別定義 -->
        <div class="content-section">
            <h3>📝 任務 1：建立型別定義 (30 分鐘)</h3>

            <div class="task-section">
                <h4>1.1 員工型別定義 (src/types/employee.ts)</h4>
                <p>首先建立核心的員工資料結構：</p>

                <CodeBlock
                    title="Employee 介面定義"
                    language="typescript"
                    :code="employeeTypeCode"
                    explanation="定義員工的完整資料結構，包含所有必要欄位和型別約束"
                />

                <CodeBlock
                    title="員工搜尋參數型別"
                    language="typescript"
                    :code="searchParamsCode"
                    explanation="支援多種搜尋條件，包含 JSON Server 特殊查詢參數"
                />
            </div>

            <div class="task-section">
                <h4>1.2 表單型別定義 (src/types/forms.ts)</h4>

                <CodeBlock
                    title="表單型別定義"
                    language="typescript"
                    :code="formTypesCode"
                    explanation="定義表單資料結構和驗證相關型別"
                />
            </div>

            <div class="task-section">
                <h4>1.3 API 響應型別 (src/types/api.ts)</h4>

                <CodeBlock
                    title="API 響應型別"
                    language="typescript"
                    :code="apiTypesCode"
                    explanation="定義 API 響應格式和分頁資料結構"
                />
            </div>
        </div>

        <!-- 任務 2：API 服務實作 -->
        <div class="content-section">
            <h3>🔧 任務 2：API 服務實作 (45 分鐘)</h3>

            <div class="task-section">
                <h4>2.1 基礎 API 客戶端 (src/services/base.service.ts)</h4>

                <CodeBlock
                    title="基礎 API 服務類別"
                    language="typescript"
                    :code="baseServiceCode"
                    explanation="建立泛型 API 服務基類，提供型別安全的 HTTP 操作"
                />
            </div>

            <div class="task-section">
                <h4>2.2 員工服務實作 (src/services/employee.service.ts)</h4>

                <CodeBlock
                    title="員工服務完整實作"
                    language="typescript"
                    :code="employeeServiceCode"
                    explanation="實作員工相關的所有 CRUD 操作，包含搜尋、篩選等進階功能"
                />
            </div>
        </div>

        <!-- 任務 3：Composable 實作 -->
        <div class="content-section">
            <h3>🎨 任務 3：Composable 實作 (45 分鐘)</h3>

            <div class="task-section">
                <h4>3.1 員工資料管理 Composable (src/composables/useEmployees.ts)</h4>

                <CodeBlock
                    title="useEmployees Composable - 狀態定義"
                    language="typescript"
                    :code="composableStateCode"
                    explanation="定義響應式狀態，包含資料、載入狀態、錯誤狀態等"
                />

                <CodeBlock
                    title="useEmployees Composable - 方法實作"
                    language="typescript"
                    :code="composableMethodsCode"
                    explanation="實作資料操作方法，包含完整的錯誤處理和狀態管理"
                />
            </div>
        </div>

        <!-- API 測試指南 -->
        <div class="content-section">
            <h3>🧪 API 測試指南</h3>

            <div class="api-testing">
                <h4>基本 CRUD 操作測試</h4>
                <CodeBlock
                    title="API 測試範例"
                    language="bash"
                    :code="apiTestingCode"
                    explanation="使用 curl 或瀏覽器開發工具測試 API 功能"
                />

                <h4>進階查詢測試</h4>
                <CodeBlock
                    title="搜尋與篩選 API"
                    language="bash"
                    :code="advancedQueryCode"
                    explanation="測試複雜的搜尋、篩選、分頁和排序功能"
                />
            </div>
        </div>

        <!-- 常見問題解決 -->
        <div class="content-section">
            <h3>🔧 常見問題解決</h3>

            <div class="troubleshooting">
                <div class="problem-section">
                    <h4>TypeScript 編譯錯誤</h4>
                    <ul>
                        <li><strong>問題</strong>：Property 'xxx' does not exist on type 'Employee'</li>
                        <li><strong>解決</strong>：檢查型別定義是否完整，確保所有必要欄位都已定義</li>
                    </ul>

                    <ul>
                        <li><strong>問題</strong>：Type 'xxx' is not assignable to type 'yyy'</li>
                        <li><strong>解決</strong>：檢查型別匹配，特別注意聯合型別和可選屬性</li>
                    </ul>
                </div>

                <div class="problem-section">
                    <h4>API 呼叫問題</h4>
                    <ul>
                        <li><strong>問題</strong>：網路錯誤或 404</li>
                        <li><strong>解決</strong>：確認 JSON Server 運行在 port 3001，檢查 API URL 路徑</li>
                    </ul>

                    <ul>
                        <li><strong>問題</strong>：CORS 錯誤</li>
                        <li><strong>解決</strong>：檢查 vite.config.ts 中的 proxy 設定</li>
                    </ul>
                </div>

                <div class="problem-section">
                    <h4>響應式狀態問題</h4>
                    <ul>
                        <li><strong>問題</strong>：資料更新但畫面未重新渲染</li>
                        <li><strong>解決</strong>：確認使用 ref() 包裝資料，正確更新 .value 屬性</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 完成檢查清單 -->
        <div class="content-section">
            <h3>✅ 完成檢查清單</h3>

            <div class="checklist">
                <div class="checklist-section">
                    <h4>型別定義</h4>
                    <ul class="checkbox-list">
                        <li>□ Employee 介面包含所有必要欄位</li>
                        <li>□ EmployeeSearchParams 支援各種查詢參數</li>
                        <li>□ CreateEmployeeForm 和 UpdateEmployeeForm 正確定義</li>
                        <li>□ 使用聯合型別限制 status 欄位值</li>
                        <li>□ 使用 keyof 和型別引用</li>
                    </ul>
                </div>

                <div class="checklist-section">
                    <h4>API 服務</h4>
                    <ul class="checkbox-list">
                        <li>□ 所有 CRUD 操作方法都已實作</li>
                        <li>□ 正確使用泛型指定回傳和請求型別</li>
                        <li>□ URL 路徑和 HTTP 方法正確對應</li>
                        <li>□ 查詢參數正確傳遞</li>
                    </ul>
                </div>

                <div class="checklist-section">
                    <h4>Composable</h4>
                    <ul class="checkbox-list">
                        <li>□ 響應式狀態正確定義</li>
                        <li>□ 載入和錯誤狀態完整處理</li>
                        <li>□ 計算屬性按預期工作</li>
                        <li>□ 陣列操作正確更新本地狀態</li>
                    </ul>
                </div>

                <div class="checklist-section">
                    <h4>功能測試</h4>
                    <ul class="checkbox-list">
                        <li>□ 員工列表正確載入和顯示</li>
                        <li>□ 搜尋和篩選功能正常</li>
                        <li>□ 新增員工成功</li>
                        <li>□ 編輯員工資料更新正確</li>
                        <li>□ 刪除功能正常</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 進階挑戰 -->
        <div class="content-section">
            <h3>🚀 進階挑戰</h3>

            <div class="advanced-challenges">
                <div class="challenge-card">
                    <h4>🔍 表單驗證</h4>
                    <ul>
                        <li>實作 email 格式驗證</li>
                        <li>加入必填欄位檢查</li>
                        <li>建立驗證規則組合</li>
                    </ul>
                </div>

                <div class="challenge-card">
                    <h4>🔄 錯誤重試機制</h4>
                    <ul>
                        <li>API 失敗自動重試</li>
                        <li>指數退避策略</li>
                        <li>重試次數限制</li>
                    </ul>
                </div>

                <div class="challenge-card">
                    <h4>💾 離線支援</h4>
                    <ul>
                        <li>localStorage 資料快取</li>
                        <li>網路狀態偵測</li>
                        <li>離線資料同步</li>
                    </ul>
                </div>

                <div class="challenge-card">
                    <h4>⚡ 效能優化</h4>
                    <ul>
                        <li>虛擬滾動實作</li>
                        <li>防抖搜尋</li>
                        <li>computed 記憶化</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 學習總結 -->
        <div class="content-section">
            <h3>📚 學習總結</h3>

            <div class="learning-summary">
                <div class="summary-card">
                    <h4>TypeScript 核心技能</h4>
                    <ul>
                        <li>介面定義和型別註解</li>
                        <li>聯合型別和條件型別</li>
                        <li>泛型的實際應用</li>
                        <li>型別引用和 keyof 操作符</li>
                    </ul>
                </div>

                <div class="summary-card">
                    <h4>Axios 整合技能</h4>
                    <ul>
                        <li>HTTP 客戶端設定</li>
                        <li>RESTful API 呼叫</li>
                        <li>請求和響應型別安全</li>
                        <li>錯誤處理策略</li>
                    </ul>
                </div>

                <div class="summary-card">
                    <h4>Vue 3 整合技能</h4>
                    <ul>
                        <li>Composition API 與 TypeScript 整合</li>
                        <li>響應式狀態管理</li>
                        <li>計算屬性和監聽器</li>
                        <li>元件間的型別安全通信</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

// 環境設定代碼
const setupEnvironmentCode = ref(`# 一鍵啟動完整開發環境
npm run start

# 此命令會同時啟動：
# - JSON Server (API 服務) - Port 3001
# - Vue 開發伺服器 - Port 5173
# - 自動設定 API 代理到 /api`)

const verifyEnvironmentCode = ref(`# 驗證服務運行狀態

# 前端服務：
# http://localhost:5173

# API 服務：
# http://localhost:3001/api/employees

# 測試 API 是否正常：
curl http://localhost:3001/api/employees

# 或在瀏覽器中查看 API 文檔：
# http://localhost:3001/api`)

// 型別定義代碼
const employeeTypeCode = ref(`// src/types/employee.ts
export interface Employee {
  id: number                    // 員工 ID
  name: string                  // 員工姓名
  email: string                 // 電子郵件
  phone: string                 // 電話號碼
  position: string              // 職位
  departmentId: number          // 部門 ID
  salary: number                // 薪資
  hireDate: string              // 到職日期
  status: 'active' | 'inactive' | 'terminated'  // 員工狀態
  avatar?: string               // 頭像 URL（可選）
}

// 部門介面
export interface Department {
  id: number
  name: string
  description?: string
}`)

const searchParamsCode = ref(`// 員工搜尋參數介面
export interface EmployeeSearchParams {
  // 基本搜尋參數
  name?: string                      // 姓名搜尋
  departmentId?: number              // 部門篩選
  status?: Employee['status']        // 狀態篩選（引用 Employee 的 status 型別）
  page?: number                      // 頁碼
  limit?: number                     // 每頁數量
  sortBy?: keyof Employee            // 排序欄位（使用 keyof 獲取所有鍵）
  sortOrder?: 'asc' | 'desc'         // 排序方向

  // JSON Server 特殊查詢參數
  name_like?: string                 // 模糊搜尋姓名
  position_like?: string             // 模糊搜尋職位
  salary_gte?: number               // 薪資大於等於
  salary_lte?: number               // 薪資小於等於
  hireDate_gte?: string             // 入職日期大於等於
  hireDate_lte?: string             // 入職日期小於等於
  q?: string                        // 全文搜尋
  _page?: number                    // JSON Server 分頁
  _limit?: number                   // JSON Server 每頁數量
  _sort?: string                    // JSON Server 排序欄位
  _order?: 'asc' | 'desc'           // JSON Server 排序方向
}`)

const formTypesCode = ref(`// src/types/forms.ts
export interface CreateEmployeeForm {
  name: string
  email: string
  phone: string
  position: string
  departmentId: number
  salary: number
  hireDate: string
  status: 'active' | 'inactive' | 'terminated'
}

// 使用 Partial 讓所有欄位變為可選，但 id 必須提供
export interface UpdateEmployeeForm extends Partial<CreateEmployeeForm> {
  id: number  // 更新時必須提供 ID
}

// 表單驗證錯誤
export interface FormValidationError {
  field: string    // 錯誤欄位名稱
  message: string  // 錯誤訊息
}

// 驗證結果
export interface ValidationResult {
  isValid: boolean                 // 是否通過驗證
  errors: FormValidationError[]    // 驗證錯誤列表
}`)

const apiTypesCode = ref(`// src/types/api.ts
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  timestamp: string
}

// 分頁資訊
export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

// 帶分頁的 API 響應
export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationInfo
}

// 錯誤型別
export interface AppError {
  message: string
  code?: string
  status?: number
  details?: unknown
}

// 型別安全的 API 客戶端介面
export interface TypeSafeApiClient {
  get<T>(url: string, params?: Record<string, unknown>): Promise<T>
  post<T, U>(url: string, data: U): Promise<T>
  put<T, U>(url: string, data: U): Promise<T>
  patch<T, U>(url: string, data: U): Promise<T>
  delete<T>(url: string): Promise<T>
  getWithPagination<T>(url: string, params?: Record<string, unknown>): Promise<PaginatedResponse<T>>
}`)

const baseServiceCode = ref(`// src/services/base.service.ts
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import type { TypeSafeApiClient, PaginatedResponse, AppError } from '@/types/api'

export abstract class BaseApiService implements TypeSafeApiClient {
  protected client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // 請求攔截器
    this.client.interceptors.request.use(
      (config) => {
        console.log(\`🔄 API Request: \${config.method?.toUpperCase()} \${config.url}\`)
        return config
      },
      (error) => {
        console.error('❌ Request Error:', error)
        return Promise.reject(this.handleError(error))
      }
    )

    // 響應攔截器
    this.client.interceptors.response.use(
      (response) => {
        console.log(\`✅ API Response: \${response.status} \${response.config.url}\`)
        return response
      },
      (error) => {
        console.error('❌ Response Error:', error.response?.status, error.message)
        return Promise.reject(this.handleError(error))
      }
    )
  }

  private handleError(error: any): AppError {
    if (error.response) {
      // 伺服器回應錯誤
      return {
        message: error.response.data?.message || \`HTTP Error \${error.response.status}\`,
        code: error.response.data?.code,
        status: error.response.status,
        details: error.response.data
      }
    } else if (error.request) {
      // 網路錯誤
      return {
        message: '網路連線錯誤，請檢查網路設定',
        code: 'NETWORK_ERROR'
      }
    } else {
      // 其他錯誤
      return {
        message: error.message || '發生未知錯誤',
        code: 'UNKNOWN_ERROR'
      }
    }
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, { params })
    return response.data
  }

  async post<T, U>(url: string, data: U): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data)
    return response.data
  }

  async put<T, U>(url: string, data: U): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data)
    return response.data
  }

  async patch<T, U>(url: string, data: U): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data)
    return response.data
  }

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url)
    return response.data
  }

  async getWithPagination<T>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<PaginatedResponse<T>> {
    const response = await this.client.get(url, { params })

    // JSON Server 在 headers 中提供分頁資訊
    const total = parseInt(response.headers['x-total-count'] || '0')
    const page = parseInt(params?._page as string || '1')
    const limit = parseInt(params?._limit as string || '10')

    return {
      data: response.data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  }
}`)

const employeeServiceCode = ref(`// src/services/employee.service.ts
import { BaseApiService } from './base.service'
import type {
  Employee,
  EmployeeSearchParams,
  CreateEmployeeForm,
  UpdateEmployeeForm
} from '@/types'

export class EmployeeService extends BaseApiService {
  // 1. 獲取員工列表（支援分頁和搜尋）
  async getEmployees(params?: EmployeeSearchParams) {
    return this.getWithPagination<Employee>('/employees', params as Record<string, unknown>)
  }

  // 2. 獲取單個員工
  async getEmployee(id: number): Promise<Employee> {
    return this.get<Employee>(\`/employees/\${id}\`)
  }

  // 3. 創建新員工
  async createEmployee(data: CreateEmployeeForm): Promise<Employee> {
    return this.post<Employee, CreateEmployeeForm>('/employees', data)
  }

  // 4. 更新員工資料
  async updateEmployee(data: UpdateEmployeeForm): Promise<Employee> {
    return this.put<Employee, UpdateEmployeeForm>(\`/employees/\${data.id}\`, data)
  }

  // 5. 部分更新員工
  async patchEmployee(id: number, data: Partial<Employee>): Promise<Employee> {
    return this.patch<Employee, Partial<Employee>>(\`/employees/\${id}\`, data)
  }

  // 6. 刪除員工
  async deleteEmployee(id: number): Promise<void> {
    return this.delete<void>(\`/employees/\${id}\`)
  }

  // 7. 搜尋員工
  async searchEmployees(query: string): Promise<Employee[]> {
    return this.get<Employee[]>('/employees', { q: query })
  }

  // 8. 根據部門獲取員工
  async getEmployeesByDepartment(departmentId: number): Promise<Employee[]> {
    return this.get<Employee[]>('/employees', { departmentId })
  }

  // 9. 根據狀態獲取員工
  async getEmployeesByStatus(status: Employee['status']): Promise<Employee[]> {
    return this.get<Employee[]>('/employees', { status })
  }

  // 10. 軟刪除員工（推薦方式）
  async terminateEmployee(id: number): Promise<Employee> {
    return this.patchEmployee(id, { status: 'terminated' })
  }

  // 11. 重新啟用員工
  async activateEmployee(id: number): Promise<Employee> {
    return this.patchEmployee(id, { status: 'active' })
  }
}

// 匯出服務實例
export const employeeService = new EmployeeService()`)

const composableStateCode = ref(`// src/composables/useEmployees.ts
import { ref, computed } from 'vue'
import type {
  Employee,
  EmployeeSearchParams,
  CreateEmployeeForm,
  UpdateEmployeeForm,
  AppError
} from '@/types'
import { employeeService } from '@/services'

export function useEmployees() {
  // === 響應式狀態定義 ===
  const employees = ref<Employee[]>([])
  const currentEmployee = ref<Employee | null>(null)
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  // === 載入狀態 ===
  const employeesLoading = ref(false)
  const employeeLoading = ref(false)
  const createLoading = ref(false)
  const updateLoading = ref(false)
  const deleteLoading = ref(false)

  // === 錯誤狀態 ===
  const employeesError = ref<AppError | null>(null)
  const employeeError = ref<AppError | null>(null)
  const createError = ref<AppError | null>(null)
  const updateError = ref<AppError | null>(null)
  const deleteError = ref<AppError | null>(null)

  // === 計算屬性 ===
  const activeEmployees = computed(() =>
    employees.value.filter(emp => emp.status === 'active')
  )

  const isLoading = computed(() =>
    employeesLoading.value ||
    employeeLoading.value ||
    createLoading.value ||
    updateLoading.value ||
    deleteLoading.value
  )

  const hasError = computed(() =>
    employeesError.value ||
    employeeError.value ||
    createError.value ||
    updateError.value ||
    deleteError.value
  )`)

const composableMethodsCode = ref(`  // === 1. 獲取員工列表 ===
  const fetchEmployees = async (params?: EmployeeSearchParams) => {
    try {
      employeesLoading.value = true    // 設置載入狀態
      employeesError.value = null      // 清除錯誤

      const result = await employeeService.getEmployees(params)
      employees.value = result.data    // 更新員工列表
      pagination.value = result.pagination  // 更新分頁資訊
    } catch (error) {
      employeesError.value = error as AppError
    } finally {
      employeesLoading.value = false   // 重置載入狀態
    }
  }

  // === 2. 獲取單個員工 ===
  const fetchEmployee = async (id: number) => {
    try {
      employeeLoading.value = true
      employeeError.value = null

      const employee = await employeeService.getEmployee(id)
      currentEmployee.value = employee
      return employee
    } catch (error) {
      employeeError.value = error as AppError
      throw error  // 重新拋出錯誤供調用者處理
    } finally {
      employeeLoading.value = false
    }
  }

  // === 3. 創建員工 ===
  const createEmployee = async (data: CreateEmployeeForm) => {
    try {
      createLoading.value = true
      createError.value = null

      const newEmployee = await employeeService.createEmployee(data)
      employees.value.unshift(newEmployee)  // 添加到列表開頭
      return newEmployee
    } catch (error) {
      createError.value = error as AppError
      throw error
    } finally {
      createLoading.value = false
    }
  }

  // === 4. 更新員工 ===
  const updateEmployee = async (data: UpdateEmployeeForm) => {
    try {
      updateLoading.value = true
      updateError.value = null

      const updatedEmployee = await employeeService.updateEmployee(data)

      // 更新列表中的員工資料
      const index = employees.value.findIndex(emp => emp.id === data.id)
      if (index !== -1) {
        employees.value[index] = updatedEmployee
      }

      // 更新當前員工（如果是同一個）
      if (currentEmployee.value?.id === data.id) {
        currentEmployee.value = updatedEmployee
      }

      return updatedEmployee
    } catch (error) {
      updateError.value = error as AppError
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  // === 5. 刪除員工 ===
  const deleteEmployee = async (id: number) => {
    try {
      deleteLoading.value = true
      deleteError.value = null

      await employeeService.deleteEmployee(id)

      // 從列表中移除
      employees.value = employees.value.filter(emp => emp.id !== id)

      // 清除當前員工（如果是同一個）
      if (currentEmployee.value?.id === id) {
        currentEmployee.value = null
      }
    } catch (error) {
      deleteError.value = error as AppError
      throw error
    } finally {
      deleteLoading.value = false
    }
  }

  // === 回傳介面 ===
  return {
    // 狀態
    employees,
    currentEmployee,
    pagination,

    // 載入狀態
    employeesLoading,
    employeeLoading,
    createLoading,
    updateLoading,
    deleteLoading,

    // 錯誤狀態
    employeesError,
    employeeError,
    createError,
    updateError,
    deleteError,

    // 方法
    fetchEmployees,
    fetchEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,

    // 計算屬性
    activeEmployees,
    isLoading,
    hasError
  }
}`)

const apiTestingCode = ref(`# 1. 獲取所有員工
GET http://localhost:3001/api/employees

# 2. 獲取單個員工
GET http://localhost:3001/api/employees/1

# 3. 創建員工
POST http://localhost:3001/api/employees
Content-Type: application/json

{
  "name": "測試員工",
  "email": "test@example.com",
  "phone": "0912-345-678",
  "position": "測試工程師",
  "departmentId": 1,
  "salary": 50000,
  "hireDate": "2024-01-01",
  "status": "active"
}

# 4. 更新員工
PUT http://localhost:3001/api/employees/1
Content-Type: application/json

{
  "id": 1,
  "name": "更新的員工",
  "email": "updated@example.com",
  "phone": "0912-345-678",
  "position": "高級工程師",
  "departmentId": 1,
  "salary": 60000,
  "hireDate": "2024-01-01",
  "status": "active"
}

# 5. 刪除員工
DELETE http://localhost:3001/api/employees/1`)

const advancedQueryCode = ref(`# 1. 姓名模糊搜尋
GET http://localhost:3001/api/employees?name_like=張

# 2. 職位模糊搜尋
GET http://localhost:3001/api/employees?position_like=工程師

# 3. 部門篩選
GET http://localhost:3001/api/employees?departmentId=1

# 4. 狀態篩選
GET http://localhost:3001/api/employees?status=active

# 5. 薪資範圍查詢
GET http://localhost:3001/api/employees?salary_gte=40000&salary_lte=80000

# 6. 入職日期範圍
GET http://localhost:3001/api/employees?hireDate_gte=2024-01-01&hireDate_lte=2024-12-31

# 7. 分頁查詢
GET http://localhost:3001/api/employees?_page=1&_limit=5

# 8. 排序查詢
GET http://localhost:3001/api/employees?_sort=salary&_order=desc

# 9. 複合查詢（部門 + 狀態 + 分頁 + 排序）
GET http://localhost:3001/api/employees?departmentId=1&status=active&_page=1&_limit=10&_sort=hireDate&_order=desc

# 10. 全文搜尋
GET http://localhost:3001/api/employees?q=張`)
</script>

<style scoped>
.project-integration {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.section-intro {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
}

.section-intro h2 {
    margin: 0 0 1rem 0;
    font-size: 2.5rem;
    font-weight: 700;
}

.section-description {
    font-size: 1.125rem;
    margin: 0;
    opacity: 0.95;
}

.content-section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-section h3 {
    margin: 0 0 1.5rem 0;
    font-size: 1.75rem;
    font-weight: 600;
    color: #2d3748;
    border-bottom: 3px solid #4299e1;
    padding-bottom: 0.5rem;
}

.project-overview {
    background: #f7fafc;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #4299e1;
}

.feature-list h4 {
    margin: 1.5rem 0 1rem 0;
    color: #2d3748;
    font-size: 1.25rem;
}

.feature-list ul {
    list-style: none;
    padding: 0;
}

.feature-list li {
    padding: 0.5rem 0;
    font-size: 1rem;
    color: #4a5568;
}

.step-card {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border-left: 4px solid #48bb78;
}

.step-card h4 {
    margin: 0 0 1rem 0;
    color: #2d3748;
    font-size: 1.25rem;
}

.task-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #ed8936;
}

.task-section h4 {
    margin: 0 0 1rem 0;
    color: #2d3748;
    font-size: 1.25rem;
}

.api-testing {
    background: #f0fff4;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #38a169;
}

.troubleshooting {
    background: #fffaf0;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #ed8936;
}

.problem-section {
    margin-bottom: 1.5rem;
}

.problem-section h4 {
    margin: 0 0 1rem 0;
    color: #2d3748;
    font-size: 1.125rem;
}

.problem-section ul {
    margin: 0.5rem 0;
}

.problem-section li {
    margin: 0.5rem 0;
}

.checklist {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.checklist-section {
    background: #f7fafc;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #38a169;
}

.checklist-section h4 {
    margin: 0 0 1rem 0;
    color: #2d3748;
    font-size: 1.125rem;
}

.checkbox-list {
    list-style: none;
    padding: 0;
}

.checkbox-list li {
    padding: 0.25rem 0;
    font-size: 0.875rem;
    color: #4a5568;
}

.advanced-challenges {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.challenge-card {
    background: #edf2f7;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #805ad5;
}

.challenge-card h4 {
    margin: 0 0 1rem 0;
    color: #2d3748;
    font-size: 1.125rem;
}

.challenge-card ul {
    margin: 0;
    padding-left: 1rem;
}

.challenge-card li {
    margin: 0.25rem 0;
    font-size: 0.875rem;
    color: #4a5568;
}

.learning-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.summary-card {
    background: #f0fff4;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #38a169;
}

.summary-card h4 {
    margin: 0 0 1rem 0;
    color: #2d3748;
    font-size: 1.125rem;
}

.summary-card ul {
    margin: 0;
    padding-left: 1rem;
}

.summary-card li {
    margin: 0.25rem 0;
    font-size: 0.875rem;
    color: #4a5568;
}

@media (max-width: 768px) {
    .project-integration {
        padding: 1rem;
    }

    .section-intro {
        padding: 1.5rem;
    }

    .section-intro h2 {
        font-size: 2rem;
    }

    .content-section {
        padding: 1.5rem;
    }

    .checklist,
    .advanced-challenges,
    .learning-summary {
        grid-template-columns: 1fr;
    }
}
</style>
