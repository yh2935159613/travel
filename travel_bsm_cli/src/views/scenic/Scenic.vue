<template>
  <div>
    <div class="container">
      <div class="search">
        <el-input
          v-model="search"
          style="width: 200px"
          placeholder="请输入关键字"
        />
        <el-button style="margin-left: 10px" @click="handleSearch"
          >搜索</el-button
        >
        <el-button type="primary" @click="handleAddScenic">新增景点</el-button>
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
          prop="scenicId"
        />

        <el-table-column
          align="center"
          width="100px"
          label="景点名"
          prop="scenicTitle"
        />

        <el-table-column
          align="center"
          width="100px"
          label="门票"
          prop="scenicPrice"
        />

        <el-table-column
          align="center"
          width="75px"
          label="地址"
          prop="address"
        />

        <!-- //返回值需要转化 -->
        <el-table-column align="center" width="85px" label="景点类型">
          <template #default="scope">
            {{
              scope.row.status == "0"
                ? "swiper景点"
                : scope.row.status == "1"
                ? "猜你喜欢"
                : scope.row.status == "2"
                ? "城市景点"
                : "国外景点"
            }}
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

        <el-table-column
          align="center"
          width="200px"
          label="景点介绍"
          prop="introduce"
        >
        </el-table-column>

        <el-table-column align="center" width="100px" label="图片">
          <template #default="scope">
            <img
              v-for="(value, index) of scope.row.imgSrc"
              :key="index"
              :src="value"
              style="width: 70px; margin-left: 10px"
              alt=""
            />
          </template>
        </el-table-column>

        <el-table-column float="left" align="center" width="200px" label="操作">
          <template #default="scope">
            <el-button
              style="width: 50%"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
      <!-- 弹出模态框,新增景点 -->
      <div>
        <!-- 绑定form,不是tableData -->
        <el-dialog v-model="dialogFormVisible" :title="title">
          <el-form :model="form">
            <el-form-item label="景点名">
              <el-input v-model="this.form.scenicTitle"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="this.form.address"></el-input>
            </el-form-item>
            <el-form-item label="门票">
              <el-input v-model="this.form.scenicPrice"></el-input>
            </el-form-item>
            <el-form-item label="景点类型">
              <el-radio-group v-model="this.form.status" size="medium">
                <el-radio border label="0">swiper景点</el-radio>
                <el-radio border label="1">猜你喜欢</el-radio>
                <el-radio border label="2">城市景点</el-radio>
                <el-radio border label="3">国外景点</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="介绍">
              <el-input v-model="this.form.introduce"></el-input>
            </el-form-item>
            <!-- 上传图片 -->
            <el-form-item label="上传图片">
              <el-upload
                :multiple="multiple"
                action="/"
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
      // 模态框显示绑定
      form: {
        scenicId: null,
        scenicTitle: "",
        scenicPrice: "",
        address: "",
        status: "",
        createdAt: "",
        updatedAt: "",
        imgSrc: "",
        introduce: "",
      },

      // 数据显示绑定
      tableData: [
        {
          scenicId: null,
          scenicTitle: "",
          scenicPrice: "",
          address: "",
          status: "",
          createdAt: "",
          updatedAt: "",
          imgSrc: [],
          introduce: "",
        },
      ],
      // 搜索数组
      searchData: [
        {
          scenicId: "",
          scenicTitle: "",
          scenicPrice: "",
          address: "",
          status: "",
          createdAt: "",
          updatedAt: "",
          imgSrc: "",
          introduce: "",
        },
      ],
      search: "",
      dialogFormVisible: false,
      title: "新增",
      imageUrl: "",
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      formDate: "",
      multiple: true,
      imgString: "",
    };
  },
  created() {},
  methods: {
    // 上传多个图片
    uploadFile(file) {
      this.formDate.append("file", file.file);
    },
    //点击确认,新增/修改
    async handleSubmit(form) {
      const { scenicId } = form;
      //上传多个图片
      this.formDate = new FormData();
      this.$refs.upload.submit();
      request
        .request({
          method: "post",
          url: "/api/uploadfiles",
          data: this.formDate,
        })
        .then((res) => {
          if ((res.data.code = "200")) {
            const result = res.data.data;
            //获取图片地址是数组，转化成字符串拼接格式，并将字符串传给form 表单
            this.imgString = result.join("|");

            if (scenicId) {
              //编辑的时候如果上编辑了图片就修改为上传的图片
              //编辑
              this.form.imgSrc = this.imgString || "";
              request
                .request({
                  method: "post",
                  url: "/api/scenic/updateScenic",
                  params: {
                    scenicId,
                  },
                  data: this.form,
                })
                .then((res) => {
                  // console.log(res);
                  if (res.data.code == "200") {
                    this.loadDataSource();
                    this.dialogFormVisible = false;
                    ElMessage({
                      message: res.data.msg,
                      type: "success",
                    });
                  } else {
                    ElMessage({
                      message: res.data.msg,
                      type: "error",
                    });
                  }
                });
            } else {
              //新增的时候获取发送请求获得上传的图片，
              this.form.imgSrc = this.imgString || "";
              console.log(this.form);
              //新增
              request
                .request({
                  method: "post",
                  url: "/api/scenic/addScenic",
                  data: this.form,
                })
                .then((res) => {
                  console.log(res);
                  if (res.data.code == "200") {
                    this.dialogFormVisible = false;
                    this.loadDataSource();
                    ElMessage({
                      message: res.data.msg,
                      type: "success",
                    });
                  } else {
                    ElMessage({
                      message: res.data.msg,
                      type: "error",
                    });
                  }
                });
            }

            // console.log(this.form.imgSrc);
          }
        })
        .catch((res) => {
          ElMessage({
            message: "没有上传图片",
            type: "error",
          });
        });
    },
    //分页   控制每页显示多少数据
    handleSizeChange(val) {
      // console.log(`${val} items per page`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(`current page: ${val}`);
      this.currentPage = val;
      // console.log(this.currentPage);
    },

    //点击删除
    handleDelete(index, row) {
      const { scenicId } = row;
      request
        .request({
          method: "get",
          url: "/api/scenic/destroyScenic",
          params: {
            scenicId,
          },
        })
        .then((res) => {
          if (res.data.code == "200") {
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

    //点击取消
    handleCancle() {
      this.dialogFormVisible = false;
    },

    //点击编辑 触发模态框
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.title = "编辑";
      this.form = row;
    },

    //点击新增 触发模态框,关闭table
    handleAddScenic() {
      this.form = {
        scenicId: null,
        scenicTitle: "",
        address: "",
        status: "",
        createdAt: "",
        updatedAt: "",
        imgSrc: "",
        introduce: "",
      };
      this.dialogFormVisible = true;
      this.title = "新增";
    },
    //搜索
    handleSearch() {
      // console.log("搜索");
      this.tableData = this.searchData.filter((value) => {
        return (
          value.scenicTitle.match(this.search) ||
          value.address.match(this.search) ||
          (value.status == "0"
            ? "城市景点"
            : value.status == "1"
            ? "名胜古迹"
            : "国外景点"
          ).match(this.search)
        );
      });
    },
    //加载数据
    loadDataSource() {
      request
        .request({
          method: "get",
          url: "/api/scenic/getScenic",
        })
        .then((res) => {
          // console.log(res);
          const result = res.data.data;
          result.map((value) => {
            value.imgSrc = value.imgSrc.split("|");
            // console.log(value.imgSrc);
          });
          // console.log(result);
          this.tableData = result;
          this.searchData = result;
          result.map((value) => {
            // console.log(value.imgSrc);
            this.fileList = value.imgSrc;
            // console.log(this.fileList);
          });
        });
    },
  },
  created() {
    this.loadDataSource();
    this.dateFormat = dateFormat;
  },
};
</script>

<style>
.container {
  width: 95%;
  height: 575px;
}
.table {
  width: 95%;
  height: 575px;
  overflow: auto;
}
.search {
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}
/* 头像size */
.avatar {
  width: 80px;
  height: 80px;
  box-shadow: 5px 5px 5px rgb(216, 216, 216);
  border-radius: 20%;
}
</style>