<template>
    <div class="section-content">
        <div class="section-intro">
            <h2>TypeScript 基礎介紹</h2>
            <p class="section-description">
                歡迎來到 TypeScript 的世界！本章節將全面介紹 TypeScript，
                展示型別系統的威力，讓你感受到從無型別到有型別的開發體驗差異。
            </p>
        </div>

        <div class="content-block">
            <h3>🤔 什麼是 TypeScript？</h3>
            <div class="concept-explanation">
                <div class="definition-box">
                    <h4>TypeScript = JavaScript + 型別系統</h4>
                    <p>TypeScript 是 Microsoft 開發的開源程式語言，為 JavaScript 添加了靜態型別定義。</p>
                </div>

                <div class="comparison-grid">
                    <div class="comparison-item">
                        <h5>對開發人員來說</h5>
                        <p>就像靜態型別語言為程式碼提供型別安全一樣，TypeScript 為 JavaScript 帶來了相同的好處。</p>
                    </div>
                    <div class="comparison-item">
                        <h5>編譯時檢查</h5>
                        <p>與編譯語言類似，TypeScript 編譯器會在編譯時檢查型別錯誤。</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-block">
            <h3>⚡ 實用性展示：有型別 vs 無型別</h3>

            <div class="usefulness-demo">
                <div class="demo-tabs">
                    <button class="tab-button" :class="{ active: activeDemo === 'without' }"
                        @click="activeDemo = 'without'">
                        ❌ 沒有 TypeScript (痛苦)
                    </button>
                    <button class="tab-button" :class="{ active: activeDemo === 'with' }" @click="activeDemo = 'with'">
                        ✅ 有 TypeScript (幸福)
                    </button>
                </div>

                <div v-show="activeDemo === 'without'" class="demo-content">
                    <h4>JavaScript：開發時的常見問題</h4>
                    <CodeBlock title="痛苦的 JavaScript 開發體驗" :code="javascriptPainCode" language="javascript"
                        explanation="注意這些問題在運行時才會被發現，而且很難調試" />
                    <div class="problems-list">
                        <h5>常見問題：</h5>
                        <ul>
                            <li>🐛 <strong>拼寫錯誤</strong>：屬性名稱錯誤直到運行時才發現</li>
                            <li>🤷 <strong>不知道有什麼方法</strong>：沒有智能提示，全靠記憶和文檔</li>
                            <li>💥 <strong>型別錯誤</strong>：傳錯參數型別，運行時才爆炸</li>
                            <li>🔍 <strong>難以重構</strong>：改個變數名要全專案搜尋替換</li>
                            <li>😰 <strong>團隊協作困難</strong>：別人寫的函數不知道要傳什麼參數</li>
                        </ul>
                    </div>
                </div>

                <div v-show="activeDemo === 'with'" class="demo-content">
                    <h4>TypeScript：美好的開發體驗</h4>
                    <CodeBlock title="愉快的 TypeScript 開發體驗" :code="typescriptJoyCode" language="typescript"
                        explanation="編譯時就能發現所有問題，開發體驗如絲般順滑" />
                    <div class="benefits-list">
                        <h5>開發體驗提升：</h5>
                        <ul>
                            <li>⚡ <strong>自動補全</strong>：IDE 知道所有可用的屬性和方法</li>
                            <li>🛡️ <strong>編譯時檢查</strong>：拼寫錯誤和型別錯誤即時發現</li>
                            <li>📚 <strong>自說明程式碼</strong>：型別定義就是最好的文檔</li>
                            <li>🔧 <strong>安全重構</strong>：IDE 自動處理所有相關變更</li>
                            <li>🤝 <strong>團隊協作無障礙</strong>：介面清楚，函數用法一目了然</li>
                            <li>🎯 <strong>減少 Bug</strong>：大部分錯誤在編譯時就被攔截</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-block">
            <h3>🔗 與 C# 的相似性</h3>

            <div class="similarity-grid">
                <div class="similarity-card">
                    <h4>靜態型別系統</h4>
                    <div class="code-comparison">
                        <div class="csharp-code">
                            <h5>C#</h5>
                            <CodeBlock title="C# 型別定義" :code="csharpExample" language="csharp"
                                explanation="C# 的強型別系統" />
                        </div>
                        <div class="typescript-code">
                            <h5>TypeScript</h5>
                            <CodeBlock title="TypeScript 對應寫法" :code="typescriptExample" language="typescript"
                                explanation="TypeScript 提供相似的型別安全" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-block">
            <h3>📊 基本型別系統</h3>

            <div class="types-grid">
                <div class="type-card" v-for="type in basicTypes" :key="type.name">
                    <h4>{{ type.name }}</h4>
                    <p class="type-description">{{ type.description }}</p>
                    <div class="type-example">
                        <CodeBlock :title="type.example.title" :code="type.example.code" language="typescript"
                            :explanation="type.example.explanation" />
                    </div>
                    <div class="csharp-equivalent" v-if="type.csharpEquivalent">
                        <h5>C# 對應：</h5>
                        <code>{{ type.csharpEquivalent }}</code>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-block">
            <h3>🏗️ 實際開發場景</h3>

            <div class="scenario-comparison">
                <h4>情境：開發一個用戶管理功能</h4>
                <p>讓我們看看在實際開發中，TypeScript 如何提升開發效率和程式碼品質。</p>

                <div class="scenario-tabs">
                    <button class="scenario-tab" :class="{ active: activeScenario === 'problem' }"
                        @click="activeScenario = 'problem'">
                        問題場景
                    </button>
                    <button class="scenario-tab" :class="{ active: activeScenario === 'solution' }"
                        @click="activeScenario = 'solution'">
                        TypeScript 解決方案
                    </button>
                </div>

                <div v-show="activeScenario === 'problem'" class="scenario-content">
                    <h5>🚨 JavaScript 開發中的典型問題</h5>
                    <CodeBlock title="JavaScript 版本：充滿陷阱" :code="problemScenarioCode" language="javascript"
                        explanation="看起來沒問題，但實際上充滿隱患" />
                    <div class="problem-analysis">
                        <h6>潛在問題分析：</h6>
                        <ul>
                            <li>如果 API 回傳的資料結構改變怎麼辦？</li>
                            <li>如果傳入 null 或 undefined 會發生什麼？</li>
                            <li>其他開發人員如何知道 user 物件有哪些屬性？</li>
                            <li>重構時如何確保所有使用的地方都正確更新？</li>
                        </ul>
                    </div>
                </div>

                <div v-show="activeScenario === 'solution'" class="scenario-content">
                    <h5>✨ TypeScript 版本：安全且清晰</h5>
                    <CodeBlock title="TypeScript 版本：型別安全" :code="solutionScenarioCode" language="typescript"
                        explanation="清楚的介面定義，編譯時檢查，開發體驗大幅提升" />
                    <div class="solution-benefits">
                        <h6>TypeScript 帶來的好處：</h6>
                        <ul>
                            <li>✅ 明確的資料結構定義，一看就懂</li>
                            <li>✅ 編譯時就會檢查資料完整性</li>
                            <li>✅ IDE 提供完整的自動補全</li>
                            <li>✅ 重構時自動更新所有相關代碼</li>
                            <li>✅ 團隊成員立即了解 API 契約</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

