<template>
    <div class="dotnet-to-typescript">
        <div class="section-intro">
            <h2>語言對比與轉換</h2>
            <p class="section-description">
                本章節將不同程式語言的概念與 TypeScript 進行對照，
                特別針對具有靜態型別語言背景的開發人員，幫助快速適應 TypeScript 開發，避免常見陷阱。
            </p>
        </div>

        <!-- 語言概念對照 -->
        <div class="content-section">
            <h3>🔄 語言概念對照</h3>
            <p class="section-note">
                如果你有 Java、C#、Kotlin 等靜態型別語言的背景，以下對照將幫助你快速理解 TypeScript。
            </p>
            <div class="concept-mapping">
                <div class="mapping-tabs">
                    <button v-for="concept in conceptMappings" :key="concept.id" class="tab-button"
                        :class="{ active: activeMapping === concept.id }" @click="activeMapping = concept.id">
                        {{ concept.title }}
                    </button>
                </div>

                <div v-for="concept in conceptMappings" :key="concept.id" v-show="activeMapping === concept.id">
                    <div class="mapping-grid">
                        <div class="csharp-example">
                            <h4>🟦 C# 實現</h4>
                            <CodeBlock :title="concept.csharp.title" :code="concept.csharp.code" language="csharp"
                                :explanation="concept.csharp.explanation" />
                        </div>

                        <div class="typescript-example">
                            <h4>🟨 TypeScript 對應</h4>
                            <CodeBlock :title="concept.typescript.title" :code="concept.typescript.code"
                                language="typescript" :explanation="concept.typescript.explanation" />
                        </div>
                    </div>

                    <div class="mapping-notes">
                        <h5>📝 轉換重點</h5>
                        <ul>
                            <li v-for="note in concept.notes" :key="note">{{ note }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- 常見陷阱與解決方案 -->
        <div class="content-section">
            <h3>⚠️ 常見陷阱與解決方案</h3>
            <div class="pitfalls-grid">
                <div class="pitfall-card" v-for="pitfall in commonPitfalls" :key="pitfall.id">
                    <div class="pitfall-header">
                        <h4>{{ pitfall.title }}</h4>
                        <span class="severity-badge" :class="pitfall.severity">
                            {{ pitfall.severity === 'high' ? '高風險' : pitfall.severity === 'medium' ? '中風險' : '低風險' }}
                        </span>
                    </div>

                    <div class="pitfall-content">
                        <div class="wrong-approach">
                            <h5>❌ 錯誤做法（C# 思維）</h5>
                            <CodeBlock :title="pitfall.wrong.title" :code="pitfall.wrong.code" language="typescript"
                                :explanation="pitfall.wrong.problem" />
                        </div>

                        <div class="correct-approach">
                            <h5>✅ 正確做法（TypeScript 最佳實踐）</h5>
                            <CodeBlock :title="pitfall.correct.title" :code="pitfall.correct.code" language="typescript"
                                :explanation="pitfall.correct.solution" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 心智模型轉換 -->
        <div class="content-section">
            <h3>🧠 心智模型轉換</h3>
            <div class="mindset-comparison">
                <div class="mindset-grid">
                    <div class="mindset-card csharp-mindset">
                        <h4>C# 思維模式</h4>
                        <div class="mindset-points">
                            <div class="point">
                                <h5>強型別系統</h5>
                                <p>編譯時嚴格檢查，運行時安全</p>
                            </div>
                            <div class="point">
                                <h5>物件導向優先</h5>
                                <p>類別、繼承、封裝為核心</p>
                            </div>
                            <div class="point">
                                <h5>同步編程模型</h5>
                                <p>直線式程式碼流程</p>
                            </div>
                            <div class="point">
                                <h5>統一運行環境</h5>
                                <p>.NET Runtime 提供一致性</p>
                            </div>
                        </div>
                    </div>

                    <div class="mindset-card typescript-mindset">
                        <h4>TypeScript 思維模式</h4>
                        <div class="mindset-points">
                            <div class="point">
                                <h5>漸進式型別系統</h5>
                                <p>可選的型別安全，逐步增強</p>
                            </div>
                            <div class="point">
                                <h5>多範式編程</h5>
                                <p>函數式、物件導向並存</p>
                            </div>
                            <div class="point">
                                <h5>非同步優先</h5>
                                <p>Promise、async/await 為主流</p>
                            </div>
                            <div class="point">
                                <h5>多樣化運行環境</h5>
                                <p>瀏覽器、Node.js 差異需考慮</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 實用經驗轉移技巧 -->
        <div class="content-section">
            <h3>🎯 實用經驗轉移技巧</h3>
            <div class="transfer-tips">
                <div class="tip-category" v-for="category in transferTips" :key="category.title">
                    <h4>{{ category.title }}</h4>
                    <div class="tips-grid">
                        <div class="tip-card" v-for="tip in category.tips" :key="tip.title">
                            <div class="tip-header">
                                <h5>{{ tip.title }}</h5>
                                <span class="difficulty-indicator" :class="tip.difficulty">
                                    {{ tip.difficulty === 'easy' ? '簡單' : tip.difficulty === 'medium' ? '中等' : '困難' }}
                                </span>
                            </div>
                            <p class="tip-description">{{ tip.description }}</p>
                            <div class="tip-example" v-if="tip.example">
                                <CodeBlock :title="tip.example.title" :code="tip.example.code"
                                    :language="tip.example.language" :explanation="tip.example.explanation" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 學習路徑建議 -->
        <div class="content-section">
            <h3>🗺️ 推薦學習路徑</h3>
            <div class="learning-path">
                <div class="path-timeline">
                    <div class="path-step" v-for="(step, index) in learningPath" :key="step.week">
                        <div class="step-indicator">
                            <span class="step-number">{{ index + 1 }}</span>
                        </div>
                        <div class="step-content">
                            <h4>第 {{ step.week }} 週：{{ step.title }}</h4>
                            <p class="step-description">{{ step.description }}</p>
                            <div class="step-goals">
                                <h5>學習目標：</h5>
                                <ul>
                                    <li v-for="goal in step.goals" :key="goal">{{ goal }}</li>
                                </ul>
                            </div>
                            <div class="step-resources">
                                <h5>建議資源：</h5>
                                <ul>
                                    <li v-for="resource in step.resources" :key="resource">{{ resource }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 實戰練習 -->
        <div class="content-section">
            <h3>💻 實戰練習：C# 轉 TypeScript</h3>
            <div class="practice-section">
                <div class="practice-description">
                    <h4>練習目標</h4>
                    <p>將以下 C# 類別轉換為 TypeScript，體驗兩種語言的差異和相似性。</p>
                </div>

                <div class="practice-tabs">
                    <button class="practice-tab" :class="{ active: activePractice === 'csharp' }"
                        @click="activePractice = 'csharp'">
                        C# 原始碼
                    </button>
                    <button class="practice-tab" :class="{ active: activePractice === 'typescript' }"
                        @click="activePractice = 'typescript'">
                        TypeScript 轉換
                    </button>
                </div>

                <div class="practice-content">
                    <CodeBlock v-if="activePractice === 'csharp'" title="C# 用戶管理類別" :code="practiceCode.csharp"
                        language="csharp" explanation="C# 的面向物件實現，注意存取修飾符和屬性定義" />
                    <CodeBlock v-if="activePractice === 'typescript'" title="TypeScript 對應實現"
                        :code="practiceCode.typescript" language="typescript"
                        explanation="TypeScript 的對應實現，展現相似性與差異性" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

// 響應式資料
const activeMapping = ref('classes')
const activePractice = ref('csharp')

// C# vs TypeScript 概念對照
const conceptMappings = ref([
    {
        id: 'classes',
        title: '類別定義',
        csharp: {
            title: 'C# 類別',
            code: `// C# 類別定義
public class User
{
    private readonly int _id;
    private string _name;
    private DateTime _createdAt;

    public int Id => _id;
    public string Name
    {
        get => _name;
        set => _name = value ?? throw new ArgumentNullException();
    }
    public DateTime CreatedAt => _createdAt;

    public User(int id, string name)
    {
        _id = id;
        _name = name;
        _createdAt = DateTime.Now;
    }

    public string GetDisplayName()
    {
        return $"User: {_name} (ID: {_id})";
    }
}`,
            explanation: '強型別、存取修飾符、屬性封裝'
        },
        typescript: {
            title: 'TypeScript 類別',
            code: `// TypeScript 類別對應
class User {
    private readonly _id: number;
    private _name: string;
    private readonly _createdAt: Date;

    get id(): number { return this._id; }

    get name(): string { return this._name; }
    set name(value: string) {
        if (!value) throw new Error('Name cannot be null');
        this._name = value;
    }

    get createdAt(): Date { return this._createdAt; }

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
        this._createdAt = new Date();
    }

    getDisplayName(): string {
        return \`User: \${this._name} (ID: \${this._id})\`;
    }
}`,
            explanation: '相似的語法結構，但更靈活的型別系統'
        },
        notes: [
            'TypeScript 的 private/readonly 只在編譯時檢查',
            '使用 getter/setter 代替 C# 的屬性語法',
            '錯誤處理需要手動實現（沒有內建例外處理）',
            '日期處理差異：DateTime vs Date'
        ]
    },
    {
        id: 'interfaces',
        title: '介面定義',
        csharp: {
            title: 'C# 介面',
            code: `// C# 介面定義
public interface IRepository<T> where T : class
{
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> CreateAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
}

public interface IUserRepository : IRepository<User>
{
    Task<User> GetByEmailAsync(string email);
    Task<IEnumerable<User>> GetActiveUsersAsync();
}`,
            explanation: '強型別泛型約束、方法簽章定義'
        },
        typescript: {
            title: 'TypeScript 介面',
            code: `// TypeScript 介面對應
interface Repository<T> {
    getById(id: number): Promise<T>;
    getAll(): Promise<T[]>;
    create(entity: T): Promise<T>;
    update(entity: T): Promise<void>;
    delete(id: number): Promise<void>;
}

interface UserRepository extends Repository<User> {
    getByEmail(email: string): Promise<User>;
    getActiveUsers(): Promise<User[]>;
}

// 可選屬性和函數重載
interface UserCreateRequest {
    name: string;
    email: string;
    age?: number; // 可選屬性
}`,
            explanation: '更靈活的介面定義，支援可選屬性'
        },
        notes: [
            'TypeScript 使用 extends 代替 C# 的繼承語法',
            'Promise<T> 對應 C# 的 Task<T>',
            '命名慣例：TypeScript 偏好 camelCase',
            '可選屬性用 ? 標記，C# 需要明確處理 null'
        ]
    }
])

// 常見陷阱
const commonPitfalls = ref([
    {
        id: 'null-handling',
        title: 'Null 值處理差異',
        severity: 'high',
        wrong: {
            title: '錯誤的 Null 處理',
            code: `// 錯誤：用 C# 的思維處理 null
function getUserName(user: User | null): string {
    // 這樣會在運行時出錯！
    return user.name.toUpperCase();
}

// 錯誤：假設 TypeScript 有 null safety
function processUsers(users: User[]): string[] {
    return users.map(user => user?.name.toUpperCase());
    // 編譯通過但邏輯錯誤
}`,
            problem: 'TypeScript 的 null safety 需要明確設定和檢查'
        },
        correct: {
            title: '正確的 Null 處理',
            code: `// 正確：明確的 null 檢查
function getUserName(user: User | null): string {
    if (user === null) {
        throw new Error('User cannot be null');
    }
    return user.name.toUpperCase();
}

// 或使用可選鏈
function getUserDisplayName(user: User | null): string {
    return user?.name?.toUpperCase() ?? 'Unknown User';
}

// 設定 strictNullChecks 確保編譯時檢查
// tsconfig.json: "strictNullChecks": true`,
            solution: '使用聯合型別、可選鏈和空值合併運算符'
        }
    },
    {
        id: 'async-patterns',
        title: '非同步模式差異',
        severity: 'medium',
        wrong: {
            title: '錯誤的非同步處理',
            code: `// 錯誤：用同步思維寫非同步代碼
class UserService {
    getUser(id: number): User {
        // 錯誤：試圖返回 Promise 的值
        return this.apiClient.get(\`/users/\${id}\`);
    }

    // 錯誤：沒有正確處理 Promise
    async getAllUsers(): User[] {
        const response = this.apiClient.get('/users');
        return response.data; // 這會返回 Promise！
    }
}`,
            problem: 'JavaScript/TypeScript 是非同步優先的環境'
        },
        correct: {
            title: '正確的非同步處理',
            code: `// 正確：embrace 非同步模式
class UserService {
    async getUser(id: number): Promise<User> {
        const response = await this.apiClient.get(\`/users/\${id}\`);
        return response.data;
    }

    async getAllUsers(): Promise<User[]> {
        const response = await this.apiClient.get('/users');
        return response.data;
    }

    // 處理並行請求
    async getUsersWithProfiles(ids: number[]): Promise<UserProfile[]> {
        const promises = ids.map(id => this.getUserProfile(id));
        return Promise.all(promises);
    }
}`,
            solution: '擁抱 async/await，正確使用 Promise'
        }
    }
])

// 經驗轉移技巧
const transferTips = ref([
    {
        title: '型別系統運用',
        tips: [
            {
                title: '利用 Union Types',
                difficulty: 'easy',
                description: '使用聯合型別取代 C# 的多型或介面',
                example: {
                    title: '聯合型別範例',
                    language: 'typescript',
                    code: `// 取代複雜的繼承結構
type Shape = Circle | Rectangle | Triangle;

interface Circle {
    type: 'circle';
    radius: number;
}

interface Rectangle {
    type: 'rectangle';
    width: number;
    height: number;
}

function getArea(shape: Shape): number {
    switch (shape.type) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'rectangle':
            return shape.width * shape.height;
        default:
            throw new Error('Unknown shape');
    }
}`,
                    explanation: '更簡潔的多型實現'
                }
            }
        ]
    }
])

// 學習路徑
const learningPath = ref([
    {
        week: 1,
        title: '基礎語法適應',
        description: '熟悉 TypeScript 基本語法，理解與 C# 的差異',
        goals: [
            '掌握 TypeScript 的型別註解語法',
            '理解 var/let/const 的差異',
            '熟悉箭頭函數和解構賦值'
        ],
        resources: [
            'TypeScript Handbook 前 3 章',
            '練習基本語法轉換',
            '設定開發環境（VS Code + TypeScript）'
        ]
    },
    {
        week: 2,
        title: '物件導向模式',
        description: '學習 TypeScript 的 OOP 實現，對比 C# 差異',
        goals: [
            '掌握 TypeScript 類別和介面',
            '理解原型鏈和繼承機制',
            '學習模組系統（import/export）'
        ],
        resources: [
            '實作常見的 C# 設計模式',
            '練習類別繼承和介面實現',
            '學習 ES6+ 模組語法'
        ]
    }
])

// 實戰練習程式碼
const practiceCode = ref({
    csharp: `// C# 用戶管理類別
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class User
{
    public int Id { get; private set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; private set; }
    public bool IsActive { get; set; }

    public User(int id, string name, string email)
    {
        Id = id;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Email = email ?? throw new ArgumentNullException(nameof(email));
        CreatedAt = DateTime.Now;
        IsActive = true;
    }

    public void Deactivate()
    {
        IsActive = false;
    }

    public string GetDisplayInfo()
    {
        return $"{Name} ({Email}) - {(IsActive ? "Active" : "Inactive")}";
    }
}

public class UserManager
{
    private readonly List<User> _users = new List<User>();

    public async Task<User> CreateUserAsync(string name, string email)
    {
        var id = _users.Count + 1;
        var user = new User(id, name, email);
        _users.Add(user);
        return user;
    }

    public User GetUserById(int id)
    {
        return _users.Find(u => u.Id == id);
    }

    public IEnumerable<User> GetActiveUsers()
    {
        return _users.Where(u => u.IsActive);
    }
}`,

    typescript: `// TypeScript 對應實現
class User {
    private _id: number;
    private _createdAt: Date;

    constructor(
        id: number,
        public name: string,
        public email: string,
        public isActive: boolean = true
    ) {
        if (!name) throw new Error('Name cannot be null or empty');
        if (!email) throw new Error('Email cannot be null or empty');

        this._id = id;
        this._createdAt = new Date();
    }

    get id(): number { return this._id; }
    get createdAt(): Date { return this._createdAt; }

    deactivate(): void {
        this.isActive = false;
    }

    getDisplayInfo(): string {
        return \`\${this.name} (\${this.email}) - \${this.isActive ? 'Active' : 'Inactive'}\`;
    }
}

class UserManager {
    private users: User[] = [];

    async createUser(name: string, email: string): Promise<User> {
        const id = this.users.length + 1;
        const user = new User(id, name, email);
        this.users.push(user);
        return user;
    }

    getUserById(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }

    getActiveUsers(): User[] {
        return this.users.filter(u => u.isActive);
    }

    // TypeScript 特有：更靈活的查詢方法
    findUsers(predicate: (user: User) => boolean): User[] {
        return this.users.filter(predicate);
    }
}`
})
</script>

<style scoped>
/* 基礎樣式與 TypeScriptVsJavaScript.vue 類似，這裡只列出特殊樣式 */
.dotnet-to-typescript {
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

/* 標籤按鈕樣式 */
.mapping-tabs {
    display: flex;
    margin-bottom: 2rem;
    background: #f7fafc;
    border-radius: 8px;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
}

.tab-button {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: 500;
    border-radius: 6px;
    transition: all 0.3s;
    font-size: 0.875rem;
    color: #4a5568;
}

.tab-button:hover {
    background: #edf2f7;
    color: #2d3748;
}

.tab-button.active {
    background: #4299e1;
    color: white;
    font-weight: 600;
}

.practice-tab {
    padding: 0.75rem 1.5rem;
    border: none;
    background: #f7fafc;
    color: #4a5568;
    cursor: pointer;
    font-weight: 500;
    border-radius: 6px;
    transition: all 0.3s;
    margin-right: 0.5rem;
    border: 1px solid #e2e8f0;
}

.practice-tab:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
}

.practice-tab.active {
    background: #4299e1;
    color: white;
    border-color: #4299e1;
}

.practice-tabs {
    display: flex;
    margin-bottom: 1.5rem;
}

.practice-content {
    margin-top: 1rem;
}

/* 概念對照特殊樣式 */
.concept-mapping {
    width: 100%;
    overflow: hidden;
}

.mapping-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
}

.csharp-example {
    background: #f0f4ff;
    border: 2px solid #4c51bf;
    border-radius: 8px;
    padding: 1.5rem;
    min-width: 0;
    overflow: hidden;
}

.typescript-example {
    background: #fffaf0;
    border: 2px solid #d69e2e;
    border-radius: 8px;
    padding: 1.5rem;
    min-width: 0;
    overflow: hidden;
}

.csharp-example h4,
.typescript-example h4 {
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
}

.mapping-notes {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 1rem;
}

.mapping-notes h5 {
    margin-bottom: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
}

.mapping-notes ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.mapping-notes li {
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-size: 0.875rem;
    line-height: 1.4;
}

.mapping-notes li::before {
    content: "💡 ";
    margin-right: 0.5rem;
}

/* 陷阱卡片樣式 */
.pitfalls-grid {
    display: grid;
    gap: 2rem;
}

.pitfall-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
}

