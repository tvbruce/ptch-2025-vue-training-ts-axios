import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import CourseModule from '@/views/CourseModule.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/module/:sectionId',
    name: 'CourseModule',
    component: CourseModule,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // 每次路由切換時都回到頂部，不使用動畫效果
    return { top: 0, left: 0 }
  },
})

export default router
