import { defineStore } from "pinia"
import router from "@/router"

import type { ILoginState } from "."
import type { IAccount } from "@/types/login"
import {
  accountLogin,
  getRoleById,
  getMenusByRoleId
} from "@/service/login/login"
import { localCache } from "@/utils/cache"
import { mapMenusToPermissions, mapMenusToRoutes } from "@/utils/map-menu"
import { useMainStore } from "../main/main"

const useLoginStore = defineStore("login", {
  state: (): ILoginState => ({
    token: "",
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // console.log("呵呵呵")
      const res1 = await accountLogin(account)
      // console.log(res1)
      const { token, id } = res1.data
      // console.log(token)
      this.token = token
      // 将状态保存到pinia中有一个缺陷 一旦刷新后 状态立马消失 无法持久化保存
      localCache.setItem("token", token)

      // 获取并保存用户详情信息(主要是为了获取用户对应的唯一角色id)
      const res2 = await getRoleById(id)
      const userInfo = res2.data
      // console.log(userInfo)
      this.userInfo = userInfo
      localCache.setItem("userInfo", userInfo)

      // 获取并保存用户菜单信息(通过上述的角色id来获取菜单信息)
      const res3 = await getMenusByRoleId(userInfo.role.id)
      const userMenus = res3.data
      // console.log(userMenus)
      this.userMenus = userMenus
      localCache.setItem("userMenus", userMenus)

      // 在登录成功后 我们可以根据登录成功的用户角色来动态注册路由
      const roleMenus = mapMenusToRoutes(userMenus)
      console.log(roleMenus)
      for (const roleMenu of roleMenus) {
        router.addRoute("main", roleMenu)
      }

      // 登录成功后 最好保存一下权限树中的三级菜单的权限
      this.permissions = mapMenusToPermissions(userMenus)

      // 跳转到main页面
      router.push("/main")
    },

    loadLocalCacheAction() {
      // 当我们刷新时 pinia/router中保存的数据就会消失 我们因此需要重新加载他们
      const token = localCache.getItem("token")
      const userInfo = localCache.getItem("userInfo")
      const userMenus = localCache.getItem("userMenus")

      // 当我们重新刷新时 也需要重新将roles/departments数据装载到store中
      const mainStore = useMainStore()
      mainStore.fetchEntireData()

      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        this.permissions = mapMenusToPermissions(userMenus)

        const roleMenus = mapMenusToRoutes(userMenus)
        for (const roleMenu of roleMenus) {
          router.addRoute("main", roleMenu)
        }
      }
    }
  }
})

export default useLoginStore
