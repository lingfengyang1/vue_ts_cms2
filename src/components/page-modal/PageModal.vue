<template>
  <div class="page-modal">
    <el-dialog
      v-model="visibleRef"
      :title="
        isNewRef ? `新建${prop.modal.pageName}` : `编辑${prop.modal.pageName}`
      "
      align-center
      width="33.3%"
      center
    >
      <el-form :model="itemDataRef" label-width="80px" size="large">
        <template v-for="item in prop.modal.modalList" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'normal'">
              <el-input
                v-model="itemDataRef[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                v-model="itemDataRef[item.prop]"
                :placeholder="item.placeholder"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option :value="option.value" :label="option.label" />
                </template>
              </el-select>
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.prop"></slot>
            </template>
          </el-form-item>
        </template>
        <!-- <el-form-item label="部门名称">
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
        </el-form-item> -->
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
import { useSystemStore } from "@/store/main/system/system"
import { reactive, ref } from "vue"

interface IModal {
  modal: {
    pageN: string
    pageName: string
    width: string
    modalList: any[]
  }
  menuData: any
}
const prop = defineProps<IModal>()
const visibleRef = ref(false)
const itemDataRef = reactive<any>({})
prop.modal.modalList.forEach((item) => {
  itemDataRef[item.prop] = ""
})
const isNewRef = ref()
const currentDataRef = ref()
const systemStore = useSystemStore()
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
  if (prop.menuData) {
    itemDataRef.value = { ...itemDataRef, ...prop.menuData }
  }

  if (isNewRef.value) {
    systemStore.newPageAction(prop.modal.pageN, itemDataRef.value)
  } else {
    systemStore.editPageAction(
      prop.modal.pageN,
      currentDataRef.value.id,
      itemDataRef.value
    )
  }
}
defineExpose({
  setVisible
})
</script>

<style scoped lang="less">
.page-modal {
  .el-form {
    padding: 20px;
  }
}
</style>
