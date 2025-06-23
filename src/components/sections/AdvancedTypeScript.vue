<template>
    <div class="advanced-typescript">
        <div class="section-intro">
            <h2>TypeScript 進階概念</h2>
            <p class="section-description">
                掌握 TypeScript 的進階特性，提升程式碼的型別安全性和可維護性。
                包括泛型設計、條件型別、實用型別和裝飾器等企業級開發必備技能。
            </p>
        </div>

        <!-- 進階型別系統 -->
        <div class="content-section">
            <h3>🔮 進階型別系統</h3>

            <div class="type-category">
                <h4>聯合型別與交集型別</h4>
                <p>理解複雜型別組合的威力</p>

                <CodeBlock title="聯合與交集型別範例" :code="unionIntersectionCode" language="typescript"
                    explanation="展示如何使用聯合型別和交集型別建立靈活的型別系統" />
            </div>

            <div class="type-category">
                <h4>映射型別 (Mapped Types)</h4>
                <p>動態建立型別的強大工具</p>

                <CodeBlock title="映射型別實作" :code="mappedTypesCode" language="typescript" explanation="使用映射型別建立動態的型別轉換" />
            </div>

            <div class="type-category">
                <h4>索引存取型別</h4>
                <p>從現有型別中提取子型別</p>

                <CodeBlock title="索引存取型別" :code="indexAccessCode" language="typescript"
                    explanation="通過索引存取從複雜型別中提取所需的子型別" />
            </div>
        </div>

        <!-- 泛型與條件型別 -->
        <div class="content-section">
            <h3>⚡ 泛型與條件型別</h3>

            <div class="generic-section">
                <h4>進階泛型設計</h4>
                <p>建立可重用且型別安全的泛型函數和類別</p>

                <CodeBlock title="泛型約束與條件" :code="advancedGenericsCode" language="typescript"
                    explanation="使用泛型約束和條件建立靈活的 API" />
            </div>

            <div class="conditional-section">
                <h4>條件型別</h4>
                <p>根據型別條件動態決定型別</p>

                <CodeBlock title="條件型別實作" :code="conditionalTypesCode" language="typescript"
                    explanation="條件型別讓我們可以根據輸入型別動態決定輸出型別" />
            </div>

            <div class="utility-section">
                <h4>實用型別 (Utility Types)</h4>
                <p>TypeScript 內建的實用型別工具</p>

                <CodeBlock title="實用型別應用" :code="utilityTypesCode" language="typescript"
                    explanation="學習使用 TypeScript 提供的實用型別來簡化開發" />
            </div>
        </div>

        <!-- 裝飾器使用 -->
        <div class="content-section">
            <h3>🎭 裝飾器使用</h3>

            <div class="decorator-intro">
                <p>裝飾器是一種特殊的宣告，可以附加到類別、方法、屬性或參數上，用於修改它們的行為。</p>
            </div>

            <div class="decorator-category">
                <h4>類別裝飾器</h4>
                <p>修改類別的行為和屬性</p>

                <CodeBlock title="類別裝飾器實作" :code="classDecoratorCode" language="typescript"
                    explanation="類別裝飾器可以用來添加metadata、修改構造函數等" />

                <CodeComparison
                    title="類別裝飾器編譯對比"
                    beforeTitle="TypeScript 裝飾器語法"
                    afterTitle="編譯後的 JavaScript"
                    :beforeCode="classDecoratorOriginal"
                    :afterCode="classDecoratorCompiled"
                    language="typescript"
                    afterLanguage="javascript"
                    explanation="TypeScript 裝飾器會被編譯成函數調用的形式，並使用 Reflect.decorate 進行元數據處理"
                    :highlights="[
                        '裝飾器 @Component 變成了 Component() 函數調用',
                        '類別定義被包裝在 __decorate 函數中',
                        '裝飾器按照聲明順序執行',
                        '編譯後的代碼包含了反射元數據'
                    ]"
                />
            </div>

            <div class="decorator-category">
                <h4>方法裝飾器</h4>
                <p>增強方法的功能</p>

                <CodeBlock title="方法裝飾器範例" :code="methodDecoratorCode" language="typescript"
                    explanation="方法裝飾器常用於日誌記錄、效能監控、權限檢查等" />

                <CodeComparison
                    title="方法裝飾器編譯對比"
                    beforeTitle="TypeScript 方法裝飾器"
                    afterTitle="編譯後的 JavaScript"
                    :beforeCode="methodDecoratorOriginal"
                    :afterCode="methodDecoratorCompiled"
                    language="typescript"
                    afterLanguage="javascript"
                    explanation="方法裝飾器會修改屬性描述符，並在編譯時包裝原始方法"
                    :highlights="[
                        '方法裝飾器透過 Object.defineProperty 修改方法',
                        '原始方法被保存並包裝在新的函數中',
                        '裝飾器邏輯在方法調用前後執行',
                        '保持了原始方法的 this 綁定'
                    ]"
                />
            </div>

            <div class="decorator-category">
                <h4>屬性裝飾器</h4>
                <p>控制屬性的行為</p>

                <CodeBlock title="屬性裝飾器應用" :code="propertyDecoratorCode" language="typescript"
                    explanation="屬性裝飾器可以用於驗證、格式化、序列化等" />

                <CodeComparison
                    title="屬性裝飾器編譯對比"
                    beforeTitle="TypeScript 屬性裝飾器"
                    afterTitle="編譯後的 JavaScript"
                    :beforeCode="propertyDecoratorOriginal"
                    :afterCode="propertyDecoratorCompiled"
                    language="typescript"
                    afterLanguage="javascript"
                    explanation="屬性裝飾器會重新定義屬性的 getter 和 setter，實現屬性攔截"
                    :highlights="[
                        '屬性裝飾器透過 Object.defineProperty 重新定義屬性',
                        '原始屬性值被存儲在閉包中',
                        'getter 和 setter 函數包含了裝飾器邏輯',
                        '屬性的 enumerable 和 configurable 特性被保留'
                    ]"
                />
            </div>
        </div>

        <!-- 實戰應用 -->
        <div class="content-section">
            <h3>🎯 實戰應用：型別安全的 API 系統</h3>

            <div class="practice-description">
                <p>結合進階型別概念，建立一個完整的型別安全 API 系統</p>
            </div>

            <CodeBlock title="企業級型別安全 API 設計" :code="apiSystemCode" language="typescript"
                explanation="展示如何結合泛型、條件型別和實用型別建立企業級 API 系統" />
        </div>

        <!-- 效能與最佳實踐 -->
        <div class="content-section">
            <h3>🚀 效能與最佳實踐</h3>

            <div class="best-practices">
                <div class="practice-item">
                    <h4>型別效能優化</h4>
                    <ul>
                        <li>避免過度複雜的條件型別</li>
                        <li>合理使用泛型約束</li>
                        <li>選擇適當的型別檢查策略</li>
                    </ul>
                </div>

                <div class="practice-item">
                    <h4>可維護性原則</h4>
                    <ul>
                        <li>保持型別定義簡潔明確</li>
                        <li>適當使用型別別名</li>
                        <li>文檔化複雜型別</li>
                    </ul>
                </div>

                <div class="practice-item">
                    <h4>團隊開發規範</h4>
                    <ul>
                        <li>統一型別命名規範</li>
                        <li>建立型別庫和共用模組</li>
                        <li>設定適當的 TSConfig 選項</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'
