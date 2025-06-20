<template>
    <div class="section-content">
        <!-- 章節標題 -->
        <div class="section-header">
            <h2>多種 Mock 方案實戰演示</h2>
            <p class="section-description">
                實際體驗 JSON Server、MSW 和 Axios Mock Adapter 三種 Mock 方案的差異，
                了解每種方案的適用場景和實作細節。
            </p>
        </div>

        <!-- 環境狀態檢查 -->
        <div class="content-block">
            <h3>🔍 當前環境狀態</h3>

            <div class="environment-status">
                <div class="status-grid">
                    <div class="status-card" :class="{ active: jsonServerStatus }">
                        <div class="status-header">
                            <h4>JSON Server</h4>
                            <span class="status-indicator" :class="{ online: jsonServerStatus }">
                                {{ jsonServerStatus ? '運行中' : '離線' }}
                            </span>
                        </div>
                        <p v-if="jsonServerStatus">✅ http://localhost:3001</p>
                        <div v-else class="server-guide">
                            <p>⚠️ 需要先啟動 JSON Server</p>
                            <button class="guide-btn" @click="showJSONServerGuide">📖 查看啟動指引</button>
                        </div>
                    </div>

                    <div class="status-card" :class="{ active: mswStatus }">
                        <div class="status-header">
                            <h4>MSW</h4>
                            <span class="status-indicator" :class="{ online: mswStatus }">
                                {{ mswStatus ? '已啟用' : '未啟用' }}
                            </span>
                        </div>
                        <p>{{ mswStatus ? 'Service Worker 運行中' : '點擊下方按鈕啟用' }}</p>
                    </div>

                    <div class="status-card active">
                        <div class="status-header">
                            <h4>Axios Mock Adapter</h4>
                            <span class="status-indicator online">隨時可用</span>
                        </div>
                        <p>程式碼中直接配置</p>
                    </div>
                </div>

                <div class="quick-actions">
                    <button class="action-btn json-server" @click="checkJSONServer" :disabled="checking">
                        {{ checking ? '檢查中...' : '檢查 JSON Server' }}
                    </button>

                    <button class="action-btn msw" @click="toggleMSW" :disabled="checking">
                        {{ mswStatus ? '停用 MSW' : '啟用 MSW' }}
                    </button>
                </div>

                <!-- JSON Server 啟動指引 -->
                <div v-if="showGuide" class="startup-guide">
                    <div class="guide-header">
                        <h4>🚀 JSON Server 啟動指引</h4>
                        <button class="close-btn" @click="showGuide = false">✕</button>
                    </div>

                    <div class="guide-content">
                        <div class="guide-section">
                            <h5>📋 啟動步驟：</h5>
                            <ol>
                                <li>打開終端機（Terminal）</li>
                                <li>確保在專案根目錄</li>
                                <li>執行以下任一命令：</li>
                            </ol>
                        </div>

                        <div class="command-options">
                            <div class="command-card">
                                <h6>方法一：單獨啟動 JSON Server</h6>
                                <div class="command-box">
                                    <code>npm run json-server</code>
                                    <button class="copy-btn" @click="copyCommand('npm run json-server')">複製</button>
                                </div>
                                <p class="command-desc">只啟動 JSON Server（端口：3001）</p>
                            </div>

                            <div class="command-card recommended">
                                <h6>方法二：同時啟動開發服務器 <span class="badge">推薦</span></h6>
                                <div class="command-box">
                                    <code>npm run dev:mock</code>
                                    <button class="copy-btn" @click="copyCommand('npm run dev:mock')">複製</button>
                                </div>
                                <p class="command-desc">同時啟動 Vite 開發服務器 + JSON Server</p>
                            </div>
                        </div>

                        <div class="guide-section">
                            <h5>✅ 啟動成功指標：</h5>
                            <ul>
                                <li>終端機顯示："JSON Server is running on http://localhost:3001"</li>
                                <li>瀏覽器訪問 <a href="http://localhost:3001" target="_blank">http://localhost:3001</a> 可以看到 API 資料</li>
                                <li>上方狀態卡顯示「運行中」</li>
                            </ul>
                        </div>

                        <div class="guide-section troubleshooting">
                            <h5>🛠️ 常見問題：</h5>
                            <div class="troubleshoot-item">
                                <strong>端口被佔用：</strong>
                                <p>如果 3001 端口被佔用，可以修改 package.json 中的端口號</p>
                            </div>
                            <div class="troubleshoot-item">
                                <strong>找不到 db.json：</strong>
                                <p>確保專案根目錄存在 db.json 檔案</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 方案對比演示 -->
        <div class="content-block">
            <h3>⚔️ 三種方案實戰對比</h3>

            <div class="demo-tabs">
                <button v-for="tab in demoTabs" :key="tab.id" class="tab-button"
                    :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
                    {{ tab.title }}
                </button>
            </div>

            <div class="tab-content">
                <!-- JSON Server 演示 -->
                <div v-if="activeTab === 'json-server'" class="demo-section">
                    <div class="demo-header">
                        <h4>🗄️ JSON Server - 真實 HTTP 服務</h4>
                        <p>完整的 REST API 服務，支援所有 HTTP 方法和狀態碼</p>
                    </div>

                    <div class="demo-grid">
                        <div class="demo-item">
                            <h5>特點</h5>
                            <ul>
                                <li>真實的 HTTP 請求</li>
                                <li>支援 CRUD 操作</li>
                                <li>自動生成關聯資料</li>
                                <li>RESTful 路由</li>
                            </ul>
                        </div>

                        <div class="demo-item">
                            <h5>適用場景</h5>
                            <ul>
                                <li>快速原型開發</li>
                                <li>前後端並行開發</li>
                                <li>API 設計驗證</li>
                                <li>整合測試</li>
                            </ul>
                        </div>
                    </div>

                    <CodeBlock title="JSON Server 使用示例" :code="jsonServerDemoCode" language="typescript"
                        explanation="直接向 JSON Server 發送真實的 HTTP 請求" :runnable="true" @run="runJSONServerDemo" />

                    <div class="demo-actions">
                        <button class="demo-btn primary" @click="testJSONServerCRUD" :disabled="testing">
                            {{ testing ? '測試中...' : '測試完整 CRUD 操作' }}
                        </button>
                    </div>
                </div>

                <!-- MSW 演示 -->
                <div v-if="activeTab === 'msw'" class="demo-section">
                    <div class="demo-header">
                        <h4>🎭 MSW - 網路層攔截</h4>
                        <p>在網路層攔截請求，無需修改應用程式碼</p>
                    </div>

                    <div class="demo-grid">
                        <div class="demo-item">
                            <h5>特點</h5>
                            <ul>
                                <li>網路層攔截</li>
                                <li>零程式碼入侵</li>
                                <li>支援瀏覽器和 Node.js</li>
                                <li>最接近真實網路請求</li>
                            </ul>
                        </div>

                        <div class="demo-item">
                            <h5>適用場景</h5>
                            <ul>
                                <li>開發環境 Mock</li>
                                <li>端到端測試</li>
                                <li>API 尚未完成</li>
                                <li>離線開發</li>
                            </ul>
                        </div>
                    </div>

                    <CodeBlock title="MSW Handlers 配置" :code="mswDemoCode" language="typescript"
                        explanation="配置 MSW 攔截器來模擬 API 響應" :runnable="true" @run="runMSWDemo" />

                    <div class="demo-actions">
                        <button class="demo-btn primary" @click="testMSWFeatures" :disabled="testing">
                            {{ testing ? '測試中...' : '測試 MSW 進階功能' }}
                        </button>
                    </div>
                </div>

                <!-- Axios Mock Adapter 演示 -->
                <div v-if="activeTab === 'axios-mock'" class="demo-section">
                    <div class="demo-header">
                        <h4>🔧 Axios Mock Adapter - 程式碼層級 Mock</h4>
                        <p>直接在 Axios 實例層級進行 Mock，適合單元測試</p>
                    </div>

                    <div class="demo-grid">
                        <div class="demo-item">
                            <h5>特點</h5>
                            <ul>
                                <li>Axios 專用</li>
                                <li>精確控制</li>
                                <li>同步/異步支援</li>
                                <li>測試框架整合</li>
                            </ul>
                        </div>

                        <div class="demo-item">
                            <h5>適用場景</h5>
                            <ul>
                                <li>單元測試</li>
                                <li>Jest 測試環境</li>
                                <li>組件測試</li>
                                <li>錯誤場景模擬</li>
                            </ul>
                        </div>
                    </div>

                    <CodeBlock title="Axios Mock Adapter 配置" :code="axiosMockDemoCode" language="typescript"
                        explanation="直接在 Axios 實例上配置 Mock 響應" :runnable="true" @run="runAxiosMockDemo" />

                    <div class="demo-actions">
                        <button class="demo-btn primary" @click="testAxiosMockScenarios" :disabled="testing">
                            {{ testing ? '測試中...' : '測試錯誤場景模擬' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 效能比較 -->
        <div class="content-block">
            <h3>⚡ 效能和使用體驗比較</h3>

            <div class="performance-comparison">
                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>比較項目</th>
                                <th>JSON Server</th>
                                <th>MSW</th>
                                <th>Axios Mock</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>設定複雜度</td>
                                <td class="rating good">⭐⭐⭐⭐⭐</td>
                                <td class="rating medium">⭐⭐⭐</td>
                                <td class="rating excellent">⭐⭐⭐⭐⭐</td>
                            </tr>
                            <tr>
                                <td>真實性</td>
                                <td class="rating excellent">⭐⭐⭐⭐⭐</td>
                                <td class="rating excellent">⭐⭐⭐⭐⭐</td>
                                <td class="rating medium">⭐⭐⭐</td>
                            </tr>
                            <tr>
                                <td>測試適用性</td>
                                <td class="rating medium">⭐⭐⭐</td>
                                <td class="rating good">⭐⭐⭐⭐</td>
                                <td class="rating excellent">⭐⭐⭐⭐⭐</td>
                            </tr>
                            <tr>
                                <td>維護成本</td>
                                <td class="rating good">⭐⭐⭐⭐</td>
                                <td class="rating medium">⭐⭐⭐</td>
                                <td class="rating good">⭐⭐⭐⭐</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="recommendation-card">
                    <h4>💡 選擇建議</h4>
                    <div class="recommendation-grid">
                        <div class="rec-item">
                            <strong>開發階段</strong>
                            <p>JSON Server + MSW</p>
                        </div>
                        <div class="rec-item">
                            <strong>單元測試</strong>
                            <p>Axios Mock Adapter</p>
                        </div>
                        <div class="rec-item">
                            <strong>整合測試</strong>
                            <p>MSW</p>
                        </div>
                        <div class="rec-item">
                            <strong>快速原型</strong>
                            <p>JSON Server</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 實際測試結果 -->
        <div v-if="testResults.length > 0" class="content-block">
            <h3>📊 測試結果記錄</h3>

            <div class="test-results">
                <div v-for="(result, index) in testResults" :key="index" class="result-item" :class="result.type">
                    <div class="result-header">
                        <h5>{{ result.title }}</h5>
                        <span class="result-time">{{ formatTime(result.timestamp) }}</span>
                    </div>

                    <div class="result-content">
                        <div class="result-metrics">
                            <span class="metric">
                                ⏱️ {{ result.duration }}ms
                            </span>
                            <span class="metric">
                                📦 {{ result.dataSize || 'N/A' }}
                            </span>
                            <span class="metric" :class="result.success ? 'success' : 'error'">
                                {{ result.success ? '✅ 成功' : '❌ 失敗' }}
                            </span>
                        </div>

                        <pre v-if="result.data" class="result-data">{{ JSON.stringify(result.data, null, 2) }}</pre>
                        <p v-if="result.error" class="error-message">{{ result.error }}</p>
                    </div>
                </div>
            </div>

            <button class="demo-btn secondary" @click="clearResults">清除測試結果</button>
        </div>

        <!-- 章節總結 -->
        <div class="content-block summary">
            <h3>📝 章節總結</h3>

            <div class="summary-grid">
                <div class="summary-item">
                    <h4>🎯 學習重點</h4>
                    <ul>
                        <li>理解三種 Mock 方案的差異</li>
                        <li>掌握各方案的適用場景</li>
                        <li>學會選擇合適的 Mock 策略</li>
                        <li>實作完整的 Mock 工作流程</li>
                    </ul>
                </div>

                <div class="summary-item">
                    <h4>🛠️ 實戰技能</h4>
                    <ul>
                        <li>JSON Server 快速建立 API</li>
                        <li>MSW 網路層攔截配置</li>
                        <li>Axios Mock Adapter 測試整合</li>
                        <li>多方案效能比較分析</li>
                    </ul>
                </div>

                <div class="summary-item">
                    <h4>💼 企業應用</h4>
                    <ul>
                        <li>前後端並行開發流程</li>
                        <li>測試驅動開發實踐</li>
                        <li>API 設計驗證方法</li>
                        <li>Mock 資料維護策略</li>
                    </ul>
                </div>

                <div class="summary-item">
                    <h4>🚀 下一步</h4>
                    <ul>
                        <li>整合到實際專案中</li>
                        <li>建立 Mock 資料標準</li>
                        <li>設計自動化測試流程</li>
                        <li>優化開發工作流程</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// 響應式資料
const activeTab = ref('json-server')
const jsonServerStatus = ref(false)
const mswStatus = ref(false)
const checking = ref(false)
const testing = ref(false)
const testResults = ref<Array<{
    title: string
    type: string
    timestamp: number
    duration: number
    success: boolean
    data?: unknown
    error?: string
    dataSize?: string
}>>([])
const showGuide = ref(false)

// Demo 標籤頁配置
const demoTabs = [
    { id: 'json-server', title: 'JSON Server' },
    { id: 'msw', title: 'MSW' },
    { id: 'axios-mock', title: 'Axios Mock' }
]

// 程式碼範例
const jsonServerDemoCode = `// JSON Server - 真實 HTTP 請求
import axios from 'axios';

const jsonServerClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000
});

// GET 請求 - 獲取所有用戶
async function getUsers() {
  const response = await jsonServerClient.get('/users');
  return response.data;
}

// POST 請求 - 創建新用戶
async function createUser(userData: unknown) {
  const response = await jsonServerClient.post('/users', userData);
  return response.data;
}

// PUT 請求 - 更新用戶
async function updateUser(id: number, userData: unknown) {
  const response = await jsonServerClient.put(\`/users/\${id}\`, userData);
  return response.data;
}

// DELETE 請求 - 刪除用戶
async function deleteUser(id: number) {
  await jsonServerClient.delete(\`/users/\${id}\`);
}`

const mswDemoCode = `// MSW - 網路層攔截
import { rest } from 'msw';

// 定義請求處理器
const handlers = [
  // 攔截 GET /api/users
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'MSW User 1', email: 'user1@msw.com' },
        { id: 2, name: 'MSW User 2', email: 'user2@msw.com' }
      ])
    );
  }),

  // 攔截 POST /api/users
  rest.post('/api/users', async (req, res, ctx) => {
    const userData = await req.json();
    return res(
      ctx.status(201),
      ctx.json({
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
      })
    );
  }),

  // 模擬網路延遲
  rest.get('/api/slow', (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({ message: 'Slow response from MSW' })
    );
  })
];

// 在瀏覽器中啟動 MSW
import { setupWorker } from 'msw';
const worker = setupWorker(...handlers);
worker.start();`

const axiosMockDemoCode = `// Axios Mock Adapter - 程式碼層級 Mock
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// 創建 Axios 實例
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 5000
});

// 創建 Mock Adapter
const mock = new MockAdapter(apiClient);

// 配置 Mock 響應
mock.onGet('/users').reply(200, [
  { id: 1, name: 'Mock User 1', email: 'user1@mock.com' },
  { id: 2, name: 'Mock User 2', email: 'user2@mock.com' }
]);

// POST 請求 Mock
mock.onPost('/users').reply((config) => {
  const userData = JSON.parse(config.data || '{}')
  return [201, {
    id: Math.floor(Math.random() * 1000),
    ...userData,
    createdAt: new Date().toISOString()
  }];
});

// 錯誤場景 Mock
mock.onGet('/error').reply(500, {
  message: 'Internal Server Error from Mock'
});

// 網路超時 Mock
mock.onGet('/timeout').timeout();

// 使用 Mock 的 API 客戶端
async function getMockUsers() {
  const response = await apiClient.get('/users');
  return response.data;
}`

// 方法實作
async function checkJSONServer() {
    checking.value = true
    const startTime = Date.now()

    try {
        const response = await axios.get('http://localhost:3001/users', { timeout: 3000 })
        const duration = Date.now() - startTime

        jsonServerStatus.value = true

        testResults.value.unshift({
            title: 'JSON Server 連線檢查',
            type: 'json-server',
            timestamp: Date.now(),
            duration,
            success: true,
            data: response.data.slice(0, 2), // 只顯示前2筆
            dataSize: `${JSON.stringify(response.data).length} bytes`
        })
    } catch (error) {
        const duration = Date.now() - startTime
        jsonServerStatus.value = false

        testResults.value.unshift({
            title: 'JSON Server 連線檢查',
            type: 'json-server',
            timestamp: Date.now(),
            duration,
            success: false,
            error: error instanceof Error ? error.message : '未知錯誤'
        })
    } finally {
        checking.value = false
    }
}

function toggleMSW() {
    // 動態導入 MSW 管理器
    import('@/utils/mswSetup').then(async ({ MSWManager }) => {
        try {
            if (mswStatus.value) {
                await MSWManager.stop()
                mswStatus.value = false
                testResults.value.unshift({
                    title: 'MSW 已停用',
                    type: 'msw',
                    timestamp: Date.now(),
                    duration: 0,
                    success: true,
                    data: { status: 'disabled', message: 'MSW Service Worker 已停止' }
                })
            } else {
                await MSWManager.start()
                mswStatus.value = true
                testResults.value.unshift({
                    title: 'MSW 已啟用',
                    type: 'msw',
                    timestamp: Date.now(),
                    duration: 0,
                    success: true,
                    data: { status: 'enabled', message: 'MSW Service Worker 已啟動' }
                })
            }
        } catch (error) {
            testResults.value.unshift({
                title: 'MSW 操作失敗',
                type: 'msw',
                timestamp: Date.now(),
                duration: 0,
                success: false,
                error: error instanceof Error ? error.message : '未知錯誤'
            })
        }
    })
}

async function testJSONServerCRUD() {
    if (!jsonServerStatus.value) {
        showJSONServerGuide()
        return
    }

    testing.value = true
    const startTime = Date.now()

    try {
        // 創建測試用戶
        const newUser = {
            name: `Test User ${Date.now()}`,
            email: `test${Date.now()}@example.com`,
            role: 'user'
        }

        const createResponse = await axios.post('http://localhost:3001/users', newUser)
        const createdUser = createResponse.data

        // 更新用戶
        const updateResponse = await axios.put(`http://localhost:3001/users/${createdUser.id}`, {
            ...createdUser,
            name: `Updated ${createdUser.name}`
        })

        // 刪除用戶
        await axios.delete(`http://localhost:3001/users/${createdUser.id}`)

        const duration = Date.now() - startTime

        testResults.value.unshift({
            title: 'JSON Server CRUD 測試',
            type: 'json-server',
            timestamp: Date.now(),
            duration,
            success: true,
            data: {
                created: createdUser,
                updated: updateResponse.data,
                deleted: true
            }
        })
    } catch (error) {
        const duration = Date.now() - startTime

        testResults.value.unshift({
            title: 'JSON Server CRUD 測試',
            type: 'json-server',
            timestamp: Date.now(),
            duration,
            success: false,
            error: error instanceof Error ? error.message : '未知錯誤'
        })
    } finally {
        testing.value = false
    }
}

async function testMSWFeatures() {
    testing.value = true
    const startTime = Date.now()

    try {
        // 檢查 MSW 是否啟用
        const { MSWManager, mswAPI } = await import('@/utils/mswSetup')

        if (!MSWManager.isRunning()) {
            alert('請先啟用 MSW！\n\n點擊上方的「啟用 MSW」按鈕來啟動 MSW Service Worker。')
            testing.value = false
            return
        }

        // 測試各種 MSW 功能
        const users = await mswAPI.getUsers()
        const slowResponse = await mswAPI.testSlowResponse()

        const duration = Date.now() - startTime

        testResults.value.unshift({
            title: 'MSW 功能測試',
            type: 'msw',
            timestamp: Date.now(),
            duration,
            success: true,
            data: {
                users: users.slice(0, 2), // 只顯示前2筆
                slowResponse,
                totalUsers: users.length,
                features: ['網路層攔截', '零程式碼入侵', '支援瀏覽器和 Node.js']
            },
            dataSize: `${JSON.stringify(users).length} bytes`
        })
    } catch (error) {
        const duration = Date.now() - startTime

        testResults.value.unshift({
            title: 'MSW 功能測試',
            type: 'msw',
            timestamp: Date.now(),
            duration,
            success: false,
            error: error instanceof Error ? error.message : '未知錯誤'
        })
    } finally {
        testing.value = false
    }
}

async function testAxiosMockScenarios() {
    testing.value = true
    const startTime = Date.now()

    try {
        // 創建測試用的 Axios 實例和 Mock
        const testClient = axios.create({ baseURL: '/api' })
        const mock = new MockAdapter(testClient)

        // 配置各種測試場景
        mock.onGet('/success').reply(200, { message: 'Success response' })
        mock.onGet('/error').reply(500, { message: 'Server error' })
        mock.onGet('/timeout').timeout()

        // 測試成功場景
        const successResponse = await testClient.get('/success')

        // 測試錯誤場景
        let errorResponse = null
        try {
            await testClient.get('/error')
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: unknown } }
                errorResponse = axiosError.response?.data
            }
        }

        const duration = Date.now() - startTime

        testResults.value.unshift({
            title: 'Axios Mock 場景測試',
            type: 'axios-mock',
            timestamp: Date.now(),
            duration,
            success: true,
            data: {
                success: successResponse.data,
                error: errorResponse,
                scenarios: ['成功響應', '錯誤處理', '超時測試']
            }
        })

        // 清理 mock
        mock.restore()
    } catch (error) {
        const duration = Date.now() - startTime

        testResults.value.unshift({
            title: 'Axios Mock 場景測試',
            type: 'axios-mock',
            timestamp: Date.now(),
            duration,
            success: false,
            error: error instanceof Error ? error.message : '未知錯誤'
        })
    } finally {
        testing.value = false
    }
}

