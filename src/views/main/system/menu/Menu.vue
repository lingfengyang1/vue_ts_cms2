<template>
  <div class="menu">
    <page-content
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
      :content="contentConfig"
    >
      <template #createAt="scope">
        -{{ formatUTC(scope.row[scope.prop]) }}-
      </template>
      <template #updateAt="scope">
        ~{{ formatUTC(scope.row[scope.prop]) }}~
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts" name="menu">
import { formatUTC } from "@/utils/format"
import contentConfig from "./config/content.config"
import PageContent from "@/components/page-content/PageContent.vue"

function handleNewClick() {}
function handleEditClick() {}
</script>

<style scoped>
.menu {
}
</style>
