<template>
  <div class="api-design-section">
    <!-- 章節介紹 -->
    <div class="section-intro">
      <h2>API 規格設計與型別定義</h2>
      <p class="intro-text">
        在現代 Web 開發中，API 優先的設計方法已成為最佳實踐。本章節將帶您了解從 API 規格設計到 TypeScript 型別定義的完整開發流程，
        包括 OpenAPI/Swagger 規格制定、自動化型別生成，以及與 C# Web API 開發的對比。
      </p>
      
      <div class="learning-objectives">
        <h3>學習目標</h3>
        <ul>
          <li>理解 API 優先設計的重要性</li>
          <li>掌握 OpenAPI/Swagger 規格撰寫</li>
          <li>學會從 API 規格自動生成 TypeScript 型別</li>
          <li>了解與 C# Web API 開發的異同</li>
          <li>建立型別安全的前後端協作流程</li>
        </ul>
      </div>
    </div>

    <!-- API 優先設計概念 -->
    <div class="content-section">
      <h3>1. API 優先設計方法</h3>
      <p>API 優先設計是指在開始編寫代碼之前，先設計和定義 API 規格的開發方法。</p>
      
      <div class="comparison-container">
        <div class="comparison-item bad">
          <h4>❌ 傳統開發流程</h4>
          <div class="flow-steps">
            <div class="step">1. 開始編寫後端代碼</div>
            <div class="step">2. 實作 API 端點</div>
            <div class="step">3. 撰寫 API 文檔</div>
            <div class="step">4. 前端開始串接</div>
            <div class="step">5. 發現問題，重複修改</div>
          </div>
          <div class="problems">
            <strong>問題：</strong>
            <ul>
              <li>前後端開發不同步</li>
              <li>API 設計不一致</li>
              <li>文檔與實作不符</li>
              <li>重複修改成本高</li>
            </ul>
          </div>
        </div>

        <div class="comparison-item good">
          <h4>✅ API 優先設計流程</h4>
          <div class="flow-steps">
            <div class="step">1. 設計 API 規格 (OpenAPI)</div>
            <div class="step">2. 團隊審查確認規格</div>
            <div class="step">3. 生成型別定義和 Mock</div>
            <div class="step">4. 前後端並行開發</div>
            <div class="step">5. 基於規格進行測試</div>
          </div>
          <div class="benefits">
            <strong>優勢：</strong>
            <ul>
              <li>前後端開發同步</li>
              <li>API 設計一致性</li>
              <li>文檔與實作同步</li>
              <li>減少溝通成本</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- OpenAPI/Swagger 規格撰寫 -->
    <div class="content-section">
      <h3>2. OpenAPI/Swagger 規格撰寫</h3>
      <p>OpenAPI（原 Swagger）是目前最流行的 API 規格標準，提供了完整的 REST API 描述格式。</p>

      <CodeBlock
        title="OpenAPI 3.0 基礎規格範例"
        :code="openApiExample"
        language="yaml"
        :explanation="'這是一個完整的用戶管理 API 規格，包含了所有必要的組件定義'"
      />

      <div class="dotnet-comparison">
        <h4>🔗 與 C# Web API 的對比</h4>
        <p class="comparison-intro">
          對於 .NET 開發人員來說，OpenAPI 規格與 C# Web API 的概念非常相似。
          以下展示相同功能在兩種技術中的實現方式：
        </p>
        
        <div class="comparison-section">
          <div class="comparison-item">
            <h5>C# Web API (ASP.NET Core)</h5>
            <CodeBlock
              title="C# Controller 範例"
              :code="csharpControllerExample"
              language="csharp"
              :explanation="'C# 中使用屬性和強型別來定義 API'"
            />
          </div>
          
          <div class="comparison-divider">
            <span class="divider-text">對應</span>
          </div>
          
          <div class="comparison-item">
            <h5>OpenAPI 規格</h5>
            <CodeBlock
              title="對應的 OpenAPI 規格"
              :code="openApiPathExample"
              language="yaml"
              :explanation="'OpenAPI 用 YAML/JSON 描述相同的 API 結構'"
            />
          </div>
        </div>

        <div class="comparison-insights">
          <h5>🔍 關鍵對比洞察</h5>
          <div class="insights-grid">
            <div class="insight-item">
              <h6>型別定義</h6>
              <p>C# 使用強型別類別，OpenAPI 使用 JSON Schema 描述</p>
            </div>
            <div class="insight-item">
              <h6>路由定義</h6>
              <p>C# 使用 Route 屬性，OpenAPI 使用路徑物件</p>
            </div>
            <div class="insight-item">
              <h6>參數驗證</h6>
              <p>C# 使用 Data Annotations，OpenAPI 使用 schema 驗證</p>
            </div>
            <div class="insight-item">
              <h6>文檔生成</h6>
              <p>C# 需要額外工具，OpenAPI 本身就是文檔</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TypeScript 型別生成 -->
    <div class="content-section">
      <h3>3. 從 OpenAPI 生成 TypeScript 型別</h3>
      <p>透過工具可以從 OpenAPI 規格自動生成 TypeScript 型別定義，確保前後端型別一致性。</p>

      <div class="tools-section">
        <h4>常用的型別生成工具</h4>
        <div class="tools-grid">
          <div class="tool-card">
            <h5>openapi-typescript</h5>
            <p>輕量級工具，專注於型別生成</p>
            <CodeBlock
              title="安裝與使用"
              :code="openapiTypescriptExample"
              language="bash"
              :explanation="'最簡單的型別生成方案'"
            />
          </div>
          
          <div class="tool-card">
            <h5>swagger-typescript-api</h5>
            <p>功能完整，可生成 API 客戶端</p>
            <CodeBlock
              title="安裝與使用"
              :code="swaggerTypescriptApiExample"
              language="bash"
              :explanation="'生成完整的 API 客戶端代碼'"
            />
          </div>

          <div class="tool-card featured">
            <h5>OpenAPI Generator</h5>
            <p>業界標準的多語言代碼生成工具</p>
            <CodeBlock
              title="安裝與使用"
              :code="openapiGeneratorExample"
              language="bash"
              :explanation="'支援 50+ 種程式語言的強大工具'"
            />
          </div>
        </div>

        <div class="openapi-generator-showcase">
          <h4>🚀 OpenAPI Generator - 業界標準解決方案</h4>
          <p>
            <a href="https://github.com/OpenAPITools/openapi-generator" target="_blank" rel="noopener">OpenAPI Generator</a> 
            是目前最成熟且功能最完整的 OpenAPI 代碼生成工具，擁有超過 24,000 個 GitHub 星標，支援 50+ 種程式語言。
          </p>
          
          <div class="generator-features">
            <div class="feature-category">
              <h5>🎯 支援的語言與框架</h5>
              <div class="language-tags">
                <span class="lang-tag">TypeScript</span>
                <span class="lang-tag">JavaScript</span>
                <span class="lang-tag">C#</span>
                <span class="lang-tag">Java</span>
                <span class="lang-tag">Python</span>
                <span class="lang-tag">PHP</span>
                <span class="lang-tag">Go</span>
                <span class="lang-tag">Rust</span>
                <span class="lang-tag">Swift</span>
                <span class="lang-tag">Kotlin</span>
                <span class="lang-tag more">+40 more</span>
              </div>
            </div>

            <div class="feature-category">
              <h5>⚡ 生成內容</h5>
              <ul>
                <li><strong>客戶端 SDK</strong>：完整的 API 客戶端庫</li>
                <li><strong>伺服器存根</strong>：後端 API 框架代碼</li>
                <li><strong>型別定義</strong>：強型別的資料模型</li>
                <li><strong>API 文檔</strong>：互動式文檔網站</li>
                <li><strong>測試代碼</strong>：單元測試範本</li>
                <li><strong>配置檔案</strong>：專案設定檔</li>
              </ul>
            </div>
          </div>

          <div class="real-world-benefit">
            <h5>💡 實際開發效益</h5>
            <div class="benefit-comparison">
              <div class="before-after">
                <div class="before">
                  <h6>❌ 傳統手動開發</h6>
                  <ul>
                    <li>手動編寫 API 客戶端代碼</li>
                    <li>逐一定義資料模型</li>
                    <li>維護多個語言版本</li>
                    <li>手動同步 API 變更</li>
                    <li>容易出現不一致問題</li>
                  </ul>
                </div>
                <div class="after">
                  <h6>✅ 使用 OpenAPI Generator</h6>
                  <ul>
                    <li>一鍵生成完整 SDK</li>
                    <li>自動創建型別安全的模型</li>
                    <li>同時支援多種語言</li>
                    <li>API 變更自動反映</li>
                    <li>確保跨平台一致性</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            title="OpenAPI Generator 實際使用範例"
            :code="openapiGeneratorUsageExample"
            language="bash"
            :explanation="'從單一 OpenAPI 規格生成多語言客戶端庫的完整流程'"
          />
        </div>
      </div>

      <div class="generated-types-example">
        <h4>生成的 TypeScript 型別範例</h4>
        <CodeBlock
          title="自動生成的型別定義"
          :code="generatedTypesExample"
          language="typescript"
          :explanation="'從 OpenAPI 規格自動生成的 TypeScript 型別，確保與後端 API 完全一致'"
        />
      </div>
    </div>

    <!-- 實際開發流程 -->
    <div class="content-section">
      <h3>4. 實際開發流程整合</h3>
      <p>將 API 規格設計整合到實際的開發工作流程中。</p>

      <div class="workflow-steps">
        <div class="workflow-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>API 規格設計</h4>
            <p>使用 Swagger Editor 或 VS Code 擴充套件設計 API</p>
            <CodeBlock
              title="專案結構"
              :code="projectStructureExample"
              language="text"
              :explanation="'建議的專案結構，將 API 規格放在專門目錄'"
            />
          </div>
        </div>

        <div class="workflow-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>自動化型別生成</h4>
            <p>設定 npm scripts 自動生成型別</p>
            <CodeBlock
              title="package.json scripts"
              :code="packageScriptsExample"
              language="json"
              :explanation="'自動化腳本，確保型別定義始終與 API 規格同步'"
            />
          </div>
        </div>

        <div class="workflow-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>型別安全的 API 客戶端</h4>
            <p>使用生成的型別建立型別安全的 API 客戶端</p>
            <CodeBlock
              title="型別安全的 API 客戶端"
              :code="typeSafeApiClientExample"
              language="typescript"
              :explanation="'使用生成的型別確保 API 調用的型別安全'"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 最佳實踐 -->
    <div class="content-section">
      <h3>5. API 設計最佳實踐</h3>
      
      <div class="best-practices">
        <div class="practice-category">
          <h4>命名規範</h4>
          <ul>
            <li>使用複數名詞作為資源名稱（users, products）</li>
            <li>使用 kebab-case 或 camelCase 保持一致</li>
            <li>避免動詞，使用 HTTP 方法表達動作</li>
            <li>版本控制使用 /v1, /v2 前綴</li>
          </ul>
        </div>

        <div class="practice-category">
          <h4>狀態碼使用</h4>
          <ul>
            <li>200 OK - 成功獲取資源</li>
            <li>201 Created - 成功創建資源</li>
            <li>400 Bad Request - 請求參數錯誤</li>
            <li>401 Unauthorized - 未授權</li>
            <li>404 Not Found - 資源不存在</li>
            <li>500 Internal Server Error - 伺服器錯誤</li>
          </ul>
        </div>

        <div class="practice-category">
          <h4>回應格式統一</h4>
          <CodeBlock
            title="統一的 API 回應格式"
            :code="apiResponseFormatExample"
            language="typescript"
            :explanation="'建立一致的 API 回應格式，便於前端處理'"
          />
        </div>
      </div>
    </div>

    <!-- 自動生成型別的實際好處 -->
    <div class="content-section">
      <h3>6. OpenAPI 自動生成型別的實際好處</h3>
      <p>透過 OpenAPI 規格自動生成 TypeScript 型別定義，為開發團隊帶來顯著的效率提升和品質保證。</p>
      
      <div class="benefits-showcase">
        <div class="benefit-item">
          <h4>🚀 開發效率提升</h4>
          <ul>
            <li><strong>零手動維護</strong>：型別定義自動與 API 規格同步</li>
            <li><strong>即時更新</strong>：API 變更時一鍵更新所有型別</li>
            <li><strong>減少溝通成本</strong>：前後端基於同一份規格開發</li>
            <li><strong>快速上手</strong>：新團隊成員可直接使用生成的型別</li>
          </ul>
        </div>

        <div class="benefit-item">
          <h4>🛡️ 型別安全保障</h4>
          <ul>
            <li><strong>編譯時檢查</strong>：在開發階段就發現 API 調用錯誤</li>
            <li><strong>自動補全</strong>：IDE 提供精確的程式碼提示</li>
            <li><strong>重構安全</strong>：API 變更時 TypeScript 會標示所有影響點</li>
            <li><strong>文檔即程式碼</strong>：型別定義就是最準確的 API 文檔</li>
          </ul>
        </div>

        <div class="benefit-item">
          <h4>⚡ 團隊協作優勢</h4>
          <ul>
            <li><strong>統一標準</strong>：所有開發者使用相同的型別定義</li>
            <li><strong>版本控制</strong>：型別變更可追蹤和回滾</li>
            <li><strong>測試友善</strong>：Mock 資料也能享受型別安全</li>
            <li><strong>CI/CD 整合</strong>：自動化流程確保型別同步</li>
          </ul>
        </div>
      </div>

      <div class="real-world-example">
        <h4>實際開發情境對比</h4>
        <div class="scenario-comparison">
          <div class="scenario-item without-types">
            <h5>❌ 沒有自動生成型別</h5>
            <div class="scenario-problems">
              <p><strong>常見問題：</strong></p>
              <ul>
                <li>手動維護型別定義，容易過時</li>
                <li>API 欄位名稱拼錯，執行時才發現</li>
                <li>新增 API 欄位忘記更新前端型別</li>
                <li>不同開發者定義不一致的型別</li>
                <li>重構時遺漏更新相關型別</li>
              </ul>
            </div>
          </div>

          <div class="scenario-item with-types">
            <h5>✅ 使用 OpenAPI 自動生成</h5>
            <div class="scenario-benefits">
              <p><strong>開發體驗：</strong></p>
              <ul>
                <li>一次設定，永久受益</li>
                <li>編輯器智能提示，減少錯誤</li>
                <li>API 變更立即反映在型別上</li>
                <li>團隊使用統一、準確的型別</li>
                <li>重構時 TypeScript 自動檢查</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="workflow-automation">
        <h4>自動化工作流程範例</h4>
        <CodeBlock
          title="完整的自動化流程"
          :code="automationWorkflowExample"
          language="yaml"
          :explanation="'GitHub Actions 自動化流程，API 規格更新時自動生成新的型別定義'"
        />
      </div>
    </div>

    <!-- 本章總結 -->
    <div class="section-summary">
      <h3>本章總結</h3>
      <div class="summary-points">
        <div class="summary-point">
          <h4>API 優先設計</h4>
          <p>從 API 規格開始，確保前後端開發同步</p>
        </div>
        <div class="summary-point">
          <h4>OpenAPI 規格</h4>
          <p>使用標準化的 API 描述格式</p>
        </div>
        <div class="summary-point">
          <h4>自動化型別生成</h4>
          <p>從 API 規格自動生成 TypeScript 型別</p>
        </div>
        <div class="summary-point">
          <h4>開發流程整合</h4>
          <p>將 API 設計整合到日常開發工作流程</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