// 修正執行函數 - 實際執行對應的代碼並顯示結果
async function runJSONServerDemo() {
    if (!jsonServerStatus.value) {
        showJSONServerGuide()
        return
    }

    testing.value = true
    const startTime = Date.now()

    try {
        // 實際執行 JSON Server 示例代碼
        const jsonServerClient = axios.create({
            baseURL: 'http://localhost:3001',
            timeout: 5000
        })

        // GET 請求 - 獲取所有用戶
        const users = await jsonServerClient.get('/users')

        // POST 請求 - 創建新用戶
        const newUser = {
            name: `Demo User ${Date.now()}`,
            email: `demo${Date.now()}@jsonserver.com`,
            role: 'user'
        }
        const createResponse = await jsonServerClient.post('/users', newUser)

        // PUT 請求 - 更新用戶
        const updateResponse = await jsonServerClient.put(`/users/${createResponse.data.id}`, {
            ...createResponse.data,
            name: `Updated ${createResponse.data.name}`
        })

        // DELETE 請求 - 刪除用戶
        await jsonServerClient.delete(`/users/${createResponse.data.id}`)

        const duration = Date.now() - startTime

        testResults.value.unshift({
            title: '🗄️ JSON Server 演示執行',
            type: 'json-server',
            timestamp: Date.now(),
            duration,
            success: true,
            data: {
                totalUsers: users.data.length,
                demoOperations: {
                    created: createResponse.data,
                    updated: updateResponse.data,
                    deleted: true
                },
                features: ['真實 HTTP 請求', 'RESTful API', 'CRUD 操作']
            },
            dataSize: `${JSON.stringify(users.data).length} bytes`
        })
    } catch (error) {
        const duration = Date.now() - startTime
        testResults.value.unshift({
            title: '🗄️ JSON Server 演示執行',
            type: 'json-server',
            timestamp: Date.now(),
            duration,
            success: false,
            error: error instanceof Error ? error.message : '未知錯誤'
        })
    } finally {
        testing.value = false
    }
}

