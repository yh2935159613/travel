<template>
  <div class="dialog-wrap">
    <h1>注册界面</h1>
    <div class="dialog-cover"></div>
    <div class="login">
      <!-- logo -->
      <div class="login__logo"></div>
      <div class="login__title">
        <span class="line"></span>
        <h2 class="login__title-acount">注册账户</h2>
        <span class="line"></span>
      </div>

      <!-- 注册表单 -->
      <div>
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="user.username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="user.password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
              v-model="user.name"
              name="姓名"
              label="姓名"
              placeholder="姓名"
              :rules="[{ required: true, message: '请填写姓名' }]"
            />
            <van-field name="性别" label="性别">
              <template #input>
                <van-radio-group v-model="user.sex" direction="horizontal">
                  <van-radio name="0">男</van-radio>
                  <van-radio name="1">女</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              v-model="user.age"
              name="年龄"
              label="年龄"
              placeholder="年龄"
              :rules="[{ required: true, message: '请填写年龄' }]"
            />
            <van-field
              v-model="user.motto"
              name="人生格言"
              label="人生格言"
              placeholder="人生格言"
              :rules="[{ required: true, message: '请填写人生格言' }]"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              注册
            </van-button>
            <div class="login__register">
              <a class="btn" @click="toLogin" type="button"
                >已有账号|立即登录</a
              >
            </div>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import request from "../../utils/request.js";
import { Notify } from 'vant';
export default {
  setup() {
    const router = useRouter();
    let user = reactive({
      username: "",
      password: "",
      name: "",
      age: "",
      sex: "",
      motto: "",
    });
    const onSubmit = () => {
      request
        .request({
          method: "post",
          url: "/api/user/register",
          data: user,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            Notify({ type: "success", message: res.data.msg });
            toLogin();
          } else {
            Notify({ type: "danger", message: res.data.msg });
          }
        });
    };
    const toLogin = () => {
      router.push("/");
    };
    return {
      user,
      onSubmit,
      toLogin,
    };
  },
};
</script>


<style lang="scss">
.photo {
  margin-left: 7%;
  margin-right: 15%;
}
.login__submit {
  width: 100%;
  background-color: aqua;
  font-size: 30px;
  border: 1px solid #3c9;
  background-color: #3c9;
  border-radius: 2px;
  margin-top: 20px;
  .btn {
    display: block;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    font-weight: normal;
    color: #fff;
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.4);
    outline: none;
    // -webkit-appearance:none;
  }
}

.login__register {
  margin-top: 10%;
  text-align: center;
  .btn {
    color: rgb(255, 255, 255);
    font-size: 18px;
  }
}
.drop-enter-active {
  transition: all 0.5s ease;
}

.drop-leave-active {
  transition: all 0.3s ease;
}

.drop-enter {
  transform: translateY(-500px);
}

.drop-leave {
  transform: translateY(-500px);
}

.dialog-wrap {
  position: fixed;
  z-index: 161;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/imgs/login-bd.jpg");
  /*   background: #333 url(../../assets/imgs/login-bd.jpg) no-repeat; */
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 161;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0.2;
}

.login {
  position: relative;
  z-index: 171;
  width: 75%;
  height: 50%;
  padding: -5px;
  &__logo {
    width: 98px;
    height: 98px;
    margin: 0 auto 40px auto;
    background-image: url("../../assets/imgs/login-bd2.png");
    background-position: 0 -115px;
  }
  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    &-acount {
      font-size: 16px;
      color: #fff;
      padding: 0 5px;
      font-weight: normal;
      text-shadow: 0 0 1px rgba(255, 255, 255, 0.4);
    }
    .line {
      flex: 1;
      height: 1px;
      background: rgba(255, 255, 255, 0.5);
    }
  }
  &__from {
    border-radius: 4px;
    padding-bottom: 10px;
  }
  &__acount {
    width: 100%;
    box-sizing: border-box;
    .acount {
      border: none;
      outline: none;
      width: 80%;
      padding: 15px 10%;
      border-bottom: 1px solid #e6e6e6;
      margin-top: -1px;
    }
  }
  &__password {
    .password {
      border: none;
      outline: none;
      width: 80%;
      padding: 15px 10%;
    }
  }
  .error-text {
    text-align: center;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    color: rgb(240, 20, 20);
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
  }
  .close-login {
    position: absolute;
    top: -20px;
    right: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    /*     background: url(../../assets/images/sprite.png) no-repeat; */
    background-position: -80px 0;
    transform: scale(0.5, 0.5);
    transition: all 0.5s;
  }

  .close-login:hover {
    transform: rotate(360deg);
  }
}
</style>