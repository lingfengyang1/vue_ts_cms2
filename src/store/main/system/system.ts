import {
  deleteDeletePage,
  deleteDeleteUser,
  loadPageList,
  loadUserList,
  patchEditPage,
  patchEditUser,
  postNewPage,
  postNewUser
} from "@/service/main/system/system"
import { defineStore } from "pinia"

interface ISystemStore {
  totalCount: number
  list: []

  pageTotalCount: number
  pageList: []
}

const useSystemStore = defineStore("system", {
  state: (): ISystemStore => ({
    totalCount: 0,
    list: [],
    pageTotalCount: 0,
    pageList: []
  }),
  actions: {
    async loadUserListAction(queryInfo: any) {
      const res = await loadUserList(queryInfo)
      const { totalCount, list } = res.data
      this.totalCount = totalCount
      this.list = list
      console.log(this.list)
    },

    async newUserAction(itemData: any) {
      await postNewUser(itemData)

      this.loadUserListAction({ offset: 0, size: 10 })
    },

    async editUserAction(id: number, itemData: any) {
      await patchEditUser(id, itemData)

      this.loadUserListAction({ offset: 0, size: 10 })
    },

    async deleteUserAction(id: number) {
      await deleteDeleteUser(id)

      this.loadUserListAction({ offset: 0, size: 10 })
    },

    async loadPageListAction(pageN: string, queryInfo: any) {
      const res = await loadPageList(pageN, queryInfo)
      const { totalCount, list } = res.data
      this.pageTotalCount = totalCount
      this.pageList = list
    },

    async newPageAction(pageN: string, itemData: any) {
      await postNewPage(pageN, itemData)

      this.loadPageListAction(pageN, { offset: 0, size: 10 })
    },

    async editPageAction(pageN: string, id: number, itemData: any) {
      console.log(itemData)
      await patchEditPage(pageN, id, itemData)

      this.loadPageListAction(pageN, { offset: 0, size: 10 })
    },

    async deletePageAction(pageN: string, id: number) {
      await deleteDeletePage(pageN, id)

      this.loadPageListAction(pageN, { offset: 0, size: 10 })
    }
  }
})

export { useSystemStore }