async function runMSWDemo() {
    testing.value = true
    const startTime = Date.now()

    try {
        // 檢查 MSW 是否啟用
        const { MSWManager, mswAPI } = await import('@/utils/mswSetup')

        if (!MSWManager.isRunning()) {
            alert('請先啟用 MSW！\n\n點擊上方的「啟用 MSW」按鈕來啟動 MSW Service Worker。')
            testing.value = false
            return
        }

        // 執行 MSW 示例代碼
        // 1. 獲取用戶列表
        const users = await mswAPI.getUsers()

        // 2. 創建新用戶
        const newUser = {
            name: `MSW Demo User ${Date.now()}`,
            email: `demo${Date.now()}@msw.com`,
            role: 'user' as const
        }
        const createdUser = await mswAPI.createUser(newUser)

        // 3. 測試慢速響應
        const slowResponse = await mswAPI.testSlowResponse()

        const duration = Date.now() - startTime

        testResults.value.unshift({
            title: '🎭 MSW 演示執行',
            type: 'msw',
            timestamp: Date.now(),
            duration,
            success: true,
            data: {
                interceptedRequests: {
                    users: users.slice(0, 2),
                    createdUser,
                    slowResponse
                },
                features: ['網路層攔截', '零程式碼入侵', '模擬網路延遲']
            },
            dataSize: `${JSON.stringify(users).length} bytes`
        })
    } catch (error) {
        const duration = Date.now() - startTime
        testResults.value.unshift({
            title: '🎭 MSW 演示執行',
            type: 'msw',
            timestamp: Date.now(),
            duration,
            success: false,
            error: error instanceof Error ? error.message : '未知錯誤'
        })
    } finally {
        testing.value = false
    }
}

