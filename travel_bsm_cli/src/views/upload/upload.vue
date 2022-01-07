<template>
  <div>
    <h1>上传单个文件</h1>
    <input
      type="file"
      name="fileUpload"
      id="input_updata"
      @change="change($event)"
      ref="inputFile"
    />
    <input type="submit" value="提交" id="btn_updata" @click="updata" />

    <div>
      <h1>上传多个文件</h1>
      <input
        type="file"
        @change="change1($event)"
        name="file"
        id="file"
        ref="files"
        multiple="multiple"
      />
      <input type="submit" value="提交" id="btn_updata" @click="updata1" />
    </div>

   
    <!-- 文件上传 -->
  </div>
</template>

<script>
import request from "../../utils/request";

export default {

  data() {
    return {
      content: "",
      //  文件上传
      file: [],
      files: [],
      imgList: [],
    };
  },
  created() {},
  methods: {
    //  上传单个文件 ---------------------------------------------------------------------
    // 触发时，将选择的上传文件复制给file，用于提交操作使用
    // 原理是通过from表单
    updata() {
      console.log("点击了文件上传");
      var formData = new FormData(); //重点在这里 如果使用 var data = {}; data.inputfile=... 这样的方式不能正常上传
      // 将需要添加的参数添加进表单中
      formData.append("file", this.file); //获取需要上传的文件
      console.log(formData);
      request
        .request({
          method: "post",
          url: "/api/uploadfiles",
          data: formData,
        })
        .then((res) => {
          console.log("上传成功", res);
        })
        .catch((err) => {
          console.log("上传失败", err);
        });
    },

    //  上传多个文件 ---------------------------------------------------------------------
    // 触发时，将选择的上传文件复制给file，用于提交操作使用
    change1(e) {
      //   console.log("文件上传", e.target.files[0]);
      this.file = e.target.files[0];
      //   console.log(this.file);
      this.files = e.target.files;
      console.log(this.files);
    },
    updata1() {
      var files = this.files;
      var fdata = new FormData();
      if (files.length > 1) {
        for (let i = 0; i < files.length; i++) {
          const f1 = files[i];
          fdata.append("file", f1);
        }
      }
      console.log(fdata);
      request
        .request({
          method: "post",
          url: "/api/uploadfiles",
          data: fdata,
        })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.code == "200") {
            this.imgList = res.data.data;
            console.log(this.imgList);
          } else {
            alert(res.data.msg);
          }
        });
    },
  },
};
</script>

<style>
#input_updata {
  background: rgba(11, 164, 255, 0.2);
  color: #fff;
  transition: all 0.3s;
}
#input_updata:hover {
  background: rgba(11, 164, 255, 0.5);
}

#btn_updata {
  background: rgba(11, 164, 255, 0.2);
  height: 27px;
  width: 50px;
  color: #fff;
  transition: all 0.3s;
  border-left: 1px solid rgba(11, 164, 255, 1);
}
#btn_updata:hover {
  background: rgba(11, 164, 255, 0.5);
}

</style>