// OpenAPI 規格範例
const openApiExample = ref(`openapi: 3.0.3
info:
  title: 用戶管理 API
  description: 完整的用戶管理系統 API
  version: 1.0.0
  contact:
    name: API 開發團隊
    email: api@example.com

servers:
  - url: https://api.example.com/v1
    description: 生產環境
  - url: https://staging-api.example.com/v1
    description: 測試環境

paths:
  /users:
    get:
      summary: 獲取用戶列表
      tags: [Users]
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 10
      responses:
        '200':
          description: 成功獲取用戶列表
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserListResponse'

components:
  schemas:
    User:
      type: object
      required: [id, name, email]
      properties:
        id:
          type: integer
          example: 1
        name:
          type: string
          example: "張三"
        email:
          type: string
          format: email
          example: "zhang@example.com"`)

// C# Controller 範例
const csharpControllerExample = ref(`[ApiController]
[Route("api/v1/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(UserListResponse), 200)]
    public async Task<ActionResult<UserListResponse>> GetUsers(
        [FromQuery] int page = 1,
        [FromQuery] int limit = 10)
    {
        var users = await _userService.GetUsersAsync(page, limit);
        return Ok(new UserListResponse 
        { 
            Success = true, 
            Data = users
        });
    }
}`)

// OpenAPI 路徑範例
const openApiPathExample = ref(`/users:
  get:
    summary: 獲取用戶列表
    parameters:
      - name: page
        in: query
        schema:
          type: integer
          default: 1
    responses:
      '200':
        description: 成功獲取用戶列表`)

