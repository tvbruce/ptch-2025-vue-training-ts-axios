import { http, HttpResponse } from 'msw'
import type { User, ApiResponse } from '../src/types/api'

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://via.placeholder.com/150' },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: 'https://via.placeholder.com/150',
  },
]

export const handlers = [
  // 獲取用戶列表
  http.get('/api/users', () => {
    return HttpResponse.json<ApiResponse<User[]>>({
      data: users,
      message: 'Users fetched successfully',
      success: true,
    })
  }),

  // 獲取單個用戶
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params
    const user = users.find((u) => u.id === Number(id))

    if (!user) {
      return HttpResponse.json(
        {
          message: 'User not found',
          success: false,
        },
        { status: 404 },
      )
    }

    return HttpResponse.json<ApiResponse<User>>({
      data: user,
      message: 'User fetched successfully',
      success: true,
    })
  }),

  // 創建用戶
  http.post('/api/users', async ({ request }) => {
    const userData = (await request.json()) as Omit<User, 'id'>
    const newUser: User = {
      id: users.length + 1,
      ...userData,
    }

    users.push(newUser)

    return HttpResponse.json<ApiResponse<User>>(
      {
        data: newUser,
        message: 'User created successfully',
        success: true,
      },
      { status: 201 },
    )
  }),

  // 模擬認證錯誤
  http.get('/api/protected', ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          message: 'Unauthorized',
          success: false,
        },
        { status: 401 },
      )
    }

    return HttpResponse.json({
      message: 'Access granted',
      success: true,
    })
  }),

  // 模擬網路延遲
  http.get('/api/slow', async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return HttpResponse.json({
      message: 'Slow response',
      success: true,
    })
  }),
]