async function runAxiosMockDemo() {
    testing.value = true
    const startTime = Date.now()

    try {
        // 實際執行 Axios Mock Adapter 示例代碼
        // 創建 Axios 實例
        const apiClient = axios.create({
            baseURL: '/api',
            timeout: 5000
        })

        // 創建 Mock Adapter
        const mock = new MockAdapter(apiClient)

        // 配置 Mock 響應
        const mockUsers = [
            { id: 1, name: 'Mock User 1', email: 'user1@mock.com' },
            { id: 2, name: 'Mock User 2', email: 'user2@mock.com' }
        ]

        mock.onGet('/users').reply(200, mockUsers)

        // POST 請求 Mock
        mock.onPost('/users').reply((config) => {
            const userData = JSON.parse(config.data || '{}')
            return [201, {
                id: Math.floor(Math.random() * 1000),
                ...userData,
                createdAt: new Date().toISOString()
            }]
        })

        // 錯誤場景 Mock
        mock.onGet('/error').reply(500, {
            message: 'Internal Server Error from Mock'
        })

        // 執行測試
        const usersResponse = await apiClient.get('/users')

        const newUser = {
            name: `Axios Mock User ${Date.now()}`,
            email: `mock${Date.now()}@example.com`
        }
        const createResponse = await apiClient.post('/users', newUser)

        // 測試錯誤場景
        let errorResponse = null
        try {
            await apiClient.get('/error')
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: unknown } }
                errorResponse = axiosError.response?.data
            }
        }

        const duration = Date.now() - startTime

        testResults.value.unshift({
            title: '🔧 Axios Mock Adapter 演示執行',
            type: 'axios-mock',
            timestamp: Date.now(),
            duration,
            success: true,
            data: {
                mockOperations: {
                    getUsers: usersResponse.data,
                    createUser: createResponse.data,
                    errorScenario: errorResponse
                },
                features: ['程式碼層級 Mock', '精確控制', '測試框架整合']
            }
        })

        // 清理 mock
        mock.restore()
    } catch (error) {
        const duration = Date.now() - startTime
        testResults.value.unshift({
            title: '🔧 Axios Mock Adapter 演示執行',
            type: 'axios-mock',
            timestamp: Date.now(),
            duration,
            success: false,
            error: error instanceof Error ? error.message : '未知錯誤'
        })
    } finally {
        testing.value = false
    }
}