// 型別生成工具範例
const openapiTypescriptExample = ref(`# 安裝
npm install -D openapi-typescript

# 生成型別
npx openapi-typescript ./api/openapi.yaml -o ./src/types/api.ts`)

const swaggerTypescriptApiExample = ref(`# 安裝
npm install -D swagger-typescript-api

# 生成 API 客戶端
npx swagger-typescript-api -p ./api/openapi.yaml -o ./src/api`)

// 生成的型別範例
const generatedTypesExample = ref(`// 自動生成的型別定義
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface UserListResponse {
  success?: boolean;
  data?: User[];
}`)

// 專案結構範例
const projectStructureExample = ref(`project/
├── api/
│   ├── openapi.yaml
│   └── schemas/
├── src/
│   ├── types/
│   │   └── api.ts
│   └── api/
└── package.json`)

// package.json scripts 範例
const packageScriptsExample = ref(`{
  "scripts": {
    "api:generate": "openapi-typescript ./api/openapi.yaml -o ./src/types/api.ts",
    "api:validate": "swagger-codegen validate -i ./api/openapi.yaml"
  }
}`)

// 型別安全的 API 客戶端範例
const typeSafeApiClientExample = ref(`import type { User, UserListResponse } from '@/types/api';

class TypeSafeApiClient {
  async getUsers(params?: {
    page?: number;
    limit?: number;
  }): Promise<UserListResponse> {
    const response = await this.client.get('/users', { params });
    return response.data;
  }
}`)

