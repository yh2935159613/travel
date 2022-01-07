<template>
  <div class="nav" ref="nav">
    <el-radio-group v-model="isCollapse" class="expand">
      <el-radio-button :label="false" @click="expand">展开</el-radio-button>
      <el-radio-button :label="true" @click="hide">收缩</el-radio-button>
    </el-radio-group>

    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- <el-sub-menu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/getPersonInfo" style="text-decoration:none">
            <el-menu-item index="1-1">
              <span>个人信息</span>
            </el-menu-item>
          </router-link>
          <router-link to="/getAlluser" style="text-decoration:none">
            <el-menu-item index="1-1">
              <p>获取所有用户信息</p>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-sub-menu>-->
      <router-link to="/getAlluser" style="text-decoration: none">
        <el-menu-item index="1">
          <img
            src="../assets/imgs/icon/yonghu.png"
            style="width: 20px"
            alt=""
          />
          <template #title>
            <span>用户管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/scenic" style="text-decoration: none">
        <el-menu-item index="2">
          <img
            src="../assets/imgs/icon/jingdian.png"
            style="width: 20px"
            alt=""
          />
          <template #title>
            <span>景点管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/article" style="text-decoration: none">
        <el-menu-item index="3">
          <img
            src="../assets/imgs/icon/wenzhang.png"
            style="width: 20px"
            alt=""
          />
          <template #title>
            <span>文章管理</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/comment" style="text-decoration: none">
        <el-menu-item index="5">
          <img
            src="../assets/imgs/icon/pinglun.png"
            style="width: 20px"
            alt=""
          />
          <template #title>
            <span>评论管理</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/order" style="text-decoration: none">
        <el-menu-item index="4">
          <img
            src="../assets/imgs/icon/dingdan.png"
            style="width: 20px"
            alt=""
          />
          <template #title>
            <span>订单管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/updatePassword" style="text-decoration: none">
        <el-menu-item index="6">
          <img
            src="../assets/imgs/icon/xiugai.png"
            style="width: 17px"
            alt=""
          />
          <template #title>
            <span>修改密码</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/upload" style="text-decoration: none">
        <el-menu-item index="7">
          <img
            src="../assets/imgs/icon/xiugai.png"
            style="width: 17px"
            alt=""
          />
          <template #title>
            <span>文件上传</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    hide() {
      this.$refs.nav.style.width = "5%";
    },
    expand() {
      this.$refs.nav.style.width = "13%";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav {
  clear: both;
  width: 13%;
  min-height: 730px;
  box-shadow: 5px 5px 5px rgb(211, 211, 211);
}

// .el-menu-vertical-demo {
//   background-color: rgb(56, 73, 112);
// }
// .el-menu-item {
//   background-color: rgb(56, 73, 112);
// }
</style>
