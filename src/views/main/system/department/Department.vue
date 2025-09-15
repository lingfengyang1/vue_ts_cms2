<template>
  <div class="Department">
    <div class="top">
      <page-search
        @reset-click="handleResetClick"
        @query-click="handleQueryClick"
        :form="form"
      />
    </div>
    <div class="bottom">
      <page-content
        ref="contentRef"
        @new-click="handleNewClick"
        @edit-click="handleEditClick"
        :content="content"
      >
        <template #updateAt="scope">
          {{ formatUTC(scope.row[scope.prop]) }}
        </template>
        <template #createAt="scope">
          {{ formatUTC(scope.row[scope.prop]) }}
        </template>
      </page-content>
      <page-modal :modal="modal" ref="modalRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import PageSearch from "@/components/page-search/PageSearch.vue"
import PageContent from "@/components/page-content/PageContent.vue"
import PageModal from "@/components/page-modal/PageModal.vue"
import searchConfig from "./config/search.config"
import contentConfig from "./config/content.config"
import modalConfig from "./config/modal.config"
import { formatUTC } from "@/utils/format"
import { useMainStore } from "@/store/main/main"

const contentRef = ref()
const modalRef = ref()
const form = reactive({
  labelWidth: "80px",
  searchConfig
})
const content = reactive(contentConfig)
// const modal = reactive(modalConfig)
// 由于department模块的content部分要求具备部门选项 因此在contentConfig的基础上进行部门选项的填充
const modal = computed(() => {
  // 请求部门数据
  const mainStore = useMainStore()
  const departments = mainStore.departments.map((item) => ({
    label: item.name,
    value: item.id
  }))
  modalConfig.modalList.forEach((item) => {
    if (item.prop === "parentId") item.options.push(...departments)
  })
  return modalConfig
})

function handleResetClick() {
  contentRef.value.fetchResultList()
}
function handleQueryClick(formData: any) {
  contentRef.value.fetchResultList(formData)
}
function handleNewClick() {
  modalRef.value.setVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value.setVisible(false, itemData)
}
</script>

<style scoped lang="less">
.Department {
  border-radius: 8px;
  overflow: hidden;

  > .top {
    background-color: #fff;
    padding: 20px;
  }

  > .bottom {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
  }
}
</style>