// 顯示 JSON Server 啟動指引
function showJSONServerGuide() {
    showGuide.value = true
}

// 複製命令到剪貼板
async function copyCommand(command: string) {
    try {
        await navigator.clipboard.writeText(command)

        // 顯示複製成功提示
        testResults.value.unshift({
            title: '📋 命令已複製',
            type: 'info',
            timestamp: Date.now(),
            duration: 0,
            success: true,
            data: { command, message: '已複製到剪貼板，請在終端機中執行' }
        })
    } catch (error) {
        console.error('複製失敗:', error)
        // 備用方案：顯示命令讓用戶手動複製
        alert(`請手動複製以下命令：\n\n${command}`)
    }
}

function formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString('zh-TW')
}

function clearResults() {
    testResults.value = []
}

// 生命週期
onMounted(() => {
    checkJSONServer()

    // 檢查 MSW 狀態
    import('@/utils/mswSetup').then(({ MSWManager }) => {
        mswStatus.value = MSWManager.isRunning()
    })
})
</script>

<style scoped>
/* 基礎樣式 */
.section-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
}

.section-header {
    text-align: center;
    margin-bottom: 3rem;
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
    max-width: 800px;
    margin: 0 auto;
}

.content-block {
    background: #fff;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
}

.content-block h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* 環境狀態樣式 */
.environment-status {
    padding: 1rem 0;
}

