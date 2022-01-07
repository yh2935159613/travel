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
        <el-button type="primary" @click="handleAddScenic">新增订单</el-button>
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
          prop="orderId"
        />

        <el-table-column
          align="center"
          width="100px"
          label="景点Id"
          prop="scenicId"
        />

        <el-table-column
          align="center"
          width="200px"
          label="订单数量"
          prop="orderQuantity"
        />
        <el-table-column
          align="center"
          width="200px"
          label="总价"
          prop="orderPrice"
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
            <el-form-item label="景点id">
              <el-select v-model="this.form.scenicId" placeholder="Select">
                <el-option
                  v-for="item in this.scenic"
                  :key="item.scenicId"
                  :label="item.scenicTitle"
                  :value="item.scenicId"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="订单描述">
              <el-input v-model="this.form.orderContent"></el-input>
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
      formDate: "",
      multiple: true,

      scenic: [],
      search: "",
      tableData: [],
      form: {
        scenicId: "",
        orderContent: "",
        orderImg: "",
      },

      title: "新增",
      dateFormat: "",
      isShow: false,

      currentPage: 1, //当前页码
      pageSizes: [10, 20, 30, 40], //页码格式
      pageSize: 10, //页码大小

      imgString: "",
    };
  },
  methods: {
    uploadFile(file) {
      this.formDate.append("file", file.file);
    },
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
        orderContent: "",
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
      const { orderId } = scope.row;
      // console.log(commentId);
      request
        .request({
          method: "get",
          url: "/api/order/destroyOrder",
          params: {
            orderId,
          },
        })
        .then((res) => {
          if ((res.data.code = "200")) {
            ElMessage({
              message: res.data.msg,
              type: "success",
            });
            this.loadDataSource();
          }
        });
    },
    //点击确认
    handleSubmit(form) {
      this.formDate = new FormData();
      this.$refs.upload.submit();
      this.formDate.append("WS_CODE", "12133");
      request
        .request({
          method: "post",
          url: "/api/uploadfiles",
          data: this.formDate,
        })
        .then((res) => {
          // console.log(res);
          if ((res.data.code = "200")) {
            const result = res.data.data;
            this.imgString = result.join("|");
            const { orderId } = form;
            if (orderId) {
              this.form.orderImg = this.imgString || "";
              request
                .request({
                  method: "post",
                  url: "/api/order/updateOrder",
                  params: {
                    orderId,
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
                  }
                });
            } else {
              this.form.orderImg = this.imgString || "";
              request
                .request({
                  method: "post",
                  url: "/api/order/addOrder",
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
                  }
                });
            }
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
          url: "/api/order/getAllOrder",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            // console.log(res);
            const result = res.data.data;
            result.map((value) => {
              // console.log(value);
              if (value.orderImg == null) {
                // console.log("没有图片");
              } else {
                value.orderImg = value.orderImg.split("|");
                // console.log(value.imgSrc);
              }
            });
            // console.log(result);
            this.tableData = result;
          }
        });
    },

    //获取所有景点信息
    loadDataScenic() {
      request
        .request({
          method: "get",
          url: "/api/scenic/getScenic",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            const result = res.data.data;
            // this.total = result.length;
            // console.log(result);
            this.scenic = result;
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
    this.loadDataScenic();
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