// Props
interface Props {
    section?: any
}

const props = defineProps<Props>()

// 響應式資料
const activeDemo = ref('without')
const activeScenario = ref('problem')

// 程式碼範例
const javascriptPainCode = `// JavaScript：開發時的痛苦體驗
function processUser(user) {
    // 拼寫錯誤，但沒有警告
    console.log(user.naem); // 應該是 name

    // 不知道 user 有什麼屬性，只能猜或查文檔
    const email = user.email; // 可能不存在

    // 傳錯型別，運行時才發現
    const age = user.age + "歲"; // 如果 age 是字串會變成 "25歲"

    // 呼叫不存在的方法
    user.save(); // 可能沒有這個方法

    return {
        display: user.firstName + " " + user.lastName, // 可能是 undefined
        contact: email.toLowerCase() // 如果 email 是 null 就會錯誤
    };
}

// 使用時不知道要傳什麼
const result = processUser({
    name: "John",
    age: 25
    // 少了 email，但沒有警告
});`

const typescriptJoyCode = `// TypeScript：開發時的愉快體驗
interface User {
    name: string;
    email: string;
    age: number;
    firstName?: string; // 可選屬性
    lastName?: string;
}

function processUser(user: User): { display: string; contact: string } {
    // 自動補全，不會拼錯
    console.log(user.name); // IDE 提示所有可用屬性

    // 型別檢查，傳錯型別會立即警告
    const age = user.age + 1; // 確保是數字運算

    // 可選屬性的安全處理
    const fullName = user.firstName && user.lastName
        ? \`\${user.firstName} \${user.lastName}\`
        : user.name;

    return {
        display: fullName,
        contact: user.email.toLowerCase() // 確保 email 存在
    };
}

// 使用時會檢查必要屬性
const result = processUser({
    name: "John Doe",
    email: "john@example.com",
    age: 25
}); // 如果缺少必要屬性會報錯`