import CodeComparison from '@/components/common/CodeComparison.vue'

interface Props {
    section?: {
        title: string
        description?: string
    }
}

defineProps<Props>()

defineEmits<{
    complete: []
}>()

// 聯合與交集型別範例
const unionIntersectionCode = ref(`// 聯合型別 - 表示多種可能的型別之一
type Status = 'loading' | 'success' | 'error'
type ID = string | number

// 交集型別 - 組合多個型別的所有屬性
interface User {
    id: ID
    name: string
}

interface Timestamps {
    createdAt: Date
    updatedAt: Date
}

// 交集型別：User & Timestamps 擁有兩者的所有屬性
type UserWithTimestamps = User & Timestamps

// 實際應用：API 響應型別
type ApiResponse<T> = {
    data: T
    status: Status
    message: string
} & Timestamps

// 使用範例
const userResponse: ApiResponse<User> = {
    data: { id: 1, name: 'John' },
    status: 'success',
    message: 'User fetched successfully',
    createdAt: new Date(),
    updatedAt: new Date()
}`)

// 映射型別範例
const mappedTypesCode = ref(`// 映射型別：將現有型別的所有屬性轉換為新型別
interface User {
    id: number
    name: string
    email: string
    age: number
}

// 將所有屬性變為可選
type PartialUser = {
    [K in keyof User]?: User[K]
}
// 等同於: Partial<User>

// 將所有屬性變為字串型別
type StringifiedUser = {
    [K in keyof User]: string
}

// 創建一個驗證器型別
type UserValidator = {
    [K in keyof User]: (value: User[K]) => boolean
}

// 實際應用：表單狀態管理
type FormState<T> = {
    [K in keyof T]: {
        value: T[K]
        error?: string
        touched: boolean
    }
}

type UserFormState = FormState<User>
// 結果：每個欄位都有 value, error, touched 屬性`)

