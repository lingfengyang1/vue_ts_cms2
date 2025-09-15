const contentConfig: any = {
  pageN: "department",
  pageName: "部门",
  contentList: [
    {
      type: "select",
      width: "50px"
    },
    {
      type: "index",
      width: "60px",
      prop: "id",
      label: "序号"
    },
    {
      type: "normal",
      width: "120px",
      prop: "name",
      label: "部门名称"
    },
    {
      type: "normal",
      width: "120px",
      prop: "leader",
      label: "部门领导"
    },
    {
      type: "normal",
      width: "150px",
      prop: "parentId",
      label: "上级部门"
    },
    {
      type: "timer",
      prop: "createAt",
      label: "创建时间"
    },
    {
      type: "timer",
      prop: "updateAt",
      label: "更新时间"
    },
    {
      type: "handler",
      label: "操作"
    }
  ]
}

export default contentConfig
