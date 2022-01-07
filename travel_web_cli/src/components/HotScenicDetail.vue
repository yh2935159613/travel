<template>
  <div class="box">
    <h1>{{ dataInfo.scenicTitle }}</h1>
    <div class="content">
      <img :src="dataInfo.imgSrc" alt="" />
      <baidu-map
        :center="center"
        zoom="17"
        style="height: 500px"
        :scroll-wheel-zoom="true"
        @click="getPoint"
        class="map"
      >
        <bm-local-search
          :keyword="dataInfo.scenicTitle"
          :auto-viewport="true"
          :location="location"
          style="width: 0px; height: 0px; overflow: hidden"
        />
      </baidu-map>
    </div>

    <p>
      <span>简介:</span><br />
      {{ dataInfo.introduce }}
    </p>

    <Footer class="footer"></Footer>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Footer from "./Foot.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "HotScenicDetail",
  components: { Footer },
  data() {
    //这里存放数据
    return {
      dataInfo: JSON.parse(this.$route.params.item),
      center: {
        lng: 116.404,
        lat: 39.915,
      },
      keyword: "重庆",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getPoint(){
      console.log(123);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang='less' scoped>
.box {
  width: 100%;
  margin: 0 auto;

  img {
    width: 50%;
    margin-left: 5%;
  }
  h1 {
    text-align: center;
    margin-top: 1%;
    margin-bottom: 1%;
  }
  p {
    width: 50%;
    margin-left: 10%;
    margin-top: 2%;
    span {
      font-size: 30px;
    }
  }
  .map {
    width: 40%;
    margin-left: 2%;
  }
}
.content{
  display: flex;
}
.footer {
  width: 100%;
}
</style>