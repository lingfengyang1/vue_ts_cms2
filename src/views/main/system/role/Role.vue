<template>
  <div class="role">
    <div class="top">
      <page-search
        @reset-click="handleResetClick"
        @query-click="handleQueryClick"
        :form="form"
      />
    </div>
    <div class="bottom">
      <page-content
        @new-click="handleNewClick"
        @edit-click="handleEditClick"
        :content="content"
        ref="contentRef"
      >
        <template #createAt="scope">
          {{ formatUTC(scope.row[scope.prop]) }}
        </template>
        <template #updateAt="scope">
          {{ formatUTC(scope.row[scope.prop]) }}
        </template>
      </page-content>
      <page-modal :modal="modal" ref="modalRef" :menu-data="menuData">
        <template #menuList>
          <el-tree
            :data="menuTree"
            show-checkbox
            highlight-current
            node-key="id"
            :props="{ label: 'name', children: 'children' }"
            ref="treeRef"
            @check="handleCheckClick"
          />
        </template>
      </page-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search/PageSearch.vue"
import PageContent from "@/components/page-content/PageContent.vue"
import PageModal from "@/components/page-modal/PageModal.vue"
import searchConfig from "./config/search.config"
import contentConfig from "./config/content.config"
import modalConfig from "./config/modal.config"
import { nextTick, reactive, ref } from "vue"
import { useSystemStore } from "@/store/main/system/system"
import { formatUTC } from "@/utils/format"
import { useMainStore } from "@/store/main/main"
import { storeToRefs } from "pinia"
import type { ElTree } from "element-plus"
import usePageModal from "@/hooks/usePageModal"
import { mapMenuListToIds } from "@/utils/map-menu"
import usePageContent from "@/hooks/usePageContent"

const { modalRef, handleNewClick, handleEditClick } = usePageModal(
  newClick,
  editClick
)
const { contentRef, handleResetClick, handleQueryClick } = usePageContent()
interface IForm {
  labelWidth?: string
  searchConfig: any[]
}
const form = reactive<IForm>({ searchConfig })
interface IContent {
  pageN: string
  pageName: string
  contentList: any[]
}
const content = reactive<IContent>(contentConfig)
interface IModal {
  pageN: string
  pageName: string
  width: string
  modalList: any[]
}
const modal = reactive<IModal>(modalConfig)
const systemStore = useSystemStore()
// const modalRef = ref()
const mainStore = useMainStore()
const { menuTree } = storeToRefs(mainStore)
const menuData = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
// const contentRef = ref()

// data1指代的是当前选中的对象 data2对象包含了四个参数 分别是选中对象、选中对象id、半选中对象、半选中对象id
function handleCheckClick(data1: any, data2: any) {
  menuData.value = {
    menuList: [...data2.checkedKeys, ...data2.halfCheckedKeys]
  }
  // console.log(menuData.value)
}
// function handleResetClick() {
//   // systemStore.loadPageListAction(modal.pageN, { offset: 0, size: 10 })
//   contentRef.value.fetchResultList()
// }
// function handleQueryClick(searchForm: any) {
//   // const searchInfo = searchForm
//   // const queryInfo = { offset: 0, size: 10, ...searchInfo }
//   // systemStore.loadPageListAction(modal.pageN, queryInfo)
//   contentRef.value.fetchResultList(searchForm)
// }
// function handleNewClick() {
//   modalRef.value.setVisible()
// }
// function handleEditClick(itemData: any) {
//   modalRef.value.setVisible(false, itemData)
// }
function newClick() {
  // 将el-tree组件中的选项置为空 访问先前编辑界面残留回显(要注意 我们需要保证在dom更新之后才能够设置回显 否则回显会设置失败(因为先于dom更新设置) 我们可以通过nextTick保证)
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editClick(itemData: any) {
  // 将el-tree组件中的选项设定为当前记录的menuList集合对应的id集合
  nextTick(() => {
    // console.log(itemData)
    treeRef.value?.setCheckedKeys(mapMenuListToIds(itemData))
  })
}
</script>

<style scoped lang="less">
.role {
  border-radius: 8px;
  overflow: hidden;

  .top {
    padding: 20px;
    background-color: #fff;
  }

  .bottom {
    padding: 20px;
    background-color: #fff;
    margin-top: 20px;
  }
}
</style>