// 索引存取型別範例
const indexAccessCode = ref(`// 索引存取型別：從現有型別中提取特定屬性的型別
interface User {
    id: number
    profile: {
        name: string
        email: string
        avatar: string
    }
    settings: {
        theme: 'light' | 'dark'
        notifications: boolean
    }
}

// 提取特定屬性的型別
type UserID = User['id']                    // number
type UserProfile = User['profile']          // { name: string; email: string; avatar: string }
type ProfileName = User['profile']['name']  // string
type Theme = User['settings']['theme']      // 'light' | 'dark'

// 提取陣列元素型別
type Users = User[]
type SingleUser = Users[number]  // User

// 實際應用：動態提取 API 響應型別
interface ApiResponse {
    users: User[]
    posts: Post[]
    comments: Comment[]
}

type UsersData = ApiResponse['users']        // User[]
type SingleUserFromApi = UsersData[number]   // User`)

// 進階泛型範例
const advancedGenericsCode = ref(`// 泛型約束：限制泛型必須具有特定屬性
interface Identifiable {
    id: string | number
}

// T 必須有 id 屬性
function updateEntity<T extends Identifiable>(entity: T, updates: Partial<T>): T {
    return { ...entity, ...updates }
}

// 條件泛型：根據輸入型別決定輸出型別
type ApiResult<T> = T extends string
    ? { message: T }
    : T extends number
    ? { count: T }
    : { data: T }

// 泛型工具函數
function processData<T>(data: T): ApiResult<T> {
    if (typeof data === 'string') {
        return { message: data } as ApiResult<T>
    }
    if (typeof data === 'number') {
        return { count: data } as ApiResult<T>
    }
    return { data } as ApiResult<T>
}

// 使用範例
const stringResult = processData("Hello")     // { message: string }
const numberResult = processData(42)          // { count: number }
const objectResult = processData({ id: 1 })  // { data: { id: number } }`)

// 條件型別範例
const conditionalTypesCode = ref(`// 條件型別的基本語法：T extends U ? X : Y
type IsString<T> = T extends string ? true : false

type Test1 = IsString<string>  // true
type Test2 = IsString<number>  // false

// 實用的條件型別：提取函數返回值型別
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function getName(): string { return "John" }
function getAge(): number { return 25 }

type NameType = ReturnType<typeof getName>  // string
type AgeType = ReturnType<typeof getAge>    // number

// 複雜條件型別：深度提取巢狀屬性
type DeepExtract<T, K extends string> = K extends \`\${infer First}.\${infer Rest}\`
    ? First extends keyof T
        ? DeepExtract<T[First], Rest>
        : never
    : K extends keyof T
    ? T[K]
    : never

interface Company {
    user: {
        profile: {
            name: string
            email: string
        }
    }
}

type UserName = DeepExtract<Company, 'user.profile.name'>  // string`)

