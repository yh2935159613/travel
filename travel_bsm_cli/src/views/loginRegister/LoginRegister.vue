<template>
  <div class="container">
    <img class="Img" ref="img" src="../../assets/loginRegister.png" alt />

    <div class="content">
      <!-- 2 注册界面 -->
      <div ref="register" class="register">
        <h2>用户注册</h2>
        <el-form width="100px">
          <el-form-item label="账号">
            <el-input v-model="this.userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="this.userInfo.password"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="this.userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="this.userInfo.age"></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="this.userInfo.sex" size="medium">
              <el-radio border label="0">男</el-radio>
              <el-radio border label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="格言">
            <el-input v-model="this.userInfo.motto"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button type="primary" @click="toLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 1 登录界面 -->
      <div ref="login" class="login">
        <h2>用户登录</h2>
        <el-form width="120px">
          <el-form-item label="账号">
            <el-input v-model="this.userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="this.userInfo.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="primary" @click="toRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
import requset from "../../utils/request";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
        age: "",
        sex: "",
        photo: "",
        name: "",
        motto: "",
      },
      status: 1,
    };
  },
  methods: {
    //登录
    login() {
      requset
        .request({
          method: "post",
          url: "/api/user/login",
          data: this.userInfo,
        })
        .then((res) => {
          if (res.data.code == "200") {
            // console.log(res);
            const accessToken = res.data.data.accessToken;
            const user = res.data.data.user;
            //在登陆的时候设置默认图片
            user.photo = "http://r00wno5g0.hn-bkt.clouddn.com/photo.jpg";
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", accessToken);
            this.$router.push("/getAlluser");
            ElMessage({
              message: "欢迎进入旅游App后台管理系统",
              type: "success",
            });
          } else {
            ElMessage.error({ message: res.data.data, type: "error" });
          }
        });
    },

    // 注册
    register() {
      requset
        .request({
          method: "post",
          url: "/api/user/register",
          data: this.userInfo,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.code == "200") {
            this.toLogin();
            alert(res.data.msg);
          } else {
            alert(res.data.msg);
          }
        });
    },
    toRegister() {
      this.$refs.img.style.marginLeft = "-100%";
      this.$refs.login.style.opacity = 0;
      this.$refs.register.style.opacity = 1;
    },
    toLogin() {
      this.$refs.img.style.marginLeft = "0%";
      this.$refs.register.style.opacity = 0;
      this.$refs.login.style.opacity = 1;
    },
  },
};
</script>

<style>
.container {
  margin: 0px;
  padding: 0%;
  position: relative;
}
.Img {
  position: absolute;
  z-index: -99;
  width: 200%;
  margin-left: 0;
  margin-top: -100px;
  transition: margin-left 1.5s ease;
}
.content {
  display: flex;
}
.login {
  width: 350px;
  height: 500px;
  box-shadow: 5px 5px 5px rgb(196, 196, 196);
  margin-left: 600px;
  margin-top: 150px;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
.register {
  width: 350px;
  height: 650px;
  box-shadow: 5px 5px 5px rgb(196, 196, 196);
  margin-left: 80px;
  margin-top: 40px;
  opacity: 0;
  line-height: 4px;
  transition: opacity 0.5s ease-in-out;
}
h2 {
  padding-bottom: 30px;
}

/* 头像size */
.avatar {
  width: 80px;
  height: 80px;
  box-shadow: 5px 5px 5px rgb(216, 216, 216);
  border-radius: 20%;
}
</style>
