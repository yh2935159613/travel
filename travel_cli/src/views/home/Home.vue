<template>
  <div class="container">
    <div class="header">
      <van-search
        v-model="input"
        shape="round"
        background="#4fc08d"
        show-action
        label="地址"
        placeholder="请输入搜索关键词"
        @update:model-value="onSearch"
      >
        <template #action>
          <div @click="onSearch">确认</div>
        </template>
      </van-search>
    </div>
    <!-- 弹框 -->

    <div class="swiper">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in swiperImg" :key="image">
          <img :src="image.imgSrc" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="links">
      <div v-for="(value, index) in links" :key="index">
        <img :src="value.imgSrc" alt="找不到图片" />
        <p>{{ value.text }}</p>
      </div>
    </div>
    <div class="line"></div>
    <div class="content">
      <div>
        <h1>
          猜你喜欢
          <span
            ><img
              style="width: 30px"
              src="../../assets/iconfont/aixin.png"
              alt=""
          /></span>
        </h1>
      </div>

      <div class="cList" v-for="(value, index) in hotScenic" :key="index">
        <div class="cLeft">
          <img :src="value.imgSrc" alt="找不到图片" />
        </div>
        <div class="cRight">
          <h2 style="fontsize: 30px">
            {{ value.scenicTitle }} <span>{{ value.address }}</span>
          </h2>

          <h4 class="cRight_price">
            <img
              style="width: 25px"
              src="../../assets/iconfont/jiage.png"
              alt=""
            />{{ value.scenicPrice }}
            <span>
              <img
                @click="handleOrder(value)"
                style="width: 25px"
                src="../../assets/iconfont/tianjia.png"
                alt=""
              />
            </span>
          </h4>
          <p class="cRight_introduce">{{ value.introduce }}</p>
        </div>
      </div>
    </div>
    <van-popup
      :v-model:show="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
    />
    <div class="block"></div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import request from "../../utils/request";
import { useRouter } from "vue-router";
import { Toast } from 'vant';
export default {
  setup() {
    const router = useRouter();
    let hotScenic = reactive([]);
    const swiperImg = reactive([]);
    //链接数据
    const links = reactive([
      { imgSrc: require("../../assets/iconfont/jingdian.png"), text: "景点" },
      { imgSrc: require("../../assets/iconfont/jiudian.png"), text: "酒店" },
      { imgSrc: require("../../assets/iconfont/meishi1.png"), text: "美食" },
      { imgSrc: require("../../assets/iconfont/zengjia.png"), text: "其它" },
    ]);
    const input = ref("");
    //查询数据
    const onSearch = (val) => {
      hotScenic.splice(0);
      request
        .request({
          method: "get",
          url: "/api/scenic/getScenicByStatus",
          params: {
            status: 1,
          },
        })
        .then((res) => {
          const result = res.data.data;
          result.map((value) => {
            // console.log(value);
            if (
              value.scenicTitle.match(input.value) ||
              value.address.match(input.value)
            ) {
              hotScenic.push(value);
            }
          });
        });
    };
    const handleOrder = (value) => {
      // console.log(value);
      router.push({
        path: "/addOrder",
        query: {
          value: JSON.stringify(value),
        },
      });
    };
    const show = ref(true);
    const showPopup = () => {
      show.value = true;
    };
    // swiper数据显示
    const loadDataSource_swiper = () => {
      request
        .request({
          method: "get",
          url: "/api/scenic/getScenicByStatus",
          params: {
            status: 0,
          },
        })
        .then((res) => {
          const result = res.data.data;
          result.map((value, index) => {
            swiperImg.push(value);
          });
          // console.log(hotScenic);
        });
    };
    loadDataSource_swiper();
    //猜你喜欢界面数据
    const loadDataSource = () => {
      request
        .request({
          method: "get",
          url: "/api/scenic/getScenicByStatus",
          params: {
            status: 1,
          },
        })
        .then((res) => {
          const result = res.data.data;
          result.map((value, index) => {
            hotScenic.push(value);
          });
          // console.log(hotScenic);
        });
    };
    loadDataSource();
    return {
      show,
      input,
      showPopup,
      swiperImg,
      hotScenic,
      links,
      onSearch,
      handleOrder,
      loadDataSource,
      loadDataSource_swiper,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0%;
}
.container {
  width: 100%;
  height: auto;
  background-color: rgb(255, 255, 255);
}
.header {
  width: 100%;
  height: auto;
}
.swiper {
  width: 100%;
  margin: 0 auto;
  height: auto;
}
.swiper img {
  width: 100%;
  height: auto;
}
.swiper p {
  margin-top: 10px;
}
.links {
  display: flex;
  justify-content: space-around;
  text-align: center;
  width: 100%;
  height: auto;
}
.links img {
  width: 45px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.content {
  width: 94%;
  height: auto;
  margin: 0 auto;
  background-color: rgb(245, 245, 245);
}
.content h1 {
  width: 96%;
  padding-left: 3%;
  background-color: rgb(245, 245, 245);
}
.cList {
  display: flex;
  width: 100%;
  height: 120px;
  background-color: white;
  border-radius: 5%;
  margin-top: 4%;
}
.cLeft {
  width: 45%;
  margin: 0 auto;
  margin-top: 1%;
  margin-bottom: 1%;
  overflow: hidden;
}
.cLeft img {
  width: 100%;
  height: 98%;
  border-radius: 5%;
}
.cRight {
  position: relative;
  width: 50%;
  padding-left: 2%;
  padding-top: 2%;
  line-height: 30px;
}
.cRight span {
  position: absolute;
  right: 10%;
  font-size: 14px;
}
.cRight_price {
  font-size: 16px;
  color: red;
}
.cRight_introduce {
  font-size: 14px;
  margin-top: 5%;
}
.line {
  width: 100%;
  height: 0.2rem;
  background-color: rgb(219, 219, 219);
  margin-top: 6%;
  margin-bottom: 6%;
}
.block {
  width: 100%;
  height: 50px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 0%;
}
</style>