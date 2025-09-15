import { hyRequest1 } from ".."
import type { IAccount } from "../../types/login"

function accountLogin(account: IAccount) {
  return hyRequest1.post({
    url: "/login",
    data: account,
    headers: {}
  })
}

function getRoleById(id: number) {
  return hyRequest1.get({
    url: `/users/${id}`,
    headers: {}
    // headers: {
    //   Authorization: "Bearer " + localCache.getItem("token")
    // }
  })
}

function getMenusByRoleId(id: number) {
  return hyRequest1.get({
    url: `/role/${id}/menu`,
    headers: {}
    // headers: {
    //   Authorization: "Bearer " + localCache.getItem("token")
    // }
  })
}

export { accountLogin, getRoleById, getMenusByRoleId }
