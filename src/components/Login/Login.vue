<script setup>
import {ElButton, ElCol, ElContainer, ElInput, ElMain, ElRow, ElMessage} from 'element-plus'
import {Unlock, User} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import {loginPhone} from '/src/api';
import {store} from "../../store";
import {reactive} from "vue";

const userStore = store()
const router = useRouter()
const input = reactive({
  phone: '',
  password: ''
})

//登录
const login = async (phone, password) => {
  if(phone.length !== 11) {
    ElMessage.error('请输入正确的手机号')
    return
  }
  if (password.length < 6) {
    ElMessage.error('密码长度不能小于6位')
    return
  }
  if(!phone || !password) {
    ElMessage.error('请输入手机号和密码')
    return
  }

  const res = await loginPhone(phone, encodeURIComponent(password))
  if (res.code === 200) {
    userStore.userInfo = res.profile
    ElMessage({
      message: '欢迎你：' + res.profile.nickname,
      type: 'success',
    })
    await router.replace('/')
  } else {
    ElMessage({
      message: '登录失败' + res.msg,
      type: 'error',
    })
  }
}

</script>

<template>
  <el-container class="block">
    <el-main class="flex flex-col w-11/12 mx-auto">
      <el-row>
        <el-col class="text-center loginTitle">
          <span class="text-lg sm:text-xl ">后台系统管理-欢迎登录</span>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="20">
          <el-input
              v-model.trim="input.phone"
              placeholder="请输入手机号码"
              :prefix-icon="User"
              :autofocus="true"
              :maxlength="11"
              :show-word-limit="true"
              autofocus
              class="text-base login-input"
          />
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="20">
          <el-input
              v-model.trim="input.password"
              placeholder="请输入密码"
              :prefix-icon="Unlock"
              :show-password="true"
              :minlength="6"
              :maxlength="16"

              class="text-base login-input"
          />
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="20">
          <el-button type="primary" class="w-full h-10 bg-[#409EFF]" @click="login(input.phone,input.password)">登录
          </el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>

.el-container {
  width: 100%;
  height: 100vh;
  background-color: #F6F4F5;
}

.el-main {
  background-color: #fff;
  position: relative;
  top: 50%;
  transform: translate(0%, -50%);
  border-radius: 10px;
  box-shadow: 0px 0px 13px 2px #dedede;
  padding: 30px;
}

.loginTitle {
  color: #666565;
}

.el-row {
  margin-bottom: 30px;
}

.input .el-input__inner {
  height: 45px;
  line-height: 45px;
  font-size: 16px;
}
</style>