// 實用型別範例
const utilityTypesCode = ref(`// TypeScript 內建實用型別應用
interface User {
    id: number
    name: string
    email: string
    password: string
    role: 'admin' | 'user'
}

// Partial<T> - 所有屬性變為可選
type PartialUser = Partial<User>  // 用於更新操作

// Required<T> - 所有屬性變為必需
interface UserConfig {
    theme?: 'light' | 'dark'
    notifications?: boolean
}
type RequiredConfig = Required<UserConfig>

// Pick<T, K> - 選擇特定屬性
type PublicUser = Pick<User, 'id' | 'name' | 'email'>  // 公開用戶資訊

// Omit<T, K> - 排除特定屬性
type UserWithoutPassword = Omit<User, 'password'>      // 安全的用戶型別

// Record<K, T> - 建立字典型別
type UserRoles = Record<string, User[]>  // { [key: string]: User[] }

// Extract<T, U> - 提取可賦值的型別
type StringOrNumber = string | number | boolean
type OnlyStringOrNumber = Extract<StringOrNumber, string | number>  // string | number

// Exclude<T, U> - 排除可賦值的型別
type WithoutBoolean = Exclude<StringOrNumber, boolean>  // string | number

// 實際應用組合
type CreateUserRequest = Pick<User, 'name' | 'email' | 'password'>
type UpdateUserRequest = Partial<Pick<User, 'name' | 'email'>>
type UserResponse = Omit<User, 'password'>`)

// 類別裝飾器範例
const classDecoratorCode = ref(`// 類別裝飾器：修改類別的行為
function Component(config: { selector: string }) {
    return function<T extends new (...args: any[]) => any>(constructor: T) {
        // 添加 metadata
        (constructor as any).selector = config.selector

        // 返回新的類別或修改現有類別
        return class extends constructor {
            selector = config.selector

            constructor(...args: any[]) {
                super(...args)
                console.log(\`Component \${config.selector} created\`)
            }
        }
    }
}

// 使用裝飾器
@Component({ selector: 'user-list' })
class UserListComponent {
    users: User[] = []

    render() {
        return \`<div>Users: \${this.users.length}</div>\`
    }
}

// 多個裝飾器組合
function Injectable(target: any) {
    target.injectable = true
    return target
}

@Injectable
@Component({ selector: 'app-header' })
class HeaderComponent {
    title = 'My App'
}`)

// 方法裝飾器範例
const methodDecoratorCode = ref(`// 方法裝飾器：增強方法功能
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = function (...args: any[]) {
        console.log(\`Calling \${propertyName} with arguments:\`, args)
        const start = performance.now()

        const result = method.apply(this, args)

        const end = performance.now()
        console.log(\`\${propertyName} executed in \${end - start}ms\`)

        return result
    }
}

// 權限檢查裝飾器
function RequireAuth(roles: string[] = []) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value

        descriptor.value = function (...args: any[]) {
            // 檢查權限邏輯
            const userRole = this.getCurrentUserRole?.() || 'guest'

            if (roles.length > 0 && !roles.includes(userRole)) {
                throw new Error(\`Access denied. Required roles: \${roles.join(', ')}\`)
            }

            return method.apply(this, args)
        }
    }
}

class UserService {
    @Log
    @RequireAuth(['admin'])
    async deleteUser(id: number): Promise<void> {
        // 刪除用戶邏輯
        console.log(\`Deleting user \${id}\`)
    }

    @Log
    async getUser(id: number): Promise<User> {
        // 獲取用戶邏輯
        return { id, name: 'John', email: 'john@example.com' }
    }
}`)

