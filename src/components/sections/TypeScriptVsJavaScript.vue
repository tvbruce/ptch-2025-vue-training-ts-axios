<template>
  <div class="typescript-vs-javascript">
    <!-- 章節標題 -->
    <div class="section-header">
      <h2>TypeScript vs JavaScript 深度對比</h2>
      <p class="section-description">
        深入比較 JavaScript 與 TypeScript 的語法差異和使用場景，通過實際案例展示 TypeScript 帶來的開發效率提升。
      </p>
    </div>

    <!-- 核心差異對比 -->
    <div class="content-block">
      <h3>🔍 核心差異總覽</h3>
      <div class="comparison-grid">
        <div class="comparison-card">
          <h4>JavaScript</h4>
          <ul>
            <li>動態型別系統</li>
            <li>運行時錯誤檢查</li>
            <li>靈活但容易出錯</li>
            <li>較小的學習曲線</li>
            <li>直接在瀏覽器運行</li>
          </ul>
        </div>
        <div class="comparison-card highlight">
          <h4>TypeScript</h4>
          <ul>
            <li>靜態型別系統</li>
            <li>編譯時錯誤檢查</li>
            <li>安全且可預測</li>
            <li>稍高的學習曲線</li>
            <li>需要編譯為 JavaScript</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 語法差異對比 -->
    <div class="content-block">
      <h3>⚖️ 語法差異對比</h3>

      <div class="syntax-comparison">
        <h4>變數宣告與型別</h4>
        <div class="code-comparison">
          <div class="js-example">
            <h5>JavaScript</h5>
            <CodeBlock title="JavaScript 變數宣告" :code="jsVariableCode" language="javascript"
              explanation="JavaScript 變數沒有型別限制，容易出現運行時錯誤" />
          </div>
          <div class="ts-example">
            <h5>TypeScript</h5>
            <CodeBlock title="TypeScript 變數宣告" :code="tsVariableCode" language="typescript"
              explanation="TypeScript 提供型別安全，在編譯時就能發現錯誤" />
          </div>
        </div>
      </div>

      <div class="syntax-comparison">
        <h4>函數定義</h4>
        <div class="code-comparison">
          <div class="js-example">
            <h5>JavaScript</h5>
            <CodeBlock title="JavaScript 函數" :code="jsFunctionCode" language="javascript" explanation="參數和返回值型別不明確" />
          </div>
          <div class="ts-example">
            <h5>TypeScript</h5>
            <CodeBlock title="TypeScript 函數" :code="tsFunctionCode" language="typescript" explanation="明確的參數和返回值型別定義" />
          </div>
        </div>
      </div>
    </div>

    <!-- 實際案例：重構演示 -->
    <div class="content-block">
      <h3>🔧 實際案例：JavaScript 到 TypeScript 重構</h3>

      <div class="refactoring-demo">
        <div class="demo-tabs">
          <button v-for="demo in refactoringExamples" :key="demo.id" class="tab-button"
            :class="{ active: activeDemo === demo.id }" @click="activeDemo = demo.id">
            {{ demo.title }}
          </button>
        </div>

        <div class="demo-content">
          <div v-for="demo in refactoringExamples" :key="demo.id" v-show="activeDemo === demo.id">
            <div class="demo-description">
              <h4>{{ demo.title }}</h4>
              <p>{{ demo.description }}</p>
            </div>

            <div class="before-after">
              <div class="before">
                <h5>重構前 (JavaScript)</h5>
                <CodeBlock title="原始 JavaScript 代碼" :code="demo.before.code" language="javascript"
                  :explanation="demo.before.explanation" />
                <div class="problems">
                  <h6>存在的問題：</h6>
                  <ul>
                    <li v-for="problem in demo.before.problems" :key="problem">{{ problem }}</li>
                  </ul>
                </div>
              </div>

              <div class="after">
                <h5>重構後 (TypeScript)</h5>
                <CodeBlock title="重構的 TypeScript 代碼" :code="demo.after.code" language="typescript"
                  :explanation="demo.after.explanation" />
                <div class="benefits">
                  <h6>改善效果：</h6>
                  <ul>
                    <li v-for="benefit in demo.after.benefits" :key="benefit">{{ benefit }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 開發效率提升實證 -->
    <div class="content-block">
      <h3>📈 開發效率提升實證</h3>

      <div class="efficiency-metrics">
        <div class="metric-card">
          <div class="metric-number">40%</div>
          <div class="metric-label">減少運行時錯誤</div>
        </div>
        <div class="metric-card">
          <div class="metric-number">60%</div>
          <div class="metric-label">提升代碼可讀性</div>
        </div>
        <div class="metric-card">
          <div class="metric-number">30%</div>
          <div class="metric-label">縮短調試時間</div>
        </div>
        <div class="metric-card">
          <div class="metric-number">50%</div>
          <div class="metric-label">降低維護成本</div>
        </div>
      </div>
    </div>

    <!-- 互動練習 -->
    <div class="content-block">
      <h3>💻 互動練習</h3>

      <div class="exercise-section">
        <h4>練習：識別與修復問題</h4>
        <p>以下是一些容易出錯的 JavaScript 代碼，請嘗試識別問題並用 TypeScript 重寫：</p>

        <div class="exercise-container">
          <div class="exercise-problem">
            <h5>問題代碼 (JavaScript)</h5>
            <CodeBlock title="容易出錯的 JavaScript 代碼" :code="exerciseCode" language="javascript"
              explanation="找出這段代碼可能存在的問題" />
          </div>

          <div class="exercise-solution" v-if="showSolution">
            <h5>TypeScript 解決方案</h5>
            <CodeBlock title="型別安全的 TypeScript 版本" :code="solutionCode" language="typescript"
              explanation="使用 TypeScript 型別系統避免常見錯誤" />
          </div>

          <button class="solution-btn" @click="showSolution = !showSolution">
            {{ showSolution ? '隱藏解答' : '查看解答' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 使用場景指南 -->
    <div class="content-block">
      <h3>🎯 使用場景指南</h3>

      <div class="scenario-grid">
        <div class="scenario-card js-card">
          <h4>選擇 JavaScript 的場景</h4>
          <ul>
            <li>快速原型開發</li>
            <li>小型項目或腳本</li>
            <li>學習前端開發基礎</li>
            <li>現有 JS 項目維護</li>
            <li>簡單的互動功能</li>
          </ul>
        </div>

        <div class="scenario-card ts-card">
          <h4>選擇 TypeScript 的場景</h4>
          <ul>
            <li>大型企業應用</li>
            <li>多人協作項目</li>
            <li>長期維護的系統</li>
            <li>API 客戶端開發</li>
            <li>複雜的業務邏輯</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 章節總結 -->
    <div class="content-block">
      <h3>📝 章節總結</h3>

      <div class="summary-section">
        <div class="key-points">
          <h4>重點回顧：</h4>
          <ul>
            <li>TypeScript 是 JavaScript 的超集，提供靜態型別系統</li>
            <li>型別安全能在編譯時發現錯誤，提升代碼品質</li>
            <li>TypeScript 特別適合大型項目和團隊協作</li>
            <li>學習成本適中，對有靜態型別語言背景的開發人員來說相對容易</li>
            <li>現代前端開發的趨勢和最佳實踐</li>
          </ul>
        </div>

        <div class="next-steps">
          <h4>下一步學習：</h4>
          <p>
            在下一章節中，我們將針對有其他語言背景的開發人員，
            深入探討如何將靜態型別語言的經驗和知識轉移到 TypeScript 開發中。
          </p>
        </div>
      </div>
    </div>

    <!-- 導航按鈕 -->
    <div class="navigation-footer">
      <button class="btn-complete" @click="completeSection">
        完成本章節
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const emit = defineEmits<{
  complete: []
}>()

// 當前活動的演示
const activeDemo = ref('api-client')
const showSolution = ref(false)

// JavaScript 變數宣告示例
const jsVariableCode = `// JavaScript - 沒有型別限制
let userAge = "25";  // 字串
userAge = userAge + 5;  // "255" - 意外的字串連接！

let users = [];
users.push({ name: "John" });
users.push("invalid data");  // 混合型別，容易出錯

// 函數參數沒有型別約束
function calculateTax(income, rate) {
  return income * rate;  // 如果傳入字串會怎樣？
}`

// TypeScript 變數宣告示例
const tsVariableCode = `// TypeScript - 明確的型別定義
let userAge: number = 25;  // 明確的數字型別
userAge = userAge + 5;  // 30 - 正確的數學運算

interface User {
  name: string;
  age?: number;
}

let users: User[] = [];
users.push({ name: "John" });
// users.push("invalid data");  // 編譯錯誤！型別不匹配

// 函數參數和返回值都有型別約束
function calculateTax(income: number, rate: number): number {
  return income * rate;  // 型別安全的計算
}`

// JavaScript 函數示例
const jsFunctionCode = `// JavaScript 函數
function processUser(userData) {
  // 不知道 userData 的結構
  return {
    id: userData.id,
    displayName: userData.firstName + " " + userData.lastName,
    email: userData.email.toLowerCase()  // 如果 email 是 undefined 會報錯
  };
}

// 調用時沒有型別檢查
const result = processUser({ name: "John" });  // 缺少必要欄位`

// TypeScript 函數示例
const tsFunctionCode = `// TypeScript 函數
interface UserInput {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;  // 可選欄位
}

interface ProcessedUser {
  id: number;
  displayName: string;
  email: string;
}

function processUser(userData: UserInput): ProcessedUser {
  return {
    id: userData.id,
    displayName: \`\${userData.firstName} \${userData.lastName}\`,
    email: userData.email?.toLowerCase() ?? 'no-email@example.com'
  };
}

// 編譯時型別檢查
// const result = processUser({ name: "John" });  // 編譯錯誤！`

// 重構演示案例
const refactoringExamples = ref([
  {
    id: 'api-client',
    title: 'API 客戶端',
    description: '從 JavaScript 的 API 調用重構為型別安全的 TypeScript 版本',
    before: {
      code: `// JavaScript API 客戶端
function fetchUserData(userId) {
  return fetch(\`/api/users/\${userId}\`)
    .then(response => response.json())
    .then(data => {
      // 不知道 data 的結構
      return {
        name: data.fullName,  // 欄位名稱可能錯誤
        email: data.emailAddress,
        status: data.isActive ? 'active' : 'inactive'
      };
    });
}

// 使用時沒有自動完成和型別檢查
fetchUserData("123").then(user => {
  console.log(user.nam);  // 拼寫錯誤不會被發現
});`,
      explanation: '缺乏型別定義，容易出現欄位名稱錯誤和拼寫錯誤',
      problems: [
        '不知道 API 響應的資料結構',
        '欄位名稱可能錯誤 (fullName vs name)',
        '沒有自動完成和 IntelliSense',
        '拼寫錯誤不會被發現',
        '重構時容易遺漏更新'
      ]
    },
    after: {
      code: `// TypeScript API 客戶端
interface ApiUser {
  id: string;
  fullName: string;
  emailAddress: string;
  isActive: boolean;
}

interface ProcessedUser {
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

async function fetchUserData(userId: string): Promise<ProcessedUser> {
  const response = await fetch(\`/api/users/\${userId}\`);
  const data: ApiUser = await response.json();

  return {
    name: data.fullName,  // 型別安全的欄位存取
    email: data.emailAddress,
    status: data.isActive ? 'active' : 'inactive'
  };
}

// 使用時有完整的型別支援
fetchUserData("123").then(user => {
  console.log(user.name);  // 自動完成和型別檢查
  // console.log(user.nam);  // 編譯錯誤！
});`,
      explanation: '透過型別定義提供完整的型別安全和開發體驗',
      benefits: [
        '明確的 API 響應資料結構',
        '編譯時型別檢查',
        '完整的自動完成支援',
        '重構時的型別安全',
        '更好的代碼可讀性'
      ]
    }
  },
  {
    id: 'event-handling',
    title: '事件處理',
    description: '改善事件處理的型別安全性',
    before: {
      code: `// JavaScript 事件處理
function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const userData = {
    name: formData.get('name'),
    age: formData.get('age'),
    email: formData.get('email')
  };

  // 沒有驗證，age 可能是字串
  if (userData.age > 18) {
    submitUser(userData);
  }
}

function submitUser(user) {
  // 不知道 user 的型別結構
  fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  });
}`,
      explanation: '缺乏型別驗證，表單資料處理容易出錯',
      problems: [
        '表單資料沒有型別驗證',
        'age 欄位可能是字串而非數字',
        '事件處理函數參數型別不明確',
        '沒有編譯時錯誤檢查'
      ]
    },
    after: {
      code: `// TypeScript 事件處理
interface UserFormData {
  name: string;
  age: number;
  email: string;
}

function handleFormSubmit(event: Event): void {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const userData: UserFormData = {
    name: formData.get('name') as string,
    age: Number(formData.get('age')),  // 明確轉換為數字
    email: formData.get('email') as string
  };

  // 型別安全的比較
  if (userData.age > 18) {
    submitUser(userData);
  }
}

function submitUser(user: UserFormData): Promise<void> {
  return fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to submit user');
    }
  });
}`,
      explanation: '完整的型別定義確保資料處理的正確性',
      benefits: [
        '明確的表單資料型別',
        '型別安全的資料轉換',
        '編譯時錯誤檢查',
        '更好的 IDE 支援'
      ]
    }
  }
])

// 練習代碼
const exerciseCode = `// 找出這段 JavaScript 代碼的問題
function calculateOrderTotal(items, discountRate, taxRate) {
  let total = 0;

  for (let item of items) {
    total += item.price * item.quantity;
  }

  total = total * (1 - discountRate);
  total = total * (1 + taxRate);

  return total.toFixed(2);
}

// 調用範例
const order = calculateOrderTotal(
  [{ name: "Book", price: "29.99", quantity: 2 }],
  "0.1",
  0.08
);`

// 解答代碼
const solutionCode = `// TypeScript 解決方案
interface OrderItem {
  name: string;
  price: number;  // 確保是數字型別
  quantity: number;
}

function calculateOrderTotal(
  items: OrderItem[],
  discountRate: number,  // 0-1 之間的數字
  taxRate: number
): string {
  let total = 0;

  for (const item of items) {
    total += item.price * item.quantity;  // 型別安全的計算
  }

  total = total * (1 - discountRate);
  total = total * (1 + taxRate);

  return total.toFixed(2);
}

// 正確的調用
const order = calculateOrderTotal(
  [{ name: "Book", price: 29.99, quantity: 2 }],  // price 是數字
  0.1,  // discountRate 是數字
  0.08
);`

function completeSection() {
  emit('complete')
}
</script>

<style scoped>
.typescript-vs-javascript {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.2rem;
  color: #4a5568;
  line-height: 1.6;
}

.content-block {
  margin-bottom: 4rem;
}

.content-block h3 {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 比較網格 */
.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.comparison-card {
  padding: 2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: #f7fafc;
}

.comparison-card.highlight {
  border-color: #4299e1;
  background: #ebf8ff;
}

.comparison-card h4 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.comparison-card ul {
  list-style: none;
  padding: 0;
}

.comparison-card li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.comparison-card li:last-child {
  border-bottom: none;
}

/* 語法比較 */
.syntax-comparison {
  margin-bottom: 3rem;
}

.syntax-comparison h4 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.js-example,
.ts-example {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.js-example h5,
.ts-example h5 {
  padding: 1rem;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.js-example h5 {
  background: #fed7d7;
  color: #9b2c2c;
}

.ts-example h5 {
  background: #c6f6d5;
  color: #276749;
}

/* 重構演示 */
.refactoring-demo {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.demo-tabs {
  display: flex;
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
}

.tab-button {
  flex: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.tab-button:hover {
  background: #edf2f7;
}

.tab-button.active {
  background: #4299e1;
  color: white;
}

.demo-content {
  padding: 2rem;
}

.demo-description h4 {
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.demo-description p {
  margin-bottom: 2rem;
  color: #4a5568;
  line-height: 1.6;
}

.before-after {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.before,
.after {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.before h5 {
  background: #fed7d7;
  color: #9b2c2c;
  padding: 1rem;
  margin: 0;
}

.after h5 {
  background: #c6f6d5;
  color: #276749;
  padding: 1rem;
  margin: 0;
}

.problems,
.benefits {
  padding: 1rem;
  background: #f7fafc;
}

.problems h6 {
  color: #e53e3e;
  margin-bottom: 0.5rem;
}

.benefits h6 {
  color: #38a169;
  margin-bottom: 0.5rem;
}

.problems ul,
.benefits ul {
  margin: 0;
  padding-left: 1.5rem;
}

.problems li {
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.benefits li {
  color: #4a5568;
  margin-bottom: 0.25rem;
}

/* 效率指標 */
.efficiency-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.metric-card {
  text-align: center;
  padding: 2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: #f7fafc;
  transition: transform 0.3s;
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.metric-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #4299e1;
  margin-bottom: 0.5rem;
}

.metric-label {
  font-size: 1rem;
  color: #4a5568;
  font-weight: 500;
}

/* 練習區域 */
.exercise-section {
  background: #f7fafc;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.exercise-section h4 {
  margin-bottom: 1rem;
  color: #2d3748;
}

.exercise-container {
  margin-top: 2rem;
}

.exercise-problem {
  margin-bottom: 2rem;
}

.exercise-solution {
  margin-bottom: 2rem;
}

.solution-btn {
  padding: 0.75rem 1.5rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}

.solution-btn:hover {
  background: #3182ce;
}

/* 使用場景 */
.scenario-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.scenario-card {
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid;
}

.js-card {
  border-color: #f6ad55;
  background: #fffaf0;
}

.ts-card {
  border-color: #4299e1;
  background: #ebf8ff;
}

.scenario-card h4 {
  margin-bottom: 1rem;
  color: #2d3748;
}

.scenario-card ul {
  list-style: none;
  padding: 0;
}

.scenario-card li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.scenario-card li:last-child {
  border-bottom: none;
}

/* 總結區域 */
.summary-section {
  background: #f7fafc;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.key-points h4,
.next-steps h4 {
  margin-bottom: 1rem;
  color: #2d3748;
}

.key-points ul {
  margin-bottom: 2rem;
  padding-left: 1.5rem;
}

.key-points li {
  margin-bottom: 0.5rem;
  color: #4a5568;
  line-height: 1.6;
}

.next-steps p {
  color: #4a5568;
  line-height: 1.6;
}

/* 導航按鈕 */
.navigation-footer {
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.btn-complete {
  padding: 1rem 2rem;
  background: #48bb78;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-complete:hover {
  background: #38a169;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .typescript-vs-javascript {
    padding: 1rem;
  }

  .comparison-grid,
  .code-comparison,
  .before-after,
  .scenario-grid {
    grid-template-columns: 1fr;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .efficiency-metrics {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>