const modalConfig: any = {
  pageN: "department",
  pageName: "部门",
  width: "33.33%",
  modalList: [
    {
      type: "normal",
      label: "部门名称",
      prop: "name",
      placeholder: "请输入部门名称"
    },
    {
      type: "normal",
      label: "部门领导",
      prop: "leader",
      placeholder: "请输入部门领导"
    },
    {
      type: "select",
      label: "选择部门",
      prop: "parentId",
      placeholder: "请选择部门",
      options: []
    }
  ]
}

export default modalConfig