// 屬性裝飾器範例
const propertyDecoratorCode = ref(`// 屬性裝飾器：控制屬性行為
function Validate(validator: (value: any) => boolean, message: string) {
    return function (target: any, propertyName: string) {
        let value: any

        Object.defineProperty(target, propertyName, {
            get() {
                return value
            },
            set(newValue: any) {
                if (!validator(newValue)) {
                    throw new Error(\`Validation failed for \${propertyName}: \${message}\`)
                }
                value = newValue
            },
            enumerable: true,
            configurable: true
        })
    }
}

// 格式化裝飾器
function Format(formatter: (value: any) => any) {
    return function (target: any, propertyName: string) {
        let value: any

        Object.defineProperty(target, propertyName, {
            get() {
                return formatter(value)
            },
            set(newValue: any) {
                value = newValue
            }
        })
    }
}

class User {
    @Validate(val => typeof val === 'string' && val.length > 0, 'Name must be a non-empty string')
    name: string

    @Validate(val => /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(val), 'Invalid email format')
    email: string

    @Format(val => val?.toUpperCase())
    code: string

    constructor(name: string, email: string, code: string) {
        this.name = name
        this.email = email
        this.code = code
    }
}

// 使用範例
const user = new User('John', 'john@example.com', 'abc123')
console.log(user.code)  // 'ABC123'`)

// API 系統範例
const apiSystemCode = ref(`// 企業級型別安全 API 系統
// 基礎型別定義
interface BaseEntity {
    id: string
    createdAt: Date
    updatedAt: Date
}

// API 響應包裝器
type ApiResponse<T> = {
    data: T
    success: boolean
    message: string
    timestamp: Date
}

// API 錯誤型別
type ApiError = {
    code: string
    message: string
    details?: Record<string, any>
}

// CRUD 操作型別
type CreateRequest<T> = Omit<T, keyof BaseEntity>
type UpdateRequest<T> = Partial<Omit<T, keyof BaseEntity>>
type QueryOptions = {
    page?: number
    limit?: number
    sort?: string
    filter?: Record<string, any>
}

// 泛型 API 客戶端
class ApiClient<T extends BaseEntity> {
    constructor(private endpoint: string) {}

    async findAll(options?: QueryOptions): Promise<ApiResponse<T[]>> {
        // 實作獲取列表邏輯
        return this.request('GET', '', { params: options })
    }

    async findById(id: string): Promise<ApiResponse<T>> {
        return this.request('GET', \`/\${id}\`)
    }

    async create(data: CreateRequest<T>): Promise<ApiResponse<T>> {
        return this.request('POST', '', { body: data })
    }

    async update(id: string, data: UpdateRequest<T>): Promise<ApiResponse<T>> {
        return this.request('PATCH', \`/\${id}\`, { body: data })
    }

    async delete(id: string): Promise<ApiResponse<void>> {
        return this.request('DELETE', \`/\${id}\`)
    }

    private async request<R>(
        method: string,
        path: string,
        options?: { params?: any; body?: any }
    ): Promise<ApiResponse<R>> {
        // HTTP 請求實作
        const url = \`\${this.endpoint}\${path}\`
        // ... 實際請求邏輯
        return {} as ApiResponse<R>
    }
}

// 具體實體型別
interface User extends BaseEntity {
    name: string
    email: string
    role: 'admin' | 'user'
}

interface Post extends BaseEntity {
    title: string
    content: string
    authorId: string
    published: boolean
}

// 使用範例
const userApi = new ApiClient<User>('/api/users')
const postApi = new ApiClient<Post>('/api/posts')

// 型別安全的 API 調用
async function example() {
    // 創建用戶 - 自動推斷型別，排除 BaseEntity 屬性
    const newUser = await userApi.create({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
    })

    // 更新用戶 - 所有屬性都是可選的
    const updatedUser = await userApi.update('user-id', {
        name: 'John Smith'  // 只更新名稱
    })

    // 獲取用戶列表 - 帶分頁和篩選
    const users = await userApi.findAll({
        page: 1,
        limit: 10,
        filter: { role: 'admin' }
    })
}`)

// 類別裝飾器編譯前後對比範例
const classDecoratorOriginal = ref(`// TypeScript 裝飾器語法
function Component(options: { selector: string }) {
    return function (target: any) {
        target.selector = options.selector
        target.isComponent = true
        return target
    }
}

@Component({ selector: 'app-user' })
class UserComponent {
    name: string = 'User'

    render() {
        return \`<div>Hello \${this.name}</div>\`
    }
}`)

