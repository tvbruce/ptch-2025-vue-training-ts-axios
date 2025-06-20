// MSW 設定文件
import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import type { User, ApiResponse, CreateUserRequest, UpdateUserRequest } from '@/types/api'

// 模擬用戶資料
const mockUsers: User[] = [
  {
    id: 1,
    name: 'MSW User 1',
    email: 'msw1@example.com',
    role: 'user',
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 2,
    name: 'MSW User 2',
    email: 'msw2@example.com',
    role: 'manager',
    createdAt: '2024-01-02T11:00:00Z',
  },
  {
    id: 3,
    name: 'MSW Admin',
    email: 'admin@msw.com',
    role: 'admin',
    createdAt: '2024-01-03T12:00:00Z',
  },
]

// 定義請求處理器
export const handlers = [
  // 獲取用戶列表
  http.get('/api/msw/users', async ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const limit = url.searchParams.get('limit')

    let users = mockUsers

    if (page && limit) {
      const pageNum = parseInt(page, 10)
      const limitNum = parseInt(limit, 10)
      const start = (pageNum - 1) * limitNum
      const end = start + limitNum
      users = mockUsers.slice(start, end)
    }

    await new Promise((resolve) => setTimeout(resolve, 300)) // 模擬網路延遲

    return HttpResponse.json<ApiResponse<User[]>>({
      data: users,
      message: 'Users fetched successfully from MSW',
      success: true,
      timestamp: new Date().toISOString(),
    })
  }),

  // 獲取單個用戶
  http.get('/api/msw/users/:id', async ({ params }) => {
    const { id } = params
    const user = mockUsers.find((u) => u.id === Number(id))

    if (!user) {
      return HttpResponse.json(
        {
          message: `User with id ${id} not found`,
          success: false,
          timestamp: new Date().toISOString(),
        },
        { status: 404 },
      )
    }

    await new Promise((resolve) => setTimeout(resolve, 200))

    return HttpResponse.json<ApiResponse<User>>({
      data: user,
      message: 'User fetched successfully from MSW',
      success: true,
      timestamp: new Date().toISOString(),
    })
  }),

  // 創建新用戶
  http.post('/api/msw/users', async ({ request }) => {
    const userData = (await request.json()) as CreateUserRequest

    const newUser: User = {
      id: Math.max(...mockUsers.map((u) => u.id)) + 1,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'user',
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    await new Promise((resolve) => setTimeout(resolve, 500))

    return HttpResponse.json<ApiResponse<User>>(
      {
        data: newUser,
        message: 'User created successfully via MSW',
        success: true,
        timestamp: new Date().toISOString(),
      },
      { status: 201 },
    )
  }),

  // 更新用戶
  http.put('/api/msw/users/:id', async ({ params, request }) => {
    const { id } = params
    const updateData = (await request.json()) as UpdateUserRequest
    const userIndex = mockUsers.findIndex((u) => u.id === Number(id))

    if (userIndex === -1) {
      return HttpResponse.json(
        {
          message: `User with id ${id} not found`,
          success: false,
          timestamp: new Date().toISOString(),
        },
        { status: 404 },
      )
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updateData,
      id: Number(id), // 確保 ID 不被修改
    }

    await new Promise((resolve) => setTimeout(resolve, 300))

    return HttpResponse.json<ApiResponse<User>>({
      data: mockUsers[userIndex],
      message: 'User updated successfully via MSW',
      success: true,
      timestamp: new Date().toISOString(),
    })
  }),

  // 刪除用戶
  http.delete('/api/msw/users/:id', async ({ params }) => {
    const { id } = params
    const userIndex = mockUsers.findIndex((u) => u.id === Number(id))

    if (userIndex === -1) {
      return HttpResponse.json(
        {
          message: `User with id ${id} not found`,
          success: false,
          timestamp: new Date().toISOString(),
        },
        { status: 404 },
      )
    }

    mockUsers.splice(userIndex, 1)

    await new Promise((resolve) => setTimeout(resolve, 200))

    return HttpResponse.json({
      message: 'User deleted successfully via MSW',
      success: true,
      timestamp: new Date().toISOString(),
    })
  }),

  // 模擬慢速響應
  http.get('/api/msw/slow', async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    return HttpResponse.json({
      message: 'This is a slow response from MSW (3 seconds delay)',
      timestamp: new Date().toISOString(),
      success: true,
    })
  }),

  // 模擬錯誤響應
  http.get('/api/msw/error', async () => {
    await new Promise((resolve) => setTimeout(resolve, 100))

    return HttpResponse.json(
      {
        message: 'Internal Server Error simulated by MSW',
        success: false,
        timestamp: new Date().toISOString(),
        error: 'MOCK_INTERNAL_ERROR',
      },
      { status: 500 },
    )
  }),

  // 模擬受保護的資源
  http.get('/api/msw/protected', async ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          message: 'Unauthorized - Missing or invalid token',
          success: false,
          timestamp: new Date().toISOString(),
        },
        { status: 401 },
      )
    }

    const token = authHeader.replace('Bearer ', '')

    if (token !== 'valid-token') {
      return HttpResponse.json(
        {
          message: 'Unauthorized - Invalid token',
          success: false,
          timestamp: new Date().toISOString(),
        },
        { status: 401 },
      )
    }

    return HttpResponse.json({
      message: 'Access granted to protected resource',
      success: true,
      timestamp: new Date().toISOString(),
      data: { secret: 'This is protected data from MSW' },
    })
  }),

  // 模擬超時
  http.get('/api/msw/timeout', async () => {
    // 模擬非常長的延遲來觸發超時
    await new Promise((resolve) => setTimeout(resolve, 10000))

    return HttpResponse.json({
      message: 'This response should timeout',
      success: true,
      timestamp: new Date().toISOString(),
    })
  }),
]

