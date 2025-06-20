<template>
    <div class="section-content">
        <div class="section-header">
            <h2>實戰項目整合 - Mock 與測試</h2>
            <p class="section-description">
                學習使用 MSW、JSON Server 和 Axios Mock Adapter 建立完整的 Mock 系統，提升開發效率和測試覆蓋率。
            </p>
        </div>

        <!-- Mock 工具比較 -->
        <div class="content-block">
            <h3>🔧 Mock 工具選擇指南</h3>

            <div class="tools-comparison">
                <div class="tool-card msw">
                    <div class="tool-header">
                        <h4>MSW (Mock Service Worker)</h4>
                        <span class="tool-badge">推薦</span>
                    </div>
                    <div class="tool-content">
                        <p><strong>適用場景：</strong>開發環境 API Mock、整合測試</p>
                        <ul>
                            <li>攔截網路請求，不修改應用程式碼</li>
                            <li>支援瀏覽器和 Node.js 環境</li>
                            <li>最接近真實網路請求的 Mock 方案</li>
                        </ul>
                    </div>
                </div>

                <div class="tool-card json-server">
                    <div class="tool-header">
                        <h4>JSON Server</h4>
                        <span class="tool-badge">快速原型</span>
                    </div>
                    <div class="tool-content">
                        <p><strong>適用場景：</strong>快速原型開發、後端未就緒時的臨時 API</p>
                        <ul>
                            <li>零配置快速建立 REST API</li>
                            <li>支援完整的 CRUD 操作</li>
                            <li>自動生成關聯資料</li>
                        </ul>
                    </div>
                </div>

                <div class="tool-card axios-mock">
                    <div class="tool-header">
                        <h4>Axios Mock Adapter</h4>
                        <span class="tool-badge">單元測試</span>
                    </div>
                    <div class="tool-content">
                        <p><strong>適用場景：</strong>單元測試、Jest 測試環境</p>
                        <ul>
                            <li>專為 Axios 設計的 Mock 解決方案</li>
                            <li>完美整合測試框架</li>
                            <li>精確控制請求和響應</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- MSW 設定 -->
        <div class="content-block">
            <h3>🎭 MSW 完整設定</h3>

            <div class="setup-steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>安裝 MSW</h4>
                        <CodeBlock title="安裝命令" :code="mswInstallCode" language="bash"
                            explanation="安裝 MSW 套件並初始化 Service Worker" />
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>建立 Handlers</h4>
                        <CodeBlock title="API Handlers" :code="mswHandlersCode" language="typescript"
                            explanation="定義 API 端點的 Mock 處理器" :runnable="true" @run="runMswSetup" />
                    </div>
                </div>
            </div>
        </div>

        <!-- JSON Server 設定 -->
        <div class="content-block">
            <h3>🗄️ JSON Server 快速建立 API</h3>

            <CodeBlock title="JSON Server 配置" :code="jsonServerCode" language="json" explanation="建立完整的資料結構和自訂路由" />

            <CodeBlock title="啟動腳本" :code="jsonServerScripts" language="json" explanation="Package.json 中的啟動腳本配置" />
        </div>

        <!-- 實際演示區域 -->
        <div class="content-block">
            <h3>🎯 Mock 工具實戰演示</h3>

            <div class="demo-section">
                <h4>測試不同 Mock 方案</h4>
                <div class="demo-buttons">
                    <button class="demo-btn msw-btn" @click="testMSW" :disabled="loading">
                        {{ loading && currentTest === 'msw' ? '測試中...' : '測試 MSW' }}
                    </button>
                    <button class="demo-btn json-btn" @click="testJSONServer" :disabled="loading">
                        {{ loading && currentTest === 'json' ? '測試中...' : '測試 JSON Server' }}
                    </button>
                    <button class="demo-btn mock-btn" @click="testAxiosMock" :disabled="loading">
                        {{ loading && currentTest === 'mock' ? '測試中...' : '測試 Axios Mock' }}
                    </button>
                </div>

                <div v-if="demoResult" class="demo-result">
                    <h5>{{ currentTestName }} 執行結果：</h5>
                    <pre>{{ demoResult }}</pre>
                </div>
            </div>
        </div>

        <!-- 最佳實踐 -->
        <div class="content-block">
            <h3>💡 Mock 開發最佳實踐</h3>

            <div class="best-practices-grid">
                <div class="practice-item">
                    <h4>🎯 選擇適合的工具</h4>
                    <ul>
                        <li>開發階段使用 MSW 或 JSON Server</li>
                        <li>單元測試使用 Axios Mock Adapter</li>
                        <li>E2E 測試使用 MSW</li>
                        <li>快速原型使用 JSON Server</li>
                    </ul>
                </div>

                <div class="practice-item">
                    <h4>📊 資料設計原則</h4>
                    <ul>
                        <li>模擬真實的資料結構和關聯</li>
                        <li>包含邊界情況和錯誤場景</li>
                        <li>提供足夠的測試資料量</li>
                        <li>考慮分頁和排序需求</li>
                    </ul>
                </div>

                <div class="practice-item">
                    <h4>⚡ 效能考量</h4>
                    <ul>
                        <li>合理的響應延遲模擬</li>
                        <li>避免過大的 Mock 資料檔</li>
                        <li>適當的快取策略</li>
                        <li>條件式載入 Mock 服務</li>
                    </ul>
                </div>

                <div class="practice-item">
                    <h4>🔄 維護策略</h4>
                    <ul>
                        <li>與真實 API 保持同步</li>
                        <li>版本控制 Mock 資料</li>
                        <li>自動化 Mock 資料生成</li>
                        <li>定期檢查 Mock 的有效性</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 整合工作流程 -->
        <div class="content-block">
            <h3>🔄 完整開發工作流程</h3>

            <div class="workflow-diagram">
                <div class="workflow-step">
                    <div class="step-icon">🎨</div>
                    <h4>設計階段</h4>
                    <p>定義 API 規格<br>建立 Mock 資料</p>
                </div>
                <div class="workflow-arrow">→</div>
                <div class="workflow-step">
                    <div class="step-icon">🚀</div>
                    <h4>開發階段</h4>
                    <p>使用 MSW/JSON Server<br>並行開發前後端</p>
                </div>
                <div class="workflow-arrow">→</div>
                <div class="workflow-step">
                    <div class="step-icon">🧪</div>
                    <h4>測試階段</h4>
                    <p>Axios Mock Adapter<br>單元測試覆蓋</p>
                </div>
                <div class="workflow-arrow">→</div>
                <div class="workflow-step">
                    <div class="step-icon">🎯</div>
                    <h4>整合階段</h4>
                    <p>真實 API 整合<br>漸進式替換</p>
                </div>
            </div>
        </div>

        <!-- 章節總結 -->
        <div class="content-block">
            <h3>📋 章節總結</h3>

            <div class="summary-card">
                <h4>完整 Mock 生態系統掌握：</h4>
                <ul class="summary-list">
                    <li>MSW：最現代的 API Mock 解決方案</li>
                    <li>JSON Server：快速原型和開發 Mock</li>
                    <li>Axios Mock Adapter：專業的測試 Mock</li>
                    <li>建立完整的開發和測試工作流程</li>
                    <li>Mock 資料的設計和維護最佳實踐</li>
                </ul>

                <div class="next-steps">
                    <h4>恭喜完成 TypeScript + Axios 完整課程！</h4>
                    <p>現在你已經掌握了從基礎 TypeScript 到進階 Axios 整合的完整技能棧，可以開始實際專案開發了。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const loading = ref(false)