.status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.status-card {
    padding: 1.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    transition: all 0.3s;
}

.status-card.active {
    border-color: #48bb78;
    background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);
}

.status-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.status-header h4 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
}

.status-indicator {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    background: #fed7d7;
    color: #c53030;
}

.status-indicator.online {
    background: #c6f6d5;
    color: #276749;
}

.server-guide {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.server-guide p {
    margin: 0;
    color: #e53e3e;
    font-size: 0.9rem;
}

.guide-btn {
    padding: 0.5rem 1rem;
    background: #4299e1;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: background 0.2s;
}

.guide-btn:hover {
    background: #3182ce;
}

.quick-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.action-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
}

.action-btn.json-server {
    background: #4299e1;
    color: white;
}

.action-btn.json-server:hover {
    background: #3182ce;
}

.action-btn.msw {
    background: #ed8936;
    color: white;
}

.action-btn.msw:hover {
    background: #dd6b20;
}

.action-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Demo 標籤頁樣式 */
.demo-tabs {
    display: flex;
    border-bottom: 2px solid #e2e8f0;
    margin-bottom: 2rem;
}

.tab-button {
    flex: 1;
    padding: 1rem;
    border: none;
    background: transparent;
    color: #4a5568;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    border-bottom: 3px solid transparent;
}