const classDecoratorCompiled = ref(`// 編譯後的 JavaScript
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function Component(options) {
    return function (target) {
        target.selector = options.selector;
        target.isComponent = true;
        return target;
    };
}

var UserComponent = /** @class */ (function () {
    function UserComponent() {
        this.name = 'User';
    }
    UserComponent.prototype.render = function () {
        return "<div>Hello " + this.name + "</div>";
    };
    UserComponent = __decorate([
        Component({ selector: 'app-user' })
    ], UserComponent);
    return UserComponent;
}());`)

// 方法裝飾器編譯前後對比範例
const methodDecoratorOriginal = ref(`// TypeScript 方法裝飾器
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = function (...args: any[]) {
        console.log(\`Calling \${propertyName} with:\`, args)
        const result = method.apply(this, args)
        console.log(\`\${propertyName} returned:\`, result)
        return result
    }
}

class UserService {
    @Log
    getUser(id: number): Promise<User> {
        return fetch(\`/api/users/\${id}\`).then(res => res.json())
    }
}`)

const methodDecoratorCompiled = ref(`// 編譯後的 JavaScript
function Log(target, propertyName, descriptor) {
    var method = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Calling " + propertyName + " with:", args);
        var result = method.apply(this, args);
        console.log(propertyName + " returned:", result);
        return result;
    };
}

var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.getUser = function (id) {
        return fetch("/api/users/" + id).then(function (res) { return res.json(); });
    };
    __decorate([
        Log
    ], UserService.prototype, "getUser", null);
    return UserService;
}());`)

// 屬性裝飾器編譯前後對比範例
const propertyDecoratorOriginal = ref(`// TypeScript 屬性裝飾器
function Validate(validator: (value: any) => boolean) {
    return function (target: any, propertyName: string) {
        let value: any

        Object.defineProperty(target, propertyName, {
            get() { return value },
            set(newValue: any) {
                if (!validator(newValue)) {
                    throw new Error(\`Invalid value for \${propertyName}\`)
                }
                value = newValue
            }
        })
    }
}

class User {
    @Validate(val => typeof val === 'string' && val.length > 0)
    name: string

    constructor(name: string) {
        this.name = name
    }
}`)

const propertyDecoratorCompiled = ref(`// 編譯後的 JavaScript
function Validate(validator) {
    return function (target, propertyName) {
        var value;
        Object.defineProperty(target, propertyName, {
            get: function () { return value; },
            set: function (newValue) {
                if (!validator(newValue)) {
                    throw new Error("Invalid value for " + propertyName);
                }
                value = newValue;
            },
            enumerable: true,
            configurable: true
        });
    };
}

var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    __decorate([
        Validate(function (val) { return typeof val === 'string' && val.length > 0; })
    ], User.prototype, "name", void 0);
    return User;
}());`)
</script>

<style scoped>
.advanced-typescript {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
}

.section-intro {
    margin-bottom: 3rem;
    text-align: center;
}

.section-intro h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 700;
    color: #2d3748;
}

.section-description {
    font-size: 1.125rem;
    color: #4a5568;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
}

.content-section {
    margin-bottom: 4rem;
}

.content-section h3 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
}

.type-category,
.generic-section,
.conditional-section,
.utility-section,
.decorator-category {
    margin-bottom: 3rem;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8f9fa;
}

.type-category h4,
.generic-section h4,
.conditional-section h4,
.utility-section h4,
.decorator-category h4 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
}

.decorator-intro {
    margin-bottom: 2rem;
    padding: 1rem;
    background: #ebf8ff;
    border-left: 4px solid #4299e1;
    border-radius: 4px;
}

.practice-description {
    margin-bottom: 2rem;
    padding: 1rem;
    background: #f0fff4;
    border-left: 4px solid #48bb78;
    border-radius: 4px;
}

.best-practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.practice-item {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
}

.practice-item h4 {
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
}

.practice-item ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.practice-item li {
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-size: 0.875rem;
    line-height: 1.4;
    padding-left: 1.5rem;
    position: relative;
}

.practice-item li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #48bb78;
    font-weight: bold;
}
</style>
