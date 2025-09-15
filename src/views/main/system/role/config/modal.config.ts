const modalConfig = {
  pageN: "role",
  pageName: "角色",
  width: "33.33%",
  modalList: [
    {
      type: "normal",
      prop: "name",
      placeholder: "请输入角色名称",
      label: "角色名称"
    },
    {
      type: "normal",
      prop: "intro",
      placeholder: "请输入权限介绍",
      label: "权限介绍"
    },
    {
      type: "custom",
      prop: "menuList"
    }
  ]
}

export default modalConfig