const currentTest = ref('')
const currentTestName = ref('')
const demoResult = ref('')

const mswInstallCode = `# 安裝 MSW
npm install msw --save-dev

# 初始化 Service Worker（在 public 目錄中）
npx msw init public/ --save`

const mswHandlersCode = `// mocks/handlers.ts
import { http, HttpResponse } from 'msw'

// 模擬資料
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
]

export const handlers = [
  // 用戶 API
  http.get('/api/users', () => {
    return HttpResponse.json({
      data: users,
      success: true,
      message: '用戶列表獲取成功'
    })
  }),

  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json()
    const user = { id: Date.now(), ...newUser }
    users.push(user)

    return HttpResponse.json({
      data: user,
      success: true,
      message: '用戶創建成功'
    }, { status: 201 })
  }),

  // 模擬延遲和錯誤
  http.get('/api/slow', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return HttpResponse.json({ message: '慢速響應' })
  }),

  http.get('/api/error', () => {
    return HttpResponse.json(
      { message: '伺服器錯誤', success: false },
      { status: 500 }
    )
  })
]

// mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// main.ts 中啟動
if (import.meta.env.DEV) {
  worker.start()
}`

const jsonServerCode = `{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://via.placeholder.com/150",
      "role": "admin",
      "createdAt": "2024-01-01T10:00:00Z"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "avatar": "https://via.placeholder.com/150",
      "role": "user",
      "createdAt": "2024-01-02T10:00:00Z"
    }
  ],
  "posts": [
    {
      "id": 1,
      "title": "TypeScript 入門指南",
      "content": "這是一篇關於 TypeScript 的文章...",
      "userId": 1,
      "tags": ["typescript", "javascript"],
      "published": true,
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "comments": [
    {
      "id": 1,
      "postId": 1,
      "userId": 2,
      "content": "很棒的文章！",
      "createdAt": "2024-01-01T13:00:00Z"
    }
  ]
}`

