<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.$refs.header);
  },
};
</script>
<style lang='less'>
* {
  margin: 0%;
  padding: 0%;
}
a {
  text-decoration: none !important;
}
a span {
  font-size: 30px;
}
video {
  position: absolute;
  z-index: 999;
  top: 20%;
  width: 25%;
  border-radius: 5%;
  opacity: 0.9;
  box-shadow: 1px 1px 1px rgb(0, 0, 155);
}
.swiper {
  width: 100%;
  margin: 0 auto;
}
.cards {
  width: 80%;
  margin: 0 auto;
  margin-top: 5%;
  margin-bottom: 5%;
}
.changeCards {
  width: 90%;
  margin-top: 5%;
  margin: 0 auto;
}
.ruleCards {
  margin-top: 5%;
}
.ruleCards_row {
  margin-top: 2%;
}

b-col {
  box-shadow: 5px 5px 5px greenyellow;
}
.navList {
  width: 100%;
  height: 40px;
  position: absolute;
  z-index: 999;
  display: flex;
  .nav {
    width: 200px;
    height: 50px;
    border: 1px solid rgb(207, 241, 154);
    align-items: center;
    font-size: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>