import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

/**
 * 泛型基礎服務類別
 * 提供通用的 CRUD 操作，可被具體服務繼承
 */
export abstract class BaseApiService<T> {
  protected apiClient: AxiosInstance
  protected baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.apiClient = axios.create({
      baseURL: 'http://localhost:3001',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  /**
   * 設置請求和響應攔截器
   */
  private setupInterceptors(): void {
    // 請求攔截器
    this.apiClient.interceptors.request.use(
      (config) => {
        console.log(`📤 API 請求: ${config.method?.toUpperCase()} ${config.url}`)

        // 添加認證 token（如果存在）
        const token = localStorage.getItem('auth_token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // 添加請求 ID 用於追蹤
        if (config.headers) {
          config.headers['X-Request-ID'] =
            `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }

        return config
      },
      (error) => {
        console.error('📤 請求攔截器錯誤:', error)
        return Promise.reject(error)
      },
    )

    // 響應攔截器
    this.apiClient.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`📥 API 響應: ${response.status} ${response.config.url}`)
        return response
      },
      (error) => {
        console.error('📥 響應攔截器錯誤:', error)

        // 統一錯誤處理
        if (error.response?.status === 401) {
          console.warn('🔐 認證失效，需要重新登入')
          // 可以在這裡觸發登出邏輯
        }

        if (error.response?.status === 404) {
          console.warn('🔍 資源未找到')
        }

        return Promise.reject(error)
      },
    )
  }

  /**
   * 獲取所有資源
   */
  async getAll(params?: Record<string, string | number | boolean>): Promise<T[]> {
    const response: AxiosResponse<T[]> = await this.apiClient.get(this.baseUrl, { params })
    return response.data
  }

  /**
   * 根據 ID 獲取單個資源
   */
  async getById(id: string | number): Promise<T> {
    const response: AxiosResponse<T> = await this.apiClient.get(`${this.baseUrl}/${id}`)
    return response.data
  }

  /**
   * 創建新資源
   */
  async create<CreateRequest = Partial<T>>(data: CreateRequest): Promise<T> {
    const response: AxiosResponse<T> = await this.apiClient.post(this.baseUrl, data)
    return response.data
  }

  /**
   * 更新資源
   */
  async update<UpdateRequest = Partial<T>>(id: string | number, data: UpdateRequest): Promise<T> {
    const response: AxiosResponse<T> = await this.apiClient.put(`${this.baseUrl}/${id}`, data)
    return response.data
  }

  /**
   * 部分更新資源
   */
  async patch<PatchRequest = Partial<T>>(id: string | number, data: PatchRequest): Promise<T> {
    const response: AxiosResponse<T> = await this.apiClient.patch(`${this.baseUrl}/${id}`, data)
    return response.data
  }

  /**
   * 刪除資源
   */
  async delete(id: string | number): Promise<void> {
    await this.apiClient.delete(`${this.baseUrl}/${id}`)
  }

  /**
   * 批量刪除
   */
  async batchDelete(ids: (string | number)[]): Promise<void> {
    await this.apiClient.delete(this.baseUrl, { data: { ids } })
  }

  /**
   * 檢查資源是否存在
   */
  async exists(id: string | number): Promise<boolean> {
    try {
      await this.apiClient.head(`${this.baseUrl}/${id}`)
      return true
    } catch {
      return false
    }
  }
}
