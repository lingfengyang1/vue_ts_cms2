<script setup lang="ts">
import { ElConfigProvider } from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"
</script>

<template>
  <!-- 让默认的英语修改成中文界面(比如我们的日期选项卡以及我们的底部分页器) 嗨嗨嗨 你他妈 我他妈 -->
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
