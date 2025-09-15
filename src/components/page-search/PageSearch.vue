<template>
  <div class="page-search">
    <el-form
      :label-width="prop.form.labelWidth ?? '80px'"
      :model="searchForm"
      size="large"
      ref="formRef"
    >
      <el-row :gutter="20">
        <!-- <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的部门名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input
              v-model="searchForm.leader"
              placeholder="请输入查询的领导名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col> -->
        <template v-for="item in prop.form.searchConfig" :key="item.prop">
          <el-col :span="8">
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :placeholder="item.placeholder">
                <el-input
                  :placeholder="item.placeholder"
                  v-model="searchForm[item.prop]"
                />
              </el-form-item>
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-form-item :label="item.label" :placeholder="item.placeholder">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </template>
            <template v-if="item.type === 'select'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </el-form-item>
            </template>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <a class="reset btn" href="" @click="handleResetClick">
        <el-icon><Refresh /></el-icon>
        <span class="text">重置</span>
      </a>
      <a href="" class="query btn" @click="handleQueryClick">
        <el-icon><Search /></el-icon>
        <span class="text">查询</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from "element-plus"
import { reactive, ref } from "vue"

const searchForm = reactive<any>({})
const formRef = ref<InstanceType<typeof ElForm>>()
const emit = defineEmits(["resetClick", "queryClick"])
interface IForm {
  form: {
    labelWidth?: string
    searchConfig: any[]
  }
}
const prop = defineProps<IForm>()
prop.form.searchConfig.forEach((item) => {
  searchForm[item.prop] = ""
})

function handleResetClick(e: Event) {
  // a元素默认会跳转 从而会被路由导航守卫监听到并转发到第一个符合条件的二级菜单处 因此我们需要禁止跳转行为
  e.preventDefault()
  formRef.value?.resetFields()
  emit("resetClick")
}
function handleQueryClick(e: Event) {
  // 阻止a元素的默认跳转
  e.preventDefault()
  emit("queryClick", searchForm)
}
</script>

<style scoped lang="less">
.page-search {
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    padding: 0 50px 10px 0;
    .btn {
      padding: 8px 15px;
      display: flex;
      align-items: center;
      border-radius: 4px;
      border: 1px solid #dcdfe6;

      .text {
        margin-left: 6px;
      }

      &.query {
        margin-left: 12px;
        background-color: #409eff;
        color: #fff;
      }

      &.reset:hover {
        color: #409eff;
        background-color: #c6e2ff;
      }

      &.query:hover {
        background-color: #79bbff;
      }
    }
  }
}
</style>