.pitfall-header {
    padding: 1rem 1.5rem;
    background: #fef5e7;
    border-bottom: 1px solid #f6e05e;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pitfall-header h4 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
}

.severity-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
}

.severity-badge.high {
    background: #fed7d7;
    color: #c53030;
    border: 1px solid #fc8181;
}

.severity-badge.medium {
    background: #fef5e7;
    color: #d69e2e;
    border: 1px solid #f6e05e;
}

.severity-badge.low {
    background: #f0fff4;
    color: #38a169;
    border: 1px solid #9ae6b4;
}

.pitfall-content {
    padding: 1.5rem;
}

.wrong-approach,
.correct-approach {
    margin-bottom: 2rem;
}

.wrong-approach h5,
.correct-approach h5 {
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 600;
}

/* 心智模型對比 */
.mindset-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.mindset-card {
    padding: 2rem;
    border-radius: 8px;
    border: 2px solid;
}

.csharp-mindset {
    background: #f0f4ff;
    border-color: #4c51bf;
}

.typescript-mindset {
    background: #fffaf0;
    border-color: #d69e2e;
}

.mindset-card h4 {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
}

.mindset-points {
    display: grid;
    gap: 1rem;
}

.point h5 {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #2d3748;
}

.point p {
    margin: 0;
    font-size: 0.875rem;
    color: #4a5568;
    line-height: 1.4;
}