const csharpExample = `// C# 強型別系統
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class UserService
{
    public User CreateUser(string name, string email)
    {
        return new User
        {
            Id = GenerateId(),
            Name = name,
            Email = email,
            CreatedAt = DateTime.Now
        };
    }
}`

const typescriptExample = `// TypeScript 相似的型別安全
interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

class UserService {
    createUser(name: string, email: string): User {
        return {
            id: this.generateId(),
            name: name,
            email: email,
            createdAt: new Date()
        };
    }
}`

const problemScenarioCode = `// JavaScript：潛在問題重重
function displayUserProfile(user) {
    const profile = document.getElementById('profile');

    // 這些屬性存在嗎？型別對嗎？
    profile.innerHTML = \`
        <h2>\${user.name}</h2>
        <p>Email: \${user.email}</p>
        <p>Age: \${user.age}</p>
        <p>Role: \${user.role}</p>
    \`;

    // 這個方法存在嗎？
    if (user.isActive()) {
        profile.classList.add('active');
    }

    // 回傳什麼？沒人知道
    return user.getPreferences();
}`

const solutionScenarioCode = `// TypeScript：型別安全且清晰
interface User {
    name: string;
    email: string;
    age: number;
    role: 'admin' | 'user' | 'guest'; // 限定可能的值
    isActive(): boolean;
    getPreferences(): UserPreferences;
}

interface UserPreferences {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
}

function displayUserProfile(user: User): UserPreferences {
    const profile = document.getElementById('profile');
    if (!profile) {
        throw new Error('Profile element not found');
    }

    // 所有屬性都有型別保證
    profile.innerHTML = \`
        <h2>\${user.name}</h2>
        <p>Email: \${user.email}</p>
        <p>Age: \${user.age}</p>
        <p>Role: \${user.role}</p>
    \`;

    // 編譯時確保方法存在且回傳正確型別
    if (user.isActive()) {
        profile.classList.add('active');
    }

    // 明確的回傳型別
    return user.getPreferences();
}`

// 基本型別
const basicTypes = ref([
    {
        name: 'string',
        description: '字串型別，用於文字資料',
        csharpEquivalent: 'string',
        example: {
            title: '字串型別範例',
            code: `let userName: string = "John Doe";
let greeting: string = \`Hello, \${userName}!\`;

// 編譯時檢查
// userName = 123; // Error: Type 'number' is not assignable to type 'string'`,
            explanation: '與 C# 的 string 類似，提供型別安全'
        }
    },
    {
        name: 'number',
        description: '數字型別，包含整數和浮點數',
        csharpEquivalent: 'int, double, decimal',
        example: {
            title: '數字型別範例',
            code: `let age: number = 25;
let price: number = 99.99;
let score: number = 0b1010; // 二進制

// 數學運算
let total: number = age + price; // 型別安全的運算`,
            explanation: 'JavaScript 只有一種數字型別，對應 C# 多種數值型別'
        }
    },
    {
        name: 'boolean',
        description: '布林型別，true 或 false',
        csharpEquivalent: 'bool',
        example: {
            title: '布林型別範例',
            code: `let isActive: boolean = true;
let isCompleted: boolean = false;

// 條件判斷
if (isActive && !isCompleted) {
    console.log("User is active but task not completed");
}`,
            explanation: '與 C# 的 bool 完全相同的概念'
        }
    }
])

