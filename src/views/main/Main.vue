<template>
  <div class="main">
    <!-- 将main页面划分成三个板块 左、上、下 -->
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <main-side :is-collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @collapse-click="handleCollapseClick" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MainHeader from "@/components/main-header/MainHeader.vue"
import MainSide from "@/components/main-side/MainSide.vue"

const isCollapse = ref<boolean>(false)

function handleCollapseClick(isFold: boolean) {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
.main {
  background-color: #f0f2f5;
  /* 让el-container铺满整个视口 */
  > .el-container {
    height: 100vh;

    .el-aside {
      overflow: hidden;
      transition: width 0.3s ease;
    }

    .el-header {
      padding: 0 20px;
      background-color: #fff;
    }
  }
}
</style>