/* 經驗轉移技巧樣式 */
.transfer-tips {
    display: grid;
    gap: 3rem;
}

.tip-category h4 {
    margin-bottom: 2rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
}

.tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
}

.tip-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s;
}

.tip-card:hover {
    border-color: #cbd5e0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.tip-header h5 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
}

.difficulty-indicator {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
}

.difficulty-indicator.easy {
    background: #c6f6d5;
    color: #276749;
}

.difficulty-indicator.medium {
    background: #fef5e7;
    color: #d69e2e;
}

.difficulty-indicator.hard {
    background: #fed7d7;
    color: #c53030;
}

.tip-description {
    margin-bottom: 1rem;
    color: #4a5568;
    line-height: 1.5;
}

.tip-example {
    margin-top: 1rem;
}

/* 學習路徑時間軸 */
.path-timeline {
    position: relative;
}

.path-timeline::before {
    content: '';
    position: absolute;
    left: 24px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e2e8f0;
}

.path-step {
    display: flex;
    margin-bottom: 3rem;
    position: relative;
}

.step-indicator {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #4299e1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
}

.step-number {
    color: white;
    font-weight: 600;
    font-size: 1.125rem;
}

.step-content {
    flex: 1;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
}

.step-content h4 {
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
}

.step-description {
    margin-bottom: 1rem;
    color: #4a5568;
    line-height: 1.5;
}

