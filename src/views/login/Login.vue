<template>
  <div class="login">
    <!-- 自动导入--前提是按需导入、有效减少了打包体积 并且无需我们手动编写导入语句 他会自动为我们于components.d.ts/auto-imports.d.ts来呈现导入语句 -->
    <!-- <el-badge :value="100" :max="10" class="item">
      <el-button>replies</el-button>
    </el-badge> -->
    <div class="login-panel">
      <h1 class="title">后台管理系统</h1>
      <panel />
    </div>
  </div>
</template>

<script setup lang="ts">
import Panel from "./c-cpns/panel/Panel.vue"
</script>

<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background-color: pink;

  > .login-panel {
    /* 通过块级元素设置外边距来达到水平居中的效果 */
    width: 330px;
    margin: 0 auto;
    /* 通过相对定位+水平位移来达到垂直居中的效果 */
    position: relative;
    top: 50%;
    transform: translateY(-50%);

    > .title {
      font-size: 32px;
      margin-bottom: 15px;
      text-align: center;
    }
  }
}
</style>
