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
        <el-button type="primary" @click="handleAddScenic">新增评论</el-button>
      </div>

      <el-table
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
          prop="commentId"
        />

        <el-table-column align="center" width="75px" label="发表人">
          <template #default="scope">
            {{ scope.row.userId }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          width="100px"
          label="评论标题"
          prop="commentTitle"
        />

        <el-table-column
          align="center"
          width="300px"
          label="评论内容"
          prop="commentContent"
        />

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
      <!-- 弹出模态框,新增景点 -->
      <div>
        <el-dialog v-model="isShow" :title="title">
          <el-form :model="form">
            <el-form-item label="文章标题">
              <el-input v-model="this.form.commentTitle"></el-input>
            </el-form-item>
            <el-form-item label="文章内容">
              <el-input v-model="this.form.commentContent"></el-input>
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
      <div class="demo-pagination-block">
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
        commentTitle: "",
        commentContent: "",
      },
      title: "新增",
      dateFormat,
      isShow: false,

      currentPage: 1, //当前页码
      pageSizes: [10, 20, 30, 40], //页码格式
      pageSize: 10, //页码大小
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

    //点击新增
    handleAddScenic() {
      this.form = {
        articleTitle: "",
        articleContent: "",
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
      const { commentId } = scope.row;
      // console.log(commentId);
      request
        .request({
          method: "get",
          url: "/api/comment/destroyComment",
          params: {
            commentId,
          },
        })
        .then((res) => {
          if ((res.data.code = "200")) {
            alert(res.data.msg);
            this.loadDataSource();
          } else {
            alert(res.data.msg);
          }
        });
    },
    //点击确认
    handleSubmit(form) {
      const { commentId } = form;
      // console.log(articleId);
      if (commentId) {
        // console.log("编辑");
        request
          .request({
            method: "post",
            url: "/api/comment/updateComment",
            params: {
              commentId,
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
        request
          .request({
            method: "post",
            url: "/api/comment/publishComment",
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
          url: "/api/comment/getAllComment",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            this.tableData = res.data.data;
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
          // console.log(userId);
          request
            .request({
              method: "get",
              url: "/api/comment/getCommentById",
              params: {
                userId,
              },
            })
            .then((res) => {
              console.log(res);
              this.tableData = res.data.data;
            });
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
</style>