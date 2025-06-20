<template>
  <div class="vscode-setup">
    <div class="section-intro">
      <h2>VS Code 開發環境設定</h2>
      <p class="section-description">
        為 TypeScript + Vue 開發配置最佳化的 VS Code 環境。
        本章節將介紹必備擴充套件及其設定方式，讓您的開發效率大幅提升。
      </p>
    </div>

    <div class="content-section">
      <h3>🔌 必備擴充套件</h3>

      <div class="extensions-container">
        <div class="extension-card" v-for="extension in extensions" :key="extension.id">
          <div class="extension-header">
            <div class="extension-icon">
              <span class="icon">{{ extension.icon }}</span>
            </div>
            <div class="extension-info">
              <h4>{{ extension.name }}</h4>
              <p class="extension-id">{{ extension.id }}</p>
              <span class="priority-badge" :class="extension.priority">{{ extension.priorityText }}</span>
            </div>
          </div>

          <div class="extension-content">
            <div class="extension-description">
              <p>{{ extension.description }}</p>
            </div>

            <div class="extension-features">
              <h5>主要功能：</h5>
              <ul>
                <li v-for="feature in extension.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>

            <div class="installation-guide">
              <h5>安裝方式：</h5>
              <CodeBlock title="安裝指令" :code="extension.installCode" language="bash"
                :explanation="extension.installExplanation" />
            </div>

            <div class="configuration" v-if="extension.config">
              <h5>設定配置：</h5>
              <div class="config-location-note">
                <p><strong>設定位置：</strong>{{ extension.config.location }}</p>
                <p class="config-steps">{{ extension.config.steps }}</p>
              </div>
              <CodeBlock :title="extension.config.title" :code="extension.config.code"
                :language="extension.config.language" :explanation="extension.config.explanation" />
            </div>

            <div class="important-note" v-if="extension.note">
              <h5>⚠️ 重要提醒：</h5>
              <p>{{ extension.note }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h3>🔧 整合配置</h3>

      <div class="integration-section">
        <h4>完整 VS Code 設定檔</h4>
        <p>將所有擴充套件整合的完整 settings.json 配置：</p>

        <div class="settings-guide">
          <h5>📋 設定步驟：</h5>
          <ol class="settings-steps">
            <li><strong>開啟 VS Code 設定檔</strong>
              <ul>
                <li>方法 1：按 <code>Ctrl + ,</code> (Mac: <code>Cmd + ,</code>) 開啟設定</li>
                <li>方法 2：按 <code>Ctrl + Shift + P</code> (Mac: <code>Cmd + Shift + P</code>) 開啟命令面板，輸入 "Preferences:
                  Open Settings (JSON)"</li>
                <li>方法 3：點選左下角齒輪圖示 → 設定 → 右上角 {} 圖示</li>
              </ul>
            </li>
            <li><strong>選擇設定範圍</strong>
              <ul>
                <li><strong>全域設定</strong>：適用於所有專案 (User Settings)</li>
                <li><strong>專案設定</strong>：僅適用於當前專案 (Workspace Settings)</li>
              </ul>
            </li>
            <li><strong>複製配置</strong>：將下方配置複製到 settings.json 檔案中</li>
            <li><strong>儲存檔案</strong>：按 <code>Ctrl + S</code> (Mac: <code>Cmd + S</code>) 儲存設定</li>
          </ol>
        </div>

        <CodeBlock title="完整 settings.json 配置" :code="completeSettingsCode" language="json"
          explanation="將此配置複製到您的 VS Code settings.json 檔案中" />

        <div class="settings-location-info">
          <h5>📁 設定檔位置：</h5>
          <div class="location-grid">
            <div class="location-item">
              <h6>Windows</h6>
              <code>%APPDATA%\Code\User\settings.json</code>
            </div>
            <div class="location-item">
              <h6>macOS</h6>
              <code>~/Library/Application Support/Code/User/settings.json</code>
            </div>
            <div class="location-item">
              <h6>Linux</h6>
              <code>~/.config/Code/User/settings.json</code>
            </div>
          </div>
        </div>
      </div>

      <div class="integration-section">
        <h4>專案配置檔案設定</h4>
        <p>除了 VS Code 設定外，還需要在專案中建立以下配置檔案：</p>

        <div class="project-files-guide">
          <div class="file-guide">
            <h5>1. ESLint 配置檔案</h5>
            <p><strong>檔案位置：</strong>專案根目錄 <code>.eslintrc.js</code></p>
            <CodeBlock title=".eslintrc.js - ESLint 規則配置" :code="eslintProjectConfigCode" language="javascript"
              explanation="在專案根目錄建立此檔案以設定 ESLint 規則" />
          </div>

          <div class="file-guide">
            <h5>2. Prettier 配置檔案</h5>
            <p><strong>檔案位置：</strong>專案根目錄 <code>.prettierrc.js</code></p>
            <CodeBlock title=".prettierrc.js - Prettier 格式化規則" :code="prettierProjectConfigCode" language="javascript"
              explanation="在專案根目錄建立此檔案以設定 Prettier 格式化規則" />
          </div>

          <div class="file-guide">
            <h5>3. EditorConfig 檔案</h5>
            <p><strong>檔案位置：</strong>專案根目錄 <code>.editorconfig</code></p>
            <CodeBlock title=".editorconfig - 編輯器統一設定" :code="editorConfigFileCode" language="ini"
              explanation="在專案根目錄建立此檔案以統一不同編輯器的設定" />
          </div>
        </div>

        <CodeBlock title="專案根目錄檔案結構" :code="projectStructureCode" language="bash" explanation="建議在專案根目錄建立這些配置檔案" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const extensions = ref([
  {
    id: 'ms-vscode.vscode-typescript-next',
    name: 'JavaScript and TypeScript Nightly',
    icon: '🔵',
    priority: 'essential',
    priorityText: '必裝',
    description: '提供最新的 TypeScript 語言服務支援，包含最新的語法特性和錯誤檢測。',
    features: [
      '最新 TypeScript 語言特性支援',
      '即時語法檢查和錯誤提示',
      '智能代碼補全和重構',
      '型別定義預覽',
      '自動導入管理'
    ],
    installCode: `# 方法 1：透過 VS Code 擴充套件市場
ext install ms-vscode.vscode-typescript-next

# 方法 2：命令面板
Ctrl+Shift+P > Extensions: Install Extensions
搜尋 "JavaScript and TypeScript Nightly"`,
    installExplanation: '在 VS Code 中按 Ctrl+Shift+P (Mac: Cmd+Shift+P) 開啟命令面板',
    config: {
      title: 'TypeScript 設定',
      language: 'json',
      code: `{
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.suggest.autoImports": true,
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.inlayHints.parameterNames.enabled": "all",
  "typescript.inlayHints.variableTypes.enabled": true,
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true
}`,
      explanation: '在 VS Code 設定檔中添加以下配置以優化 TypeScript 開發體驗',
      location: 'VS Code settings.json',
      steps: '1. 開啟 VS Code 設定檔 (Ctrl+,) 2. 在左側選單中選擇 "設定" 3. 在搜索欄中輸入 "typescript" 4. 添加以下配置'
    }
  },
  {
    id: 'Vue.volar',
    name: 'Vue - Official (Volar)',
    icon: '🟢',
    priority: 'essential',
    priorityText: '必裝',
    description: 'Vue 3 官方推薦的 VS Code 擴充套件，提供完整的 Vue 單檔案組件支援。',
    features: [
      'Vue SFC (.vue) 檔案語法高亮',
      'Template、Script、Style 區塊支援',
      'TypeScript 完整整合',
      'Composition API 智能補全',
      '組件 Props 型別檢查',
      'Vue Router 和 Pinia 支援'
    ],
    installCode: `# 方法 1：VS Code 擴充套件市場
ext install Vue.volar

# 方法 2：命令面板
Ctrl+Shift+P > Extensions: Install Extensions
搜尋 "Vue - Official"`,
    installExplanation: '透過 VS Code 擴充套件市場或命令列安裝',
    config: {
      title: 'Vue + TypeScript 配置',
      language: 'json',
      code: `{
  "vue.server.hybridMode": true,
  "vue.codeActions.enabled": true,
  "vue.complete.casing.tags": "kebab",
  "vue.complete.casing.props": "camel",
  "typescript.preferences.includePackageJsonAutoImports": "auto"
}`,
      explanation: '確保 Volar 與 TypeScript 完美整合的設定',
      location: 'VS Code settings.json',
      steps: '1. 開啟 VS Code 設定檔 (Ctrl+,) 2. 在左側選單中選擇 "設定" 3. 在搜索欄中輸入 "vue" 4. 添加以下配置'
    },
    note: '如果之前安裝過 Vetur 擴充套件，請先停用或移除，避免衝突。'
  },
  {
    id: 'dbaeumer.vscode-eslint',
    name: 'ESLint',
    icon: '🔴',
    priority: 'essential',
    priorityText: '必裝',
    description: 'JavaScript 和 TypeScript 代碼品質檢查工具，幫助維持一致的代碼風格。',
    features: [
      '即時代碼品質檢查',
      '自動修復常見問題',
      '自定義規則配置',
      'TypeScript 支援',
      'Vue 檔案 lint 檢查'
    ],
    installCode: `# VS Code 擴充套件
ext install dbaeumer.vscode-eslint

# 專案依賴 (npm)
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# 專案依賴 (yarn)
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`,
    installExplanation: '同時需要在專案中安裝 ESLint 相關套件',
    config: {
      title: 'ESLint 自動修復設定',
      language: 'json',
      code: `{
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "typescript",
    "vue"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}`,
      explanation: '設定 ESLint 在儲存時自動修復問題',
      location: 'VS Code settings.json',
      steps: '1. 開啟 VS Code 設定檔 (Ctrl+,) 2. 在左側選單中選擇 "設定" 3. 在搜索欄中輸入 "eslint" 4. 添加以下配置'
    }
  },
  {
    id: 'EditorConfig.EditorConfig',
    name: 'EditorConfig for VS Code',
    icon: '⚙️',
    priority: 'recommended',
    priorityText: '推薦',
    description: '統一不同編輯器和 IDE 的代碼格式設定，確保團隊開發一致性。',
    features: [
      '統一縮排設定 (空格/Tab)',
      '行尾字符統一',
      '檔案編碼設定',
      '自動移除行尾空白',
      '跨平台一致性'
    ],
    installCode: `# VS Code 擴充套件安裝
ext install EditorConfig.EditorConfig

# 或透過命令面板
Ctrl+Shift+P > Extensions: Install Extensions
搜尋 "EditorConfig for VS Code"`,
    installExplanation: '安裝後會自動讀取專案根目錄的 .editorconfig 檔案',
    config: {
      title: '專案根目錄 .editorconfig',
      language: 'ini',
      code: `root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false`,
      explanation: '在專案根目錄建立此檔案以統一編輯器設定',
      location: '專案根目錄',
      steps: '1. 在專案根目錄下建立 .editorconfig 檔案 2. 添加以下配置'
    }
  },
  {
    id: 'esbenp.prettier-vscode',
    name: 'Prettier - Code formatter',
    icon: '💅',
    priority: 'essential',
    priorityText: '必裝',
    description: '自動代碼格式化工具，支援多種語言，確保代碼風格一致性。',
    features: [
      '自動代碼格式化',
      '支援 TypeScript、Vue、CSS 等',
      '可配置格式化規則',
      '儲存時自動格式化',
      '與 ESLint 整合'
    ],
    installCode: `# VS Code 擴充套件
ext install esbenp.prettier-vscode

# 專案依賴 (npm)
npm install --save-dev prettier

# 專案依賴 (yarn)
yarn add -D prettier`,
    installExplanation: '建議同時在專案中安裝 Prettier 套件',
    config: {
      title: 'Prettier 格式化設定',
      language: 'json',
      code: `{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "prettier.requireConfig": true
}`,
      explanation: '設定 Prettier 為預設格式化工具並啟用自動格式化',
      location: 'VS Code settings.json',
      steps: '1. 開啟 VS Code 設定檔 (Ctrl+,) 2. 在左側選單中選擇 "設定" 3. 在搜索欄中輸入 "prettier" 4. 添加以下配置'
    }
  }
])

const completeSettingsCode = `{
  // TypeScript 設定
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.suggest.autoImports": true,
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.inlayHints.parameterNames.enabled": "all",
  "typescript.inlayHints.variableTypes.enabled": true,
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true,

  // Vue/Volar 設定
  "vue.server.hybridMode": true,
  "vue.codeActions.enabled": true,
  "vue.complete.casing.tags": "kebab",
  "vue.complete.casing.props": "camel",

  // ESLint 設定
  "eslint.enable": true,
  "eslint.validate": ["javascript", "typescript", "vue"],

  // Prettier 設定
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "prettier.requireConfig": true,

  // 編輯器設定
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.eol": "\\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true
}`

const eslintProjectConfigCode = `module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:vue/vue3-essential'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
}`

const prettierProjectConfigCode = `module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  vueIndentScriptAndStyle: false
}`

const editorConfigFileCode = `root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false`

const projectStructureCode = `your-project/
├── .vscode/
│   └── settings.json          # VS Code 專案設定
├── .editorconfig              # 編輯器統一設定
├── .eslintrc.js              # ESLint 規則設定
├── .prettierrc.js            # Prettier 格式化設定
├── tsconfig.json             # TypeScript 編譯設定
├── vite.config.ts            # Vite 建置設定
└── package.json              # 專案依賴設定`
</script>

<style scoped>
.vscode-setup {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.section-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.section-intro h2 {
  font-size: 2.5rem;
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

.content-section {
  margin-bottom: 4rem;
}

.content-section h3 {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.extensions-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.extension-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.extension-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.extension-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-bottom: 1px solid #e2e8f0;
}

.extension-icon {
  margin-right: 1rem;
}

.extension-icon .icon {
  font-size: 2rem;
}

.extension-info {
  flex: 1;
}

.extension-info h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.extension-id {
  font-size: 0.875rem;
  color: #718096;
  font-family: 'Monaco', 'Menlo', monospace;
  margin-bottom: 0.5rem;
}

.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.priority-badge.essential {
  background: #fed7d7;
  color: #c53030;
}

.priority-badge.recommended {
  background: #bee3f8;
  color: #2b6cb0;
}

.extension-content {
  padding: 1.5rem;
}

.extension-description {
  margin-bottom: 1.5rem;
}

.extension-description p {
  color: #4a5568;
  line-height: 1.6;
}

.extension-features,
.installation-guide,
.configuration {
  margin-bottom: 1.5rem;
}

.extension-features h5,
.installation-guide h5,
.configuration h5 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.75rem;
}

.extension-features ul {
  list-style: none;
  padding: 0;
}

.extension-features li {
  padding: 0.25rem 0;
  color: #4a5568;
  position: relative;
  padding-left: 1.5rem;
}

.extension-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #48bb78;
  font-weight: bold;
}

.important-note {
  background: #fef5e7;
  border: 1px solid #f6ad55;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.important-note h5 {
  color: #c05621;
  margin-bottom: 0.5rem;
}

.important-note p {
  color: #744210;
  margin: 0;
}

.integration-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
  border-left: 4px solid #4299e1;
}

