<template>
  <div class="user-search">
    <el-form label-width="80px" :model="searchForm" size="large" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="searchForm.realname"
              placeholder="请输入查询的真实姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchForm.phone"
              placeholder="请输入查询的手机号码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchForm.enable"
              placeholder="请选择查询的状态"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
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
        </el-col>
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

const searchForm = reactive<any>({
  name: "",
  realname: "",
  cellphone: "",
  enable: "",
  createAt: ""
})
const formRef = ref<InstanceType<typeof ElForm>>()
const emit = defineEmits(["resetClick", "queryClick"])

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
.user-search {
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
