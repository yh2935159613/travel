<template>
  <div class="header">
    <!-- <el-icon :size="30" color="#409EFC" class="header_icon">
      <fold />
    </el-icon>-->
    <span class="header_span">识途App后台管理系统</span>
    <div class="header_photo">
      <div class="photo">
        <img :src="this.user.photo" />
      </div>
    </div>
    <div class="header_list">
      <el-dropdown>
        <span class="pullDown">
          <el-icon :size="16" color="white">
            <arrow-down-bold />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="getPersonInfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String,
  },
  data() {
    return {
      user: [],
    };
  },
  methods: {
    getPersonInfo() {
      this.$router.push("/getPersonInfo");
    },
    logOut() {
      this.$router.push("/");
      localStorage.clear();
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  position: relative;
  top: 0%;
  left: 0%;
  height: 75px;
  width: 100%;
  background-color: rgb(40, 61, 107);
  box-shadow: 5px 5px 5px rgb(211, 211, 211);
}
.header_icon {
  position: absolute;
  left: 3%;
  top: 25%;
}
.header_span {
  position: absolute;
  left: 1%;
  top: 30%;
  font-size: 24px;
  color: white;
}
.header_photo {
  position: absolute;
  margin-left: 20px;
  right: 12%;
}
.header_list {
  position: absolute;
  margin-left: 20px;
  right: 7%;
}
.photo img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 40%;
  background-color: white;
}
.pullDown {
  position: absolute;
  left: -60px;
  margin-top: 10px;
}
</style>