// 創建並配置 MSW Worker
export const worker = setupWorker(...handlers)

// MSW 管理類
export class MSWManager {
  private static isStarted = false

  static async start() {
    if (this.isStarted) {
      console.log('MSW is already started')
      return
    }

    try {
      await worker.start({
        onUnhandledRequest: 'bypass', // 未處理的請求直接通過
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      })

      this.isStarted = true
      console.log('🎭 MSW started successfully')

      // 在控制台顯示已註冊的處理器
      console.log('📋 Registered MSW handlers:')
      handlers.forEach((handler, index) => {
        console.log(`  ${index + 1}. ${handler.info.method} ${handler.info.path}`)
      })

      return true
    } catch (error) {
      console.error('Failed to start MSW:', error)
      return false
    }
  }

  static async stop() {
    if (!this.isStarted) {
      console.log('MSW is not running')
      return
    }

    try {
      worker.stop()
      this.isStarted = false
      console.log('🛑 MSW stopped')
      return true
    } catch (error) {
      console.error('Failed to stop MSW:', error)
      return false
    }
  }

  static isRunning(): boolean {
    return this.isStarted
  }

  static getHandlers() {
    return handlers
  }

  static getMockUsers() {
    return mockUsers
  }

  static resetMockData() {
    // 重置模擬資料到初始狀態
    mockUsers.length = 0
    mockUsers.push(
      {
        id: 1,
        name: 'MSW User 1',
        email: 'msw1@example.com',
        role: 'user',
        createdAt: '2024-01-01T10:00:00Z',
      },
      {
        id: 2,
        name: 'MSW User 2',
        email: 'msw2@example.com',
        role: 'manager',
        createdAt: '2024-01-02T11:00:00Z',
      },
      {
        id: 3,
        name: 'MSW Admin',
        email: 'admin@msw.com',
        role: 'admin',
        createdAt: '2024-01-03T12:00:00Z',
      },
    )
    console.log('🔄 MSW mock data reset to initial state')
  }
}

// 環境檢測和自動啟動
export function setupMSWInDevelopment() {
  if (import.meta.env.DEV) {
    console.log('🔧 Development environment detected, MSW available for manual activation')
  }
}

// MSW API 客戶端 (用於演示)
export const mswAPI = {
  async getUsers(): Promise<User[]> {
    const response = await fetch('/api/msw/users')
    const result: ApiResponse<User[]> = await response.json()
    return result.data
  },

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const response = await fetch('/api/msw/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    const result: ApiResponse<User> = await response.json()
    return result.data
  },

  async testSlowResponse() {
    const response = await fetch('/api/msw/slow')
    return response.json()
  },

  async testErrorResponse() {
    try {
      const response = await fetch('/api/msw/error')
      return await response.json()
    } catch (error) {
      throw error
    }
  },

  async testProtectedResource(token?: string) {
    const headers: Record<string, string> = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch('/api/msw/protected', { headers })
    return response.json()
  },
}