.integration-section h4 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.config-location-note {
  margin-bottom: 1rem;
}

.config-steps {
  color: #718096;
  font-size: 0.875rem;
}

.settings-guide {
  margin-bottom: 1.5rem;
}

.settings-steps {
  list-style: none;
  padding: 0;
}

.settings-steps li {
  padding: 0.25rem 0;
  color: #4a5568;
  position: relative;
  padding-left: 1.5rem;
}

.settings-steps li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #48bb78;
  font-weight: bold;
}

.settings-location-info {
  margin-bottom: 1.5rem;
}

.location-grid {
  display: flex;
  gap: 1rem;
}

.location-item {
  flex: 1;
}

.location-item h6 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.location-item code {
  font-size: 0.875rem;
  color: #718096;
  font-family: 'Monaco', 'Menlo', monospace;
}

.project-files-guide {
  margin-bottom: 1.5rem;
}

.file-guide {
  margin-bottom: 1rem;
}

.file-guide h5 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.file-guide p {
  color: #4a5568;
  line-height: 1.6;
}

.file-guide code {
  font-size: 0.875rem;
  color: #718096;
  font-family: 'Monaco', 'Menlo', monospace;
}

.project-files-guide code {
  font-size: 0.875rem;
  color: #718096;
  font-family: 'Monaco', 'Menlo', monospace;
}

@media (max-width: 768px) {
  .vscode-setup {
    padding: 1rem;
  }

  .section-intro h2 {
    font-size: 2rem;
  }

  .extension-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .location-grid {
    flex-direction: column;
    gap: 0.5rem;
  }

  .settings-steps ul {
    padding-left: 1rem;
  }

  .settings-steps code {
    font-size: 0.75rem;
  }
}
</style>
