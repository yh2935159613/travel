<template>
  <div class="Swiper">
    <!-- 0 视频 -->
    <!-- <div class="video">
      <video src="./assets/imgs/视频.mp4" controls autoplay muted></video>
    </div> -->
    <div class="info">
      <h1>TO TRAVEL IS TO LIVE</h1>
      <h3>你不需要魔法就能消失，你需要的只是一个目的地</h3>
      <!-- <b-button variant="success">开启你的旅程</b-button> -->
    </div>
    <div class="swiper">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="3000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          v-for="(img, index) of swiperList"
          :key="index"
          :img-src="img"
          width="1024"
          height="480"
        ></b-carousel-slide>
      </b-carousel>
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
      video: "./assets/imgs/视频.mp4",
      swiperList: [
        require("../assets/imgs/轮播1.png"),
        require("../assets/imgs/轮播2.png"),
        require("../assets/imgs/轮播3.png"),
      ],
      slide: 0,
      sliding: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang='less' scoped>
.Swiper {
  .swiper {
  }
  .info {
    opacity: 0.9;
    width: 60%;
    margin-left: 20%;
    text-align: center;
    position: absolute;
    z-index: 999;
    margin-top: 10%;
    line-height: 120px;
    h1 {
      text-shadow: turquoise 2px 2px 5px;
      line-height: 120px;
      font-size: 80px;
      color: white;
    }
    h3 {
      font-size: 30px;
      text-shadow: turquoise 2px 2px 5px;
      line-height: 50px;
      color: white;
    }
  }
}
</style>