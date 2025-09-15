<template>
  <div class="page-content">
    <div class="header">
      <div class="title">{{ prop.content.pageName }}列表</div>
      <el-button v-if="isCreate" type="primary" @click="handleNewClick">
        新建{{ prop.content.pageName }}
      </el-button>
    </div>
    <div class="content">
      <!-- 默认情况下 子组件会返还scope给父组件 而父组件需要通过scope.row来获取该数据 scope.row中包含的是里面的每一个字段 -->
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="prop.content.childrenProp"
      >
        <template v-for="item in prop.content.contentList" :key="item.prop">
          <template v-if="item.type === 'select'">
            <el-table-column
              align="center"
              type="selection"
              :width="item.width"
            />
          </template>
          <template v-if="item.type === 'index'">
            <el-table-column
              align="center"
              :width="item.width"
              type="index"
              :prop="item.prop"
              :label="item.label"
            />
          </template>
          <template v-if="item.type === 'normal'">
            <el-table-column
              align="center"
              :width="item.width"
              :prop="item.prop"
              :label="item.label"
            />
          </template>
          <template v-if="item.type === 'timer'">
            <el-table-column
              align="center"
              :prop="item.prop"
              :label="item.label"
            >
              <template #default="scope">
                <!-- name属性用于表示具名插槽的 而v-bind相当于解构后的scope对象 他会联合prop属性一起传递给父组件(你也可以理解成prop属性相当于是scope对象的一个属性) -->
                <slot :name="item.prop" v-bind="scope" :prop="item.prop">
                </slot>
              </template>
            </el-table-column>
          </template>
          <template v-if="item.type === 'handler'">
            <el-table-column
              align="center"
              :width="item.width"
              class="operations"
              :label="item.label"
            >
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  type="primary"
                  text
                  @click="handleEditClick(scope.row)"
                >
                  <el-icon><Edit /></el-icon>
                  <span>编辑</span>
                </el-button>
                <el-button
                  v-if="isDelete"
                  type="danger"
                  text
                  @click="handleDeleteClick(scope.row.id)"
                >
                  <el-icon><Delete /></el-icon>
                  <span>删除</span>
                </el-button>
              </template>
            </el-table-column>
          </template>
        </template>
        <!-- <el-table-column align="center" type="selection" width="50px" />
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
          label="部门名称"
        />
        <el-table-column
          align="center"
          width="120px"
          prop="leader"
          label="部门领导"
        />
        <el-table-column
          align="center"
          width="150px"
          prop="parentId"
          label="上级部门"
        />
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
        </el-table-column> -->
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
import usePermissions from "@/hooks/usePermissions"
import { useSystemStore } from "@/store/main/system/system"
import { storeToRefs } from "pinia"
import { ref } from "vue"

const systemStore = useSystemStore()
interface IContent {
  content: {
    pageN: string
    pageName: string
    contentList: any[]
    childrenProp?: any
  }
}
const prop = defineProps<IContent>()

// 获取当前用户的按钮权限
const isCreate = usePermissions(`${prop.content.pageN}:create`)
const isDelete = usePermissions(`${prop.content.pageN}:delete`)
const isUpdate = usePermissions(`${prop.content.pageN}:update`)
const isQuery = usePermissions(`${prop.content.pageN}:query`)

const { pageTotalCount, pageList } = storeToRefs(systemStore)
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(pageTotalCount)
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
  // 如果当前用户缺乏查询权限的话 那么就不需要填充结果列表了
  if (!isQuery) return

  const pageInfo = {
    offset: (currentPage.value - 1) * pageSize.value,
    size: pageSize.value
  }

  const queryInfo = { ...pageInfo, ...condition }

  systemStore.loadPageListAction(prop.content.pageN, queryInfo)
}
function handleNewClick() {
  emit("newClick")
}
function handleEditClick(itemData: any) {
  emit("editClick", itemData)
}
function handleDeleteClick(id: number) {
  systemStore.deletePageAction(prop.content.pageN, id)
}
defineExpose({
  fetchResultList
})
</script>

<style scoped lang="less">
.page-content {
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
