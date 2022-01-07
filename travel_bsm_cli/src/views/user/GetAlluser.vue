<template>
  <div>
    <div class="container">
      <div class="search">
        <el-input
          v-model="search"
          style="width: 200px"
          placeholder="请输入关键字"
        />
        <el-button @click="handleSearch" style="margin-left: 10px"
          >搜索</el-button
        >
        <el-button @click="handleAdd" type="primary">新增用户</el-button>
      </div>

      <el-table
        border:true
        :data=" 
          this.tableData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        class="table"
      >
        <el-table-column align="center" width="85px" label="id" prop="userId" />
        <el-table-column
          align="center"
          width="85px"
          label="账号"
          prop="username"
        />
        <el-table-column align="center" width="75px" label="姓名" prop="name" />
        <el-table-column align="center" width="75px" label="年龄" prop="age" />

        <!-- 返回值需要转化 -->
        <el-table-column align="center" width="75px" label="性别">
          <template #default="scope">
            {{ scope.row.sex == "0" ? "男" : "女" }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="200px" label="格言" prop="motto">
          <template #default="scope">
            {{ scope.row.motto == null ? "/" : scope.row.motto }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="200px" label="创建时间">
          <template #default="scope">
            {{ dateFormat("YYYY-mm-dd HH:MM", scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="200px" label="更新时间">
          <template #default="scope">
            {{ dateFormat("YYYY-mm-dd HH:MM", scope.row.updatedAt) }}
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

      <!-- 点击编辑，打开一个表单 -->
      <div>
        <el-dialog v-model="dialogFormVisible" :title="title">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="form.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" style="margin-left: 80px">
              <el-radio-group v-model="form.sex" size="medium">
                <el-radio border label="0">男</el-radio>
                <el-radio border label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="格言" :label-width="formLabelWidth">
              <el-input v-model="form.motto" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 80px">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="hanldeUpdate(form)"
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
import { dateFormat } from "../../utils/dateFormat.js";
import request from "../../utils/request";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      tableData: [
        {
          userId: "",
          username: "",
          name: "",
          age: "",
          sex: "",
          motto: "",
          createdAt: "",
          updatedAt: "",
        },
      ],
      newTableData: [
        {
          userId: "",
          username: "",
          name: "",
          age: "",
          sex: "",
          motto: "",
          createdAt: "",
          updatedAt: "",
        },
      ],
      form: [
        {
          userId: "",
          username: "",
          name: "",
          age: "",
          sex: "",
          motto: "",
          photo: "",
          createdAt: "",
          updatedAt: "",
        },
      ],
      search: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      title: "新增",
      photo: "",

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

    //查询
    handleSearch() {
      // console.log(this.search);
      this.tableData = this.newTableData.filter((value) => {
        return value.username.match(this.search);
      });
    },
    //点击新增,打开新增模态框
    handleAdd() {
      this.form = {
        userId: "",
        username: "",
        name: "",
        age: "",
        sex: "",
        motto: "",
        createdAt: "",
        updatedAt: "",
      };
      this.dialogFormVisible = true;
      this.title = "新增";
    },
    //修改/新增用户信息
    hanldeUpdate(form) {
      // console.log("编辑" + form.userid);
      let userId = form.userId;
      //判断有无userId 如果有编辑，如果没有新增
      if (userId) {
        request
          .request({
            method: "post",
            url: "/api/user/updateUser",
            params: {
              userId,
            },
            data: this.form,
          })
          .then((res) => {
            if (res.data.code == "200") {
              this.dialogFormVisible = false;
              this.loadDatasource();
              ElMessage({
                message:res.data.msg,
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
        request
          .request({
            method: "post",
            url: "/api/user/register",
            data: this.form,
          })
          .then((res) => {
            if (res.data.code == "200") {
              this.dialogFormVisible = false;
              this.loadDatasource();
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
    },
    //点击编辑,打开新增模态框
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = row;
      this.title = "编辑";

      // console.log(index, row);
    },
    //删除
    handleDelete(index, row) {
      //  console.log(index, row);
      let userId = row.userId;
      request
        .request({
          method: "get",
          url: "/api/user/deleteUser",
          params: {
            userId,
          },
        })
        .then((res) => {
          if (res.data.code == "200") {
            this.loadDatasource();
            ElMessage({
              message: res.data.msg,
              type: "success",
            });
            this.dialogFormVisible = false;
          } else {
            ElMessage({
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },

    // 加载数据
    loadDatasource() {
      request
        .request({
          method: "get",
          url: "/api/user/getAlluser",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            const result = res.data.data;
            this.tableData = result;
            this.newTableData = result;
            this.total = result.length;
            // console.log(result);
          }
        });
    },
  },

  created() {
    //格式化时间
    this.dateFormat = dateFormat;

    request
      .request({
        method: "get",
        url: "/api/user/getAlluser",
      })
      .then((res) => {
        // console.log(res);
        if (res.data.code == "200") {
          const result = res.data.data;
          this.tableData = result;
          this.newTableData = result;
          this.total = result.length;
          // console.log(result);
        }
      });
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
.showForm {
  width: 200px;
}
</style>