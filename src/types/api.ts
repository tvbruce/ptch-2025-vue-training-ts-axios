export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  timestamp?: string
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'manager'
  createdAt: string
  updatedAt?: string
}

export interface Post {
  id: number
  title: string
  content: string
  userId: number
  createdAt: string
}

export interface CreateUserRequest {
  name: string
  email: string
  role?: 'user' | 'manager'
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  avatar?: string
  role?: 'admin' | 'user' | 'manager'
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  code: string
  message: string
  status?: number
  data?: unknown
}

export interface RequestConfig {
  skipAuth?: boolean
  skipCache?: boolean
  retryCount?: number
  timeout?: number
}
