import { hyRequest1 } from ".."

function postEntireRole() {
  return hyRequest1.post({
    url: "/role/list",
    headers: {}
  })
}

function postEntireDepartment() {
  return hyRequest1.post({
    url: "/department/list",
    headers: {}
  })
}

function postMenuTree() {
  return hyRequest1.post({
    url: "/menu/list",
    headers: {}
  })
}

export { postEntireRole, postEntireDepartment, postMenuTree }
