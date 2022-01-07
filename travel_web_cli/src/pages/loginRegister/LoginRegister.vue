<template>
  <div class="container">
    <img class="Img" ref="img" src="../../assets/loginRegister.png" alt />

    <div class="content">
      <!-- 2 注册界面 -->
      <div ref="register" class="register">
        <div>
          <h2>用户注册</h2>
          <b-form v-if="show">
            <b-form-group id="input-group-2" label="账号" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.username"
                required
                placeholder="请输入账号"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="密码:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.password"
                required
                placeholder="请输入密码"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="年龄" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.age"
                required
                placeholder="请输入年龄"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="性别" label-for="input-2">
              男
              <input type="radio" name="" id="" value="0" v-model="form.sex" />
              女
              <input type="radio" name="" id="" value="1" v-model="form.sex" />
            </b-form-group>
            <b-button variant="outline-primary" @click="register"
              >注册</b-button
            >
            <b-button
              style="margin-left: 50px"
              variant="outline-primary"
              @click="toLogin"
              >->登录</b-button
            >
          </b-form>
        </div>
      </div>

      <!-- 1 登录界面 -->
      <div ref="login" class="login">
        <div>
          <h2>用户登录</h2>
          <b-form v-if="show">
            <b-form-group id="input-group-2" label="账号" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.username"
                required
                placeholder="请输入账号"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="密码:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.password"
                required
                placeholder="请输入密码"
              ></b-form-input>
            </b-form-group>
            <b-button variant="outline-primary" @click="toRegister"
              >->注册</b-button
            >
            <b-button
              style="margin-left: 50px"
              variant="outline-primary"
              @click="login"
              >登录</b-button
            >
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import requset from "../../utils/request";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        age: "",
        sex: "",
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn",
      ],
      show: true,
      status: 1,
    };
  },
  methods: {
    //登录
    login() {
      // console.log(this.form);
      requset
        .request({
          method: "post",
          url: "/api/user/login",
          data: this.form,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            // console.log(res.data.data);
            localStorage.setItem("accessToken", res.data.data.accessToken);
            localStorage.setItem(
              "userInfo",
              JSON.stringify(res.data.data.user)
            );
            this.$router.push("/");
          }
        });
    },
    // 注册
    register() {
      console.log(this.form);
      requset
        .request({
          method: "post",
          url: "/api/user/register",
          data: this.form,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            this.toLogin();
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
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 1920px;
  margin: 0px;
  padding: 0%;
  position: relative;
  margin-bottom: 200px;
}
.Img {
  position: absolute;
  z-index: -99;
  width: 232%;
  margin-left: 0;
  transition: margin-left 1.5s ease;
}
.content {
  padding-top: 100px;
}
.login {
  width: 350px;
  height: 400px;
  box-shadow: 5px 5px 5px rgb(196, 196, 196);
  margin-left: 900px;
  margin-top: -400px;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
.register {
  width: 350px;
  height: 450px;
  box-shadow: 5px 5px 5px rgb(196, 196, 196);
  margin-left: 150px;
  opacity: 0;
  line-height: 4px;
  transition: opacity 0.5s ease-in-out;
}
</style>
