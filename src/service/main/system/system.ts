import { hyRequest1 } from "@/service"

export function loadUserList(data: any) {
  return hyRequest1.post({
    url: "/users/list",
    data,
    headers: {}
  })
}

export function postNewUser(itemData: any) {
  return hyRequest1.post({
    url: "/users",
    data: itemData,
    headers: {}
  })
}

export function patchEditUser(id: number, itemData: any) {
  return hyRequest1.patch({
    url: `/users/${id}`,
    data: itemData,
    headers: {}
  })
}

export function deleteDeleteUser(id: number) {
  return hyRequest1.delete({
    url: `/users/${id}`,
    headers: {}
  })
}

export function loadPageList(pageName: string, queryInfo: any) {
  return hyRequest1.post({
    url: `/${pageName}/list`,
    data: queryInfo,
    headers: {}
  })
}

export function postNewPage(pageName: string, itemData: any) {
  return hyRequest1.post({
    url: `/${pageName}`,
    data: itemData,
    headers: {}
  })
}

export function patchEditPage(pageName: string, id: number, itemData: any) {
  console.log(itemData)
  return hyRequest1.patch({
    url: `/${pageName}/${id}`,
    data: itemData,
    headers: {}
  })
}

export function deleteDeletePage(pageName: string, id: number) {
  return hyRequest1.delete({
    url: `/${pageName}/${id}`,
    headers: {}
  })
}
