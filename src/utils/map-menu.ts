import type { RouteRecordRaw } from "vue-router"

// 加载所有的权限
function loadAllMenus() {
  const allMenus: RouteRecordRaw[] = []
  // 读取所有的权限文件 将每一个权限文件中导出的对象集成到数组中 eager表示的是如果遇到懒加载组件的话 就会在引入的同时立即加载而不是使用时才进行加载
  const files: Record<string, any> = import.meta.glob(
    "../router/main/**/*.ts",
    {
      eager: true
    }
  )
  // 遍历所有的权限文件 存入权限数组中
  for (const file in files) {
    const menu = files[file].default
    allMenus.push(menu)
  }
  return allMenus
}

// 记录进入main页面的第一个匹配的二级菜单
export let firstMenu: any = null
// 根据当前角色过滤出所属的所有权限
export function mapMenusToRoutes(userMenus: any[]) {
  const roleMenus: RouteRecordRaw[] = []
  const allMenus = loadAllMenus()
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      // 将subMenu代入到allMenus中查找
      const sub = allMenus.find((item) => item.path === subMenu.url)
      if (sub) {
        // 我们首先将他的顶级菜单的重定向路径设置为当前角色第一个符合的子菜单路径
        if (!roleMenus.find((item) => menu.url === item.path)) {
          // 如果不存在这样的顶级菜单对象的话 那么创建并将其重定向路径指定为第一个符合条件的子菜单路径
          roleMenus.push({ path: menu.url, redirect: sub.path })
        }
        // 然后再将当前符合条件的子菜单添加到结果数组中
        roleMenus.push(sub)

        // 记录第一个匹配的二级菜单
        if (!firstMenu) firstMenu = sub
      }
    }
  }
  return roleMenus
}

// 根据路径来获取相应的权限
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) return subMenu
    }
  }
}

// 根据路径来映射面包屑
export function mapPathToCrumb(path: string, userMenus: any[]) {
  // console.log(path)
  const crumbs: any[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        crumbs.push({ name: menu.name, path: menu.url })
        crumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return crumbs
}

// 将菜单列表转换成对应的id列表
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recursiveGetId(menus: any[]) {
    for (const menu of menus) {
      if (menu.children) {
        recursiveGetId(menu.children)
      } else {
        ids.push(menu.id)
      }
    }
  }

  recursiveGetId(menuList)
  return ids
}

// 将菜单列表转换成三级菜单的权限
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  function recursiveGetPermissions(userMenus: any[]) {
    for (const userMenu of userMenus) {
      if (userMenu.type === 3) {
        permissions.push(userMenu.permission)
      } else {
        // 需要注意的是undefined无法进行迭代操作 因此在undefined作为参数时需要替换为空数组方可进行迭代操作
        recursiveGetPermissions(userMenu.children ?? [])
      }
    }
  }
  recursiveGetPermissions(userMenus)

  return permissions
}
