<template>
  <div class="User">
    <div class="top">
      <user-search
        @reset-click="handleResetClick"
        @query-click="handleQueryClick"
      />
    </div>
    <div class="bottom">
      <user-content
        ref="contentRef"
        @new-click="handleNewClick"
        @edit-click="handleEditClick"
      />
      <user-modal ref="modalRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserSearch from "./c-cpns/user-search/UserSearch.vue"
import UserContent from "./c-cpns/user-content/UserContent.vue"
import UserModal from "./c-cpns/user-modal/UserModal.vue"
import { ref } from "vue"

const contentRef = ref()
const modalRef = ref()

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
.User {
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
