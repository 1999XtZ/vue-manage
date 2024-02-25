<template>
  <div class="login-container">
    <!-- <el-form> 组件的 model 属性并不是指的是 Vue.js 中的 v-model 指令，而是用于绑定表单的数据模型。通过 model 属性，可以将组件内部的表单数据与外部的数据模型进行绑定，实现数据的双向绑定。这种方式和 Vue.js 中的 v-model 指令有所不同，但实现了相似的功能 -->
    <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <!-- 使用切换语言的组件 -->
        <ChangeLanguage class="change-language" effect="light"></ChangeLanguage>
      </div>
      <!-- 表单域 -->
      <el-form-item class="el-form-item" prop="username">
        <!-- prop 属性用于指定表单域绑定的数据模型字段，在验证规则中会使用这个字段名来匹配对应的规则 -->
        <!-- username -->
        <span class="svg-container">
          <!-- 用户图标 -->
          <!-- <el-icon>
            <avatar />
          </el-icon>-->
          <span class="svg-container">
            <!-- <svg-icon icon="https://res.lgdsunday.club/user.svg" color="#fff"></svg-icon> -->
            <svg-icon icon="user" color="#fff"></svg-icon>
          </span>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
          class="el-input"
        ></el-input>
      </el-form-item>

      <!-- 表单域 -->
      <el-form-item class="el-form-item" prop="password">
        <!-- password -->
        <span class="svg-container">
          <!-- 密码图标 -->
          <span class="svg-container">
            <svg-icon icon="password" color="#fff"></svg-icon>
          </span>
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="password"
          name="password"
        ></el-input>
        <!-- 密码是否可见 -->
        <span class="show-password" @click="onChangePwdType">
          <span class="svg-container">
            <svg-icon :icon="passwordType==='password'?'eye':'eye-open'"></svg-icon>
          </span>
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width:100%; margin-bottom:30px;"
        @click="handlerLogin"
        :loading="loading"
      >{{ $t('msg.login.loginBtn') }}</el-button>

      <!-- 展示一些信息 -->
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
// 在登录页面导入 切换语言 的组件
import ChangeLanguage from '@/components/ChangeLanguage/index.vue'
import { useStore } from 'vuex'
// 导入 el-icon 图标 (在组合式API中，导入的组件可以直接使用，不必注册)
// import { Unlock,View } from '@element-plus/icons-vue'
// 导入 svg 图标 （已经全局注册该组件了，因此不需要这个导入了!!）
// import SvgIcon from '@/components/SvgIcon/index.vue'
// import { ELInput } from 'element-plus'
// 导入密码验证规则
import { validatePassword } from './rules'
import { ref } from 'vue'
// import i18n from '@/i18n'
// import i18n from 'vue-i18n'

// 数据源（数据模型）
const loginForm=ref({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
const loginRules=ref({
  username: [{
    required: true,
    trigger: 'blur'
    // meaasge: i18n.t('msg.login.usernameRule')
  }],
  password: [{
    required: true,
    trigger: 'blur',
    validator: validatePassword()
  }]
})
// 处理密码框是否明文显示，为password类型则密文显示，为text类型则明文显示
const passwordType=ref('password')

// 点击修改密码框是否明文显示的事件(template中绑定的方法，直接声明即可)
const onChangePwdType=() => {
  // 使用ref声明的数据，在script中使用时，需要加value来获取具体的值；但是在template中使用时，不需要加value
  if(passwordType.value==='password') {
    passwordType.value='text'
  } else {
    passwordType.value='password'
  }
}

// 处理登录 —— 点击"登录"后的事情
const loading=ref(false)
// 拿到store实例对象(vuex)
const store=useStore()
// 拿到el-form表单的内容 —— 当给ref指定空值时，loginFormRef就会自动去template里寻找，有没有一个ref被赋值为loginFormRef
const loginFormRef=ref(null)
const handlerLogin=() => {
  // 1. 进行表单校验 —— 所有的ref的真实值都需要通过 .value 获取
  // console.log("loginFormRef.value:",loginFormRef.value)
  loginFormRef.value.validate((valid) => {
    // 如果未通过表单校验
    if(!valid) return
  })
  // 2. 派发actions(触发登录动作)
  // 如果通过表单校验，先让圈圈转起来
  loading.value=true
  // 再触发userInfo模块下的reqLogin方法，并将表单信息传递过去。由于派发完actions会得到一个promise实例，因此可以直接用then方法读取网络请求返回的成功的数据，以及catch方法获取网络请求失败后的结果
  store.dispatch('userInfo/reqLogin',loginForm.value).then(() => {
    loading.value=false
    // 3. (如果请求成功，则)进行登录后处理
  }).catch((err) => {
    console.log(err)
    loading.value=false
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b; // "背景颜色"变量
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .el-form-item {
      // 深度选择器，选中组件里面的子组件(vue3已经禁用深度选择器了)
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }

    .el-input input {
      background: transparent;
      border: 0px;
      // -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $bg;
      height: 47px;
      // line-height: 47px;
      caret-color: $cursor;
      // margin: 7px 0;
    }

    .tips {
      font-size: 16px;
      color: white;
      line-height: 20px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-password {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .change-language {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
