<template>
  <div class="container">
    <div class="header">
      <img
        class="header_img"
        src="../../assets/imgs/名胜古迹/名胜古迹_长城.jpg"
        alt=""
      />
    </div>
    <div class="info">
      <div class="info_photo">
        <img style="width: 100%; border-radius: 5%" :src="user.photo" alt="" />
      </div>
      <h1>{{ user.name }}</h1>
      <p>{{ user.motto }}</p>
      <van-button type="primary" class="btn" @click="handleOut"
        >注销</van-button
      >
    </div>
    <div class="line"></div>
    <div class="info">
      <ul class="info_ul">
        <li>
          <img
            style="width: 30px; margin-right: 15px"
            src="../../assets/iconfont/aixin.png"
            alt=""
          />
          我的收藏
        </li>
        <li @click="toGetOrder">
          <img
            style="width: 30px; margin-right: 15px"
            src="../../assets/iconfont/icon_mwt1tbt2rm/dingdan.png"
            alt=""
          />我的订单
        </li>
        <li>
          <img
            style="width: 30px; margin-right: 15px"
            src="../../assets/iconfont/icon_mwt1tbt2rm/zu175.png"
            alt=""
          />个人信息
        </li>
        <li>
          <img
            style="width: 30px; margin-right: 15px"
            src="../../assets/iconfont/icon_mwt1tbt2rm/guanyuwomen.png"
            alt=""
          />关于我们
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem("user"));
    const handleOut = () => {
      localStorage.clear();
      router.push("/");
    };
    const toGetOrder = () => {
      router.push("/getAllOrder");
    };
    return { user, handleOut, toGetOrder };
  },
};
</script>

<style>
.header_img {
  width: 100%;
}
.info {
  width: 94%;
  min-height: 180px;
  border: rgb(216, 216, 216) 1px solid;
  margin: 0% auto;
}
.info_photo {
  position: absolute;
  width: 30%;
  height: 100px;
  left: 35%;
  margin-top: -50px;
}
.info h1 {
  margin-top: 25%;
  margin-left: 8%;
  font-size: 20px;
}
.info p {
  margin-left: 8%;
  margin-top: 5%;
}
.btn {
  margin-left: 75%;
  margin-top: -60px;
}
.line {
  width: 100%;
  height: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(231, 231, 231);
}
.info_ul li {
  line-height: 24px;
  margin-left: 20px;
  margin-top: 15px;
}
</style>