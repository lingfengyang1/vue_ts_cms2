<template>
  <div class="panel-account">
    <el-form
      label-width="60px"
      status-icon
      :rules="rules"
      size="large"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from "@/store/login/login"
import type { IAccount } from "@/types/login"
import { localCache } from "@/utils/cache"
import type { ElForm, FormRules } from "element-plus"
import { reactive, ref } from "vue"

const loginStore = useLoginStore()
const formRef = ref<InstanceType<typeof ElForm>>()
const NAME = "name"
const PASSWORD = "password"

const account = reactive<IAccount>({
  name: localCache.getItem(NAME) ?? "",
  password: localCache.getItem(PASSWORD) ?? ""
})

function accountLogin(isRememberPassword: boolean) {
  // 待到校验成功后才进行登录
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password

      // console.log("校验成功")
      loginStore.accountLoginAction(account).then((res) => {
        // 当数据库中存在这样的用户后 我们才能够在记住密码的条件下将该用户保存到storage中
        if (isRememberPassword) {
          localCache.setItem(NAME, name)
          localCache.setItem(PASSWORD, password)
        } else {
          // 如果没有勾选记住密码 切记要将其从storage中删除 如果不删除的话 那么实现的依然是勾选了记住密码的效果
          localCache.removeItem(NAME)
          localCache.removeItem(PASSWORD)
        }
      })
    } else {
      console.log("校验失败，请重新校验")
    }
  })
}

const rules: FormRules = {
  // 规则中 是通过每一个form-item的prop属性来定位到每一个form-item的
  name: [
    {
      // 要求非空
      required: true,
      // 违反规则的提示信息
      message: "该字段必须非空",
      // 触发校验规则的时机
      trigger: "blur"
    },
    {
      // 要求输入值必须为6-20的数字或者字母
      pattern: /^[0-9a-zA-Z]{6,20}$/,
      message: "该字段必须为6-20位的数字或字母",
      trigger: "blur"
    }
  ],
  password: [
    {
      // 要求非空
      required: true,
      // 违反规则的提示信息
      message: "该字段必须非空",
      // 触发校验规则的时机
      trigger: "blur"
    },
    {
      // 要求输入值必须为6-20的数字或者字母
      pattern: /^[0-9a-zA-Z]{6,20}$/,
      message: "该字段必须为6-20位的数字或字母",
      trigger: "blur"
    }
  ]
}

defineExpose({
  accountLogin
})
</script>

<style scoped>
.panel-account {
  padding: 15px;
}
</style>
