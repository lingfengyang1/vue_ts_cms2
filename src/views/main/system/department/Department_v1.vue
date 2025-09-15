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
      />
      <page-modal ref="modalRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import PageSearch from "./c-cpns/page-search/PageSearch.vue"
import PageContent from "./c-cpns/page-content/PageContent.vue"
import PageModal from "./c-cpns/page-modal/PageModal.vue"
import searchConfig from "./config/search.config"

const contentRef = ref()
const modalRef = ref()
const form = reactive({
  labelWidth: "80px",
  searchConfig
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
