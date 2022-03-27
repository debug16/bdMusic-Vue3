<script setup>
import {ElButton, ElCol, ElContainer, ElInput, ElMain, ElRow} from 'element-plus'
import {Unlock, User} from '@element-plus/icons-vue'
import {reactive} from "vue";

const input = reactive({
  user: '',
  password: ''
})

</script>

<template>
  <el-container class="block">
    <el-main class="flex flex-col 2xl:w-3/12 lg:w-4/12 sm:w-7/12 mx-auto">
      <el-row>
        <el-col class="text-center loginTitle">
          <span class="text-lg sm:text-xl ">后台系统管理-欢迎登录</span>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="20">
          <el-input
              v-model="input.user"
              placeholder="请输入用户名"
              :prefix-icon="User"
              :autofocus="true"
              class="text-base login-input"
          />
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="20">
          <el-input
              v-model="input.password"
              placeholder="请输入密码"
              :prefix-icon="Unlock"
              :show-password="true"
              class="text-base login-input"
          />
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="20">
          <el-button type="primary" class="w-full h-10 bg-[#409EFF]">登录</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>

.el-container {
  width: 100vw;
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
