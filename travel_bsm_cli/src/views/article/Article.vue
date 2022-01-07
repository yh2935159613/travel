<template>
  <div>
    <div class="container">
      <!-- 选择器 -->
      <div class="search">
        <el-input
          v-model="search"
          style="width: 200px"
          placeholder="请输入发表人"
        />
        <el-button style="margin-left: 10px" @click="handleSearch"
          >搜索</el-button
        >
        <el-button type="primary" @click="handleAddScenic">发表文章</el-button>
      </div>

      <el-table
        border:true
        class="table"
        :data="
          this.tableData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
      >
        <el-table-column
          align="center"
          width="75px"
          label="id"
          prop="articleId"
        />

        <el-table-column align="center" width="75px" label="发表人">
          <template #default="scope">
            {{ scope.row.userId == "1" ? "张三" : "李四" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100px"
          label="文章标题"
          prop="articleTitle"
        />

        <el-table-column
          align="center"
          width="200px"
          label="文章内容"
          prop="articleContent"
        />

        <el-table-column
          align="center"
          width="300px"
          label="图片"
          prop="articleImg"
        >
          <template #default="scope">
            <img
              v-for="(value, index) of scope.row.articleImg"
              :key="index"
              :src="value"
              style="width: 70px; margin-left: 10px"
              alt=""
            />
          </template>
        </el-table-column>

        <el-table-column align="center" width="150px" label="创建时间">
          <template #default="scope">
            {{ dateFormat("YYYY-mm-dd HH:MM", scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="150px" label="更新时间">
          <template #default="scope">
            {{ dateFormat("YYYY-mm-dd HH:MM", scope.row.updatedAt) }}
          </template>
        </el-table-column>

        <el-table-column float="left" align="center" width="200px" label="操作">
          <template #default="scope">
            <el-button style="width: 50%" size="mini" @click="handleEdit(scope)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="handleDelete(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 模态框 -->
      <div>
        <el-dialog v-model="isShow" :title="title">
          <el-form :model="form">
            <el-form-item label="文章标题">
              <el-input v-model="this.form.articleTitle"></el-input>
            </el-form-item>
            <el-form-item label="文章内容">
              <el-input v-model="this.form.articleContent"></el-input>
            </el-form-item>
            <!-- 上传头头像 -->
            <el-form-item label="上传图片">
              <el-upload
                :multiple="multiple"
                action="${pageContext.request.contextPath}/lookup/editEvidence/123"
                list-type="picture-card"
                :auto-upload="false"
                :http-request="uploadFile"
                ref="upload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleCancle()">取消</el-button>
              <el-button type="primary" @click="handleSubmit(form)"
                >确认</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>

      <!-- 分页 -->
      <div>
        <el-pagination
          :v-model:currentPage="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.tableData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 弹出模态框,新增景点 -->
  </div>
</template>

<script>
import request from "../../utils/request";
import { dateFormat } from "../../utils/dateFormat";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      user: [],
      search: "",
      tableData: [],
      form: {
        articleTitle: "",
        articleContent: "",
        articleImg: "",
      },
      title: "新增",
      dateFormat,
      isShow: false,

      currentPage: 1, //当前页码
      pageSizes: [10, 20, 30, 40], //页码格式
      pageSize: 10, //页码大小
      formDate: "",
      multiple: true,

      imgString: "",
    };
  },
  methods: {
    //  val表示当前页大小
    handleSizeChange(val) {
      // console.log(`${val} items per page`);
      this.pageSize = val;
    },
    //控制跳转到第几页，val表示当前页数
    handleCurrentChange(val) {
      // console.log(`current page: ${val}`);
      this.currentPage = val;
      // console.log(this.currentPage);
    },

    //上传成功 多次调用
    uploadFile(file) {
      console.log('上传次数');
      this.formDate.append("file", file.file);
    },
    //点击新增
    handleAddScenic() {
      this.form = {
        articleTitle: "",
        articleContent: "",
        articleImg: "",
      };
      this.isShow = true;
      this.title = "新增";
    },
    //点击编辑
    handleEdit(scope) {
      this.isShow = true;
      this.title = "编辑";
      // console.log(scope.row);
      this.form = scope.row;
    },
    //点击删除
    handleDelete(scope) {
      // 获取当前范围的行
      const { articleId } = scope.row;
      // console.log(articleId);
      request
        .request({
          method: "get",
          url: "/api/article/destroyArticle",
          params: {
            articleId,
          },
        })
        .then((res) => {
          if ((res.data.code = "200")) {
            ElMessage({
              message: res.data.msg,
              type: "success",
            });

            this.loadDataSource();
          } else {
            ElMessage({
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
    //点击确认
    handleSubmit(form) {
      this.formDate = new FormData();
      this.$refs.upload.submit();
      request
        .request({
          method: "post",
          url: "/api/uploadfiles",
          data: this.formDate,
        })
        .then((res) => {
          const result = res.data.data;
          //获取图片地址是数组，转化成字符串拼接格式，并将字符串传给form 表单
          this.imgString = result.join("|");
          const { articleId } = form;
          // console.log(articleId);
          if (articleId) {
            // console.log("编辑");
            this.form.articleImg = this.imgString || "";
            request
              .request({
                method: "post",
                url: "/api/article/updateArticle",
                params: {
                  articleId,
                },
                data: this.form,
              })
              .then((res) => {
                if ((res.data.code = "200")) {
                  ElMessage({
                    message: res.data.msg,
                    type: "success",
                  });
                  this.loadDataSource();
                  this.handleCancle();
                } else {
                  ElMessage({
                    message: res.data.msg,
                    type: "error",
                  });
                  this.handleCancle();
                }
              });
          } else {
            // console.log("新增");
            this.form.articleImg = this.imgString || "";
            request
              .request({
                method: "post",
                url: "/api/article/publishArticle",
                data: this.form,
              })
              .then((res) => {
                if ((res.data.code = "200")) {
                  ElMessage({
                    message: res.data.msg,
                    type: "success",
                  });

                  this.loadDataSource();
                  this.handleCancle();
                } else {
                  ElMessage({
                    message: res.data.msg,
                    type: "error",
                  });
                  this.handleCancle();
                }
              });
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //点击取消
    handleCancle() {
      this.isShow = false;
    },

    //加载全部数据
    loadDataSource() {
      request
        .request({
          method: "get",
          url: "/api/article/getAllArticle",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            const result = res.data.data;
            result.map((value) => {
              value.articleImg = value.articleImg.split("|");
              // console.log(value.imgSrc);
            });
            // console.log(result);
            this.tableData = result;
          }
        });
    },
    //获取所有人信息
    loadDataUser() {
      request
        .request({
          method: "get",
          url: "/api/user/getAlluser",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            const result = res.data.data;
            // this.total = result.length;
            // console.log(result);
            this.user = result;
          }
        });
    },
    //点击搜索
    handleSearch() {
      // console.log(this.user);
      this.user.map((value) => {
        if (value.name == this.search) {
          // console.log(value.userId);
          const userId = value.userId;
          console.log(userId);
          if (userId == null) {
            this.loadDataSource();
          } else {
            request
              .request({
                method: "get",
                url: "/api/article/getArticleById",
                params: {
                  userId,
                },
              })
              .then((res) => {
                // console.log(res);
                this.tableData = res.data.data;
              });
          }
        } else {
          this.tableData = [];
          setTimeout(() => {
            this.loadDataSource();
          }, 2000);
        }
      });
    },
  },
  created() {
    this.loadDataSource();
    this.dateFormat = dateFormat;
    this.loadDataUser();
  },
};
</script>

<style>
.container {
  width: 95%;
  height: 575px;
}
.table {
  width: 100%;
  height: 575px;
  overflow: auto;
}
.search {
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.el-table-column {
  height: 5px;
}
</style>