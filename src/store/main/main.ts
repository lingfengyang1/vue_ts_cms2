import {
  postEntireDepartment,
  postEntireRole,
  postMenuTree
} from "@/service/main/main"
import { defineStore } from "pinia"

interface IMainState {
  roles: any[]
  departments: any[]
  menuTree: any[]
}

const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    roles: [],
    departments: [],
    menuTree: []
  }),
  actions: {
    async fetchEntireData() {
      const res1 = await postEntireRole()
      this.roles = res1.data.list

      const res2 = await postEntireDepartment()
      this.departments = res2.data.list

      const res3 = await postMenuTree()
      this.menuTree = res3.data.list
    }
  }
})

export { useMainStore }
