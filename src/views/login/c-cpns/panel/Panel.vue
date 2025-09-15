<template>
  <div class="panel">
    <el-tabs
      type="border-card"
      stretch
      v-model="activeName"
      @tab-change="tabChange"
    >
      <el-tab-pane name="account">
        <!-- 通过具名插槽来实现带有图标的标题 -->
        <template #label>
          <span class="title">
            <el-icon class="icon"><i-ep-user-filled /></el-icon>
            <span class="name">帐号登录</span>
          </span>
        </template>
        <panel-account ref="panelAccountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="title">
            <el-icon class="icon"><i-ep-cellphone /></el-icon>
            <span class="name">手机登录</span>
          </span>
        </template>
        <panel-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="options">
      <!-- 二者绝对不是互斥关系 而是多选关系 -->
      <el-checkbox v-model="isRememberPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 尽量保证panel和btn在同一个组件中 因为这样方便共享激活tab或者tab子组件暴露的函数 -->
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="loginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import PanelAccount from "./c-cpns/panel-account/PanelAccount.vue"
import PanelPhone from "./c-cpns/panel-phone/PanelPhone.vue"
import { localCache } from "@/utils/cache"

const activeName = ref<string>("account")
const panelAccountRef = ref<InstanceType<typeof PanelAccount>>()
const IS_REM_PWD = "isRemPwd"
const isRememberPassword = ref<boolean>(localCache.getItem(IS_REM_PWD) ?? false)

// 监听记住密码的勾选与否在storage中保存其状态(下次返回该页面时需要延续上一次的状态)
watch(isRememberPassword, (newValue) => {
  // console.log(newValue, isRememberPassword)
  localCache.setItem(IS_REM_PWD, newValue)
})

const emit = defineEmits(["tabChange"])

function tabChange() {
  // console.log("tab页面切换了")
  // 监听tab/activeName的改变从而将最新的activeName发送给父组件
  emit("tabChange", activeName.value)
}

function loginBtnClick() {
  if (activeName.value === "account") {
    // console.log("account界面")
    panelAccountRef.value?.accountLogin(isRememberPassword.value)
  } else {
    console.log("phone界面")
  }
}
</script>

<style scoped lang="less">
.title {
  > .icon {
    position: relative;
    top: 2px;
  }

  > .name {
    margin-left: 5px;
  }
}

.options {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-btn {
  width: 100%;
}
</style>
