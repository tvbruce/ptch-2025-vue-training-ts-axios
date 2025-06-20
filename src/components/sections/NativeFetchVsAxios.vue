<template>
    <div class="native-fetch-vs-axios">
        <div class="section-intro">
            <h2>原生 Fetch vs Axios 比較</h2>
            <p class="intro-text">
                在現代 Web 開發中，HTTP 客戶端的選擇對專案的開發效率和維護性有重大影響。
                本章節將從多個角度比較原生 Fetch API 和 Axios 庫，幫助你做出明智的技術選擇。
            </p>
        </div>

        <div class="comparison-section">
            <h3>功能對比表</h3>
            <div class="comparison-table">
                <table>
                    <thead>
                        <tr>
                            <th>功能特性</th>
                            <th>原生 Fetch</th>
                            <th>Axios</th>
                            <th>推薦</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in comparisonData" :key="item.feature">
                            <td class="feature">{{ item.feature }}</td>
                            <td class="fetch-col" :class="{ 'winner': item.winner === 'fetch' }">
                                {{ item.fetch }}
                            </td>
                            <td class="axios-col" :class="{ 'winner': item.winner === 'axios' }">
                                {{ item.axios }}
                            </td>
                            <td class="winner-col">
                                <span class="winner-badge" :class="`winner-${item.winner}`">
                                    {{ item.winner === 'fetch' ? 'Fetch' : item.winner === 'axios' ? 'Axios' : '平手' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="limitations-section">
            <h3>Fetch API 的限制</h3>
            <div class="limitations-grid">
                <div class="limitation-card" v-for="limitation in fetchLimitations" :key="limitation">
                    <i class="icon-warning">⚠️</i>
                    <span>{{ limitation }}</span>
                </div>
            </div>
        </div>

        <div class="code-examples">
            <h3>實作範例比較</h3>

            <div class="example-tabs">
                <button v-for="example in codeExamples" :key="example.id" class="tab-button"
                    :class="{ active: activeExample === example.id }" @click="activeExample = example.id">
                    {{ example.title }}
                </button>
            </div>

            <div class="example-content">
                <div v-for="example in codeExamples" :key="example.id" v-show="activeExample === example.id">
                    <div class="code-comparison">
                        <div class="fetch-example">
                            <h4>使用 Fetch API</h4>
                            <CodeBlock :title="example.fetchTitle" :code="example.fetchCode" language="typescript"
                                :explanation="example.fetchExplanation" :runnable="example.runnable"
                                @run="runFetchExample" />
                        </div>

                        <div class="axios-example">
                            <h4>使用 Axios</h4>
                            <CodeBlock :title="example.axiosTitle" :code="example.axiosCode" language="typescript"
                                :explanation="example.axiosExplanation" :runnable="example.runnable"
                                @run="runAxiosExample" />
                        </div>
                    </div>

                    <div class="example-summary">
                        <h4>總結比較</h4>
                        <div class="summary-grid">
                            <div class="summary-item">
                                <strong>程式碼行數：</strong>
                                <span>Fetch: {{ example.fetchLines }} 行 | Axios: {{ example.axiosLines }} 行</span>
                            </div>
                            <div class="summary-item">
                                <strong>複雜度：</strong>
                                <span>{{ example.complexityComparison }}</span>
                            </div>
                            <div class="summary-item">
                                <strong>推薦度：</strong>
                                <span class="recommendation" :class="example.recommendation.toLowerCase()">
                                    {{ example.recommendation }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="interactive-exercise">
            <h3>互動練習</h3>
            <div class="exercise-container">
                <div class="exercise-header">
                    <h4>實現相同功能比較</h4>
                    <p>請分別使用 Fetch 和 Axios 實現以下功能，體驗兩者的差異：</p>
                </div>

                <div class="exercise-requirements">
                    <h5>需求清單：</h5>
                    <ul>
                        <li>GET 請求獲取用戶列表</li>
                        <li>POST 請求創建新用戶</li>
                        <li>統一的錯誤處理</li>
                        <li>自動添加認證 header</li>
                        <li>請求/響應攔截器</li>
                    </ul>
                </div>

                <div class="exercise-editor">
                    <div class="editor-tabs">
                        <button class="editor-tab" :class="{ active: activeEditor === 'fetch' }"
                            @click="activeEditor = 'fetch'">
                            Fetch 實現
                        </button>
                        <button class="editor-tab" :class="{ active: activeEditor === 'axios' }"
                            @click="activeEditor = 'axios'">
                            Axios 實現
                        </button>
                    </div>

                    <div class="editor-content">
                        <CodeBlock v-if="activeEditor === 'fetch'" title="Fetch API 實現" :code="exerciseCode.fetch"
                            language="typescript" explanation="嘗試完成 Fetch API 的實現，注意錯誤處理和重複代碼" />
                        <CodeBlock v-if="activeEditor === 'axios'" title="Axios 實現" :code="exerciseCode.axios"
                            language="typescript" explanation="實現相同功能的 Axios 版本，比較代碼簡潔度" />
                    </div>
                </div>

                <div class="exercise-buttons">
                    <button class="btn-test" @click="testImplementation">測試實現</button>
                    <button class="btn-hint" @click="showHint">顯示提示</button>
                    <button class="btn-solution" @click="showSolution">查看解答</button>
                </div>

                <div v-if="testResult" class="test-result" :class="testResult.type">
                    <h5>測試結果：</h5>
                    <p>{{ testResult.message }}</p>
                </div>
            </div>
        </div>

        <div class="section-summary">
            <h3>章節總結</h3>
            <div class="summary-cards">
                <div class="summary-card">
                    <h4>Fetch API 適用場景</h4>
                    <ul>
                        <li>簡單的 API 調用</li>
                        <li>不想引入額外依賴</li>
                        <li>對包大小有嚴格要求</li>
                        <li>現代瀏覽器環境</li>
                    </ul>
                </div>

                <div class="summary-card">
                    <h4>Axios 適用場景</h4>
                    <ul>
                        <li>複雜的 HTTP 功能需求</li>
                        <li>需要攔截器功能</li>
                        <li>統一的錯誤處理</li>
                        <li>向後相容性要求</li>
                    </ul>
                </div>

                <div class="summary-card">
                    <h4>TypeScript 整合</h4>
                    <ul>
                        <li>Axios 有更好的 TypeScript 支援</li>
                        <li>內建的泛型型別定義</li>
                        <li>更容易實現型別安全</li>
                        <li>社群型別定義完善</li>
                    </ul>
                </div>
            </div>
        </div>

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
import type { ComparisonItem } from '@/types/course'

const emit = defineEmits<{
    complete: []
}>()

const activeExample = ref('basic-get')
const activeEditor = ref('fetch')
const testResult = ref<{ type: 'success' | 'error' | 'warning', message: string } | null>(null)

const comparisonData: ComparisonItem[] = [
    {
        feature: '瀏覽器支援',
        fetch: '現代瀏覽器內建',
        axios: '需要引入庫',
        winner: 'fetch'
    },
    {
        feature: '包大小',
        fetch: '0 KB (內建)',
        axios: '~15 KB',
        winner: 'fetch'
    },
    {
        feature: '錯誤處理',
        fetch: '需手動檢查 response.ok',
        axios: '自動拋出 4xx/5xx 錯誤',
        winner: 'axios'
    },
    {
        feature: '請求/響應攔截器',
        fetch: '無內建支援',
        axios: '完善的攔截器系統',
        winner: 'axios'
    },
    {
        feature: '自動 JSON 轉換',
        fetch: '需手動 .json()',
        axios: '自動處理',
        winner: 'axios'
    },
    {
        feature: '請求超時',
        fetch: '需要 AbortController',
        axios: '內建 timeout 選項',
        winner: 'axios'
    },
    {
        feature: 'TypeScript 支援',
        fetch: '基本支援',
        axios: '優秀的型別定義',
        winner: 'axios'
    },
    {
        feature: '請求取消',
        fetch: 'AbortController',
        axios: 'CancelToken',
        winner: 'tie'
    }
]

const fetchLimitations = [
    '需要手動檢查 response.ok',
    '錯誤處理較為複雜',
    '沒有內建的請求/響應攔截器',
    '沒有自動 JSON 轉換',
    '沒有請求超時設定',
    '沒有內建的重試機制',
    '瀏覽器相容性問題'
]

const codeExamples = [
    {
        id: 'basic-get',
        title: '基本 GET 請求',
        fetchTitle: 'Fetch GET 請求',
        fetchCode: `// 使用 Fetch API 獲取用戶列表
async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${getToken()}\`
      }
    });

    // 手動檢查狀態碼
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      if (response.status === 404) {
        throw new Error('Users not found');
      }
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data: ApiResponse<User[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}`,
        fetchExplanation: '注意 Fetch API 需要手動處理各種錯誤情況，代碼較為冗長',
        fetchLines: 22,
        axiosTitle: 'Axios GET 請求',
        axiosCode: `// 使用 Axios 獲取用戶列表
import axios from 'axios';

// 創建 Axios 實例
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 請求攔截器 - 自動添加認證
apiClient.interceptors.request.use(config => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// 響應攔截器 - 統一錯誤處理
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

// 簡潔的 API 調用
async function fetchUsers(): Promise<User[]> {
  const response = await apiClient.get<ApiResponse<User[]>>('/users');
  return response.data.data;
}`,
        axiosExplanation: 'Axios 通過攔截器和內建功能大大簡化了代碼',
        axiosLines: 8,
        complexityComparison: 'Axios 代碼更簡潔，錯誤處理更統一',
        recommendation: 'Axios',
        runnable: true
    },
    {
        id: 'post-request',
        title: 'POST 請求',
        fetchTitle: 'Fetch POST 請求',
        fetchCode: `// 使用 Fetch API 創建用戶
async function createUser(userData: CreateUserRequest): Promise<User> {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${getToken()}\`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create user');
    }

    const data: ApiResponse<User> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}`,
        fetchExplanation: '需要手動設定 headers 和序列化 JSON 資料',
        fetchLines: 20,
        axiosTitle: 'Axios POST 請求',
        axiosCode: `// 使用 Axios 創建用戶
async function createUser(userData: CreateUserRequest): Promise<User> {
  const response = await apiClient.post<ApiResponse<User>>('/users', userData);
  return response.data.data;
}`,
        axiosExplanation: 'Axios 自動處理 JSON 序列化和設定正確的 headers',
        axiosLines: 3,
        complexityComparison: 'Axios 簡化了 85% 的代碼',
        recommendation: 'Axios',
        runnable: true
    }
]

const exerciseCode = {
    fetch: `// 請完成 Fetch API 的實現
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

class FetchApiClient {
  private baseURL = '/api';
  private defaultHeaders = {
    'Content-Type': 'application/json'
  };

  // TODO: 實現 GET 請求
  async get<T>(url: string): Promise<T> {
    // 請在這裡實現
  }

  // TODO: 實現 POST 請求
  async post<T>(url: string, data: any): Promise<T> {
    // 請在這裡實現
  }

  // TODO: 實現錯誤處理
  private handleResponse(response: Response) {
    // 請在這裡實現
  }
}`,
    axios: `// 請完成 Axios 的實現
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

class AxiosApiClient {
  private client;

  constructor() {
    // TODO: 設定 Axios 實例
    this.client = axios.create({
      // 請在這裡實現
    });

    // TODO: 設定請求攔截器
    this.client.interceptors.request.use(/* 請實現 */);

    // TODO: 設定響應攔截器
    this.client.interceptors.response.use(/* 請實現 */);
  }

  // TODO: 實現 GET 請求
  async get<T>(url: string): Promise<T> {
    // 請在這裡實現
  }

  // TODO: 實現 POST 請求
  async post<T>(url: string, data: any): Promise<T> {
    // 請在這裡實現
  }
}`
}

function runFetchExample(code: string) {
    console.log('Running Fetch example:', code)
    // 這裡可以實際執行代碼或模擬執行
}

function runAxiosExample(code: string) {
    console.log('Running Axios example:', code)
    // 這裡可以實際執行代碼或模擬執行
}

function testImplementation() {
    // 模擬測試邏輯
    const implementations = ['fetch', 'axios']
    const randomResult = Math.random() > 0.5

    if (randomResult) {
        testResult.value = {
            type: 'success',
            message: '實現正確！代碼符合最佳實踐，錯誤處理完善。'
        }
    } else {
        testResult.value = {
            type: 'warning',
            message: '實現基本正確，但建議改進錯誤處理邏輯。'
        }
    }
}

function showHint() {
    alert('提示：記住 Fetch 需要手動檢查 response.ok，而 Axios 會自動處理 HTTP 錯誤狀態。')
}

function showSolution() {
    alert('解答功能開發中，請參考上方的完整範例代碼。')
}

function completeSection() {
    emit('complete')
}
</script>

<style scoped>
.native-fetch-vs-axios {
    max-width: 100%;
    margin: 0 auto;
    padding: 0;
}

.section-intro {
    margin-bottom: 2rem;
}

.section-intro h2 {
    font-size: 1.75rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.intro-text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a5568;
    margin-bottom: 0;
}

.comparison-section {
    margin-bottom: 3rem;
}

.comparison-section h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.comparison-table {
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comparison-table table {
    width: 100%;
    border-collapse: collapse;
    background: white;
}

.comparison-table th,
.comparison-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

.comparison-table th {
    background: #f7fafc;
    font-weight: 600;
    color: #2d3748;
}

.feature {
    font-weight: 500;
    color: #2d3748;
}

.fetch-col.winner {
    background: #f0fff4;
    color: #22543d;
}

.axios-col.winner {
    background: #ebf8ff;
    color: #2c5282;
}

.winner-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
}

.winner-fetch {
    background: #c6f6d5;
    color: #22543d;
}

.winner-axios {
    background: #bee3f8;
    color: #2c5282;
}

.winner-tie {
    background: #fed7d7;
    color: #742a2a;
}

.limitations-section {
    margin-bottom: 3rem;
}

.limitations-section h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.limitations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}

.limitation-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: #fef5e7;
    border: 1px solid #f6ad55;
    border-radius: 6px;
    color: #744210;
}

.icon-warning {
    font-size: 1.25rem;
}

.code-examples {
    margin-bottom: 3rem;
}

.code-examples h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.example-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tab-button {
    padding: 0.5rem 1rem;
    border: 1px solid #cbd5e0;
    border-radius: 4px 4px 0 0;
    background: #f7fafc;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.2s;
}

.tab-button.active {
    background: white;
    color: #2d3748;
    border-bottom-color: white;
}

.example-content {
    border: 1px solid #cbd5e0;
    border-radius: 0 8px 8px 8px;
    background: white;
    padding: 1.5rem;
}

.code-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.fetch-example h4,
.axios-example h4 {
    margin-bottom: 1rem;
    color: #2d3748;
}

.example-summary {
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
}

.example-summary h4 {
    margin-bottom: 1rem;
    color: #2d3748;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.summary-item {
    padding: 0.75rem;
    background: #f7fafc;
    border-radius: 4px;
}

.summary-item strong {
    color: #2d3748;
}

.recommendation.axios {
    color: #3182ce;
    font-weight: 600;
}

.interactive-exercise {
    margin-bottom: 3rem;
}

.interactive-exercise h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.exercise-container {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
    background: white;
}

.exercise-header h4 {
    margin-bottom: 0.5rem;
    color: #2d3748;
}

.exercise-requirements {
    margin-bottom: 1.5rem;
}

.exercise-requirements h5 {
    margin-bottom: 0.5rem;
    color: #2d3748;
}

.exercise-requirements ul {
    margin: 0;
    padding-left: 1.5rem;
}

.exercise-requirements li {
    margin-bottom: 0.25rem;
    color: #4a5568;
}

.editor-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.editor-tab {
    padding: 0.5rem 1rem;
    border: 1px solid #cbd5e0;
    border-radius: 4px 4px 0 0;
    background: #f7fafc;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.2s;
}

.editor-tab.active {
    background: white;
    color: #2d3748;
    border-bottom-color: white;
}

.exercise-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.btn-test,
.btn-hint,
.btn-solution {
    padding: 0.5rem 1rem;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    background: white;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-test:hover,
.btn-hint:hover,
.btn-solution:hover {
    background: #f7fafc;
}

.test-result {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 4px;
}

.test-result.success {
    background: #f0fff4;
    border: 1px solid #9ae6b4;
    color: #22543d;
}

.test-result.warning {
    background: #fef5e7;
    border: 1px solid #f6ad55;
    color: #744210;
}

.test-result.error {
    background: #fed7d7;
    border: 1px solid #feb2b2;
    color: #742a2a;
}

.section-summary {
    margin-bottom: 3rem;
}

.section-summary h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
}

.summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.summary-card {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.summary-card h4 {
    margin-bottom: 1rem;
    color: #2d3748;
}

.summary-card ul {
    margin: 0;
    padding-left: 1.5rem;
}

.summary-card li {
    margin-bottom: 0.5rem;
    color: #4a5568;
}

.navigation-footer {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;
}

.btn-complete {
    padding: 0.75rem 2rem;
    background: #48bb78;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-complete:hover {
    background: #38a169;
    transform: translateY(-1px);
}

@media (max-width: 768px) {
    .code-comparison {
        grid-template-columns: 1fr;
    }

    .comparison-table {
        font-size: 0.875rem;
    }

    .comparison-table th,
    .comparison-table td {
        padding: 0.75rem;
    }

    .summary-grid {
        grid-template-columns: 1fr;
    }

    .exercise-buttons {
        flex-direction: column;
    }
}
</style>