.tab-button:hover {
    color: #2d3748;
    background: #f7fafc;
}

.tab-button.active {
    color: #3182ce;
    border-bottom-color: #3182ce;
    background: #ebf8ff;
}

.demo-section {
    min-height: 400px;
}

.demo-header {
    margin-bottom: 2rem;
}

.demo-header h4 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
}

.demo-header p {
    color: #4a5568;
    line-height: 1.6;
}

.demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.demo-item {
    padding: 1.5rem;
    background: #f7fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.demo-item h5 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
}

.demo-item ul {
    margin: 0;
    padding-left: 1rem;
}

.demo-item li {
    margin-bottom: 0.5rem;
    color: #4a5568;
    line-height: 1.5;
}

.demo-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

.demo-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
}

.demo-btn.primary {
    background: #4299e1;
    color: white;
}

.demo-btn.primary:hover {
    background: #3182ce;
}

.demo-btn.secondary {
    background: #e2e8f0;
    color: #4a5568;
}

.demo-btn.secondary:hover {
    background: #cbd5e0;
}

.demo-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* 效能比較樣式 */
.performance-comparison {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    align-items: start;
}

.comparison-table {
    overflow-x: auto;
}

.comparison-table table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.comparison-table .rating {
    font-size: 1rem;
}

.rating.excellent {
    color: #38a169;
}