// API 回應格式範例
const apiResponseFormatExample = ref(`interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}`)

// 自動化工作流程範例
const automationWorkflowExample = ref(`# .github/workflows/api-types.yml
name: 自動更新 API 型別定義

on:
  push:
    paths:
      - 'api/openapi.yaml'
  pull_request:
    paths:
      - 'api/openapi.yaml'

jobs:
  update-types:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Generate TypeScript types
        run: npm run api:generate
        
      - name: Check for changes
        run: |
          if [[ \`git status --porcelain\` ]]; then
            echo "型別定義已更新"
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add src/types/api.ts
            git commit -m "自動更新 API 型別定義"
            git push
          else
            echo "無需更新型別定義"
          fi`)

// OpenAPI Generator 範例
const openapiGeneratorExample = ref(`# 安裝 OpenAPI Generator
npm install -g @openapitools/openapi-generator-cli

# 生成 TypeScript 客戶端
openapi-generator-cli generate \\
  -i ./api/openapi.yaml \\
  -g typescript-axios \\
  -o ./src/generated/api

# 生成 C# 客戶端
openapi-generator-cli generate \\
  -i ./api/openapi.yaml \\
  -g csharp \\
  -o ./clients/csharp`)

// OpenAPI Generator 使用範例
const openapiGeneratorUsageExample = ref(`# 同時生成多種語言的客戶端庫

# TypeScript + Axios 客戶端
openapi-generator-cli generate \\
  -i ./api/openapi.yaml \\
  -g typescript-axios \\
  -o ./clients/typescript \\
  --additional-properties=withInterfaces=true

# C# 客戶端 (適合 .NET 開發人員)
openapi-generator-cli generate \\
  -i ./api/openapi.yaml \\
  -g csharp \\
  -o ./clients/csharp \\
  --additional-properties=packageName=MyApi.Client

# Java 客戶端
openapi-generator-cli generate \\
  -i ./api/openapi.yaml \\
  -g java \\
  -o ./clients/java \\
  --additional-properties=library=okhttp-gson

# Python 客戶端
openapi-generator-cli generate \\
  -i ./api/openapi.yaml \\
  -g python \\
  -o ./clients/python`)