const jsonServerScripts = `{
  "scripts": {
    "json-server": "json-server --watch db.json --port 3001",
    "json-server-delay": "json-server --watch db.json --port 3001 --delay 1000",
    "json-server-cors": "json-server --watch db.json --port 3001 --middlewares ./middleware.js"
  }
}`

// 演示功能
const testMSW = async () => {
    loading.value = true
    currentTest.value = 'msw'
    currentTestName.value = 'MSW'

    try {
        // 模擬 MSW 測試
        const mockResponse = {
            data: [
                { id: 1, name: 'MSW User 1', email: 'msw1@example.com' },
                { id: 2, name: 'MSW User 2', email: 'msw2@example.com' }
            ],
            success: true,
            message: 'MSW 模擬請求成功'
        }

        await new Promise(resolve => setTimeout(resolve, 1000))

        demoResult.value = JSON.stringify(mockResponse, null, 2) +
            '\n\n✅ MSW 優勢：\n' +
            '- 攔截真實網路請求\n' +
            '- 不需修改應用程式碼\n' +
            '- 支援瀏覽器和 Node.js\n' +
            '- 最接近真實環境'
    } catch (error) {
        demoResult.value = `MSW 測試錯誤: ${error}`
    } finally {
        loading.value = false
        currentTest.value = ''
    }
}

const testJSONServer = async () => {
    loading.value = true
    currentTest.value = 'json'
    currentTestName.value = 'JSON Server'

    try {
        // 模擬 JSON Server 測試
        const mockResponse = {
            id: 1,
            name: 'JSON Server User',
            email: 'jsonserver@example.com',
            posts: [
                { id: 1, title: 'First Post', content: 'Content here...' }
            ]
        }

        await new Promise(resolve => setTimeout(resolve, 800))

        demoResult.value = JSON.stringify(mockResponse, null, 2) +
            '\n\n✅ JSON Server 優勢：\n' +
            '- 零配置快速建立 API\n' +
            '- 自動 CRUD 端點\n' +
            '- 支援關聯資料\n' +
            '- 完整的 REST API 功能'
    } catch (error) {
        demoResult.value = `JSON Server 測試錯誤: ${error}`
    } finally {
        loading.value = false
        currentTest.value = ''
    }
}

