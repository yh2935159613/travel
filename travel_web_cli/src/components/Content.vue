<template>
  <div ref="myContent" class="myContent">
    <!-- 当前热门 -->
    <div class="d1 hortCards">
      <b-container class="bv-example-row ruleCards">
        <h1>
          当前热门
          <img
            @click="$router.push('/hotScenic')"
            style="width: 50px"
            src="../assets/dianjichufa.png"
            alt=""
          />
        </h1>
        <h5>最美的时光就是一直在路上，发现美丽风景，让我们说走就走</h5>
        <b-row class="ruleCards_row">
          <div v-for="(item, index) in filHotData.slice(0, 6)" :key="index">
            <b-col style="margin-top: 30px">
              <div>
                <b-card
                  :title="item.scenicTitle"
                  :img-src="item.imgSrc"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 20rem"
                  class="mb-2 card"
                  @click="toHotScenicDetail(item)"
                >
                  <b-card-text>
                    <p>
                      {{
                        item.introduce.length > 40
                          ? item.introduce.slice(0, 40) + "......"
                          : item.introduce
                      }}
                    </p>
                  </b-card-text>
                  <b-button variant="outline-primary">查看详情</b-button>
                </b-card>
              </div>
            </b-col>
          </div>
        </b-row>
      </b-container>
    </div>

    <!-- 风景画册 -->
    <div>
      <div class="title">
        <h1>风景画册</h1>
        <p>最美的时光就是一直在路上，发现美丽风景，让我们说走就走</p>
      </div>
      <div class="scenicImgs">
        <b-container fluid class="p-4 bg-dark">
          <b-row>
            <div v-for="(value, index) in scenicData.slice(0, 8)" :key="index">
              <b-col style="margin-top: 50px">
                <b-img
                  thumbnail
                  fluid
                  width="300px"
                  :src="value"
                  alt="Image 1"
                ></b-img>
              </b-col>
            </div>
          </b-row>
        </b-container>
      </div>
    </div>
    <!-- 热门游记 -->
    <div class="title">
      <h1>
        热门游记
        <img
          @click="toHotNotes"
          style="width: 50px"
          src="../assets/dianjichufa.png"
          alt=""
        />
      </h1>
      <p>最美的时光就是一直在路上，发现美丽风景，让我们说走就走</p>

      <div class="showNotes" id="showNotes">
        <b-carousel
          ref="myCarousel"
          id="carousel-1"
          :interval="0"
          style="text-shadow: 1px 1px 2px #333"
        >
          <b-carousel-slide v-for="(value, index) of notesData" :key="index">
            <template #img>
              <b-img
                @click="handlePre"
                class="d-block"
                :src="value.articleImg[0]"
                width="650px"
                alt="image slot"
                style="float: left"
              />
              <div class="content">
                <h3>{{ value.articleTitle }}</h3>
                <span>{{ value.name }}</span>
                <p style="font-size: 24px">{{ value.articleContent }}</p>
                <img
                  @click="handleNext"
                  style="width: 50px; text-algin: left"
                  src="../assets/箭头.png"
                  alt=""
                />
              </div>
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </div>
  </div>
  <!-- 热门游记模板 -->
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import request from "../utils/request";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      isShow: true,
      headerKeyWord: "",
      input: "洪崖洞",
      hotData: [],
      notesData: [],
      name: "",
      scenicData: [
        require("../assets/imgs/乡村风景/2.jpg"),
        require("../assets/imgs/乡村风景/3.jpg"),
        require("../assets/imgs/乡村风景/名胜古迹_苏州园林.jpg"),
        require("../assets/imgs/乡村风景/名胜古迹_黄山.jpg"),
        require("../assets/imgs/乡村风景/岳阳楼2.jpg"),
        require("../assets/imgs/乡村风景/武当山.jpg"),
        require("../assets/imgs/乡村风景/沂蒙山.jpg"),
        require("../assets/imgs/乡村风景/苏格兰.jpg"),
      ],
      imgSrc: require("../assets/箭头.png"),
    };
  },
  //计算属性
  computed: {
    filHotData() {
      return this.hotData.filter((p) => {
        return p.scenicTitle.indexOf(this.headerKeyWord) !== -1;
      });
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleNext() {
      this.$refs.myCarousel.next();
    },
    handlePre() {
      this.$refs.myCarousel.prev();
    },
    toHotScenicDetail(item) {
      // console.log(item);
      this.$router.push({
        name: "HotScenicDetail",
        params: {
          item: JSON.stringify(item),
        },
      });
    },
    toHotNotes() {
      this.$router.push("/hotNotes");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$bus.$on("KeyWord", (value) => {
      // console.log(value);
      this.headerKeyWord = value;
    });

    request
      .request({
        method: "get",
        url: "/api/scenic/getScenic",
      })
      .then((res) => {
        // console.log("结果：", res.data.data);
        this.hotData = res.data.data;
      });

    request
      .request({
        method: "get",
        url: "/api/article/getAllArticle",
      })
      .then((res) => {
        const result = res.data.data;
        // console.log("结果：", res.data.data);
        // this.notesData = res.data.data;
        result.map((item) => {
          // console.log(item);
          this.notesData.push(item);
          const imgs = item.articleImg.split("|");
          item.articleImg = imgs;

          // console.log(this.notesData);
          let userId = item.userId;
          request
            .request({
              method: "get",
              url: "/api/user/getUserByuserId",
              params: {
                userId,
              },
            })
            .then((res) => {
              // console.log(res.data.data);
              this.$set(item, "name", res.data.data);
            });
          // console.log(this.notesData);
        });
      });
  },
};
</script>
<style lang='less' scoped>
.cards {
  h1 {
    font-size: 34px;
    color: rgb(23, 247, 224);
    text-shadow: turquoise 2px 2px 5px;
  }
}
.card:hover {
  cursor: pointer;
}
h1:hover {
  cursor: pointer;
  font-size: 100px;
}
.hortCards {
  margin-bottom: 50px;
  h1 {
    text-align: center;
    font-size: 30px;
    color: greenyellow;
    text-shadow: 2px 2px 5px greenyellow;
    margin-bottom: 20px;
  }
  h5 {
    text-align: center;
  }
  p {
    margin-bottom: 30px;
  }
}
.notes {
  width: 90%;
  margin-left: 5%;
  border-radius: 5%;
  overflow: hidden;
  box-shadow: 5px 5px 5px rgb(224, 224, 224);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5%;
}
.scenicImgs {
  width: 90%;
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
}
.title {
  margin-top: 50px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 5%;
  .showNotes {
    width: 86%;
    border-radius: 2%;
    margin-left: 7%;
    overflow: hidden;
    box-shadow: 5px 5px 5px rgb(209, 209, 209);
    .content {
      img {
        position: absolute;
        right: 50px;
        bottom: 50px;
      }
    }
  }

  h1 {
    font-size: 34px;
    color: rgb(23, 247, 224);
    text-shadow: turquoise 2px 2px 5px;
  }
}
</style>