const contentConfig = {
  pageN: "role",
  pageName: "角色",
  contentList: [
    {
      type: "select",
      width: "80px"
    },
    {
      type: "index",
      width: "80px",
      label: "序号"
    },
    {
      type: "normal",
      width: "150px",
      label: "角色名称",
      prop: "name"
    },
    {
      type: "normal",
      width: "180px",
      label: "权限介绍",
      prop: "intro"
    },
    {
      type: "timer",
      label: "创建时间",
      prop: "createAt"
    },
    {
      type: "timer",
      label: "更新时间",
      prop: "updateAt"
    },
    {
      type: "handler",
      label: "操作",
      width: "210px"
    }
  ]
}

export default contentConfig
