<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
/* 全域樣式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #2d3748;
  background-color: #ffffff;
}

#app {
  min-height: 100vh;
}

/* 響應式字體大小 */
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}

/* 程式碼高亮樣式 */
pre[class*="language-"] {
  margin: 0;
}

code[class*="language-"],
pre[class*="language-"] {
  color: #e2e8f0;
  background: #2d3748;
  text-shadow: 0 1px rgba(0, 0, 0, 0.3);
  font-family: Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', monospace;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  tab-size: 4;
  hyphens: none;
}

/* TypeScript 語法高亮 */
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #718096;
}

.token.punctuation {
  color: #e2e8f0;
}

.token.property,
.token.tag,
.token.constant,
.token.symbol,
.token.deleted {
  color: #f56565;
}

.token.boolean,
.token.number {
  color: #ed8936;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #68d391;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string,
.token.variable {
  color: #4fd1c7;
}

.token.atrule,
.token.attr-value,
.token.function,
.token.class-name {
  color: #fbb6ce;
}

.token.keyword {
  color: #9f7aea;
}

.token.regex,
.token.important {
  color: #f6ad55;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}
</style>