.rating.good {
    color: #3182ce;
}

.rating.medium {
    color: #ed8936;
}

.recommendation-card {
    background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%);
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #90cdf4;
}

.recommendation-card h4 {
    margin: 0 0 1rem 0;
    color: #2c5282;
    font-weight: 600;
}

.recommendation-grid {
    display: grid;
    gap: 1rem;
}

.rec-item {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 6px;
    border: 1px solid #bee3f8;
}

.rec-item strong {
    display: block;
    color: #2c5282;
    margin-bottom: 0.25rem;
    font-weight: 600;
}

.rec-item p {
    margin: 0;
    color: #2d3748;
    font-size: 0.9rem;
}

/* 測試結果樣式 */
.test-results {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
}

.result-item {
    background: #f7fafc;
    border-radius: 8px;
    border-left: 4px solid #cbd5e0;
    padding: 1.5rem;
    transition: all 0.3s;
}

.result-item.json-server {
    border-left-color: #4299e1;
    background: linear-gradient(135deg, #ebf8ff 0%, #f7fafc 100%);
}

.result-item.msw {
    border-left-color: #ed8936;
    background: linear-gradient(135deg, #fffaf0 0%, #f7fafc 100%);
}

.result-item.axios-mock {
    border-left-color: #48bb78;
    background: linear-gradient(135deg, #f0fff4 0%, #f7fafc 100%);
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.result-header h5 {
    margin: 0;
    font-weight: 600;
    color: #2d3748;
}

.result-time {
    font-size: 0.8rem;
    color: #718096;
}

.result-metrics {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.metric {
    padding: 0.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid #e2e8f0;
}

.metric.success {
    background: #c6f6d5;
    color: #276749;
    border-color: #9ae6b4;
}

.metric.error {
    background: #fed7d7;
    color: #c53030;
    border-color: #fbb6ce;
}

.result-data {
    background: #2d3748;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 6px;
    font-size: 0.8rem;
    overflow-x: auto;
    margin: 0;
}

.error-message {
    color: #c53030;
    font-weight: 500;
    margin: 0;
}

/* 總結樣式 */
.summary {
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.summary-item {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.summary-item h4 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.summary-item ul {
    margin: 0;
    padding-left: 1rem;
}

.summary-item li {
    margin-bottom: 0.5rem;
    color: #4a5568;
    line-height: 1.5;
}

/* 響應式設計 */
@media (max-width: 768px) {
    .section-header h2 {
        font-size: 2rem;
    }

    .content-block {
        padding: 1.5rem;
    }

    .status-grid {
        grid-template-columns: 1fr;
    }

    .demo-grid {
        grid-template-columns: 1fr;
    }

    .performance-comparison {
        grid-template-columns: 1fr;
    }

    .quick-actions {
        flex-direction: column;
        align-items: center;
    }

    .demo-actions {
        flex-direction: column;
        align-items: center;
    }

    .result-metrics {
        justify-content: center;
    }

    .summary-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .section-content {
        padding: 0 0.5rem;
    }

    .content-block {
        padding: 1rem;
    }

    .demo-tabs {
        flex-direction: column;
    }

    .tab-button {
        flex: none;
        padding: 0.75rem;
    }
}
</style>
