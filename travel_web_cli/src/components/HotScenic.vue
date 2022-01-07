<template>
  <!-- 当前热门 -->
  <div class="d1 hortCards">
    <b-container class="bv-example-row ruleCards">
      <h1>当前热门</h1>
      <p>最美的时光就是一直在路上，发现美丽风景，让我们说走就走</p>
      <b-row class="ruleCards_row">
        <div v-for="(item, index) in hotData" :key="index">
          <b-col style="margin-top: 30px">
            <div>
              <b-card
                :title="item.scenicTitle"
                :img-src="item.imgSrc"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem"
                class="mb-2"
              >
                <b-card-text> {{ item.introduce }} </b-card-text>
                <b-button variant="outline-primary"  @click="toHotScenicDetail(item)" >查看详情</b-button>
              </b-card>
            </div>
          </b-col>
        </div>
      </b-row>
    </b-container>
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
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toHotScenicDetail(item) {
      // console.log(item);
      this.$router.push({
        name: "HotScenicDetail",
        params: {
          item: JSON.stringify(item),
        },
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    request
      .request({
        method: "get",
        url: "/api/scenic/getScenic",
      })
      .then((res) => {
        console.log("结果：", res.data.data);
        this.hotData = res.data.data;
      });
  },
};
</script>
<style lang='less' scoped>
.hortCards {
  text-align: center;
  margin-bottom: 50px;
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