const testAxiosMock = async () => {
    loading.value = true
    currentTest.value = 'mock'
    currentTestName.value = 'Axios Mock Adapter'

    try {
        // 模擬 Axios Mock Adapter 測試
        const testResults = {
            testSuite: 'UserService Tests',
            tests: [
                { name: 'should fetch users', status: 'PASS', time: '15ms' },
                { name: 'should create user', status: 'PASS', time: '8ms' },
                { name: 'should handle 404 error', status: 'PASS', time: '12ms' },
                { name: 'should handle network error', status: 'PASS', time: '5ms' }
            ],
            summary: {
                total: 4,
                passed: 4,
                failed: 0,
                coverage: '98%'
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1200))

        demoResult.value = JSON.stringify(testResults, null, 2) +
            '\n\n✅ Axios Mock Adapter 優勢：\n' +
            '- 專為 Axios 設計\n' +
            '- 完美整合測試框架\n' +
            '- 精確控制請求響應\n' +
            '- 適合單元測試'
    } catch (error) {
        demoResult.value = `Axios Mock Adapter 測試錯誤: ${error}`
    } finally {
        loading.value = false
        currentTest.value = ''
    }
}

const runMswSetup = () => {
    demoResult.value = 'MSW 設定完成！Service Worker 已初始化，API handlers 已配置。'
}

onMounted(() => {
    console.log('Mock 與測試章節已載入')
})
</script>

<style scoped>
.section-content {
    max-width: 1200px;
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
    max-width: 700px;
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

.tools-comparison {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.tool-card {
    background: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    border: 2px solid #e2e8f0;
    transition: all 0.3s ease;
}

.tool-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.tool-card.msw {
    border-color: #4299e1;
}

.tool-card.json-server {
    border-color: #48bb78;
}

.tool-card.axios-mock {
    border-color: #ed8936;
}

.tool-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.tool-header h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
}

.tool-badge {
    padding: 0.25rem 0.75rem;
    background: #4299e1;
    color: white;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
}

.tool-card.json-server .tool-badge {
    background: #48bb78;
}

.tool-card.axios-mock .tool-badge {
    background: #ed8936;
}

.tool-content p {
    color: #4a5568;
    margin-bottom: 1rem;
    line-height: 1.5;
}

.tool-content ul {
    margin: 0;
    padding-left: 1rem;
}

.tool-content li {
    color: #4a5568;
    margin-bottom: 0.5rem;
    line-height: 1.4;
}

.setup-steps {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.step {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
}

.step-number {
    width: 40px;
    height: 40px;
    background: #4299e1;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
}

.step-content {
    flex: 1;
}

.step-content h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1rem;
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
    margin-bottom: 1.5rem;
}

.demo-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
}

.demo-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    color: white;
}

.msw-btn {
    background: #4299e1;
}

.msw-btn:hover:not(:disabled) {
    background: #3182ce;
}

.json-btn {
    background: #48bb78;
}

.json-btn:hover:not(:disabled) {
    background: #38a169;
}

.mock-btn {
    background: #ed8936;
}

.mock-btn:hover:not(:disabled) {
    background: #dd6b20;
}

.demo-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

.best-practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.practice-item {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.practice-item h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1rem;
}

.practice-item ul {
    margin: 0;
    padding-left: 1rem;
}

.practice-item li {
    color: #4a5568;
    margin-bottom: 0.5rem;
    line-height: 1.4;
}

.workflow-diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 2rem;
    background: #f7fafc;
    border-radius: 8px;
    margin: 2rem 0;
}

.workflow-step {
    text-align: center;
    min-width: 150px;
}

.step-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.workflow-step h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
}

.workflow-step p {
    font-size: 0.875rem;
    color: #4a5568;
    line-height: 1.4;
    margin: 0;
}

.workflow-arrow {
    font-size: 1.5rem;
    color: #4299e1;
    font-weight: bold;
}

.summary-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

@media (max-width: 768px) {
    .section-content {
        padding: 1rem;
    }

    .section-header h2 {
        font-size: 2rem;
    }

    .tools-comparison {
        grid-template-columns: 1fr;
    }

    .step {
        flex-direction: column;
        text-align: center;
    }

    .demo-buttons {
        flex-direction: column;
    }

    .demo-btn {
        width: 100%;
    }

    .best-practices-grid {
        grid-template-columns: 1fr;
    }

    .workflow-diagram {
        flex-direction: column;
    }

    .workflow-arrow {
        transform: rotate(90deg);
    }
}
</style>
