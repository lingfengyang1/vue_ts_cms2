import { localCache } from "@/utils/cache"
import { firstMenu } from "@/utils/map-menu"
import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/Login.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/Main.vue")
      // children: [
      //   {
      //     path: "/main/analysis/dashboard",
      //     component: () =>
      //       import("@/views/main/analysis/dashboard/Dashboard.vue")
      //   },
      //   {
      //     path: "/main/analysis/overview",
      //     component: () => import("@/views/main/analysis/overview/Overview.vue")
      //   },
      //   {
      //     path: "/main/system/user",
      //     component: () => import("@/views/main/system/user/User.vue")
      //   },
      //   {
      //     path: "/main/system/role",
      //     component: () => import("@/views/main/system/role/Role.vue")
      //   }
      // ]
    },
    {
      // .表示匹配任意字符 而*表示匹配零个或多个字符
      path: "/:pathMatcher(.*)",
      component: () => import("@/views/not-found/NotFound.vue")
    }
  ]
})

// 当我们没有登录的情况下尝试访问main前缀的路径时 需要跳转回登录页面为妥
router.beforeEach((to) => {
  const token = localCache.getItem("token")
  if (!token && to.path.startsWith("/main")) {
    // 无需担心这里的路径会被再次拦截 因为即使被再次拦截的话 都会直接放行请求 因为下一次拦截的返回值为undefined(false)处理方式就是放行拦截
    return "/login"
  }

  // 跳转到main页面时 默认跳转到第一个该角色匹配的二级菜单
  if (to.path === "/main") return firstMenu.path
})

export default router