.step-goals,
.step-resources {
    margin-bottom: 1rem;
}

.step-goals h5,
.step-resources h5 {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #2d3748;
}

.step-goals ul,
.step-resources ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.step-goals li,
.step-resources li {
    margin-bottom: 0.25rem;
    color: #4a5568;
    font-size: 0.875rem;
    line-height: 1.4;
}

.step-goals li::before {
    content: "🎯 ";
    margin-right: 0.5rem;
}

.step-resources li::before {
    content: "📚 ";
    margin-right: 0.5rem;
}

@media (max-width: 768px) {
    .dotnet-to-typescript {
        padding: 1rem;
    }

    .mapping-grid,
    .mindset-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .mapping-tabs {
        flex-direction: column;
        gap: 0.5rem;
    }

    .tab-button {
        padding: 0.5rem;
        font-size: 0.875rem;
    }

    .csharp-example,
    .typescript-example {
        padding: 1rem;
    }

    .path-timeline::before {
        display: none;
    }

    .path-step {
        flex-direction: column;
    }

    .step-indicator {
        margin-right: 0;
        margin-bottom: 1rem;
        align-self: flex-start;
    }

    .tips-grid {
        grid-template-columns: 1fr;
    }
}

/* 中等螢幕尺寸優化 */
@media (max-width: 1024px) {
    .mapping-grid {
        gap: 1rem;
    }

    .csharp-example,
    .typescript-example {
        padding: 1rem;
    }
}

/* CodeBlock 容器內溢出處理 */
.csharp-example :deep(.code-block),
.typescript-example :deep(.code-block) {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
}

.csharp-example :deep(.code-content),
.typescript-example :deep(.code-content) {
    max-width: 100%;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
}

.mapping-grid :deep(.code-block) {
    margin: 1rem 0;
}
</style>
