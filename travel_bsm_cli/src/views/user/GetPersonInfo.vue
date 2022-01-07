<template>
  <div class="container">
    <div class="box">
      <el-descriptions :border="true" :column='1' title="个人信息">
        <el-descriptions-item label="账号">{{
          user.username
        }}</el-descriptions-item>
        <el-descriptions-item label="中文名">{{
          user.name || "张三"
        }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ user.age }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{
          user.sex == "0" ? "男" : "女"
        }}</el-descriptions-item>
        <el-descriptions-item label="人生格言">{{
          user.motto || "世界那么大我想去看看"
        }}</el-descriptions-item>
        <el-descriptions-item label="上次登录时间">{{
          user.updatedAt
        }}</el-descriptions-item>
      </el-descriptions>

      <div>
        <!-- 上传头头像 -->
        <el-form>
          <el-form-item label="上传头像">
            <el-upload
              ref="uploadphoto"
              class="avatar-uploader"
              action="/api/uploadfile"
              :show-file-list="false"
              :on-change="getImg"
              :on-success="getUploadfile"
              :auto-upload="true"
              :limit="1"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
import { dateFormat } from "../../utils/dateFormat";
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      imageUrl: "",
    };
  },
  methods: {
    getImg(file) {
      //创建本地预览效果
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //点击上传
    //上传成功
    getUploadfile(response, file) {
      this.user.photo = response.data;
      // console.log(response.code == "200");
      if (response.code == "200") {
        const { userId } = this.user;
        request
          .request({
            method: "post",
            url: "/api/user/updateUser",
            params: {
              userId,
            },
            data: this.user,
          })
          .then((res) => {
            if (res.data.code == "200") {
              localStorage.setItem("user", JSON.stringify(this.user));
              this.$router.go(0);
              // alert(res.data.msg);
            } else {
              alert(res.data.msg);
            }
          });
      }
    },
  },
  created() {
    this.user.updatedAt = dateFormat("YYYY-mm-dd HH:MM", this.user.updatedAt);
  },
};
</script>

<style>
.container {
  width: 95%;
  height: 575px;
}

.box {
  width: 500px;
  height: 500px;
  box-shadow: 5px 5px 5px rgb(226, 226, 226);
}
/* 头像size */
.avatar {
  width: 80px;
  height: 80px;
  box-shadow: 5px 5px 5px rgb(216, 216, 216);
  border-radius: 20%;
}
</style>