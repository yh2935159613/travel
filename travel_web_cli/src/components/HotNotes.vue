<template>
  <!-- 当前热门 -->
  <div class="d1 hortCards">
    <h1>热门游记</h1>
    <p>最美的时光就是一直在路上，发现美丽风景，让我们说走就走</p>
    <div class="mt-4 cards" v-for="(item, index) of this.hotData" :key="index">
      <b-card
        v-show="index % 2 == 0"
        :img-src="item.articleImg"
        img-alt="Card image"
        img-left
        class="mb-3"
      >
        <b-card-text>
          <h2>{{ item.articleTitle }}</h2>
          {{ index % 2 == 0 ? item.articleContent : "" }}
        </b-card-text>
      </b-card>

      <b-card
        v-show="index % 2 == 1"
        :img-src="item.articleImg"
        img-alt="Card image"
        img-right
      >
        <b-card-text>
          <h2>{{ item.articleTitle }}</h2>
          {{ index % 2 == 1 ? item.articleContent : "" }}
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import request from "../utils/request";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "HotScenic",
  components: {},
  data() {
    //这里存放数据
    return {
      hotData: [],
      leftData: [],
      rightData: [],
    };
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
    request
      .request({
        method: "get",
        url: "/api/article/getAllArticle",
      })
      .then((res) => {
        const result = res.data.data;
        this.hotData = result;
        console.log(this.hotData);
        this.hotData.map((item) => {
          item.articleImg = item.articleImg.split("|")[0];
          //   console.log(item.articleImg);
          if (item.articleId % 2 == 0) {
            // console.log(item);
            this.leftData.push(item);
          } else {
            this.rightData.push(item);
          }
        });
      });
    // console.log(this.leftData);
    // console.log(this.rightData);
  },
};
</script>
<style lang='less' scoped>
.hortCards {
  width: 90%;
  margin-left: 5%;
  text-align: center;
  margin-bottom: 50px;
  .cards {
    width: 100%;
  }
  h1 {
    font-size: 30px;
    color: greenyellow;
    text-shadow: 2px 2px 5px greenyellow;
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 30px;
  }
}
</style>