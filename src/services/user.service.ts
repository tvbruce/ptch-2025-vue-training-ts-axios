import { BaseApiService } from './base.service'
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserSearchParams,
  UserSearchResult,
  UserValidationResult,
  EmailValidationResult,
} from '@/types/user'

/**
 * 用戶服務類別
 * 繼承基礎服務，提供用戶特定的業務邏輯
 */
export class UserService extends BaseApiService<User> {
  constructor() {
    super('/users')
  }

  /**
   * 搜尋用戶
   */
  async searchUsers(params: UserSearchParams): Promise<UserSearchResult> {
    const allUsers = await this.getAll()

    let filteredUsers = allUsers

    // 按搜尋關鍵字過濾
    if (params.search) {
      const searchLower = params.search.toLowerCase()
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.department.toLowerCase().includes(searchLower),
      )
    }

    // 按角色過濾
    if (params.role) {
      filteredUsers = filteredUsers.filter((user) => user.role === params.role)
    }

    // 按部門過濾
    if (params.department) {
      filteredUsers = filteredUsers.filter((user) => user.department === params.department)
    }

    // 按活躍狀態過濾
    if (params.isActive !== undefined) {
      filteredUsers = filteredUsers.filter((user) => user.isActive === params.isActive)
    }

    // 分頁處理
    const page = params.page || 1
    const limit = params.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return {
      users: paginatedUsers,
      total: filteredUsers.length,
      page,
      totalPages: Math.ceil(filteredUsers.length / limit),
    }
  }

  /**
   * 根據部門獲取用戶
   */
  async getUsersByDepartment(department: string): Promise<User[]> {
    const allUsers = await this.getAll()
    return allUsers.filter((user) => user.department === department)
  }

  /**
   * 根據角色獲取用戶
   */
  async getUsersByRole(role: User['role']): Promise<User[]> {
    const allUsers = await this.getAll()
    return allUsers.filter((user) => user.role === role)
  }

  /**
   * 獲取活躍用戶
   */
  async getActiveUsers(): Promise<User[]> {
    const allUsers = await this.getAll()
    return allUsers.filter((user) => user.isActive)
  }

  /**
   * 驗證用戶資料
   */
  validateUser(userData: CreateUserRequest | UpdateUserRequest): UserValidationResult {
    const errors: string[] = []

    // 驗證姓名
    if ('name' in userData && userData.name) {
      if (userData.name.length < 2) {
        errors.push('姓名至少需要 2 個字符')
      }
      if (userData.name.length > 50) {
        errors.push('姓名不能超過 50 個字符')
      }
    }

    // 驗證郵箱
    if ('email' in userData && userData.email) {
      const emailResult = this.validateEmail(userData.email)
      if (!emailResult.isValid) {
        errors.push(emailResult.reason || '郵箱格式不正確')
      }
    }

    // 驗證部門
    if ('department' in userData && userData.department) {
      const validDepartments = ['開發部', '產品部', '設計部', '營運部', '人資部']
      if (!validDepartments.includes(userData.department)) {
        errors.push(`部門必須是以下之一：${validDepartments.join(', ')}`)
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * 驗證郵箱格式
   */
  validateEmail(email: string): EmailValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      return {
        email,
        isValid: false,
        reason: '郵箱不能為空',
      }
    }

    if (!emailRegex.test(email)) {
      return {
        email,
        isValid: false,
        reason: '郵箱格式不正確',
      }
    }

    // 檢查郵箱長度
    if (email.length > 254) {
      return {
        email,
        isValid: false,
        reason: '郵箱長度不能超過 254 個字符',
      }
    }

    return {
      email,
      isValid: true,
    }
  }

  /**
   * 批量驗證郵箱
   */
  validateEmails(emails: string[]): EmailValidationResult[] {
    return emails.map((email) => this.validateEmail(email))
  }

  /**
   * 創建用戶（帶驗證）
   */
  async createUserWithValidation(userData: CreateUserRequest): Promise<User> {
    const validation = this.validateUser(userData)

    if (!validation.isValid) {
      throw new Error(`用戶資料驗證失敗：${validation.errors.join(', ')}`)
    }

    return this.create(userData)
  }

  /**
   * 更新用戶（帶驗證）
   */
  async updateUserWithValidation(id: string, userData: UpdateUserRequest): Promise<User> {
    const validation = this.validateUser(userData)

    if (!validation.isValid) {
      throw new Error(`用戶資料驗證失敗：${validation.errors.join(', ')}`)
    }

    return this.update(id, userData)
  }

  /**
   * 停用用戶
   */
  async deactivateUser(id: string): Promise<User> {
    return this.patch(id, { isActive: false })
  }

  /**
   * 啟用用戶
   */
  async activateUser(id: string): Promise<User> {
    return this.patch(id, { isActive: true })
  }

  /**
   * 獲取用戶統計
   */
  async getUserStats(): Promise<{
    total: number
    active: number
    inactive: number
    byRole: Record<string, number>
    byDepartment: Record<string, number>
  }> {
    const allUsers = await this.getAll()

    const stats = {
      total: allUsers.length,
      active: allUsers.filter((u) => u.isActive).length,
      inactive: allUsers.filter((u) => !u.isActive).length,
      byRole: {} as Record<string, number>,
      byDepartment: {} as Record<string, number>,
    }

    // 統計角色分布
    allUsers.forEach((user) => {
      stats.byRole[user.role] = (stats.byRole[user.role] || 0) + 1
    })

    // 統計部門分布
    allUsers.forEach((user) => {
      stats.byDepartment[user.department] = (stats.byDepartment[user.department] || 0) + 1
    })

    return stats
  }
}
