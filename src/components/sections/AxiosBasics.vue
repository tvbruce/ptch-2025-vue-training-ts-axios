<template>
  <div class="section-content">
    <!-- 章節標題 -->
    <div class="section-header">
      <h2>Axios 基礎使用</h2>
      <p class="section-description">
        深入學習 Axios HTTP 客戶端庫的基礎用法，包括安裝配置、HTTP 方法使用和基本錯誤處理。
      </p>
    </div>

    <!-- Fetch API vs Axios 深度對比 -->
    <div class="content-block">
      <h3>⚔️ Fetch API vs Axios 深度對比</h3>

      <div class="comparison-intro">
        <p>在選擇 HTTP 客戶端工具時，了解 Fetch API 與 Axios 的差異至關重要。本節將通過實際範例展示兩者的優缺點。</p>
      </div>

      <div class="comparison-tabs">
        <div class="tab-buttons">
          <button class="tab-button" :class="{ active: activeComparison === 'basic' }"
            @click="activeComparison = 'basic'">
            基本請求對比
          </button>
          <button class="tab-button" :class="{ active: activeComparison === 'error' }"
            @click="activeComparison = 'error'">
            錯誤處理對比
          </button>
          <button class="tab-button" :class="{ active: activeComparison === 'config' }"
            @click="activeComparison = 'config'">
            配置複雜度對比
          </button>
        </div>

        <div class="tab-content">
          <!-- 基本請求對比 -->
          <div v-show="activeComparison === 'basic'" class="comparison-grid">
            <div class="fetch-example">
              <h4>❌ 使用 Fetch API（繁瑣）</h4>
              <CodeBlock title="Fetch API 基本 GET 請求" :code="fetchBasicCode" language="typescript"
                explanation="Fetch API 需要手動處理 JSON 轉換和狀態檢查" />
            </div>

            <div class="axios-example">
              <h4>✅ 使用 Axios（簡潔）</h4>
              <CodeBlock title="Axios 基本 GET 請求" :code="axiosBasicCode" language="typescript"
                explanation="Axios 自動處理 JSON 和狀態檢查，代碼更簡潔" />
            </div>
          </div>

          <!-- 錯誤處理對比 -->
          <div v-show="activeComparison === 'error'" class="comparison-grid">
            <div class="fetch-example">
              <h4>❌ Fetch 錯誤處理（複雜）</h4>
              <CodeBlock title="Fetch API 複雜錯誤處理" :code="fetchErrorCode" language="typescript"
                explanation="Fetch 需要手動檢查各種錯誤情況" />
            </div>

            <div class="axios-example">
              <h4>✅ Axios 錯誤處理（優雅）</h4>
              <CodeBlock title="Axios 簡潔錯誤處理" :code="axiosErrorCode" language="typescript"
                explanation="Axios 提供統一的錯誤處理和豐富的錯誤資訊" />
            </div>
          </div>

          <!-- 配置複雜度對比 -->
          <div v-show="activeComparison === 'config'" class="comparison-grid">
            <div class="fetch-example">
              <h4>❌ Fetch 進階配置（冗長）</h4>
              <CodeBlock title="Fetch API 進階配置" :code="fetchConfigCode" language="typescript"
                explanation="Fetch 需要大量模板代碼來實現進階功能" />
            </div>

            <div class="axios-example">
              <h4>✅ Axios 進階配置（直觀）</h4>
              <CodeBlock title="Axios 進階配置" :code="axiosConfigCode" language="typescript"
                explanation="Axios 提供豐富的配置選項和攔截器機制" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 效率與維護性分析 -->
    <div class="content-block">
      <h3>📊 效率與維護性分析</h3>

      <div class="metrics-grid">
        <div class="metric-card fetch-metric">
          <h4>Fetch API</h4>
          <div class="metric-item">
            <span class="metric-label">代碼行數</span>
            <span class="metric-value high">+40%</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">錯誤處理複雜度</span>
            <span class="metric-value high">高</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">學習曲線</span>
            <span class="metric-value medium">中等</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Bundle 大小</span>
            <span class="metric-value low">0KB（內建）</span>
          </div>
        </div>

        <div class="metric-card axios-metric">
          <h4>Axios</h4>
          <div class="metric-item">
            <span class="metric-label">代碼行數</span>
            <span class="metric-value low">基準</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">錯誤處理複雜度</span>
            <span class="metric-value low">低</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">學習曲線</span>
            <span class="metric-value low">平緩</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Bundle 大小</span>
            <span class="metric-value medium">~13KB</span>
          </div>
        </div>
      </div>
    </div>

    <!-- C# HttpClient 對比 -->
    <div class="content-block">
      <h3>🔷 與 C# HttpClient 的相似性</h3>

      <div class="csharp-comparison">
        <p>對於有其他語言經驗的開發人員，Axios 的設計理念與許多語言的 HTTP 客戶端非常相似：</p>

        <div class="similarity-grid">
          <div class="similarity-item">
            <h4>🎯 相似點</h4>
            <ul>
              <li>統一的客戶端實例管理</li>
              <li>豐富的配置選項</li>
              <li>攔截器概念（類似 DelegatingHandler）</li>
              <li>自動序列化/反序列化</li>
              <li>完善的錯誤處理機制</li>
            </ul>
          </div>

          <div class="similarity-item">
            <h4>💡 學習建議</h4>
            <ul>
              <li>將 Axios 實例視為 HttpClient</li>
              <li>攔截器等同於 HTTP 中介軟體</li>
              <li>配置對象類似於 HttpClientHandler</li>
              <li>Promise 對應於 Task&lt;HttpResponseMessage&gt;</li>
            </ul>
          </div>
        </div>

        <CodeBlock title="C# HttpClient vs Axios 概念對照" :code="csharpComparisonCode" language="typescript"
          explanation="展示 C# HttpClient 與 Axios 的概念對應關係" />
      </div>
    </div>

    <!-- Axios 介紹 -->
    <div class="content-block">
      <h3>🚀 Axios 深入介紹</h3>
      <div class="intro-card">
        <p>
          經過對比分析，我們可以看出 Axios 在開發效率和代碼維護性方面的優勢。
          現在讓我們深入了解 Axios 的核心功能。
        </p>

        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🔧</div>
            <h4>豐富的配置</h4>
            <p>支援請求攔截器、響應攔截器、超時設定等</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🛡️</div>
            <h4>自動錯誤處理</h4>
            <p>自動 JSON 解析和完善的錯誤處理機制</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔄</div>
            <h4>請求管理</h4>
            <p>支援請求取消、重試機制和並發控制</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📱</div>
            <h4>跨平台兼容</h4>
            <p>同時支援瀏覽器和 Node.js 環境</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 安裝與基本設定 -->
    <div class="content-block">
      <h3>📦 安裝與基本設定</h3>

      <CodeBlock title="Axios 安裝" :code="installationCode" language="bash" explanation="安裝 Axios 和其 TypeScript 型別定義" />

      <CodeBlock title="基本配置" :code="basicConfigCode" language="typescript" explanation="創建 Axios 實例並設定基本配置選項"
        :runnable="true" @run="runBasicConfig" />
    </div>

    <!-- HTTP 方法使用 -->
    <div class="content-block">
      <h3>🌐 HTTP 方法使用</h3>

      <div class="method-tabs">
        <div class="tab-buttons">
          <button v-for="method in httpMethods" :key="method.name" class="tab-button"
            :class="{ active: activeMethod === method.name }" @click="activeMethod = method.name">
            {{ method.name.toUpperCase() }}
          </button>
        </div>

        <div class="tab-content">
          <div v-for="method in httpMethods" :key="method.name" v-show="activeMethod === method.name">
            <div class="method-description">
              <h4>{{ method.title }}</h4>
              <p>{{ method.description }}</p>
            </div>

            <CodeBlock :title="`${method.name.toUpperCase()} 請求範例`" :code="method.code" language="typescript"
              :explanation="method.explanation" :runnable="true" @run="runHttpMethod(method.name)" />
          </div>
        </div>
      </div>
    </div>

    <!-- 錯誤處理 -->
    <div class="content-block">
      <h3>⚠️ 錯誤處理</h3>

      <CodeBlock title="完整的錯誤處理" :code="errorHandlingCode" language="typescript"
        explanation="實作完善的錯誤處理機制，包括網路錯誤、HTTP 錯誤和超時處理" :runnable="true" @run="runErrorHandling" />
    </div>

    <!-- 實際演示 -->
    <div class="content-block">
      <h3>🎯 實際演示</h3>

      <div class="demo-section">
        <h4>測試 API 請求</h4>
        <div class="api-config-info">
          <p><strong>🔧 當前配置：</strong></p>
          <ul>
            <li>環境: {{ apiConfig.environment }}</li>
            <li>API 基礎 URL: {{ apiConfig.baseURL }}</li>
            <li>使用 JSON Server: {{ apiConfig.useJSONServer ? '是' : '否' }}</li>
          </ul>
          <p v-if="apiConfig.useJSONServer" class="json-server-note">
            📝 <strong>注意：</strong>請確保 JSON Server 正在運行：<code>npm run json-server</code>
          </p>
        </div>
        <p>點擊按鈕測試不同的 Axios 功能：</p>

        <div class="demo-buttons">
          <button class="demo-btn" @click="testGetRequest" :disabled="loading">
            {{ loading && currentTest === 'get' ? '請求中...' : '測試 GET 請求' }}
          </button>
          <button class="demo-btn" @click="testPostRequest" :disabled="loading">
            {{ loading && currentTest === 'post' ? '創建中...' : '測試 POST 請求' }}
          </button>
          <button class="demo-btn" @click="testErrorRequest" :disabled="loading">
            {{ loading && currentTest === 'error' ? '測試中...' : '測試錯誤處理' }}
          </button>
          <button class="demo-btn" @click="testTimeout" :disabled="loading">
            {{ loading && currentTest === 'timeout' ? '測試中...' : '測試超時' }}
          </button>
        </div>

        <div v-if="demoResult" class="demo-result">
          <h5>執行結果：</h5>
          <pre>{{ demoResult }}</pre>
        </div>
      </div>
    </div>

    <!-- 練習區域 -->
    <div class="content-block">
      <h3>💻 動手練習</h3>

      <div class="exercise-card">
        <h4>練習：建立用戶管理系統</h4>
        <p>實作一個完整的用戶管理 CRUD 系統，包含以下功能：</p>

        <ul class="exercise-requirements">
          <li>獲取所有用戶列表</li>
          <li>根據 ID 獲取單個用戶</li>
          <li>創建新用戶</li>
          <li>更新用戶資訊</li>
          <li>刪除用戶</li>
          <li>適當的錯誤處理</li>
        </ul>

        <CodeBlock title="練習模板" :code="exerciseTemplate" language="typescript" explanation="在這個模板基礎上實作完整的用戶管理功能" />

        <button class="start-exercise-btn" @click="showExerciseSolution = !showExerciseSolution">
          {{ showExerciseSolution ? '隱藏' : '查看' }}參考解答
        </button>

        <div v-if="showExerciseSolution" class="exercise-solution">
          <CodeBlock title="參考解答" :code="exerciseSolution" language="typescript"
            explanation="這是一個參考實作，展示了如何使用 Axios 建立型別安全的用戶管理系統" />
        </div>
      </div>
    </div>

    <!-- 章節總結 -->
    <div class="content-block">
      <h3>📋 章節總結</h3>

      <div class="summary-card">
        <h4>本章節學到的重點：</h4>
        <ul class="summary-list">
          <li>Axios 的優勢和特色功能</li>
          <li>如何安裝和配置 Axios</li>
          <li>各種 HTTP 方法的使用方式</li>
          <li>完善的錯誤處理機制</li>
          <li>實際的 API 請求演示</li>
        </ul>

        <div class="next-steps">
          <h4>下一步學習：</h4>
          <p>在下一章節中，我們將學習如何在 TypeScript 專案中使用 Axios，包括型別安全、攔截器、和進階功能。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'
