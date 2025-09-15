<template>
  <div class="page-modal">
    <el-dialog
      v-model="visibleRef"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      align-center
      width="33.3%"
      center
    >
      <el-form :model="itemDataRef" label-width="80px" size="large">
        <el-form-item label="部门名称">
          <el-input v-model="itemDataRef.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门领导">
          <el-input v-model="itemDataRef.leader" placeholder="请输入部门领导" />
        </el-form-item>
        <el-form-item label="选择部门">
          <el-select v-model="itemDataRef.departmentId">
            <template v-for="item in departments" :key="item.id">
              <el-option :value="item.id" :label="item.name" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="btns">
          <el-button type="default" @click="handleCancelClick">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/store/main/main"
import { useSystemStore } from "@/store/main/system/system"
import { storeToRefs } from "pinia"
import { reactive, ref } from "vue"

const visibleRef = ref(false)
const itemDataRef = reactive<any>({
  name: "",
  leader: "",
  departmentId: ""
})
const isNewRef = ref()
const currentDataRef = ref()
const systemStore = useSystemStore()
const mainStore = useMainStore()
const { departments } = storeToRefs(mainStore)
function setVisible(isNew: boolean = true, itemData?: any) {
  visibleRef.value = true
  isNewRef.value = isNew

  // 编辑状态下 回显当前记录的数据
  if (!isNew && itemData) {
    for (const key in itemDataRef) {
      itemDataRef[key] = itemData[key]
    }
    // 编辑状态下 我们需要保存一下当前所编辑的那条记录
    currentDataRef.value = itemData
  } else {
    // 新建状态下 需要清空之前的回显数据
    for (const key in itemDataRef) {
      itemDataRef[key] = null
    }
  }
}
function handleCancelClick() {
  visibleRef.value = false
}
function handleConfirmClick() {
  visibleRef.value = false
  if (isNewRef.value) {
    systemStore.newUserAction(itemDataRef)
  } else {
    systemStore.editUserAction(currentDataRef.value.id, itemDataRef)
  }
}
defineExpose({
  setVisible
})
</script>

<style scoped lang="less">
.user-modal {
  .el-form {
    padding: 20px;
  }
}
</style>