defineProps<{
  section?: unknown
}>()

defineEmits<{
  complete: []
}>()
</script>

<style scoped>
.api-design-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.section-intro {
  margin-bottom: 3rem;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 2rem;
}

.learning-objectives {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #4299e1;
}

.learning-objectives h3 {
  margin: 0 0 1rem 0;
  color: #2d3748;
}

.learning-objectives ul {
  margin: 0;
  color: #4a5568;
}

.content-section {
  margin-bottom: 3rem;
}

.content-section h3 {
  color: #2d3748;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.comparison-item {
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid;
}

.comparison-item.bad {
  background: #fef5e7;
  border-color: #ed8936;
}

.comparison-item.good {
  background: #f0fff4;
  border-color: #48bb78;
}

.comparison-item h4 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.flow-steps {
  margin: 1rem 0;
}

.step {
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  font-size: 0.9rem;
}

.problems,
.benefits {
  margin-top: 1rem;
}

.problems ul,
.benefits ul {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.dotnet-comparison {
  background: #edf2f7;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
  border-left: 4px solid #9f7aea;
}

.dotnet-comparison h4 {
  margin: 0 0 1rem 0;
  color: #2d3748;
}

.comparison-intro {
  margin: 0 0 2rem 0;
  color: #4a5568;
  line-height: 1.6;
  font-size: 1rem;
}

.comparison-section {
  margin: 2rem 0;
}

.comparison-item {
  margin: 1.5rem 0;
}

.comparison-item h5 {
  margin: 0 0 1rem 0;
  color: #4a5568;
  font-size: 1.1rem;
  font-weight: 600;
}

.comparison-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  position: relative;
}

