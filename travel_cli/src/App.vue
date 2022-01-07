<template>
  <div id="nav">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/notes">游记</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/info">我的</van-tabbar-item>
    </van-tabbar>
  </div>
  <router-view />
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const active = ref(0);
    return { active };
  },
};
</script>
<style lang="scss">

</style>
