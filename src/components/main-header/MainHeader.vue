<template>
  <div class="main-header">
    <div class="left">
      <el-icon size="28px" @click="handleCollapseClick">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
      <div class="crumb">
        <el-breadcrumb separator-icon="CaretRight">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
          <template v-for="crumb in crumbs" :key="crumb.name">
            <el-breadcrumb-item :to="crumb.path">
              {{ crumb.name }}
            </el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
    </div>
    <div class="right">
      <div class="controls">
        <el-icon size="20px"><i-ep-message /></el-icon>
        <el-icon size="20px"><i-ep-chat-dot-round /></el-icon>
        <el-icon size="20px"><i-ep-search /></el-icon>
      </div>
      <el-dropdown size="large">
        <span class="el-dropdown-link info">
          <el-avatar
            :size="30"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <span class="title">coderwhy</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><i-ep-circle-close /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><i-ep-info-filled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><i-ep-unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router"
import { localCache } from "@/utils/cache"
import { mapPathToCrumb } from "@/utils/map-menu"
import { ArrowRight } from "@element-plus/icons-vue"
import { computed, ref } from "vue"
import { useRoute } from "vue-router"

const emit = defineEmits(["collapseClick"])
// 默认没有折叠
const isFold = ref<boolean>(false)

const route = useRoute()
const userMenus = localCache.getItem("userMenus")
const crumbs = computed(() => {
  return mapPathToCrumb(route.path, userMenus)
})

function handleCollapseClick() {
  // console.log("点击了折叠按钮")
  isFold.value = !isFold.value
  emit("collapseClick", isFold.value)
}
function handleExitClick() {
  // console.log("点击了退出按钮")
  // 退出最主要的是需要销毁登录凭证 置于用户名/密码/记住密码这三个状态 如果你想要使用记住密码功能的话 那么这三个状态不用销毁 而userInfo/userMenus这两个状态也没有必要销毁 后续如果重新成功登录会被覆盖的
  localCache.removeItem("token")
  // 跳转到登录页面
  router.push("/login")
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  > .left {
    display: flex;
    align-items: center;
    > .title {
      padding-left: 18px;
    }

    > .crumb {
      padding-left: 18px;
    }
  }

  > .right {
    display: flex;
    align-items: center;

    > .controls {
      margin-right: 20px;
      > .el-icon {
        width: 40px;
        height: 35px;
      }
    }

    .info {
      display: flex;
      align-items: center;
      cursor: pointer;
      outline: none;
      .title {
        margin-left: 5px;
      }

      // 该类元素会被挂载到#app元素之外 因此我们需要通过:global去访问该类属性才行
      :global(.el-dropdown-menu__item) {
        /* !import的作用在于强制覆盖原有值 */
        line-height: 50px !important;
      }
    }
  }
}
</style>
