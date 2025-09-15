<template>
  <div class="user-content">
    <div class="header">
      <div class="title">用户列表</div>
      <el-button type="primary" @click="handleNewClick">新建用户</el-button>
    </div>
    <div class="content">
      <!-- 默认情况下 子组件会返还scope给父组件 而父组件需要通过scope.row来获取该数据 scope.row中包含的是里面的每一个字段 -->
      <el-table :data="list" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          width="60px"
          type="index"
          prop="id"
          label="序号"
        />
        <el-table-column
          align="center"
          width="120px"
          prop="name"
          label="用户名"
        />
        <el-table-column
          align="center"
          width="120px"
          prop="realname"
          label="真实姓名"
        />
        <el-table-column
          align="center"
          width="150px"
          prop="cellphone"
          label="手机号码"
        />
        <el-table-column align="center" width="80px" prop="enable" label="状态">
          <!-- 普通插槽就是由子组件决定插入位置、父组件决定插入内容 而作用域插槽顾名思义就是子组件暴露给父组件的数据只能用于父组件的插入内容中 -->
          <template #default="scope">
            <el-button type="primary" size="small" plain>
              {{ scope.row.enable ? "启用" : "禁用" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="210px"
          class="operations"
          label="操作"
        >
          <template #default="scope">
            <el-button type="primary" text @click="handleEditClick(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button
              type="danger"
              text
              @click="handleDeleteClick(scope.row.id)"
            >
              <el-icon><Delete /></el-icon>
              <span>删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <!-- layout控制的是分页器中各个部分的相对顺序 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from "@/store/main/system/system"
import { formatUTC } from "@/utils/format"
import { storeToRefs } from "pinia"
import { ref } from "vue"

const systemStore = useSystemStore()

const { totalCount, list } = storeToRefs(systemStore)
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(totalCount)
// 这个首次加载结果列表时需要保证在ref初始化完毕后进行才行
// systemStore.loadUserListAction()
fetchResultList()

const emit = defineEmits(["newClick", "editClick"])

function handleSizeChange() {
  // console.log("每页记录数发生了改变")
  fetchResultList()
}
function handleCurrentChange() {
  // console.log("当前页码发生了改变")
  fetchResultList()
}
// 封装方法用于通过某些条件来获取结果列表
function fetchResultList(condition: any = {}) {
  const pageInfo = {
    offset: (currentPage.value - 1) * pageSize.value,
    size: pageSize.value
  }

  const queryInfo = { ...pageInfo, ...condition }

  systemStore.loadUserListAction(queryInfo)
}
function handleNewClick() {
  emit("newClick")
}
function handleEditClick(itemData: any) {
  emit("editClick", itemData)
}
function handleDeleteClick(id: number) {
  systemStore.deleteUserAction(id)
}
defineExpose({
  fetchResultList
})
</script>

<style scoped lang="less">
.user-content {
  .header {
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    .el-pagination {
      margin-top: 10px;

      // scoped会为其内部的样式添加属性选择器 然后将样式中的选择器编译成类似于类选择器[属性选择器]的形式 这样匹配时就能够匹配成功 但是对于第三方组件来说 scoped仅仅只会对其根元素添加属性选择器 却不会对里面的后代元素添加属性选择器 但是编译后无论是根元素还是后代元素其都会被编译成带有属性选择器的样式
      :deep(.el-select__wrapper) {
        text-align: center !important;
      }
    }
  }
}
</style>
