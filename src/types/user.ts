// 用戶相關的型別定義
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'manager'
  department: string
  joinDate: string
  isActive: boolean
  skills: string[]
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  name: string
  email: string
  role?: 'user' | 'manager'
  department: string
  skills?: string[]
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  role?: 'admin' | 'user' | 'manager'
  department?: string
  skills?: string[]
  isActive?: boolean
}

export interface UserSearchParams {
  search?: string
  role?: string
  department?: string
  isActive?: boolean
  page?: number
  limit?: number
}

export interface UserSearchResult {
  users: User[]
  total: number
  page: number
  totalPages: number
}

// 用戶驗證相關
export interface UserValidationResult {
  isValid: boolean
  errors: string[]
}

export interface EmailValidationResult {
  email: string
  isValid: boolean
  reason?: string
}