// 完成章節的 emit
const emit = defineEmits<{
    complete: []
}>()
</script>

<style scoped>
.section-content {
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

.content-block {
    margin-bottom: 4rem;
}

.content-block h3 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
}

/* 概念解釋 */
.definition-box {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 2rem;
}

.definition-box h4 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
}

.comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.comparison-item {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
}

.comparison-item h5 {
    margin-bottom: 0.75rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
}

/* 實用性展示 */
.demo-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.tab-button {
    padding: 0.75rem 1.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: #fff;
    color: #4a5568;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
}

.tab-button:hover {
    background: #f7fafc;
    border-color: #cbd5e0;
}

.tab-button.active {
    background: #4299e1;
    color: white;
    border-color: #4299e1;
}

.demo-content {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 2rem;
}

.demo-content h4 {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
}

.problems-list,
.benefits-list {
    margin-top: 2rem;
}

.problems-list h5,
.benefits-list h5 {
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
}

.problems-list ul,
.benefits-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.problems-list li {
    margin-bottom: 0.75rem;
    color: #e53e3e;
    font-size: 0.875rem;
    line-height: 1.5;
    background: #fed7d7;
    padding: 0.75rem;
    border-radius: 6px;
    border-left: 4px solid #f56565;
}

.benefits-list li {
    margin-bottom: 0.75rem;
    color: #38a169;
    font-size: 0.875rem;
    line-height: 1.5;
    background: #f0fff4;
    padding: 0.75rem;
    border-radius: 6px;
    border-left: 4px solid #48bb78;
}

/* 相似性卡片 */
.similarity-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 2rem;
    margin-bottom: 2rem;
}

.similarity-card h4 {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    text-align: center;
}

.code-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.csharp-code,
.typescript-code {
    background: #f7fafc;
    border-radius: 8px;
    padding: 1rem;
}

.csharp-code h5,
.typescript-code h5 {
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
}

.csharp-code h5 {
    color: #553c9a;
}

.typescript-code h5 {
    color: #3178c6;
}

/* 型別網格 */
.types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.type-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
    transition: transform 0.2s, box-shadow 0.2s;
}

.type-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.type-card h4 {
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
}

.type-description {
    margin-bottom: 1rem;
    color: #4a5568;
    font-size: 0.875rem;
    line-height: 1.5;
}

.type-example {
    margin-bottom: 1rem;
}

.csharp-equivalent {
    background: #f0f4ff;
    border: 1px solid #c3dafe;
    border-radius: 4px;
    padding: 0.75rem;
}

.csharp-equivalent h5 {
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #553c9a;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.csharp-equivalent code {
    color: #553c9a;
    font-weight: 500;
}

/* 場景對比 */
.scenario-comparison {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 2rem;
}

.scenario-comparison h4 {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
}

.scenario-comparison p {
    margin-bottom: 2rem;
    color: #4a5568;
    line-height: 1.6;
}

.scenario-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.scenario-tab {
    padding: 0.75rem 1.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px 6px 0 0;
    background: #fff;
    color: #4a5568;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
}

.scenario-tab.active {
    background: #4299e1;
    color: white;
    border-color: #4299e1;
}

.scenario-content h5 {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
}

.problem-analysis,
.solution-benefits {
    margin-top: 2rem;
    background: #f7fafc;
    border-radius: 8px;
    padding: 1.5rem;
}

.problem-analysis h6,
.solution-benefits h6 {
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
}

.problem-analysis ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.problem-analysis li {
    margin-bottom: 0.5rem;
    color: #e53e3e;
    font-size: 0.875rem;
    line-height: 1.5;
}

.problem-analysis li::before {
    content: "⚠️ ";
    margin-right: 0.5rem;
}

.solution-benefits ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.solution-benefits li {
    margin-bottom: 0.5rem;
    color: #38a169;
    font-size: 0.875rem;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .section-content {
        padding: 1rem;
    }

    .comparison-grid,
    .code-comparison {
        grid-template-columns: 1fr;
    }

    .demo-tabs,
    .scenario-tabs {
        flex-direction: column;
    }

    .types-grid {
        grid-template-columns: 1fr;
    }
}
</style>
