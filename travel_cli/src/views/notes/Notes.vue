<template>
  <div class="bg">
    <div class="user">
      <img class="photo" :src="user.photo" alt="" />
      <h4 class="name">{{ user.name }}</h4>
      <p>{{ user.motto }}</p>
      <img
        class="tianji"
        @click="openModel"
        src="../../assets/iconfont/zengjia.png"
        alt=""
      />
    </div>
    <!-- 发表文章 -->
    <div v-if="isShow">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="articleTitle"
            name="articleTitle"
            label="文章标题"
            placeholder="文章标题"
            :rules="[{ required: true, message: '文章标题' }]"
          />
          <van-field
            v-model="articleContent"
            name="articleContent"
            label="文章内容"
            placeholder="文章内容"
            :rules="[{ required: true, message: '文章内容' }]"
          />
          <van-field name="uploader" label="文件上传">
            <template #input>
              <van-uploader
                multiple
                :after-read="onload"
                v-model="fileList"
                ref="upload"
              />
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button
            style="width: 50%; float: left"
            round
            block
            type="primary"
            @click="handleCancle"
          >
            取消
          </van-button>
          <van-button
            style="width: 50%"
            round
            block
            type="primary"
            native-type="submit"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- 展示文章 -->
    <div
      ref="showArticle"
      class="container"
      v-for="(value, index) in article"
      :key="index"
    >
      <h4>{{ dateFormat("YYYY-mm-dd HH:MM", value.updatedAt) }}</h4>
      <p>
        <img style="width: 25px" src="../../assets/iconfont/dizhi.png" alt="" />
        {{ value.articleTitle }}
      </p>
      <div class="showImg">
        <img
          v-for="(img, index) in value.articleImg"
          :src="img"
          alt=""
          :key="index"
        />
      </div>
      <div class="notes">
        <p>{{ value.articleContent }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, refs, router, reactive } from "vue";
import request from "../../utils/request";
import { dateFormat } from "../../utils/dateFormat";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  setup() {
    const user = JSON.parse(localStorage.getItem("user"));
    const article = reactive([]);
    const showImg = reactive([]);
    //获取文章数据
    const loadDataSource = () => {
      request
        .request({
          method: "get",
          url: "/api/article/getAllArticle",
          params: {
            status: 1,
          },
        })
        .then((res) => {
          const result = res.data.data;
          result.map((value, index) => {
            // console.log(value);
            // console.log(value.articleImg);
            value.articleImg = value.articleImg.split("|");
            // console.log(value.articleImg);
            article.unshift(value);
          });
          // console.log(article);
        });
    };
    loadDataSource();
    //打开模态框
    const isShow = ref(false);
    const openModel = () => {
      isShow.value = true;
    };

    const handleCancle = () => {
      isShow.value = false;
    };
    //发表文章
    const articleTitle = ref("");
    const articleContent = ref("");
    let articleImg = reactive([]);
    let formImg = ref("");
    const fileList = ref([]);

    const onload = (file) => {
      // console.log(file);
      let formData = new FormData();
      //判断是不是数组，如果是，遍历添加到formdata
      if (file instanceof Array) {
        file.map((file) => {
          let content = file.file;
          formData.append("file", content);
        });
      }
      request
        .request({
          method: "post",
          url: "/api/uploadfiles",
          data: formData,
        })
        .then((res) => {
          const result = res.data.data;
          // console.log(result);
          // console.log(formData);
          formImg = result.join("|");
          // console.log(formImg);
        });
    };

    // 添加数据
    const onSubmit = (values) => {
      values.articleImg = formImg;
      // console.log(values);
      request
        .request({
          method: "post",
          url: "/api/article/publishArticle",
          data: values,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            loadDataSource();
            handleCancle();
            Toast.success(res.data.msg);
          } else {
            Toast.fail(res.data.msg);
          }
        });
    };

    return {
      user,
      Dialog,
      dateFormat,
      articleTitle,
      articleContent,
      onSubmit,
      isShow,
      onload,
      article,
      showImg,
      fileList,
      openModel,
      articleImg,
      handleCancle,
    };
  },
};
</script>

<style>
.container {
  margin: 0% auto;
  margin-top: 5%;
  width: 90%;
  min-height: 200px;
  border-radius: 4%;
  position: relative;
  background-color: rgb(245, 245, 245);
  box-shadow: 5px 5px 5px rgb(233, 233, 233);
}
.container > h4 {
  position: absolute;
  left: 2%;
  font-size: 16px;
}
.container > p {
  position: absolute;
  right: 2%;
  font-size: 16px;
}
.showImg {
  width: 96%;
  display: flex;
  position: absolute;
  top: 13%;
}
.showImg img {
  width: 49%;
  border-radius: 5%;
  margin-left: 2%;
}
.notes {
  position: absolute;
  bottom: 18%;
  margin-left: 2%;
}
.user {
  width: 100%;
  height: 60px;
  margin: 0 auto;
  position: relative;
  background-color: rgb(247, 247, 247);
}
.name {
  position: absolute;
  left: 100px;
  top: 7px;
  font-size: 18px;
}
.user p {
  position: absolute;
  left: 100px;
  top: 40px;
}
.photo {
  position: absolute;
  width: 60px;
  border-radius: 50%;
}
.tianji {
  position: absolute;
  width: 30px;
  right: 20px;
  top: 15px;
}
</style>