<template>
  <div class="header">
    <div class="logo">
      <b-img :src="imgSrc" width="150px" fluid alt="Responsive image"></b-img>
      <b-img :src="tripSrc" width="100px" fluid alt="Responsive image"></b-img>
    </div>
    <div class="search">
      <b-navbar type="light" variant="light">
        <b-nav-form>
          <b-form-input
            class="mr-sm-3"
            v-model="keyWord"
            placeholder="Search"
            @keyup="handleChange"
          ></b-form-input>
          <b-button variant="outline-success" class="my-2 my-sm-0" type="submit"
            >搜索</b-button
          >
        </b-nav-form>
      </b-navbar>
    </div>
    <div class="phone">
      <b-img
        :src="phoneSrc"
        width="100px"
        height="30px"
        fluid
        alt="Responsive image"
      ></b-img
      >400-820-8820
    </div>
    <div class="loginRegister" v-if="!userInfo">
      <b-button variant="outline-primary" @click="toLogin">登录|注册</b-button>
    </div>

    <div class="loginRegister" v-if="userInfo">
      <b-dropdown
        split
        split-variant="outline-primary"
        variant="primary"
        :text="' ' + '欢迎 ' + userInfo.name"
        class="m-2"
      >
        <b-dropdown-item href="#">个人信息</b-dropdown-item>
        <b-dropdown-item @click="handelClear">注销</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      keyWord: "",
      imgSrc: require("../assets/logo.png"),
      tripSrc: require("../assets/trip.png"),
      phoneSrc: require("../assets/电话.png"),
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toLogin() {
      this.$router.push("/login");
    },

    handleChange() {
      // console.log(this.keyWord);
      this.$bus.$emit("KeyWord", this.keyWord);
    },
    
    handelClear() {
      localStorage.removeItem("userInfo");
      this.userInfo = "";
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
  },
};
</script>
<style lang='less' scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  .logo {
    margin-left: 15%;
  }
  .search {
    width: 350px;
  }
  .phone {
    font-size: 32px;
    color: rgb(2, 129, 117);
    margin-left: 10rem;
  }
  .loginRegister {
    margin-left: 2rem;
    font-size: 20px;
  }
}
</style>