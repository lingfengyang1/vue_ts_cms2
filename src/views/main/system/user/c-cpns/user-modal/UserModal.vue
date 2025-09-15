<template>
  <div class="user-modal">
    <el-dialog
      v-model="visibleRef"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      align-center
      width="33.3%"
      center
    >
      <el-form :model="itemDataRef" label-width="80px" size="large">
        <el-form-item label="用户名">
          <el-input v-model="itemDataRef.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input
            v-model="itemDataRef.realname"
            placeholder="请输入真实姓名"
          />
        </el-form-item>
        <el-form-item label="密码" v-show="isNewRef">
          <el-input v-model="itemDataRef.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="itemDataRef.cellphone"
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <el-form-item label="选择角色">
          <el-select v-model="itemDataRef.roleId">
            <template v-for="item in roles" :key="item.id">
              <el-option :value="item.id" :label="item.name" />
            </template>
          </el-select>
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
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: ""
})
const isNewRef = ref()
const currentDataRef = ref()
const systemStore = useSystemStore()
const mainStore = useMainStore()
const { roles, departments } = storeToRefs(mainStore)
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
