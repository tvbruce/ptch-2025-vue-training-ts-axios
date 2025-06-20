import axios from 'axios'
import type { User, CreateUserRequest, UpdateUserRequest } from '@/types/api'

// 環境配置
const isDevelopment = import.meta.env.DEV
const useJSONServer = true // 設為 true 使用 JSON Server，false 使用 Mock

// 根據環境決定 baseURL
const getBaseURL = () => {
  if (isDevelopment && useJSONServer) {
    return 'http://localhost:3001' // JSON Server
  }
  return '/api' // 生產環境或其他 Mock 方式
}

// 創建 Axios 實例
export const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 請求攔截器
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API 請求: ${config.method?.toUpperCase()} ${config.url}`)

    // 這裡可以添加認證 token
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('❌ 請求錯誤:', error)
    return Promise.reject(error)
  },
)

// 響應攔截器
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API 響應: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error(
      `❌ 響應錯誤: ${error.response?.status} ${error.config?.url}`,
      error.response?.data,
    )

    if (error.response?.status === 401) {
      // 處理未授權
      console.log('🔐 未授權 - 請重新登入')
    }
    return Promise.reject(error)
  },
)

// 型別安全的 API 調用函數
export const userAPI = {
  // 獲取所有用戶
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get<User[]>('/users')
      return response.data
    } catch (error) {
      console.error('獲取用戶列表失敗:', error)
      throw error
    }
  },

  // 根據 ID 獲取單個用戶
  getUserById: async (id: number): Promise<User> => {
    try {
      const response = await apiClient.get<User>(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error(`獲取用戶 ${id} 失敗:`, error)
      throw error
    }
  },

  // 創建新用戶
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    try {
      const response = await apiClient.post<User>('/users', userData)
      return response.data
    } catch (error) {
      console.error('創建用戶失敗:', error)
      throw error
    }
  },

  // 更新用戶
  updateUser: async (id: number, userData: UpdateUserRequest): Promise<User> => {
    try {
      const response = await apiClient.put<User>(`/users/${id}`, userData)
      return response.data
    } catch (error) {
      console.error(`更新用戶 ${id} 失敗:`, error)
      throw error
    }
  },

  // 刪除用戶
  deleteUser: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/users/${id}`)
      console.log(`✅ 用戶 ${id} 已刪除`)
    } catch (error) {
      console.error(`刪除用戶 ${id} 失敗:`, error)
      throw error
    }
  },
}

// 測試用的模擬 API 調用
export const testAPI = {
  // 測試成功請求
  testSuccess: async () => {
    return await userAPI.getUsers()
  },

  // 測試 404 錯誤
  test404: async () => {
    try {
      await apiClient.get('/nonexistent')
    } catch (error) {
      throw new Error(`404 測試成功: ${error}`)
    }
  },

  // 測試超時
  testTimeout: async () => {
    try {
      const response = await apiClient.get('/posts', { timeout: 100 }) // 極短超時
      return response.data
    } catch (error) {
      throw new Error(`超時測試: ${error}`)
    }
  },

  // 測試創建用戶
  testCreateUser: async () => {
    const testUser: CreateUserRequest = {
      name: `測試用戶 ${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      role: 'user',
    }
    return await userAPI.createUser(testUser)
  },
}

// 通用 API 調用函數（保持向後兼容）
export async function fetchData<T>(url: string): Promise<T> {
  const response = await apiClient.get<T>(url)
  return response.data
}

export async function postData<T, D>(url: string, data: D): Promise<T> {
  const response = await apiClient.post<T>(url, data)
  return response.data
}

export async function putData<T, D>(url: string, data: D): Promise<T> {
  const response = await apiClient.put<T>(url, data)
  return response.data
}

export async function deleteData<T>(url: string): Promise<T> {
  const response = await apiClient.delete<T>(url)
  return response.data
}

// 環境資訊導出
export const apiConfig = {
  baseURL: getBaseURL(),
  isDevelopment,
  useJSONServer,
  environment: isDevelopment ? 'development' : 'production',
}