.comparison-divider::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #cbd5e0, transparent);
}

.divider-text {
  background: #edf2f7;
  padding: 0.5rem 1rem;
  color: #9f7aea;
  font-weight: 600;
  font-size: 0.9rem;
  border: 2px solid #9f7aea;
  border-radius: 20px;
  position: relative;
  z-index: 1;
}

.comparison-insights {
  margin: 2rem 0 0 0;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.comparison-insights h5 {
  margin: 0 0 1.5rem 0;
  color: #2d3748;
  font-size: 1rem;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .comparison-container,
  .comparison-grid,
  .tools-grid,
  .best-practices,
  .benefits-showcase,
  .scenario-comparison,
  .generator-features,
  .before-after,
  .insights-grid {
    grid-template-columns: 1fr;
  }
  
  .dotnet-comparison {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .comparison-intro {
    font-size: 0.95rem;
  }
  
  .comparison-item h5 {
    font-size: 1rem;
  }
  
  .insight-item {
    padding: 0.75rem;
  }
  
  .divider-text {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
  
  .workflow-step {
    flex-direction: column;
  }
  
  .step-number {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}

.insight-item {
  padding: 1rem;
  background: #f7fafc;
  border-radius: 6px;
  border-left: 3px solid #9f7aea;
}

.insight-item h6 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-size: 0.9rem;
  font-weight: 600;
}

.insight-item p {
  margin: 0;
  color: #4a5568;
  font-size: 0.85rem;
  line-height: 1.4;
}

.tools-section {
  margin: 2rem 0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin: 1rem 0;
}

.tool-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tool-card h5 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-size: 1.1rem;
}

.tool-card p {
  margin: 0 0 1rem 0;
  color: #4a5568;
  font-size: 0.9rem;
}

.tool-card.featured {
  border: 2px solid #4299e1;
  background: linear-gradient(135deg, #ebf8ff 0%, #f7fafc 100%);
}

.openapi-generator-showcase {
  margin: 2rem 0;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  border-left: 4px solid #4299e1;
}

.openapi-generator-showcase h4 {
  margin: 0 0 1rem 0;
  color: #2d3748;
}

.openapi-generator-showcase p {
  margin-bottom: 1.5rem;
  color: #4a5568;
  line-height: 1.6;
}

.openapi-generator-showcase a {
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
}

.openapi-generator-showcase a:hover {
  text-decoration: underline;
}

.generator-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.feature-category {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.feature-category h5 {
  margin: 0 0 1rem 0;
  color: #2d3748;
  font-size: 1rem;
}

.language-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.lang-tag {
  padding: 0.25rem 0.75rem;
  background: #4299e1;
  color: white;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
}

.lang-tag.more {
  background: #a0aec0;
}

.real-world-benefit {
  margin: 1.5rem 0;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.real-world-benefit h5 {
  margin: 0 0 1rem 0;
  color: #2d3748;
}

.benefit-comparison {
  margin-top: 1rem;
}

.before-after {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.before,
.after {
  padding: 1rem;
  border-radius: 6px;
}

.before {
  background: #fef5e7;
  border-left: 3px solid #ed8936;
}

.after {
  background: #f0fff4;
  border-left: 3px solid #48bb78;
}

.before h6,
.after h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.before ul,
.after ul {
  margin: 0;
  font-size: 0.85rem;
  color: #4a5568;
}

.generated-types-example {
  margin: 2rem 0;
}

.workflow-steps {
  margin: 2rem 0;
}

.workflow-step {
  display: flex;
  margin: 2rem 0;
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
  font-weight: bold;
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
}

.step-content p {
  margin: 0 0 1rem 0;
  color: #4a5568;
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1rem 0;
}

.practice-category {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 8px;
}

.practice-category h4 {
  margin: 0 0 1rem 0;
  color: #2d3748;
}

.practice-category ul {
  margin: 0;
  color: #4a5568;
}

.benefits-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.benefit-item {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #4299e1;
}

.benefit-item h4 {
  margin: 0 0 1rem 0;
  color: #2d3748;
  font-size: 1.1rem;
}

.benefit-item ul {
  margin: 0;
  color: #4a5568;
}

.benefit-item li {
  margin-bottom: 0.5rem;
}

.benefit-item strong {
  color: #2d3748;
}

.real-world-example {
  margin: 2rem 0;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.real-world-example h4 {
  margin: 0 0 1.5rem 0;
  color: #2d3748;
  text-align: center;
}

.scenario-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.scenario-item {
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid;
}

.scenario-item.without-types {
  background: #fef5e7;
  border-color: #ed8936;
}

.scenario-item.with-types {
  background: #f0fff4;
  border-color: #48bb78;
}

.scenario-item h5 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.scenario-problems p,
.scenario-benefits p {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  color: #2d3748;
}

.scenario-problems ul,
.scenario-benefits ul {
  margin: 0;
  color: #4a5568;
  font-size: 0.9rem;
}

.workflow-automation {
  margin: 2rem 0;
  background: #edf2f7;
  padding: 1.5rem;
  border-radius: 8px;
}

.workflow-automation h4 {
  margin: 0 0 1rem 0;
  color: #2d3748;
}

.section-summary {
  background: #edf2f7;
  padding: 2rem;
  border-radius: 8px;
  margin: 3rem 0;
}

.section-summary h3 {
  margin: 0 0 1.5rem 0;
  color: #2d3748;
  text-align: center;
}

.summary-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.summary-point {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.summary-point h4 {
  margin: 0 0 0.5rem 0;
  color: #4299e1;
}

.summary-point p {
  margin: 0;
  color: #4a5568;
  font-size: 0.9rem;
}
</style> 