import { userAPI, testAPI, apiConfig } from '@/utils/apiClient'

interface SectionData {
  title: string
}

defineProps<{
  section?: SectionData
}>()

const activeMethod = ref('get')
const activeComparison = ref('basic')
const loading = ref(false)
const currentTest = ref('')
const demoResult = ref('')
const showExerciseSolution = ref(false)

// Fetch vs Axios 對比代碼範例
const fetchBasicCode = `// Fetch API - 需要更多手動處理
async function getUserData(id: number): Promise<User> {
    try {
        const response = await fetch(\`/api/users/\${id}\`)

        // 手動檢查 HTTP 狀態
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`)
        }

        // 手動解析 JSON
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Request failed:', error)
        throw error
    }
}`

const axiosBasicCode = `// Axios - 自動處理常見任務
async function getUserData(id: number): Promise<User> {
    try {
        const response = await axios.get<User>(\`/api/users/\${id}\`)
        return response.data  // 自動解析的 JSON
    } catch (error) {
        console.error('Request failed:', error)
        throw error
    }
}`

const fetchErrorCode = `// Fetch API - 複雜的錯誤處理
async function createUser(userData: CreateUserRequest): Promise<User> {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })

        // 需要手動檢查各種狀態碼
        if (response.status === 400) {
            const errorData = await response.json()
            throw new ValidationError(errorData.message)
        }

        if (response.status === 401) {
            throw new AuthenticationError('Unauthorized')
        }

        if (response.status === 403) {
            throw new AuthorizationError('Forbidden')
        }

        if (response.status >= 500) {
            throw new ServerError('Internal server error')
        }

        if (!response.ok) {
            throw new Error(\`Unknown error: \${response.status}\`)
        }

        return await response.json()
    } catch (error) {
        if (error instanceof TypeError) {
            throw new NetworkError('Network connection failed')
        }
        throw error
    }
}`

const axiosErrorCode = `// Axios - 統一優雅的錯誤處理
async function createUser(userData: CreateUserRequest): Promise<User> {
    try {
        const response = await axios.post<User>('/api/users', userData)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status
            const message = error.response?.data?.message || error.message

            switch (status) {
                case 400:
                    throw new ValidationError(message)
                case 401:
                    throw new AuthenticationError('Unauthorized')
                case 403:
                    throw new AuthorizationError('Forbidden')
                case 500:
                    throw new ServerError('Internal server error')
                default:
                    throw new Error(\`Request failed: \${message}\`)
            }
        }
        throw error
    }
}`

const fetchConfigCode = `// Fetch API - 需要大量設定代碼
class FetchApiClient {
    private baseURL = '/api'
    private defaultHeaders = {
        'Content-Type': 'application/json'
    }

    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = \`\${this.baseURL}\${endpoint}\`

        // 手動組合 headers
        const headers = {
            ...this.defaultHeaders,
            ...options.headers
        }

        // 手動添加認證
        const token = localStorage.getItem('token')
        if (token) {
            headers.Authorization = \`Bearer \${token}\`
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
                // 手動設定超時
                signal: AbortSignal.timeout(10000)
            })

            if (!response.ok) {
                throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
            }

            const contentType = response.headers.get('content-type')
            if (contentType?.includes('application/json')) {
                return await response.json()
            } else {
                return await response.text() as any
            }
        } catch (error) {
            // 手動處理各種錯誤類型
            if (error instanceof DOMException && error.name === 'TimeoutError') {
                throw new Error('Request timeout')
            }
            throw error
        }
    }
}`

const axiosConfigCode = `// Axios - 簡潔的設定和強大功能
const apiClient = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 請求攔截器 - 自動添加認證
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
        config.headers.Authorization = \`Bearer \${token}\`
    }
    return config
})

// 響應攔截器 - 統一錯誤處理
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // 自動處理認證過期
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

// 使用變得非常簡單
const getUsers = () => apiClient.get<User[]>('/users')
const createUser = (data: CreateUserRequest) => apiClient.post<User>('/users', data)`

const csharpComparisonCode = `/*
C# HttpClient 概念對照：

// C# HttpClient 設定
var client = new HttpClient()
{
    BaseAddress = new Uri("https://api.example.com/"),
    Timeout = TimeSpan.FromSeconds(30)
};
client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

// TypeScript Axios 等價設定
const client = axios.create({
    baseURL: 'https://api.example.com/',
    timeout: 30000,
    headers: {
        'Authorization': \`Bearer \${token}\`
    }
});

// C# 發送請求
var response = await client.GetAsync("/users");
var users = await response.Content.ReadFromJsonAsync<User[]>();

// TypeScript Axios 等價請求
const response = await client.get<User[]>('/users');
const users = response.data;

// C# 中介軟體 (DelegatingHandler)
public class AuthHandler : DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        // 添加認證邏輯
        return await base.SendAsync(request, cancellationToken);
    }
}

// TypeScript Axios 攔截器（相同概念）
client.interceptors.request.use(config => {
    // 添加認證邏輯
    return config;
});
*/

// 實際對照範例
interface User {
    id: number;
    name: string;
    email: string;
}

// 相似的 API 客戶端設計模式
class TypeSafeApiClient {
    private client = axios.create({
        baseURL: '/api',
        timeout: 10000
    });

    // 類似 C# 的泛型方法
    async get<T>(endpoint: string): Promise<T> {
        const response = await this.client.get<T>(endpoint);
        return response.data;
    }

    async post<TRequest, TResponse>(endpoint: string, data: TRequest): Promise<TResponse> {
        const response = await this.client.post<TResponse>(endpoint, data);
        return response.data;
    }
}`

const installationCode = `# 使用 npm 安裝
npm install axios

# 安裝 TypeScript 型別定義（如果需要）
npm install @types/axios --save-dev

# 使用 yarn 安裝
yarn add axios`

const basicConfigCode = `import axios from 'axios';

// 創建 Axios 實例
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 基本請求範例
async function getUsers() {
  try {
    const response = await apiClient.get('/users');
    console.log('用戶列表:', response.data);
    return response.data;
  } catch (error) {
    console.error('請求失敗:', error);
    throw error;
  }
}`

const httpMethods = ref([
  {
    name: 'get',
    title: 'GET 請求 - 獲取資料',
    description: 'GET 方法用於從伺服器獲取資料，是最常用的 HTTP 方法之一。',
    code: `// GET 請求 - 獲取所有用戶
const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('獲取用戶失敗:', error);
    throw error;
  }
};

// GET 請求 - 根據 ID 獲取單個用戶
const getUser = async (id: number) => {
  try {
    const response = await apiClient.get(\`/users/\${id}\`);
    return response.data;
  } catch (error) {
    console.error(\`獲取用戶 \${id} 失敗:\`, error);
    throw error;
  }
};

// GET 請求 - 帶查詢參數
const getUsersWithParams = async (page: number, limit: number) => {
  try {
    const response = await apiClient.get('/users', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('獲取用戶列表失敗:', error);
    throw error;
  }
};`,
    explanation: 'GET 請求不會修改伺服器資料，適用於資料查詢操作'
  },
  {
    name: 'post',
    title: 'POST 請求 - 創建資料',
    description: 'POST 方法用於向伺服器提交新資料，通常用於創建新的資源。',
    code: `// POST 請求 - 創建新用戶
interface CreateUserRequest {
  name: string;
  email: string;
}

const createUser = async (userData: CreateUserRequest) => {
  try {
    const response = await apiClient.post('/users', userData);
    console.log('用戶創建成功:', response.data);
    return response.data;
  } catch (error) {
    console.error('創建用戶失敗:', error);
    throw error;
  }
};

// POST 請求 - 上傳檔案
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('檔案上傳失敗:', error);
    throw error;
  }
};`,
    explanation: 'POST 請求會在伺服器上創建新資源，請求體包含要創建的資料'
  },
  {
    name: 'put',
    title: 'PUT 請求 - 更新資料',
    description: 'PUT 方法用於完整更新現有資源，會替換整個資源。',
    code: `// PUT 請求 - 完整更新用戶
interface UpdateUserRequest {
  name: string;
  email: string;
  role?: string;
}

const updateUser = async (id: number, userData: UpdateUserRequest) => {
  try {
    const response = await apiClient.put(\`/users/\${id}\`, userData);
    console.log('用戶更新成功:', response.data);
    return response.data;
  } catch (error) {
    console.error(\`更新用戶 \${id} 失敗:\`, error);
    throw error;
  }
};

// PUT 請求 - 替換整個資源
const replaceUser = async (id: number, newUserData: CreateUserRequest) => {
  try {
    const response = await apiClient.put(\`/users/\${id}\`, newUserData);
    return response.data;
  } catch (error) {
    console.error('替換用戶失敗:', error);
    throw error;
  }
};`,
    explanation: 'PUT 請求會完全替換目標資源，適用於完整更新操作'
  },
  {
    name: 'patch',
    title: 'PATCH 請求 - 部分更新',
    description: 'PATCH 方法用於部分更新現有資源，只修改指定的欄位。',
    code: `// PATCH 請求 - 部分更新用戶
const patchUser = async (id: number, updates: Partial<UpdateUserRequest>) => {
  try {
    const response = await apiClient.patch(\`/users/\${id}\`, updates);
    console.log('用戶部分更新成功:', response.data);
    return response.data;
  } catch (error) {
    console.error(\`部分更新用戶 \${id} 失敗:\`, error);
    throw error;
  }
};

// 範例：只更新用戶名稱
const updateUserName = async (id: number, name: string) => {
  return patchUser(id, { name });
};

// 範例：只更新用戶郵箱
const updateUserEmail = async (id: number, email: string) => {
  return patchUser(id, { email });
};`,
    explanation: 'PATCH 請求只更新指定的欄位，適用於部分更新操作'
  },
  {
    name: 'delete',
    title: 'DELETE 請求 - 刪除資料',
    description: 'DELETE 方法用於刪除伺服器上的資源。',
    code: `// DELETE 請求 - 刪除用戶
const deleteUser = async (id: number) => {
  try {
    const response = await apiClient.delete(\`/users/\${id}\`);
    console.log(\`用戶 \${id} 刪除成功\`);
    return response.data;
  } catch (error) {
    console.error(\`刪除用戶 \${id} 失敗:\`, error);
    throw error;
  }
};

// DELETE 請求 - 批量刪除
const deleteMultipleUsers = async (userIds: number[]) => {
  try {
    const response = await apiClient.delete('/users', {
      data: { ids: userIds }
    });
    console.log(\`成功刪除 \${userIds.length} 個用戶\`);
    return response.data;
  } catch (error) {
    console.error('批量刪除用戶失敗:', error);
    throw error;
  }
};

// DELETE 請求 - 軟刪除
const softDeleteUser = async (id: number) => {
  return patchUser(id, { isDeleted: true });
};`,
    explanation: 'DELETE 請求會從伺服器刪除指定資源，操作不可逆'
  }
])

const errorHandlingCode = `import axios, { AxiosError } from 'axios';

interface ApiError {
  message: string;
  code: string;
  status: number;
}

// 完整的錯誤處理函數
const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    // 伺服器回應了錯誤狀態碼
    return {
      message: error.response.data?.message || '伺服器錯誤',
      code: error.response.data?.code || 'SERVER_ERROR',
      status: error.response.status
    };
  } else if (error.request) {
    // 請求已發出但沒有收到回應
    return {
      message: '網路錯誤，請檢查網路連接',
      code: 'NETWORK_ERROR',
      status: 0
    };
  } else {
    // 其他錯誤
    return {
      message: error.message || '未知錯誤',
      code: 'UNKNOWN_ERROR',
      status: 0
    };
  }
};

// 使用錯誤處理的 API 函數
const safeApiCall = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = handleApiError(error);
      console.error('API 錯誤:', apiError);

      // 根據錯誤類型採取不同行動
      switch (apiError.status) {
        case 401:
          // 未授權，重新導向登入頁
          window.location.href = '/login';
          break;
        case 403:
          // 禁止存取
          alert('您沒有權限執行此操作');
          break;
        case 404:
          // 資源不存在
          alert('請求的資源不存在');
          break;
        case 500:
          // 伺服器錯誤
          alert('伺服器錯誤，請稍後再試');
          break;
        default:
          alert(apiError.message);
      }

      throw apiError;
    }

    throw error;
  }
};

// 使用範例
const getUserSafely = async (id: number) => {
  return safeApiCall(() => apiClient.get(\`/users/\${id}\`));
};`

const exerciseTemplate = `interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
}

class UserService {
  private apiClient = axios.create({
    baseURL: '/api',
    timeout: 5000
  });

  // TODO: 實作 getAllUsers 方法
  async getAllUsers(): Promise<User[]> {
    // 在這裡實作
  }

  // TODO: 實作 getUser 方法
  async getUser(id: number): Promise<User> {
    // 在這裡實作
  }

  // TODO: 實作 createUser 方法
  async createUser(userData: CreateUserRequest): Promise<User> {
    // 在這裡實作
  }

  // TODO: 實作 updateUser 方法
  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    // 在這裡實作
  }

  // TODO: 實作 deleteUser 方法
  async deleteUser(id: number): Promise<void> {
    // 在這裡實作
  }
}`

const exerciseSolution = `interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

class UserService {
  private apiClient = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 請求攔截器
    this.apiClient.interceptors.request.use(
      (config) => {
        console.log('發送請求:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('請求錯誤:', error);
        return Promise.reject(error);
      }
    );

    // 響應攔截器
    this.apiClient.interceptors.response.use(
      (response) => {
        console.log('收到響應:', response.status, response.config.url);
        return response;
      },
      (error) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      console.error(\`API 錯誤 \${error.response.status}:\`, error.response.data);
    } else if (error.request) {
      console.error('網路錯誤:', error.request);
    } else {
      console.error('請求設定錯誤:', error.message);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<User[]>>('/users');
      return response.data.data;
    } catch (error) {
      console.error('獲取用戶列表失敗:', error);
      throw error;
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      const response = await this.apiClient.get<ApiResponse<User>>(\`/users/\${id}\`);
      return response.data.data;
    } catch (error) {
      console.error(\`獲取用戶 \${id} 失敗:\`, error);
      throw error;
    }
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const response = await this.apiClient.post<ApiResponse<User>>('/users', userData);
      console.log('用戶創建成功:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('創建用戶失敗:', error);
      throw error;
    }
  }

  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    try {
      const response = await this.apiClient.patch<ApiResponse<User>>(\`/users/\${id}\`, userData);
      console.log(\`用戶 \${id} 更新成功:\`, response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(\`更新用戶 \${id} 失敗:\`, error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.apiClient.delete(\`/users/\${id}\`);
      console.log(\`用戶 \${id} 刪除成功\`);
    } catch (error) {
      console.error(\`刪除用戶 \${id} 失敗:\`, error);
      throw error;
    }
  }
}

// 使用範例
const userService = new UserService();

// 測試 CRUD 操作
async function testUserService() {
  try {
    // 獲取所有用戶
    const users = await userService.getAllUsers();
    console.log('所有用戶:', users);

    // 創建新用戶
    const newUser = await userService.createUser({
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('新用戶:', newUser);

    // 獲取單個用戶
    const user = await userService.getUser(newUser.id);
    console.log('用戶詳情:', user);

    // 更新用戶
    const updatedUser = await userService.updateUser(newUser.id, {
      name: 'John Smith'
    });
    console.log('更新後用戶:', updatedUser);

    // 刪除用戶
    await userService.deleteUser(newUser.id);
    console.log('用戶已刪除');

  } catch (error) {
    console.error('測試失敗:', error);
  }
}`

// 演示功能
const testGetRequest = async () => {
  loading.value = true
  currentTest.value = 'get'

  try {
    console.log('🔍 當前 API 配置:', apiConfig)
    const users = await userAPI.getUsers()
    demoResult.value = `✅ 成功獲取 ${users.length} 個用戶:\n\n${JSON.stringify(users.slice(0, 3), null, 2)}`
  } catch (error) {
    demoResult.value = `❌ 請求失敗: ${error}\n\n請確保 JSON Server 正在運行：npm run json-server`
  } finally {
    loading.value = false
    currentTest.value = ''
  }
}

const testPostRequest = async () => {
  loading.value = true
  currentTest.value = 'post'

  try {
    const newUser = await testAPI.testCreateUser()
    demoResult.value = `✅ 成功創建用戶:\n\n${JSON.stringify(newUser, null, 2)}`
  } catch (error) {
    demoResult.value = `❌ 創建用戶失敗: ${error}\n\n請確保 JSON Server 正在運行：npm run json-server`
  } finally {
    loading.value = false
    currentTest.value = ''
  }
}

const testErrorRequest = async () => {
  loading.value = true
  currentTest.value = 'error'

  try {
    await testAPI.test404()
  } catch (error) {
    demoResult.value = `✅ 成功測試錯誤處理: ${error}`
  } finally {
    loading.value = false
    currentTest.value = ''
  }
}

const testTimeout = async () => {
  loading.value = true
  currentTest.value = 'timeout'

  try {
    await testAPI.testTimeout()
    demoResult.value = '⏱️ 請求完成（可能比預期慢）'
  } catch (error) {
    demoResult.value = `✅ 超時測試完成: ${error}`
  } finally {
    loading.value = false
    currentTest.value = ''
  }
}

const runBasicConfig = () => {
  demoResult.value = 'Axios 實例配置完成！檢查瀏覽器控制台查看詳細信息。'
}

const runHttpMethod = (method: string) => {
  demoResult.value = `${method.toUpperCase()} 方法代碼已執行！檢查瀏覽器控制台查看結果。`
}

const runErrorHandling = () => {
  demoResult.value = '錯誤處理代碼已設定！現在可以安全地處理各種 API 錯誤。'
}

onMounted(() => {
  console.log('Axios 基礎使用章節已載入')
})
</script>

<style scoped>
.section-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.section-header {
  margin-bottom: 3rem;
  text-align: center;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.content-block {
  margin-bottom: 4rem;
}

.content-block h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.intro-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.intro-card p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.feature-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.feature-item h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-item p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
}

.method-tabs {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.tab-buttons {
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
  color: #4a5568;
  transition: all 0.2s;
}

.tab-button:hover {
  background: #edf2f7;
}

.tab-button.active {
  background: #4299e1;
  color: white;
}

.tab-content {
  padding: 0;
  width: 100%;
  overflow: hidden;
}

.method-description {
  margin-bottom: 1.5rem;
}

.method-description h4 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.method-description p {
  color: #4a5568;
  line-height: 1.6;
}

.demo-section {
  background: #f7fafc;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.demo-section h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.demo-section p {
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.api-config-info {
  background: #e3f2fd;
  border: 1px solid #2196f3;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.api-config-info ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.api-config-info li {
  margin: 0.25rem 0;
  color: #1976d2;
}

.json-server-note {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  padding: 0.75rem;
  margin-top: 1rem;
  color: #856404;
}

.json-server-note code {
  background: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Monaco', 'Consolas', monospace;
  color: #d63384;
}

.demo-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.demo-btn {
  padding: 0.75rem 1.5rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.demo-btn:hover:not(:disabled) {
  background: #3182ce;
  transform: translateY(-1px);
}

.demo-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.demo-result {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.demo-result h5 {
  color: #90cdf4;
  margin-bottom: 0.5rem;
  font-family: inherit;
}

.demo-result pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.exercise-card {
  background: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
}

.exercise-card h4 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.exercise-card p {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.exercise-requirements {
  color: #4a5568;
  margin: 1rem 0 2rem 1rem;
}

.exercise-requirements li {
  margin-bottom: 0.5rem;
}

.start-exercise-btn {
  background: #48bb78;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin: 1rem 0;
  transition: background 0.2s;
}

.start-exercise-btn:hover {
  background: #38a169;
}

.exercise-solution {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.summary-card {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
}

.summary-card h4 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.summary-list {
  margin: 0 0 2rem 1rem;
}

.summary-list li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.next-steps {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 8px;
}

.next-steps h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.next-steps p {
  margin: 0;
  line-height: 1.6;
  opacity: 0.95;
}

/* 新增：對比區塊樣式 */
.comparison-intro {
  background: #f0f9ff;
  padding: 1.5rem;
  border-left: 4px solid #0284c7;
  border-radius: 4px;
  margin-bottom: 2rem;
}

.comparison-tabs {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 100%;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-height: 400px;
}

.fetch-example,
.axios-example {
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid transparent;
  min-width: 0;
  overflow: hidden;
}

.fetch-example {
  background: #fef2f2;
  border-color: #fca5a5;
}

.axios-example {
  background: #f0fdf4;
  border-color: #86efac;
}

.fetch-example h4,
.axios-example h4 {
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.fetch-example h4 {
  color: #dc2626;
}

.axios-example h4 {
  color: #16a34a;
}

/* 修正 CodeBlock 在對比區域的溢出問題 */
.fetch-example :deep(.code-block),
.axios-example :deep(.code-block) {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.fetch-example :deep(.code-content),
.axios-example :deep(.code-content) {
  max-width: 100%;
  overflow-x: auto;
  word-break: break-word;
  white-space: pre-wrap;
}

.fetch-example :deep(.code-header),
.axios-example :deep(.code-header) {
  flex-wrap: wrap;
  gap: 0.5rem;
}

.fetch-example :deep(.code-title),
.axios-example :deep(.code-title) {
  font-size: 0.9rem;
  line-height: 1.2;
}

/* 效率分析樣式 */
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.metric-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.metric-card h4 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.fetch-metric h4 {
  color: #dc2626;
}

.axios-metric h4 {
  color: #16a34a;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.metric-item:last-child {
  border-bottom: none;
}

.metric-label {
  font-weight: 500;
  color: #374151;
}

.metric-value {
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.metric-value.high {
  background: #fef2f2;
  color: #dc2626;
}

.metric-value.medium {
  background: #fef3c7;
  color: #d97706;
}

.metric-value.low {
  background: #f0fdf4;
  color: #16a34a;
}

/* C# 對比樣式 */
.csharp-comparison {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.similarity-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.similarity-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.similarity-item h4 {
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
}

.similarity-item ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.similarity-item li {
  padding: 0.5rem 0;
  color: #4a5568;
  border-bottom: 1px solid #f7fafc;
  position: relative;
  padding-left: 1.5rem;
}

.similarity-item li:last-child {
  border-bottom: none;
}

.similarity-item li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4299e1;
  font-weight: bold;
}

@media (max-width: 768px) {
  .section-content {
    padding: 1rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .tab-buttons {
    flex-direction: column;
  }

  .demo-buttons {
    flex-direction: column;
  }

  .demo-btn {
    width: 100%;
  }

  .comparison-grid,
  .metrics-grid,
  .similarity-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .comparison-grid {
    padding: 1rem;
    min-height: auto;
  }

  .fetch-example,
  .axios-example {
    padding: 0.75rem;
  }
}
</style>
