<template>
  <div class="main-side">
    <div class="header">
      <img class="logo" src="@/assets/img/logo.svg" alt="" />
      <span class="title" v-show="!isCollapse">后台管理系统</span>
    </div>
    <el-menu
      background-color="#001529"
      text-color="#b7bdc3"
      :collapse="isCollapse"
      active-text-color="#fff"
      :default-active="defaultActive"
    >
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="String(item.id)">
          <template #title>
            <el-icon>
              <!-- 在自动导入的条件下无法进行动态组件的生成 这是因为组件的自动导入并不会将组件添加到注册表中 而动态组件的生成又需要从注册表中查找相应的元素 因此我们只能够通过全局注册的方式为动态组件生成提供组件 -->
              <component :is="item.icon.split('-icon-')[1]" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item
              :index="String(subitem.id)"
              @click="handleItemClick(subitem)"
            >
              <template #title>{{ subitem.name }}</template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import router from "@/router"
import { localCache } from "@/utils/cache"
import { mapPathToMenu } from "@/utils/map-menu"
import { computed } from "vue"
import { useRoute } from "vue-router"

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const userMenus = localCache.getItem("userMenus")
const route = useRoute()
const defaultActive = computed(() => {
  return mapPathToMenu(route.path, userMenus).id + ""
})

function handleItemClick(subitem: any) {
  if (subitem.url) {
    router.push(subitem.url)
  }
}
</script>

<style scoped lang="less">
.main-side {
  background-color: #001529;
  height: 100%;
  > .header {
    height: 28px;
    padding: 12px 10px 8px;
    color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
    overflow: hidden;

    > .logo {
      height: 100%;
      margin: 0 10px;
    }

    > .title {
      font-size: 16px;
      /* 这样可以解决侧边栏展开时标题变形的问题(从多行变成一行) */
      white-space: nowrap;
    }
  }
  .el-menu {
    border-right: none;

    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135;
    }

    .el-menu-item:hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
